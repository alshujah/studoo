
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BehavioralChainAnalysisForm } from './behavioral-chain-analysis-form';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Link2 } from 'lucide-react';
import { PageLayout } from '@/components/layout/page-layout';

export const metadata: Metadata = {
  title: 'Behavioral Chain Analysis | Rejoyn',
};

export default function BehavioralChainAnalysisPage() {
  return (
    <PageLayout title="Behavioral Chain Analysis">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Analyze a Problem Behavior</CardTitle>
                <CardDescription>
                    This DBT tool helps you understand the chain of events leading to a behavior you want to change. By breaking it down, you can find points to intervene and make different choices.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Alert className="mb-8">
                    <Link2 className="h-4 w-4" />
                    <AlertTitle>How It Works</AlertTitle>
                    <AlertDescription>
                       Work through each step of the chain, from the prompting event to the consequences. Be as detailed and honest as possible. The goal is understanding, not judgment.
                    </AlertDescription>
                </Alert>
                <BehavioralChainAnalysisForm />
            </CardContent>
        </Card>
    </PageLayout>
  );
}
