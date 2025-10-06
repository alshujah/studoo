
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Star } from 'lucide-react';
import { PageLayout } from '@/components/layout/page-layout';
import { characterStrengths } from '@/lib/data/positive-psychology-data';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'Character Strengths | Zenith',
};

export default function CharacterStrengthsPage() {
  return (
    <PageLayout title="Explore Your Character Strengths">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">What Are Character Strengths?</CardTitle>
                <CardDescription>
                    Character strengths are the positive parts of your personality that impact how you think, feel, and behave. Scientists have identified 24 strengths that we all have in different degrees.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Alert className="mb-8">
                    <Star className="h-4 w-4" />
                    <AlertTitle>Focus on Your Top Strengths</AlertTitle>
                    <AlertDescription>
                        Understanding and using your top strengths can help you increase happiness and well-being. Review the list below and reflect on which ones feel most like the "real you".
                    </AlertDescription>
                </Alert>
                
                <div className="space-y-6">
                    {characterStrengths.map(strength => (
                        <div key={strength.name} className="p-4 border rounded-lg">
                           <h3 className="font-semibold text-lg text-primary">{strength.name}</h3>
                           <p className="text-muted-foreground mt-1">{strength.description}</p>
                        </div>
                    ))}
                </div>

            </CardContent>
        </Card>
    </PageLayout>
  );
}
