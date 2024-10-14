import axios from 'axios';

const api = axios.create({
    baseURL: '/api', // Backend URL
});

export default api;
