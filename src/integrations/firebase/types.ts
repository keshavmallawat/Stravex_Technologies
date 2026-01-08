// Firebase Firestore types for contact submissions
export interface ContactSubmission {
  id: string;
  name: string;
  company: string;
  email: string;
  phone?: string;
  message: string;
  created_at: string;
  updated_at: string;
}

export interface ContactSubmissionCreate {
  name: string;
  company: string;
  email: string;
  phone?: string;
  message: string;
}

export interface ContactSubmissionUpdate {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  message?: string;
  updated_at?: string;
}
