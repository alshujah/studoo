
import type { Metadata } from 'next';
import { Gad7Form } from './gad-7-form';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export const metadata: Metadata = {
  title: 'GAD-7 Anxiety Assessment | Rejoyn',
};

export default function Gad7Page() {
  return (
    <main className="flex flex-1 flex-col">
       <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
         <h1 className="font-headline text-xl font-semibold">GAD-7 Anxiety Assessment</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">GAD-7 Anxiety Questionnaire</CardTitle>
                <CardDescription>
                    Over the last 2 weeks, how often have you been bothered by the following problems?
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Alert className='mb-6'>
                    <AlertTitle>This is not a diagnostic tool.</AlertTitle>
                    <AlertDescription>
                        This assessment is for informational purposes only and does not replace a professional diagnosis. Please consult a healthcare provider for any health concerns.
                    </AlertDescription>
                </Alert>
                <Gad7Form />
            </CardContent>
        </Card>
      </div>
    </main>
  );
}
