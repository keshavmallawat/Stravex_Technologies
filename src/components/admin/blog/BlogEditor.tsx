import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
    Loader2, ArrowLeft, Save, Image as ImageIcon
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import slugify from 'slugify';
import { useToast } from '@/hooks/use-toast';
import {
    createBlogPost,
    getBlogPostById,
    updateBlogPost,
    BlogPostCreate
} from '@/integrations/firebase/blogService';
import { RichTextEditor } from '@/components/admin/blog/RichTextEditor';
import { SEOPanel } from '@/components/admin/blog/SEOPanel';
import { MediaLibrary } from '@/components/admin/blog/MediaLibrary';

const formSchema = z.object({
    title: z.string().min(5, 'Title must be at least 5 characters'),
    slug: z.string().optional(),
    excerpt: z.string().optional(),
    status: z.enum(['draft', 'published']),
    authorName: z.string().min(2, 'Author name is required'),
});

const BlogEditor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [activeTab, setActiveTab] = useState('content');

    // Custom states for complex fields
    const [content, setContent] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState('');
    const [categories, setCategories] = useState<string[]>([]);
    const [seo, setSeo] = useState<import('@/integrations/firebase/blogService').BlogSEO>({
        metaTitle: '',
        metaDescription: '',
        keywords: [],
        ogImage: ''
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            slug: '',
            excerpt: '',
            status: 'draft',
            authorName: 'Admin',
        },
    });

    useEffect(() => {
        if (id) {
            fetchPost(id);
        }
    }, [id]);

    const fetchPost = async (postId: string) => {
        setLoading(true);
        try {
            const post = await getBlogPostById(postId);
            if (post) {
                form.reset({
                    title: post.title,
                    slug: post.slug,
                    excerpt: post.excerpt,
                    status: post.status as any,
                    authorName: post.author?.name || 'Admin',
                });
                setContent(post.content);
                setCoverImage(post.coverImage);
                setTags(post.tags);
                setCategories(post.categories);
                setSeo(post.seo);
            }
        } catch (error) {
            console.error(error);
            toast({ title: "Error", description: "Failed to fetch post", variant: "destructive" });
        } finally {
            setLoading(false);
        }
    };

    const generateSlug = (value: string) => {
        const slug = slugify(value, { lower: true, strict: true });
        form.setValue('slug', slug, { shouldValidate: true });
    };

    const handleAddTag = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && tagInput.trim()) {
            e.preventDefault();
            if (!tags.includes(tagInput.trim())) {
                setTags([...tags, tagInput.trim()]);
            }
            setTagInput('');
        }
    };

    const removeTag = (tag: string) => {
        setTags(tags.filter(t => t !== tag));
    };

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setSubmitting(true);

            // Auto-generate slug if missing
            let finalSlug = values.slug;
            if (!finalSlug) {
                finalSlug = slugify(values.title, { lower: true, strict: true });
            }

            // Auto-generate excerpt if missing
            let finalExcerpt = values.excerpt;
            if (!finalExcerpt) {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = content;
                const plainText = tempDiv.textContent || tempDiv.innerText || '';
                finalExcerpt = plainText.slice(0, 150) + (plainText.length > 150 ? '...' : '');
            }

            const postData: BlogPostCreate = {
                title: values.title,
                slug: finalSlug || '',
                excerpt: finalExcerpt || '',
                content,
                coverImage,
                tags,
                categories,
                status: values.status as any,
                seo,
                author: {
                    name: values.authorName, // Use the custom author name
                },
            };

            if (id) {
                await updateBlogPost(id, postData);
                toast({ title: "Success", description: "Blog post updated" });
            } else {
                await createBlogPost(postData);
                toast({ title: "Success", description: "Blog post created" });
                navigate('/admin/blogs');
            }
        } catch (error: any) {
            console.error("Save Error:", error);
            toast({
                title: "Error",
                description: error.message || "Failed to save post. Check console for details.",
                variant: "destructive"
            });
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return <div className="flex justify-center py-20"><Loader2 className="animate-spin" /></div>;
    }

    return (
        <div className="max-w-7xl mx-auto pb-20">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" onClick={() => navigate('/admin/blogs')}>
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back
                    </Button>
                    <h1 className="text-2xl font-bold">{id ? 'Edit Post' : 'New Post'}</h1>
                    <Badge variant={form.watch('status') === 'published' ? 'default' : 'secondary'}>
                        {form.watch('status')}
                    </Badge>
                </div>
                <div className="flex gap-2">
                    <Button onClick={form.handleSubmit(onSubmit)} disabled={submitting}>
                        {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        <Save className="mr-2 h-4 w-4" /> Save Post
                    </Button>
                </div>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-6">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                placeholder="Post Title"
                                                className="text-xl font-bold h-12 px-4 py-2"
                                                {...field}
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    if (!id) {
                                                        generateSlug(e.target.value);
                                                    }
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Tabs value={activeTab} onValueChange={setActiveTab}>
                                <TabsList className="grid w-full grid-cols-2">
                                    <TabsTrigger value="content">Content</TabsTrigger>
                                    <TabsTrigger value="seo">SEO & Metadata</TabsTrigger>
                                </TabsList>
                                <TabsContent value="content" className="mt-4 space-y-6">
                                    <RichTextEditor content={content} onChange={setContent} />
                                </TabsContent>
                                <TabsContent value="seo" className="mt-4">
                                    <SEOPanel data={seo} onChange={setSeo} slug={form.watch('slug')} />
                                </TabsContent>
                            </Tabs>
                        </div>

                        <div className="space-y-6">
                            <Card>
                                <CardContent className="p-4 space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="status"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Status</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select status" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="draft">Draft</SelectItem>
                                                        <SelectItem value="published">Published</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="authorName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Author Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="e.g. John Doe" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="p-4 space-y-4">
                                    <FormLabel>Cover Image</FormLabel>
                                    {coverImage ? (
                                        <div className="relative aspect-video rounded-md overflow-hidden border">
                                            <img src={coverImage} alt="Cover" className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                                <MediaLibrary onSelect={setCoverImage} trigger={<Button variant="secondary" size="sm">Change</Button>} />
                                                <Button variant="destructive" size="sm" onClick={() => setCoverImage('')}>Remove</Button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="aspect-video bg-muted rounded-md flex flex-col items-center justify-center text-muted-foreground border-2 border-dashed">
                                            <ImageIcon className="h-8 w-8 mb-2" />
                                            <p className="text-sm">No cover image</p>
                                            <MediaLibrary onSelect={setCoverImage} trigger={<Button variant="link" className="mt-2">Select Image</Button>} />
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="p-4 space-y-4">
                                    <FormLabel>Tags</FormLabel>
                                    <div className="flex flex-wrap gap-2 mb-2">
                                        {tags.map(tag => (
                                            <Badge key={tag} variant="secondary">
                                                {tag}
                                                <button onClick={() => removeTag(tag)} className="ml-1 hover:text-destructive">×</button>
                                            </Badge>
                                        ))}
                                    </div>
                                    <Input
                                        placeholder="Add tag and press Enter"
                                        value={tagInput}
                                        onChange={(e) => setTagInput(e.target.value)}
                                        onKeyDown={handleAddTag}
                                    />
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default BlogEditor;
