import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MiracleQuestionTool } from './miracle-question-tool';

export const metadata: Metadata = {
  title: 'The Miracle Question | Rejoyn',
};

export default function MiracleQuestionPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">The Miracle Question</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">A Different Perspective</CardTitle>
            <CardDescription>
              This is a powerful exercise from Solution-Focused Therapy designed to help you think about a positive future, free from your current problems.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <MiracleQuestionTool />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
