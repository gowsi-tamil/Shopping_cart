// src/context/AuthContext.js
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));

  const login = (token, id) => {
    setAuthToken(token);
    localStorage.setItem('authToken', token);
    localStorage.setItem('userId', id);
  };

  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');

    sessionStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider value={{ authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
