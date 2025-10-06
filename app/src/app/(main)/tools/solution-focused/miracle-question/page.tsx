
'use client';

import { useState } from 'react';
import { PageLayout } from '@/components/layout/page-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Lightbulb, Loader } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { MiracleQuestionChat } from './miracle-question-chat';
import { miracleQuestionAction } from '@/services/actions';
import { useToast } from '@/hooks/use-toast';

export type MiracleQuestionMessage = {
    role: 'user' | 'assistant';
    content: string;
};

export default function MiracleQuestionPage() {
    const [problem, setProblem] = useState('');
    const [messages, setMessages] = useState<MiracleQuestionMessage[]>([]);
    const [isComplete, setIsComplete] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const handleStart = async () => {
        if (!problem.trim()) {
            toast({ variant: 'destructive', title: 'Please describe your problem' });
            return;
        }
        setIsLoading(true);
        const userMessage: MiracleQuestionMessage = { role: 'user', content: problem };
        const result = await miracleQuestionAction({ userInput: problem, history: [] });
        
        if (result.success && result.data) {
            setMessages([userMessage, { role: 'assistant', content: result.data.response }]);
        } else {
            toast({ variant: 'destructive', title: 'Error', description: result.error });
        }
        setIsLoading(false);
    };

    const handleContinue = async (response: string) => {
         if (!response.trim()) {
            toast({ variant: 'destructive', title: 'Please enter a response' });
            return;
        }
        setIsLoading(true);
        const newMessages: MiracleQuestionMessage[] = [...messages, { role: 'user', content: response }];
        setMessages(newMessages);

        const result = await miracleQuestionAction({ userInput: response, history: newMessages });

        if (result.success && result.data) {
             setMessages(prev => [...prev, { role: 'assistant', content: result.data.response }]);
            if (result.data.isComplete) {
                setIsComplete(true);
            }
        } else {
            toast({ variant: 'destructive', title: 'Error', description: result.error });
        }
        setIsLoading(false);
    }

    const handleReset = () => {
        setProblem('');
        setMessages([]);
        setIsComplete(false);
    };

    return (
        <PageLayout title="The Miracle Question">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Imagine a Solution</CardTitle>
                    <CardDescription>This is a Solution-Focused Therapy exercise to help you think about a problem differently by imagining a future where it's already solved.</CardDescription>
                </CardHeader>
                <CardContent>
                    {messages.length === 0 ? (
                        <div className="space-y-4">
                            <Alert>
                                <Lightbulb className="h-4 w-4" />
                                <AlertTitle>How It Works</AlertTitle>
                                <AlertDescription>
                                    First, briefly describe a problem that's been bothering you. Then, the AI Coach will guide you through the rest of the exercise.
                                </AlertDescription>
                            </Alert>
                             <div>
                                <label htmlFor="problem-input" className="block text-sm font-medium text-foreground mb-2">
                                    Describe the problem you're facing:
                                </label>
                                <Textarea
                                    id="problem-input"
                                    value={problem}
                                    onChange={(e) => setProblem(e.target.value)}
                                    placeholder="e.g., I'm procrastinating on a big project for work."
                                    disabled={isLoading}
                                />
                            </div>
                            <Button onClick={handleStart} disabled={isLoading || !problem.trim()}>
                                {isLoading ? <Loader className="mr-2 animate-spin" /> : null}
                                Start Exercise
                            </Button>
                        </div>
                    ) : (
                        <MiracleQuestionChat
                            messages={messages}
                            onContinue={handleContinue}
                            onReset={handleReset}
                            isComplete={isComplete}
                            isLoading={isLoading}
                        />
                    )}
                </CardContent>
            </Card>
        </PageLayout>
    );
}
