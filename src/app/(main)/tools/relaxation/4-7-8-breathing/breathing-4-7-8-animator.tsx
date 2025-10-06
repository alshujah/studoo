
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Play, Pause } from 'lucide-react';

const phases = [
    { text: 'Breathe In...', duration: 4000, scale: 1.15 },
    { text: 'Hold', duration: 7000, scale: 1.15 },
    { text: 'Breathe Out...', duration: 8000, scale: 0.85 },
];

export function Breathing478Animator() {
    const [isActive, setIsActive] = useState(false);
    const [phaseIndex, setPhaseIndex] = useState(0);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isActive) {
            timer = setTimeout(() => {
                setPhaseIndex((prevIndex) => (prevIndex + 1) % phases.length);
            }, phases[phaseIndex].duration);
        }
        return () => clearTimeout(timer);
    }, [isActive, phaseIndex]);

    const handleStart = () => {
        if (!isActive) {
            setPhaseIndex(0);
        }
        setIsActive(!isActive);
    };

    const { text, scale } = phases[phaseIndex];
    const duration = phases[phaseIndex].duration / 1000;

    return (
        <div className="flex flex-col items-center justify-center gap-8 p-4 rounded-lg bg-muted/50 border">
            <div className="relative flex items-center justify-center h-52 w-52">
                <div
                    className="absolute bg-primary/20 rounded-full transition-transform ease-in-out"
                    style={{
                        transform: `scale(${isActive ? scale : 1})`,
                        transitionDuration: `${duration}s`,
                        width: '100%',
                        height: '100%',
                    }}
                />
                <div
                    className={cn(
                        "z-10 text-center text-xl font-medium text-primary transition-opacity duration-1000",
                        !isActive && "opacity-0"
                    )}
                >
                    {text}
                </div>
                 <div
                    className={cn(
                        "z-10 text-center text-xl font-medium text-primary transition-opacity duration-1000",
                        isActive && "opacity-0"
                    )}
                >
                    <p>4-7-8 Breath</p>
                </div>
            </div>
            <Button onClick={handleStart} variant="outline" size="lg">
                {isActive ? <Pause className="mr-2" /> : <Play className="mr-2" />}
                {isActive ? 'Pause' : 'Start'}
            </Button>
        </div>
    );
}

