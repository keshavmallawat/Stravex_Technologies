import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { getBlogPosts, type BlogPost, incrementBlogView } from "@/integrations/firebase/blogService";
import { Loader2, Calendar, Clock, ArrowRight } from "lucide-react";
import { formatDate } from "@/utils/dateUtils";
import ImageWithFallback from "@/components/ImageWithFallback";

const Blogs = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewedPosts, setViewedPosts] = useState<Set<string>>(new Set());

  const handlePostClick = async (postId: string) => {
    if (viewedPosts.has(postId)) return;
    try {
      await incrementBlogView(postId);
      setViewedPosts(prev => new Set(prev).add(postId));
    } catch (error) {
      console.error('Error incrementing view:', error);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getBlogPosts('published');
        setPosts(data);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const getPublicationType = (post: BlogPost) => {
    if (post.categories && post.categories.length > 0) {
      return post.categories[0].toUpperCase();
    }
    if (post.tags && post.tags.length > 0) {
      const potentialTypes = ['INSIGHT', 'REPORT', 'ANALYSIS', 'BRIEFING', 'EXPLAINER'];
      for (const tag of post.tags) {
        if (potentialTypes.some(t => tag.toUpperCase().includes(t))) {
          return tag.toUpperCase();
        }
      }
    }
    return 'DEFENCE TECHNOLOGY INSIGHT';
  };

  const getReadingTime = (content: string) => {
    const plainText = content.replace(/<[^>]*>/g, '');
    const wordsCount = plainText.trim().split(/\s+/).filter(w => w.length > 0).length;
    return Math.ceil(wordsCount / 200) || 1;
  };

  const featuredPost = posts[0];
  const gridPosts = posts.slice(1);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.stravextechnologies.com/" },
      { "@type": "ListItem", position: 2, name: "Blogs", item: "https://www.stravextechnologies.com/blogs" },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-hero bg-grid pt-24 pb-16">
      <SEO
        title="Blogs – Stravex Technologies"
        description="Defence technology analysis, autonomous systems research, counter-drone developments, aerospace innovation, and strategic technology perspectives."
        path="/blogs"
        image="/stravex-logo.png"
        jsonLd={breadcrumbJsonLd}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in">
        <header className="mb-16 text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 font-heading">
            <span className="bg-gradient-primary bg-clip-text text-transparent">Blogs</span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Defence technology analysis, autonomous systems research, counter-drone developments, aerospace innovation, and strategic technology perspectives from Stravex Technologies.
          </p>
        </header>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="space-y-16">
            {/* Featured Article Section */}
            {featuredPost && (
              <section className="space-y-6">
                <Card className="bg-card/20 border-border/50 overflow-hidden hover:border-primary/20 transition-all duration-500 shadow-xl backdrop-blur-xl">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                    <div className="lg:col-span-7 aspect-[16/10] w-full bg-muted/20 relative group overflow-hidden">
                      <Link to={`/blogs/${featuredPost.id}`} onClick={() => handlePostClick(featuredPost.id)}>
                        <ImageWithFallback
                          src={featuredPost.coverImage}
                          alt={featuredPost.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="eager"
                        />
                      </Link>
                    </div>
                    <div className="lg:col-span-5 p-6 md:p-10 flex flex-col justify-between">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-2 py-1 rounded">
                            {getPublicationType(featuredPost)}
                          </span>
                        </div>
                        <Link
                          to={`/blogs/${featuredPost.id}`}
                          className="block text-2xl md:text-3xl font-bold leading-tight text-foreground hover:text-primary transition-colors font-heading"
                          onClick={() => handlePostClick(featuredPost.id)}
                        >
                          {featuredPost.title}
                        </Link>
                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4">
                          {featuredPost.excerpt}
                        </p>
                      </div>
                      
                      <div className="pt-6 border-t border-border/40 flex items-center justify-between">
                        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5" />
                            <time dateTime={featuredPost.createdAt}>{formatDate(featuredPost.createdAt)}</time>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5" />
                            <span>{getReadingTime(featuredPost.content)} min read</span>
                          </div>
                        </div>
                        <Link
                          to={`/blogs/${featuredPost.id}`}
                          className="inline-flex items-center text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                          onClick={() => handlePostClick(featuredPost.id)}
                        >
                          Read Blog <ArrowRight className="ml-1.5 h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </Card>
              </section>
            )}

            {/* Latest Publications Grid */}
            {gridPosts.length > 0 && (
              <section className="space-y-6">
                <div className="flex items-center gap-2 border-b border-border/40 pb-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Latest Publications</h2>
                </div>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {gridPosts.map((post) => (
                    <Card key={post.id} className="bg-card/20 border-border/50 overflow-hidden hover:border-primary/20 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full shadow-lg backdrop-blur-xl">
                      <div className="aspect-[16/9] w-full bg-muted/20 relative group overflow-hidden">
                        <Link to={`/blogs/${post.id}`} onClick={() => handlePostClick(post.id)}>
                          <ImageWithFallback
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-550 group-hover:scale-105"
                            loading="lazy"
                          />
                        </Link>
                      </div>
                      <CardContent className="p-5 flex-1 flex flex-col justify-between">
                        <div className="space-y-3">
                          <span className="text-[9px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-2 py-0.5 rounded inline-block">
                            {getPublicationType(post)}
                          </span>
                          <Link
                            to={`/blogs/${post.id}`}
                            className="block text-lg font-bold leading-snug text-foreground hover:text-primary transition-colors line-clamp-2 font-heading"
                            onClick={() => handlePostClick(post.id)}
                          >
                            {post.title}
                          </Link>
                          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                            {post.excerpt}
                          </p>
                        </div>
                        
                        <div className="pt-4 mt-6 border-t border-border/30 flex items-center justify-between">
                          <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                            <time dateTime={post.createdAt}>{formatDate(post.createdAt)}</time>
                            <span>•</span>
                            <span>{getReadingTime(post.content)} min read</span>
                          </div>
                          <Link
                            to={`/blogs/${post.id}`}
                            className="inline-flex items-center text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
                            onClick={() => handlePostClick(post.id)}
                          >
                            Read Blog <ArrowRight className="ml-1 h-3.5 w-3.5" />
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            {posts.length === 0 && (
              <div className="text-center py-20 text-muted-foreground border border-dashed border-border/50 rounded-2xl">
                No insights or publications are currently available. Check back soon.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;
