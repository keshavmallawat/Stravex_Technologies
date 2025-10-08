<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< Updated upstream
<<<<<<< Updated upstream
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  // These will be replaced with your actual Firebase config
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
=======
=======
>>>>>>> Stashed changes
>>>>>>> c1c7b426fa5f1b6bc0373568799fca8f601230b8
>>>>>>> 6b5f517737979c4deba00e954a47bc3096946bb3
import { getFirestore } from 'firebase/firestore';
import app from '@/lib/firebase';

// Reuse the already-initialized Firebase app from src/lib/firebase.ts
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
>>>>>>> c1c7b426fa5f1b6bc0373568799fca8f601230b8
>>>>>>> 6b5f517737979c4deba00e954a47bc3096946bb3
export const db = getFirestore(app);

export default app;
