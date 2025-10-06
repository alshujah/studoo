
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ProblemSolvingForm } from './problem-solving-form';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Lightbulb } from 'lucide-react';
import { PageLayout } from '@/components/layout/page-layout';

export const metadata: Metadata = {
  title: 'Problem Solving | Rejoyn',
};

export default function ProblemSolvingPage() {
  return (
    <PageLayout title="DBT Problem Solving">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Practice Problem Solving</CardTitle>
                <CardDescription>
                    This DBT skill is for when your emotions are justified by the facts of a situation, and the situation itself is the problem. It provides a structured way to find an effective solution.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Alert className="mb-8">
                    <Lightbulb className="h-4 w-4" />
                    <AlertTitle>How It Works</AlertTitle>
                    <AlertDescription>
                       Follow the steps to define the problem, set a clear goal, brainstorm solutions without judgment, and then choose and plan your course of action.
                    </AlertDescription>
                </Alert>
                <ProblemSolvingForm />
            </CardContent>
        </Card>
    </PageLayout>
  );
}
