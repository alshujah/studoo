
import type { Metadata } from 'next';
import { DanceTherapyTool } from './dance-therapy-tool';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Dance & Movement Therapy | Rejoyn',
};

export default function DanceTherapyPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
         <h1 className="font-headline text-xl font-semibold">Dance & Movement Therapy</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Guided Movement Session</CardTitle>
                <CardDescription>
                    This tool uses your camera to create a virtual mirror. Follow the prompts to engage in a body-based therapeutic exercise. The goal is to connect with your body and express emotions through movement.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <DanceTherapyTool />
            </CardContent>
        </Card>
      </div>
    </main>
  );
}
