import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { StrengthsFinderTool } from './strengths-finder-tool';

export const metadata: Metadata = {
  title: 'Strengths Finder | Rejoyn',
};

export default function StrengthsFinderPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">Strengths Finder</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Discover Your Character Strengths</CardTitle>
            <CardDescription>
              This exercise helps you identify your core strengths. Understanding and using your strengths can lead to greater well-being, happiness, and success.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <StrengthsFinderTool />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
