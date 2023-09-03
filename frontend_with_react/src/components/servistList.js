import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import CryptoPrices from './BtcandEth';
import TriviaQuestion from './questions';
import Chat from './Chat';
import CountryInfo from './CountryInfo';
import RandomGif from './Gif';
import AdviceGenerator from './Advice';
import WeatherApp from './Weather';
import DateDisplay from './Date';
import Footer from './footer';

const componentMap = {
  'CryptoPrices': CryptoPrices,
  'TriviaQuestion': TriviaQuestion,
  'Chat': Chat,
  'CountryInfo': CountryInfo,
  'RandomGif': RandomGif,
  'AdviceGenerator': AdviceGenerator,
  'Weather': WeatherApp,
  'Date': DateDisplay,
};

function ServicesList() {
  const [services, setServices] = useState([]);
  const [preferredServices, setPreferredServices] = useState([]);
  const userId = sessionStorage.getItem('userId'); // Récupérer le userId depuis sessionStorage

  useEffect(() => {
    fetch(`http://127.0.0.1:3001/user/preference/${userId}`)
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
  }, [userId]);

  useEffect(() => {
    if (preferredServices.length) {
      const fetchServices = async () => {
        const updatedServices = [];
        for (const id of preferredServices) {
          try {
            const response = await fetch(`http://127.0.0.1:3001/services/${id}`);
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

  const removePreference = (serviceId) => {
    const url = `http://127.0.0.1:3001/user/${userId}/delete-preference/${serviceId}`;
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('La requête de suppression a échoué');
        }
        const updatedServices = services.filter((service) => service._id !== serviceId);
        setServices(updatedServices);
      })
      .catch((error) => {
        console.error('Erreur lors de la suppression de la préférence :', error);
      });
  };

  return (
    <div>
      <Navbar />
      <div className="bg-gradient-to-r from-blue-400 to-purple-500 p-8 rounded-xl shadow-xl">
        <h2 className="text-3xl font-extrabold text-white mb-4">Mes Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const ComponentToRender = componentMap[service.nav];

            return (
              <div
                key={index}
                className="bg-white rounded-lg p-6 hover:shadow-md transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
              >
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-700 mb-4">{service.description}</p>
                <div className="border-t border-gray-200 pt-4">
                  {ComponentToRender && <ComponentToRender />}
                </div>
                <button
                  onClick={() => removePreference(service._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300 mt-2"
                >
                  Supprimer la préférence
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ServicesList;
