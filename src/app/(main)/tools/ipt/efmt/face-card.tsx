
'use client';

import React from 'react';
import Image from 'next/image';
import { placeholderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { BrainCircuit } from 'lucide-react';

interface FaceCardProps {
  id: number;
  emotion: string;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: (id: number) => void;
}

export function FaceCard({ id, emotion, isFlipped, isMatched, onClick }: FaceCardProps) {
  const image = placeholderImages.find(p => p.id === `face-${emotion}`);

  const handleCardClick = () => {
    if (!isFlipped && !isMatched) {
      onClick(id);
    }
  };

  return (
    <div
      className={cn(
        'w-full aspect-square rounded-md cursor-pointer transition-transform duration-500 transform-style-3d',
        isFlipped ? 'rotate-y-180' : ''
      )}
      onClick={handleCardClick}
    >
      <div className="relative w-full h-full backface-hidden">
        {/* Back of the card */}
        <div className="absolute w-full h-full bg-muted rounded-md flex items-center justify-center border-2 border-primary/20">
          <BrainCircuit className="w-1/2 h-1/2 text-primary/30" />
        </div>

        {/* Front of the card */}
        <div className="absolute w-full h-full rotate-y-180 backface-hidden">
          {image && (
            <Image
              src={image.imageUrl}
              alt={emotion}
              fill
              className={cn(
                'object-cover rounded-md border-4',
                 isMatched ? 'border-green-500 opacity-70' : 'border-primary'
              )}
            />
          )}
        </div>
      </div>

       <style jsx>{`
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
      `}</style>
    </div>
  );
}
