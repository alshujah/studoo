
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Film, AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Nightmare Rescripting Tool | Rejoyn',
};

export default function NightmareRescriptingPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">Nightmare Rescripting Tool</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Rewriting Your Nightmares</CardTitle>
            <CardDescription>
              Imagery Rehearsal Therapy (IRT) is an evidence-based technique for treating recurrent nightmares, especially those related to trauma. It involves changing the nightmare's story into a new one that you can rehearse while you're awake.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Proceed with Care</AlertTitle>
              <AlertDescription>
                This exercise can be distressing. Please ensure you are in a safe, comfortable space. If you feel overwhelmed, stop and use a grounding technique. This tool is most effective when used with guidance from a therapist.
              </AlertDescription>
            </Alert>

            <Card className="bg-muted/30">
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-3"><Film className="size-6 text-primary" />How to Rescript a Nightmare</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none text-foreground">
                    <ol>
                        <li><strong>Choose a Nightmare:</strong> Pick a recurring nightmare that bothers you, but perhaps not your absolute worst one to start with.</li>
                        <li><strong>Write it Down:</strong> Write down the narrative of the nightmare in as much detail as you feel comfortable with. Just the facts of what happens.</li>
                        <li><strong>Identify a Turning Point:</strong> Read through the narrative. Find a point in the dream where you can make a change. It can be anywhere in the dream.</li>
                        <li><strong>Change the Ending:</strong> From that turning point, write a new ending. The new ending can be anything you want—powerful, peaceful, absurd, or even boring. The only rule is that it must be different and it must not be traumatic. You are in complete control.
                            <ul className="my-2">
                                <li><strong>Example:</strong> If the nightmare involves being chased, you could change it so that you suddenly develop superpowers and fly away, or you turn around and confront the pursuer who turns into a cartoon character.</li>
                            </ul>
                        </li>
                        <li><strong>Rehearse the New Dream:</strong> Spend 5-10 minutes each day, while you are awake and calm, vividly imagining the new, rescripted dream from beginning to end. Picture the new ending in as much detail as possible.</li>
                    </ol>
                    <p className="mt-4 font-semibold">The goal is to provide your brain with a new, safe blueprint for the dream, reducing its emotional power and frequency over time.</p>
                </CardContent>
            </Card>

          </CardContent>
        </Card>
      </div>
    </main>
  );
}
