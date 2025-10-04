import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Track | Zenith Wellness',
};

export default function TrackPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="font-headline text-2xl font-semibold md:text-3xl">Track</h1>
      </div>
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            Tracking features coming soon
          </h3>
          <p className="text-sm text-muted-foreground">
            Log your mood, sleep, activities, and more.
          </p>
        </div>
      </div>
    </main>
  );
}
