
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Metadata } from 'next';
import Link from 'next/link';
import { PageLayout } from '@/components/layout/page-layout';
import { Brain, Heart, Wind, Star, Users, Shield, Anchor, Layers, CircleUser, Speech, Hand, Palette } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Therapeutic Tools | Zenith',
};

const toolCategories = [
    { href: "/tools/cbt", title: "Cognitive Behavioral Therapy (CBT)", description: "Change patterns of thinking or behavior.", icon: Brain },
    { href: "/tools/dbt", title: "Dialectical Behavior Therapy (DBT)", description: "Live in the moment, cope with stress, regulate emotions.", icon: Heart },
    { href: "/tools/act", title: "Acceptance & Commitment Therapy (ACT)", description: "Accept your thoughts and feelings and commit to action.", icon: Hand },
    { href: "/tools/mindfulness", title: "Mindfulness", description: "Become more aware of the present moment.", icon: Wind },
    { href: "/tools/positive-psychology", title: "Positive Psychology", description: "Focus on strengths to build a life of meaning and purpose.", icon: Star },
    { href: "/tools/ipt", title: "Interpersonal Therapy (IPT)", description: "Improve your relationships and social functioning.", icon: Users },
    { href: "/tools/crisis-management", title: "Crisis Management", description: "Tools for immediate help in a crisis.", icon: Shield },
    { href: "/tools/schema-therapy", title: "Schema Therapy", description: "Address longstanding, self-defeating life patterns.", icon: Layers },
    { href: "/tools/psychodynamic", title: "Psychodynamic & Relational", description: "Explore how your past influences your present.", icon: CircleUser },
    { href: "/tools/narrative-therapy", title: "Narrative Therapy", description: "Rewrite your story and find new meanings.", icon: Speech },
    { href: "/tools/somatic-therapy", title: "Somatic & Body-Based", description: "Connect with your body's wisdom for healing.", icon: Anchor },
    { href: "/tools/art-therapy", title: "Expressive Arts", description: "Use creativity for healing and self-expression.", icon: Palette },
];

export default function ToolsPage() {
  return (
    <PageLayout title="Therapeutic Tools">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {toolCategories.map((tool) => (
            <Link href={tool.href} key={tool.title} className="block hover:bg-muted/50 rounded-lg">
                <Card className="h-full">
                    <CardHeader>
                        <tool.icon className="size-6 text-primary mb-2" />
                        <CardTitle>{tool.title}</CardTitle>
                        <CardDescription>{tool.description}</CardDescription>
                    </CardHeader>
                </Card>
            </Link>
        ))}
      </div>
    </PageLayout>
  );
}

