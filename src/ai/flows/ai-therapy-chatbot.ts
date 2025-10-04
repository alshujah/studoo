'use server';

/**
 * @fileOverview Implements an AI therapy chatbot that uses evidence-based techniques like CBT and DBT.
 *
 * - aiTherapyChatbot - A function that handles the chatbot interaction.
 * - AiTherapyChatbotInput - The input type for the aiTherapyChatbot function.
 * - AiTherapyChatbotOutput - The return type for the aiTherapyChatbot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiTherapyChatbotInputSchema = z.object({
  message: z.string().describe('The user message to the chatbot.'),
  chatHistory: z.array(z.object({
    role: z.enum(['user', 'assistant']).describe('The role of the message sender.'),
    content: z.string().describe('The content of the message.'),
  })).optional().describe('The chat history between the user and the chatbot.'),
});
export type AiTherapyChatbotInput = z.infer<typeof AiTherapyChatbotInputSchema>;

const AiTherapyChatbotOutputSchema = z.object({
  response: z.string().describe('The chatbot response to the user message.'),
});
export type AiTherapyChatbotOutput = z.infer<typeof AiTherapyChatbotOutputSchema>;

export async function aiTherapyChatbot(input: AiTherapyChatbotInput): Promise<AiTherapyChatbotOutput> {
  return aiTherapyChatbotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiTherapyChatbotPrompt',
  input: {schema: AiTherapyChatbotInputSchema},
  output: {schema: AiTherapyChatbotOutputSchema},
  prompt: `You are a helpful AI therapy chatbot that uses evidence-based techniques like Cognitive Behavioral Therapy (CBT) and Dialectical Behavior Therapy (DBT) to provide conversational support and guidance for managing mental health. 

  Your goal is to help the user manage their mental health by providing helpful and supportive responses. Use techniques from CBT and DBT as appropriate.

  Here is the chat history:
  {{#each chatHistory}}
  {{#if (eq role "user")}}
  User: {{{content}}}
  {{else}}
  Assistant: {{{content}}}
  {{/if}}
  {{/each}}

  User: {{{message}}}
  Assistant: `,
});

const aiTherapyChatbotFlow = ai.defineFlow(
  {
    name: 'aiTherapyChatbotFlow',
    inputSchema: AiTherapyChatbotInputSchema,
    outputSchema: AiTherapyChatbotOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return {
      response: output!.response,
    };
  }
);
