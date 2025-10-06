'use server';

/**
 * @fileOverview Recommends personalized interventions based on user data.
 *
 * - recommendPersonalizedInterventions - A function that recommends personalized interventions.
 * - RecommendPersonalizedInterventionsInput - The input type for the recommendPersonalizedInterventions function.
 * - RecommendPersonalizedInterventionsOutput - The return type for the recommendPersonalizedInterventions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendPersonalizedInterventionsInputSchema = z.object({
  mood: z.string().describe('The user\'s current mood.'),
  activities: z.string().describe('The user\'s recent activities.'),
  preferences: z.string().describe('The user\'s preferences for interventions.'),
});
export type RecommendPersonalizedInterventionsInput = z.infer<
  typeof RecommendPersonalizedInterventionsInputSchema
>;

const RecommendPersonalizedInterventionsOutputSchema = z.object({
  recommendations: z
    .string()
    .describe('A list of personalized intervention recommendations.'),
});
export type RecommendPersonalizedInterventionsOutput = z.infer<
  typeof RecommendPersonalizedInterventionsOutputSchema
>;

export async function recommendPersonalizedInterventions(
  input: RecommendPersonalizedInterventionsInput
): Promise<RecommendPersonalizedInterventionsOutput> {
  return recommendPersonalizedInterventionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendPersonalizedInterventionsPrompt',
  input: {schema: RecommendPersonalizedInterventionsInputSchema},
  output: {schema: RecommendPersonalizedInterventionsOutputSchema},
  prompt: `Based on the user's current mood ({{{mood}}}), recent activities ({{{activities}}}), and preferences ({{{preferences}}}), recommend personalized interventions. Provide a list of specific and actionable recommendations that the user can implement to improve their well-being.`
});

const recommendPersonalizedInterventionsFlow = ai.defineFlow(
  {
    name: 'recommendPersonalizedInterventionsFlow',
    inputSchema: RecommendPersonalizedInterventionsInputSchema,
    outputSchema: RecommendPersonalizedInterventionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
