import { jwtDecode } from 'jwt-decode';

export const setToken = (token: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
  }
  window.dispatchEvent(new Event('authChange')); // Notify all components that auth state changed
};

export const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

export const removeToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
  }
};

export const isAuthenticated = () => {
  const token = getToken();
  if (!token) return false;
  
  try {
    const decoded = jwtDecode(token);
    return decoded.exp ? decoded.exp * 1000 > Date.now() : false;
  } catch {
    return false;
  }
};