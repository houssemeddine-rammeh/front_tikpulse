// API Configuration for Vite environment
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';
export const WS_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:8080';
export const TIKTOK_CLIENT_SECRET = import.meta.env.VITE_TIKTOK_CLIENT_SECRET;

// Utility function to get API URL with endpoint
export const getApiUrl = (endpoint) => {
  return `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : '/' + endpoint}`;
};

// API Configuration
export const API_CONFIG = {
  BASE_URL: 'http://127.0.0.1:3002',
  ENDPOINTS: {
    AUTH: '/api/v1/auth',
    USERS: '/api/v1/users',
    CAMPAIGNS: '/api/v1/campaigns',
    CONTENT: '/api/v1/content',
    EVENTS: '/api/v1/events',
    ANALYTICS: '/api/v1/analytics',
    HEALTH: '/health'
  }
};

// Helper function to build full API URLs
export const buildApiUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Common API headers
export const getApiHeaders = () => {
  return {
    'Content-Type': 'application/json',
    // Add authorization header if token exists
    ...(localStorage.getItem('token') && {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
  };
}; 

