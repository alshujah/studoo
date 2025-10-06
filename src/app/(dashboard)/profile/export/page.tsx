
'use client';

import { useState, useEffect, useTransition } from 'react';
import { PageLayout } from '@/components/layout/page-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader, Clipboard, Check } from 'lucide-react';
import { generateReportAction } from '@/services/actions';
import { useToast } from '@/hooks/use-toast';

export default function ExportDataPage() {
    const [report, setReport] = useState<string>('');
    const [isCopied, setIsCopied] = useState<boolean>(false);
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();

    useEffect(() => {
        startTransition(async () => {
            const result = await generateReportAction();
            if (result.success && result.data) {
                setReport(result.data.reportMarkdown);
            } else {
                toast({
                    variant: 'destructive',
                    title: 'Failed to Generate Report',
                    description: result.error || 'An unexpected error occurred.',
                });
            }
        });
    }, [toast]);

    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(report);
        setIsCopied(true);
        toast({ title: 'Copied to clipboard!'});
        setTimeout(() => setIsCopied(false), 2000);
    };

    return (
        <PageLayout title="Progress Report">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Your 30-Day Summary</CardTitle>
                    <CardDescription>
                        This AI-generated report summarizes your activity, moods, and reflections over the past 30 days. You can copy it to share with a therapist or for your own records.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {isPending ? (
                        <div className="flex flex-col items-center justify-center gap-4 p-8 border rounded-lg bg-muted/50 min-h-96">
                            <Loader className="h-12 w-12 animate-spin text-primary" />
                            <p className="text-muted-foreground">The AI Coach is analyzing your data and compiling your report...</p>
                        </div>
                    ) : (
                        <div>
                            <div className="flex justify-end mb-4">
                                <Button onClick={handleCopyToClipboard} variant="outline" size="sm">
                                    {isCopied ? <Check className="mr-2"/> : <Clipboard className="mr-2" />}
                                    {isCopied ? 'Copied!' : 'Copy to Clipboard'}
                                </Button>
                            </div>
                            <div className="prose dark:prose-invert max-w-none p-6 border rounded-lg bg-background">
                                <pre className="whitespace-pre-wrap font-sans">{report}</pre>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </PageLayout>
    );
}
