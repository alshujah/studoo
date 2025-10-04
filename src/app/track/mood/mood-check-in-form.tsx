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
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const coreEmotions = ["Joy", "Sadness", "Fear", "Anger", "Surprise", "Disgust", "Contentment"];

const formSchema = z.object({
  situation: z.string().min(1, 'Please describe the situation.'),
  coreEmotion: z.string({ required_error: 'Please select a primary emotion.' }),
  intensity: z.number().min(0).max(100).default(50),
  thoughts: z.string().min(1, 'Please describe your thoughts.'),
  physicalSensations: z.string().min(1, 'Please describe any physical sensations.'),
});

type MoodFormValues = z.infer<typeof formSchema>;

export function MoodCheckInForm() {
  const form = useForm<MoodFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      situation: '',
      intensity: 50,
      thoughts: '',
      physicalSensations: '',
    },
  });

  function onSubmit(data: MoodFormValues) {
    console.log(data);
    // Here you would typically save the data to a database
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">How are you feeling right now?</CardTitle>
        <CardDescription>
          Take a moment to check in with yourself. Logging your mood helps you understand your emotional patterns.
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
                  <FormLabel>1. The Situation</FormLabel>
                  <FormControl>
                    <Textarea placeholder="What is happening or what just happened? Where are you? Who are you with?" {...field} />
                  </FormControl>
                  <FormDescription>
                    Briefly describe the context of your current feeling.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="coreEmotion"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>2. Primary Emotion</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-wrap gap-4"
                    >
                      {coreEmotions.map(emotion => (
                        <FormItem key={emotion} className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value={emotion} />
                          </FormControl>
                          <FormLabel className="font-normal">{emotion}</FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                   <FormDescription>
                    Select the main emotion you are feeling.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="intensity"
              render={({ field: { value, onChange } }) => (
                <FormItem>
                  <FormLabel>3. Intensity ({value}%)</FormLabel>
                  <FormControl>
                    <Slider
                      min={0}
                      max={100}
                      step={1}
                      defaultValue={[value]}
                      onValueChange={(vals) => onChange(vals[0])}
                    />
                  </FormControl>
                  <FormDescription>
                    Rate the intensity of this emotion from 0 (very mild) to 100 (very intense).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="thoughts"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>4. Thoughts</FormLabel>
                  <FormControl>
                    <Textarea placeholder="What is going through your mind?" {...field} />
                  </FormControl>
                  <FormDescription>
                    What are you saying to yourself? What images are in your head?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="physicalSensations"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>5. Physical Sensations</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., tightness in chest, butterflies in stomach, relaxed muscles" {...field} />
                  </FormControl>
                  <FormDescription>
                    What do you feel in your body right now?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit">Save Check-in</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
