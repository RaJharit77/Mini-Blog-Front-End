import React, { useEffect, useState } from "react";
import { FaUserCircle } from 'react-icons/fa';
import { Link, useNavigate } from "react-router-dom";
import logo from "../../public/img/infini.jpg";

function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const storedUser = localStorage.getItem('username');
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('username');
        setUser(null);
        navigate("/connexion");
    };

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${isScrolled || menuOpen ? "bg-black bg-opacity-80 backdrop-blur-md" : "bg-transparent"}`}
        >
            <div className={`max-w-screen-xl mx-auto flex justify-between items-center p-4 ${menuOpen ? 'mt-10' : ''}`}>
                <a href="https://infinitix-task-manager.vercel.app/" className="flex items-center cursor-pointer">
                    <img
                        src={logo}
                        alt="Infinitix Logo"
                        className={`object-cover rounded-full transition-transform duration-300 ${menuOpen ? 'w-16 h-16' : 'w-14 h-14'}`}
                    />
                    {!menuOpen && (
                        <h1
                            className="text-white text-xl font-bold ml-2 transition-all duration-300 hover:bg-gradient-to-r hover:from-red-400 hover:via-yellow-400 hover:to-blue-500 hover:text-transparent hover:bg-clip-text"
                        >
                            Infinitix Task
                        </h1>
                    )}
                </a>

                <button
                    className={`absolute right-4 top-7 block md:hidden text-white bg-black p-2 rounded`}
                    onClick={() => setMenuOpen(!menuOpen)}
                    style={{ zIndex: 51 }}
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
                        ></path>
                    </svg>
                </button>

                <div className={`md:flex md:items-center ${menuOpen ? 'block pl-28' : 'hidden'} w-full md:w-auto mt-8 md:mt-0`}>
                    <div className="flex flex-col md:flex-row md:space-x-4 items-center">
                        {['Accueil', 'Gestionnaires', 'Statistiques'].map((text, index) => {
                            const path = text === 'Accueil'
                                ? '/'
                                : text === 'Gestionnaires'
                                    ? '/tasks'
                                    : '/tasks/stats';

                            return (
                                <Link
                                    key={index}
                                    to={path}
                                    className="text-white block py-2 px-4 text-center md:text-left relative transition-all duration-300
                                            hover:bg-gradient-to-r hover:from-red-400 hover:via-yellow-400 hover:to-blue-500 hover:text-transparent
                                            hover:bg-clip-text before:absolute before:bottom-0 before:left-0 before:w-full before:h-0.5
                                            before:bg-gradient-to-r before:from-red-400 before:via-yellow-400 before:to-blue-500 before:scale-x-0
                                            before:transition-transform before:duration-500 hover:before:scale-x-100"
                                    style={{ display: 'inline-block', position: 'relative' }}
                                >
                                    {text}
                                </Link>
                            );
                        })}
                        {user ? (
                            <div className="flex items-center space-x-2 text-white mt-4 md:mt-0">
                                <button
                                    className="bg-sky-500 text-white py-2 px-4 rounded-lg transition hover:bg-gradient-to-r hover:from-red-400 hover:via-yellow-400 
                                                hover:to-blue-500 hover:text-transparent hover:bg-clip-text"
                                    onClick={handleLogout}
                                >
                                    Déconnexion
                                </button>
                                <FaUserCircle size={24} />
                                <span>{user}</span>
                            </div>
                        ) : (
                            <button
                                className="bg-sky-700 text-white py-2 px-4 rounded-lg mt-4 md:mt-0 transition hover:bg-gradient-to-r hover:from-red-400 hover:via-yellow-400 
                                            hover:to-blue-500 hover:text-transparent hover:bg-clip-text"
                                onClick={() => navigate("/connexion")}
                            >
                                Se connecter
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
