import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { getBlogPosts, type BlogPost, incrementBlogView } from "@/integrations/firebase/blogService";
import { Loader2, X, ZoomIn } from "lucide-react";
import { formatDate } from "@/utils/dateUtils";

const Blogs = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handlePostClick = async (postId: string) => {
    // Increment view count when user clicks to read post
    try {
      await incrementBlogView(postId);
    } catch (error) {
      console.error('Error incrementing view:', error);
      // Don't block navigation, just log error
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getBlogPosts();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.stravextechnologies.com/" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.stravextechnologies.com/blogs" },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-hero bg-grid pt-24 pb-16">
      <SEO
        title="Blog – Stravex Technologies"
        description="Engineering notes, deep dives, and product updates from the Stravex Technologies team."
        path="/blogs"
        image="/stravex-logo.png"
        jsonLd={breadcrumbJsonLd}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our <span className="bg-gradient-primary bg-clip-text text-transparent">Blog</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Engineering notes, deep dives, and product updates from the Stravex team.
          </p>
        </header>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.length === 0 ? (
              <div className="col-span-full text-center py-12 text-muted-foreground">
                No blog posts available at the moment. Check back soon!
              </div>
            ) : (
              posts.map((post) => (
                <Card key={post.id} className="bg-card border-border overflow-hidden hover:shadow-card transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
                  <div className="aspect-[16/9] w-full bg-muted/30 relative group cursor-pointer" onClick={() => setSelectedImage(post.coverImage)}>
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200">
                      <ZoomIn className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <CardHeader className="space-y-3 flex-none">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <time dateTime={post.createdAt}>{formatDate(post.createdAt)}</time>
                      <div className="flex gap-2 flex-wrap">
                        {post.tags.slice(0, 3).map((t) => (
                          <Badge key={t} variant="secondary" className="px-2 py-0.5">
                            {t}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Link
                      to={`/blogs/${post.id}`}
                      className="text-xl font-semibold leading-snug text-foreground line-clamp-2 hover:text-primary transition-colors"
                      onClick={() => handlePostClick(post.id)}
                    >
                      {post.title}
                    </Link>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col justify-between">
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{post.excerpt}</p>
                    <div>
                      <Link
                        to={`/blogs/${post.id}`}
                        className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
                      >
                        Read more
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </section>
        )}
      </div>

      {/* Image Viewer Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="relative w-full h-full max-w-full max-h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white rounded-full p-2 transition-colors"
              aria-label="Close image viewer"
            >
              <X className="h-6 w-6 text-gray-800" />
            </button>

            {/* Image */}
            <img
              src={selectedImage}
              alt="Blog cover image full view"
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Blogs;


