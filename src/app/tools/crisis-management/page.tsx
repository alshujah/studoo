import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Crisis Management | Zenith',
};

const crisisTools = [
    { title: "Crisis Support Hotline Links", description: "Direct connections to crisis services." },
    { title: "Emergency Contact Quick Access", description: "Quickly contact your support system." },
    { title: "Safety Planning Tools", description: "Create personalized crisis plans." },
    { title: "Self-Harm Alternatives", description: "Find alternative coping strategies." },
    { title: "Panic Attack Assistance", description: "Guided help during a panic attack." },
    { title: "SOS/Emergency Button", description: "Alert your emergency contacts." },
    { title: "Warning Sign Identification", description: "Recognize your personal crisis warning signs." },
    { title: "Suicide Risk Assessment", description: "Access resources for suicide risk management." },
    { title: "Crisis Text Line Integration", description: "Connect with a crisis counselor via text." },
    { title: "Therapist/Emergency Contact Alerts", description: "Notify your support system in a crisis." },
    { title: "Flashback Coping Strategies", description: "Tools to manage flashbacks." },
    { title: "Trigger Management Plans", description: "Develop plans to manage triggers." },
];

export default function CrisisManagementPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="font-headline text-2xl font-semibold md:text-3xl">Crisis Management</h1>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {crisisTools.map((tool) => (
            <Card key={tool.title}>
                <CardHeader>
                    <CardTitle>{tool.title}</CardTitle>
                    <CardDescription>{tool.description}</CardDescription>
                </CardHeader>
            </Card>
        ))}
      </div>
    </main>
  );
}
