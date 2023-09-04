import Navbar from './Navbar';
import Footer from './footer';
import React, { useEffect, useState } from 'react';

function Home() {
  const [services, setServices] = useState([]);
  const [myServices, setMyServices] = useState([]);
  
  // Vérifiez si l'utilisateur est authentifié en utilisant le token dans sessionStorage
  const isAuthenticated = sessionStorage.getItem('token') !== null;

  useEffect(() => {
    // Récupérer les services depuis votre API NestJS en utilisant fetch
    fetch('http://127.0.0.1:3001/services')
      .then((response) => {
        if (!response.ok) {
          throw new Error('La requête a échoué');
        }
        return response.json();
      })
      .then((data) => {
        setServices(data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des services :', error);
      });
  }, []);

  // Fonction pour ajouter un service à vos services personnels en utilisant la route NestJS
  const addToMyServices = (service) => {
    const userId = sessionStorage.getItem('userId'); // Récupérez l'ID de l'utilisateur depuis sessionStorage
    const token = sessionStorage.getItem('token'); // Récupérez le token depuis sessionStorage

    const url = `http://127.0.0.1:3001/user/${userId}/add-preference/${service._id}`;

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Ajoutez le token JWT dans les en-têtes
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('La requête a échoué');
        }
        return response.json();
      })
      .then((data) => {
        // Mettez à jour votre liste de services personnels si nécessaire
        setMyServices([...myServices, data]);
        window.location.href = '/my_services';
      })
      .catch((error) => {
        console.error('Erreur lors de l\'ajout du service à vos services personnels :', error);
      });
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar isAuthenticated={isAuthenticated} /> 
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-semibold text-gray-800 mb-5">Services Disponibles</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {services.map((service) => (
            <div key={service.id} className="bg-white rounded-lg shadow-md p-4 transition transform hover:scale-105">
              <h2 className="text-xl font-semibold text-gray-800">{service.title}</h2>
              <p className="text-gray-600 mt-2">{service.description}</p>
              {isAuthenticated && (
                <button
                  onClick={() => addToMyServices(service)}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover-bg-blue-600">
                  Ajouter à mes services
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
