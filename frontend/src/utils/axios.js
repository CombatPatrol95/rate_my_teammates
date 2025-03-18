import axios from 'axios';

// Create axios instance with custom config
const instance = axios.create({
    baseURL: 'http://localhost:8080', // Spring Boot default port
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Important for CORS with credentials
});

// Add request interceptor to add token to every request
instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        console.log('Axios request:', config.method, config.url);
        return config;
    },
    (error) => {
        console.error('Axios request error:', error);
        return Promise.reject(error);
    }
);

// Add response interceptor for debugging
instance.interceptors.response.use(
    (response) => {
        console.log('Axios response success:', response.status);
        return response;
    },
    (error) => {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Axios response error:', error.response.status, error.response.data);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('Axios no response received:', error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Axios error:', error.message);
        }
        return Promise.reject(error);
    }
);

export default instance; 