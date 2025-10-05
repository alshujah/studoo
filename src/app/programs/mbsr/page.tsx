
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Lock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '8-Week MBSR Program | Rejoyn',
};

const programSchedule = [
    { week: 1, title: "Waking Up from Automatic Pilot", focus: "The Body Scan Meditation", unlocked: true, href: "/programs/mbsr/week-1" },
    { week: 2, title: "Living in Our Heads", focus: "Mindful Breathing & Pleasant Events", unlocked: true, href: "/programs/mbsr/week-2" },
    { week: 3, title: "Gathering the Scattered Mind", focus: "Mindful Movement & Difficult Events", unlocked: true, href: "/programs/mbsr/week-3" },
    { week: 4, title: "The Power of Presence", focus: "Responding vs. Reacting to Stress", unlocked: false },
    { week: 5, title: "Acceptance and Willingness", focus: "Allowing things to be as they are", unlocked: false },
    { week: 6, title: "Thoughts Are Not Facts", focus: "Relating to thoughts differently", unlocked: false },
    { week: 7, title: "How Can I Best Take Care of Myself?", focus: "Integrating mindfulness into daily life", unlocked: false },
    { week: 8, title: "A Mindful Life", focus: "Reviewing progress and future practice", unlocked: false },
];

export default function MBSRProgramPage() {
  return (
    <main className="flex flex-1 flex-col">
       <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
         <h1 className="font-headline text-xl font-semibold">8-Week MBSR Program</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Program Overview</CardTitle>
                <CardDescription>
                    Mindfulness-Based Stress Reduction (MBSR) is a structured 8-week program that introduces you to formal and informal mindfulness practices to help you relate differently to stress and live with greater awareness and ease.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {programSchedule.map(item => (
                    <Card key={item.week} className={!item.unlocked ? 'bg-muted/50' : ''}>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-semibold text-primary">Week {item.week}</p>
                                    <CardTitle>{item.title}</CardTitle>
                                    <CardDescription>{item.focus}</CardDescription>
                                </div>
                                {item.unlocked ? <CheckCircle2 className="size-6 text-green-500" /> : <Lock className="size-6 text-muted-foreground" />}
                            </div>
                        </CardHeader>
                        {item.unlocked && item.href && (
                            <CardContent>
                               <Button asChild>
                                    <Link href={item.href}>
                                        Start Week {item.week} <ArrowRight className="ml-2"/>
                                    </Link>
                               </Button>
                            </CardContent>
                        )}
                    </Card>
                ))}
            </CardContent>
        </Card>
      </div>
    </main>
  );
}
