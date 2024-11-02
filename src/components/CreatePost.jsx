import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreatePost() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [author, setAuthor] = useState("");
    const [subject, setSubject] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const postData = {
            title,
            content,
            author,
            subject
        };

        await fetch("http://localhost:5000/api/creationDePublication", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(postData),
        });

        setTitle("");
        setContent("");
        setAuthor("");
        setSubject("");

        navigate("/consultationDesBlogs");
    };

    return (
        <div className="bg-gray-900 bg-opacity-50 p-6 rounded shadow-lg max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4 text-sky-500">Créer un nouvel article</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Auteur"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="border p-2 rounded-lg bg-gray-600 border-gray-600 text-gray-300"
                />
                <input
                    type="text"
                    placeholder="Sujet"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="border p-2 rounded-lg bg-gray-600 border-gray-600 text-gray-300"
                />
                <input
                    type="text"
                    placeholder="Titre"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border p-2 rounded-lg bg-gray-600 border-gray-600 text-gray-300"
                />
                <textarea
                    placeholder="Contenu"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="border p-2 rounded-lg bg-gray-600 border-gray-600 text-gray-300"
                />
                <button type="submit" className="bg-sky-500 text-white p-2 rounded">
                    Publier
                </button>
            </form>
        </div>
    );
}

export default CreatePost;
