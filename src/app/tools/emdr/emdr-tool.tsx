
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Play, Pause } from 'lucide-react';

export function EmdrTool() {
  const [speed, setSpeed] = useState(2); // Speed of the animation
  const [isAnimating, setIsAnimating] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number>();

  useEffect(() => {
    if (!isAnimating || !dotRef.current || !containerRef.current) {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      return;
    }

    const dot = dotRef.current;
    const container = containerRef.current;
    const containerWidth = container.offsetWidth;
    const dotWidth = dot.offsetWidth;
    
    let position = 0;
    let direction = 1;

    const animate = () => {
      position += direction * speed;

      if (position >= containerWidth - dotWidth) {
        position = containerWidth - dotWidth;
        direction = -1;
      } else if (position <= 0) {
        position = 0;
        direction = 1;
      }

      dot.style.transform = `translateX(${position}px)`;
      animationFrameId.current = requestAnimationFrame(animate);
    };

    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isAnimating, speed]);

  const toggleAnimation = () => {
    setIsAnimating(!isAnimating);
  };

  return (
    <div className="flex flex-col items-center gap-8 p-4 border rounded-lg bg-muted/20">
      <div ref={containerRef} className="relative w-full h-24 bg-muted rounded-md flex items-center">
        <div 
          ref={dotRef} 
          className="absolute w-10 h-10 bg-primary rounded-full"
          style={{ transform: 'translateX(0px)' }}
        />
      </div>
      <div className="w-full max-w-md flex flex-col gap-4">
        <div className="grid gap-2">
            <Label htmlFor="speed">Speed ({speed.toFixed(1)})</Label>
            <Slider
                id="speed"
                min={0.5}
                max={10}
                step={0.1}
                value={[speed]}
                onValueChange={(value) => setSpeed(value[0])}
            />
        </div>
        <Button onClick={toggleAnimation} size="lg">
          {isAnimating ? <Pause className="mr-2" /> : <Play className="mr-2" />}
          {isAnimating ? 'Pause' : 'Start'}
        </Button>
      </div>
    </div>
  );
}
