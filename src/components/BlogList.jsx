import { useEffect, useState } from "react";
import { FaCompress, FaEdit, FaEllipsisV, FaExpand, FaTrash } from "react-icons/fa";

function BlogList() {
    const [posts, setPosts] = useState([]);
    const [expandedPostId, setExpandedPostId] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5000/api/consultationDesBlogs")
            .then(response => response.json())
            .then(data => setPosts(data));
    }, []);

    const handleDelete = async (id) => {
        await fetch(`http://localhost:5000/api/consultationDesBlogs/${id}`, { method: "DELETE" });
        setPosts(posts.filter(post => post.id !== id));
    };

    const toggleExpand = (id) => {
        setExpandedPostId(expandedPostId === id ? null : id);
    };

    return (
        <div className="bg-gray-900 bg-opacity-50 p-6 rounded shadow-lg max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4 text-sky-500 text-center">Articles de Blog</h1>
            {posts.map(post => (
                <article key={post.id} className="border p-4 mb-4 rounded-lg border-gray-300">
                    <div className="flex justify-between">
                        <h2 className="text-xl font-semibold text-gray-300">{post.title}</h2>
                        <FaEllipsisV className="text-gray-300 cursor-pointer" />
                    </div>
                    {expandedPostId === post.id ? (
                        <p className="text-gray-300">{post.content}</p>
                    ) : (
                        <p className="text-gray-300">{post.content.substring(0, 100)}...</p>
                    )}
                    {post.author && (
                        <p className="text-sm text-gray-400 mt-2">Par : {post.author}</p>
                    )}
                    <div className="flex gap-2 mt-4">
                        <button onClick={() => toggleExpand(post.id)} className="text-gray-300">
                            {expandedPostId === post.id ? <FaCompress /> : <FaExpand />}
                        </button>
                        <FaEdit className="text-yellow-500 cursor-pointer" onClick={() => alert("Fonction de modification non implémentée")} />
                        <FaTrash className="text-red-500 cursor-pointer" onClick={() => handleDelete(post.id)} />
                    </div>
                </article>
            ))}
        </div>
    );
}

export default BlogList;
