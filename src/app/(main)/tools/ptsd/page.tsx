
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Anchor, Baby, Film, ListChecks, Map, Network, ShieldAlert, ShieldBan, Swords, History, TrendingUp, Users, Building, Workflow } from 'lucide-react';

export const metadata: Metadata = {
  title: 'PTSD Support | Rejoyn',
};

const ptsdTools = [
    { href: "/tools/ptsd/timeline", title: "Trauma Timeline Creator", description: "Visual mapping of traumatic events.", icon: Map },
    { href: "/tools/ptsd/triggers", title: "Trigger Identification System", description: "Comprehensive trigger logging and pattern analysis.", icon: ListChecks },
    { href: "/tools/ptsd/grounding", title: "Flashback Grounding Toolkit", description: "5-4-3-2-1 technique and other grounding exercises.", icon: Anchor },
    { href: "/tools/ptsd/nightmare-rescripting", title: "Nightmares Rescripting Tool", description: "Imagery rehearsal therapy for trauma nightmares.", icon: Film },
    { href: "/tools/ptsd/hypervigilance", title: "Hypervigilance Reduction Training", description: "Exercises to reduce constant alertness.", icon: ShieldAlert },
    { href: "/tools/ptsd/grounding", title: "Dissociation Management Tools", description: "Reality testing and anchoring techniques.", icon: Anchor },
    { href: "/tools/ptsd/complex-ptsd", title: "Complex PTSD Workbook", description: "Resources for understanding and healing from complex trauma.", icon: Network },
    { href: "/tools/ptsd/military-combat-support", title: "Military/Combat PTSD Support", description: "Specific information and resources for veterans.", icon: Swords },
    { href: "/tools/ptsd/sexual-trauma-recovery", title: "Sexual Trauma Recovery Program", description: "Guidance and support for survivors of sexual trauma.", icon: ShieldBan },
    { href: "/tools/ptsd/childhood-trauma-integration", title: "Childhood Trauma Integration", description: "Tools for understanding and integrating childhood experiences.", icon: Baby },
    { href: "/tools/ptsd/trauma-memory-reconsolidation", title: "Trauma Memory Reconsolidation", description: "Exercises to update and reconsolidate traumatic memories.", icon: History },
    { href: "/tools/ptsd/post-trauma-growth", title: "Post-Trauma Growth Tracking", description: "Identify and cultivate positive changes after trauma.", icon: TrendingUp },
    { href: "/tools/ptsd/vicarious-trauma", title: "Vicarious Trauma Support", description: "Support for caregivers and professionals exposed to trauma.", icon: Users },
    { href: "/tools/ptsd/collective-trauma", title: "Collective Trauma Processing", description: "Tools for processing trauma experienced by a group or community.", icon: Building },
    { href: "/tools/ptsd/intergenerational-trauma", title: "Intergenerational Trauma Work", description: "Understanding and addressing trauma passed down through generations.", icon: Workflow }
];

export default function PTSDPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="font-headline text-2xl font-semibold md:text-3xl">PTSD Support Tools</h1>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {ptsdTools.map((tool) => (
            <Link href={tool.href || '#'} key={tool.title} className="block hover:bg-muted/50 rounded-lg">
                <Card className="h-full">
                    <CardHeader>
                        <CardTitle>{tool.title}</CardTitle>
                        <CardDescription>{tool.description}</CardDescription>
                    </CardHeader>
                </Card>
            </Link>
        ))}
      </div>
    </main>
  );
}

