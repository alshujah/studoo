import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BoxBreathingTool } from './box-breathing-tool';

export const metadata: Metadata = {
  title: 'Box Breathing | Rejoyn',
};

export default function BoxBreathingPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
         <h1 className="font-headline text-xl font-semibold">Box Breathing</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Guided Breathing Exercise</CardTitle>
                <CardDescription>
                    Follow the visual guide to practice the 4-4-4-4 box breathing technique. This simple exercise can help calm your nervous system, reduce stress, and improve focus.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <BoxBreathingTool />
            </CardContent>
        </Card>
      </div>
    </main>
  );
}
