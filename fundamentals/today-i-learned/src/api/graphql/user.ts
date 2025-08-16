// 사용자 관련 GraphQL Query 정의

export const GET_VIEWER_QUERY = `
  query GetViewer {
    viewer {
      id
      login
      avatarUrl
      name
      bio
      repositories {
        totalCount
      }
      followers {
        totalCount
      }
      following {
        totalCount
      }
    }
  }
`;