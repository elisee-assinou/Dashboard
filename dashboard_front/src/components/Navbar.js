import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faTh, faBell, faCog, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import ServicesList from './servistList';

function Navbar() {
  const [showLinks, setShowLinks] = useState(false); // État pour afficher/masquer les liens de navigation

  // Remplacez ces valeurs par les données de l'utilisateur réelles
  const userName = "John Doe";
  const userAvatarUrl = "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="; // URL de l'image de profil de l'utilisateur

  // Fonction de déconnexion (à implémenter)
  const handleLogout = () => {
    // Mettez ici la logique de déconnexion
  };

  return (
    <nav className="bg-green-500 p-4 md:p-6 lg:p-8 ">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo de l'application */}
        <div className="text-white text-2xl lg:text-3xl">Net Wishes</div>

        {/* Bouton de basculement pour les liens de navigation sur les petits écrans */}
        <div className="md:hidden">
          <button
            onClick={() => setShowLinks(!showLinks)}
            className="text-white hover:text-gray-300 focus:outline-none"
          >
            <FontAwesomeIcon icon={showLinks ? faTimes : faBars} className="text-2xl" />
          </button>
        </div>

        {/* Liens de navigation et informations de l'utilisateur */}
        <ul className={`md:flex space-x-4 md:space-x-8 text-center ${showLinks ? 'block' : 'hidden'}`}>
          <li className="flex items-center">
            <Link to="/" className="text-white hover:underline">
              <FontAwesomeIcon icon={faHome} className="mr-2" /> Accueil
            </Link>
          </li>
          <li className="flex items-center">
            <Link to="/dashboard" className="text-white hover:underline">
              <FontAwesomeIcon icon={faTh} className="mr-2" /> Dashboard
            </Link>
          </li>
          <li className="flex items-center">
            <Link to="/my_services" className="text-white hover:underline">
              <FontAwesomeIcon icon={faCog} className="mr-2" /> Mes Services
            </Link>
          </li>
          <li className="flex items-center">
            <Link to="/notifications" className="text-white hover:underline">
              <FontAwesomeIcon icon={faBell} className="mr-2" /> Notifications
            </Link>
          </li>
        </ul>

        {/* Informations de l'utilisateur */}
        <div className="flex items-center space-x-2">
          {/* Photo de profil */}
          <img
            src={userAvatarUrl}
            alt="Photo de profil"
            className="w-12 h-12 lg:w-16 lg:h-16 rounded-full object-cover"
          />

          {/* Nom de l'utilisateur */}
          <span className="text-white text-base md:text-lg lg:text-xl">{userName}</span>
        </div>

        {/* Bouton de déconnexion */}
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg focus:outline-none text-base md:text-lg lg:text-xl"
        >
          Déconnexion
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
