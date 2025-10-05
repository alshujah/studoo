

import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Brain, Sprout, Shield, Heart, Smile, Moon, Wind, Paintbrush, PersonStanding, Drama, ShieldAlert, Waves, Users, Puzzle, Target, BookText } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { PageLayout } from '@/components/layout/page-layout';

export const metadata: Metadata = {
  title: 'Tools | Rejoyn',
};

const toolCategories = [
    { href: "/tools/cbt", title: "CBT", description: "Cognitive Behavioral Therapy tools.", icon: Brain },
    { href: "/tools/dbt", title: "DBT", description: "Dialectical Behavior Therapy skills.", icon: Waves },
    { href: "/tools/act", title: "ACT", description: "Acceptance & Commitment Therapy.", icon: Heart },
    { href: "/tools/ipt", title: "IPT", description: "Interpersonal Therapy.", icon: Users },
    { href: "/tools/schema-therapy", title: "Schema Therapy", description: "Change long-term patterns.", icon: Puzzle },
    { href: "/tools/solution-focused", title: "SFBT", description: "Solution-Focused Brief Therapy.", icon: Target },
    { href: "/tools/narrative-therapy", title: "Narrative Therapy", description: "Rewrite your story.", icon: BookText },
    { href: "/tools/ptsd", title: "PTSD Support", description: "Specialized tools for trauma.", icon: ShieldAlert },
    { href: "/tools/mindfulness", title: "Mindfulness", description: "Guided meditations and exercises.", icon: Sprout },
    { href: "/tools/positive-psychology", title: "Positive Psychology", description: "Cultivate happiness and resilience.", icon: Smile },
    { href: "/tools/somatic-therapy", title: "Somatic Therapy", description: "Body-based trauma release.", icon: PersonStanding },
    { href: "/tools/relaxation", title: "Relaxation", description: "Calm your mind and body.", icon: Wind },
    { href: "/tools/art-therapy", title: "Expressive Arts", description: "Emotional expression through creativity.", icon: Paintbrush },
    { href: "/tools/psychodynamic", title: "Psychodynamic", description: "Explore unconscious patterns.", icon: Drama },
    { href: "/tools/sleep", title: "Sleep Management", description: "Improve your sleep hygiene.", icon: Moon },
    { href: "/tools/crisis-management", title: "Crisis Management", description: "Immediate support for crisis situations.", icon: Shield },
];

export default function ToolsPage() {
  return (
    <PageLayout title="All Tools">
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
    </PageLayout>
  );
}
