import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, Calendar, Clock, User,
  Loader2, X, ZoomIn, Share2
} from "lucide-react";
import SEO from "@/components/SEO";
import { getBlogPosts, type BlogPost, incrementBlogView } from "@/integrations/firebase/blogService";
import { formatDateWithMonthName } from "@/utils/dateUtils";
import parse from 'html-react-parser';
import DOMPurify from 'dompurify';
import ImageWithFallback from "@/components/ImageWithFallback";
import { useToast } from "@/hooks/use-toast";

const BlogPostPage = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);
  const [readTime, setReadTime] = useState<number>(1);
  const [scrollProgress, setScrollProgress] = useState(0);


  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast({
        title: "Link Copied",
        description: "Article share link copied to clipboard.",
      });
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const getPublicationType = (p: BlogPost) => {
    if (p.categories && p.categories.length > 0) {
      return p.categories[0].toUpperCase();
    }
    if (p.tags && p.tags.length > 0) {
      const potentialTypes = ['INSIGHT', 'REPORT', 'ANALYSIS', 'BRIEFING', 'EXPLAINER'];
      for (const tag of p.tags) {
        if (potentialTypes.some(t => tag.toUpperCase().includes(t))) {
          return tag.toUpperCase();
        }
      }
    }
    return 'DEFENCE TECHNOLOGY INSIGHT';
  };

  // Injects heading IDs dynamically for anchors
  const getProcessedHtml = (htmlContent: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    const headings = doc.querySelectorAll('h2, h3');
    headings.forEach((heading, idx) => {
      const text = heading.textContent || '';
      const id = heading.id || text.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '') || `heading-${idx}`;
      heading.id = id;
    });
    return doc.body.innerHTML;
  };

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      try {
        const posts = await getBlogPosts('published');
        const data = posts.find(p => p.id === id);
        if (data) {
          setPost(data);
          // Calculate read time (200 words per minute)
          const words = data.content.replace(/<[^>]*>/g, '').split(/\s+/).length;
          setReadTime(Math.ceil(words / 200) || 1);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  // Handle scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.pageYOffset / totalHeight) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);




  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex justify-center items-center bg-gradient-hero">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex flex-col justify-center items-center bg-gradient-hero text-center px-4">
        <h1 className="text-3xl font-bold mb-4 font-heading">Publication not found</h1>
        <p className="text-muted-foreground mb-8">The strategic briefing or research report does not exist or has been archived.</p>
        <Link to="/blogs">
          <Button variant="outline"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Blogs</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero bg-grid pt-24 pb-20 relative">
      {/* Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-primary z-50 transition-all duration-100 ease-out" 
        style={{ width: `${scrollProgress}%` }}
      />

      <SEO
        title={`${post.seo?.metaTitle || post.title} – Stravex Technologies`}
        description={post.seo?.metaDescription || post.excerpt}
        path={`/blogs/${post.id}`}
        image={post.seo?.ogImage || post.coverImage}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <Link to="/blogs" className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-primary mb-8 transition-colors">
          <ArrowLeft className="mr-1.5 h-3.5 w-3.5" /> Back to Blogs
        </Link>

        {/* Publication Sheet */}
        <article className="glass p-6 md:p-12 lg:p-16 rounded-3xl border border-border/50 shadow-2xl backdrop-blur-xl bg-card/20 overflow-hidden">
          
          {/* Header Layout */}
          <header className="mb-10 border-b border-border/40 pb-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline" className="px-2.5 py-0.5 text-[10px] font-bold tracking-widest text-primary border-primary/30 uppercase bg-primary/5">
                  {getPublicationType(post)}
                </Badge>
                {post.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="px-2 py-0.5 text-[9px] font-semibold text-muted-foreground uppercase">{tag}</Badge>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyLink}
                className="flex items-center gap-2 h-8 text-xs border-border/50 hover:bg-secondary/40"
              >
                <Share2 className="h-3.5 w-3.5" />
                Share
              </Button>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight font-heading">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-muted-foreground text-xs font-medium">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-primary/70" />
                {formatDateWithMonthName(post.createdAt)}
              </div>
              <div className="flex items-center gap-1.5">
                <User className="h-4 w-4 text-primary/70" />
                {post.author?.name || 'Stravex Team'}
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-primary/70" />
                {readTime} min read
              </div>
            </div>
          </header>

          {/* Hero Cover Image Section */}
          <div className="aspect-[21/9] w-full rounded-2xl overflow-hidden mb-12 bg-muted/20 border border-border/50 shadow-lg relative group cursor-pointer" onClick={() => post.coverImage && !imageError && setSelectedImage(post.coverImage)}>
            <ImageWithFallback
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              onError={() => setImageError(true)}
            />
            {post.coverImage && !imageError && (
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200">
                <ZoomIn className="h-8 w-8 text-white" />
              </div>
            )}
          </div>

          {/* Article Body */}
          <div className="blog-prose prose prose-invert max-w-[760px] mx-auto prose-headings:font-heading prose-a:text-primary prose-img:rounded-xl prose-headings:scroll-m-24">
            {parse(DOMPurify.sanitize(getProcessedHtml(post.content), {
              ADD_ATTR: ['style', 'class', 'src', 'allowfullscreen', 'frameborder', 'allow', 'width', 'height'],
              ADD_TAGS: ['iframe'],
              FORCE_BODY: true
            }))}
          </div>

          {/* Signature Author Box */}
          <footer className="mt-16 pt-8 border-t border-border/40">
            <div className="p-6 md:p-8 rounded-2xl bg-secondary/20 border border-border/40 flex flex-col md:flex-row gap-6 items-start">
              <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20 text-primary font-heading font-bold text-lg">
                ST
              </div>
              <div className="space-y-2">
                <h3 className="font-heading font-bold text-sm text-foreground">Stravex Research Team</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Comprising systems architects, robotics engineers, and strategic analysts building next-generation defense autonomy platforms, custom UAV solutions, and layered drone interceptor technology for national security.
                </p>
              </div>
            </div>
          </footer>
        </article>


      </div>

      {/* Full Screen Image Viewer Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="relative w-full h-full max-w-full max-h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white rounded-full p-2 transition-colors shadow-lg"
              aria-label="Close image viewer"
            >
              <X className="h-6 w-6 text-gray-800" />
            </button>
            <img
              src={selectedImage}
              alt="Full view"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPostPage;
