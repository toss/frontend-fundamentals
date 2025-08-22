import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/shared/layout/Layout";
import { NewHomePage } from "./pages/newHome";
import { MyPage } from "./pages/profile/MyPage";
import { TimelinePage } from "./pages/timeline/TimelinePage";
import { PostDetailPage } from "./pages/postDetail/PostDetailPage";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<TimelinePage />} />
        <Route path="/profile" element={<MyPage />} />
        <Route path="/new-home" element={<NewHomePage />} />
        <Route path="/post/:id" element={<PostDetailPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
