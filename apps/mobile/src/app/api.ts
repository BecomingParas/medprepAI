import {
  CREATE_TODO_MUTATION,
  DELETE_TODO_MUTATION,
  TODOS_QUERY,
  UPDATE_TODO_MUTATION,
} from '@sass-project/contracts';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

export type Todo = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
};

type GraphQLResponse<T> = {
  data?: T;
  errors?: { message: string }[];
};

const defaultGraphqlUrl =
  Platform.OS !== 'web' && Constants.expoConfig?.hostUri
    ? `http://${new URL(`http://${Constants.expoConfig.hostUri}`).hostname}:3333/graphql`
    : Platform.OS === 'android'
      ? 'http://10.0.2.2:3333/graphql'
      : 'http://localhost:3333/graphql';

const graphqlUrl =
  process.env.EXPO_PUBLIC_GRAPHQL_URL?.trim() || defaultGraphqlUrl;

async function requestGraphQL<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  let response: Response;

  try {
    response = await fetch(graphqlUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables }),
    });
  } catch {
    throw new Error(
      `Could not reach the GraphQL API at ${graphqlUrl}. Start the backend with "npx nx dev backend". If you're using a physical device, make sure it can reach your computer and set EXPO_PUBLIC_GRAPHQL_URL to your computer's LAN address if needed.`
    );
  }

  if (!response.ok) {
    throw new Error(`GraphQL request failed (${response.status}).`);
  }

  const result = (await response.json()) as GraphQLResponse<T>;

  if (result.errors?.length) {
    throw new Error(result.errors.map((error) => error.message).join(' '));
  }

  if (!result.data) {
    throw new Error('The GraphQL API returned no data.');
  }

  return result.data;
}

export async function getTodos(): Promise<Todo[]> {
  const data = await requestGraphQL<{ todos: Todo[] }>(TODOS_QUERY);
  return data.todos;
}

export async function createTodo(title: string): Promise<Todo> {
  const data = await requestGraphQL<{ createTodo: Todo }>(
    CREATE_TODO_MUTATION,
    { title }
  );
  return data.createTodo;
}

export async function updateTodo(
  id: string,
  completed: boolean
): Promise<Todo> {
  const data = await requestGraphQL<{ updateTodo: Todo }>(
    UPDATE_TODO_MUTATION,
    { id, completed }
  );
  return data.updateTodo;
}

export async function deleteTodo(id: string): Promise<void> {
  await requestGraphQL<{ deleteTodo: string }>(DELETE_TODO_MUTATION, { id });
}
