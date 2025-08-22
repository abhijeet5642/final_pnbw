// src/store/useAuthStore.js

import { create } from 'zustand';
import * as authAPI from '../api/auth.js';

export const useAuthStore = create((set) => ({
  user: null,
  isLoading: true,

  init: () => {
    try {
      const user = authAPI.getCurrentUser();
      set({ user, isLoading: false });
    } catch (e) {
      console.error("Failed to initialize auth store", e);
      set({ user: null, isLoading: false });
    }
  },

  // ... your other functions like login, logout etc.
  login: async (creds) => {
    const user = await authAPI.login(creds);
    set({ user });
    return user;
  },
  
  logout: () => {
    authAPI.logout();
    set({ user: null });
  },
}));

// The line that caused the loop has been removed from the bottom of this file.