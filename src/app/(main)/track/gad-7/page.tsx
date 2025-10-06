
import type { Metadata } from 'next';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Gad7Form } from './gad7-form';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { ShieldCheck } from 'lucide-react';
import { PageLayout } from '@/components/layout/page-layout';

export const metadata: Metadata = {
  title: 'Anxiety Screener (GAD-7) | Rejoyn',
};

export default function Gad7Page() {
  return (
    <PageLayout title="Anxiety Screener (GAD-7)">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Generalized Anxiety Disorder 7-item (GAD-7) scale</CardTitle>
          <CardDescription>
            Over the last 2 weeks, how often have you been bothered by the following problems?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert className="mb-8">
            <ShieldCheck className="h-4 w-4" />
            <AlertTitle>This is not a diagnostic tool.</AlertTitle>
            <AlertDescription>
              This screener is for informational purposes to help you monitor your symptoms. Please consult a healthcare professional for a diagnosis.
            </AlertDescription>
          </Alert>
          <Gad7Form />
        </CardContent>
      </Card>
    </PageLayout>
  );
}
