import React from 'react';
import { Route, Navigate } from 'react-router-dom';

function ProtectedRoute({ element, isAuthenticated }) {
  return isAuthenticated ? (
    // Si l'utilisateur est authentifié, affichez le composant
    <Route element={element} />
  ) : (
    // Si l'utilisateur n'est pas authentifié, redirigez-le vers la page de connexion
    <Navigate to="/login" />
  );
}

export default ProtectedRoute;
