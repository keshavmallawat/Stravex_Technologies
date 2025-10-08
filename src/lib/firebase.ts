import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBSx3NuOiNEgPigR27Q20M45rV2TAhUXd8",
  authDomain: "stravex-eb597.firebaseapp.com",
  projectId: "stravex-eb597",
  storageBucket: "stravex-eb597.firebasestorage.app",
  messagingSenderId: "350812898993",
  appId: "1:350812898993:web:f4e8586f1103add4b98490",
  measurementId: "G-WGFKMTR775"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Configure Google Auth Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Authorized admin emails
export const AUTHORIZED_ADMIN_EMAILS = [
  'mallawatkeshav@gmail.com',
  'krishnamallawat29@gmail.com'
];

export default app;


