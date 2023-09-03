import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './footer';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:3001/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        
        const data = await response.json();
        console.log(data);
        const authToken = data.token;
        const userid = data.userId;

        // Stocker le token JWT dans sessionStorage après la connexion réussie
        sessionStorage.setItem('token', authToken);
        sessionStorage.setItem('userId', userid);

        // Rediriger l'utilisateur vers la page d'accueil
        navigate('/');
      } else {
        // Gérer les erreurs d'authentification ici
        console.error('Erreur lors de la connexion : Statut HTTP non OK');
      }
    } catch (error) {
      console.error('Erreur lors de la connexion : ', error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-md mx-auto mt-8 p-6 rounded-lg border border-gray-300 shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-center">Connexion</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email :
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 w-full rounded border border-gray-300 focus:outline-none focus:border-blue-400"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Mot de passe :
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 w-full rounded border border-gray-300 focus:outline-none focus:border-blue-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
          >
            Se connecter
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default LoginForm;
