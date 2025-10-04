
import type { Metadata } from 'next';
import { EmdrTool } from './emdr-tool';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

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
                    Follow the dot with your eyes without moving your head. Use the controls to adjust the speed and to start or stop the session.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <EmdrTool />
            </CardContent>
        </Card>
      </div>
    </main>
  );
}
