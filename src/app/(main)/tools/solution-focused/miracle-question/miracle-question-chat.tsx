
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Loader, Send, Sparkles, Brain, Repeat } from 'lucide-react';
import type { MiracleQuestionMessage } from './page';

interface MiracleQuestionChatProps {
    messages: MiracleQuestionMessage[];
    onContinue: (response: string) => void;
    onReset: () => void;
    isComplete: boolean;
    isLoading: boolean;
}

export function MiracleQuestionChat({ messages, onContinue, onReset, isComplete, isLoading }: MiracleQuestionChatProps) {
    const [response, setResponse] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onContinue(response);
        setResponse('');
    };

    return (
        <div className="space-y-6">
            <div className="space-y-4">
                {messages.map((message, index) => (
                    <div key={index} className={`flex items-start gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}>
                        {message.role === 'assistant' && <div className="p-2 bg-primary/10 rounded-full"><Sparkles className="size-5 text-primary" /></div>}
                        <div className={`max-w-xl rounded-lg p-4 text-sm ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                            <p className="whitespace-pre-wrap">{message.content}</p>
                        </div>
                        {message.role === 'user' && <div className="p-2 bg-muted rounded-full"><Brain className="size-5 text-muted-foreground" /></div>}
                    </div>
                ))}
                {isLoading && (
                     <div className="flex items-start gap-3">
                         <div className="p-2 bg-primary/10 rounded-full"><Loader className="size-5 text-primary animate-spin" /></div>
                        <div className="max-w-xl rounded-lg p-4 bg-muted">
                           <p className="text-sm text-muted-foreground">Thinking...</p>
                        </div>
                    </div>
                )}
            </div>
            
            {!isComplete ? (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <Textarea
                        value={response}
                        onChange={(e) => setResponse(e.target.value)}
                        placeholder="Type your response..."
                        disabled={isLoading}
                    />
                    <Button type="submit" disabled={isLoading || !response.trim()} className="self-start">
                        <Send className="mr-2" />
                        Send
                    </Button>
                </form>
            ) : (
                <Button onClick={onReset} variant="outline">
                    <Repeat className="mr-2" />
                    Start a New Exercise
                </Button>
            )}
        </div>
    );
}
