import { useQuery } from "@tanstack/react-query";
import { graphqlRequest } from "../lib/api";

interface WeeklyTopDiscussion {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  author: {
    login: string;
    avatarUrl: string;
  };
  reactions: {
    totalCount: number;
  };
  comments: {
    totalCount: number;
  };
  category: {
    name: string;
  };
  score: number;
}

const QUERY = `
  query GetWeeklyTopDiscussions($owner: String!, $repo: String!, $first: Int!) {
    repository(owner: $owner, name: $repo) {
      discussions(first: $first, orderBy: { field: CREATED_AT, direction: DESC }) {
        nodes {
          id
          title
          body
          createdAt
          author { login, avatarUrl }
          reactions { totalCount }
          comments { totalCount }
          category { name }
        }
      }
    }
  }
`;

export function useWeeklyTopDiscussions({
  owner = "toss",
  repo = "frontend-fundamentals",
  categoryName = import.meta.env.VITE_GITHUB_CATEGORY,
  limit = 5
} = {}) {
  return useQuery({
    queryKey: ["weekly-top", owner, repo, categoryName, limit],
    queryFn: async () => {
      const now = new Date();
      const weekStart = new Date(now);
      weekStart.setDate(
        now.getDate() - (now.getDay() === 0 ? 6 : now.getDay() - 1)
      );
      weekStart.setHours(0, 0, 0, 0);

      const data = await graphqlRequest(QUERY, { owner, repo, first: 50 });
      let discussions = data.data?.repository?.discussions?.nodes || [];

      discussions = discussions.filter((d: any) => {
        const isThisWeek = new Date(d.createdAt) >= weekStart;
        const isCategory = !categoryName || d.category?.name === categoryName;
        return isThisWeek && isCategory;
      });

      /**
       * criteria: reaction + comment
       */
      return discussions
        .map((d: any) => ({
          ...d,
          score: (d.reactions?.totalCount || 0) + (d.comments?.totalCount || 0)
        }))
        .sort((a: any, b: any) => b.score - a.score)
        .slice(0, limit) as WeeklyTopDiscussion[];
    },
    staleTime: 5 * 60 * 1000 // 5분
  });
}
