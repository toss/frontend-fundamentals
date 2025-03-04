import { ref } from "vue";
import type { GithubDiscussion } from "../types/github";

interface GithubApiConfig {
  owner: string;
  repo: string;
  token: string;
}

export function useGithubApi(config: GithubApiConfig) {
  const loading = ref(false);
  const error = ref<Error | null>(null);

  const fetchDiscussions = async (): Promise<GithubDiscussion[]> => {
    loading.value = true;
    error.value = null;

    try {
      const query = `
        query {
          repository(owner: "${config.owner}", name: "${config.repo}") {
            discussions(first: 100) {
              nodes {
                id
                title
                url
                reactions {
                  totalCount
                }
                author {
                  login
                  url
                }
                createdAt
                category {
                  name
                  emoji
                }
                comments {
                  totalCount
                }
                closed
                closedAt
            }
          }
        }
      }
    `;

      const response = await fetchGithubDiscussion(query);

      const data = await response.json();

      const discussions = data.data.repository.discussions.nodes.map(
        (node: any) => ({
          ...node,
          upvotes: node.reactions.totalCount
        })
      );

      return discussions;
    } catch (e) {
      error.value = e as Error;
      throw e;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    error,
    fetchDiscussions
  };
}

const fetchGithubDiscussion = async (query: string) => {
  const isLocalhost = window.location.hostname === "localhost";

  if (isLocalhost) {
    const accessToken = await (import.meta as any).env
      .READ_GITHUB_DISCUSSION_ACCESS_TOKEN;

    return fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify({ query })
    });
  }

  const response = await fetch("/api/github", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({ query })
  });

  return response;
};
