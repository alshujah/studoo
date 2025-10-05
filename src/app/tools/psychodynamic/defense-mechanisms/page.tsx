
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Shield, Lightbulb } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Defense Mechanisms | Rejoyn',
};

const defenseMechanisms = [
    {
        name: 'Denial',
        description: 'Refusing to acknowledge an external reality or a subjective experience that is clear to others.',
        example: 'e.g., A person with a substance use disorder insists they can stop anytime they want, despite evidence to the contrary.'
    },
    {
        name: 'Projection',
        description: 'Attributing your own unacceptable thoughts, feelings, or motives to another person.',
        example: 'e.g., Feeling angry at your partner but accusing them of being angry at you.'
    },
    {
        name: 'Rationalization',
        description: 'Creating false but credible justifications for unacceptable behavior.',
        example: 'e.g., Justifying cheating on an exam by saying "everyone does it."'
    },
    {
        name: 'Intellectualization',
        description: 'Over-emphasizing thinking when confronted with an unacceptable impulse, situation or behavior without employing any emotions.',
        example: 'e.g., Focusing on the statistical probabilities of a disease progression instead of feeling the sadness and fear of a new diagnosis.'
    },
    {
        name: 'Repression',
        description: 'Unconsciously blocking unpleasant emotions, impulses, memories, and thoughts from your conscious mind.',
        example: 'e.g., Having no memory of a traumatic event from childhood.'
    },
    {
        name: 'Sublimation',
        description: 'Channeling unacceptable impulses, thoughts and emotions into more acceptable ones.',
        example: 'e.g., Channeling aggressive feelings into becoming a competitive athlete.'
    }
];

export default function DefenseMechanismsPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">Psychodynamic: Defense Mechanisms</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Understanding Your Defenses</CardTitle>
            <CardDescription>
              Defense mechanisms are unconscious psychological strategies used to cope with anxiety and unacceptable thoughts or feelings. They are not inherently "bad"—they are ways we've learned to protect ourselves.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert>
              <Shield className="h-4 w-4" />
              <AlertTitle>Unconscious Protectors</AlertTitle>
              <AlertDescription>
                We all use defense mechanisms. The goal is to become aware of them, understand what they are protecting you from, and develop more conscious, healthier ways of coping.
              </AlertDescription>
            </Alert>
            <Card className="bg-muted/30">
                <CardHeader>
                    <CardTitle className="text-lg">Common Defense Mechanisms</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {defenseMechanisms.map((mech) => (
                        <div key={mech.name} className="p-4 border rounded-lg bg-background">
                            <h4 className="font-semibold text-primary">{mech.name}</h4>
                            <p className="text-sm text-muted-foreground mt-1">{mech.description}</p>
                            <p className="text-sm mt-2 italic">{mech.example}</p>
                        </div>
                    ))}
                </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
