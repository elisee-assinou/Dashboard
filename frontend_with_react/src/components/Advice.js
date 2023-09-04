import React, { useState, useEffect } from 'react';

const adviceContainerStyle = {
  backgroundColor: '#f0f0f0',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
};

const adviceTitleStyle = {
  fontSize: '24px',
  color: '#333',
};

const adviceTextStyle = {
  fontSize: '18px',
  color: '#666',
  marginTop: '10px',
};

function AdviceGenerator() {
  const [advice, setAdvice] = useState('');

  const fetchData = async () => {
    setAdvice(''); // Réinitialise le conseil à une chaîne vide
    try {
      // Ajoute une chaîne de requête aléatoire pour éviter la mise en cache
      const randomQueryParam = `random=${Math.random()}`;
      const apiUrl = `https://api.adviceslip.com/advice?${randomQueryParam}`;

      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('La requête a échoué');
      }
      const data = await response.json();
      if (data && data.slip) {
        setAdvice(data.slip.advice);
      } else {
        throw new Error('Conseil non trouvé');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération du conseil :', error);
    }
  };

  useEffect(() => {
    fetchData(); // Charge un nouveau conseil au chargement initial

    const intervalId = setInterval(() => {
      fetchData(); // Charge un nouveau conseil toutes les 30 secondes
    }, 30000);

    return () => {
      clearInterval(intervalId); // Nettoie l'intervalle lorsque le composant est démonté
    };
  }, []);

  return (
    <div style={adviceContainerStyle}>
      <h2 style={adviceTitleStyle}>Conseil du jour :</h2>
      <p style={adviceTextStyle}>{advice}</p>
    </div>
  );
}

export default AdviceGenerator;
