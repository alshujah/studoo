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
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon, Check, Loader, Trash2, XIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format, add } from 'date-fns';
import { useAuth, useFirestore } from '@/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { addDoc, collection, serverTimestamp, query, where, orderBy, updateDoc, doc, Timestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { useState, useMemo } from 'react';
import type { WorryLog } from '@/lib/types';
import { useCollection } from 'react-firebase-hooks/firestore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { FirestorePermissionError } from '@/firebase/errors';
import { errorEmitter } from '@/firebase/error-emitter';

const formSchema = z.object({
  worry: z.string().min(5, { message: "Please describe your worry in a bit more detail." }),
  scheduledTime: z.date({ required_error: "Please select a date and time to worry." }),
});

type WorryFormValues = z.infer<typeof formSchema>;

export function WorryLogForm() {
  const { toast } = useToast();
  const auth = useAuth();
  const [user] = useAuthState(auth);
  const firestore = useFirestore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingWorry, setEditingWorry] = useState<WorryLog | null>(null);

  const worryLogsQuery = useMemo(() => {
    if (!user || !firestore) return null;
    return query(
      collection(firestore, 'users', user.uid, 'worryLogs'),
      orderBy('createdAt', 'desc')
    );
  }, [user, firestore]);

  const [worryLogsSnapshot, loading] = useCollection(worryLogsQuery);

  const form = useForm<WorryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      worry: '',
      scheduledTime: add(new Date(), { hours: 1 }),
    },
  });

  async function onSubmit(data: WorryFormValues) {
    if (!user || !firestore) return;
    setIsSubmitting(true);
    const logData = {
        userId: user.uid,
        worry: data.worry,
        scheduledTime: Timestamp.fromDate(data.scheduledTime),
        createdAt: serverTimestamp(),
    };
    const logCollection = collection(firestore, 'users', user.uid, 'worryLogs');

    addDoc(logCollection, logData).then(() => {
      toast({ title: 'Worry Logged', description: 'Your worry has been scheduled. Try to let it go until then.' });
      form.reset();
    }).catch(err => {
        const permissionError = new FirestorePermissionError({
            path: logCollection.path,
            operation: 'create',
            requestResourceData: logData,
        });
        errorEmitter.emit('permission-error', permissionError);
    }).finally(() => {
      setIsSubmitting(false);
    });
  }

  async function handleOutcomeUpdate(worryId: string, didComeTrue: boolean, outcome: string) {
    if (!user || !firestore) return;
    const docRef = doc(firestore, 'users', user.uid, 'worryLogs', worryId);
    const updateData = { didComeTrue, outcome };

    updateDoc(docRef, updateData).then(() => {
        toast({ title: 'Outcome Saved', description: 'Your reflection has been saved.' });
        setEditingWorry(null);
    }).catch(err => {
        const permissionError = new FirestorePermissionError({
            path: docRef.path,
            operation: 'update',
            requestResourceData: updateData,
        });
        errorEmitter.emit('permission-error', permissionError);
    });
}

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="worry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What are you worrying about right now?</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., I'm worried I will fail my upcoming exam." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="scheduledTime"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>When do you want to worry about this?</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP p")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Schedule a time to come back to this worry.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader className="mr-2 h-4 w-4 animate-spin" />}
                Log Worry
            </Button>
          </form>
        </Form>
      </div>

      <div>
        <Card>
          <CardHeader>
            <CardTitle>Your Worry Log</CardTitle>
            <CardDescription>Review your past worries and their outcomes.</CardDescription>
          </CardHeader>
          <CardContent>
            {loading && <Loader className="animate-spin"/>}
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
            {worryLogsSnapshot?.docs.map(doc => {
                const worry = { id: doc.id, ...doc.data() } as WorryLog;
                const isPast = worry.scheduledTime.toDate() < new Date();
                
                if (editingWorry?.id === worry.id) {
                    return <WorryOutcomeEditor key={worry.id} worry={worry} onSave={handleOutcomeUpdate} onCancel={() => setEditingWorry(null)} />
                }

                return (
                    <div key={worry.id} className="p-4 border rounded-md">
                        <p className="font-medium">{worry.worry}</p>
                        <p className="text-xs text-muted-foreground">Worry about on: {format(worry.scheduledTime.toDate(), 'MMM d, yyyy @ p')}</p>
                        {isPast && worry.didComeTrue === undefined && (
                            <Button size="sm" variant="outline" className="mt-2" onClick={() => setEditingWorry(worry)}>
                                Reflect on Outcome
                            </Button>
                        )}
                        {worry.didComeTrue !== undefined && (
                             <div className="mt-2 text-sm p-3 bg-muted/50 rounded-md">
                                <p className="flex items-center gap-2 font-semibold">
                                    {worry.didComeTrue ? <Check className="text-green-500"/> : <XIcon className="text-destructive"/>}
                                    Did it come true? {worry.didComeTrue ? 'Yes' : 'No'}
                                </p>
                                <p className="mt-1 text-muted-foreground"><span className="font-semibold text-foreground">Outcome:</span> {worry.outcome}</p>
                            </div>
                        )}
                    </div>
                );
            })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


function WorryOutcomeEditor({ worry, onSave, onCancel }: { worry: WorryLog, onSave: (worryId: string, didComeTrue: boolean, outcome: string) => void, onCancel: () => void }) {
    const [didComeTrue, setDidComeTrue] = useState<boolean | undefined>(undefined);
    const [outcome, setOutcome] = useState('');

    return (
        <div className="p-4 border rounded-md bg-secondary/50">
            <p className="font-medium">{worry.worry}</p>
            <div className="space-y-4 mt-4">
                <div>
                    <Label>Did your worry come true?</Label>
                    <RadioGroup onValueChange={(val) => setDidComeTrue(val === 'true')} className="flex gap-4 mt-2">
                        <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                                <RadioGroupItem value="true" />
                            </FormControl>
                            <FormLabel className="font-normal">Yes</FormLabel>
                        </FormItem>
                         <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                                <RadioGroupItem value="false" />
                            </FormControl>
                            <FormLabel className="font-normal">No</FormLabel>
                        </FormItem>
                    </RadioGroup>
                </div>
                <div>
                     <Label>What was the actual outcome?</Label>
                     <Textarea value={outcome} onChange={(e) => setOutcome(e.target.value)} placeholder="Describe what actually happened." className="mt-2"/>
                </div>
                <div className="flex gap-2 justify-end">
                    <Button variant="ghost" onClick={onCancel}>Cancel</Button>
                    <Button onClick={() => onSave(worry.id, didComeTrue!, outcome)} disabled={didComeTrue === undefined || !outcome}>Save Outcome</Button>
                </div>
            </div>
        </div>
    )
}
