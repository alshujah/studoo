'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

const states = ['Breathe In', 'Hold', 'Breathe Out', 'Hold'];
const DURATION = 4000; // 4 seconds per state

export function BoxBreathingTool() {
  const [isRunning, setIsRunning] = useState(false);
  const [currentState, setCurrentState] = useState(0);
  const [rounds, setRounds] = useState(0);
  const [sessionTime, setSessionTime] = useState(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const sessionTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setCurrentState((prev) => (prev + 1) % states.length);
        if (currentState === states.length - 1) {
            setRounds(prev => prev + 1);
        }
      }, DURATION);

      sessionTimerRef.current = setInterval(() => {
        setSessionTime(prev => prev + 1);
      }, 1000);

    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      if (sessionTimerRef.current) clearInterval(sessionTimerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (sessionTimerRef.current) clearInterval(sessionTimerRef.current);
    };
  }, [isRunning, currentState]);
  
  const toggleRunning = () => setIsRunning(!isRunning);

  const reset = () => {
    setIsRunning(false);
    setCurrentState(0);
    setRounds(0);
    setSessionTime(0);
  };
  
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${minutes}:${secs}`;
  }

  return (
    <div className="flex flex-col items-center gap-8 p-4 md:p-8 border rounded-lg bg-muted/20">
      <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
        <div 
          className={cn(
            "absolute w-full h-full bg-primary/20 rounded-lg transition-transform duration-[3500ms] ease-in-out",
            (isRunning && (currentState === 0)) && 'scale-125', // Breathe In
            (isRunning && (currentState === 2)) && 'scale-75', // Breathe Out
          )}
        />
        <div className="z-10 text-center">
          <p className="text-3xl md:text-4xl font-semibold text-primary">
            {states[currentState]}
          </p>
          <p className="text-lg text-muted-foreground">4 seconds</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 text-center">
          <div>
              <p className="text-sm text-muted-foreground">Session Time</p>
              <p className="text-2xl font-semibold">{formatTime(sessionTime)}</p>
          </div>
          <div>
              <p className="text-sm text-muted-foreground">Rounds</p>
              <p className="text-2xl font-semibold">{rounds}</p>
          </div>
      </div>

      <div className="flex items-center gap-4">
        <Button onClick={toggleRunning} size="lg" className="w-36">
          {isRunning ? <Pause className="mr-2" /> : <Play className="mr-2" />}
          {isRunning ? 'Pause' : 'Start'}
        </Button>
         <Button onClick={reset} size="lg" variant="outline">
          <RotateCcw className="mr-2" />
          Reset
        </Button>
      </div>
    </div>
  );
}
