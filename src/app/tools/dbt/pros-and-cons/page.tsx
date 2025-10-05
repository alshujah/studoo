
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ProsAndConsTool } from './pros-and-cons-tool';

export const metadata: Metadata = {
  title: 'Pros and Cons | Rejoyn',
};

export default function ProsAndConsPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">DBT Skill: Pros & Cons</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Weighing Your Options</CardTitle>
            <CardDescription>
              This tool helps you think through the consequences of acting on a crisis urge versus resisting it. Seeing all the pros and cons laid out can help you make a more mindful choice.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ProsAndConsTool />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
