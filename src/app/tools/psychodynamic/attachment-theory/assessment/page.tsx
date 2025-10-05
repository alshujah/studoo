
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CircleHelp } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


export const metadata: Metadata = {
  title: 'Attachment Style Assessment | Rejoyn',
};

const styles = [
    {
        title: "Secure",
        description: "It is relatively easy for me to become emotionally close to others. I am comfortable depending on others and having others depend on me. I don't worry about being alone or having others not accept me."
    },
    {
        title: "Anxious (Preoccupied)",
        description: "I want to be completely emotionally intimate with others, but I often find that others are reluctant to get as close as I would like. I am uncomfortable being without close relationships, but I sometimes worry that others don't value me as much as I value them."
    },
    {
        title: "Avoidant (Dismissive)",
        description: "I am comfortable without close emotional relationships. It is very important to me to feel independent and self-sufficient, and I prefer not to depend on others or have others depend on me."
    },
    {
        title: "Disorganized (Fearful-Avoidant)",
        description: "I am somewhat uncomfortable getting close to others. I want emotionally close relationships, but I find it difficult to trust others completely or to depend on them. I worry that I will be hurt if I allow myself to become too close to others."
    }
]

export default function AttachmentAssessmentPage() {
  return (
    <main className="flex flex-1 flex-col">
       <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
         <h1 className="font-headline text-xl font-semibold">Attachment Style Self-Assessment</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Attachment Style Questionnaire</CardTitle>
                <CardDescription>
                    Read the four statements below. Which one best describes how you feel in romantic relationships or your closest connections?
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Alert className='mb-6'>
                    <CircleHelp className="h-4 w-4" />
                    <AlertTitle>This is a self-reflection tool, not a diagnosis.</AlertTitle>
                    <AlertDescription>
                        Your style can change over time and may vary in different relationships. The goal is simply to identify your primary pattern.
                    </AlertDescription>
                </Alert>
                <Accordion type="single" collapsible className="w-full space-y-4">
                    {styles.map(style => (
                        <AccordionItem value={style.title} key={style.title} className="border rounded-lg px-4 bg-muted/20">
                            <AccordionTrigger className="hover:no-underline">
                                <h3 className="text-lg font-semibold">{style.title}</h3>
                            </AccordionTrigger>
                            <AccordionContent>
                                <p className="text-base text-muted-foreground italic">"{style.description}"</p>
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
