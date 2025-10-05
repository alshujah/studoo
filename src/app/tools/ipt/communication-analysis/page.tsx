
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { MessageCircle, TriangleAlert, Shield, Hand } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Communication Analysis | Rejoyn',
};

const communicationStyles = [
    {
        title: 'Passive',
        icon: Hand,
        description: 'Avoiding expressing your opinions or feelings, protecting your rights, and identifying and meeting your needs. Passive behavior is usually born of low self-esteem.',
        characteristics: [
            'Fails to assert for themselves',
            'Allows others to deliberately or inadvertently infringe on their rights',
            'Fails to express their feelings, needs, or opinions',
            'Tends to speak softly or apologetically',
            'Exhibits poor eye contact and slumped body posture',
        ]
    },
    {
        title: 'Aggressive',
        icon: TriangleAlert,
        description: 'Expressing your feelings and opinions and advocating for your needs in a way that violates the rights of others. Aggressive behavior is often born of low self-esteem, unhealed emotional wounds, or feeling powerless.',
        characteristics: [
            'Tries to dominate others',
            'Uses humiliation to control others',
            'Criticizes, blames, or attacks others',
            'Is very impulsive',
            'Has a low frustration tolerance',
        ]
    },
     {
        title: 'Assertive',
        icon: Shield,
        description: 'Clearly stating your opinions and feelings, and firmly advocating for your rights and needs without violating the rights of others. Assertive communication is born of high self-esteem.',
        characteristics: [
            'States needs and wants clearly, appropriately, and respectfully',
            'Expresses feelings clearly, appropriately, and respectfully',
            'Uses "I" statements',
            'Communicates respect for others',
            'Listens well without interrupting',
        ]
    },
];

export default function CommunicationAnalysisPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">IPT: Communication Analysis</h1>
      </div>
      <div className="flex-1 p-4 md:p-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Analyzing Your Communication Patterns</CardTitle>
            <CardDescription>
              Understanding your default communication style is the first step toward more effective interpersonal relationships. This tool helps you identify your patterns and learn the skills for assertive communication.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert className="mb-8">
              <MessageCircle className="h-4 w-4" />
              <AlertTitle>Goal: Assertive Communication</AlertTitle>
              <AlertDescription>
                Assertiveness is the healthy middle ground between passivity and aggression. It allows you to express yourself, stand up for your beliefs, and get your needs met while respecting others.
              </AlertDescription>
            </Alert>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {communicationStyles.map((style) => (
                    <Card key={style.title}>
                        <CardHeader className="flex flex-row items-start gap-4">
                            <style.icon className="size-8 text-primary mt-1" />
                            <div>
                                <CardTitle>{style.title}</CardTitle>
                                <CardDescription>{style.description}</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <h4 className="font-semibold mb-2">Characteristics:</h4>
                             <ul className="list-disc pl-5 text-sm space-y-1 text-muted-foreground">
                                {style.characteristics.map(char => <li key={char}>{char}</li>)}
                            </ul>
                        </CardContent>
                    </Card>
                ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle>Reflection Exercise</CardTitle>
                <CardDescription>Think about a recent difficult conversation. Use these questions to analyze your communication.</CardDescription>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-foreground">
                <ul>
                    <li><strong>The Situation:</strong> What was the context of the conversation? Who were you talking to?</li>
                    <li><strong>Your Goal:</strong> What did you want to achieve from the conversation?</li>
                    <li><strong>Your Behavior:</strong> What did you say and do? What was your body language like? Which communication style (passive, aggressive, assertive) did your behavior most closely match?</li>
                    <li><strong>The Outcome:</strong> What was the result of the conversation? Did you get your needs met? How did you feel afterward? How did the other person likely feel?</li>
                    <li><strong>Assertive Alternative:</strong> If you weren't assertive, what could you have said or done differently to be more assertive? Write out a script for yourself.</li>
                </ul>
            </CardContent>
        </Card>
      </div>
    </main>
  );
}
