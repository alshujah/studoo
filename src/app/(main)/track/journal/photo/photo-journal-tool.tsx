
'use client';

import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Image as ImageIcon, Upload, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

export function PhotoJournalTool() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) { // 4MB limit
          toast({
              variant: 'destructive',
              title: 'Image too large',
              description: 'Please select an image smaller than 4MB.',
          });
          return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSave = () => {
    // This is where you would typically save to a backend.
    // For this frontend-only implementation, we'll just show a toast.
    if (!imagePreview) {
        toast({
            variant: 'destructive',
            title: 'No Image Selected',
            description: 'Please upload an image before saving.',
        });
        return;
    }
    
    console.log({
      image: imagePreview,
      caption: caption,
    });
    
    toast({
      title: 'Entry Saved (Logged to Console)',
      description: 'In a real app, this would be saved to your account.',
    });
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="flex flex-col gap-4">
        <div className="w-full aspect-square rounded-md bg-muted flex items-center justify-center border relative overflow-hidden">
          {imagePreview ? (
             <Image src={imagePreview} alt="Journal entry preview" fill objectFit="cover" />
          ) : (
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <ImageIcon size={48} />
              <p>Image Preview</p>
            </div>
          )}
        </div>
        <Input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImageChange} 
            className="hidden" 
            accept="image/png, image/jpeg, image/gif"
        />
        <Button onClick={handleUploadClick} variant="outline">
            <Upload className="mr-2" />
            Upload Image
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        <Textarea
          placeholder="Add a caption, reflect on your feelings, or describe the moment..."
          className="h-full min-h-60"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <Button onClick={handleSave} size="lg">
          <Save className="mr-2" />
          Save Entry
        </Button>
      </div>
    </div>
  );
}
