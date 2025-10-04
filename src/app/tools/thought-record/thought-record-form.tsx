'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import React, { useState, useTransition } from 'react';
import { Bot, Loader, Sparkles } from 'lucide-react';
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
import { getAiAnalysis } from './actions';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const formSchema = z.object({
  situation: z.string().min(1, 'Please describe the situation.'),
  automaticThought: z.string().min(1, 'Please enter your automatic thought(s).'),
  emotions: z.string().min(1, 'Please describe your emotions.'),
  cognitiveDistortions: z.array(z.string()).min(1, 'Please select at least one cognitive distortion.'),
});

type ThoughtRecordFormValues = z.infer<typeof formSchema>;

type AiFeedback = {
    analysis: string;
    alternativeThought: string;
}

export function ThoughtRecordForm() {
  const [isPending, startTransition] = useTransition();
  const [aiFeedback, setAiFeedback] = useState<AiFeedback | null>(null);
  const { toast } = useToast();

  const form = useForm<ThoughtRecordFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      situation: '',
      automaticThought: '',
      emotions: '',
      cognitiveDistortions: [],
    },
  });

  function onSubmit(data: ThoughtRecordFormValues) {
    setAiFeedback(null);
    startTransition(async () => {
        const result = await getAiAnalysis({
            situation: data.situation,
            automaticThought: data.automaticThought,
            cognitiveDistortions: data.cognitiveDistortions,
        });
        if (result.success && result.data) {
            setAiFeedback(result.data);
        } else {
            toast({
                variant: "destructive",
                title: "Error",
                description: result.error || "An unknown error occurred.",
            });
        }
    });
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
                            <SelectValue placeholder="Select all that apply" />
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
                     <div className="flex flex-wrap gap-2 pt-2">
                        {field.value.map(val => (
                            <Badge key={val} variant="secondary">{val}</Badge>
                        ))}
                    </div>
                    <FormDescription>
                        Identify any thinking errors in your automatic thought. Click to add or remove.
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
            />
             
            <Button type="submit" disabled={isPending}>
                {isPending ? <Loader className="mr-2 animate-spin" /> : <Sparkles className="mr-2" />}
                Analyze My Thought
            </Button>
          </form>
        </Form>

        {isPending && (
             <div className="mt-8 flex items-start gap-4 rounded-lg border bg-muted/50 p-4">
                <Avatar className="h-9 w-9 border">
                    <AvatarFallback><Bot size={20}/></AvatarFallback>
                </Avatar>
                <div className="flex items-center pt-2">
                    <Loader className="animate-spin size-5 text-muted-foreground" />
                </div>
            </div>
        )}

        {aiFeedback && (
            <div className="mt-8 space-y-6">
                <Alert>
                     <Bot className="size-5" />
                    <AlertTitle className="font-headline">AI Feedback</AlertTitle>
                    <AlertDescription>
                        Here's a gentle analysis of your thought and a more balanced perspective.
                    </AlertDescription>
                </Alert>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-foreground/80">{aiFeedback.analysis}</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Alternative Thought</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm font-medium text-primary">{aiFeedback.alternativeThought}</p>
                    </CardContent>
                </Card>
                 <Button variant="outline" onClick={() => form.setValue('automaticThought', aiFeedback.alternativeThought)}>
                    Use this thought
                </Button>
            </div>
        )}
      </CardContent>
    </Card>
  );
}
