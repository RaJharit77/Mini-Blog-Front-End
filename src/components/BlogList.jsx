import { useEffect, useState } from "react";

function BlogList() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/posts")
            .then(response => response.json())
            .then(data => setPosts(data));
    }, []);

    const handleDelete = async (id) => {
        await fetch(`http://localhost:5000/api/posts/${id}`, { method: "DELETE" });
        setPosts(posts.filter(post => post.id !== id));
    };

    return (
        <div className="bg-white p-6 rounded shadow-lg max-w-md">
            <h1 className="text-2xl font-bold mb-4">Articles de Blog</h1>
            {posts.map(post => (
                <article key={post.id} className="border p-4 mb-4 rounded">
                    <h2 className="text-xl font-semibold">{post.title}</h2>
                    <p>{post.content.substring(0, 100)}...</p>
                    <p className="text-sm text-gray-500 mt-2">Par : {post.author}</p>
                    <div className="flex gap-2 mt-4">
                        <button
                            className="bg-yellow-500 text-white px-3 py-1 rounded"
                            onClick={() => alert("Fonction de modification non implémentée")}
                        >
                            Modifier
                        </button>
                        <button
                            className="bg-red-500 text-white px-3 py-1 rounded"
                            onClick={() => handleDelete(post.id)}
                        >
                            Supprimer
                        </button>
                    </div>
                </article>
            ))}
        </div>
    );
}

export default BlogList;
