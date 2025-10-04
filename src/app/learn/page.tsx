import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Learn | Zenith',
};

const educationalModules = [
    { title: "Mental Health Condition Information", description: "Psychoeducation on various conditions." },
    { title: "Symptom Explanation Modules", description: "Understand the 'why' behind symptoms." },
    { title: "Treatment Options Overview", description: "Learn about different therapeutic approaches." },
    { title: "Neuroscience Basics", description: "How your brain works." },
    { title: "Stress Response Education", description: "Understand the fight-or-flight response." },
    { title: "Mental Health Myths Debunking", description: "Separating fact from fiction." },
    { title: "Mental Health First Aid Training", description: "Learn how to help others." },
    { title: "Stigma Reduction Content", description: "Promoting open conversations." },
    { title: "Cognitive Biases Education", description: "Learn about common thinking traps." },
    { title: "Therapy Preparation Guides", description: "Get the most out of your therapy." },
    { title: "Recovery Stories/Testimonials", description: "Read stories of hope and recovery." },
    { title: "Communication Skills", description: "Improve your interpersonal effectiveness." },
    { title: "Medication Information", description: "Details on common medications." },
    { title: "Coping Mechanisms Explained", description: "Learn how different strategies work." },
];

export default function LearnPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="font-headline text-2xl font-semibold md:text-3xl">Learn</h1>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {educationalModules.map((module) => (
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
