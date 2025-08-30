import { X, ExternalLink } from "lucide-react";
import { AlertDialog } from "@/components/shared/ui/AlertDialog";
import { PostDetail } from "@/components/features/discussions/PostDetail";
import type { GitHubDiscussion } from "@/api/remote/discussions";

interface PostDetailModalProps {
  discussion: GitHubDiscussion | null;
  isOpen: boolean;
  onClose: () => void;
  onLike: (postId: string) => void;
  onComment: (postId: string) => void;
  onUpvote: (postId: string) => void;
  onDelete?: (postId: string) => void;
}

export function PostDetailModal({
  discussion,
  isOpen,
  onClose,
  onLike,
  onComment,
  onUpvote,
  onDelete
}: PostDetailModalProps) {
  if (!discussion) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialog.Content className="w-[800px] h-[1080px] bg-[#FCFCFC] rounded-[16px] flex flex-col items-center pt-0 px-0 pb-6 overflow-hidden isolate">
        {/* Header with buttons */}
        <div className="flex flex-row justify-end items-start p-6 gap-4 w-[800px] h-[68px] bg-[#FCFCFC] flex-none">
          {/* 상세 페이지로 이동 버튼 */}
          <button
            className="w-5 h-5 flex items-center justify-center text-black/60 hover:text-black/80 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              window.open(`/post/${discussion.id}`, "_blank");
            }}
          >
            <ExternalLink className="w-[14.72px] h-[14.72px]" />
          </button>

          {/* X 닫기 버튼 */}
          <button
            className="w-5 h-5 flex items-center justify-center text-black/60 hover:text-black/80 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* 본문 영역 */}
        <div className="w-[800px] h-[696px] px-6 z-[1] overflow-y-auto">
          <PostDetail
            discussion={discussion}
            onLike={onLike}
            onComment={onComment}
            onUpvote={onUpvote}
            onDelete={onDelete}
            showComments={true}
          />
        </div>
      </AlertDialog.Content>
    </AlertDialog>
  );
}
