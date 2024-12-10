import axios from 'axios';

const API_URL = 'http://localhost:5000/api/products';  // Replace with your actual API URL

// Fetch the list of products
export const getProducts = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : 'Error fetching products';
    }
};

// Fetch details of a single product
export const getProductById = async (productId) => {
    try {
        const response = await axios.get(`${API_URL}/${productId}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : 'Error fetching product details';
    }
};
