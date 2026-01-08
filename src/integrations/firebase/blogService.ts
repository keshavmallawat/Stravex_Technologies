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
import {
  ref,
  uploadBytes,
  getDownloadURL
} from 'firebase/storage';
import { db, storage } from '@/lib/firebase';

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

// Upload blog image
export const uploadBlogImage = async (file: File): Promise<string> => {
  try {
    const storageRef = ref(storage, `blog-images/${Date.now()}_${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    return await getDownloadURL(snapshot.ref);
  } catch (error) {
    console.error('Error uploading blog image:', error);
    throw error;
  }
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
