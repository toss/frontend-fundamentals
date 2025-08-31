import { useCallback, useState } from "react";
import { CreatePost } from "./components/CreatePost";
import { PostList } from "./components/PostList";
import { MyStreak } from "../legacy-profile/components/MyStreak";
import { CategoryTabs, TabContent } from "./components/CategoryTabs";
import { WeeklyTop5 } from "@/components/features/discussions/WeeklyTop5";
import type { PostCategory } from "@/types";
import { useCreateDiscussion } from "@/api/hooks/useDiscussions";

export function LegacyTimelinePage() {
  const [activeTab, setActiveTab] = useState<PostCategory>("latest");
  const createDiscussionMutation = useCreateDiscussion();

  const handleCreatePost = useCallback(
    async (title: string, content: string) => {
      await createDiscussionMutation.mutateAsync({
        title,
        body: content
      });
    },
    [createDiscussionMutation]
  );

  const handleTabChange = useCallback((tab: PostCategory) => {
    setActiveTab(tab);
  }, []);

  // 탭별 PostList props 조건부 계산
  const getPostListProps = () => {
    switch (activeTab) {
      case "latest":
        return { sortBy: "latest" as const };
      case "weekly":
        return { sortBy: "popularity" as const };
      case "hall-of-fame":
        return {
          sortBy: "latest" as const,
          filterBy: { label: "성지 ⛲" }
        };
      default:
        return { sortBy: "latest" as const };
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-10">
        <MyStreak />
        <CreatePost
          onSubmit={handleCreatePost}
          isLoading={createDiscussionMutation.isPending}
        />
        <CategoryTabs activeTab={activeTab} onTabChange={handleTabChange} />
        <TabContent activeTab={activeTab}>
          <PostList {...getPostListProps()} />
        </TabContent>
      </div>

      <div className="lg:col-span-1">
        <div className="sticky top-4">
          <WeeklyTop5 />
        </div>
      </div>
    </div>
  );
}
