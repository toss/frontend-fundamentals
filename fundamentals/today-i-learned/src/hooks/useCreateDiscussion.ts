import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchGithub, handleGraphQLResponse } from "../utils/github";

const CREATE_DISCUSSION_MUTATION = `
  mutation CreateDiscussion($repositoryId: ID!, $categoryId: ID!, $title: String!, $body: String!) {
    createDiscussion(input: {
      repositoryId: $repositoryId
      categoryId: $categoryId
      title: $title
      body: $body
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
        category {
          name
        }
        reactions {
          totalCount
        }
        comments {
          totalCount
        }
      }
    }
  }
`;

const GET_REPOSITORY_INFO_QUERY = `
  query GetRepositoryInfo($owner: String!, $repo: String!) {
    repository(owner: $owner, name: $repo) {
      id
      discussionCategories(first: 10) {
        nodes {
          id
          name
        }
      }
    }
  }
`;

async function createDiscussion({
  title,
  body,
  owner,
  repo
}: {
  title: string;
  body: string;
  owner: string;
  repo: string;
}) {
  // 1. Repository 정보 조회
  const repoResponse = await fetchGithub(GET_REPOSITORY_INFO_QUERY, {
    owner,
    repo
  });
  const repoData = await handleGraphQLResponse(
    repoResponse,
    "Failed to get repository info"
  );

  const repositoryId = repoData.data?.repository?.id;
  const categories =
    repoData.data?.repository?.discussionCategories?.nodes || [];

  // 2. 카테고리 선택
  const category =
    categories.find((cat: any) => cat.name === "General") || categories[0];

  if (!repositoryId || !category) {
    throw new Error("Repository or category not found");
  }

  // 3. Discussion 생성
  const createResponse = await fetchGithub(CREATE_DISCUSSION_MUTATION, {
    repositoryId,
    categoryId: category.id,
    title,
    body
  });

  const createData = await handleGraphQLResponse(
    createResponse,
    "Failed to create discussion"
  );

  return createData.data?.createDiscussion?.discussion;
}

export function useCreateDiscussion() {
  const queryClient = useQueryClient();

  const owner = import.meta.env.VITE_GITHUB_OWNER || "al-bur";
  const repo = import.meta.env.VITE_GITHUB_REPO || "test";

  return useMutation({
    mutationFn: ({ title, body }: { title: string; body: string }) =>
      createDiscussion({ title, body, owner, repo }),
    onSuccess: () => {
      // 성공 시 discussions 목록을 새로고침
      queryClient.invalidateQueries({
        queryKey: ["discussions", owner, repo]
      });
    }
  });
}
