
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { EfmtGameClient } from './efmt-game-client';
import { PageLayout } from '@/components/layout/page-layout';

export const metadata: Metadata = {
  title: 'Emotional Faces Memory Task | Zenith Wellness',
};

export default function EfmtPage() {
  return (
    <PageLayout title="Emotional Faces Memory Task">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Level 1: Basic Emotions</CardTitle>
          <CardDescription>
            Click 'Start Game' to begin. Find all the matching pairs of emotions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EfmtGameClient />
        </CardContent>
      </Card>
    </PageLayout>
  );
}
