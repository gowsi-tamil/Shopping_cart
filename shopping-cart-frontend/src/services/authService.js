import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';  // Replace with your actual API URL

// Register a new user
export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData);
        return response.data;  // returns the response from the API
    } catch (error) {
        throw error.response ? error.response.data : 'Error registering user';
    }
};

// Login an existing user
export const loginUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/login`, userData);
        return response.data;  // returns the response with JWT token
    } catch (error) {
        throw error.response ? error.response.data : 'Error logging in';
    }
};
