import React, { useState, useEffect } from 'react';
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
import { Image as ImageIcon, Upload, Loader2, Link as LinkIcon, RefreshCw } from 'lucide-react';
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
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadState, setUploadState] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
    const [imageUrl, setImageUrl] = useState('');
    const { toast } = useToast();

    // Revoke object URL on unmount to prevent memory leaks
    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            
            console.log('Selected file for upload:', {
                name: file.name,
                type: file.type,
                size: `${(file.size / 1024 / 1024).toFixed(2)} MB`
            });

            // 1. File Type Validation
            const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
            if (!allowedTypes.includes(file.type)) {
                toast({
                    title: "Invalid File Type",
                    description: "Only JPG, PNG, WEBP, and GIF images are supported.",
                    variant: "destructive"
                });
                return;
            }

            // 2. File Size Validation (5MB max)
            const maxSize = 5 * 1024 * 1024;
            if (file.size > maxSize) {
                toast({
                    title: "File Too Large",
                    description: "Image size must be less than 5MB.",
                    variant: "destructive"
                });
                return;
            }

            setSelectedFile(file);
            setUploadState('idle');
            setUploadProgress(0);

            // 3. Set Preview URL
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) return;

        try {
            setUploading(true);
            setUploadState('uploading');
            setUploadProgress(0);
            
            console.log('Initiating upload for:', selectedFile.name);

            const url = await uploadBlogImage(selectedFile, (progress) => {
                setUploadProgress(progress);
            });

            console.log('Upload completed successfully. URL:', url);
            setUploadState('success');
            onSelect(url);
            handleOpenChange(false);
            toast({ title: "Success", description: "Image uploaded and selected successfully!" });
        } catch (error: any) {
            console.error('Image upload failed. Error details:', error);
            setUploadState('error');
            
            let errorMessage = error?.message || "An unknown error occurred during upload.";
            if (error?.code === 'storage/unauthorized') {
                errorMessage = "Security Rules Denied: You do not have permission to write to this storage bucket. Please verify that your account is registered as an authorized administrator.";
            } else if (error?.code === 'storage/canceled') {
                errorMessage = "Upload was canceled.";
            } else if (error?.code === 'storage/unknown') {
                errorMessage = "Unknown storage error. Check your internet connection or console logs.";
            }

            toast({
                title: "Upload Failed",
                description: errorMessage,
                variant: "destructive"
            });
        } finally {
            setUploading(false);
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
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
            setSelectedFile(null);
            setPreviewUrl(null);
            setImageUrl('');
            setUploadProgress(0);
            setUploadState('idle');
            setUploading(false);
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
                        <TabsTrigger value="upload" disabled={uploadState === 'uploading'}>Upload File</TabsTrigger>
                        <TabsTrigger value="url" disabled={uploadState === 'uploading'}>Image URL</TabsTrigger>
                    </TabsList>

                    <TabsContent value="upload" className="space-y-4 py-4">
                        {previewUrl ? (
                            <div className="flex flex-col items-center justify-center border border-border/50 rounded-lg p-4 bg-muted/10 relative">
                                <div className="aspect-video w-full rounded overflow-hidden mb-3 border border-border bg-muted/20 relative group">
                                    <img
                                        src={previewUrl}
                                        alt="Preview"
                                        className="w-full h-full object-contain"
                                    />
                                    {uploadState !== 'uploading' && (
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <label htmlFor="file-upload" className="cursor-pointer">
                                                <Button variant="secondary" size="sm" asChild>
                                                    <span>Change File</span>
                                                </Button>
                                            </label>
                                        </div>
                                    )}
                                </div>
                                <div className="w-full text-center text-xs text-muted-foreground mb-2 truncate px-4">
                                    <span className="font-semibold text-foreground">{selectedFile?.name}</span> ({((selectedFile?.size || 0) / 1024 / 1024).toFixed(2)} MB)
                                </div>

                                {uploadState === 'uploading' && (
                                    <div className="w-full space-y-1.5 px-4 mt-2">
                                        <div className="flex justify-between text-[11px] text-muted-foreground">
                                            <span className="flex items-center gap-1.5"><Loader2 className="h-3 w-3 animate-spin text-primary" /> Uploading...</span>
                                            <span className="font-medium text-foreground">{uploadProgress}%</span>
                                        </div>
                                        <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                                            <div 
                                                className="bg-primary h-1.5 rounded-full transition-all duration-300 ease-out" 
                                                style={{ width: `${uploadProgress}%` }}
                                            />
                                        </div>
                                    </div>
                                )}

                                {uploadState === 'error' && (
                                    <div className="text-center mt-2">
                                        <p className="text-xs text-destructive font-medium mb-1">Upload failed</p>
                                        <Button variant="ghost" size="sm" onClick={handleUpload} className="h-8 text-xs text-primary hover:text-primary/80">
                                            <RefreshCw className="mr-1.5 h-3.5 w-3.5" /> Retry Upload
                                        </Button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 cursor-pointer hover:bg-muted/50 transition-colors bg-muted/20">
                                <label htmlFor="file-upload" className="flex flex-col items-center cursor-pointer w-full h-full text-center">
                                    <Upload className="h-10 w-10 text-muted-foreground mb-2 animate-pulse" />
                                    <p className="text-sm font-medium text-foreground">Click to select image file</p>
                                    <p className="text-xs text-muted-foreground mt-1">PNG, JPG, WEBP, GIF up to 5MB</p>
                                </label>
                            </div>
                        )}
                        <input
                            type="file"
                            accept="image/jpeg, image/png, image/webp, image/gif"
                            className="hidden"
                            id="file-upload"
                            onChange={handleFileChange}
                            disabled={uploadState === 'uploading'}
                        />
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
                    <Button variant="outline" onClick={() => handleOpenChange(false)} disabled={uploadState === 'uploading'}>Cancel</Button>
                    {activeTab === 'upload' ? (
                        <Button onClick={handleUpload} disabled={!selectedFile || uploadState === 'uploading'}>
                            {uploadState === 'uploading' && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {uploadState === 'uploading' ? 'Uploading...' : 'Upload & Select'}
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
