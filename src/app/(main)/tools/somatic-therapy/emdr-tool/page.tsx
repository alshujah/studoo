
import { PageLayout } from '@/components/layout/page-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Eye, ShieldAlert } from 'lucide-react';
import { BilateralStimulationAnimator } from './bilateral-stimulation-animator';

export default function EmdrToolPage() {
    return (
        <PageLayout title="Bilateral Stimulation Tool">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Visual Bilateral Stimulation</CardTitle>
                    <CardDescription>A tool to aid in Eye Movement Desensitization and Reprocessing (EMDR) by providing a visual stimulus to follow.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                   <BilateralStimulationAnimator />
                    <Alert>
                        <Eye className="h-4 w-4" />
                        <AlertTitle>How to Use</AlertTitle>
                        <AlertDescription>
                            Start the animator and follow the dot with your eyes as it moves from side to side. Try to do this without moving your head. You can adjust the speed to a pace that feels comfortable for you. This is often done while holding a specific memory or feeling in mind.
                        </AlertDescription>
                    </Alert>

                     <Alert variant="destructive">
                        <ShieldAlert className="h-4 w-4" />
                        <AlertTitle>Important Disclaimer</AlertTitle>
                        <AlertDescription>
                            This tool is intended as a resource and is not a substitute for therapy with a trained EMDR professional. EMDR can bring up intense emotions and should ideally be done under the guidance of a qualified therapist.
                        </AlertDescription>
                    </Alert>

                </CardContent>
            </Card>
        </PageLayout>
    );
}
