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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cognitiveDistortions } from '@/lib/cbt-data';

const formSchema = z.object({
  situation: z.string().min(1, 'Please describe the situation.'),
  automaticThought: z.string().min(1, 'Please enter your automatic thought(s).'),
  emotions: z.string().min(1, 'Please describe your emotions.'),
  cognitiveDistortions: z.array(z.string()).min(1, 'Please select at least one cognitive distortion.'),
  alternativeThought: z.string().min(1, 'Please enter a more balanced or alternative thought.'),
});

type ThoughtRecordFormValues = z.infer<typeof formSchema>;

export function ThoughtRecordForm() {
  const form = useForm<ThoughtRecordFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      situation: '',
      automaticThought: '',
      emotions: '',
      cognitiveDistortions: [],
      alternativeThought: '',
    },
  });

  function onSubmit(data: ThoughtRecordFormValues) {
    console.log(data);
    // Here you would typically save the data to a database
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Thought Record</CardTitle>
        <CardDescription>
          Challenge and reframe your negative thoughts.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="situation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>1. Situation</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Where were you? What were you doing? Who were you with?" {...field} />
                  </FormControl>
                  <FormDescription>
                    Describe the situation that triggered the negative thought.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="automaticThought"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>2. Automatic Thought(s)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="What went through your mind? What did you think would happen?" {...field} />
                  </FormControl>
                  <FormDescription>
                    Write down the automatic thought(s) or image(s) that came to mind.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="emotions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>3. Emotions</FormLabel>
                  <FormControl>
                    <Textarea placeholder="What emotions did you feel? (e.g., sad, anxious, angry)" {...field} />
                  </FormControl>
                  <FormDescription>
                    List the emotions you felt and rate their intensity (0-100%).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
                control={form.control}
                name="cognitiveDistortions"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>4. Cognitive Distortions</FormLabel>
                    <Select onValueChange={(value) => field.onChange(field.value.includes(value) ? field.value.filter(v => v !== value) : [...field.value, value])} >
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select cognitive distortions" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        {cognitiveDistortions.map(distortion => (
                            <SelectItem key={distortion.name} value={distortion.name}>
                            {distortion.name}
                            </SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                    <div className="text-sm text-muted-foreground mt-2">
                        Selected: {field.value.join(', ')}
                    </div>
                    <FormDescription>
                        Identify any thinking errors in your automatic thought.
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
            />
             <FormField
                control={form.control}
                name="alternativeThought"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>5. Alternative Thought</FormLabel>
                    <FormControl>
                        <Textarea placeholder="What's another way of looking at this? What's a more balanced perspective?" {...field} />
                    </FormControl>
                    <FormDescription>
                        Write a more adaptive, balanced, or rational response to the situation.
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
             />
            <Button type="submit">Save Record</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
