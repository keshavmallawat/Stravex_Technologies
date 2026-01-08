import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, User, Share2, Loader2, X, ZoomIn } from "lucide-react";
import SEO from "@/components/SEO";
import { getBlogPosts, type BlogPost, incrementBlogView } from "@/integrations/firebase/blogService";
import { formatDateWithMonthName } from "@/utils/dateUtils";
import parse from 'html-react-parser';
import DOMPurify from 'dompurify';

const BlogPost = () => {
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    useEffect(() => {
        const fetchPost = async () => {
            if (!id) return;
            try {
                const posts = await getBlogPosts();
                const data = posts.find(p => p.id === id);
                if (data) {
                    setPost(data);
                    // View count is already tracked when clicking from listing page
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
                <h1 className="text-3xl font-bold mb-4">Post not found</h1>
                <p className="text-muted-foreground mb-8">The blog post you are looking for does not exist or has been removed.</p>
                <Link to="/blogs">
                    <Button variant="outline"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Blogs</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-hero bg-grid pt-24 pb-16">
            <SEO
                title={`${post.seo?.metaTitle || post.title} – Stravex Technologies`}
                description={post.seo?.metaDescription || post.excerpt}
                path={`/blogs/${post.id}`}
                image={post.seo?.ogImage || post.coverImage}
            />

            <div className="max-w-4xl mx-auto px-4 sm:px-6">
                <Link to="/blogs" className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blogs
                </Link>

                <article className="glass p-6 md:p-10 rounded-2xl border border-border/50 shadow-2xl backdrop-blur-xl bg-card/30">
                    <header className="mb-8 border-b border-border/50 pb-8">
                        <div className="flex gap-2 mb-4 flex-wrap">
                            {post.tags.map(tag => (
                                <Badge key={tag} variant="secondary" className="px-3 py-1">{tag}</Badge>
                            ))}
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight font-heading">
                            {post.title}
                        </h1>
                        <div className="flex items-center gap-6 text-muted-foreground text-sm">
                            <div className="flex items-center">
                                <Calendar className="mr-2 h-4 w-4" />
                                {formatDateWithMonthName(post.createdAt)}
                            </div>
                            <div className="flex items-center">
                                <User className="mr-2 h-4 w-4" />
                                {post.author?.name || 'Stravex Team'}
                            </div>
                        </div>
                    </header>

                    {post.coverImage && (
                        <div className="aspect-video w-full rounded-xl overflow-hidden mb-12 bg-muted/30 border border-border shadow-lg relative group cursor-pointer" onClick={() => setSelectedImage(post.coverImage)}>
                            <img
                                src={post.coverImage}
                                alt={post.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200">
                                <ZoomIn className="h-8 w-8 text-white" />
                            </div>
                        </div>
                    )}

                    <div className="prose prose-invert max-w-none prose-lg prose-headings:font-heading prose-a:text-primary prose-img:rounded-xl prose-p:leading-relaxed prose-headings:scroll-m-20">
                        {parse(DOMPurify.sanitize(post.content))}
                    </div>
                </article>
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

export default BlogPost;
