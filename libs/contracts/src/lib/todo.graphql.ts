export const todoTypeDefs = `#graphql
  type Todo {
    id: ID!
    title: String!
    completed: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    todos: [Todo!]!
  }

  type Mutation {
    createTodo(title: String!): Todo!
    updateTodo(id: ID!, title: String, completed: Boolean): Todo!
    deleteTodo(id: ID!): ID!
  }
`;

export const TODOS_QUERY = `query Todos {
  todos {
    id
    title
    completed
    createdAt
    updatedAt
  }
}`;

export const CREATE_TODO_MUTATION = `mutation CreateTodo($title: String!) {
  createTodo(title: $title) {
    id
    title
    completed
    createdAt
    updatedAt
  }
}`;

export const UPDATE_TODO_MUTATION = `mutation UpdateTodo(
  $id: ID!
  $title: String
  $completed: Boolean
) {
  updateTodo(id: $id, title: $title, completed: $completed) {
    id
    title
    completed
    createdAt
    updatedAt
  }
}`;

export const DELETE_TODO_MUTATION = `mutation DeleteTodo($id: ID!) {
  deleteTodo(id: $id)
}`;
