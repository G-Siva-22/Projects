import axios from 'axios';
import { getAuthToken } from './auth';

const API_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => {
    // Extract the response data from the wrapper structure
    if (response.data?.responseData !== undefined) {
      return response.data.responseData;
    }
    return response.data;
  },
  (error) => {
    // Extract the error message from the wrapper structure
    const errorMessage = error.response?.data?.exception?.message || error.message || 'An error occurred';
    return Promise.reject(new Error(errorMessage));
  }
);

export default api;