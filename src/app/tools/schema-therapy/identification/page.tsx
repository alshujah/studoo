
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SchemaIdentificationTool } from './schema-identification-tool';

export const metadata: Metadata = {
  title: 'Schema Identification | Rejoyn',
};

export default function SchemaIdentificationPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">Schema Identification</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Discover Your Core Patterns</CardTitle>
            <CardDescription>
              This exercise helps you identify Early Maladaptive Schemas - longstanding, self-defeating patterns of thinking, feeling, and behaving. Recognizing them is the first step toward change.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SchemaIdentificationTool />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
