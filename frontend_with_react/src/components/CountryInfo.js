import React, { useState, useEffect } from 'react';

function CountryInfo() {
    const [countryName, setCountryName] = useState('');
    const [countryData, setCountryData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isRandomSearch, setIsRandomSearch] = useState(true);

    const randomCountryNames = [
        'USA',
        'Canada',
        'France',
        'Germany',
        'Japan',
        // Ajoutez d'autres pays au besoin
    ];

    const getRandomCountryName = () => {
        const randomIndex = Math.floor(Math.random() * randomCountryNames.length);
        return randomCountryNames[randomIndex];
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (countryName.trim() === '') {
            // Si le champ est vide, choisissez un pays aléatoire
            setCountryName(getRandomCountryName());
            setIsRandomSearch(true);
            return;
        }

        setIsRandomSearch(false);
        setLoading(true);
        setError(null);

        // Construire l'URL avec le nom du pays
        const apiUrl = `https://restcountries.com/v3.1/name/${countryName}`;

        fetch(apiUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('La requête a échoué');
                }
                return response.json();
            })
            .then((data) => {
                // L'API renvoie un tableau de pays, nous utilisons le premier élément ici
                setCountryData(data[0]);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    };

    useEffect(() => {
        // Recherche initiale d'un pays aléatoire au chargement initial
        setCountryName(getRandomCountryName());

        const intervalId = setInterval(() => {
            // Recherche d'un pays aléatoire à intervalles réguliers si le champ est vide
            if (isRandomSearch) {
                setCountryName(getRandomCountryName());
            }
        }, 30000); // Recherche toutes les 30 secondes

        return () => {
            clearInterval(intervalId); // Nettoie l'intervalle lorsque le composant est démonté
        };
    }, [isRandomSearch]);

    return (
        <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-3xl font-semibold text-blue-600 mb-4">Rechercher des informations sur un pays</h2>
            <form onSubmit={handleSubmit} className="flex items-center space-x-4">
                <input
                    type="text"
                    placeholder="Entrez le nom du pays"
                    value={countryName}
                    onChange={(e) => setCountryName(e.target.value)}
                    className="border-2 rounded p-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                    Rechercher
                </button>
            </form>

            {loading && <div className="mt-4 text-gray-600">Chargement en cours...</div>}
            {error && <div className="mt-4 text-red-600">Erreur : {error.message}</div>}
            
            {countryData && (
                <div className="mt-4 bg-gray-100 p-4 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold text-blue-600 mb-2">Informations sur {countryData.name.common}</h2>
                    <p><span className="font-semibold">Capitale:</span> {countryData.capital}</p>
                    <p><span className="font-semibold">Population:</span> {countryData.population}</p>
                    <p><span className="font-semibold">Région:</span> {countryData.region}</p>
                    {/* Ajoutez d'autres informations que vous souhaitez afficher */}
                </div>
            )}
        </div>
    );
}

export default CountryInfo;
