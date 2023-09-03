import React, { useState, useEffect } from 'react';

function RandomGif() {
    const [gifUrl, setGifUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData =  async () =>{
        setLoading(true);
        setError(null);

        // Construire l'URL de l'API Giphy
        const apiKey = 'pNU5zWuBwWoBazXMdpsiaLcvKG2JoFfS';
        const apiUrl = `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}`;

        fetch(apiUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('La requête a échoué');
                }
                return response.json();
            })
            .then((data) => {
                // Extraire l'URL du gif aléatoire
                console.log(data);
                const gifUrl = data.data.images.downsized.url;
                setGifUrl(gifUrl);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });

    }

    useEffect(() => {
        fetchData(); // Charge un nouveau conseil au chargement initial
    
        const intervalId = setInterval(() => {
          fetchData(); // Charge un nouveau conseil toutes les 30 secondes
        }, 5000);
    
        return () => {
          clearInterval(intervalId); // Nettoie l'intervalle lorsque le composant est démonté
        };
      }, []);

    return (
        <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-3xl font-semibold text-purple-600 mb-4">Gif Aléatoire</h2>

            {loading && <div className="mt-4 text-gray-600">Chargement en cours...</div>}
            {error && <div className="mt-4 text-red-600">Erreur : {error.message}</div>}
            
            {gifUrl && (
                <div className="mt-4">
                    <img src={gifUrl} alt="Gif Aléatoire" className="rounded-lg shadow-md" />
                </div>
            )}
        </div>
    );
}

export default RandomGif;
