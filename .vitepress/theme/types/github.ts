export interface GithubDiscussion {
  id: string;
  title: string;
  url: string;
  author: {
    login: string;
    url: string;
  };
  createdAt: string;
  category: {
    name: string;
    emoji: string;
  };
  comments: {
    totalCount: number;
  };
  closed: boolean;
  closedAt: string | null;
}

export interface GithubDiscussionsResponse {
  repository: {
    discussions: {
      nodes: GithubDiscussion[];
    };
  };
}
