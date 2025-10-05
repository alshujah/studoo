
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Music, PenLine, Palette, Lightbulb } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Creative Wellness | Rejoyn',
};

export default function CreativeWellnessPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">Creative Wellness</h1>
      </div>
      <div className="flex-1 p-4 md:p-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Harnessing Creativity for Health</CardTitle>
            <CardDescription>
              Engaging your senses and creativity can be a powerful way to process emotions, reduce stress, and improve your mood. This page provides simple, self-directed exercises based on therapeutic principles.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert>
              <Lightbulb className="h-4 w-4" />
              <AlertTitle>Focus on the Process</AlertTitle>
              <AlertDescription>
                The goal isn't to create a masterpiece, but to engage in the creative act itself. Allow yourself to be curious and non-judgmental.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl font-headline flex items-center gap-3"><Music className="size-6 text-primary" />Music Therapy Exercises</CardTitle>
                <CardDescription>Use sound to shift your emotional state.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="p-4 border rounded-lg bg-muted/20">
                    <h4 className="font-semibold">Mood-Matching Playlist</h4>
                    <p className="text-sm text-muted-foreground mt-1">Create a short playlist that starts with a song matching your current mood. Gradually transition to songs that reflect the mood you'd like to feel. This helps you acknowledge your current state and gently move toward a more positive one.</p>
                </div>
                <div className="p-4 border rounded-lg bg-muted/20">
                    <h4 className="font-semibold">Lyric Analysis</h4>
                    <p className="text-sm text-muted-foreground mt-1">Choose a song you strongly connect with. Write down the lyrics that stand out to you. What story do they tell? How do they relate to your own life and feelings?</p>
                </div>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle className="text-2xl font-headline flex items-center gap-3"><PenLine className="size-6 text-primary" />Therapeutic Writing Prompts</CardTitle>
                <CardDescription>Use words to explore your inner world.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="p-4 border rounded-lg bg-muted/20">
                    <h4 className="font-semibold">Unsent Letter</h4>
                    <p className="text-sm text-muted-foreground mt-1">Write a letter to someone (or something) expressing everything you need to say, without any intention of sending it. This is a safe way to release bottled-up emotions.</p>
                </div>
                <div className="p-4 border rounded-lg bg-muted/20">
                    <h4 className="font-semibold">Stream of Consciousness</h4>
                    <p className="text-sm text-muted-foreground mt-1">Set a timer for 10 minutes and write continuously without stopping, editing, or judging. Write whatever comes to mind. This can help clear mental clutter and uncover underlying thoughts.</p>
                </div>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle className="text-2xl font-headline flex items-center gap-3"><Palette className="size-6 text-primary" />Color Therapy Exploration</CardTitle>
                <CardDescription>Explore your personal connection to colors.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                 <div className="p-4 border rounded-lg bg-muted/20">
                    <h4 className="font-semibold">Emotional Color Wheel</h4>
                    <p className="text-sm text-muted-foreground mt-1">Think of a specific emotion you're feeling right now. If that emotion had a color, what would it be? Use the Art Therapy Canvas or physical art supplies to create a patch of that color. Then, think of a color that represents a feeling of calm or safety, and create a patch of that color next to it.</p>
                </div>
            </CardContent>
        </Card>

      </div>
    </main>
  );
}
