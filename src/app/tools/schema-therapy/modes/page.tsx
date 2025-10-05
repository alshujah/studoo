
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Drama } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export const metadata: Metadata = {
  title: 'Schema Modes | Rejoyn',
};

const modes = [
    { 
        category: "Child Modes",
        description: "These are our innate, core feeling states.",
        items: [
            { name: "Vulnerable Child", text: "Feels lonely, isolated, sad, misunderstood, unsupported, defective, deprived, overwhelmed, incompetent, needy, helpless, hopeless, frightened, anxious, worried, victimized, worthless, unloved, unlovable, lost, directionless, fragile, weak, defeated, or oppressed." },
            { name: "Angry Child", text: "Feels intensely angry, enraged, infuriated, frustrated, or impatient because the core emotional (or physical) needs of the vulnerable child are not being met." },
            { name: "Impulsive / Undisciplined Child", text: "Acts on non-core desires or impulses in a selfish or uncontrolled manner to get his or her own way and often has difficulty delaying gratification." },
            { name: "Contented / Happy Child", text: "Feels loved, contented, connected, satisfied, fulfilled, protected, and safe because core emotional needs are being met." },
        ]
    },
    { 
        category: "Dysfunctional Coping Modes",
        description: "These are overused coping strategies we learned to survive, but which now cause problems.",
        items: [
            { name: "Compliant Surrenderer", text: "Acts in a passive, subservient, submissive, or self-deprecating way around others out of fear of conflict or rejection. Tolerates abuse and/or does not express healthy needs and desires." },
            { name: "Detached Protector", text: "Cuts off needs and feelings, detaches emotionally from people, and rejects their help. May feel withdrawn, spacey, distracted, disconnected, depersonalized, empty, or bored." },
            { name: "Overcompensator", text: "Acts in an excessively grand, aggressive, dominant, competitive, or arrogant manner to compensate for underlying feelings of defectiveness or deprivation." },
        ]
    },
    { 
        category: "Dysfunctional Parent Modes",
        description: "These are internalized voices of critical or demanding caregivers.",
        items: [
            { name: "Punitive Parent", text: "The internalized voice that is punishing, critical, and unforgiving towards oneself. Believes 'I deserve to be punished'." },
            { name: "Demanding Parent", text: "The internalized voice that pushes and pressures you to meet excessively high standards. Believes 'I must be perfect'." },
        ]
    },
     { 
        category: "Healthy Modes",
        description: "This is the goal of therapy.",
        items: [
            { name: "Healthy Adult", text: "This is your compassionate, strong, and wise self. The Healthy Adult nurtures the Vulnerable Child, sets limits for the Angry and Impulsive Child, and gradually replaces the dysfunctional coping and parent modes. It performs appropriate adult functions such as working, parenting, and taking responsibility." },
        ]
    }
];

export default function SchemaModesPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">Schema Modes</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Understanding Your Modes</CardTitle>
            <CardDescription>
              A schema mode is the emotional state, including thoughts and behaviors, that is active for you at a given moment. We all have different modes, but in Schema Therapy, we focus on identifying the ones that are causing problems and strengthening your "Healthy Adult" mode.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert>
              <Drama className="h-4 w-4" />
              <AlertTitle>The Cast of Your Inner World</AlertTitle>
              <AlertDescription>
                Think of modes as the different "parts" of you that take the stage at different times. The goal is to get to know them all and help your Healthy Adult become a compassionate director of the show.
              </AlertDescription>
            </Alert>

            <Accordion type="multiple" className="w-full space-y-4">
              {modes.map((modeCategory) => (
                <AccordionItem value={modeCategory.category} key={modeCategory.category} className="border-b-0 rounded-lg border p-4 bg-muted/20">
                  <AccordionTrigger className="py-2 text-left hover:no-underline">
                    <div>
                        <h3 className="text-lg font-semibold">{modeCategory.category}</h3>
                        <p className="text-sm text-muted-foreground text-left">{modeCategory.description}</p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4 space-y-3">
                    {modeCategory.items.map((item) => (
                      <div key={item.name} className="p-3 border rounded-md bg-background">
                        <h4 className="font-semibold text-primary">{item.name}</h4>
                        <p className="text-sm mt-1 text-muted-foreground">{item.text}</p>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
