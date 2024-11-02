import { useEffect, useState } from "react";
import { FaEdit, FaEllipsisV, FaTrash, FaUserCircle } from "react-icons/fa";

function BlogList() {
    const [posts, setPosts] = useState([]);
    const [expandedPostId, setExpandedPostId] = useState(null);
    const [showOptions, setShowOptions] = useState({});

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

    const toggleOptions = (id) => {
        setShowOptions(prev => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div className="max-w-4xl mx-auto">
            {/**<h1 className="text-2xl font-bold mb-4 text-sky-500 text-center">Articles de Blog</h1>*/}
            <div className="bg-transparent p-6 rounded-lg shadow-lg">
                {posts.map(post => (
                    <article key={post.id} className="border bg-black p-5 mb-7 rounded-lg shadow-md">
                        <div className="flex items-center mb-3">
                            <FaUserCircle className="text-gray-100 text-3xl mr-3" />
                            <div className="flex-1">
                                <h2 className="text-lg font-semibold text-gray-100 text-left">{post.author || "Auteur inconnu"}</h2>
                                <p className="text-xs text-gray-100">Posté il y a quelques heures</p>
                            </div>
                            <div className="relative">
                                <FaEllipsisV
                                    className="text-gray-600 cursor-pointer"
                                    onClick={() => toggleOptions(post.id)}
                                />
                                {showOptions[post.id] && (
                                    <div className="absolute right-0 mt-3 bg-gray-900 text-gray-100 rounded shadow-lg p-2 z-10">
                                        <div className="flex flex-col gap-2">
                                            <button className="flex items-center gap-1 text-cyan-500" onClick={() => alert("Fonction de modification non implémentée")}>
                                                <FaEdit />
                                            </button>
                                            <button className="flex items-center gap-1 text-pink-500" onClick={() => handleDelete(post.id)}>
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-300 mb-2 text-left">{post.subject || "Sujet inconnu"}</h3>
                        <h4 className="text-xl font-bold text-gray-100 mb-2 text-left">{post.title}</h4>
                        <div>
                            {expandedPostId === post.id ? (
                                <p className="text-gray-100 text-left">{post.content || "Contenu non disponible."}</p>
                            ) : (
                                <p className="text-gray-100 text-left">{post.content ? post.content.substring(0, 100) + "..." : "Contenu non disponible."}</p>
                            )}
                        </div>
                        <button onClick={() => toggleExpand(post.id)} className="text-sky-500 mt-2 text-sm">
                            {expandedPostId === post.id ? "Voir moins" : "Voir plus"}
                        </button>
                    </article>
                ))}
            </div>
        </div>
    );
}

export default BlogList;
