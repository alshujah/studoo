
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ProblemSolvingForm } from './problem-solving-form';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Lightbulb } from 'lucide-react';
import { PageLayout } from '@/components/layout/page-layout';

export const metadata: Metadata = {
  title: 'Problem Solving | Zenith',
};

export default function ProblemSolvingPage() {
  return (
    <PageLayout title="Problem Solving">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Practice Problem Solving</CardTitle>
                <CardDescription>
                    This DBT skill is for when your emotion (like sadness or anger) IS justified by the facts, and the situation itself is the problem.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Alert className="mb-8">
                    <Lightbulb className="h-4 w-4" />
                    <AlertTitle>How It Works</AlertTitle>
                    <AlertDescription>
                       Follow the steps to clearly define the problem, brainstorm solutions, and create an action plan. This structured approach helps you tackle solvable problems effectively.
                    </AlertDescription>
                </Alert>
                <ProblemSolvingForm />
            </CardContent>
        </Card>
    </PageLayout>
  );
}
