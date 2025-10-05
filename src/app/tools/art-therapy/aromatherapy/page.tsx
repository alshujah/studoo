
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Leaf, AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Aromatherapy Guide | Rejoyn',
};

const oils = [
    { name: "Lavender", effect: "Calming, relaxing", uses: "Promotes sleep, reduces anxiety and stress." },
    { name: "Peppermint", effect: "Energizing, stimulating", uses: "Boosts focus, alertness, and can help with headaches." },
    { name: "Lemon", effect: "Uplifting, cleansing", uses: "Improves mood, purifies the air." },
    { name: "Chamomile", effect: "Soothing, peaceful", uses: "Reduces anxiety, promotes relaxation before sleep." },
    { name: "Eucalyptus", effect: "Clarifying, invigorating", uses: "Helps with focus and clears breathing." },
    { name: "Frankincense", effect: "Grounding, meditative", uses: "Promotes a sense of peace and is often used in meditation." },
];

export default function AromatherapyGuidePage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">Aromatherapy Guide</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">The Power of Scent</CardTitle>
            <CardDescription>
              Aromatherapy is a holistic healing treatment that uses natural plant extracts to promote health and well-being. It uses aromatic essential oils to improve the health of the body, mind, and spirit.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Safety First</AlertTitle>
              <AlertDescription>
                Essential oils are highly concentrated. Always dilute them before applying to skin and never ingest them. Consult a healthcare professional if you are pregnant, have a medical condition, or have any concerns. This guide is for informational purposes only.
              </AlertDescription>
            </Alert>

            <Card className="bg-muted/30">
                <CardHeader>
                    <CardTitle className="text-lg">How to Use Essential Oils</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none text-foreground">
                    <ul>
                        <li><strong>Diffusion:</strong> Use an essential oil diffuser to disperse a fine mist of oil and water into the air.</li>
                        <li><strong>Inhalation:</strong> Place a few drops on a tissue or cotton ball and inhale deeply.</li>
                        <li><strong>Topical Application:</strong> Dilute with a carrier oil (like jojoba, coconut, or almond oil) and apply to the skin. A common dilution is 2-3 drops of essential oil per teaspoon of carrier oil.</li>
                    </ul>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Common Essential Oils & Their Uses</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {oils.map(oil => (
                            <div key={oil.name} className="p-4 border rounded-lg">
                                <h4 className="font-semibold text-primary">{oil.name}</h4>
                                <p className="text-sm font-medium">{oil.effect}</p>
                                <p className="text-xs text-muted-foreground mt-1">{oil.uses}</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
