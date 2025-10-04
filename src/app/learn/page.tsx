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
    { title: "Help-Seeking Education", description: "Learn how and when to seek help." },
    { title: "Self-Advocacy Skills", description: "Learn to advocate for your own needs." },
    { title: "Evidence-Based Practice Explanations", description: "Understand what works and why." },
    { title: "Research Article Summaries", description: "Digestible summaries of new research." },
    { title: "Expert Interviews", description: "Hear from leading mental health experts." },
    { title: "Relationship Management Tips", description: "Improve your relationships." },
    { title: "Conflict Resolution Strategies", description: "Learn to navigate disagreements." },
    { title: "Boundary-Setting Guidance", description: "Protect your energy and well-being." },
    { title: "Video Lessons", description: "Engaging video content on various topics." },
    { title: "Audio Content/Podcasts", description: "Listen to experts and stories on the go." },
    { title: "Infographics", description: "Visually engaging educational content." },
    { title: "Interactive Modules", description: "Hands-on learning experiences." },
    { title: "Quizzes/Knowledge Checks", description: "Test your understanding." },
    { title: "Case Studies", description: "Learn from real-life examples." },
    { title: "Fight-or-Flight Explanation", description: "Understand your body's stress reaction." },
    { title: "Coping Self-Efficacy Scale", description: "Evaluate your confidence in coping." },
    { title: "Trauma Screening Tools (PCL-5)", description: "Screen for post-traumatic stress." },
    { title: "Eating Disorder Screening", description: "Tools for early identification." },
    { title: "ADHD Assessment Tools", description: "Screening for attention-deficit hyperactivity." },
    { title: "Autism Spectrum Screening", description: "Tools for autism spectrum traits." },
    { title: "Relationship Health Evaluation", description: "Assess the health of your relationships." },
    { title: "Moderated Community Forums", description: "Connect with others in a safe space." },
    { title: "Anonymous Peer Chat", description: "Talk with peers without revealing your identity." },
    { title: "Support Groups", description: "Join groups based on condition or demographic." },
    { title: "Buddy/Accountability System", description: "Partner up for mutual support." },
    { title: "Story Sharing Platforms", description: "Share and read stories of recovery." },
    { title: "Peer Mentorship Programs", description: "Get guidance from a trained peer." },
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
