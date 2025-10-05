
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Anchor, Baby, Film, ListChecks, Map, Network, ShieldAlert, ShieldBan, Swords, History, TrendingUp, Users, Building, Workflow } from 'lucide-react';
import { PageLayout } from '@/components/layout/page-layout';

export const metadata: Metadata = {
  title: 'PTSD Support | Rejoyn',
};

const ptsdTools = [
    { title: "Trauma Timeline Creator", description: "Visual mapping of traumatic events.", icon: Map },
    { title: "Trigger Identification System", description: "Comprehensive trigger logging and pattern analysis.", icon: ListChecks },
    { href: "/tools/relaxation", title: "Flashback Grounding Toolkit", description: "5-4-3-2-1 technique and other grounding exercises.", icon: Anchor },
    { title: "Nightmares Rescripting Tool", description: "Imagery rehearsal therapy for trauma nightmares.", icon: Film },
    { title: "Hypervigilance Reduction Training", description: "Exercises to reduce constant alertness.", icon: ShieldAlert },
    { href: "/tools/relaxation", title: "Dissociation Management Tools", description: "Reality testing and anchoring techniques.", icon: Anchor },
    { title: "Complex PTSD Workbook", description: "Resources for understanding and healing from complex trauma.", icon: Network },
    { title: "Military/Combat PTSD Support", description: "Specific information and resources for veterans.", icon: Swords },
    { title: "Sexual Trauma Recovery Program", description: "Guidance and support for survivors of sexual trauma.", icon: ShieldBan },
    { title: "Childhood Trauma Integration", description: "Tools for understanding and integrating childhood experiences.", icon: Baby },
    { title: "Trauma Memory Reconsolidation", description: "Exercises to update and reconsolidate traumatic memories.", icon: History },
    { title: "Post-Trauma Growth Tracking", description: "Identify and cultivate positive changes after trauma.", icon: TrendingUp },
    { title: "Vicarious Trauma Support", description: "Support for caregivers and professionals exposed to trauma.", icon: Users },
    { title: "Collective Trauma Processing", description: "Tools for processing trauma experienced by a group or community.", icon: Building },
    { title: "Intergenerational Trauma Work", description: "Understanding and addressing trauma passed down through generations.", icon: Workflow }
];

export default function PTSDPage() {
  return (
    <PageLayout title="PTSD Support Tools">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {ptsdTools.map((tool) => {
          const card = (
            <Card className="h-full">
              <CardHeader>
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
