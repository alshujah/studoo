
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { distressToleranceSkills } from '@/lib/dbt-data';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ShieldQuestion } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Distress Tolerance Skills | Rejoyn',
};

export default function DistressTolerancePage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">DBT: Distress Tolerance Skills</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Your Distress Tolerance Toolkit</CardTitle>
            <CardDescription>
              These skills are for surviving crisis situations without making things worse. Use them when you have an intense emotional urge to do something that might be harmful in the long run.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert className="mb-8">
                <ShieldQuestion className="h-4 w-4" />
                <AlertTitle>When to Use These Skills</AlertTitle>
                <AlertDescription>
                    Use these skills when you are in a crisis and your emotions are too high to problem-solve effectively. The goal is to get through the moment without acting on destructive urges.
                </AlertDescription>
            </Alert>
            <Accordion type="multiple" className="w-full space-y-4">
                {distressToleranceSkills.map((skill) => (
                    <AccordionItem value={skill.acronym} key={skill.acronym} className="border-b-0 rounded-lg border p-4 bg-muted/20">
                        <AccordionTrigger className="py-2 text-left hover:no-underline">
                           <div className='flex items-center gap-4'>
                                <skill.icon className="size-6 text-primary" />
                                <div className='text-left'>
                                    <h3 className="font-semibold text-lg">{skill.title} (ACCEPTS)</h3>
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
