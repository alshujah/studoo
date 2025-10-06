
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PageLayout } from '@/components/layout/page-layout';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Week 3 | MBSR Program | Zenith Wellness',
};

export default function MbsrWeek3Page() {
  return (
    <PageLayout title="Week 3: Coming Soon">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Content for Week 3 is being developed.</CardTitle>
                <CardDescription>
                    Please check back soon for the next phase of your MBSR journey.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Button asChild variant="outline">
                    <Link href="/programs/mbsr">
                        <ArrowLeft className="mr-2" /> Back to Program Overview
                    </Link>
                </Button>
            </CardContent>
        </Card>
    </PageLayout>
  );
}
