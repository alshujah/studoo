
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Anchor, Baby, Film, ListChecks, Map, Network, ShieldAlert, ShieldBan, Swords, History, TrendingUp, Users, Building, Workflow } from 'lucide-react';
import { PageLayout } from '@/components/layout/page-layout';

export const metadata: Metadata = {
  title: 'PTSD Support | Rejoyn',
};

const ptsdTools = [
    { href: "/tools/ptsd/grounding", title: "Grounding Techniques", description: "5-4-3-2-1 technique and other grounding exercises.", icon: Anchor },
    { href: "/tools/relaxation/safe-place", title: "Dissociation Management Tools", description: "Reality testing and anchoring techniques.", icon: Anchor },
    { title: "Trigger Identification", description: "Comprehensive trigger logging and pattern analysis.", icon: ListChecks },
    { title: "Flashback Coping Strategies", description: "Learn skills to manage intrusive memories.", icon: History },
    { title: "Hypervigilance Reduction Training", description: "Exercises to reduce constant alertness.", icon: ShieldAlert },
    { title: "Nightmare Rescripting Tool", description: "Imagery rehearsal therapy for trauma nightmares.", icon: Film },
    { title: "Complex PTSD Workbook", description: "Resources for understanding and healing from complex trauma.", icon: Network },
    { title: "Post-Trauma Growth Tracking", description: "Identify and cultivate positive changes after trauma.", icon: TrendingUp },
    { title: "Childhood Trauma Integration", description: "Tools for understanding and integrating childhood experiences.", icon: Baby },
    { title: "Sexual Trauma Recovery Program", description: "Guidance and support for survivors of sexual trauma.", icon: ShieldBan },
    { title: "Military/Combat PTSD Support", description: "Specific information and resources for veterans.", icon: Swords },
    { title: "Vicarious Trauma Support", description: "Support for caregivers and professionals exposed to trauma.", icon: Users },
    { title: "Collective Trauma Processing", description: "Tools for processing trauma experienced by a group or community.", icon: Building },
    { title: "Intergenerational Trauma Work", description: "Understanding and addressing trauma passed down through generations.", icon: Workflow }
];

export default function PTSDPage() {
  return (
    <PageLayout title="PTSD & Trauma Support Tools">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {ptsdTools.map((tool) => {
          const card = (
            <Card className="h-full">
              <CardHeader>
                <tool.icon className="size-6 text-primary mb-2" />
                <CardTitle>{tool.title}</CardTitle>
                <CardDescription>{tool.description}</CardDescription>
              </CardHeader>
            </Card>
          );
          if ((tool as any).href) {
            return (
              <Link href={(tool as any).href} key={tool.title} className="block hover:bg-muted/50 rounded-lg">
                {card}
              </Link>
            );
          }
          return <div key={tool.title}>{card}</div>;
        })}
      </div>
    </PageLayout>
  );
}
