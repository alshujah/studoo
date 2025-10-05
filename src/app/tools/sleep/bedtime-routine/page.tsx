
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Moon, Wind, BookOpen, Music } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Bedtime Routine Builder | Rejoyn',
};

export default function BedtimeRoutinePage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">Bedtime Routine Builder</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Creating a Wind-Down Ritual</CardTitle>
            <CardDescription>
              A consistent bedtime routine signals to your body and mind that it's time to wind down and prepare for sleep. This ritual helps you transition from the stress of the day to a state of rest.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert>
              <Moon className="h-4 w-4" />
              <AlertTitle>Aim for 30-60 Minutes</AlertTitle>
              <AlertDescription>
                Give yourself at least 30 minutes before your intended bedtime to engage in relaxing activities.
              </AlertDescription>
            </Alert>

            <Card className="bg-muted/30">
                <CardHeader>
                    <CardTitle className="text-lg">Components of a Relaxing Routine</CardTitle>
                    <CardDescription>Mix and match these ideas to create a routine that works for you.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="p-4 border rounded-lg bg-background">
                        <h4 className="font-semibold flex items-center gap-2"><Wind className="size-5 text-primary" />Relaxation Techniques</h4>
                        <p className="text-sm text-muted-foreground mt-2">Engage in activities that calm your nervous system.
                           <br/><Link href="/tools/relaxation" className="text-primary underline">Explore relaxation tools like deep breathing or visualization.</Link>
                        </p>
                    </div>
                     <div className="p-4 border rounded-lg bg-background">
                        <h4 className="font-semibold flex items-center gap-2"><BookOpen className="size-5 text-primary" />Screen-Free Activities</h4>
                        <p className="text-sm text-muted-foreground mt-2">Dim the lights and switch off screens. Try reading a physical book, listening to a podcast, or light stretching.</p>
                    </div>
                     <div className="p-4 border rounded-lg bg-background">
                        <h4 className="font-semibold flex items-center gap-2"><Music className="size-5 text-primary" />Calming Sounds</h4>
                        <p className="text-sm text-muted-foreground mt-2">Listen to calming music, an audiobook, or use a white noise machine to block out disruptive sounds.
                         <br/><Link href="/tools/relaxation/sound-therapy" className="text-primary underline">Try our sound therapy tool.</Link>
                        </p>
                    </div>
                     <div className="p-4 border rounded-lg bg-background">
                        <h4 className="font-semibold flex items-center gap-2"><Moon className="size-5 text-primary" />Prepare for Tomorrow</h4>
                        <p className="text-sm text-muted-foreground mt-2">Write down a to-do list for the next day to get worries out of your head. Lay out your clothes or pack your bag for the morning.</p>
                    </div>
                </CardContent>
            </Card>

          </CardContent>
        </Card>
      </div>
    </main>
  );
}
