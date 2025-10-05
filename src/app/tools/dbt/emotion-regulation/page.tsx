
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { emotionRegulationSkills } from '@/lib/dbt-emotion-regulation-data';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Lightbulb } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Emotion Regulation Skills | Rejoyn',
};

export default function EmotionRegulationPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">DBT: Emotion Regulation Skills</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Your Emotion Regulation Toolkit</CardTitle>
            <CardDescription>
              These skills help you understand and manage your emotions. Use them when your emotions are intense but not at a crisis level. The goal is to change unwanted emotions by acting opposite to their urges.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert className="mb-8">
                <Lightbulb className="h-4 w-4" />
                <AlertTitle>When to Use These Skills</AlertTitle>
                <AlertDescription>
                    Use these skills when you want to change an emotion that doesn't fit the facts of a situation, or when acting on the emotion's urge isn't effective.
                </AlertDescription>
            </Alert>
            <Accordion type="multiple" className="w-full space-y-4">
                {emotionRegulationSkills.map((skill) => (
                    <AccordionItem value={skill.title} key={skill.title} className="border-b-0 rounded-lg border p-4 bg-muted/20">
                        <AccordionTrigger className="py-2 text-left hover:no-underline">
                           <div className='flex items-center gap-4'>
                                <skill.icon className="size-6 text-primary" />
                                <div className='text-left'>
                                    <h3 className="font-semibold text-lg">{skill.title}</h3>
                                    <p className="text-sm text-muted-foreground">{skill.description}</p>
                                </div>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="pt-4 prose prose-sm max-w-none text-foreground">
                            {skill.pretext && <p>{skill.pretext}</p>}
                            <ul>
                                {skill.steps.map((step, index) => (
                                   <li key={index}><strong>{step.name}:</strong> {step.detail}</li>
                                ))}
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
