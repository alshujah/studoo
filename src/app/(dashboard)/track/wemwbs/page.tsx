
import type { Metadata } from 'next';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { WemwbsForm } from './wemwbs-form';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { ShieldCheck } from 'lucide-react';
import { PageLayout } from '@/components/layout/page-layout';

export const metadata: Metadata = {
  title: 'Well-being Screener (WEMWBS) | Zenith',
};

export default function WemwbsPage() {
  return (
    <PageLayout title="Well-being Screener (WEMWBS)">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Warwick-Edinburgh Mental Well-being Scale (WEMWBS)</CardTitle>
          <CardDescription>
            Below are some statements about feelings and thoughts. Please tick the box that best describes your experience of each over the last 2 weeks.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert className="mb-8">
            <ShieldCheck className="h-4 w-4" />
            <AlertTitle>Focus on Well-being</AlertTitle>
            <AlertDescription>
              This scale focuses on positive aspects of mental health, like feeling optimistic, useful, and relaxed.
            </AlertDescription>
          </Alert>
          <WemwbsForm />
        </CardContent>
      </Card>
    </PageLayout>
  );
}
