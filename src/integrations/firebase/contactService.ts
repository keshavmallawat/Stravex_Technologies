import { 
  collection, 
  addDoc, 
  getDocs, 
  deleteDoc, 
  doc, 
  query, 
  orderBy, 
  serverTimestamp,
  Timestamp,
  onSnapshot
} from 'firebase/firestore';
import { db } from './config';
import type { ContactSubmission, ContactSubmissionCreate } from './types';

const COLLECTION_NAME = 'contact_submissions';

// Create a new contact submission
export const createContactSubmission = async (data: ContactSubmissionCreate): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...data,
      created_at: serverTimestamp(),
      updated_at: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating contact submission:', error);
    throw error;
  }
};

// Get all contact submissions
export const getContactSubmissions = async (): Promise<ContactSubmission[]> => {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy('created_at', 'desc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        company: data.company || "",
        email: data.email,
        phone: data.phone || "",
        message: data.message,
        created_at: data.created_at instanceof Timestamp 
          ? data.created_at.toDate().toISOString() 
          : data.created_at,
        updated_at: data.updated_at instanceof Timestamp 
          ? data.updated_at.toDate().toISOString() 
          : data.updated_at
      };
    });
  } catch (error) {
    console.error('Error getting contact submissions:', error);
    throw error;
  }
};

// Subscribe to real-time updates for contact submissions
export const subscribeContactSubmissions = (
  callback: (submissions: ContactSubmission[]) => void
): (() => void) => {
  const q = query(collection(db, COLLECTION_NAME), orderBy('created_at', 'desc'));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const result: ContactSubmission[] = querySnapshot.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        name: data.name,
        company: data.company || "",
        email: data.email,
        phone: data.phone || "",
        message: data.message,
        created_at: data.created_at instanceof Timestamp 
          ? data.created_at.toDate().toISOString() 
          : data.created_at,
        updated_at: data.updated_at instanceof Timestamp 
          ? data.updated_at.toDate().toISOString() 
          : data.updated_at
      };
    });
    callback(result);
  });
  return unsubscribe;
};

// Delete a contact submission
export const deleteContactSubmission = async (id: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, id));
  } catch (error) {
    console.error('Error deleting contact submission:', error);
    throw error;
  }
};
