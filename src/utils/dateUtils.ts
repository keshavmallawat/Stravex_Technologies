/**
 * Date utility functions for consistent formatting across the project
 */

// Firestore Timestamp type (basic interface)
interface FirestoreTimestamp {
  toDate: () => Date;
}

/**
 * Format date to dd-mm-yyyy format
 * @param date - Date object, date string, or Firestore Timestamp
 * @returns Formatted date string in dd-mm-yyyy format
 */
export const formatDate = (date: Date | string | FirestoreTimestamp): string => {
  let dateObj: Date;
  
  if (typeof date === 'string') {
    dateObj = new Date(date);
  } else if (date && typeof date === 'object' && 'toDate' in date) {
    // Firestore Timestamp
    dateObj = date.toDate();
  } else {
    // Date object
    dateObj = date as Date;
  }
  
  const day = dateObj.getDate().toString().padStart(2, '0');
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
  const year = dateObj.getFullYear();
  
  return `${day}-${month}-${year}`;
};

/**
 * Format date and time to dd-mm-yyyy HH:MM format
 * @param date - Date object, date string, or Firestore Timestamp
 * @returns Formatted date string in dd-mm-yyyy HH:MM format
 */
export const formatDateTime = (date: Date | string | FirestoreTimestamp): string => {
  let dateObj: Date;
  
  if (typeof date === 'string') {
    dateObj = new Date(date);
  } else if (date && typeof date === 'object' && 'toDate' in date) {
    // Firestore Timestamp
    dateObj = date.toDate();
  } else {
    // Date object
    dateObj = date as Date;
  }
  
  const day = dateObj.getDate().toString().padStart(2, '0');
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
  const year = dateObj.getFullYear();
  const hours = dateObj.getHours().toString().padStart(2, '0');
  const minutes = dateObj.getMinutes().toString().padStart(2, '0');
  
  return `${day}-${month}-${year} ${hours}:${minutes}`;
};

/**
 * Format date with full month name
 * @param date - Date object, date string, or Firestore Timestamp
 * @returns Formatted date string with full month name
 */
export const formatDateWithMonthName = (date: Date | string | FirestoreTimestamp): string => {
  let dateObj: Date;
  
  if (typeof date === 'string') {
    dateObj = new Date(date);
  } else if (date && typeof date === 'object' && 'toDate' in date) {
    // Firestore Timestamp
    dateObj = date.toDate();
  } else {
    // Date object
    dateObj = date as Date;
  }
  
  const day = dateObj.getDate().toString().padStart(2, '0');
  const month = dateObj.toLocaleString('default', { month: 'long' });
  const year = dateObj.getFullYear();
  
  return `${day} ${month} ${year}`;
};
