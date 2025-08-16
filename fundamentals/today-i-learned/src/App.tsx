import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { MyPage } from "./pages/MyPage";
import { TimelinePage } from "./pages/TimelinePage";


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
