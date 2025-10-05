
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SubstanceUseForm } from './substance-use-form';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { FlaskConical } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Substance Use Log | Rejoyn',
};

export default function SubstanceUseLogPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
         <h1 className="font-headline text-xl font-semibold">Substance Use Log</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Track Substance Use</CardTitle>
                <CardDescription>
                    Logging your use of substances like alcohol, caffeine, or nicotine can help you understand patterns, urges, and impacts on your well-being.
                </CardDescription>
            </CardHeader>
            <CardContent>
                 <Alert className="mb-8">
                    <FlaskConical className="h-4 w-4" />
                    <AlertTitle>Non-Judgmental Awareness</AlertTitle>
                    <AlertDescription>
                       The goal is simply to observe, not to judge. Honest tracking is the first step toward understanding and, if desired, change.
                    </AlertDescription>
                </Alert>
                <SubstanceUseForm />
            </CardContent>
        </Card>
      </div>
    </main>
  );
}
