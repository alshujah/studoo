
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ProblemSolvingForm } from './problem-solving-form';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Lightbulb } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Problem-Solving Skills | Rejoyn',
};

export default function ProblemSolvingPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
         <h1 className="font-headline text-xl font-semibold">CBT: Problem-Solving</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Structured Problem-Solving</CardTitle>
                <CardDescription>
                   This tool guides you through a structured process to tackle problems, reducing feelings of being overwhelmed and increasing your sense of control.
                </CardDescription>
            </CardHeader>
            <CardContent>
                 <Alert className="mb-8">
                    <Lightbulb className="h-4 w-4" />
                    <AlertTitle>From Worry to Action</AlertTitle>
                    <AlertDescription>
                       The goal is to move from worrying about a problem to taking concrete steps to solve it. Follow the steps to break it down.
                    </AlertDescription>
                </Alert>
                <ProblemSolvingForm />
            </CardContent>
        </Card>
      </div>
    </main>
  );
}

    