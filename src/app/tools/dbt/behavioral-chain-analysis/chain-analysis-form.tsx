
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useAuth, useFirestore } from '@/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { Loader, Save } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Link2 } from 'lucide-react';

const formSchema = z.object({
  problemBehavior: z.string().min(1, 'Please define the problem behavior.'),
  promptingEvent: z.string().min(1, 'What happened right before the urge?'),
  vulnerabilityFactors: z.string().min(1, 'What was going on that made you vulnerable?'),
  chainOfEvents: z.string().min(1, 'Describe the chain of events link by link.'),
  consequences: z.string().min(1, 'What were the consequences in yourself and the environment?'),
  solutions: z.string().min(1, 'What could you have done differently at each point?'),
});

type FormValues = z.infer<typeof formSchema>;

export function ChainAnalysisForm() {
  const auth = useAuth();
  const [user] = useAuthState(auth);
  const firestore = useFirestore();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      problemBehavior: '',
      promptingEvent: '',
      vulnerabilityFactors: '',
      chainOfEvents: '',
      consequences: '',
      solutions: '',
    },
  });

  async function onSubmit(data: FormValues) {
    if (!user) {
      toast({ variant: 'destructive', title: 'Not signed in' });
      return;
    }
    setIsSubmitting(true);
    try {
      await addDoc(collection(firestore, 'users', user.uid, 'behavioralChainAnalyses'), {
        ...data,
        userId: user.uid,
        createdAt: serverTimestamp(),
      });
      toast({ title: 'Analysis Saved', description: 'Your behavioral chain analysis has been saved.' });
      form.reset();
    } catch (error) {
      console.error('Error saving chain analysis:', error);
      toast({ variant: 'destructive', title: 'Error', description: 'Could not save your analysis.' });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Alert>
          <Link2 className="h-4 w-4" />
          <AlertTitle>Finding the Links</AlertTitle>
          <AlertDescription>
            The goal is to slow down and see all the small steps that led from a prompting event to a problem behavior. By seeing the links, you can find places to intervene.
          </AlertDescription>
        </Alert>

        <FormField
          control={form.control}
          name="problemBehavior"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">1. Problem Behavior</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe the specific behavior you want to change. Be very specific. (e.g., 'I yelled at my partner.')" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="promptingEvent"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">2. Prompting Event</FormLabel>
              <FormControl>
                <Textarea placeholder="What event in the environment triggered the behavior? What happened right before the urge came?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="vulnerabilityFactors"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">3. Vulnerability Factors</FormLabel>
              <FormControl>
                <Textarea placeholder="What was happening in your life before the prompting event that made you more vulnerable? (e.g., poor sleep, illness, stress, hunger)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="chainOfEvents"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">4. The Chain of Events</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe the chain of events, link by link. What was the first thought? The first sensation? The first action? What was next?" {...field} className="min-h-48" />
              </FormControl>
              <FormDescription>
                Be a detective. Detail every single thought, feeling, and action that linked the prompting event to the problem behavior.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="consequences"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">5. Consequences</FormLabel>
              <FormControl>
                <Textarea placeholder="What happened as a result of the behavior? Both in the environment (e.g., 'My partner left the room') and within you (e.g., 'I felt guilty')." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="solutions"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">6. Solutions & Prevention</FormLabel>
              <FormControl>
                <Textarea placeholder="How could you have prevented the problem behavior? What coping skills could you have used? How can you reduce your vulnerability in the future?" {...field} className="min-h-48" />
              </FormControl>
               <FormDescription>
                Brainstorm how to do things differently next time. This is where change happens.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting} size="lg">
          {isSubmitting ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          Save Analysis
        </Button>
      </form>
    </Form>
  );
}
