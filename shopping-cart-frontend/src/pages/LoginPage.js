// src/pages/LoginPage.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Registration form state
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerMessage, setRegisterMessage] = useState('');

  // Handle user login
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/login',
        {
          email: loginEmail,
          password: loginPassword,
        }
      );
     // navigate('/home');
      login(response.data.token,response.data.id); // Save token and update auth state
      navigate('/home'); // Redirect to home page
    } catch (error) {
      alert('Invalid credentials');
    }
  };

  // Handle user registration
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        name: registerName,
        email: registerEmail,
        password: registerPassword,
      });
      setRegisterMessage('Registration successful! You can now log in.');
      setRegisterName('');
      setRegisterEmail('');
      setRegisterPassword('');
    } catch (error) {
      setRegisterMessage('Registration failed. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <div className="login-section">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>

      <div className="register-section">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Name"
            value={registerName}
            onChange={(e) => setRegisterName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={registerEmail}
            onChange={(e) => setRegisterEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={registerPassword}
            onChange={(e) => setRegisterPassword(e.target.value)}
            required
          />
          <button type="submit">Register</button>
        </form>
        {registerMessage && <p>{registerMessage}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
