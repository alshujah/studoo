
import type { Metadata } from 'next';
import { WemwbsForm } from './wemwbs-form';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export const metadata: Metadata = {
  title: 'WEMWBS Well-being Assessment | Rejoyn',
};

export default function WemwbsPage() {
  return (
    <main className="flex flex-1 flex-col">
       <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
         <h1 className="font-headline text-xl font-semibold">WEMWBS Well-being Assessment</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Warwick-Edinburgh Mental Well-being Scale</CardTitle>
                <CardDescription>
                    Below are some statements about feelings and thoughts. Please tick the box that best describes your experience over the last 2 weeks.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Alert className='mb-6'>
                    <AlertTitle>This is a measure of well-being, not a diagnostic tool.</AlertTitle>
                    <AlertDescription>
                        This scale helps you reflect on your positive mental health. It does not diagnose any condition.
                    </AlertDescription>
                </Alert>
                <WemwbsForm />
            </CardContent>
        </Card>
      </div>
    </main>
  );
}
