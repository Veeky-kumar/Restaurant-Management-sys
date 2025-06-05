const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:52512';

export const API_ENDPOINTS = {
  login: `${API_BASE_URL}/api/restaurant/login`,
  forgotPassword: `${API_BASE_URL}/api/restaurant/forgot-password`,
  // Add other endpoints here...
};
