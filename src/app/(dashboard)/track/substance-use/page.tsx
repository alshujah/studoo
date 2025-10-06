
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SubstanceUseForm } from './substance-use-form';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { FlaskConical } from 'lucide-react';
import { PageLayout } from '@/components/layout/page-layout';

export const metadata: Metadata = {
  title: 'Substance Use Log | Zenith',
};

export default function SubstanceUsePage() {
  return (
    <PageLayout title="Substance Use Log">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Log Substance Use</CardTitle>
                <CardDescription>
                    This is a non-judgmental tool to help you become more aware of your habits and urges related to substances like alcohol, caffeine, or nicotine.
                </CardDescription>
            </CardHeader>
            <CardContent>
                 <Alert className="mb-8">
                    <FlaskConical className="h-4 w-4" />
                    <AlertTitle>For Awareness, Not Judgment</AlertTitle>
                    <AlertDescription>
                        The goal here is simply to observe patterns. Tracking your use and urges can provide valuable insights without any pressure to change immediately.
                    </AlertDescription>
                </Alert>
                <SubstanceUseForm />
            </CardContent>
        </Card>
    </PageLayout>
  );
}
