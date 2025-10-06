
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DearManForm } from './dear-man-form';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Target } from 'lucide-react';
import { PageLayout } from '@/components/layout/page-layout';

export const metadata: Metadata = {
  title: 'DEAR MAN Script Builder | Zenith',
};

export default function DearManPage() {
  return (
    <PageLayout title="DEAR MAN Script Builder">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Prepare for a Difficult Conversation</CardTitle>
                <CardDescription>
                    Use this worksheet to prepare for a conversation where you need to ask for something or say no. Following these steps helps you communicate clearly, confidently, and effectively.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Alert className="mb-8">
                    <Target className="h-4 w-4" />
                    <AlertTitle>How It Works</AlertTitle>
                    <AlertDescription>
                       Work through each step of the DEAR MAN acronym. Be clear and concise. The goal is to create a script you can practice and use.
                    </AlertDescription>
                </Alert>
                <DearManForm />
            </CardContent>
        </Card>
    </PageLayout>
  );
}
