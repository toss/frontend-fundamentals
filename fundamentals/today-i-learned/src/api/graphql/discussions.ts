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
          reactions(first: 50) {
            totalCount
            nodes {
              content
              user {
                login
              }
            }
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
        reactions(first: 50) {
          totalCount
          nodes {
            content
            user {
              login
            }
          }
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

export const UPDATE_DISCUSSION_MUTATION = `
  mutation UpdateDiscussion($discussionId: ID!, $title: String!, $body: String!) {
    updateDiscussion(input: {
      discussionId: $discussionId
      title: $title
      body: $body
    }) {
      discussion {
        id
        title
        body
        updatedAt
        author {
          login
          avatarUrl
        }
        reactions(first: 50) {
          totalCount
          nodes {
            content
            user {
              login
            }
          }
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

export const DELETE_DISCUSSION_MUTATION = `
  mutation DeleteDiscussion($id: ID!) {
    deleteDiscussion(input: {
      id: $id
    }) {
      discussion {
        id
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
          reactions(first: 50) {
            totalCount
            nodes {
              content
              user {
                login
              }
            }
          }
          comments(first: 1) {
            totalCount
            nodes {
              id
              body
              createdAt
              author {
                login
                avatarUrl
              }
            }
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

export interface SearchDiscussionsVariables {
  query: string;
  first: number;
  after?: string;
}

export interface SearchDiscussionsResponse {
  search: {
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string | null;
    };
    nodes: Array<{
      id: string;
      title: string;
      body: string;
      createdAt: string;
      updatedAt: string;
      author: {
        login: string;
        avatarUrl: string;
      };
      reactions: {
        totalCount: number;
      };
      comments: {
        totalCount: number;
      };
      category: {
        name: string;
      };
      labels: {
        nodes: Array<{
          name: string;
        }>;
      };
    }>;
  };
}

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
          reactions(first: 50) {
            totalCount
            nodes {
              content
              user {
                login
              }
            }
          }
          comments(first: 1) {
            totalCount
            nodes {
              id
              body
              createdAt
              author {
                login
                avatarUrl
              }
            }
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

// Discussion 상세 조회 쿼리 (댓글 포함)
export const GET_DISCUSSION_DETAIL_QUERY = `
  query GetDiscussionDetail($id: ID!) {
    node(id: $id) {
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
        reactions(first: 50) {
          totalCount
          nodes {
            content
            user {
              login
            }
          }
        }
        category {
          name
        }
        labels(first: 10) {
          nodes {
            name
          }
        }
        comments(first: 100) {
          totalCount
          nodes {
            id
            body
            createdAt
            author {
              login
              avatarUrl
            }
            reactions(first: 50) {
              totalCount
              nodes {
                content
                user {
                  login
                }
              }
            }
            replies(first: 10) {
              totalCount
              nodes {
                id
                body
                createdAt
                author {
                  login
                  avatarUrl
                }
                reactions(first: 50) {
                  totalCount
                  nodes {
                    content
                    user {
                      login
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const ADD_DISCUSSION_COMMENT_MUTATION = `
  mutation AddDiscussionComment($discussionId: ID!, $body: String!) {
    addDiscussionComment(input: {
      discussionId: $discussionId
      body: $body
    }) {
      comment {
        id
        body
        createdAt
        author {
          login
          avatarUrl
        }
        reactions(first: 50) {
          totalCount
          nodes {
            content
            user {
              login
            }
          }
        }
        replies(first: 10) {
          totalCount
          nodes {
            id
            body
            createdAt
            author {
              login
              avatarUrl
            }
            reactions(first: 50) {
              totalCount
              nodes {
                content
                user {
                  login
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const ADD_DISCUSSION_COMMENT_REPLY_MUTATION = `
  mutation AddDiscussionCommentReply($discussionId: ID!, $replyToId: ID!, $body: String!) {
    addDiscussionComment(input: {
      discussionId: $discussionId
      replyToId: $replyToId
      body: $body
    }) {
      comment {
        id
        body
        createdAt
        author {
          login
          avatarUrl
        }
        reactions(first: 50) {
          totalCount
          nodes {
            content
            user {
              login
            }
          }
        }
        replies(first: 10) {
          totalCount
          nodes {
            id
            body
            createdAt
            author {
              login
              avatarUrl
            }
            reactions(first: 50) {
              totalCount
              nodes {
                content
                user {
                  login
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const ADD_DISCUSSION_REACTION_MUTATION = `
  mutation AddDiscussionReaction($subjectId: ID!, $content: ReactionContent!) {
    addReaction(input: {
      subjectId: $subjectId
      content: $content
    }) {
      reaction {
        content
        user {
          login
        }
      }
      subject {
        id
        ... on Discussion {
          reactions {
            totalCount
          }
        }
        ... on DiscussionComment {
          reactions {
            totalCount
          }
        }
      }
    }
  }
`;

export const REMOVE_DISCUSSION_REACTION_MUTATION = `
  mutation RemoveDiscussionReaction($subjectId: ID!, $content: ReactionContent!) {
    removeReaction(input: {
      subjectId: $subjectId
      content: $content
    }) {
      reaction {
        content
        user {
          login
        }
      }
      subject {
        id
        ... on Discussion {
          reactions {
            totalCount
          }
        }
        ... on DiscussionComment {
          reactions {
            totalCount
          }
        }
      }
    }
  }
`;