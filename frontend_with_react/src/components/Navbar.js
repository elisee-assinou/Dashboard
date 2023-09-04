// Navbar.js
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faTh, faBell, faCog, faBars, faTimes, faSignInAlt, faUserPlus, faSignOutAlt, } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const [showLinks, setShowLinks] = useState(false); // État pour afficher/masquer les liens de navigation
  const [isAuthenticated, setIsAuthenticated] = useState(false); // État pour vérifier si l'utilisateur est authentifié
  const [userName, setUserName] = useState(""); // État pour stocker le nom d'utilisateur
  const [admin, setAdmin] = useState(""); // État pour stocker le nom d'utilisateur

  const userAvatarUrl = "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="; // URL de l'image de profil de l'utilisateur
  const navigate = useNavigate();


  // Fonction de déconnexion
  const handleLogout = () => {
    const token = sessionStorage.getItem('token');
    const userId = sessionStorage.getItem('userId');

    if (!token || !userId) {
      // Si les tokens ou l'ID utilisateur ne sont pas présents en session, ne faites rien
      return;
    }

    // Envoyez une requête à la route "logout/iduser" de votre API pour se déconnecter
    fetch(`http://127.0.0.1:3001/user/logout/${userId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('La requête de déconnexion a échoué');
        }

        // Supprimer le token et l'ID utilisateur de sessionStorage
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('userId');
        setIsAuthenticated(false);
        navigate('/login');
      })
      .catch((error) => {
        console.error('Erreur lors de la déconnexion :', error);
      });
  };



  // Récupérer le nom de l'utilisateur en fonction de l'ID dans la session
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      const userId = sessionStorage.getItem('userId');
      if (userId) {
        // Effectuer une requête pour récupérer le nom de l'utilisateur en fonction de userId
        fetch(`http://127.0.0.1:3001/user/${userId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('La requête a échoué');
            }
            return response.json();
          })
          .then((data) => {
            setUserName(data.user.email);
            setAdmin(data.user.isAdmin);

          })
          .catch((error) => {
            console.error('Erreur lors de la récupération du nom d\'utilisateur :', error);
          });
      }
    }
  }, []);

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
          {isAuthenticated ? (
            <>
              <li className="flex items-center">
                <Link to="/" className="text-white hover:underline">
                  <FontAwesomeIcon icon={faHome} className="mr-2" /> Accueil
                </Link>
              </li>
              {isAuthenticated && admin ? (
                <li className="flex items-center">
                  <Link to="http://localhost:3002/dashboard/users" className="text-white hover:underline">
                    <FontAwesomeIcon icon={faTh} className="mr-2" /> Dashboard
                  </Link>
                </li>
              ) : null}

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
            </>
          ) : null}

          {/* Lien "Se connecter" et "S'enregistrer" */}
          {!isAuthenticated ? (
            <>
              {/* Lien "Se connecter" */}
              <li className="flex items-center">
                <Link to="/login" className="text-white hover:underline">
                  <FontAwesomeIcon icon={faSignInAlt} className="mr-2" /> Se connecter
                </Link>
              </li>

              {/* Lien "S'enregistrer" */}
              <li className="flex items-center">
                <Link to="/register" className="text-white hover:underline">
                  <FontAwesomeIcon icon={faUserPlus} className="mr-2" /> S'enregistrer
                </Link>
              </li>
            </>
          ) : null}
        </ul>

        {/* Informations de l'utilisateur */}
        {isAuthenticated && (
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
        )}

        {/* Bouton de déconnexion */}
        {isAuthenticated && (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg focus:outline-none text-base md:text-lg lg:text-xl"
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
          </button>
        )}

      </div>
    </nav>
  );
}

export default Navbar;
