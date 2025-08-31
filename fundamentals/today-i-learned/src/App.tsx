import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/shared/layout/Layout";
import { LegacyTimelinePage } from "./pages/legacy-timeline/TimelinePage";
// import { PostDetailPage } from "./pages/postDetail/PostDetailPage";
import { MyPage as LegacyMyPage } from "./pages/legacy-profile/MyPage";
import { MyPage } from "./pages/profile/MyPage";
import { TimelinePage } from "./pages/timeline/TimelinePage";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<TimelinePage />} />
        <Route path="/profile" element={<MyPage />} />
        <Route path="/legacy-profile" element={<LegacyMyPage />} />
        <Route path="/legacy-timeline" element={<LegacyTimelinePage />} />
        {/* NOTE: MVP에서는 제외 (모달만 제공) */}
        {/* <Route path="/post/:id" element={<PostDetailPage />} /> */}
      </Routes>
    </Layout>
  );
}

export default App;
