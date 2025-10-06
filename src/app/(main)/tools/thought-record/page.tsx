
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ThoughtRecordForm } from './thought-record-form';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { BrainCircuit } from 'lucide-react';
import { PageLayout } from '@/components/layout/page-layout';

export const metadata: Metadata = {
  title: 'Thought Record | Rejoyn',
};

export default function ThoughtRecordPage() {
  return (
    <PageLayout title="Thought Record">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Challenge Your Automatic Thoughts</CardTitle>
                <CardDescription>
                    A Thought Record is a CBT tool to help you identify and challenge negative automatic thoughts. By examining your thoughts, you can develop more balanced and helpful ways of thinking.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Alert className="mb-8">
                    <BrainCircuit className="h-4 w-4" />
                    <AlertTitle>How It Works</AlertTitle>
                    <AlertDescription>
                       Follow the steps to describe the situation, identify your automatic thoughts and feelings, and then use the AI to help you find a more balanced perspective.
                    </AlertDescription>
                </Alert>
                <ThoughtRecordForm />
            </CardContent>
        </Card>
    </PageLayout>
  );
}
