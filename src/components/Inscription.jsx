import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Inscription = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const apiUrl = "https://infinitix-task-back-end.vercel.app" || import.meta.env.VITE_REACT_API_URL || "https://infinitix-task-back-end.onrender.com" || import.meta.env.VITE_REACT_APP_API_URL;

    /**const apiUrl = "http://localhost:5000" || import.meta.env.VITE_REACT_API_URL;*/

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${apiUrl}/api/inscription`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });
            if (response.ok) {
                navigate('/');
            } else {
                console.error("Erreur lors de l'inscription");
            }
        } catch (error) {
            console.error("Erreur:", error);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleSubmit} className="bg-white bg-opacity-70 p-12 rounded shadow-md relative">
                <h2 className="text-xl mb-4 bg-gradient-to-r from-purple-500 via-emerald-500 to-pink-500 bg-clip-text text-transparent">Créer un compte</h2>

                <button onClick={() => navigate('/connexion')} className="absolute top-2 px-2 right-0 mr-2 text-sky-500 bg-clip-text hover:text-pink-500 hover:bg-clip-text">
                    <FaTimes size={20} />
                </button>

                <div className="mb-4">
                    <label className="block mb-2 bg-gradient-to-r from-yellow-500 via-emerald-500 to-pink-500 bg-clip-text text-transparent" htmlFor="username">Nom d'utilisateur</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="border border-gray-400 p-2 rounded-lg w-full bg-black"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 bg-gradient-to-r from-pink-500 via-emerald-500 to-purple-500 bg-clip-text text-transparent" htmlFor="password">Mot de passe</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border border-gray-400 p-2 rounded-lg w-full bg-black"
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-500 transition hover:bg-gradient-to-r hover:from-red-400 hover:via-yellow-400 
                    hover:to-blue-500 hover:text-transparent hover:bg-clip-text before:absolute before:bottom-0 before:left-0 
                    before:w-full before:h-0.5 before:bg-gradient-to-r before:from-red-400 before:via-yellow-400 
                    before:to-blue-500 before:scale-x-0 before:transition-transform before:duration-500 text-white py-2 px-4 rounded">
                    S'inscrire
                </button>
            </form>
        </div>
    );
};

export default Inscription;
