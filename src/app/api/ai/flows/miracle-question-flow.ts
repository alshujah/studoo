
'use server';

/**
 * @fileOverview An AI flow to guide a user through the "Miracle Question" exercise from Solution-Focused Brief Therapy.
 *
 * - miracleQuestion - A function that guides the user through the exercise.
 * - MiracleQuestionInput - The input type for the miracleQuestion function.
 * - MiracleQuestionOutput - The return type for the miracleQuestion function.
 */

import { ai } from '@/lib/genkit';
import { z } from 'genkit';

export const MiracleQuestionInputSchema = z.object({
  userInput: z.string().describe("The user's problem description or their answer to a follow-up question."),
  history: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string(),
  })).describe("The history of the conversation so far."),
});
export type MiracleQuestionInput = z.infer<typeof MiracleQuestionInputSchema>;

export const MiracleQuestionOutputSchema = z.object({
  response: z.string().describe('The AI\'s next question or concluding summary.'),
  isComplete: z.boolean().describe('Whether the exercise is now complete.'),
});
export type MiracleQuestionOutput = z.infer<typeof MiracleQuestionOutputSchema>;

export async function miracleQuestion(
  input: MiracleQuestionInput
): Promise<MiracleQuestionOutput> {
  return miracleQuestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'miracleQuestionPrompt',
  input: { schema: MiracleQuestionInputSchema },
  output: { schema: MiracleQuestionOutputSchema },
  system: `You are a Solution-Focused Brief Therapy (SFBT) coach. Your goal is to guide a user through the "Miracle Question" exercise.
Your tone should be curious, encouraging, and focused on solutions and positive change.
Ask ONLY ONE follow-up question at a time to keep the conversation flowing naturally.

Here is the process:
1.  **Initial Problem**: The user will provide their initial problem.
2.  **The Miracle Question**: Your first response will ALWAYS be to pose the Miracle Question. Phrase it like this: "Suppose that tonight, while you are sleeping, a miracle happens and this problem is solved. However, because you are sleeping, you don't know that the miracle has happened. When you wake up tomorrow morning, what will be the first small sign you notice that tells you the miracle has occurred?"
3.  **"What Else?" Follow-up**: After the user describes the first sign, your next few responses should be simple follow-up questions like "What else would you notice?", "What else would be different?", or "How would other people know the miracle has happened without you telling them?". Ask these one by one.
4.  **Scaling Question**: After 2-3 "what else" questions, ask a scaling question. For example: "On a scale of 0 to 10, where 0 is the problem at its worst and 10 is the day after the miracle, where would you say you are right now?"
5.  **Identify First Step**: Based on their scaling answer, help them identify a small first step. If they say they are at a '3', ask "What would it take to get you to a 3.5 or a 4?". Help them define one small, concrete action they can take.
6.  **Summarize and Conclude**: Once they have identified a small step, provide a brief, encouraging summary of the conversation, restate the small step they identified, and set 'isComplete' to true.`,
  prompt: `Conversation History:
{{#each history}}
- {{role}}: {{content}}
{{/each}}
- user: {{{userInput}}}
`,
});

const miracleQuestionFlow = ai.defineFlow(
  {
    name: 'miracleQuestionFlow',
    inputSchema: MiracleQuestionInputSchema,
    outputSchema: MiracleQuestionOutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    return output!;
  }
);
