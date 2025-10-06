
'use client';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PageLayout } from '@/components/layout/page-layout';
import { coreValues } from '@/lib/data/act-data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Lightbulb } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const TOTAL_STEPS = 3;

export default function ValuesClarificationPage() {
    const [step, setStep] = useState(1);
    const [selectedValues, setSelectedValues] = useState<string[]>([]);
    const [topValues, setTopValues] = useState<string[]>([]);

    const handleValueToggle = (valueName: string) => {
        setSelectedValues(prev => 
            prev.includes(valueName) 
            ? prev.filter(v => v !== valueName)
            : [...prev, valueName]
        );
    };

    const handleTopValueToggle = (valueName: string) => {
        setTopValues(prev => {
            if (prev.includes(valueName)) {
                return prev.filter(v => v !== valueName);
            }
            if (prev.length < 5) {
                return [...prev, valueName];
            }
            return prev;
        });
    };
    
    const renderStep = () => {
        switch(step) {
            case 1:
                return (
                    <motion.div key={1} initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }}>
                        <CardHeader>
                            <CardTitle>Step 1: Choose Your Values</CardTitle>
                            <CardDescription>From the list below, select all the values that resonate with you. Don't overthink it, just go with your gut feeling.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <div className="flex flex-wrap gap-4">
                                {coreValues.map(value => (
                                    <div key={value.name} className="flex items-center space-x-2">
                                        <Checkbox 
                                            id={value.name} 
                                            onCheckedChange={() => handleValueToggle(value.name)}
                                            checked={selectedValues.includes(value.name)}
                                        />
                                        <label htmlFor={value.name} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                            {value.name}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                         <CardFooter>
                            <Button onClick={() => setStep(2)} disabled={selectedValues.length === 0}>
                                Next Step <ArrowRight className="ml-2" />
                            </Button>
                        </CardFooter>
                    </motion.div>
                );
            case 2:
                return (
                    <motion.div key={2} initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }}>
                        <CardHeader>
                            <CardTitle>Step 2: Identify Your Top 5</CardTitle>
                            <CardDescription>From your selected values, choose the 5 that are most important to you right now.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <div className="flex flex-wrap gap-4">
                                {selectedValues.map(valueName => {
                                     const value = coreValues.find(v => v.name === valueName);
                                     if (!value) return null;
                                     return (
                                        <div key={value.name} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={`top-${value.name}`}
                                                onCheckedChange={() => handleTopValueToggle(value.name)}
                                                checked={topValues.includes(value.name)}
                                                disabled={topValues.length >= 5 && !topValues.includes(value.name)}
                                            />
                                            <label htmlFor={`top-${value.name}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                                {value.name}
                                            </label>
                                        </div>
                                     );
                                })}
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                            <Button onClick={() => setStep(3)} disabled={topValues.length < 1}>
                                See My Core Values <ArrowRight className="ml-2" />
                            </Button>
                        </CardFooter>
                    </motion.div>
                );
            case 3:
                 const topValuesDetails = coreValues.filter(v => topValues.includes(v.name));
                return (
                    <motion.div key={3} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}>
                        <CardHeader>
                            <CardTitle className="font-headline">Your Core Values</CardTitle>
                            <CardDescription>These are the values you've identified as most important to you. They can act as a compass to guide your decisions and actions.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {topValuesDetails.map(value => (
                                <div key={value.name} className="p-4 border rounded-lg bg-muted/50">
                                    <h3 className="text-lg font-semibold text-primary">{value.name}</h3>
                                    <p className="text-muted-foreground">{value.description}</p>
                                </div>
                            ))}
                             <Alert className="mt-6">
                                <Lightbulb className="h-4 w-4" />
                                <AlertTitle>What's Next?</AlertTitle>
                                <AlertDescription>
                                    Consider one small action you could take this week that would be in line with one of these values. Living your values, even in small ways, is the heart of a meaningful life.
                                </AlertDescription>
                            </Alert>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={() => {
                                setStep(1);
                                setSelectedValues([]);
                                setTopValues([]);
                            }}>Start Over</Button>
                        </CardFooter>
                    </motion.div>
                );
        }
    }

  return (
    <PageLayout title="Values Clarification">
        <Card>
            <AnimatePresence mode="wait">
                {renderStep()}
            </AnimatePresence>
        </Card>
    </PageLayout>
  );
}

