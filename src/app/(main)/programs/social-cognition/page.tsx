
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Lock } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PageLayout } from '@/components/layout/page-layout';

export const metadata: Metadata = {
  title: '6-Week Social Cognition Training | Zenith Wellness',
};

const programSchedule = [
    { week: 1, title: "Identifying Basic Emotions", focus: "Accuracy and speed in recognizing joy, sadness, anger, fear, surprise, and disgust.", exercise: "Emotional Faces Memory Task (Level 1)", unlocked: true, href: "/tools/ipt/efmt" },
    { week: 2, title: "Emotional Intensity", focus: "Distinguishing between subtle, moderate, and intense expressions of the same emotion.", exercise: "EFMT (Level 2)", unlocked: false, href: "" },
    { week: 3, title: "Microexpressions", focus: "Detecting fleeting emotional expressions that last less than a second.", exercise: "EFMT (Level 3)", unlocked: false },
    { week: 4, title: "Complex & Mixed Emotions", focus: "Recognizing blended emotions (e.g., bittersweet joy, anxious excitement).", exercise: "EFMT (Level 4)", unlocked: false },
    { week: 5, title: "Contextual Understanding", focus: "Using situational context to better interpret ambiguous emotional cues.", exercise: "Scenario-Based EFMT", unlocked: false },
    { week: 6, title: "Social Prediction", focus: "Predicting social outcomes based on observed emotional expressions.", exercise: "Predictive EFMT", unlocked: false },
];

export default function SocialCognitionProgramPage() {
  return (
    <PageLayout title="6-Week Social Cognition Training">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Program Overview</CardTitle>
                <CardDescription>
                    This 6-week structured program is designed to enhance your emotional processing and social cognition skills through a series of brain-training exercises based on the Emotional Faces Memory Task (EFMT).
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {programSchedule.map(item => (
                    <Card key={item.week} className={!item.unlocked ? 'bg-muted/50' : ''}>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-primary">Week {item.week}</p>
                                <CardTitle>{item.title}</CardTitle>
                                <CardDescription>{item.focus}</CardDescription>
                            </div>
                            {item.unlocked ? <CheckCircle2 className="size-6 text-green-500" /> : <Lock className="size-6 text-muted-foreground" />}
                        </CardHeader>
                        <CardContent>
                           <p className="text-sm font-medium">Core Exercise: <span className="text-muted-foreground">{item.exercise}</span></p>
                           {item.href && item.unlocked && (
                                <Button asChild variant="link" className="p-0 mt-2">
                                    <Link href={item.href}>Practice this skill</Link>
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </CardContent>
        </Card>
    </PageLayout>
  );
}

    