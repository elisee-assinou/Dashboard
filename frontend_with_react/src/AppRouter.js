import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home';
import MyServices from './components/MyServices';
import ServicesList from './components/servistList';
import Chat from './components/Chat';
import CountryInfo from './components/CountryInfo';
import RandomGif from './components/Gif';
import CryptoPrices from './components/BtcandEth';
import RandomTriviaQuestion from './components/questions';
import AdviceGenerator from './components/Advice';
import WeatherApp from './components/Weather';
import DateDisplay from './components/Date';
import LoginForm from './components/login';
import RegistrationForm from './components/Register';

function AppRouter() {
  const isAuthenticated = sessionStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/utiliser/infospays" element={<CountryInfo />} />
        <Route path="/utiliser/chat" element={<Chat />} />
        <Route path="/utiliser/gif" element={<RandomGif />} />
        <Route path="/utiliser/btc" element={<CryptoPrices />} />
        <Route path="/utiliser/questions" element={<RandomTriviaQuestion />} />
        <Route path="/utiliser/advice" element={<AdviceGenerator />} />
        <Route path="/utiliser/meteo" element={<WeatherApp />} />
        <Route path="/utiliser/date" element={<DateDisplay />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationForm />} />

        {/* Utilisez un élément Navigate pour protéger la route */}
        {isAuthenticated ? (
          <Route path="/my_services" element={<ServicesList />} />
        ) : (
          <Route
            path="/my_services"
            element={<Navigate to="/login" replace />}
          />
        )}

        {/* Ajoutez d'autres routes protégées au besoin */}
      </Routes>
    </Router>
  );
}

export default AppRouter;
