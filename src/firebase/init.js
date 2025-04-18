// src/firebase/init.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAfW8XZRJ_YAPCA01qGzBvU9_yIA1wnIys',
  authDomain: 'altosquant.firebaseapp.com',
  projectId: 'altosquant',
  storageBucket: 'altosquant.firebasestorage.app',
  messagingSenderId: '143073603668',
  appId: '1:143073603668:web:11794802c4c87786167dc1'
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
