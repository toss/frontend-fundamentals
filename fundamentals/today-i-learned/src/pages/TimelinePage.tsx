import { useCallback, useState } from "react";
import { CreatePost } from "../components/post/CreatePost";
import { PostList } from "../components/post/PostList";
import { MyStreak } from "../components/streak/MyStreak";
import { CategoryTabs, TabContent } from "../components/timeline/CategoryTabs";
import { WeeklyTop5 } from "../components/weekly/WeeklyTop5";
import { useCreateDiscussion } from "../hooks/useCreateDiscussion";
import type { PostCategory } from "../types";

export function TimelinePage() {
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

  const renderTabContent = () => {
    switch (activeTab) {
      case "latest":
        return <PostList />;
      case "weekly":
        return (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            주간 인기글 기능을 준비중입니다...
          </div>
        );
      case "hall-of-fame":
        return (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            명예의 전당 기능을 준비중입니다...
          </div>
        );
      default:
        return null;
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
        <TabContent activeTab={activeTab}>{renderTabContent()}</TabContent>
      </div>

      <div className="lg:col-span-1">
        <div className="sticky top-4">
          <WeeklyTop5 />
        </div>
      </div>
    </div>
  );
}
