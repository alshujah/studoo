
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import type { Metadata } from 'next';
import { PageLayout } from '@/components/layout/page-layout';
import { distressToleranceSkills } from '@/lib/data/dbt-data';

export const metadata: Metadata = {
  title: 'Distress Tolerance Skills | Zenith',
};

export default function DistressTolerancePage() {
  return (
    <PageLayout title="Distress Tolerance Skills">
      <div className="space-y-8">
        {distressToleranceSkills.map((skill) => (
            <Card key={skill.title}>
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <skill.icon className="size-8 text-primary" />
                        <div>
                            <CardTitle className="font-headline text-2xl">{skill.acronym}</CardTitle>
                            <CardDescription>{skill.title}</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{skill.description}</p>
                    <div className="space-y-3 pt-2">
                        {skill.steps.map(step => (
                            <div key={step.name} className="p-3 border rounded-md bg-background">
                               <h4 className="font-semibold">{step.name}</h4>
                               <p className="text-sm text-muted-foreground">{step.detail}</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        ))}
      </div>
    </PageLayout>
  );
}
