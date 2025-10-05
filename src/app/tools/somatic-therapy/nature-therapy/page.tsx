
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Leaf, Sun, Wind, Ear } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Nature Therapy (Ecotherapy) | Rejoyn',
};

export default function NatureTherapyPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">Nature Therapy (Ecotherapy)</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Connecting with Nature for Wellbeing</CardTitle>
            <CardDescription>
              Ecotherapy, or nature therapy, is based on the idea that people have a deep connection to their environment and that spending time in nature can promote healing and mental health.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert>
              <Leaf className="h-4 w-4" />
              <AlertTitle>The Healing Power of Nature</AlertTitle>
              <AlertDescription>
                Even small doses of nature can reduce stress, improve mood, and increase feelings of vitality. This page offers simple ways to integrate nature into your life.
              </AlertDescription>
            </Alert>

            <div className="grid md:grid-cols-2 gap-6">
                 <Card className="bg-muted/30">
                    <CardHeader>
                        <CardTitle className="text-lg">Outdoor Activities</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="p-4 border rounded-lg bg-background">
                            <h4 className="font-semibold flex items-center gap-2"><Sun className="size-5 text-primary" />Mindful Walk</h4>
                            <p className="text-sm text-muted-foreground mt-2">Go for a walk in a park or natural space. Pay attention to the sensations: the feeling of the sun on your skin, the sound of leaves crunching, the smell of the air. Simply observe without judgment.</p>
                        </div>
                        <div className="p-4 border rounded-lg bg-background">
                            <h4 className="font-semibold flex items-center gap-2"><Wind className="size-5 text-primary" />Sit Spot</h4>
                            <p className="text-sm text-muted-foreground mt-2">Find a comfortable spot to sit outdoors for 10-15 minutes. Watch the world go by. Notice the birds, the movement of clouds, the way the light changes. Let yourself just be part of the landscape.</p>
                        </div>
                    </CardContent>
                </Card>
                 <Card className="bg-muted/30">
                    <CardHeader>
                        <CardTitle className="text-lg">Indoor Activities</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="p-4 border rounded-lg bg-background">
                            <h4 className="font-semibold flex items-center gap-2"><Leaf className="size-5 text-primary" />Bring Nature In</h4>
                            <p className="text-sm text-muted-foreground mt-2">Bring a plant into your living or workspace. Tending to a plant, watering it, and watching it grow can be a simple, grounding daily ritual.</p>
                        </div>
                        <div className="p-4 border rounded-lg bg-background">
                            <h4 className="font-semibold flex items-center gap-2"><Ear className="size-5 text-primary" />Nature Sounds</h4>
                            <p className="text-sm text-muted-foreground mt-2">Listen to recordings of natural sounds like rain, birdsong, or ocean waves. Close your eyes and allow the sounds to transport you to a peaceful, natural setting.</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
