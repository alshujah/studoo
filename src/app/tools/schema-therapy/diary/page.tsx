
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { BookUser } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export const metadata: Metadata = {
  title: 'Schema Diary | Rejoyn',
};

export default function SchemaDiaryPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">Schema Diary</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Tracking Your Patterns</CardTitle>
            <CardDescription>
              A Schema Diary is a tool to increase your awareness of when your schemas and modes are triggered in your daily life. By tracking these moments, you can begin to see the patterns and choose healthier responses.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert>
              <BookUser className="h-4 w-4" />
              <AlertTitle>Awareness is the First Step</AlertTitle>
              <AlertDescription>
                You can't change a pattern until you can see it clearly. This diary is your tool for observation, not judgment.
              </AlertDescription>
            </Alert>

            <Card className="bg-muted/30">
                <CardHeader>
                    <CardTitle className="text-lg">How to Use a Schema Diary</CardTitle>
                    <CardDescription>Each time you have a strong emotional reaction, take a moment to fill out a row in a private journal using this template.</CardDescription>
                </CardHeader>
                <CardContent>
                   <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Triggering Situation</TableHead>
                                    <TableHead>Feelings & Intensity (0-100)</TableHead>
                                    <TableHead>Activated Schema(s)/Mode(s)</TableHead>
                                    <TableHead>What I Did (Coping Response)</TableHead>
                                    <TableHead>Healthier Alternative</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="text-muted-foreground text-xs align-top">My boss gave me critical feedback.</TableCell>
                                    <TableCell className="text-muted-foreground text-xs align-top">Shame (90), Anxiety (70)</TableCell>
                                    <TableCell className="text-muted-foreground text-xs align-top">Defectiveness, Failure</TableCell>
                                    <TableCell className="text-muted-foreground text-xs align-top">Avoided my boss for the rest of the day and obsessed over the feedback.</TableCell>
                                    <TableCell className="text-muted-foreground text-xs align-top">Use a thought record to challenge the 'I'm a failure' thought. Remind myself that feedback is a chance to grow. Thank my boss for the feedback.</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell></TableCell>
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

          </CardContent>
        </Card>
      </div>
    </main>
  );
}
