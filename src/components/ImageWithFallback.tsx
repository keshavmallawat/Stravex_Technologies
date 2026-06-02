import React, { useState, useEffect } from 'react';
import { Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackText?: string;
  fallbackClassName?: string;
  fallbackIcon?: React.ReactNode;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  className,
  fallbackText = 'No image available',
  fallbackClassName,
  fallbackIcon,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);

  // Reset the error state if the source URL changes
  useEffect(() => {
    setHasError(false);
  }, [src]);

  if (!src || hasError) {
    return (
      <div
        className={cn(
          "w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-secondary/40 to-muted/20 border border-border/50 text-muted-foreground select-none p-4 text-center rounded-lg",
          fallbackClassName || className
        )}
      >
        {fallbackIcon || <ImageIcon className="h-8 w-8 mb-2 opacity-40 text-primary" />}
        <span className="text-xs font-medium opacity-70 max-w-full truncate px-2">{fallbackText}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      {...props}
      onError={(e) => {
        setHasError(true);
        props.onError?.(e);
      }}
    />
  );
};

export default ImageWithFallback;
