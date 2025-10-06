
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useFirestore } from '@/firebase/provider';
import { addDoc, collection, serverTimestamp, doc, getDoc, setDoc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Loader } from 'lucide-react';
import { FirestorePermissionError } from '@/firebase/errors';
import { errorEmitter } from '@/firebase/error-emitter';
import { PageLayout } from '@/components/layout/page-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Slider } from '@/components/ui/slider';
import { isToday, isYesterday, format } from 'date-fns';
import type { UserStreak } from '@/lib/types';


const coreEmotions = [
    { name: 'Joy', emoji: '😊' },
    { name: 'Contentment', emoji: '😌' },
    { name: 'Surprise', emoji: '😮' },
    { name: 'Sadness', emoji: '😢' },
    { name: 'Anger', emoji: '😠' },
    { name: 'Fear', emoji: '😨' },
    { name: 'Disgust', emoji: '🤢' },
];

const formSchema = z.object({
  coreEmotion: z.string({ required_error: "Please select an emotion." }),
  intensity: z.number().min(0).max(100),
  situation: z.string().optional(),
  thoughts: z.string().optional(),
  physicalSensations: z.string().optional(),
});

type MoodLogFormValues = z.infer<typeof formSchema>;

export default function MoodLogPage() {
  const auth = useAuth();
  const [user] = useAuthState(auth);
  const firestore = useFirestore();
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<MoodLogFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      intensity: 50,
      situation: '',
      thoughts: '',
      physicalSensations: '',
    },
  });

    const handleStreak = async () => {
        if (!user || !firestore) return;

        const streakRef = doc(firestore, 'users', user.uid, 'streaks', 'moodCheckin');
        const streakDoc = await getDoc(streakRef);
        const today = format(new Date(), 'yyyy-MM-dd');
        
        let streakData: Omit<UserStreak, 'id'>;

        if (streakDoc.exists()) {
            const data = streakDoc.data() as Omit<UserStreak, 'id'>;
            const lastLogDate = new Date(data.lastLogDate);

            if (data.lastLogDate === today) {
                // Already logged today, do nothing
                return;
            }

            if (isYesterday(lastLogDate)) {
                // Continue streak
                const newStreak = data.currentStreak + 1;
                streakData = {
                    ...data,
                    currentStreak: newStreak,
                    longestStreak: Math.max(newStreak, data.longestStreak),
                    lastLogDate: today,
                };
            } else {
                // Reset streak
                streakData = { ...data, currentStreak: 1, lastLogDate: today };
            }
        } else {
            // First time logging
            streakData = {
                userId: user.uid,
                habitId: 'moodCheckin',
                currentStreak: 1,
                longestStreak: 1,
                lastLogDate: today,
            };
        }
        await setDoc(streakRef, streakData, { merge: true });
    };

  async function onSubmit(data: MoodLogFormValues) {
    if (!user) {
      toast({
        variant: 'destructive',
        title: 'Not signed in',
        description: 'You must be signed in to log your mood.',
      });
      return;
    }
    setIsSubmitting(true);
    const moodLogData = {
        ...data,
        userId: user.uid,
        timestamp: serverTimestamp(),
    };
    const moodLogCollection = collection(firestore, 'users', user.uid, 'moodLogs');

    addDoc(moodLogCollection, moodLogData).then(async () => {
        await handleStreak();
        toast({
            title: 'Mood Logged',
            description: 'Your mood has been successfully recorded.',
        });
        form.reset({ intensity: 50, situation: '', thoughts: '', physicalSensations: '' });
        router.push('/dashboard');
    }).catch(err => {
        const permissionError = new FirestorePermissionError({
            path: moodLogCollection.path,
            operation: 'create',
            requestResourceData: moodLogData,
        });
        errorEmitter.emit('permission-error', permissionError);
    }).finally(() => {
        setIsSubmitting(false);
    });
  }

  return (
    <PageLayout title="Mood Check-in">
        <Card>
            <CardHeader>
                <CardTitle>How are you feeling right now?</CardTitle>
                <CardDescription>Logging your mood helps you understand emotional patterns over time.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                     <FormField
                      control={form.control}
                      name="coreEmotion"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>1. Select the core emotion that fits best</FormLabel>
                          <FormControl>
                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-4">
                                {coreEmotions.map(emotion => (
                                    <button 
                                        type="button"
                                        key={emotion.name} 
                                        onClick={() => field.onChange(emotion.name)}
                                        className={cn(
                                            "flex flex-col items-center gap-2 p-4 border-2 rounded-lg transition-all",
                                            field.value === emotion.name ? "border-primary bg-primary/10" : "hover:bg-accent"
                                        )}
                                    >
                                        <span className="text-4xl">{emotion.emoji}</span>
                                        <span className="text-sm font-medium">{emotion.name}</span>
                                    </button>
                                ))}
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="intensity"
                      render={({ field: { value, onChange } }) => (
                        <FormItem>
                          <FormLabel>2. How intense is this feeling? ({value}%)</FormLabel>
                          <FormControl>
                            <Slider defaultValue={[value ?? 50]} onValueChange={(vals) => onChange(vals[0])} max={100} step={1} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid md:grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="situation"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>3. Situation (Optional)</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="What's happening right now?" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="thoughts"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>4. Thoughts (Optional)</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="What's going through your mind?" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="physicalSensations"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>5. Body Sensations (Optional)</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="e.g., tight chest, warm face" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    
                    <Button type="submit" disabled={isSubmitting} size="lg">
                      {isSubmitting && <Loader className="mr-2 h-4 w-4 animate-spin" />}
                      Log Mood
                    </Button>
                  </form>
                </Form>
            </CardContent>
        </Card>
    </PageLayout>
  );
}

    