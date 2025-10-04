import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { VoiceJournalTool } from './voice-journal-tool';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Mic } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Voice Journal | Rejoyn',
};

export default function VoiceJournalPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
         <h1 className="font-headline text-xl font-semibold">Voice Journal</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Speak Your Mind</CardTitle>
                <CardDescription>
                    Use your voice to capture your thoughts and feelings. Simply press record, speak freely, and listen back to your entry.
                </CardDescription>
            </CardHeader>
            <CardContent>
                 <Alert className="mb-8">
                    <Mic className="h-4 w-4" />
                    <AlertTitle>Microphone Access Required</AlertTitle>
                    <AlertDescription>
                        Your browser will ask for permission to use your microphone. Your recordings are not sent to any server in this demo.
                    </AlertDescription>
                </Alert>
                <VoiceJournalTool />
            </CardContent>
        </Card>
      </div>
    </main>
  );
}
