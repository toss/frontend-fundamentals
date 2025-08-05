import { useAuth } from '../contexts/AuthContext';
import { createAuthenticatedApiRequest } from '../lib/api';

export function useAuthenticatedFetch() {
  const { user } = useAuth();

  const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
    if (!user?.access_token) {
      throw new Error('No authentication token available');
    }

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.access_token}`,
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Authentication token expired');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response;
  };

  const fetchGitHubGraphQL = async (query: string, variables?: any) => {
    if (!user?.access_token) {
      throw new Error('No authentication token available');
    }

    const response = await createAuthenticatedApiRequest('GRAPHQL', user.access_token, {
      method: 'POST',
      body: JSON.stringify({ query, variables }),
    });

    if (!response.ok) {
      throw new Error(`GraphQL request failed: ${response.status}`);
    }

    return response.json();
  };

  return {
    fetchWithAuth,
    fetchGitHubGraphQL,
    isAuthenticated: !!user?.access_token,
  };
}