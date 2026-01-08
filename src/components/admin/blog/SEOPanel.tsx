import React from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { BlogSEO } from '@/integrations/firebase/blogService';

interface SEOPanelProps {
    data: BlogSEO;
    onChange: (data: BlogSEO) => void;
    slug: string;
}

export const SEOPanel: React.FC<SEOPanelProps> = ({ data, onChange, slug }) => {
    const handleChange = (field: keyof BlogSEO, value: string | string[]) => {
        onChange({
            ...data,
            [field]: value
        });
    };

    return (
        <div className="space-y-6">
            <Card className="p-4 bg-muted/20 border-border">
                <h3 className="text-sm font-semibold mb-3 text-muted-foreground">Google Preview</h3>
                <div className="bg-white dark:bg-[#1a1a1a] p-4 rounded-md shadow-sm max-w-2xl font-arial">
                    <div className="flex items-center gap-2 mb-1">
                        <div className="h-7 w-7 bg-gray-200 rounded-full flex items-center justify-center text-xs text-gray-500">S</div>
                        <div>
                            <div className="text-sm text-gray-800 dark:text-gray-300">Stravex Technologies</div>
                            <div className="text-xs text-green-700 dark:text-gray-400 truncate">https://stravextechnologies.com/blogs/{slug || 'post-slug'}</div>
                        </div>
                    </div>
                    <a href="#" className="text-xl text-[#1a0dab] dark:text-[#8ab4f8] hover:underline cursor-text font-medium block mb-1">
                        {data.metaTitle || 'Page Title'}
                    </a>
                    <p className="text-sm text-[#4d5156] dark:text-[#bdc1c6] line-clamp-2">
                        {data.metaDescription || 'Meta description not set. Google will display a snippet from your content.'}
                    </p>
                </div>
            </Card>

            <div className="space-y-4">
                <div>
                    <Label>Meta Title</Label>
                    <div className="relative">
                        <Input
                            value={data.metaTitle}
                            onChange={(e) => handleChange('metaTitle', e.target.value)}
                            placeholder="Primary SEO Title"
                            maxLength={60}
                        />
                        <span className="absolute right-2 top-2 text-xs text-muted-foreground">
                            {data.metaTitle.length}/60
                        </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Recommended length: 50-60 characters</p>
                </div>

                <div>
                    <Label>Meta Description</Label>
                    <div className="relative">
                        <Textarea
                            value={data.metaDescription}
                            onChange={(e) => handleChange('metaDescription', e.target.value)}
                            placeholder="Brief summary for search engines"
                            rows={3}
                            maxLength={160}
                        />
                        <span className="absolute right-2 bottom-2 text-xs text-muted-foreground">
                            {data.metaDescription.length}/160
                        </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Recommended length: 150-160 characters</p>
                </div>

                <div>
                    <Label>Keywords (comma separated)</Label>
                    <Input
                        value={data.keywords.join(', ')}
                        onChange={(e) => handleChange('keywords', e.target.value.split(',').map(s => s.trim()))}
                        placeholder="technology, react, ai"
                    />
                </div>
            </div>
        </div>
    );
};
