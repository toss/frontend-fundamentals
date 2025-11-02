import type { GitHubDiscussionDetail } from "@/api/remote/discussions";
import { PostHeader } from "./PostHeader";
import { PostContent } from "./PostContent";
import { PostReactions } from "./PostReactions";

export function ContentBody({
  discussionDetail
}: {
  discussionDetail: GitHubDiscussionDetail;
}) {
  return (
    <>
      <PostHeader
        author={discussionDetail.author}
        createdAt={discussionDetail.createdAt}
      />

      <PostContent
        title={discussionDetail.title}
        body={discussionDetail.body}
      />

      <PostReactions discussionDetail={discussionDetail} />
    </>
  );
}