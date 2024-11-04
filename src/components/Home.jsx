import Fade from '@mui/material/Fade';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
    const [showButtons, setShowButtons] = useState(false);

    const handleClick = () => {
        setShowButtons(true);
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen overflow-hidden">
            <h1 className="text-4xl bg-gradient-to-r from-purple-500 via-emerald-500 to-pink-500 bg-clip-text text-transparent font-bold mb-6">
                Bienvenue sur Infinitix Tasks
            </h1>
            <button
                onClick={handleClick}
                className="bg-gradient-to-r from-pink-500 to-purple-500 via-teal-500 text-black px-6 py-3 rounded-xl shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:text-indigo-700"
                data-aos="fade-up"
            >
                Cliquez ici
            </button>

            <Fade in={showButtons} timeout={500}>
                <div className="mt-4 grid grid-cols-2 gap-4">
                    <Link 
                        to="/tasks"
                        className={`bg-gradient-to-r from-yellow-400 to-sky-500 via-purple-500 text-black px-6 py-3 rounded-xl shadow-lg 
                                    transition-transform duration-500 transform translate-y-20 animate-bounce-up delay-100 hover:text-indigo-700`}
                        data-aos="fade-up"
                    >
                        Créer une publication
                    </Link>
                    <Link 
                        to="/tasks/stats"
                        className={`bg-gradient-to-r from-green-400 to-pink-500 via-blue-500 text-black px-6 py-3 rounded-xl shadow-lg 
                                    transition-transform duration-500 transform translate-y-20 animate-bounce-up delay-200 hover:text-indigo-700`}
                        data-aos="fade-up"
                    >
                        Consulter les blogs
                    </Link>
                </div>
            </Fade>
        </div>
    );
}

export default Home;
