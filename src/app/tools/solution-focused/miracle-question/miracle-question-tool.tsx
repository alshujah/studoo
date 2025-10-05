'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useAuth, useFirestore } from '@/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { Loader, Save } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Wand2 } from 'lucide-react';

export function MiracleQuestionTool() {
  const [answer, setAnswer] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const auth = useAuth();
  const [user] = useAuthState(auth);
  const firestore = useFirestore();
  const { toast } = useToast();

  const handleSave = async () => {
    if (!user) {
      toast({
        variant: 'destructive',
        title: 'Not signed in',
        description: 'You must be signed in to save your answer.',
      });
      return;
    }
    if (!answer.trim()) {
        toast({
            variant: 'destructive',
            title: 'Empty Answer',
            description: 'Please write your response before saving.',
        });
        return;
    }

    setIsSubmitting(true);
    try {
      await addDoc(collection(firestore, 'users', user.uid, 'sfbtMiracleQuestions'), {
        userId: user.uid,
        answer: answer,
        timestamp: serverTimestamp(),
      });
      toast({
        title: 'Response Saved',
        description: 'Your response to the Miracle Question has been saved.',
      });
    } catch (error) {
      console.error('Error saving miracle question response:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'There was an error saving your response.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
        <Alert>
            <Wand2 className="h-4 w-4" />
            <AlertTitle className="font-headline">The Miracle Question</AlertTitle>
            <AlertDescription className="prose prose-sm max-w-none">
                <p>Suppose that tonight, while you are sleeping, a miracle happens. The miracle is that the problem which brought you here is solved. However, because you are sleeping, you don’t know that the miracle has happened.</p>
                <p className="font-semibold">When you wake up tomorrow morning, what will be different that will tell you a miracle has happened and your problem is solved?</p>
            </AlertDescription>
        </Alert>

      <Textarea
        placeholder="Describe what you would notice. What would be the first small sign? What would you be doing differently? What would others notice about you?"
        className="min-h-60"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        disabled={isSubmitting}
      />

      <Button onClick={handleSave} disabled={isSubmitting || !answer.trim()}>
        {isSubmitting ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
        Save My Response
      </Button>
    </div>
  );
}
