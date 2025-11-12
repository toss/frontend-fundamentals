import { useDiscussionDetail } from "@/api/hooks/useDiscussions";
import { css } from "@styled-system/css";
import { useParams } from "react-router-dom";
import { ContentBody } from "./ContentBody";
import { CommentInput } from "./CommentInput";
import { CommentsSection } from "./CommentsSection";

export function PostDetail() {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    throw new Error("게시물이 존재하지 않아요.");
  }

  const { data: discussionDetail } = useDiscussionDetail(id);
  const comments = discussionDetail?.comments?.nodes || [];

  return (
    <div className={postContainer}>
      <ContentBody discussionDetail={discussionDetail} />

      <div className={dividerContainer}>
        <div className={dividerLine} />
      </div>

      <CommentInput discussionId={discussionDetail.id} />

      <div className={dividerContainer}>
        <div className={dividerLine} />
      </div>

      <CommentsSection comments={comments} discussionId={discussionDetail.id} />
    </div>
  );
}

const postContainer = css({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "2rem"
});

const dividerContainer = css({
  paddingY: "1rem"
});

const dividerLine = css({
  width: "100%",
  height: "0",
  borderTop: "1px solid rgba(201, 201, 201, 0.4)"
});
