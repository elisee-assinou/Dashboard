import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';

function Chat() {
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const fetchData = async () =>{
                // Remplacez cette URL par l'URL de votre API distante
                const apiUrl = 'https://api.thecatapi.com/v1/images/search';

                fetch(apiUrl)
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error('La requête a échoué');
                        }
                        return response.json();
                    })
                    .then((responseData) => {
                        
                        const catImageUrl = responseData[0].url;
                        setImageUrl(catImageUrl);
                        setLoading(false);
                    })
                    .catch((error) => {
                        setError(error);
                        setLoading(false);
                    });

    }
    useEffect(() => {
        fetchData(); // Charge les prix des cryptomonnaies au chargement initial

        const intervalId = setInterval(() => {
            fetchData(); // Recharge les prix toutes les 30 secondes
        }, 30000);

        return () => {
            clearInterval(intervalId); // Nettoie l'intervalle lorsque le composant est démonté
        };
    }, []);

    if (loading) {
        return <div>Chargement en cours...</div>;
    }

    if (error) {
        return <div>Erreur : {error.message}</div>;
    }

    return (
        <div>
           
            <h2>Image de Chat</h2>
            <div className="cat-image-container">
                <img src={imageUrl} alt="Chat" className="cat-image" />
            </div>
        </div>
    );
}

export default Chat;
