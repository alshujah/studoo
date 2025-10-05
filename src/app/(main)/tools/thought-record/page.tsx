
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ThoughtRecordForm } from './thought-record-form';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { BrainCircuit } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Thought Record | Rejoyn',
};

export default function ThoughtRecordPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
         <h1 className="font-headline text-xl font-semibold">Thought Record</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
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
      </div>
    </main>
  );
}
