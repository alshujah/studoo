import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profile | Zenith',
};

const profileModules = [
    { title: "Goal Setting Tools", description: "Define and track your wellness goals." },
    { title: "Vision Board Creation", description: "Visualize your ideal future." },
    { title: "Habit Building Support", description: "Form positive, lasting habits." },
    { title: "Achievement Badges", description: "Celebrate your progress and milestones." },
    { title: "Streak Tracking", description: "Maintain momentum with daily streaks." },
    { title: "Personal Growth Metrics", description: "Track your journey over time." },
];

export default function ProfilePage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="font-headline text-2xl font-semibold md:text-3xl">Profile</h1>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {profileModules.map((module) => (
            <Card key={module.title}>
                <CardHeader>
                    <CardTitle>{module.title}</CardTitle>
                    <CardDescription>{module.description}</CardDescription>
                </CardHeader>
            </Card>
        ))}
      </div>
    </main>
  );
}
