
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { OppositeActionForm } from './opposite-action-form';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { ShieldQuestion } from 'lucide-react';
import { PageLayout } from '@/components/layout/page-layout';

export const metadata: Metadata = {
  title: 'Opposite Action | Zenith',
};

export default function OppositeActionPage() {
  return (
    <PageLayout title="Opposite Action">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Practice Opposite Action</CardTitle>
                <CardDescription>
                    This DBT skill helps you change unwanted emotions by acting opposite to their action urge. It's most effective when the emotion itself doesn't fit the facts of the situation.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Alert className="mb-8">
                    <ShieldQuestion className="h-4 w-4" />
                    <AlertTitle>How It Works</AlertTitle>
                    <AlertDescription>
                       Identify the emotion and what it's urging you to do. Then, brainstorm and commit to doing the exact opposite. After acting, reflect on how it changed your emotional state.
                    </AlertDescription>
                </Alert>
                <OppositeActionForm />
            </CardContent>
        </Card>
    </PageLayout>
  );
}
