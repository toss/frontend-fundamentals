import { createAuthenticatedApiRequest, createApiRequest } from "../lib/api";
import { ENV_CONFIG, isLocalhost } from "../lib/env";

// OAuth 기반 GitHub API fetch 함수
export async function fetchGithub(
  query: string,
  variables: unknown,
  accessToken?: string
): Promise<Response> {
  // 사용자 토큰이 있으면 새로운 GraphQL 엔드포인트 사용
  if (accessToken) {
    return createAuthenticatedApiRequest('GRAPHQL', accessToken, {
      method: "POST",
      body: JSON.stringify({ query, variables })
    });
  }

  // 사용자 토큰이 없으면 기존 앱 토큰 방식 사용 (읽기 전용)
  if (isLocalhost()) {
    const token = ENV_CONFIG.GITHUB_TOKEN;
    if (!token) {
      throw new Error("GitHub token is not configured");
    }

    return fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ query, variables })
    });
  } else {
    return createApiRequest('GITHUB', {
      method: "POST",
      body: JSON.stringify({ query, variables })
    });
  }
}

// GraphQL 응답 처리 유틸 함수
export async function handleGraphQLResponse(
  response: Response,
  errorMessage: string
) {
  if (!response.ok) {
    throw new Error(`${errorMessage}: ${response.status}`);
  }

  const data = await response.json();

  if (data.errors) {
    throw new Error(data.errors[0]?.message || errorMessage);
  }

  return data;
}
