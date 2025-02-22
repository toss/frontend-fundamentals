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
              }
            }
          }
        }
      `;

      const response = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${config.token}`
        },
        body: JSON.stringify({ query })
      });

      const data = await response.json();

      if (data.errors) {
        throw new Error(data.errors[0].message);
      }

      return data.data.repository.discussions.nodes;
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
