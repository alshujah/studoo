
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Interpersonal Inventory | Rejoyn',
};

export default function InterpersonalInventoryPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">IPT: Interpersonal Inventory</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Mapping Your Social World</CardTitle>
            <CardDescription>
              An interpersonal inventory is a tool to help you identify the important relationships in your life and evaluate their impact on your well-being. It can help you see where you get support, where there is conflict, and which relationships you might want to change.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert>
              <Users className="h-4 w-4" />
              <AlertTitle>Your Relationship Landscape</AlertTitle>
              <AlertDescription>
                Think of this as creating a map of your social connections. The goal is to gain clarity on how your relationships affect your mood and stress levels.
              </AlertDescription>
            </Alert>

            <Card className="bg-muted/30">
                <CardHeader>
                    <CardTitle className="text-lg">How to Create Your Interpersonal Inventory</CardTitle>
                    <CardDescription>Take a piece of paper and draw three concentric circles, like a target.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 prose prose-sm max-w-none text-foreground">
                    <div>
                        <h4><strong>Inner Circle: The Closest Relationships</strong></h4>
                        <p>In the very center circle, write the names of the people who are most important to you. These are the people you feel closest to and who have the biggest impact on your emotional life (positive or negative).</p>
                    </div>
                    <div>
                        <h4><strong>Middle Circle: Important, But Less Central</strong></h4>
                        <p>In the middle ring, write the names of people who are still significant but not as central as your inner circle. This might include other family members, close friends, or a boss.</p>
                    </div>
                    <div>
                        <h4><strong>Outer Circle: Other Connections</strong></h4>
                        <p>In the outermost circle, list other people in your life who have some impact, such as coworkers, neighbors, or acquaintances.</p>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Reflection Questions</CardTitle>
                    <CardDescription>Once you have your map, use these questions for journaling or reflection:</CardDescription>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none text-foreground">
                    <ul>
                        <li><strong>Support vs. Stress:</strong> For each person on your map, do they generally increase your sense of support or your level of stress? You can use a `+` for supportive, a `-` for stressful, or `+/-` for mixed.</li>
                        <li><strong>Reciprocity:</strong> Is there a healthy give-and-take in your most important relationships?</li>
                        <li><strong>Desired Changes:</strong> Looking at your map, are there any relationships you wish were closer (move them to an inner circle)? Are there any you wish had less of an impact (move them to an outer circle)?</li>
                        <li><strong>Communication Patterns:</strong> What is your typical communication style in your most important relationships? (Refer to the Communication Analysis tool).</li>
                        <li><strong>Unmet Needs:</strong> Are there any needs (e.g., for validation, companionship, support) that are not being met by your current social circle?</li>
                    </ul>
                </CardContent>
            </Card>

          </CardContent>
        </Card>
      </div>
    </main>
  );
}
