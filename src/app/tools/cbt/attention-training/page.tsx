
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AttentionTrainingTool } from './attention-training-tool';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Ear } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Attention Training | Rejoyn',
};

export default function AttentionTrainingPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
         <h1 className="font-headline text-xl font-semibold">CBT: Attention Training</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Attention Training Technique (ATT)</CardTitle>
                <CardDescription>
                    This exercise helps you gain flexible control over your attention. It trains you to selectively focus on different sounds, which can help you disengage from worry and rumination.
                </CardDescription>
            </CardHeader>
            <CardContent>
                 <Alert className="mb-8">
                    <Ear className="h-4 w-4" />
                    <AlertTitle>Find a Quiet Place</AlertTitle>
                    <AlertDescription>
                       For this exercise, it's best to use headphones in a place where you won't be disturbed for a few minutes. The goal is to practice directing your focus.
                    </AlertDescription>
                </Alert>
                <AttentionTrainingTool />
            </CardContent>
        </Card>
      </div>
    </main>
  );
}
