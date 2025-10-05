
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Play, StopCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export function MindfulnessBellTool() {
  const [intervalMinutes, setIntervalMinutes] = useState(5);
  const [timeLeft, setTimeLeft] = useState(intervalMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const bellRef = useRef<HTMLAudioElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            bellRef.current?.play();
            return intervalMinutes * 60; // Reset timer
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning, intervalMinutes]);
  
  const handleStart = () => {
    setTimeLeft(intervalMinutes * 60);
    setIsRunning(true);
    bellRef.current?.play();
  };

  const handleStop = () => {
    setIsRunning(false);
  };
  
  const handleIntervalChange = (value: string) => {
    const newInterval = parseInt(value);
    setIntervalMinutes(newInterval);
    if (!isRunning) {
        setTimeLeft(newInterval * 60);
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const progress = (timeLeft / (intervalMinutes * 60)) * 100;

  return (
    <div className="flex flex-col items-center gap-6 p-6 border rounded-lg bg-muted/20">
      <audio ref={bellRef} src="https://firebasestorage.googleapis.com/v0/b/trauma-phase-one-toolkit.appspot.com/o/sounds%2Fbell.mp3?alt=media&token=c813589b-8260-4ae9-8472-88f57297298c" />
      
      <div className="w-full max-w-xs grid gap-2">
        <Label htmlFor="interval">Ring bell every:</Label>
        <Select
          value={String(intervalMinutes)}
          onValueChange={handleIntervalChange}
          disabled={isRunning}
        >
          <SelectTrigger id="interval">
            <SelectValue placeholder="Select interval" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1 minute</SelectItem>
            <SelectItem value="5">5 minutes</SelectItem>
            <SelectItem value="10">10 minutes</SelectItem>
            <SelectItem value="15">15 minutes</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="w-full max-w-xs text-center">
        <p className="text-4xl font-bold font-mono tabular-nums">
          {isRunning ? formatTime(timeLeft) : '––:––'}
        </p>
        <p className="text-sm text-muted-foreground">
          {isRunning ? 'Next bell in...' : 'Timer is stopped'}
        </p>
        <Progress value={isRunning ? progress : 0} className="mt-4" />
      </div>

      <div className="flex items-center gap-4">
        {isRunning ? (
          <Button onClick={handleStop} size="lg" variant="destructive" className="w-36">
            <StopCircle className="mr-2" />
            Stop
          </Button>
        ) : (
          <Button onClick={handleStart} size="lg" className="w-36">
            <Play className="mr-2" />
            Start
          </Button>
        )}
      </div>
    </div>
  );
}
