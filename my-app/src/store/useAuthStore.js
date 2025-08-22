// src/store/useAuthStore.js

import { create } from 'zustand';
import axios from 'axios'; // Assuming axios for API calls
import * as authAPI from '../api/auth.js'; // Keep your existing authAPI imports

const BACKEND_URL = 'http://localhost:5000'; // Ensure your backend URL is defined or imported

export const useAuthStore = create((set) => ({
  user: null,
  isLoading: true,
  error: null,
  loading: false,
  token: null,
  isAuthenticated: false,
  isAdmin: false,

  init: () => {
    try {
      const user = authAPI.getCurrentUser();
      const token = localStorage.getItem('token');
      set({ 
        user, 
        isLoading: false,
        token: token || null,
        isAuthenticated: !!user && !!token,
        isAdmin: user?.role === 'admin' 
      });
    } catch (e) {
      console.error("Failed to initialize auth store", e);
      set({ user: null, isLoading: false, token: null, isAuthenticated: false, isAdmin: false });
    }
  },

  login: async (creds) => {
    set({ loading: true, error: null });
    try {
      const loginResponse = await authAPI.login(creds);
      const { user, token } = loginResponse; 

      localStorage.setItem('token', token);
      set({ 
        user, 
        token,
        isAuthenticated: true, 
        isAdmin: user?.role === 'admin', 
        loading: false, 
        error: null 
      });
      return user;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed. Please check your credentials.';
      set({ error: errorMessage, loading: false });
      throw err;
    }
  },
  
  // --- Modified 'register' to only return message and not expect user/token immediately ---
  register: async (userData) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(`${BACKEND_URL}/api/auth/register`, userData);
      // Backend currently returns { message: "Registration successful..." }
      // So, we only expect a message here. No user or token to destructure yet.
      
      set({ 
        loading: false,
        error: null
      });
      // Return the message from the backend, or a generic success indicator
      return response.data.message || 'Registration successful. Please check your email for an OTP.'; 
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Registration failed. Please try again.';
      set({ error: errorMessage, loading: false });
      throw err; 
    }
  },

  // --- New: verifyOtp function for the store ---
  verifyOtp: async (email, otp) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(`${BACKEND_URL}/api/auth/verify-otp`, { email, otp });
      // After successful OTP verification, the user is verified.
      // Now, the user should perform a login to get their token and user data.
      set({ loading: false, error: null });
      return response.data.message; // Return success message
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'OTP verification failed.';
      set({ error: errorMessage, loading: false });
      throw err;
    }
  },

  logout: () => {
    authAPI.logout();
    set({ user: null, token: null, isAuthenticated: false, isAdmin: false });
  },
}));