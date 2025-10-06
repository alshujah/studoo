
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ThoughtRecordForm } from './thought-record-form';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Lightbulb } from 'lucide-react';
import { PageLayout } from '@/components/layout/page-layout';

export const metadata: Metadata = {
  title: 'Thought Record | Zenith',
};

export default function ThoughtRecordPage() {
  return (
    <PageLayout title="CBT Thought Record">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Challenge Your Negative Thoughts</CardTitle>
                <CardDescription>
                    A Thought Record is a powerful tool from Cognitive Behavioral Therapy (CBT) to identify, evaluate, and respond to your automatic negative thoughts.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Alert className="mb-8">
                    <Lightbulb className="h-4 w-4" />
                    <AlertTitle>How It Works</AlertTitle>
                    <AlertDescription>
                        Follow the steps to break down a difficult moment. Once you fill out the first three steps, our AI Coach can help you find a more balanced perspective.
                    </AlertDescription>
                </Alert>
                <ThoughtRecordForm />
            </CardContent>
        </Card>
    </PageLayout>
  );
}
