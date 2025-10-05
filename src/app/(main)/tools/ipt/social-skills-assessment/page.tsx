
'use client';

import type { Metadata } from 'next';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { SocialSkillsAssessmentForm } from './social-skills-assessment-form';
import { useState } from 'react';
import type { SocialSkillAssessment } from '@/lib/types';
import { SocialSkillsResults } from './social-skills-results';

// export const metadata: Metadata = { // Metadata must be exported from server components
//   title: 'Social Skills Assessment | Rejoyn',
// };

export default function SocialSkillsAssessmentPage() {
    const [assessmentResult, setAssessmentResult] = useState<SocialSkillAssessment | null>(null);

    const handleReset = () => {
        setAssessmentResult(null);
    }

  return (
    <main className="flex flex-1 flex-col">
       <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
         <h1 className="font-headline text-xl font-semibold">Social Skills Assessment</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
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
      </div>
    </main>
  );
}
