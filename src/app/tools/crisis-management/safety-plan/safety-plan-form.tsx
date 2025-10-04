'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFieldArray } from 'react-hook-form';
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
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { AlertTriangle, PlusCircle, Trash2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const formSchema = z.object({
  warningSigns: z.string().min(1, 'Please list at least one warning sign.'),
  internalCoping: z.string().min(1, 'Please list at least one coping strategy.'),
  socialDistractions: z.array(z.object({ name: z.string(), place: z.string() })).optional(),
  familySupport: z.array(z.object({ name: z.string(), phone: z.string() })).optional(),
  professionalSupport: z.array(z.object({ name: z.string(), phone: z.string(), clinic: z.string() })).optional(),
  environmentSafety: z.string().optional(),
});

type SafetyPlanFormValues = z.infer<typeof formSchema>;

export function SafetyPlanForm() {
  const form = useForm<SafetyPlanFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      warningSigns: '',
      internalCoping: '',
      socialDistractions: [{ name: '', place: '' }],
      familySupport: [{ name: '', phone: '' }],
      professionalSupport: [{ name: '', phone: '', clinic: '' }],
      environmentSafety: '',
    },
  });

  const { fields: socialFields, append: appendSocial, remove: removeSocial } = useFieldArray({
    control: form.control,
    name: 'socialDistractions',
  });
  const { fields: familyFields, append: appendFamily, remove: removeFamily } = useFieldArray({
    control: form.control,
    name: 'familySupport',
  });
  const { fields: profFields, append: appendProf, remove: removeProf } = useFieldArray({
    control: form.control,
    name: 'professionalSupport',
  });

  // NOTE: This is a demo form. In a real app, we would use Firebase to persist this data.
  function onSubmit(data: SafetyPlanFormValues) {
    console.log(data);
    alert('Safety Plan Saved (See console for data). In a real app, this would be saved securely.');
  }

  return (
    <>
      <Alert variant="destructive" className="mb-8">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>If you are in immediate danger, please call 911 or your local emergency number.</AlertTitle>
        <AlertDescription>
          This tool is for planning and does not replace emergency services.
        </AlertDescription>
      </Alert>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Accordion type="multiple" defaultValue={['item-1']} className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-xl font-headline">Step 1: Warning Signs</AccordionTrigger>
            <AccordionContent>
              <FormField
                control={form.control}
                name="warningSigns"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What thoughts, images, moods, situations, or behaviors indicate to you that a crisis may be developing?</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Feeling hopeless, withdrawing from friends, not sleeping..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-xl font-headline">Step 2: Internal Coping Strategies</AccordionTrigger>
            <AccordionContent>
              <FormField
                control={form.control}
                name="internalCoping"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What are some things you can do on your own to not act on your thoughts?</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Go for a walk, listen to music, practice deep breathing, splash cold water on my face..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </AccordionContent>
          </AccordionItem>
           <AccordionItem value="item-3">
            <AccordionTrigger className="text-xl font-headline">Step 3: People & Places for Distraction</AccordionTrigger>
            <AccordionContent className="space-y-4">
                 {socialFields.map((field, index) => (
                    <div key={field.id} className="flex gap-4 items-end">
                        <FormField control={form.control} name={`socialDistractions.${index}.name`} render={({ field }) => (<FormItem className="flex-1"><FormLabel>Person</FormLabel><FormControl><Input placeholder="Friend's Name" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name={`socialDistractions.${index}.place`} render={({ field }) => (<FormItem className="flex-1"><FormLabel>Place</FormLabel><FormControl><Input placeholder="e.g., Coffee shop" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <Button type="button" variant="ghost" size="icon" onClick={() => removeSocial(index)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                    </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => appendSocial({ name: '', place: '' })}><PlusCircle className="mr-2 h-4 w-4" /> Add Person/Place</Button>
            </AccordionContent>
          </AccordionItem>

           <AccordionItem value="item-4">
            <AccordionTrigger className="text-xl font-headline">Step 4: People I Can Ask for Help</AccordionTrigger>
            <AccordionContent className="space-y-4">
                 {familyFields.map((field, index) => (
                    <div key={field.id} className="flex gap-4 items-end">
                        <FormField control={form.control} name={`familySupport.${index}.name`} render={({ field }) => (<FormItem className="flex-1"><FormLabel>Name</FormLabel><FormControl><Input placeholder="Family or friend's name" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name={`familySupport.${index}.phone`} render={({ field }) => (<FormItem className="flex-1"><FormLabel>Phone Number</FormLabel><FormControl><Input placeholder="555-555-5555" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <Button type="button" variant="ghost" size="icon" onClick={() => removeFamily(index)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                    </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => appendFamily({ name: '', phone: '' })}><PlusCircle className="mr-2 h-4 w-4" /> Add Person</Button>
            </AccordionContent>
          </AccordionItem>

           <AccordionItem value="item-5">
            <AccordionTrigger className="text-xl font-headline">Step 5: Professionals I Can Contact</AccordionTrigger>
            <AccordionContent className="space-y-4">
                 {profFields.map((field, index) => (
                    <div key={field.id} className="flex gap-4 items-end">
                        <FormField control={form.control} name={`professionalSupport.${index}.name`} render={({ field }) => (<FormItem className="flex-1"><FormLabel>Name / Service</FormLabel><FormControl><Input placeholder="Therapist, Clinic, Hotline" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name={`professionalSupport.${index}.phone`} render={({ field }) => (<FormItem className="flex-1"><FormLabel>Phone Number</FormLabel><FormControl><Input placeholder="555-555-5555 or 988" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <Button type="button" variant="ghost" size="icon" onClick={() => removeProf(index)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                    </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => appendProf({ name: '988 Suicide & Crisis Lifeline', phone: '988', clinic: '' })}><PlusCircle className="mr-2 h-4 w-4" /> Add Professional</Button>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6">
            <AccordionTrigger className="text-xl font-headline">Step 6: Making the Environment Safe</AccordionTrigger>
            <AccordionContent>
              <FormField
                control={form.control}
                name="environmentSafety"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>How can you make your environment safer?</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Remove or lock up any means of self-harm." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Button type="submit" size="lg">Save My Safety Plan</Button>
      </form>
    </Form>
    </>
  );
}
