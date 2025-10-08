import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Upload,
  Calendar,
  FileText,
  Image as ImageIcon
} from 'lucide-react';
import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  doc,
  query, 
  orderBy, 
  Timestamp
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';
import { useDropzone } from 'react-dropzone';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  imageUrl?: string;
  published: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  author: string;
  tags: string[];
}

const BlogManager: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [uploading, setUploading] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    published: false,
    author: '',
    tags: ''
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const blogsQuery = query(
        collection(db, 'blogs'),
        orderBy('createdAt', 'desc')
      );
      const snapshot = await getDocs(blogsQuery);
      const blogsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as BlogPost[];
      
      setBlogs(blogsData);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles[0]) {
        setImageFile(acceptedFiles[0]);
        setImagePreview(URL.createObjectURL(acceptedFiles[0]));
      }
    }
  });

  const uploadImage = async (file: File): Promise<string> => {
    const imageRef = ref(storage, `blog-images/${Date.now()}-${file.name}`);
    await uploadBytes(imageRef, file);
    return await getDownloadURL(imageRef);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      let imageUrl = editingBlog?.imageUrl || '';

      // Upload new image if selected
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      const blogData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        imageUrl,
        updatedAt: Timestamp.now(),
        ...(editingBlog ? {} : { createdAt: Timestamp.now() })
      };

      if (editingBlog) {
        // Update existing blog
        await updateDoc(doc(db, 'blogs', editingBlog.id), blogData);
      } else {
        // Create new blog
        await addDoc(collection(db, 'blogs'), blogData);
      }

      // Reset form
      resetForm();
      setIsDialogOpen(false);
      fetchBlogs();
    } catch (error) {
      console.error('Error saving blog:', error);
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      excerpt: '',
      published: false,
      author: '',
      tags: ''
    });
    setImageFile(null);
    setImagePreview('');
    setEditingBlog(null);
  };

  const handleEdit = (blog: BlogPost) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      content: blog.content,
      excerpt: blog.excerpt,
      published: blog.published,
      author: blog.author,
      tags: blog.tags.join(', ')
    });
    setImagePreview(blog.imageUrl || '');
    setIsDialogOpen(true);
  };

  const handleDelete = async (blogId: string, imageUrl?: string) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        // Delete image from storage if exists
        if (imageUrl) {
          const imageRef = ref(storage, imageUrl);
          await deleteObject(imageRef);
        }
        
        // Delete blog document
        await deleteDoc(doc(db, 'blogs', blogId));
        setBlogs(blogs.filter(blog => blog.id !== blogId));
      } catch (error) {
        console.error('Error deleting blog:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-heading text-3xl font-bold text-foreground mb-2">
              Blog Manager
            </h1>
            <p className="text-muted-foreground">Loading blogs...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-foreground mb-2">
            Blog Manager
          </h1>
          <p className="text-muted-foreground">
            Manage blog posts ({blogs.length} total)
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              className="bg-gradient-primary neon-ring hover:shadow-glow"
              onClick={() => {
                resetForm();
                setIsDialogOpen(true);
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              New Blog Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingBlog ? 'Edit Blog Post' : 'Create New Blog Post'}
              </DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-foreground">Title</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Blog post title"
                    required
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-foreground">Author</label>
                  <Input
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    placeholder="Author name"
                    required
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-foreground">Tags (comma-separated)</label>
                  <Input
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    placeholder="technology, defense, innovation"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-foreground">Excerpt</label>
                  <Textarea
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    placeholder="Brief description of the blog post"
                    rows={3}
                    required
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-foreground">Content</label>
                  <Textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Blog post content"
                    rows={10}
                    required
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-foreground">Featured Image</label>
                  <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                      isDragActive 
                        ? 'border-primary bg-primary/10' 
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <input {...getInputProps()} />
                    {imagePreview ? (
                      <div className="space-y-2">
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          className="max-h-32 mx-auto rounded-lg"
                        />
                        <p className="text-sm text-muted-foreground">
                          Click or drag to replace image
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <ImageIcon className="h-8 w-8 text-muted-foreground mx-auto" />
                        <p className="text-sm text-muted-foreground">
                          {isDragActive 
                            ? 'Drop the image here' 
                            : 'Click or drag to upload image'
                          }
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.published}
                      onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                      className="rounded"
                    />
                    <span className="text-sm font-medium text-foreground">Published</span>
                  </label>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={uploading}
                  className="bg-gradient-primary neon-ring hover:shadow-glow"
                >
                  {uploading ? (
                    <>
                      <Upload className="mr-2 h-4 w-4 animate-spin" />
                      {editingBlog ? 'Updating...' : 'Creating...'}
                    </>
                  ) : (
                    editingBlog ? 'Update Post' : 'Create Post'
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Blogs Table */}
      <Card className="glass">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blogs.length > 0 ? (
                blogs.map((blog) => (
                  <TableRow key={blog.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        {blog.imageUrl && (
                          <img 
                            src={blog.imageUrl} 
                            alt={blog.title}
                            className="h-10 w-10 rounded-lg object-cover"
                          />
                        )}
                        <div>
                          <p className="font-medium text-foreground">{blog.title}</p>
                          <p className="text-sm text-muted-foreground line-clamp-1">
                            {blog.excerpt}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{blog.author}</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant={blog.published ? 'default' : 'secondary'}>
                        {blog.published ? 'Published' : 'Draft'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          {blog.createdAt.toDate().toLocaleDateString()}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleEdit(blog)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDelete(blog.id, blog.imageUrl)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    <div className="flex flex-col items-center space-y-2">
                      <FileText className="h-12 w-12 text-muted-foreground" />
                      <p className="text-muted-foreground">No blog posts yet</p>
                      <Button 
                        onClick={() => setIsDialogOpen(true)}
                        className="bg-gradient-primary neon-ring hover:shadow-glow"
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Create First Post
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
};

export default BlogManager;


