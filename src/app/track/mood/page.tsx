import type { Metadata } from 'next';
import { MoodCheckInForm } from './mood-check-in-form';

export const metadata: Metadata = {
  title: 'Mood Check-in | Zenith',
};

export default function MoodCheckInPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
         <h1 className="font-headline text-xl font-semibold">Mood Check-in</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <MoodCheckInForm />
      </div>
    </main>
  );
}
