import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './footer';

function RegistrationForm() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Les mots de passe ne correspondent pas.");
            return;
        }
            const userData = { username, email, password };
        
            try {
                const response = await fetch('http://127.0.0.1:3001/user/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData),
                });
        
                if (response.ok) {
                    // Registration was successful, handle success here
                    alert('Registration successful, check your email to validate your account');
                    window.location.href ='/login'

                } else {
                    // Registration failed, handle errors here
                    alert('Registration failed');
                }
            } catch (error) {
                console.error('Error during registration:', error);
            }

        
    };

    return (
        <div>
            <Navbar />
            <div className="max-w-md mx-auto mt-8 p-6 rounded-lg border border-gray-300 shadow-lg">
                <h2 className="text-2xl font-semibold mb-6 text-center">Inscription</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-600">
                            Nom d'utilisateur :
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="mt-1 p-2 w-full rounded border border-gray-300 focus:outline-none focus:border-blue-400"
                            required
                        />
                    </div>
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
                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600">
                            Confirmer le mot de passe :
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="mt-1 p-2 w-full rounded border border-gray-300 focus:outline-none focus:border-blue-400"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
                    >
                        S'inscrire
                    </button>
                </form>
            </div>
            <Footer />
        </div>
    );
}

export default RegistrationForm;
