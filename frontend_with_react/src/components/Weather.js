import React, { useState, useEffect } from 'react';

function WeatherApp() {
  const [city, setCity] = useState('');
  const [randomCity, setRandomCity] = useState('');
  const [showRandomCity, setShowRandomCity] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fonction pour générer une ville aléatoire
  const generateRandomCity = () => {
    const cities = ['New York', 'Paris', 'London', 'Tokyo', 'Sydney']; // Ajoutez d'autres villes au besoin
    const randomIndex = Math.floor(Math.random() * cities.length);
    return cities[randomIndex];
  };

  // Effet pour afficher une ville aléatoire après 30 secondes d'inactivité
  useEffect(() => {
    const timerId = setTimeout(() => {
      const randomCity = generateRandomCity();
      setRandomCity(randomCity);
      setShowRandomCity(true);
    }, 30000); // 30 secondes

    return () => {
      clearTimeout(timerId);
    };
  }, [city]); // Redéclenche l'effet lorsque la ville saisie par l'utilisateur change

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowRandomCity(false);
    setLoading(true);
    setError(null);

    const apiKey = '01ece9c9b5081e4683d95499f911f754';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('La requête a échoué');
        }
        return response.json();
      })
      .then((data) => {
        setWeatherData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Recherche de la météo</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          placeholder="Entrez le nom de la ville"
          value={city}
          onChange={handleCityChange}
          className="border p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
          Rechercher
        </button>
      </form>

      {showRandomCity && (
        <div className="bg-gray-200 p-4 rounded-lg">
          <h2 className="text-lg font-semibold">Météo à {randomCity}</h2>
          {weatherData && (
            <div>
              <p>Température : {weatherData.main.temp}°C</p>
              <p>Conditions : {weatherData.weather[0].description}</p>
            </div>
          )}
        </div>
      )}

      {!showRandomCity && city && (
        <div className="bg-gray-200 p-4 rounded-lg">
          <h2 className="text-lg font-semibold">Météo à {city}</h2>
          {weatherData && (
            <div>
              <p>Température : {weatherData.main.temp}°C</p>
              <p>Conditions : {weatherData.weather[0].description}</p>
            </div>
          )}
        </div>
      )}

      {loading && <div className="mt-4 text-gray-600">Chargement en cours...</div>}
      {error && <div className="mt-4 text-red-600">Erreur : {error.message}</div>}
    </div>
  );
}

export default WeatherApp;
