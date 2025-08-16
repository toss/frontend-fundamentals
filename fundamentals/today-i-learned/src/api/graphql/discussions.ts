// GitHub Discussions 관련 GraphQL 쿼리 정의

export const GET_DISCUSSIONS_QUERY = `
  query GetDiscussions($owner: String!, $repo: String!, $first: Int!, $after: String) {
    repository(owner: $owner, name: $repo) {
      discussions(
        first: $first
        after: $after
        orderBy: { field: CREATED_AT, direction: DESC }
      ) {
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          id
          title
          body
          createdAt
          updatedAt
          author {
            login
            avatarUrl
          }
          reactions {
            totalCount
          }
          comments {
            totalCount
          }
          category {
            name
          }
        }
      }
    }
  }
`;

// 주간 인기글은 SEARCH_DISCUSSIONS_QUERY를 사용합니다

export const CREATE_DISCUSSION_MUTATION = `
  mutation CreateDiscussion($repositoryId: ID!, $title: String!, $body: String!, $categoryId: ID!) {
    createDiscussion(input: {
      repositoryId: $repositoryId
      title: $title
      body: $body
      categoryId: $categoryId
    }) {
      discussion {
        id
        title
        body
        createdAt
        author {
          login
          avatarUrl
        }
        reactions {
          totalCount
        }
        comments {
          totalCount
        }
        category {
          name
        }
      }
    }
  }
`;

export const GET_REPOSITORY_INFO_QUERY = `
  query GetRepositoryInfo($owner: String!, $repo: String!) {
    repository(owner: $owner, name: $repo) {
      id
      discussionCategories(first: 10) {
        nodes {
          id
          name
          description
        }
      }
    }
  }
`;

export const GET_INFINITE_DISCUSSIONS_QUERY = `
  query GetInfiniteDiscussions($owner: String!, $repo: String!, $first: Int!, $after: String, $orderBy: DiscussionOrder) {
    repository(owner: $owner, name: $repo) {
      discussions(
        first: $first
        after: $after
        orderBy: $orderBy
      ) {
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          id
          title
          body
          createdAt
          updatedAt
          author {
            login
            avatarUrl
          }
          reactions {
            totalCount
          }
          comments {
            totalCount
          }
          category {
            name
          }
          labels(first: 10) {
            nodes {
              name
            }
          }
        }
      }
    }
  }
`;

export const SEARCH_DISCUSSIONS_QUERY = `
  query SearchDiscussions($query: String!, $first: Int!, $after: String) {
    search(
      query: $query
      type: DISCUSSION
      first: $first
      after: $after
    ) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        ... on Discussion {
          id
          title
          body
          createdAt
          updatedAt
          author {
            login
            avatarUrl
          }
          reactions {
            totalCount
          }
          comments {
            totalCount
          }
          category {
            name
          }
          labels(first: 10) {
            nodes {
              name
            }
          }
        }
      }
    }
  }
`;

// 내 기여도(컨트리뷰션) 계산을 위한 경량화된 쿼리 - 날짜 정보만 필요
export const GET_MY_CONTRIBUTIONS_QUERY = `
  query GetMyContributions($query: String!, $first: Int!, $after: String) {
    search(
      query: $query
      type: DISCUSSION
      first: $first
      after: $after
    ) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        ... on Discussion {
          id
          createdAt
          author {
            login
          }
        }
      }
    }
  }
`;