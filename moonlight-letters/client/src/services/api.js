import axios from 'axios';

const API = axios.create({
  baseURL: '/api',
});

// Attach token to requests if present
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
