import type { Metadata } from 'next';
import { Phq9Form } from './phq-9-form';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export const metadata: Metadata = {
  title: 'PHQ-9 Depression Assessment | Rejoyn',
};

export default function Phq9Page() {
  return (
    <main className="flex flex-1 flex-col">
       <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
         <h1 className="font-headline text-xl font-semibold">PHQ-9 Depression Assessment</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">PHQ-9 Depression Questionnaire</CardTitle>
                <CardDescription>
                    Over the last 2 weeks, how often have you been bothered by any of the following problems?
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Alert className='mb-6'>
                    <AlertTitle>This is not a diagnostic tool.</AlertTitle>
                    <AlertDescription>
                        This assessment is for informational purposes only and does not replace a professional diagnosis. Please consult a healthcare provider for any health concerns.
                    </AlertDescription>
                </Alert>
                <Phq9Form />
            </CardContent>
        </Card>
      </div>
    </main>
  );
}
