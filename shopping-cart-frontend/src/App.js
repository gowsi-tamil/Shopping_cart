// src/App.js
import React, { useState, useContext } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { AuthContext, AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import './styles.css';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<LoginPage />} />
          {/* Private Route */}
          <Route path="/home" element={<HomePage />} />
          {/* Redirect to login by default */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>



  );
};

// Private Route Wrapper
const PrivateRoute = ({ component: Component }) => {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? <Component /> : <Navigate to="/login" />;
};

export default App;
