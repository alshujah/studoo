
'use server';

/**
 * @fileOverview An AI agent that triages a user's issue and recommends the best tool.
 *
 * - triageUserIssue - A function that analyzes the user's problem.
 * - TriageUserIssueInput - The input type for the triageUserIssue function.
 * - TriageUserIssueOutput - The return type for the triageUserIssue function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TriageUserIssueInputSchema = z.object({
  issue: z.string().describe("The user's description of their current problem or feeling."),
});
export type TriageUserIssueInput = z.infer<typeof TriageUserIssueInputSchema>;

const TriageUserIssueOutputSchema = z.object({
  toolName: z.string().describe('The name of the most relevant tool within the app.'),
  toolHref: z.string().describe('The path to the suggested tool (e.g., "/tools/cbt/thought-record").'),
  reason: z.string().describe('A brief explanation for why this tool is suggested.'),
});
export type TriageUserIssueOutput = z.infer<typeof TriageUserIssueOutputSchema>;

export async function triageUserIssue(
  input: TriageUserIssueInput
): Promise<TriageUserIssueOutput> {
  return triageUserIssueFlow(input);
}

const prompt = ai.definePrompt({
  name: 'triageUserIssuePrompt',
  input: {schema: TriageUserIssueInputSchema},
  output: {schema: TriageUserIssueOutputSchema},
  system: `You are a helpful AI assistant for a mental health app. A user has described their current issue. Your task is to recommend the single most appropriate tool from the provided list to help them.

  Here is a list of available tools in the app:
  - Thought Record (/tools/thought-record): For identifying and challenging negative thoughts.
  - Box Breathing (/tools/relaxation/box-breathing): For immediate calming and reducing anxiety.
  - Gratitude Journal (/track/journal/gratitude): For focusing on positive experiences.
  - Values Clarification (/tools/act/values-clarification): For exploring what's important in life.
  - Mood Check-in (/track/mood): For logging and understanding emotions.
  - Behavioral Activation (/tools/cbt/behavioral-activation): For finding motivation and scheduling activities.
  - AI Coach (/chatbot): For talking through a problem with an AI assistant.
  - Grounding Techniques (/tools/ptsd/grounding): For anchoring in the present moment during distress.
  - Safety Plan (/tools/crisis-management/safety-plan): For crisis planning.

  Your tasks:
  1.  Analyze the user's issue.
  2.  Select the single most relevant tool from the list.
  3.  Provide a short, compassionate reason why you are suggesting this tool.`,
  prompt: `
    User's Issue:
    "{{{issue}}}"
  `,
});

const triageUserIssueFlow = ai.defineFlow(
  {
    name: 'triageUserIssueFlow',
    inputSchema: TriageUserIssueInputSchema,
    outputSchema: TriageUserIssueOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
