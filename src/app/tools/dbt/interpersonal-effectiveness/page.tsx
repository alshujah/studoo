
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { interpersonalEffectivenessSkills } from '@/lib/dbt-interpersonal-effectiveness-data';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Interpersonal Effectiveness Skills | Rejoyn',
};

export default function InterpersonalEffectivenessPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">DBT: Interpersonal Effectiveness</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Your Interpersonal Effectiveness Toolkit</CardTitle>
            <CardDescription>
              These skills help you navigate relationships, get your needs met, and maintain your self-respect. They help you balance your own needs with the needs of others.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert className="mb-8">
                <Users className="h-4 w-4" />
                <AlertTitle>The Goals of Interpersonal Effectiveness</AlertTitle>
                <AlertDescription>
                    These skills are used to achieve three main goals: Objective Effectiveness (getting what you want), Relationship Effectiveness (keeping the relationship), and Self-Respect Effectiveness (keeping your respect for yourself).
                </AlertDescription>
            </Alert>
            <Accordion type="multiple" className="w-full space-y-4">
                {interpersonalEffectivenessSkills.map((skill) => (
                    <AccordionItem value={skill.acronym} key={skill.acronym} className="border-b-0 rounded-lg border p-4 bg-muted/20">
                        <AccordionTrigger className="py-2 text-left hover:no-underline">
                           <div className='flex items-center gap-4'>
                                <skill.icon className="size-6 text-primary" />
                                <div className='text-left'>
                                    <h3 className="font-semibold text-lg">{skill.title} ({skill.acronym})</h3>
                                    <p className="text-sm text-muted-foreground">{skill.description}</p>
                                </div>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="pt-4 prose prose-sm max-w-none text-foreground">
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
