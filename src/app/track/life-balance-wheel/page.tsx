
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Target } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend } from 'recharts';
import { PageLayout } from '@/components/layout/page-layout';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { useAuth, useFirestore } from '@/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { Loader } from 'lucide-react';
import { FirestorePermissionError } from '@/firebase/errors';
import { errorEmitter } from '@/firebase/error-emitter';

const initialDomains = [
    { name: "Career / Work", satisfaction: 5 },
    { name: "Finances", satisfaction: 5 },
    { name: "Health", satisfaction: 5 },
    { name: "Family & Friends", satisfaction: 5 },
    { name: "Romance", satisfaction: 5 },
    { name: "Personal Growth", satisfaction: 5 },
    { name: "Fun & Recreation", satisfaction: 5 },
    { name: "Environment", satisfaction: 5 },
];

export default function LifeBalanceWheelPage() {
  const [domains, setDomains] = useState(initialDomains);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const auth = useAuth();
  const [user] = useAuthState(auth);
  const firestore = useFirestore();
  const { toast } = useToast();

  const handleSliderChange = (domainName: string, value: number) => {
    setDomains(domains.map(d => d.name === domainName ? { ...d, satisfaction: value } : d));
  };
  
  const handleSave = async () => {
      if (!user) {
          toast({ variant: 'destructive', title: 'Not signed in', description: 'You must be logged in to save.'});
          return;
      }
      setIsSubmitting(true);
      const scoreData = {
          userId: user.uid,
          domains,
          timestamp: serverTimestamp()
      };
      const scoresCollection = collection(firestore, 'users', user.uid, 'lifeBalanceScores');
      
      addDoc(scoresCollection, scoreData)
        .then(() => {
            toast({ title: 'Saved!', description: 'Your life balance snapshot has been saved.'});
        })
        .catch(err => {
            const permissionError = new FirestorePermissionError({
                path: scoresCollection.path,
                operation: 'create',
                requestResourceData: scoreData,
            });
            errorEmitter.emit('permission-error', permissionError);
        })
        .finally(() => {
            setIsSubmitting(false);
        });
  }

  return (
    <PageLayout title="Life Balance Wheel">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Assess Your Life Balance</CardTitle>
            <CardDescription>
              The Life Balance Wheel is a coaching tool that helps you visualize your level of satisfaction in different areas of your life. It provides a snapshot to help you identify which areas might need more attention.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <Alert>
              <Target className="h-4 w-4" />
              <AlertTitle>A Tool for Reflection</AlertTitle>
              <AlertDescription>
                Rate your current level of satisfaction in each area on a scale of 0 (not at all satisfied) to 10 (fully satisfied). The goal is to increase your awareness of how you're distributing your energy and attention.
              </AlertDescription>
            </Alert>
            
            <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="w-full aspect-square">
                     <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={domains}>
                          <PolarGrid />
                          <PolarAngleAxis dataKey="name" />
                          <PolarRadiusAxis angle={30} domain={[0, 10]} />
                          <Radar name="Satisfaction" dataKey="satisfaction" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.6} />
                          <Legend />
                        </RadarChart>
                      </ResponsiveContainer>
                </div>

                <div className="space-y-6">
                    {domains.map(domain => (
                        <div key={domain.name}>
                            <label className="font-medium">{domain.name}: {domain.satisfaction}</label>
                            <Slider 
                                value={[domain.satisfaction]}
                                onValueChange={(value) => handleSliderChange(domain.name, value[0])}
                                max={10}
                                step={1}
                                className="mt-2"
                            />
                        </div>
                    ))}
                </div>
            </div>
            <Button onClick={handleSave} disabled={isSubmitting}>
                {isSubmitting ? <Loader className="mr-2 animate-spin" /> : null}
                Save Snapshot
            </Button>
          </CardContent>
        </Card>
    </PageLayout>
  );
}

    