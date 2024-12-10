import { useState } from 'react';
import axios from 'axios';

// Custom hook to handle API requests
const useApi = (url, method = 'GET', body = null) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const makeRequest = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios({
                method,
                url,
                data: body,
                headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
            });
            setData(response.data);
        } catch (err) {
            setError(err.response ? err.response.data : 'Error making request');
        } finally {
            setLoading(false);
        }
    };

    return { data, error, loading, makeRequest };
};

export default useApi;
