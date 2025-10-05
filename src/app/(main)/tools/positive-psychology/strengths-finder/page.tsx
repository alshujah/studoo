
'use client';
import { PageLayout } from '@/components/layout/page-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { characterStrengths } from '@/lib/data/positive-psychology-data';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';
import { Award } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

export default function StrengthsFinderPage() {
    const [selectedStrengths, setSelectedStrengths] = useState<string[]>([]);
    const [isFinished, setIsFinished] = useState(false);

    const handleSelect = (strengthName: string) => {
        if (selectedStrengths.includes(strengthName)) {
            setSelectedStrengths(selectedStrengths.filter(s => s !== strengthName));
        } else {
            if (selectedStrengths.length < 5) {
                setSelectedStrengths([...selectedStrengths, strengthName]);
            }
        }
    };
    
    const handleFinish = () => {
        setIsFinished(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if (isFinished) {
        return (
            <PageLayout title="Your Top 5 Strengths">
                 <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Congratulations!</CardTitle>
                        <CardDescription>You've identified your top 5 character strengths. These are the qualities that are most natural and energizing for you.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Alert>
                            <Award className="h-4 w-4" />
                            <AlertTitle>What's Next?</AlertTitle>
                            <AlertDescription>
                                Try to find a new way to use one of your top strengths each day this week. Using your strengths can lead to greater happiness and well-being.
                            </AlertDescription>
                        </Alert>
                        <div className="space-y-3">
                            {selectedStrengths.map(strengthName => {
                                const strength = characterStrengths.find(s => s.name === strengthName);
                                if (!strength) return null;
                                return (
                                    <div key={strength.name} className="p-4 border rounded-md bg-background">
                                        <h3 className="font-semibold text-lg text-primary">{strength.name}</h3>
                                        <p className="text-sm text-muted-foreground">{strength.description}</p>
                                    </div>
                                );
                            })}
                        </div>
                        <Button onClick={() => setIsFinished(false)} variant="outline">Edit My Strengths</Button>
                    </CardContent>
                </Card>
            </PageLayout>
        )
    }

    return (
        <PageLayout title="Character Strengths">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Discover Your Strengths</CardTitle>
                    <CardDescription>Select up to 5 character strengths that you feel best represent you.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                        {characterStrengths.map((strength) => (
                            <div key={strength.name} className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                                 <Checkbox
                                    id={strength.name}
                                    checked={selectedStrengths.includes(strength.name)}
                                    onCheckedChange={() => handleSelect(strength.name)}
                                    disabled={!selectedStrengths.includes(strength.name) && selectedStrengths.length >= 5}
                                />
                                <div className="grid gap-1.5 leading-none">
                                    <label htmlFor={strength.name} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        {strength.name}
                                    </label>
                                    <p className="text-sm text-muted-foreground">
                                        {strength.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                     {selectedStrengths.length > 0 && (
                        <div className="sticky bottom-4 mt-4">
                             <Card className="w-fit mx-auto shadow-lg">
                                <CardContent className="p-4 flex items-center gap-4">
                                     <p className="text-sm font-medium">{selectedStrengths.length} of 5 selected.</p>
                                    <Button onClick={handleFinish} disabled={selectedStrengths.length === 0}>
                                        View My Top Strengths
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    )}
                </CardContent>
            </Card>
        </PageLayout>
    );
}
