
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ListChecks, Target } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export const metadata: Metadata = {
  title: 'Trigger Identification System | Rejoyn',
};

export default function TriggerIdentificationPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">Trigger Identification System</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Understanding Your Triggers</CardTitle>
            <CardDescription>
              A trigger is any sight, sound, smell, thought, or feeling that reminds you of a traumatic event, often leading to a flashback or intense emotional reaction. Identifying your triggers is a critical step in managing PTSD symptoms and regaining a sense of control.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert>
              <Target className="h-4 w-4" />
              <AlertTitle>Knowledge is Power</AlertTitle>
              <AlertDescription>
                By understanding what triggers you, you can anticipate difficult situations, prepare coping strategies, and reduce the element of surprise that often makes reactions more intense.
              </AlertDescription>
            </Alert>

            <Card className="bg-muted/30">
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-3"><ListChecks className="size-6 text-primary" />The Trigger Log</CardTitle>
                    <CardDescription>Use a private journal to create a "Trigger Log." Each time you experience a strong emotional reaction or flashback, try to fill out a new entry when you feel safe enough to do so.</CardDescription>
                </CardHeader>
                <CardContent>
                   <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date/Time</TableHead>
                                    <TableHead>Trigger (What happened?)</TableHead>
                                    <TableHead>Reaction (Thoughts, Feelings, Body)</TableHead>
                                    <TableHead>Coping Strategy Used</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="text-muted-foreground text-xs align-top">July 26, 3:15 PM</TableCell>
                                    <TableCell className="text-muted-foreground text-xs align-top">
                                        <strong>External:</strong> A car backfired outside.<br/>
                                        <strong>Internal:</strong> Thought, "I'm not safe."
                                    </TableCell>
                                    <TableCell className="text-muted-foreground text-xs align-top">
                                        <strong>Feeling:</strong> Intense fear (9/10).<br/>
                                        <strong>Body:</strong> Heart racing, sweating, tense muscles.
                                    </TableCell>
                                    <TableCell className="text-muted-foreground text-xs align-top">Used 5-4-3-2-1 grounding. Felt a bit better after a few minutes.</TableCell>
                                </TableRow>
                                 <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Analyzing Your Log</CardTitle>
                    <CardDescription>After a week or two, review your log and look for patterns. Ask yourself:</CardDescription>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none text-foreground">
                    <ul>
                        <li>Are there specific <strong>places, people, or times of day</strong> that frequently appear?</li>
                        <li>What <strong>internal triggers</strong> (thoughts, memories, feelings) are most common?</li>
                        <li>What <strong>coping strategies</strong> seem to work best for you?</li>
                        <li>Are there any triggers you weren't aware of before?</li>
                    </ul>
                </CardContent>
            </Card>

          </CardContent>
        </Card>
      </div>
    </main>
  );
}
