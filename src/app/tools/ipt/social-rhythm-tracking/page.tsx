
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CalendarClock } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export const metadata: Metadata = {
  title: 'Social Rhythm Tracking | Rejoyn',
};

export default function SocialRhythmTrackingPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">IPT: Social Rhythm Tracking</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Finding Stability in Your Routines</CardTitle>
            <CardDescription>
              Social Rhythm Therapy is based on the idea that instability in our daily routines and social interactions can negatively affect our mood. This tool helps you track your daily rhythms to identify patterns and promote stability.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert>
              <CalendarClock className="h-4 w-4" />
              <AlertTitle>Routines as Anchors</AlertTitle>
              <AlertDescription>
                Regular routines act as powerful anchors for our biological and social clocks (circadian rhythms). When these are stable, our mood is often more stable too.
              </AlertDescription>
            </Alert>

            <Card className="bg-muted/30">
                <CardHeader>
                    <CardTitle className="text-lg">How to Track Your Social Rhythms</CardTitle>
                    <CardDescription>Use a journal or a simple chart to track these key events every day for at least a week.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Activity</TableHead>
                                <TableHead>Target Time</TableHead>
                                <TableHead>Actual Time</TableHead>
                                <TableHead>Who Was Involved?</TableHead>
                                <TableHead>How Did It Feel?</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-medium">Woke up</TableCell>
                                <TableCell>7:00 AM</TableCell>
                                <TableCell></TableCell>
                                <TableCell>N/A</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                             <TableRow>
                                <TableCell className="font-medium">First contact with a person</TableCell>
                                <TableCell>7:15 AM</TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">Started work/school/chores</TableCell>
                                <TableCell>9:00 AM</TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">Lunch</TableCell>
                                <TableCell>12:30 PM</TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">Dinner</TableCell>
                                <TableCell>6:30 PM</TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                             <TableRow>
                                <TableCell className="font-medium">Went to bed</TableCell>
                                <TableCell>11:00 PM</TableCell>
                                <TableCell></TableCell>
                                <TableCell>N/A</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Reflection Questions</CardTitle>
                    <CardDescription>After tracking for a week, ask yourself:</CardDescription>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none text-foreground">
                    <ul>
                        <li><strong>Consistency:</strong> How close were my "Actual Times" to my "Target Times"? Which activities are most consistent? Which are least consistent?</li>
                        <li><strong>Social Contact:</strong> How many people did I interact with each day? Were these interactions energizing or draining?</li>
                        <li><strong>Mood Connection:</strong> On the days my schedule was most inconsistent, how was my mood? On the days it was most regular, how did I feel?</li>
                        <li><strong>Small Changes:</strong> What is one small change I could make to create more regularity in my day? (e.g., waking up at the same time every day, including weekends).</li>
                    </ul>
                </CardContent>
            </Card>

          </CardContent>
        </Card>
      </div>
    </main>
  );
}
