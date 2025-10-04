import type { Metadata } from 'next';
import { EmdrTool } from './emdr-tool';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'EMDR Tool | Rejoyn',
};

export default function EmdrPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
         <h1 className="font-headline text-xl font-semibold">EMDR: Digital Bilateral Stimulation</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Visual Stimulation Tool</CardTitle>
                <CardDescription>
                    This tool provides a visual stimulus for bilateral eye movement. Follow the dot with your eyes without moving your head.
                </CardDescription>
            </CardHeader>
            <CardContent>
                 <Alert variant="destructive" className="mb-8">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>For Informational Use Only</AlertTitle>
                    <AlertDescription>
                        This tool is a simulation of one component of EMDR and is not a substitute for therapy with a trained professional. Please consult a qualified therapist for EMDR treatment.
                    </AlertDescription>
                </Alert>
                <EmdrTool />
            </CardContent>
        </Card>
      </div>
    </main>
  );
}
