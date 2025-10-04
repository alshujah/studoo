import type { Metadata } from 'next';
import { ThoughtRecordForm } from './thought-record-form';

export const metadata: Metadata = {
  title: 'Thought Record | Zenith Wellness',
};

export default function ThoughtRecordPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
         <h1 className="font-headline text-xl font-semibold">Cognitive Restructuring</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <ThoughtRecordForm />
      </div>
    </main>
  );
}
