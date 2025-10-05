
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SocialSkillsAssessmentForm } from './assessment-form';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export const metadata: Metadata = {
  title: 'Social Skills Assessment | Rejoyn',
};

export default function SocialSkillsAssessmentPage() {
  return (
    <main className="flex flex-1 flex-col">
       <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
         <h1 className="font-headline text-xl font-semibold">Social Skills Assessment</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Social Skills Self-Assessment</CardTitle>
                <CardDescription>
                    This questionnaire helps you reflect on your social skills in different situations. Answer honestly based on your typical behavior over the past month.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Alert className='mb-6'>
                    <AlertTitle>This is a self-reflection tool.</AlertTitle>
                    <AlertDescription>
                        This is not a diagnostic test. The results are intended to help you identify personal strengths and areas for growth.
                    </AlertDescription>
                </Alert>
                <SocialSkillsAssessmentForm />
            </CardContent>
        </Card>
      </div>
    </main>
  );
}
