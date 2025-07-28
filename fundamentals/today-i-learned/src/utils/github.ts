// 환경에 맞는 GitHub API fetch 함수
export async function fetchGithub(
  query: string,
  variables: unknown
): Promise<Response> {
  const isLocalhost = window.location.hostname === "localhost";

  if (isLocalhost) {
    const token = import.meta.env.VITE_GITHUB_TOKEN;
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
    return fetch("/api/github", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
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
