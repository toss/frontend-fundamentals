// 리액션 관련 GraphQL Mutation 정의

export const ADD_REACTION_MUTATION = `
  mutation AddReaction($subjectId: ID!, $content: ReactionContent!) {
    addReaction(input: {subjectId: $subjectId, content: $content}) {
      reaction {
        id
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
      }
    }
  }
`;

export const REMOVE_REACTION_MUTATION = `
  mutation RemoveReaction($subjectId: ID!, $content: ReactionContent!) {
    removeReaction(input: {subjectId: $subjectId, content: $content}) {
      reaction {
        id
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
      }
    }
  }
`;