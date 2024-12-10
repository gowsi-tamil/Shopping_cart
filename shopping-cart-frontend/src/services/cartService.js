import axios from 'axios';

const API_URL = 'http://localhost:5000/api/cart';  // Replace with your actual API URL

// Create a new cart for the user
export const createCart = async () => {
    try {
        const response = await axios.post(`${API_URL}/create`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : 'Error creating cart';
    }
};

// Add an item to the cart
export const addItemToCart = async (cartId, item) => {
    try {
        const response = await axios.post(`${API_URL}/${cartId}/add`, item);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : 'Error adding item to cart';
    }
};

// Remove an item from the cart
export const removeItemFromCart = async (cartId, itemId) => {
    try {
        const response = await axios.delete(`${API_URL}/${cartId}/remove/${itemId}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : 'Error removing item from cart';
    }
};

// View the contents of the cart
export const viewCart = async (cartId) => {
    try {
        const response = await axios.get(`${API_URL}/${cartId}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : 'Error fetching cart';
    }
};

// Clear all items from the cart
export const clearCart = async (cartId) => {
    try {
        const response = await axios.delete(`${API_URL}/${cartId}/clear`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : 'Error clearing cart';
    }
};
