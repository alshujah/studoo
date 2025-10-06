
'use server';

/**
 * @fileOverview An AI agent that analyzes a user's thought record and provides CBT-based feedback.
 *
 * - analyzeThoughtRecord - A function that analyzes the thought record.
 * - AnalyzeThoughtRecordInput - The input type for the analyzeThoughtRecord function.
 * - AnalyzeThoughtRecordOutput - The return type for the analyzeThoughtRecord function.
 */

import {ai} from '@genkit-ai/next';
import {z} from 'genkit';

const AnalyzeThoughtRecordInputSchema = z.object({
  situation: z.string().describe('The situation that triggered the negative thought.'),
  automaticThought: z.string().describe('The user\'s automatic thought(s).'),
  cognitiveDistortions: z.array(z.string()).describe('The cognitive distortions the user identified.'),
});
export type AnalyzeThoughtRecordInput = z.infer<typeof AnalyzeThoughtRecordInputSchema>;

const AnalyzeThoughtRecordOutputSchema = z.object({
  analysis: z.string().describe("A brief, compassionate analysis of how the user's cognitive distortions might be shaping their thoughts."),
  alternativeThought: z.string().describe('A more balanced, compassionate, and realistic alternative thought.'),
});
export type AnalyzeThoughtRecordOutput = z.infer<typeof AnalyzeThoughtRecordOutputSchema>;

export async function analyzeThoughtRecord(
  input: AnalyzeThoughtRecordInput
): Promise<AnalyzeThoughtRecordOutput> {
  return analyzeThoughtRecordFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeThoughtRecordPrompt',
  input: {schema: AnalyzeThoughtRecordInputSchema},
  output: {schema: AnalyzeThoughtRecordOutputSchema},
  system: `You are a compassionate CBT therapist. A user has submitted a thought record. Your goal is to help them reframe their negative thought.

Your tasks:
1.  **Analysis**: Write a brief, gentle analysis (2-3 sentences) explaining how the identified cognitive distortions might be influencing their automatic thought in this situation. Speak in the second person (e.g., "You might be...").
2.  **Alternative Thought**: Based on the user's submission, provide one single, compassionate, and more balanced alternative thought. This should be a statement that gently challenges the automatic thought.`,
  prompt: `
  User's submission:
  - Situation: {{{situation}}}
  - Automatic Thought: "{{{automaticThought}}}"
  - Identified Cognitive Distortions: {{#each cognitiveDistortions}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
  `,
});

const analyzeThoughtRecordFlow = ai.defineFlow(
  {
    name: 'analyzeThoughtRecordFlow',
    inputSchema: AnalyzeThoughtRecordInputSchema,
    outputSchema: AnalyzeThoughtRecordOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
