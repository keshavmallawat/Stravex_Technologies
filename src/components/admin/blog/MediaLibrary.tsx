import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { uploadBlogImage } from '@/integrations/firebase/blogService';
import { Image as ImageIcon, Upload, Loader2, Link as LinkIcon } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface MediaLibraryProps {
    onSelect: (url: string) => void;
    trigger?: React.ReactNode;
}

export const MediaLibrary: React.FC<MediaLibraryProps> = ({ onSelect, trigger }) => {
    const [open, setOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('upload');
    const [uploading, setUploading] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState('');
    const { toast } = useToast();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) return;

        try {
            setUploading(true);
            const url = await uploadBlogImage(selectedFile);
            onSelect(url);
            setOpen(false);
            toast({ title: "Success", description: "Image uploaded and selected" });
        } catch (error: any) {
            console.error('Upload error details:', error);
            // Display detailed message to help diagnose permissions or config errors
            toast({
                title: "Upload Failed",
                description: error?.message || "Failed to upload image. Verify Firebase Storage rules or use an Image URL.",
                variant: "destructive"
            });
        } finally {
            setUploading(false);
            setSelectedFile(null);
        }
    };

    const handleSelectUrl = () => {
        if (!imageUrl.trim()) return;
        onSelect(imageUrl.trim());
        setOpen(false);
        setImageUrl('');
        toast({ title: "Success", description: "Image URL selected" });
    };

    const handleOpenChange = (isOpen: boolean) => {
        setOpen(isOpen);
        if (!isOpen) {
            setSelectedFile(null);
            setImageUrl('');
            setActiveTab('upload');
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                {trigger || (
                    <Button variant="outline" size="sm">
                        <ImageIcon className="mr-2 h-4 w-4" /> Media Library
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Media Library</DialogTitle>
                </DialogHeader>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="upload">Upload File</TabsTrigger>
                        <TabsTrigger value="url">Image URL</TabsTrigger>
                    </TabsList>

                    <TabsContent value="upload" className="space-y-4 py-4">
                        <div className="flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 cursor-pointer hover:bg-muted/50 transition-colors bg-muted/20">
                            <Input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                id="file-upload"
                                onChange={handleFileChange}
                            />
                            <label htmlFor="file-upload" className="flex flex-col items-center cursor-pointer w-full h-full">
                                {selectedFile ? (
                                    <>
                                        <ImageIcon className="h-10 w-10 text-primary mb-2" />
                                        <p className="text-sm font-medium text-foreground max-w-[250px] truncate">{selectedFile.name}</p>
                                        <p className="text-xs text-muted-foreground">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                                    </>
                                ) : (
                                    <>
                                        <Upload className="h-10 w-10 text-muted-foreground mb-2 animate-pulse" />
                                        <p className="text-sm font-medium text-foreground">Click to select image file</p>
                                        <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 5MB</p>
                                    </>
                                )}
                            </label>
                        </div>
                    </TabsContent>

                    <TabsContent value="url" className="space-y-4 py-4">
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Paste direct image link</label>
                            <div className="flex gap-2 items-center">
                                <LinkIcon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                                <Input
                                    type="url"
                                    placeholder="https://images.unsplash.com/... or similar"
                                    value={imageUrl}
                                    onChange={(e) => setImageUrl(e.target.value)}
                                    className="flex-1"
                                />
                            </div>
                            <p className="text-[11px] text-muted-foreground/80 leading-normal">
                                Direct image link should end with an extension (e.g. .jpg, .png, .gif) or be a valid public CDN image URL.
                            </p>
                        </div>
                    </TabsContent>
                </Tabs>

                <DialogFooter>
                    <Button variant="outline" onClick={() => handleOpenChange(false)}>Cancel</Button>
                    {activeTab === 'upload' ? (
                        <Button onClick={handleUpload} disabled={!selectedFile || uploading}>
                            {uploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {uploading ? 'Uploading...' : 'Upload & Select'}
                        </Button>
                    ) : (
                        <Button onClick={handleSelectUrl} disabled={!imageUrl.trim()}>
                            Select URL
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
