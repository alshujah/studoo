
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ExposureHierarchyForm } from './exposure-hierarchy-form';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Layers } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Exposure Therapy | Rejoyn',
};

export default function ExposureTherapyPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
         <h1 className="font-headline text-xl font-semibold">CBT: Exposure Therapy</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Build Your Fear Ladder</CardTitle>
                <CardDescription>
                    Exposure therapy helps you gradually face your fears. By creating a hierarchy of feared situations, you can start with manageable steps and work your way up, reducing anxiety over time.
                </CardDescription>
            </CardHeader>
            <CardContent>
                 <Alert className="mb-8">
                    <Layers className="h-4 w-4" />
                    <AlertTitle>Start Low, Go Slow</AlertTitle>
                    <AlertDescription>
                       The key to exposure is to start with situations that cause mild anxiety and gradually move to more challenging ones as you build confidence. The goal is to learn that you can handle the feeling of anxiety.
                    </AlertDescription>
                </Alert>
                <ExposureHierarchyForm />
            </CardContent>
        </Card>
      </div>
    </main>
  );
}

    
