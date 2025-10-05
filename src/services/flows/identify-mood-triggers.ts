
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
      'A JSON string of mood logs, including situation, emotion, and intensity.'
    ),
});
export type IdentifyMoodTriggersInput = z.infer<
  typeof IdentifyMoodTriggersInputSchema
>;

const TriggerSchema = z.object({
    trigger: z.string().describe("The identified trigger (e.g., 'Lack of Sleep', 'Conflict at Work')."),
    relatedEmotions: z.array(z.string()).describe("A list of emotions commonly associated with this trigger (e.g., ['Sadness', 'Anxiety'])."),
    pattern: z.string().describe("A brief explanation of the pattern observed (e.g., 'You tend to feel more anxious on days following poor sleep.')."),
});

const IdentifyMoodTriggersOutputSchema = z.object({
  triggers: z.array(TriggerSchema).describe('A list of potential mood triggers identified from the logs.'),
});
export type IdentifyMoodTriggersOutput = z.infer<
  typeof IdentifyMoodTriggersOutputSchema
>;

export async function identifyMoodTriggers(
  input: IdentifyMoodTriggersInput
): Promise<IdentifyMoodTriggersOutput> {
  return identifyMoodTriggersFlow(input);
}

const prompt = ai.definePrompt({
  name: 'identifyMoodTriggersPrompt',
  input: {schema: IdentifyMoodTriggersInputSchema},
  output: {schema: IdentifyMoodTriggersOutputSchema},
  system: `You are an expert mental health data analyst. Your task is to analyze the provided mood logs to identify recurring patterns and potential triggers for negative emotions. Based on this data, identify the top 2-3 triggers. For each trigger, describe the pattern and the emotions it's linked to. Present your findings in a structured format.`,
  prompt: `
    Mood Logs:
    {{{moodLogs}}}
  `,
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
