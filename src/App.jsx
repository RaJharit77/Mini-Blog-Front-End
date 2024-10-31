import BlogList from "./Pages/BlogListPage";
import CreatePost from "./Pages/CreatePostPage";

function App() {
    return (
        <div className="flex justify-center items-center p-8 gap-8 min-h-screen">
            <CreatePost />
            <BlogList />
        </div>
    );
}

export default App;
