import { useEffect, useState } from "react";
import { FaEdit, FaEllipsisV, FaGlobe, FaTrash, FaUserCircle } from "react-icons/fa";

function BlogList() {
    const [posts, setPosts] = useState([]);
    const [expandedPostId, setExpandedPostId] = useState(null);
    const [showOptions, setShowOptions] = useState({});

    useEffect(() => {
        fetch("http://localhost:5000/api/consultationDesBlogs")
            .then(response => response.json())
            .then(data => {
                const postsWithTimestamps = data.map(post => {
                    const createdAt = new Date(post.createdAt);
                    console.log("Date de création analysée :", createdAt, "Format brut :", post.createdAt);
                    return {
                        ...post,
                        createdAt: createdAt
                    };
                });
                setPosts(postsWithTimestamps);
            });
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setPosts(currentPosts => [...currentPosts]);
        }, 60000);

        return () => clearInterval(timer);
    }, []);

    const formatTimeAgo = (date) => {
        if (!(date instanceof Date) || isNaN(date.getTime())) {
            return "Date invalide";
        }

        const now = new Date();
        const diff = Math.floor((now - date) / 1000);

        if (diff < 60) return "il y a quelques secondes";
        if (diff < 3600) return `il y a ${Math.floor(diff / 60)} minute(s)`;
        if (diff < 86400) return `il y a ${Math.floor(diff / 3600)} heure(s)`;
        return `il y a ${Math.floor(diff / 86400)} jour(s)`;
    };

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
        <div className="max-w-5xl mx-auto">
            <div className="bg-transparent p-6 rounded-lg shadow-lg grid grid-cols-1 gap-7">
                {posts.map(post => (
                    <article key={post.id} className="border bg-black p-4 rounded-lg shadow-md flex flex-col">
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center">
                                <FaUserCircle className="text-gray-100 text-3xl mr-3" />
                                <div className="flex-1">
                                    <h2 className="text-lg font-semibold text-gray-100 text-left">{post.author || "Auteur inconnu"}</h2>
                                    <p className="text-xs text-gray-100 flex items-center">
                                        <FaGlobe className="mr-1" /> {formatTimeAgo(post.createdAt)}
                                    </p>
                                </div>
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
