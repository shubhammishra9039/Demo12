import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api', // adjust if your backend is deployed
});

export default api;
