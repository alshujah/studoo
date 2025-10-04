
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TippTool } from './tipp-tool';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'TIPP Technique | Rejoyn',
};

export default function TippTechniquePage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">DBT Skill: TIPP</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">The TIPP Technique</CardTitle>
            <CardDescription>
              TIPP is a DBT distress tolerance skill used to rapidly calm your body down during moments of overwhelming emotion. Use these skills to navigate a crisis without making it worse.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert variant="destructive" className="mb-8">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Health & Safety Notice</AlertTitle>
                <AlertDescription>
                    Please consult with a doctor before using these techniques, especially if you have a medical condition. Stop if you feel dizzy or unwell.
                </AlertDescription>
            </Alert>
            <TippTool />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
