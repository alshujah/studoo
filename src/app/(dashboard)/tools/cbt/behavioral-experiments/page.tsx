
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BehavioralExperimentForm } from './behavioral-experiment-form';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Beaker } from 'lucide-react';
import { PageLayout } from '@/components/layout/page-layout';

export const metadata: Metadata = {
  title: 'Behavioral Experiments | Zenith',
};

export default function BehavioralExperimentsPage() {
  return (
    <PageLayout title="Behavioral Experiments">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Test Your Beliefs</CardTitle>
                <CardDescription>
                    A behavioral experiment is a powerful CBT tool where you act like a scientist to test out your anxious thoughts and predictions in the real world.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Alert className="mb-8">
                    <Beaker className="h-4 w-4" />
                    <AlertTitle>Become a Mind Scientist</AlertTitle>
                    <AlertDescription>
                       Follow the steps to design an experiment, make a prediction, and then see what really happens. The goal is to gather evidence, not to be perfect.
                    </AlertDescription>
                </Alert>
                <BehavioralExperimentForm />
            </CardContent>
        </Card>
    </PageLayout>
  );
}
