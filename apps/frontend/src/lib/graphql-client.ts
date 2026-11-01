const graphqlUrl = process.env.NEXT_PUBLIC_GRAPHQL_URL ?? 'http://localhost:3333/graphql';

type GraphQLResponse<T> = {
  data?: T;
  errors?: { message: string }[];
};

export async function graphqlRequest<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const response = await fetch(graphqlUrl, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  });
  const result = (await response.json()) as GraphQLResponse<T>;
  if (!response.ok || result.errors?.length) {
    throw new Error(
      result.errors?.map(({ message }) => message).join('; ') ??
        `GraphQL request failed (${response.status}).`,
    );
  }
  if (!result.data) throw new Error('GraphQL returned no data.');
  return result.data;
}
