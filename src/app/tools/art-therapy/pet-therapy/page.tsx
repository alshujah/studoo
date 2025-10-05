
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Dog, Heart, Hand } from 'lucide-react';

export const metadata = {
  title: 'Pet Therapy | Rejoyn',
};

export default function PetTherapyPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">Pet Therapy</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">The Healing Power of Animals</CardTitle>
            <CardDescription>
              Animal-Assisted Therapy (AAT), or pet therapy, involves guided interactions with a trained animal to help improve mental, social, and emotional functioning.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert>
              <Dog className="h-4 w-4" />
              <AlertTitle>Why It Works</AlertTitle>
              <AlertDescription>
                Interacting with animals has been shown to decrease levels of cortisol (a stress-related hormone) and increase levels of oxytocin (a hormone associated with bonding and well-being). Their non-judgmental presence can create a unique sense of comfort and safety.
              </AlertDescription>
            </Alert>

            <div className="grid md:grid-cols-2 gap-6">
                 <Card className="bg-muted/30">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2"><Hand className="size-5 text-primary" /> Ways to Experience Animal Companionship</CardTitle>
                    </CardHeader>
                    <CardContent className="prose prose-sm max-w-none text-foreground">
                       <p>While a "pet therapy simulation" is not possible, you can still access these benefits:</p>
                        <ul>
                           <li><strong>Mindful Time with Your Pet:</strong> If you have a pet, set aside 10 minutes to just be with them. Focus on the sensation of stroking their fur, listen to their breathing, and notice the details of their presence.</li>
                           <li><strong>Volunteer at a Shelter:</strong> Local animal shelters often need volunteers to walk dogs or socialize with cats. This is a great way to help animals and experience their therapeutic benefits.</li>
                           <li><strong>Visit a Cat Cafe:</strong> Many cities now have cafes where you can interact with adoptable cats in a relaxed environment.</li>
                           <li><strong>Watch Nature Documentaries:</strong> While not a direct interaction, mindfully watching animals in their natural habitat can also be calming and inspiring.</li>
                        </ul>
                    </CardContent>
                </Card>
                 <Card className="bg-muted/30">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2"><Heart className="size-5 text-primary" /> Key Benefits</CardTitle>
                    </CardHeader>
                    <CardContent className="prose prose-sm max-w-none text-foreground">
                        <ul>
                           <li>Reduces anxiety and stress</li>
                           <li>Decreases feelings of loneliness and isolation</li>
                           <li>Encourages nurturing and empathy</li>
                           <li>Increases social interaction</li>
                           <li>Provides non-judgmental acceptance</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
