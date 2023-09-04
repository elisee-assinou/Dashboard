// src/App.js

import React from 'react';
import './App.css';
import AppRouter from './AppRouter'; // Importez AppRouter

function App() {
  return (
    <div className="App">
      <AppRouter /> {/* Utilisez AppRouter pour gérer les routes */}
    </div>
  );
}

export default App;
