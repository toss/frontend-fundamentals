import type { GitHubDiscussion } from "@/api/remote/discussions";

type SortFilter = "created" | "lastActivity";

export function filterUserPosts(
  discussions: GitHubDiscussion[],
  userLogin: string
): GitHubDiscussion[] {
  return discussions.filter(
    (discussion) => discussion.author.login === userLogin
  );
}

export function sortPosts(
  posts: GitHubDiscussion[],
  sortFilter: SortFilter
): GitHubDiscussion[] {
  return [...posts].sort((a, b) => {
    if (sortFilter === "created") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else {
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    }
  });
}

export function processUserPosts(
  allPages: Array<{ discussions: GitHubDiscussion[] }>,
  userLogin: string,
  sortFilter: SortFilter
): GitHubDiscussion[] {
  const allDiscussions = allPages.flatMap((page) => page.discussions);
  const filteredPosts = filterUserPosts(allDiscussions, userLogin);
  return sortPosts(filteredPosts, sortFilter);
}
