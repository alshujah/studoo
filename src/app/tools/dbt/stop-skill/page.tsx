
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Hand, Eye, StepForward, PauseCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export const metadata: Metadata = {
  title: 'STOP Skill | Rejoyn',
};

const stopSteps = [
    {
        letter: 'S',
        title: 'Stop',
        icon: Hand,
        description: 'Freeze! Do not move a muscle. Your emotions may be trying to make you act without thinking. Stay in control.',
    },
    {
        letter: 'T',
        title: 'Take a Step Back',
        icon: StepForward,
        description: 'Take a step back from the situation. Take a deep breath. Do not let your feelings make you act impulsively.',
    },
    {
        letter: 'O',
        title: 'Observe',
        icon: Eye,
        description: 'Notice what is happening inside and outside you. What is the situation? What are your thoughts and feelings? What are others doing or saying?',
    },
    {
        letter: 'P',
        title: 'Proceed Mindfully',
        icon: PauseCircle,
        description: 'Act with awareness. In deciding what to do, consider your thoughts and feelings, the situation, and other people\'s thoughts and feelings. Think about your goals and what will make the situation better or worse.',
    }
]

export default function StopSkillPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">DBT Skill: The STOP Skill</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">The STOP Skill</CardTitle>
            <CardDescription>
              When you find yourself in a stressful situation and feel that your emotions are about to take over, use the STOP skill to avoid acting impulsively.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert className="mb-8">
                <PauseCircle className="h-4 w-4" />
                <AlertTitle>When to Use This Skill</AlertTitle>
                <AlertDescription>
                    Use this skill when your emotions are running high and you feel an urge to do something that might make things worse.
                </AlertDescription>
            </Alert>
            <Accordion type="single" collapsible className="w-full space-y-4">
                {stopSteps.map((step) => (
                     <AccordionItem value={step.title} key={step.title} className="border-b-0 rounded-lg border p-4 bg-muted/20">
                        <AccordionTrigger>
                            <div className='flex items-center gap-4'>
                                <step.icon className="size-6 text-primary" />
                                <div className='text-left'>
                                    <h3 className="font-semibold text-lg">{step.letter} - {step.title}</h3>
                                </div>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <p className="pt-4 prose prose-sm max-w-none text-foreground">{step.description}</p>
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
