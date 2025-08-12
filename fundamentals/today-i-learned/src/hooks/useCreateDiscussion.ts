import { useMutation, useQueryClient } from "@tanstack/react-query";
import { graphqlRequest } from "../lib/api";
import { useAuth } from "../contexts/AuthContext";

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
  repo,
  accessToken
}: {
  title: string;
  body: string;
  owner: string;
  repo: string;
  accessToken: string;
}) {
  // 1. Repository 정보 조회
  const repoData = await graphqlRequest(GET_REPOSITORY_INFO_QUERY, {
    owner,
    repo
  }, accessToken);

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
  const createData = await graphqlRequest(CREATE_DISCUSSION_MUTATION, {
    repositoryId,
    categoryId: category.id,
    title,
    body
  }, accessToken);

  return createData.data?.createDiscussion?.discussion;
}

export function useCreateDiscussion() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const owner = "toss";
  const repo = "frontend-fundamentals";

  return useMutation({
    mutationFn: ({ title, body }: { title: string; body: string }) => {
      if (!user?.access_token) {
        throw new Error("User not authenticated");
      }
      return createDiscussion({ title, body, owner, repo, accessToken: user.access_token });
    },
    onSuccess: () => {
      // 성공 시 discussions 목록을 새로고침
      queryClient.invalidateQueries({
        queryKey: ["discussions", owner, repo]
      });
    }
  });
}
