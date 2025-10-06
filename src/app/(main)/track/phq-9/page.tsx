
import type { Metadata } from 'next';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Phq9Form } from './phq9-form';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { ShieldCheck } from 'lucide-react';
import { PageLayout } from '@/components/layout/page-layout';

export const metadata: Metadata = {
  title: 'Depression Screener (PHQ-9) | Rejoyn',
};

export default function Phq9Page() {
  return (
    <PageLayout title="Depression Screener (PHQ-9)">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Patient Health Questionnaire (PHQ-9)</CardTitle>
          <CardDescription>
            Over the last 2 weeks, how often have you been bothered by any of the following problems?
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
          <Phq9Form />
        </CardContent>
      </Card>
    </PageLayout>
  );
}
