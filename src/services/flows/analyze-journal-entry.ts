
'use server';

/**
 * @fileOverview An AI agent that analyzes a user's journal entry and provides insights.
 *
 * - analyzeJournalEntry - A function that analyzes the journal entry.
 * - AnalyzeJournalEntryInput - The input type for the analyzeJournalEntry function.
 * - AnalyzeJournalEntryOutput - The return type for the analyzeJournalEntry function.
 */

import {ai} from '@/lib/genkit';
import {z} from 'genkit';

const AnalyzeJournalEntryInputSchema = z.object({
  journalEntry: z.string().describe("The user's journal entry text."),
});
export type AnalyzeJournalEntryInput = z.infer<typeof AnalyzeJournalEntryInputSchema>;

const AnalyzeJournalEntryOutputSchema = z.object({
  analysis: z.string().describe("A brief, compassionate analysis of the journal entry, highlighting key feelings and themes."),
  keyThemes: z.array(z.string()).describe('A list of 2-3 key themes identified in the entry (e.g., "Work Stress", "Family", "Self-Care").'),
  suggestedTool: z.object({
    name: z.string().describe('The name of a relevant tool within the app.'),
    href: z.string().describe('The path to the suggested tool (e.g., "/tools/cbt/thought-record").'),
    reason: z.string().describe('A brief explanation for why this tool is suggested.'),
  }).optional(),
});
export type AnalyzeJournalEntryOutput = z.infer<typeof AnalyzeJournalEntryOutputSchema>;

export async function analyzeJournalEntry(
  input: AnalyzeJournalEntryInput
): Promise<AnalyzeJournalEntryOutput> {
  return analyzeJournalEntryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeJournalEntryPrompt',
  input: {schema: AnalyzeJournalEntryInputSchema},
  output: {schema: AnalyzeJournalEntryOutputSchema},
  system: `You are a compassionate AI companion. A user has submitted a journal entry. Your goal is to provide gentle insight and support.

  Here is a list of available tools in the app:
  - Thought Record (/tools/thought-record): For identifying and challenging negative thoughts. Useful when the user expresses negative self-talk, worry, or anxiety about a specific event.
  - Breathing Exercise (/tools/relaxation): For immediate calming. Useful when the user expresses feelings of stress, anxiety, or being overwhelmed.
  - Gratitude Journal (/track/journal/gratitude): For focusing on positive experiences. Useful when the user has a mix of good and bad experiences, or seems to be overlooking positives.
  - Values Clarification (/tools/act/values-clarification): For exploring what's important in life. Useful when the user expresses feelings of being lost, directionless, or conflicted about major life decisions.
  - Mood Check-in (/track/mood): For logging and understanding emotions. Useful as a general suggestion if no other tool fits, or to encourage a habit of tracking.
  - Behavioral Activation (/tools/cbt/behavioral-activation): For finding motivation and scheduling activities. Useful when the user expresses feelings of lethargy, depression, or lack of motivation.

  Your tasks:
  1.  **Analysis**: Write a brief, compassionate analysis (2-3 sentences) of the entry. Acknowledge the user's feelings and reflect on the themes you see.
  2.  **Key Themes**: Identify 2-3 main themes.
  3.  **Suggested Tool**: If applicable, suggest ONE tool from the list that could be helpful. Provide a short reason why. If no tool seems directly relevant, you don't need to suggest one.`,
  prompt: `User's Journal Entry:
"{{{journalEntry}}}"
  `,
});

const analyzeJournalEntryFlow = ai.defineFlow(
  {
    name: 'analyzeJournalEntryFlow',
    inputSchema: AnalyzeJournalEntryInputSchema,
    outputSchema: AnalyzeJournalEntryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
