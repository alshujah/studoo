import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ValuesClarificationTool } from './values-clarification-tool';

export const metadata: Metadata = {
  title: 'Values Clarification | Rejoyn',
};

export default function ValuesClarificationPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">Values Clarification</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Discover What Matters Most</CardTitle>
            <CardDescription>
              This exercise helps you connect with what is truly important and meaningful to you. Your values can act as a compass, guiding your decisions and motivating your actions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ValuesClarificationTool />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
