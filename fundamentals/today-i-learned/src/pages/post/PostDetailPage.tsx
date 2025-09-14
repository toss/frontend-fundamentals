import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { PostDetail } from "@/components/features/discussions/PostDetail";
import { useDiscussionDetail } from "@/api/hooks/useDiscussions";
import { usePostReactions } from "@/hooks/usePostReactions";

export function PostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const previousId = useRef<string>();

  useEffect(() => {
    // 새로운 포스트로 이동하는 경우에만 스크롤 탑
    if (previousId.current !== undefined && previousId.current !== id) {
      window.scrollTo(0, 0);
    }
    previousId.current = id;
  }, [id]);
  
  const { data: discussion, isLoading, error } = useDiscussionDetail(id || "");
  
  const {
    handleLike,
    handleComment,
    handleUpvote
  } = usePostReactions({ discussion: discussion || undefined });

  const handleClose = () => {
    navigate(-1);
  };

  if (isLoading) {
    return (
      <div className="w-full h-screen bg-[#FCFCFC] flex items-center justify-center">
        <div className="w-[800px] h-[1080px] bg-[#FCFCFC] rounded-[16px] flex flex-col items-center pt-0 px-0 pb-6 overflow-hidden isolate">
          <div className="flex flex-row justify-end items-start p-6 gap-4 w-[800px] h-[68px] bg-[#FCFCFC] flex-none">
            <button
              className="w-5 h-5 flex items-center justify-center text-black/60 hover:text-black/80 transition-colors"
              onClick={handleClose}
            >
              <X size={16} />
            </button>
          </div>
          <div className="w-[800px] h-[696px] px-6 z-[1] overflow-y-auto flex items-center justify-center">
            <div className="text-gray-500">로딩 중...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !discussion) {
    return (
      <div className="w-full h-screen bg-[#FCFCFC] flex items-center justify-center">
        <div className="w-[800px] h-[1080px] bg-[#FCFCFC] rounded-[16px] flex flex-col items-center pt-0 px-0 pb-6 overflow-hidden isolate">
          <div className="flex flex-row justify-end items-start p-6 gap-4 w-[800px] h-[68px] bg-[#FCFCFC] flex-none">
            <button
              className="w-5 h-5 flex items-center justify-center text-black/60 hover:text-black/80 transition-colors"
              onClick={handleClose}
            >
              <X size={16} />
            </button>
          </div>
          <div className="w-[800px] h-[696px] px-6 z-[1] overflow-y-auto flex items-center justify-center">
            <div className="text-gray-500">포스트를 찾을 수 없습니다.</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-[#FCFCFC] flex items-center justify-center">
      <div className="w-[800px] h-[1080px] bg-[#FCFCFC] rounded-[16px] flex flex-col items-center pt-0 px-0 pb-6 overflow-hidden isolate">
        {/* Header with buttons */}
        <div className="flex flex-row justify-end items-start p-6 gap-4 w-[800px] h-[68px] bg-[#FCFCFC] flex-none">
          {/* X 닫기 버튼 */}
          <button
            className="w-5 h-5 flex items-center justify-center text-black/60 hover:text-black/80 transition-colors"
            onClick={handleClose}
          >
            <X size={16} />
          </button>
        </div>

        {/* 본문 영역 */}
        <div className="w-[800px] h-[696px] px-6 z-[1] overflow-y-auto">
          <PostDetail
            discussion={discussion as any}
            onLike={handleLike}
            onComment={handleComment}
            onUpvote={handleUpvote}
            showComments={true}
          />
        </div>
      </div>
    </div>
  );
}