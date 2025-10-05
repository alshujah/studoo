
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Bed, Clock, Sun, Moon, Dumbbell, Coffee } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sleep Hygiene Education | Rejoyn',
};

export default function SleepHygienePage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">Sleep Hygiene Education</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Building Habits for Better Sleep</CardTitle>
            <CardDescription>
              Sleep hygiene refers to the set of habits and practices that are conducive to sleeping well on a regular basis. Improving your sleep hygiene can have a significant impact on your sleep quality and overall mental health.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert>
              <Bed className="h-4 w-4" />
              <AlertTitle>Consistency is Key</AlertTitle>
              <AlertDescription>
                Small, consistent changes to your daily routines can lead to big improvements in your sleep over time.
              </AlertDescription>
            </Alert>

            <div className="grid md:grid-cols-2 gap-6">
                 <Card className="bg-muted/30">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2"><Clock className="size-5 text-primary" />Your Sleep Schedule</CardTitle>
                    </CardHeader>
                    <CardContent className="prose prose-sm max-w-none text-foreground">
                        <ul>
                           <li><strong>Go to bed and wake up around the same time every day</strong>, even on weekends. This helps regulate your body's internal clock.</li>
                           <li><strong>Avoid long naps</strong>, especially in the late afternoon or evening. If you need a nap, keep it short (20-30 minutes).</li>
                        </ul>
                    </CardContent>
                </Card>
                 <Card className="bg-muted/30">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2"><Moon className="size-5 text-primary" />Your Sleep Environment</CardTitle>
                    </CardHeader>
                    <CardContent className="prose prose-sm max-w-none text-foreground">
                        <ul>
                           <li><strong>Keep your bedroom dark, quiet, and cool.</strong> Use blackout curtains, earplugs, or a fan if needed.</li>
                           <li><strong>Reserve your bed for sleep and intimacy only.</strong> Avoid working, eating, or watching TV in bed.</li>
                           <li><strong>Limit exposure to bright light in the evenings.</strong> Blue light from screens (phones, tablets, computers) can interfere with melatonin production.</li>
                        </ul>
                    </CardContent>
                </Card>
                 <Card className="bg-muted/30">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2"><Dumbbell className="size-5 text-primary" />Daily Habits</CardTitle>
                    </CardHeader>
                    <CardContent className="prose prose-sm max-w-none text-foreground">
                        <ul>
                           <li><strong>Get regular physical activity</strong> during the day. Avoid intense exercise close to bedtime.</li>
                           <li><strong>Get some natural sunlight exposure</strong>, especially in the morning. This helps regulate your sleep-wake cycle.</li>
                        </ul>
                    </CardContent>
                </Card>
                 <Card className="bg-muted/30">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2"><Coffee className="size-5 text-primary" />Food and Drink</CardTitle>
                    </CardHeader>
                    <CardContent className="prose prose-sm max-w-none text-foreground">
                         <ul>
                           <li><strong>Avoid large meals, caffeine, and alcohol before bedtime.</strong> Alcohol may make you feel sleepy initially, but it disrupts sleep later in the night.</li>
                           <li><strong>Don't go to bed hungry.</strong> A light snack, like a banana or a small bowl of cereal, is okay.</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
