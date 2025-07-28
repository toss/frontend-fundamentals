import { useState, useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { PostList } from "./components/post/PostList";
import { CreatePost } from "./components/post/CreatePost";
import { MyStreak } from "./components/streak/MyStreak";
import { CategoryTabs, TabContent } from "./components/timeline/CategoryTabs";
import { useCreateDiscussion } from "./hooks/useCreateDiscussion";
import { MyPage } from "./pages/MyPage";
import type { PostCategory } from "./types";

function HomePage() {
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
    <div className="space-y-10 max-w-4xl mx-auto px-4">
      {/* Streak Section */}
      <MyStreak />

      {/* Post Creation Section */}
      <CreatePost
        onSubmit={handleCreatePost}
        isLoading={createDiscussionMutation.isPending}
      />

      {/* Navigation Tabs */}
      <CategoryTabs activeTab={activeTab} onTabChange={handleTabChange} />

      {/* Content Area */}
      <TabContent activeTab={activeTab}>{renderTabContent()}</TabContent>
    </div>
  );
}

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<MyPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
