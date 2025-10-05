
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, History } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Trauma Memory Reconsolidation | Rejoyn',
};

export default function TraumaMemoryReconsolidationPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">Trauma Memory Reconsolidation</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Updating the Brain's Library</CardTitle>
            <CardDescription>
              Memory reconsolidation is a neuroscience concept suggesting that when a memory is recalled, it becomes temporarily changeable. In therapy, this window can be used to "update" a traumatic memory with new, corrective information, reducing its emotional power.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Requires a Trained Professional</AlertTitle>
              <AlertDescription>
                This is an advanced therapeutic process that should ONLY be undertaken with a qualified therapist trained in modalities like Coherence Therapy, EMDR, or specific forms of CBT. Attempting this alone can be destabilizing or re-traumatizing. This page is for educational purposes only.
              </AlertDescription>
            </Alert>

            <Card className="bg-muted/30">
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-3"><History className="size-6 text-primary" />The Basic Idea</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none text-foreground">
                    <ol>
                        <li><strong>Activate the Memory:</strong> The therapist helps the client briefly and safely activate the traumatic memory and its associated emotional learning (e.g., "I am helpless").</li>
                        <li><strong>Introduce a Mismatch:</strong> Crucially, a new, contradictory experience is introduced at the same time. This might be a felt sense of empowerment in the present, a compassionate inner voice, or an awareness of current safety. The brain now holds two conflicting pieces of information: the old learning ("I am helpless") and the new experience ("But right now, I feel strong").</li>
                        <li><strong>Repetition and Integration:</strong> The therapist guides the client in juxtaposing these two experiences repeatedly. This process can lead to the brain "updating" the original memory. The facts of what happened don't change, but the emotional meaning and felt sense attached to it are transformed.</li>
                    </ol>
                     <p className="mt-4 font-semibold">The old memory is not erased, but its emotional "sting" is neutralized. It becomes just a story about the past, rather than a threat that is still happening now.</p>
                </CardContent>
            </Card>

          </CardContent>
        </Card>
      </div>
    </main>
  );
}
