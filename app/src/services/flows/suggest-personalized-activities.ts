
'use server';

/**
 * @fileOverview This file defines a Genkit flow to suggest personalized activities based on user mood logs.
 *
 * It includes:
 * - suggestPersonalizedActivities: An exported function that takes mood logs as input and returns personalized activity suggestions.
 * - SuggestPersonalizedActivitiesInput: The input type for the suggestPersonalizedActivities function.
 * - SuggestPersonalizedActivitiesOutput: The output type for the suggestPersonalizedActivities function.
 */

import {ai} from '@/services/ai/genkit';
import {z} from 'genkit';

const SuggestPersonalizedActivitiesInputSchema = z.object({
  moodLogs: z
    .string()
    .describe(
      'A string containing the user\'s mood logs, including context, activities, and emotional states.'
    ),
});
export type SuggestPersonalizedActivitiesInput = z.infer<
  typeof SuggestPersonalizedActivitiesInputSchema
>;

const SuggestPersonalizedActivitiesOutputSchema = z.object({
  suggestedActivities: z
    .string()
    .describe(
      'A list of personalized activities recommended based on the mood logs provided.'
    ),
});
export type SuggestPersonalizedActivitiesOutput = z.infer<
  typeof SuggestPersonalizedActivitiesOutputSchema
>;

export async function suggestPersonalizedActivities(
  input: SuggestPersonalizedActivitiesInput
): Promise<SuggestPersonalizedActivitiesOutput> {
  return suggestPersonalizedActivitiesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestPersonalizedActivitiesPrompt',
  input: {schema: SuggestPersonalizedActivitiesInputSchema},
  output: {schema: SuggestPersonalizedActivitiesOutputSchema},
  prompt: `Based on the following mood logs: {{{moodLogs}}}, suggest personalized activities to improve the user\'s mood and mental health. Consider activities that have been shown to be effective in improving mood based on the logs provided and suggest some new activities as well. Focus on providing practical and actionable suggestions.`,
});

const suggestPersonalizedActivitiesFlow = ai.defineFlow(
  {
    name: 'suggestPersonalizedActivitiesFlow',
    inputSchema: SuggestPersonalizedActivitiesInputSchema,
    outputSchema: SuggestPersonalizedActivitiesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
