// src/stores/auth.js
import { defineStore } from 'pinia';
import { auth } from 'src/firebase/init';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    loading: false
  }),

  actions: {
    async register(email, password) {
      this.loading = true;
      try {
        const userCred = await createUserWithEmailAndPassword(auth, email, password);
        this.user = userCred.user;
      } catch (err) {
        throw err;
      } finally {
        this.loading = false;
      }
    },

    async login(email, password) {
      this.loading = true;
      try {
        const userCred = await signInWithEmailAndPassword(auth, email, password);
        this.user = userCred.user;
      } catch (err) {
        throw err;
      } finally {
        this.loading = false;
      }
    },

    async logout() {
      await signOut(auth);
      this.user = null;
    },

    fetchUser() {
      onAuthStateChanged(auth, (user) => {
        this.user = user || null;
      });
    }
  }
});
