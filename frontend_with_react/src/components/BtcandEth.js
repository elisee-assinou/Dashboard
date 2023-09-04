import React, { useState, useEffect } from 'react';

function CryptoPrices() {
    const [bitcoinPrice, setBitcoinPrice] = useState(null);
    const [ethereumPrice, setEthereumPrice] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);

        // Construire l'URL de l'API CoinGecko
        const apiUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd';

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('La requête a échoué');
            }
            const data = await response.json();
            // Extraire les prix du Bitcoin et de l'Ethereum en USD
            setBitcoinPrice(data.bitcoin.usd);
            setEthereumPrice(data.ethereum.usd);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(); // Charge les prix des cryptomonnaies au chargement initial

        const intervalId = setInterval(() => {
            fetchData(); // Recharge les prix toutes les 30 secondes
        }, 30000);

        return () => {
            clearInterval(intervalId); // Nettoie l'intervalle lorsque le composant est démonté
        };
    }, []);

    return (
        <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-3xl font-semibold text-green-600 mb-4">Prix des Cryptomonnaies</h2>

            {loading && <div className="mt-4 text-gray-600">Chargement en cours...</div>}
            {error && <div className="mt-4 text-red-600">Erreur : {error.message}</div>}

            {bitcoinPrice !== null && (
                <p className="mt-4">
                    Prix du Bitcoin (BTC) en USD : <span className="font-semibold">${bitcoinPrice}</span>
                </p>
            )}

            {ethereumPrice !== null && (
                <p className="mt-2">
                    Prix de l'Ethereum (ETH) en USD : <span className="font-semibold">${ethereumPrice}</span>
                </p>
            )}
        </div>
    );
}

export default CryptoPrices;
