
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Armchair, Lightbulb, MessageSquare } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Gestalt Therapy Techniques | Rejoyn',
};

export default function GestaltPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">Gestalt Therapy Techniques</h1>
      </div>
      <div className="flex-1 p-4 md:p-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Focusing on the Here and Now</CardTitle>
            <CardDescription>
              Gestalt therapy is a humanistic approach that emphasizes personal responsibility and focuses on the individual's experience in the present moment, the "here and now." It helps people become more aware of how they think, feel, and act in the present.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert>
              <Lightbulb className="h-4 w-4" />
              <AlertTitle>The Goal: Awareness</AlertTitle>
              <AlertDescription>
                The primary aim of Gestalt therapy is not to change you, but to increase your awareness of what you are doing and how you are doing it. With awareness comes the possibility of choice and change.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Key Concepts & Techniques</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold flex items-center gap-2"><Armchair className="size-5 text-primary" />The Empty Chair Technique</h4>
                    <p className="text-sm text-muted-foreground mt-2">This is the most famous Gestalt technique. You imagine someone (or a part of yourself) in an empty chair opposite you. You then speak to them, expressing your thoughts and feelings. After you've said your piece, you switch chairs and respond from the other person's (or part's) perspective. This helps to explore conflicts, see situations from a different viewpoint, and integrate different parts of yourself.</p>
                </div>
                <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold flex items-center gap-2"><MessageSquare className="size-5 text-primary" />"I" Language</h4>
                    <p className="text-sm text-muted-foreground mt-2">Gestalt therapy encourages taking ownership of your experiences by using "I" statements. For example, instead of saying "This presentation is boring," you would say "I am feeling bored." This shifts the focus from an external judgment to your personal, present-moment experience.</p>
                </div>
                <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold flex items-center gap-2"><Lightbulb className="size-5 text-primary" />Exaggeration</h4>
                    <p className="text-sm text-muted-foreground mt-2">If you notice a small, non-verbal behavior (like tapping your foot or clenching your fist), a Gestalt therapist might ask you to exaggerate it. By making the action bigger, the underlying emotion or meaning often becomes clearer, increasing your self-awareness.</p>
                </div>
            </CardContent>
        </Card>
      </div>
    </main>
  );
}
