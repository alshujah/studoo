
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChainAnalysisForm } from './chain-analysis-form';

export const metadata: Metadata = {
  title: 'Behavioral Chain Analysis | Rejoyn',
};

export default function BehavioralChainAnalysisPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">DBT: Behavioral Chain Analysis</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Analyze the Chain of Events</CardTitle>
            <CardDescription>
              A behavioral chain analysis is a DBT tool to help you figure out what led to a behavior you want to change, and what you can do differently next time.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChainAnalysisForm />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
