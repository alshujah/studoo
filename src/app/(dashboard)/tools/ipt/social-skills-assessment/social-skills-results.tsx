
'use client';

import { Button } from '@/components/ui/button';
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { SocialSkillAssessment } from '@/types';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend } from 'recharts';

interface SocialSkillsResultsProps {
  result: SocialSkillAssessment;
  onReset: () => void;
}

export function SocialSkillsResults({ result, onReset }: SocialSkillsResultsProps) {
    const chartData = Object.entries(result.scores).map(([name, value]) => ({
        domain: name,
        score: value,
        fullMark: 10,
    }));

  return (
    <div className="space-y-6">
        <CardHeader className="p-0">
            <CardTitle>Your Social Skills Snapshot</CardTitle>
            <CardDescription>
                Here is a visualization of your self-rated social skills. This is a tool for reflection, not a diagnosis.
            </CardDescription>
        </CardHeader>
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="w-full aspect-square">
                 <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="domain" />
                      <PolarRadiusAxis angle={30} domain={[0, 10]} />
                      <Radar name="Your Score" dataKey="score" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.6} />
                      <Legend />
                    </RadarChart>
                  </ResponsiveContainer>
            </div>

            <div className="space-y-4">
                {Object.entries(result.scores).map(([domain, score]) => (
                    <div key={domain}>
                        <h3 className="font-semibold">{domain}</h3>
                        <div className="flex items-center gap-2">
                           <div className="w-full bg-muted rounded-full h-2.5">
                               <div className="bg-primary h-2.5 rounded-full" style={{ width: `${score * 10}%` }}></div>
                           </div>
                           <span className="text-sm font-bold">{score}/10</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        <Button onClick={onReset} variant="outline">Take Assessment Again</Button>
    </div>
  );
}
