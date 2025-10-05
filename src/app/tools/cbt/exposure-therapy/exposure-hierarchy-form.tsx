
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import React from 'react';
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
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { useAuth, useFirestore } from '@/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { Loader, PlusCircle, Trash2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Thermometer } from 'lucide-react';

const stepSchema = z.object({
  step: z.string().min(1, 'Step description cannot be empty.'),
  suds: z.number().min(0).max(100),
});

const formSchema = z.object({
  fear: z.string().min(3, 'Please describe your fear.'),
  steps: z.array(stepSchema).min(1, 'Please add at least one step.'),
});

type FormValues = z.infer<typeof formSchema>;

export function ExposureHierarchyForm() {
  const { toast } = useToast();
  const auth = useAuth();
  const [user] = useAuthState(auth);
  const firestore = useFirestore();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fear: '',
      steps: [{ step: '', suds: 10 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'steps',
  });

  const sortedFields = React.useMemo(() => {
    // Create a copy of the fields array with their original indices
    const fieldsWithIndices = fields.map((field, index) => ({ ...field, originalIndex: index }));
  
    // Sort the new array based on the watched SUDS value
    return fieldsWithIndices.sort((a, b) => {
      const sudsA = form.watch(`steps.${a.originalIndex}.suds`);
      const sudsB = form.watch(`steps.${b.originalIndex}.suds`);
      return sudsA - sudsB;
    });
  }, [fields, form.watch]);

  async function onSubmit(data: FormValues) {
    if (!user) return;
    setIsSubmitting(true);
    try {
      await addDoc(collection(firestore, 'users', user.uid, 'exposureHierarchies'), {
        userId: user.uid,
        fear: data.fear,
        steps: data.steps,
        createdAt: serverTimestamp(),
      });
      toast({ title: 'Hierarchy Saved', description: 'Your fear ladder has been saved. You can find it on your dashboard.' });
      form.reset();
    } catch (error) {
      console.error(error);
      toast({ variant: 'destructive', title: 'Error', description: 'Could not save your hierarchy.' });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Alert>
          <Thermometer className="h-4 w-4" />
          <AlertTitle>What are SUDS?</AlertTitle>
          <AlertDescription>
            SUDS stands for Subjective Units of Distress Scale. It's a rating from 0 (no anxiety) to 100 (the most anxiety you can imagine) to help you gauge the difficulty of each step.
          </AlertDescription>
        </Alert>

        <FormField
          control={form.control}
          name="fear"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">What fear or situation are you avoiding?</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Public speaking, driving on the highway, talking to strangers" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <h3 className="text-lg mb-4">Build Your Ladder</h3>
          <div className="space-y-4">
            {sortedFields.map((field) => {
              const sudsValue = form.watch(`steps.${field.originalIndex}.suds`);
               return (
                <div key={field.id} className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-4 p-4 border rounded-lg bg-muted/20">
                  <FormField
                    control={form.control}
                    name={`steps.${field.originalIndex}.step`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Step</FormLabel>
                        <FormControl>
                            <Input placeholder="A small step towards your fear" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`steps.${field.originalIndex}.suds`}
                    render={({ field: { onChange, value, ...restField } }) => (
                        <FormItem className="w-full md:w-48">
                            <FormLabel>SUDS ({sudsValue})</FormLabel>
                            <FormControl>
                                <Slider
                                    min={0} max={100} step={5}
                                    defaultValue={[sudsValue]}
                                    onValueChange={(val) => onChange(val[0])}
                                    {...restField}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                  />
                   <Button type="button" variant="ghost" size="icon" onClick={() => remove(field.originalIndex)} className="self-end">
                      <Trash2 className="text-destructive" />
                   </Button>
                </div>
              );
            })}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => append({ step: '', suds: 10 })}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Step
            </Button>
          </div>
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : null}
          Save Hierarchy
        </Button>
      </form>
    </Form>
  );
}
