
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SubstanceUseForm } from './substance-use-form';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { FlaskConical } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Substance Use Log | Rejoyn',
};

export default function SubstanceUsePage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
         <h1 className="font-headline text-xl font-semibold">Substance Use Log</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Log Substance Use</CardTitle>
                <CardDescription>
                    This is a non-judgmental tool to help you become more aware of your habits and urges around substances like alcohol, caffeine, or nicotine.
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
      </div>
    </main>
  );
}
