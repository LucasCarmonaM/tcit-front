import { BrowserRouter, Route, Routes } from "react-router-dom";
import PostsContainer from "./modules/posts/posts.container";

function App() {
  return (
    <div className="bg-zinc-900 h-screen text-white">
      <div className="flex items-center justify-center h-full">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PostsContainer />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
