
'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { PageLayout } from '@/components/layout/page-layout';
import { Play, Pause, RefreshCw } from 'lucide-react';

const exercises = [
  {
    name: 'Box Breathing',
    description: 'A simple technique to calm your nervous system.',
    pattern: [
      { instruction: 'Breathe In', duration: 4 },
      { instruction: 'Hold', duration: 4 },
      { instruction: 'Breathe Out', duration: 4 },
      { instruction: 'Hold', duration: 4 },
    ],
  },
  {
    name: '4-7-8 Breathing',
    description: 'A calming breath technique to promote relaxation.',
    pattern: [
      { instruction: 'Breathe In', duration: 4 },
      { instruction: 'Hold', duration: 7 },
      { instruction: 'Breathe Out', duration: 8 },
    ],
  },
  {
    name: 'Simple Deep Breathing',
    description: 'A basic technique to focus your awareness on the breath.',
    pattern: [
        { instruction: 'Breathe In', duration: 5 },
        { instruction: 'Breathe Out', duration: 5 },
    ],
  }
];

export default function BreathingExercisesPage() {
  const [selectedExercise, setSelectedExercise] = useState(exercises[0]);
  const [stepIndex, setStepIndex] = useState(0);
  const [countdown, setCountdown] = useState(selectedExercise.pattern[0].duration);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const stepTimerRef = useRef<NodeJS.Timeout | null>(null);

  const currentStep = selectedExercise.pattern[stepIndex];

  useEffect(() => {
    if (isRunning) {
      setCountdown(currentStep.duration);

      timerRef.current = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);

      stepTimerRef.current = setTimeout(() => {
        clearInterval(timerRef.current!);
        setStepIndex(prev => (prev + 1) % selectedExercise.pattern.length);
      }, currentStep.duration * 1000);

    } else {
      clearInterval(timerRef.current!);
      clearTimeout(stepTimerRef.current!);
    }

    return () => {
      clearInterval(timerRef.current!);
      clearTimeout(stepTimerRef.current!);
    };
  }, [isRunning, stepIndex, selectedExercise, currentStep.duration]);
  
  const reset = (exercise = selectedExercise) => {
    setIsRunning(false);
    setStepIndex(0);
    setCountdown(exercise.pattern[0].duration);
  }

  const handleSelectExercise = (exercise: typeof exercises[0]) => {
      setSelectedExercise(exercise);
      reset(exercise);
  }

  return (
    <PageLayout title="Breathing Exercises">
      <div className="grid md:grid-cols-3 gap-8">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Choose an Exercise</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {exercises.map(ex => (
              <Button
                key={ex.name}
                variant={selectedExercise.name === ex.name ? 'secondary' : 'ghost'}
                className="w-full justify-start"
                onClick={() => handleSelectExercise(ex)}
              >
                {ex.name}
              </Button>
            ))}
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
            <CardHeader>
                <CardTitle className="font-headline text-3xl">{selectedExercise.name}</CardTitle>
                <CardDescription>{selectedExercise.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center min-h-64 space-y-8">
                 <motion.div
                    key={stepIndex}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center justify-center text-center w-48 h-48 rounded-full border-8 border-primary"
                  >
                    <p className="text-2xl font-semibold">{currentStep.instruction}</p>
                    <p className="text-5xl font-bold">{countdown}</p>
                  </motion.div>
                 <div className="flex items-center gap-4">
                    <Button onClick={() => setIsRunning(!isRunning)} size="lg">
                        {isRunning ? <Pause className="mr-2" /> : <Play className="mr-2" />}
                        {isRunning ? 'Pause' : 'Start'}
                    </Button>
                     <Button onClick={() => reset()} variant="outline" size="icon">
                        <RefreshCw />
                     </Button>
                 </div>
            </CardContent>
            <CardFooter>
                <p className="text-sm text-muted-foreground">Sync your breath with the visual guide. Continue for as long as feels comfortable.</p>
            </CardFooter>
        </Card>
      </div>
    </PageLayout>
  );
}
