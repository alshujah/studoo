
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, Image } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Imagery Rescripting | Rejoyn',
};

export default function ImageryRescriptingPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">Imagery Rescripting</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Healing a Memory</CardTitle>
            <CardDescription>
              Imagery Rescripting is a powerful experiential technique used in Schema Therapy. It involves recalling a painful memory from childhood and then changing, or "rescripting," it in your imagination to meet your core emotional needs.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>This is an Advanced Technique</AlertTitle>
              <AlertDescription>
                Imagery Rescripting can be very emotionally intense and should ONLY be done with a qualified therapist trained in this technique. This page is for educational purposes only so you can understand the process.
              </AlertDescription>
            </Alert>

            <Card className="bg-muted/30">
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-3"><Image className="size-6 text-primary" />The Steps of Imagery Rescripting</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none text-foreground">
                    <ol>
                        <li><strong>Activate the Memory:</strong> You are guided to close your eyes and recall a distressing but representative memory from your childhood related to a core schema. You describe it in the present tense as if it's happening now.</li>
                        <li><strong>Link to Presenting Problem:</strong> The therapist helps you connect the feelings from the memory to the problems you're facing in your life today.</li>
                        <li><strong>Enter the Image as Your Adult Self:</strong> You are guided to imagine your healthy, adult self entering the scene.</li>
                        <li><strong>Confront and Nurture:</strong> Your adult self steps in to protect your younger self. This might involve confronting the person causing harm, setting boundaries, and most importantly, providing the young child in the image with the love, safety, and validation they needed but did not receive at the time.</li>
                        <li><strong>Rescript the Scene:</strong> You change the memory in your imagination to provide a healing outcome where your needs are met. The goal isn't to change the past, but to create a new emotional experience associated with the memory.</li>
                    </ol>
                     <p className="mt-4 font-semibold">By creating a new, corrective emotional experience, Imagery Rescripting helps to heal the original schema at its root, reducing its power over your present-day life.</p>
                </CardContent>
            </Card>

          </CardContent>
        </Card>
      </div>
    </main>
  );
}
