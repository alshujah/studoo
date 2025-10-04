import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArtTherapyTool } from './art-therapy-tool';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Brush } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Art Therapy Canvas | Rejoyn',
};

export default function ArtTherapyCanvasPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
         <h1 className="font-headline text-xl font-semibold">Art Therapy Canvas</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Express Yourself</CardTitle>
                <CardDescription>
                    Use this canvas to draw whatever you're feeling. There's no right or wrong way to do it. Focus on colors, shapes, and lines that express your inner state.
                </CardDescription>
            </CardHeader>
            <CardContent>
                 <Alert className="mb-8">
                    <Brush className="h-4 w-4" />
                    <AlertTitle>Focus on Process, Not Product</AlertTitle>
                    <AlertDescription>
                        The goal of art therapy is not to create a masterpiece, but to engage in the creative process for self-discovery and emotional release.
                    </AlertDescription>
                </Alert>
                <ArtTherapyTool />
            </CardContent>
        </Card>
      </div>
    </main>
  );
}
