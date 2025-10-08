import { initializeApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBSx3NuOiNEgPigR27Q20M45rV2TAhUXd8",
  authDomain: "stravex-eb597.firebaseapp.com",
  projectId: "stravex-eb597",
  storageBucket: "stravex-eb597.firebasestorage.app",
  messagingSenderId: "350812898993",
  appId: "1:350812898993:web:f4e8586f1103add4b98490",
  measurementId: "G-WGFKMTR775"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firestore and export the instance
// The 'db' export is mandatory for the contact submission service (contactService.ts) to function.
export const db: Firestore = getFirestore(app);