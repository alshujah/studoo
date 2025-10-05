
'use client';

import type { Metadata } from 'next';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { SocialSkillsAssessmentForm } from './social-skills-assessment-form';
import { useState } from 'react';
import type { SocialSkillAssessment } from '@/lib/types';
import { SocialSkillsResults } from './social-skills-results';
import { PageLayout } from '@/components/layout/page-layout';


export default function SocialSkillsAssessmentPage() {
    const [assessmentResult, setAssessmentResult] = useState<SocialSkillAssessment | null>(null);

    const handleReset = () => {
        setAssessmentResult(null);
    }

  return (
    <PageLayout title="Social Skills Assessment">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">How are your social skills?</CardTitle>
                <CardDescription>
                    Rate yourself on the following statements to get a snapshot of your social strengths and areas for growth.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Alert className='mb-6'>
                    <AlertTitle>This is a self-reflection tool.</AlertTitle>
                    <AlertDescription>
                        Be honest with your answers. The goal is to gain self-awareness, not to get a perfect score.
                    </AlertDescription>
                </Alert>
                {assessmentResult ? (
                    <SocialSkillsResults result={assessmentResult} onReset={handleReset} />
                ) : (
                    <SocialSkillsAssessmentForm setAssessmentResult={setAssessmentResult} />
                )}
            </CardContent>
        </Card>
    </PageLayout>
  );
}
