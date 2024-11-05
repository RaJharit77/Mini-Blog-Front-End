import {
    faFacebook,
    faInstagram,
    faLinkedin,
    faWhatsapp,
    faXTwitter
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import logo from '../../public/img/infini.jpg';

function Footer() {
    return (
        <footer className="bg-black text-sky-500 py-4 relative">
            <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
                <div className="flex flex-col items-center sm:items-start sm:ml-7 mb-2 sm:mb-0">
                    <a href="#" className="w-24 h-24 rounded-full overflow-hidden mb-2">
                        <img src={logo} alt="Logo Patrimoine Économique" className="w-full h-full object-cover" />
                    </a>
                </div>

                <div className="flex space-x-6 justify-center sm:justify-end sm:mr-8 mt-1 sm:mt-0 items-center mb-2 sm:mb-1">
                    <a href="https://www.facebook.com/" className="text-sky-500 hover:text-sky-600">
                        <FontAwesomeIcon icon={faFacebook} size="2xl" />
                    </a>
                    <a href="https://www.instagram.com/" className="text-sky-500 hover:text-sky-600">
                        <FontAwesomeIcon icon={faInstagram} size="2xl" />
                    </a>
                    <a href="https://x.com/" className="text-sky-500 hover:text-or-sky-600">
                        <FontAwesomeIcon icon={faXTwitter} size="2xl" />
                    </a>
                    <a href="https://linkedin.com/" className="text-sky-500 hover:text-sky-600">
                        <FontAwesomeIcon icon={faLinkedin} size="2xl" />
                    </a>
                    <a href="https://web.whatsapp.com/" className="text-sky-500 hover:text-sky-600">
                        <FontAwesomeIcon icon={faWhatsapp} size="2xl" />
                    </a>
                    <a href="mailto:gestion.patrimoine@gmail.com" className="text-sky-500 hover:text-sky-600">
                        <FontAwesomeIcon icon={faEnvelope} size="2xl" />
                    </a>
                </div>
            </div>

            <div className="w-full text-center bg-black py-2">
                <p className="text-sky-500">&copy; {new Date().getFullYear()} Gestion de Patrimoine®. All rights reserved. Created by RaJharit77</p>
            </div>
        </footer>
    );
}

export default Footer;
