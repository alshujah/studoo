
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useAuth, useFirestore } from '@/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Loader } from 'lucide-react';
import { FirestorePermissionError } from '@/firebase/errors';
import { errorEmitter } from '@/firebase/error-emitter';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  situation: z.string().min(10, "Briefly describe the situation you need to address."),
  describe: z.string().min(10, "Describe the facts of the situation clearly and concisely."),
  express: z.string().min(10, "Express your feelings using 'I' statements."),
  assert: z.string().min(10, "Assert yourself by clearly stating what you want or saying no."),
  reinforce: z.string().min(10, "Reinforce the positive outcomes of getting what you want."),
  mindful: z.string().min(5, "How will you stay mindful and focused on your goal?"),
  appearConfident: z.string().min(5, "How will you appear confident? (e.g., posture, tone)"),
  negotiate: z.string().min(5, "What are you willing to negotiate?"),
});

type FormValues = z.infer<typeof formSchema>;

export function DearManForm() {
  const firestore = useFirestore();
  const auth = useAuth();
  const [user] = useAuthState(auth);
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        situation: '',
        describe: '',
        express: '',
        assert: '',
        reinforce: '',
        mindful: 'Stay focused on my goal, ignore distractions.',
        appearConfident: 'Use a calm tone, make eye contact.',
        negotiate: 'I am willing to listen to their perspective.',
    },
  });

  async function onSubmit(data: FormValues) {
    if (!user) {
      toast({ variant: 'destructive', title: 'Not signed in' });
      return;
    }
    setIsSubmitting(true);
    const scriptData = {
        ...data,
        userId: user.uid,
        createdAt: serverTimestamp(),
    };
    const scriptCollection = collection(firestore, 'users', user.uid, 'dearManScripts');

    addDoc(scriptCollection, scriptData).then(() => {
      toast({ title: 'Script Saved', description: 'Your DEAR MAN script has been saved.' });
      router.push('/dashboard');
    }).catch(err => {
        const permissionError = new FirestorePermissionError({
            path: scriptCollection.path,
            operation: 'create',
            requestResourceData: scriptData,
        });
        errorEmitter.emit('permission-error', permissionError);
    }).finally(() => {
        setIsSubmitting(false);
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
         <FormField
          control={form.control}
          name="situation"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">Overall Situation</FormLabel>
              <FormDescription>Briefly, what is the conversation about?</FormDescription>
              <FormControl>
                <Input placeholder="e.g., Asking my boss for a raise." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="describe"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">D - Describe</FormLabel>
              <FormDescription>Stick to the facts. What is the specific situation you want to address?</FormDescription>
              <FormControl>
                <Textarea placeholder="e.g., 'Over the last 6 months, I have taken on the responsibilities of the senior developer role, including mentoring junior developers and leading the new project.'" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="express"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">E - Express</FormLabel>
              <FormDescription>State your feelings using "I" statements. Don't assume the other person knows how you feel.</FormDescription>
              <FormControl>
                <Textarea placeholder="e.g., 'I feel proud of the work I've done, and I believe my contribution has been valuable.'" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="assert"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">A - Assert</FormLabel>
              <FormDescription>Clearly state what you want or need, or say no to a request.</FormDescription>
              <FormControl>
                <Textarea placeholder="e.g., 'I would like to request a salary adjustment to reflect these new responsibilities.'" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="reinforce"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">R - Reinforce</FormLabel>
              <FormDescription>Explain the positive outcomes of your request being met.</FormDescription>
              <FormControl>
                <Textarea placeholder="e.g., 'This would make me feel very valued and motivated to continue taking on more leadership in the team.'" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <h3 className="font-headline text-xl border-t pt-8">MAN - Stay in control</h3>

        <FormField
          control={form.control}
          name="mindful"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">M - Mindful</FormLabel>
              <FormDescription>How will you stay focused on your goal and avoid getting sidetracked?</FormDescription>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="appearConfident"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">A - Appear Confident</FormLabel>
              <FormDescription>Describe the posture, tone, and body language you will use.</FormDescription>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="negotiate"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">N - Negotiate</FormLabel>
              <FormDescription>What are you willing to give to get? Be open to alternative solutions.</FormDescription>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" disabled={isSubmitting} size="lg">
          {isSubmitting && <Loader className="mr-2 h-4 w-4 animate-spin" />}
          Save Script
        </Button>
      </form>
    </Form>
  );
}
