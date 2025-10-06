
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckTheFactsForm } from './check-the-facts-form';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Check } from 'lucide-react';
import { PageLayout } from '@/components/layout/page-layout';

export const metadata: Metadata = {
  title: 'Check the Facts | Rejoyn',
};

export default function CheckTheFactsPage() {
  return (
    <PageLayout title="Check the Facts">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Practice Checking the Facts</CardTitle>
                <CardDescription>
                    This DBT skill helps you figure out if your emotional reaction fits the facts of a situation. Sometimes our emotions are based on interpretations, not reality.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Alert className="mb-8">
                    <Check className="h-4 w-4" />
                    <AlertTitle>How It Works</AlertTitle>
                    <AlertDescription>
                       Follow the steps to separate your interpretations from the objective facts. This can help you determine if your emotion is justified by the situation.
                    </AlertDescription>
                </Alert>
                <CheckTheFactsForm />
            </CardContent>
        </Card>
    </PageLayout>
  );
}

    