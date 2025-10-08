import { getFirestore } from 'firebase/firestore';
import app from '@/lib/firebase';

// Reuse the already-initialized Firebase app from src/lib/firebase.ts
export const db = getFirestore(app);

export default app;
