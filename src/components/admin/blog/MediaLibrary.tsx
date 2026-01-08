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
import { Image as ImageIcon, Upload, Loader2, Check } from 'lucide-react';

interface MediaLibraryProps {
    onSelect: (url: string) => void;
    trigger?: React.ReactNode;
}

export const MediaLibrary: React.FC<MediaLibraryProps> = ({ onSelect, trigger }) => {
    const [open, setOpen] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
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
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "Failed to upload image",
                variant: "destructive"
            });
        } finally {
            setUploading(false);
            setSelectedFile(null);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
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

                <div className="space-y-4 py-4">
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
                                    <p className="text-sm font-medium text-foreground">{selectedFile.name}</p>
                                    <p className="text-xs text-muted-foreground">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                                </>
                            ) : (
                                <>
                                    <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                                    <p className="text-sm font-medium text-foreground">Click to upload image</p>
                                    <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 5MB</p>
                                </>
                            )}
                        </label>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleUpload} disabled={!selectedFile || uploading}>
                        {uploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {uploading ? 'Uploading...' : 'Upload & Select'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
