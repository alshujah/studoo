
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';

const instructions = [
  { duration: 5, text: "Get ready. The sounds will begin shortly." },
  { duration: 15, text: "Focus your attention only on the sound of the rain." },
  { duration: 10, text: "Now, shift your focus to the sound of the bell." },
  { duration: 15, text: "Broaden your attention. Try to listen to all the sounds at once without focusing on any single one." },
  { duration: 10, text: "Shift your focus to the sound of the bird." },
  { duration: 15, text: "Now, let your attention switch rapidly between all the different sounds." },
  { duration: 10, text: "Focus again, only on the sound of the rain." },
  { duration: 10, text: "Focus only on the bell." },
  { duration: 10, text: "Finally, focus only on the bird." },
  { duration: 10, text: "Great job. The session is now complete." },
];

const totalDuration = instructions.reduce((acc, i) => acc + i.duration, 0);

export function AttentionTrainingTool() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  const rainRef = useRef<HTMLAudioElement>(null);
  const bellRef = useRef<HTMLAudioElement>(null);
  const birdRef = useRef<HTMLAudioElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentInstruction = instructions.find((inst, index) => {
    const cumulativeDuration = instructions.slice(0, index + 1).reduce((acc, i) => acc + i.duration, 0);
    return elapsedTime < cumulativeDuration;
  }) || instructions[instructions.length - 1];

  useEffect(() => {
    if (isPlaying) {
      rainRef.current?.play();
      bellRef.current?.play();
      birdRef.current?.play();
      
      timerRef.current = setInterval(() => {
        setElapsedTime(prev => {
          if (prev + 1 >= totalDuration) {
            setIsPlaying(false);
            return totalDuration;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      rainRef.current?.pause();
      bellRef.current?.pause();
      birdRef.current?.pause();
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying]);
  
  const reset = () => {
    setIsPlaying(false);
    setElapsedTime(0);
    if(rainRef.current) rainRef.current.currentTime = 0;
    if(bellRef.current) bellRef.current.currentTime = 0;
    if(birdRef.current) birdRef.current.currentTime = 0;
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center gap-6 p-4 md:p-8 border rounded-lg bg-muted/20">
      <audio ref={rainRef} src="https://firebasestorage.googleapis.com/v0/b/trauma-phase-one-toolkit.appspot.com/o/sounds%2Frain.mp3?alt=media&token=f0d2358b-c662-42e8-8b9a-4713a5a73229" loop />
      <audio ref={bellRef} src="https://firebasestorage.googleapis.com/v0/b/trauma-phase-one-toolkit.appspot.com/o/sounds%2Fbell.mp3?alt=media&token=c813589b-8260-4ae9-8472-88f57297298c" loop />
      <audio ref={birdRef} src="https://firebasestorage.googleapis.com/v0/b/trauma-phase-one-toolkit.appspot.com/o/sounds%2Fbird.mp3?alt=media&token=262193b2-75d3-466d-a77a-24cd344a1073" loop />
      
      <div className="w-full max-w-md text-center">
        <Label>Instruction</Label>
        <p className="text-lg font-semibold min-h-12">{currentInstruction.text}</p>
      </div>

      <div className="w-full max-w-md">
        <Progress value={(elapsedTime / totalDuration) * 100} />
        <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>{formatTime(elapsedTime)}</span>
            <span>{formatTime(totalDuration)}</span>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <Button onClick={() => setIsPlaying(!isPlaying)} size="lg" className="w-36">
          {isPlaying ? <Pause className="mr-2" /> : <Play className="mr-2" />}
          {isPlaying ? 'Pause' : 'Start'}
        </Button>
         <Button onClick={reset} size="lg" variant="outline">
          <RotateCcw className="mr-2" />
          Reset
        </Button>
      </div>
    </div>
  );
}
