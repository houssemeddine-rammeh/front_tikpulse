import axios from "axios";
import { getToken } from "../utils/tokenManager";

// Use environment variable for API base URL or fallback to local development
const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1";

const axiosInstance = axios.create({
  baseURL,
});

// Add a request interceptor to include the token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Handle FormData requests for file uploads
    if (config.data instanceof FormData && config.headers) {
      delete config.headers["Content-Type"]; // Let Axios set the proper boundary for FormData
    }

    // Log the request for debugging
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors gracefully
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Log the error for debugging
    console.error('API Error:', {
      message: error.message,
      code: error.code,
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data,
    });

    // Handle specific error cases
    if (error.code === 'ECONNABORTED') {
      console.warn('API request timeout');
      error.message = 'Request timeout - please try again';
    } else if (error.code === 'ERR_NETWORK') {
      console.warn('Network error - backend may not be available');
      error.message = 'Network error - please check your connection';
    } else if (error.response?.status === 401) {
      console.warn('Unauthorized request');
      error.message = 'Unauthorized - please login again';
      // You might want to trigger a logout here
    } else if (error.response?.status === 404) {
      error.message = 'Resource not found';
    } else if (error.response?.status >= 500) {
      error.message = 'Server error - please try again later';
    }

    return Promise.reject(error);
  }
);

export default axiosInstance; 