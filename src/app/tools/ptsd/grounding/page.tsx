import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Anchor, Brain, Ear, Hand, Eye } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Flashback Grounding Toolkit | Rejoyn',
};

const mentalGroundingTechniques = [
  {
    title: "Categories",
    description: "Look around and name 4 blue things, 3 things you can hear, 2 things you can smell, and 1 thing you can touch.",
  },
  {
    title: "Describe Your Environment",
    description: "Describe your immediate environment in great detail, as if you're explaining it to someone who has never been there. 'I'm on a grey couch. The fabric is a bit rough. To my left is a window...'",
  },
  {
    title: "Mental Math",
    description: "Perform a simple but engaging mental task. Count backwards from 100 by 7. Recite the alphabet backwards.",
  },
];

const physicalGroundingTechniques = [
  {
    title: "Feel Your Feet",
    description: "Press your feet firmly into the floor. Notice the sensation of the ground supporting you. Wiggle your toes. Feel the texture of your socks or the floor.",
  },
  {
    title: "Touch Different Textures",
    description: "Run your hands over different surfaces. Notice the temperature and texture of a wooden table, a soft blanket, a cool glass of water.",
  },
  {
    title: "Temperature Shock",
    description: "Hold a piece of ice in your hand or splash cold water on your face. The brief shock of cold can pull your focus sharply back to the present.",
  },
];

export default function GroundingTechniquesPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">Flashback Grounding Toolkit</h1>
      </div>
      <div className="flex-1 p-4 md:p-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Anchoring in the Present</CardTitle>
            <CardDescription>
              Grounding techniques are powerful tools to pull you back to the present moment when you are experiencing a flashback, high anxiety, or dissociation. They work by directing your focus to your physical body and immediate environment.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert>
              <Anchor className="h-4 w-4" />
              <AlertTitle>Your Anchor in the Storm</AlertTitle>
              <AlertDescription>
                When your mind is being pulled back into the past, these exercises act as an anchor, securing you safely in the here and now. Practice them when you're calm so they're easier to access when you're distressed.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl font-headline flex items-center gap-3"><Eye className="size-6 text-primary" />The 5-4-3-2-1 Technique</CardTitle>
                <CardDescription>A step-by-step sensory exercise to connect with your environment.</CardDescription>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-foreground">
                <p>Look around and slowly, deliberately, name:</p>
                <ul>
                    <li><strong>5 things you can see:</strong> A blue pen, a crack on the ceiling, a green leaf outside the window...</li>
                    <li><strong>4 things you can feel:</strong> The smooth surface of your phone, the soft fabric of your shirt, your feet on the floor...</li>
                    <li><strong>3 things you can hear:</strong> The hum of the computer, a bird chirping, the distant sound of traffic...</li>
                    <li><strong>2 things you can smell:</strong> The scent of your coffee, the soap on your hands...</li>
                    <li><strong>1 thing you can taste:</strong> The lingering taste of toothpaste, a sip of water...</li>
                </ul>
            </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl font-headline flex items-center gap-3"><Brain className="size-6 text-primary" />Mental Grounding</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {mentalGroundingTechniques.map((tech) => (
                        <div key={tech.title} className="p-3 border rounded-md bg-muted/20">
                            <h4 className="font-semibold">{tech.title}</h4>
                            <p className="text-sm text-muted-foreground mt-1">{tech.description}</p>
                        </div>
                    ))}
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle className="text-xl font-headline flex items-center gap-3"><Hand className="size-6 text-primary" />Physical Grounding</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {physicalGroundingTechniques.map((tech) => (
                        <div key={tech.title} className="p-3 border rounded-md bg-muted/20">
                            <h4 className="font-semibold">{tech.title}</h4>
                            <p className="text-sm text-muted-foreground mt-1">{tech.description}</p>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>

      </div>
    </main>
  );
}
