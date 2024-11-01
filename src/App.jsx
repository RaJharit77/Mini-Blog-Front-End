import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import BlogList from "./Pages/BlogListPage";
import CreatePost from "./Pages/CreatePostPage";
import HomePage from "./Pages/HomePage";
import Navbar from "./Pages/NavBar";

function App() {
    return (
        <Router>
            <Navbar />
            <div className="flex justify-center items-center p-0 gap-0 min-h-screen text-center">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/creationDePublication" element={<CreatePost />} />
                    <Route path="/consultationDesBlogs" element={<BlogList />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
