import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom'; // Assurez-vous d'avoir configuré vos routes React Router

function ServicesList() {
    const [services, setServices] = useState([]);
    const [preferredServices, setPreferredServices] = useState([]);
    
    useEffect(() => {
      // Effectuez une requête pour récupérer les services préférés de l'utilisateur
      fetch('http://192.168.5.176:3000/user/preference/64f0fbb0cfab40dc430ce04a')
        .then((response) => {
          if (!response.ok) {
            throw new Error('La requête a échoué');
          }
          return response.json();
        })
        .then((data) => {
          setPreferredServices(data);
        })
        .catch((error) => {
          console.error('Erreur lors de la récupération des services préférés :', error);
        });
    }, []);
    
    useEffect(() => {
      // Effectuez une requête pour récupérer les services depuis votre API NestJS
      if (preferredServices.length) {
        const fetchServices = async () => {
          const updatedServices = [];
          for (const id of preferredServices) {
            try {
              const response = await fetch('http://192.168.5.176:3000/services/' + id);
              if (!response.ok) {
                throw new Error('La requête a échoué');
              }
              const data = await response.json();
              updatedServices.push(data);
            } catch (error) {
              console.error('Erreur lors de la récupération des services :', error);
            }
          }
          setServices(updatedServices);
        };

        fetchServices();
      }
    }, [preferredServices]);
    
    return (
        <div>
            <Navbar />
            <div className="bg-gradient-to-r from-blue-400 to-purple-500 p-8 rounded-xl shadow-xl">
                <h2 className="text-3xl font-extrabold text-white mb-4">Mes Services</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg p-6 hover:shadow-md transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
                        >
                            <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                            <p className="text-gray-700 mb-4">{service.description}</p>
                            {/* Widget pour le service */}
                            <div className="border-t border-gray-200 pt-4">{service.widget}</div>
                            {/* Bouton "Utiliser" avec lien vers une autre page */}
                            <Link
                                to={`/utiliser${service.nav}`}
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-blue-600 transition duration-300 ease-in-out">
                                Utiliser
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ServicesList;
