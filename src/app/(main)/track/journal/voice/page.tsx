
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { VoiceJournalTool } from './voice-journal-tool';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Mic } from 'lucide-react';
import { PageLayout } from '@/components/layout/page-layout';

export const metadata: Metadata = {
  title: 'Voice Journal | Rejoyn',
};

export default function VoiceJournalPage() {
  return (
    <PageLayout title="Voice Journal">
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
    </PageLayout>
  );
}
