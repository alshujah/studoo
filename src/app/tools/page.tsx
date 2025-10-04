import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Brain, Sprout, Shield, Heart, Smile, Moon, HelpCircle, Wind } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Tools | Zenith',
};

const toolCategories = [
    { href: "/tools/cbt", title: "CBT", description: "Cognitive Behavioral Therapy tools.", icon: Brain },
    { href: "/tools/dbt", title: "DBT", description: "Dialectical Behavior Therapy skills.", icon: Shield },
    { href: "/tools/act", title: "ACT", description: "Acceptance & Commitment Therapy.", icon: Heart },
    { href: "/tools/mindfulness", title: "Mindfulness", description: "Guided meditations and exercises.", icon: Sprout },
    { href: "/tools/positive-psychology", title: "Positive Psychology", description: "Cultivate happiness and resilience.", icon: Smile },
    { href: "/tools/sleep", title: "Sleep Management", description: "Improve your sleep hygiene.", icon: Moon },
    { href: "/tools/crisis-management", title: "Crisis Management", description: "Immediate support for crisis situations.", icon: HelpCircle },
    { href: "/tools/relaxation", title: "Relaxation Techniques", description: "Calm your mind and body.", icon: Wind },
];

export default function ToolsPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="font-headline text-2xl font-semibold md:text-3xl">Tools</h1>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {toolCategories.map((category) => (
            <Link href={category.href} key={category.href} className="block hover:bg-muted/50 rounded-lg">
                <Card className="h-full">
                    <CardHeader className="flex flex-row items-center gap-4">
                        <category.icon className="size-8 text-primary" />
                        <div>
                            <CardTitle>{category.title}</CardTitle>
                            <CardDescription>{category.description}</CardDescription>
                        </div>
                    </CardHeader>
                </Card>
            </Link>
        ))}
      </div>
    </main>
  );
}
