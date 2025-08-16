import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/shared/layout/Layout";
import { MyPage } from "./pages/profile/MyPage";
import { TimelinePage } from "./pages/timeline/TimelinePage";


function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<TimelinePage />} />
        <Route path="/profile" element={<MyPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
