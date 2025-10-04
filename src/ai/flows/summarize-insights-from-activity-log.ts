'use server';

/**
 * @fileOverview Analyzes activity logs to provide insights into how different activities impact mood.
 *
 * - summarizeInsightsFromActivityLog - A function that handles the analysis of activity logs and provides insights.
 * - SummarizeInsightsFromActivityLogInput - The input type for the summarizeInsightsFromActivityLog function.
 * - SummarizeInsightsFromActivityLogOutput - The return type for the summarizeInsightsFromActivityLog function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeInsightsFromActivityLogInputSchema = z.object({
  activityLog: z.string().describe('A detailed log of daily activities, including the type of activity, duration, and any associated notes.'),
  moodData: z.string().describe('Data on mood, potentially including intensity and related context')
});
export type SummarizeInsightsFromActivityLogInput = z.infer<typeof SummarizeInsightsFromActivityLogInputSchema>;

const SummarizeInsightsFromActivityLogOutputSchema = z.object({
  insights: z.string().describe('A summary of insights derived from the activity log, highlighting activities that positively or negatively impact mood.'),
});
export type SummarizeInsightsFromActivityLogOutput = z.infer<typeof SummarizeInsightsFromActivityLogOutputSchema>;

export async function summarizeInsightsFromActivityLog(input: SummarizeInsightsFromActivityLogInput): Promise<SummarizeInsightsFromActivityLogOutput> {
  return summarizeInsightsFromActivityLogFlow(input);
}

const summarizeInsightsFromActivityLogPrompt = ai.definePrompt({
  name: 'summarizeInsightsFromActivityLogPrompt',
  input: {schema: SummarizeInsightsFromActivityLogInputSchema},
  output: {schema: SummarizeInsightsFromActivityLogOutputSchema},
  prompt: `You are a mental health expert. Analyze the following activity log and mood data to provide insights into how different activities impact the user's mood.

Activity Log:
{{activityLog}}

Mood Data:
{{moodData}}

Based on this information, provide a summary of insights, highlighting activities that seem to have a positive or negative impact on the user's mood. Be specific and provide reasoning for your analysis.

Insights:`, 
});

const summarizeInsightsFromActivityLogFlow = ai.defineFlow(
  {
    name: 'summarizeInsightsFromActivityLogFlow',
    inputSchema: SummarizeInsightsFromActivityLogInputSchema,
    outputSchema: SummarizeInsightsFromActivityLogOutputSchema,
  },
  async input => {
    const {output} = await summarizeInsightsFromActivityLogPrompt(input);
    return output!;