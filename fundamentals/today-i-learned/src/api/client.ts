// Simple GraphQL API client for GitHub
export async function graphqlRequest(query: string, variables?: any, token?: string): Promise<any> {
  const response = await fetch('/api/github/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify({ query, variables }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'GraphQL request failed');
  }

  // GraphQL 에러 처리
  if (data.errors && data.errors.length > 0) {
    const error = data.errors[0];
    const errorMessage = error.message || 'GraphQL error occurred';
    
    // OAuth App 접근 제한 에러 특별 처리
    if (error.type === 'FORBIDDEN' && errorMessage.includes('OAuth App access restrictions')) {
      throw new Error('GitHub 조직의 OAuth App 접근 제한으로 인해 작업을 수행할 수 없습니다. 조직 관리자에게 앱 승인을 요청해주세요.');
    }
    
    throw new Error(errorMessage);
  }

  return data;
}

// Auth endpoints
export const AUTH_LOGIN_URL = 'https://frontend-fundamentals.com/api/github/login';
export const USER_ME_URL = '/api/github/me';

// User info request
export async function getUserInfo(token: string): Promise<any> {
  const response = await fetch(USER_ME_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user info');
  }

  return response.json();
}