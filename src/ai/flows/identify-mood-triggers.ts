'use server';

/**
 * @fileOverview An AI agent that identifies potential triggers for negative moods based on mood logs.
 *
 * - identifyMoodTriggers - A function that analyzes mood logs and identifies triggers.
 * - IdentifyMoodTriggersInput - The input type for the identifyMoodTriggers function.
 * - IdentifyMoodTriggersOutput - The return type for the identifyMoodTriggers function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IdentifyMoodTriggersInputSchema = z.object({
  moodLogs: z
    .string()
    .describe(
      'A string containing the user\'s mood logs, including date, time, mood, and context (location, activity, people).' 
    ),
});
export type IdentifyMoodTriggersInput = z.infer<typeof IdentifyMoodTriggersInputSchema>;

const IdentifyMoodTriggersOutputSchema = z.object({
  identifiedTriggers: z
    .string()
    .describe(
      'A summary of potential triggers identified in the mood logs, including specific contexts or patterns associated with negative moods.'
    ),
});
export type IdentifyMoodTriggersOutput = z.infer<typeof IdentifyMoodTriggersOutputSchema>;

export async function identifyMoodTriggers(
  input: IdentifyMoodTriggersInput
): Promise<IdentifyMoodTriggersOutput> {
  return identifyMoodTriggersFlow(input);
}

const prompt = ai.definePrompt({
  name: 'identifyMoodTriggersPrompt',
  input: {schema: IdentifyMoodTriggersInputSchema},
  output: {schema: IdentifyMoodTriggersOutputSchema},
  prompt: `You are an AI assistant specialized in analyzing mood logs to identify potential triggers for negative emotions.

  Given the following mood logs, analyze the data and identify recurring patterns, contexts, or events that seem to be associated with negative mood states. Provide a concise summary of these potential triggers.

  Mood Logs:
  {{moodLogs}}

  Identify potential triggers:
  `, // Ensure a newline character at the end of the prompt
});

const identifyMoodTriggersFlow = ai.defineFlow(
  {
    name: 'identifyMoodTriggersFlow',
    inputSchema: IdentifyMoodTriggersInputSchema,
    outputSchema: IdentifyMoodTriggersOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
