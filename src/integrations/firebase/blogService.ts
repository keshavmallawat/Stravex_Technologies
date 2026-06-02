import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where,
  limit,
  increment,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

const COLLECTION_NAME = 'blogs';

export interface BlogSEO {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  ogImage?: string;
}

export interface BlogAuthor {
  name: string;
  photoURL?: string;
  email?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string; // HTML content from TipTap
  coverImage: string;
  tags: string[];
  categories: string[];
  status: 'draft' | 'published' | 'scheduled';
  author: BlogAuthor;
  seo: BlogSEO;
  views: number;
  scheduledDate?: string; // ISO string
  publishedAt?: string; // ISO string
  createdAt: string;
  updatedAt: string;
}

export interface BlogPostCreate {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  tags: string[];
  categories: string[];
  status: 'draft' | 'published' | 'scheduled';
  seo: BlogSEO;
  author: BlogAuthor;
  scheduledDate?: string;
}

// Upload blog image to Cloudinary using Unsigned Uploads
export const uploadBlogImage = (
  file: File,
  onProgress?: (progress: number) => void
): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      const rawCloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
      const rawUploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

      if (!rawCloudName || !rawUploadPreset) {
        throw new Error('Cloudinary configuration missing. Please verify VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET in your environment.');
      }

      // Strip any outer quotes that may be parsed from env files
      const cloudName = rawCloudName.replace(/['"]/g, '');
      const uploadPreset = rawUploadPreset.replace(/['"]/g, '');

      const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
      const xhr = new XMLHttpRequest();
      const formData = new FormData();

      xhr.open('POST', url, true);

      // Track progress using native XHR upload listener
      if (onProgress && xhr.upload) {
        xhr.upload.addEventListener('progress', (e) => {
          if (e.lengthComputable) {
            const percentComplete = Math.round((e.loaded / e.total) * 100);
            onProgress(percentComplete);
          }
        });
      }

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          console.log(`Cloudinary response status: ${xhr.status}`);
          console.log(`Cloudinary response text: ${xhr.responseText}`);
          if (xhr.status >= 200 && xhr.status < 300) {
            try {
              const response = JSON.parse(xhr.responseText);
              const secureUrl = response.secure_url;
              
              // Automatically apply Cloudinary transformations: auto-format, auto-quality compression
              const optimizedUrl = secureUrl.replace('/upload/', '/upload/f_auto,q_auto/');
              
              resolve(optimizedUrl);
            } catch (err) {
              console.error('Failed to parse Cloudinary response:', err);
              reject(new Error('Failed to process upload response from Cloudinary.'));
            }
          } else {
            try {
              const errResponse = JSON.parse(xhr.responseText);
              const errMsg = errResponse.error?.message || `Upload failed with status ${xhr.status}`;
              reject(new Error(errMsg));
            } catch {
              reject(new Error(`Upload failed with status code ${xhr.status}`));
            }
          }
        }
      };

      xhr.onerror = () => {
        reject(new Error('Network error during upload to Cloudinary.'));
      };

      formData.append('file', file);
      formData.append('upload_preset', uploadPreset);

      // Log exact FormData fields before sending
      console.log('--- CLOUDINARY UPLOAD REQUEST PAYLOAD ---');
      console.log('URL:', url);
      console.log('Cloud Name:', cloudName);
      console.log('Upload Preset:', uploadPreset);
      for (const pair of (formData as any).entries()) {
        console.log(`Field: ${pair[0]} =`, pair[1] instanceof File ? `File (${pair[1].name}, ${pair[1].size} bytes)` : pair[1]);
      }
      console.log('-----------------------------------------');

      xhr.send(formData);
    } catch (error) {
      console.error('Error initiating upload to Cloudinary:', error);
      reject(error);
    }
  });
};

// Create a new blog post
export const createBlogPost = async (data: BlogPostCreate): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...data,
      views: 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      publishedAt: data.status === 'published' ? serverTimestamp() : null
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating blog post:', error);
    throw error;
  }
};

// Get all blog posts (with optional filtering)
export const getBlogPosts = async (
  status?: 'draft' | 'published' | 'scheduled'
): Promise<BlogPost[]> => {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));

    const querySnapshot = await getDocs(q);

    // Client-side filtering to avoid complex composite index requirements for now
    const posts = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title,
        slug: data.slug || '',
        excerpt: data.excerpt,
        content: data.content,
        coverImage: data.coverImage,
        tags: data.tags || [],
        categories: data.categories || [],
        status: data.status || 'published',
        author: data.author || { name: 'Admin' },
        seo: data.seo || { metaTitle: '', metaDescription: '', keywords: [] },
        views: data.views || 0,
        scheduledDate: data.scheduledDate,
        publishedAt: data.publishedAt instanceof Timestamp
          ? data.publishedAt.toDate().toISOString()
          : data.publishedAt,
        createdAt: data.createdAt instanceof Timestamp
          ? data.createdAt.toDate().toISOString()
          : new Date().toISOString(),
        updatedAt: data.updatedAt instanceof Timestamp
          ? data.updatedAt.toDate().toISOString()
          : new Date().toISOString()
      } as BlogPost;
    });

    if (status) {
      return posts.filter(p => p.status === status);
    }

    return posts;
  } catch (error) {
    console.error('Error getting blog posts:', error);
    throw error;
  }
};

// Get a single blog post by ID
export const getBlogPostById = async (id: string): Promise<BlogPost | null> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        title: data.title,
        slug: data.slug || '',
        excerpt: data.excerpt,
        content: data.content,
        coverImage: data.coverImage,
        tags: data.tags || [],
        categories: data.categories || [],
        status: data.status || 'published',
        author: data.author || { name: 'Admin' },
        seo: data.seo || { metaTitle: '', metaDescription: '', keywords: [] },
        views: data.views || 0,
        scheduledDate: data.scheduledDate,
        publishedAt: data.publishedAt instanceof Timestamp
          ? data.publishedAt.toDate().toISOString()
          : data.publishedAt,
        createdAt: data.createdAt instanceof Timestamp
          ? data.createdAt.toDate().toISOString()
          : new Date().toISOString(),
        updatedAt: data.updatedAt instanceof Timestamp
          ? data.updatedAt.toDate().toISOString()
          : new Date().toISOString()
      } as BlogPost;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting blog post:', error);
    throw error;
  }
};

// Get blog post by Slug
export const getBlogPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  try {
    const q = query(collection(db, COLLECTION_NAME), where('slug', '==', slug), limit(1));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title,
        slug: data.slug || '',
        excerpt: data.excerpt,
        content: data.content,
        coverImage: data.coverImage,
        tags: data.tags || [],
        categories: data.categories || [],
        status: data.status || 'published',
        author: data.author || { name: 'Admin' },
        seo: data.seo || { metaTitle: '', metaDescription: '', keywords: [] },
        views: data.views || 0,
        scheduledDate: data.scheduledDate,
        publishedAt: data.publishedAt instanceof Timestamp
          ? data.publishedAt.toDate().toISOString()
          : data.publishedAt,
        createdAt: data.createdAt instanceof Timestamp
          ? data.createdAt.toDate().toISOString()
          : new Date().toISOString(),
        updatedAt: data.updatedAt instanceof Timestamp
          ? data.updatedAt.toDate().toISOString()
          : new Date().toISOString()
      } as BlogPost;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting blog post by slug:', error);
    throw error;
  }
};

// Increment view count
export const incrementBlogView = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, {
      views: increment(1)
    });
  } catch (error) {
    console.error('Error incrementing view count:', error);
    // Don't throw, just log
  }
};

// Update a blog post
export const updateBlogPost = async (id: string, data: Partial<BlogPostCreate>): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating blog post:', error);
    throw error;
  }
};

// Delete a blog post
export const deleteBlogPost = async (id: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, id));
  } catch (error) {
    console.error('Error deleting blog post:', error);
    throw error;
  }
};
