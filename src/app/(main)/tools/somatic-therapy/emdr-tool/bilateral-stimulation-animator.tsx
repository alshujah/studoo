
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, FastForward, Rewind } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

export function BilateralStimulationAnimator() {
    const [isActive, setIsActive] = useState(false);
    const [speed, setSpeed] = useState(4); // Corresponds to a 4-second duration

    const handleToggle = () => {
        setIsActive(!isActive);
    };

    const handleSpeedChange = (value: number[]) => {
        setSpeed(value[0]);
    };
    
    // speed is inverse, so higher slider value means faster animation
    const duration = (11 - speed) / 2; 

    return (
        <div className="flex flex-col items-center justify-center gap-8 p-4 rounded-lg bg-muted/50 border">
            <div className="w-full h-24 bg-muted rounded-lg overflow-hidden relative">
                <div 
                    className="absolute top-1/2 w-8 h-8 bg-primary rounded-full -translate-y-1/2"
                    style={{
                        animation: isActive ? `move-across ${duration}s ease-in-out infinite` : 'none'
                    }}
                ></div>
                <style jsx>{\`
                    @keyframes move-across {
                        0%, 100% {
                            left: 5%;
                        }
                        50% {
                            left: 95%;
                            transform: translate(-100%, -50%);
                        }
                    }
                \`}</style>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-6 w-full max-w-sm">
                <Button onClick={handleToggle} variant="outline" size="lg" className="w-full sm:w-auto">
                    {isActive ? <Pause className="mr-2" /> : <Play className="mr-2" />}
                    {isActive ? 'Pause' : 'Start'}
                </Button>
                <div className="flex items-center gap-2 w-full">
                   <Rewind className="text-muted-foreground" />
                    <Slider
                        value={[speed]}
                        onValueChange={handleSpeedChange}
                        min={1}
                        max={10}
                        step={1}
                    />
                    <FastForward className="text-muted-foreground" />
                </div>
            </div>
        </div>
    );
}
