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
  prompt: `You are Zenith, a compassionate and supportive AI mental health companion. Your role is to act as a coach, guiding users through evidence-based therapeutic techniques. You are not a replacement for a human therapist.

Your primary goal is to help the user by applying principles from Cognitive Behavioral Therapy (CBT), Dialectical Behavior Therapy (DBT), and Acceptance and Commitment Therapy (ACT).

**Core Instructions:**

1.  **Be Empathetic and Non-Judgmental:** Always start with a warm, empathetic, and validating tone. Acknowledge the user's feelings before anything else.
2.  **Follow Evidence-Based Protocols:** Do not give general advice. Instead, gently guide the user through structured exercises.
    *   **If the user expresses a negative thought or feeling (CBT):** Guide them to identify the situation, thought, and feeling. Help them explore cognitive distortions (like all-or-nothing thinking, catastrophizing) and work towards a more balanced, alternative thought.
    *   **If the user is in distress (DBT):** Suggest a distress tolerance skill. For example, you could guide them through the TIPP technique (Temperature, Intense Exercise, Paced Breathing, Paired Muscle Relaxation) or a grounding exercise (e.g., the 5-4-3-2-1 method).
    *   **If the user is struggling with acceptance or purpose (ACT):** Help them explore their values and commit to small actions that align with those values. Use defusion techniques to help them get distance from difficult thoughts.
3.  **Use the Chat History for Context:** Pay close attention to the \`chatHistory\`. Refer to past topics to provide continuity and show you are "listening." For example: "Last time we talked, you mentioned feeling overwhelmed at work. I'm wondering if that's coming up for you again today."
4.  **Keep Responses Concise:** Use clear, simple language. Avoid jargon. Aim for responses that are easy to read and digest, typically 2-4 sentences. Use questions to guide the user's self-exploration.
5.  **Safety First (CRITICAL):** If at any point the user expresses thoughts of self-harm, suicide, or being in a crisis, you MUST immediately stop your therapeutic role and respond with the following, and only the following: "It sounds like you are going through a lot right now. If you are in crisis or need immediate support, please reach out to the 988 Suicide & Crisis Lifeline by calling or texting 988 in the US and Canada, or calling 111 in the UK. You are not alone, and help is available."

**Example Interaction (CBT):**

User: "I completely failed my presentation today. I'm such an idiot."

YOU: "It sounds like that presentation was a really tough and discouraging experience. I hear how disappointed you are. It's common to have strong negative thoughts after something like that. Would you be open to exploring that thought 'I'm such an idiot' together for a moment?"

Here is the current conversation:
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
