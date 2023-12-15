import { gql } from './__generated__/gql';

export const SEARCH_FOR_REPOSITORIES_QUERY = gql(`
query SearchForRepositories($query: String!) {
  search(query: $query, type: REPOSITORY, first: 10) {
    nodes {
      ... on Repository {
        name
        url
        id
        stargazerCount
        owner {
          login
        }
      }
    }
  }
}
`);

export const GET_REPOSITORY = gql(`
query GetRepository($id: ID!) {
  node(id: $id) {
    ... on Repository {
      name
      url
      id
      stargazerCount
      description
      owner {
        login
      }
    }
  }
}
`);
