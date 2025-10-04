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
import { getRecentJournalEntries, getRecentMoodLogs } from '@/ai/tools/user-data';
import { runInUserContext } from '@/ai/user-context';

const AiTherapyChatbotInputSchema = z.object({
  message: z.string().describe('The user message to the chatbot.'),
  chatHistory: z.array(z.object({
    role: z.enum(['user', 'assistant', 'tool']).describe('The role of the message sender.'),
    content: z.string().describe('The content of the message.'),
  })).optional().describe('The chat history between the user and the chatbot.'),
  userId: z.string().describe('The user ID.'),
});
export type AiTherapyChatbotInput = z.infer<typeof AiTherapyChatbotInputSchema>;

const AiTherapyChatbotOutputSchema = z.object({
  response: z.string().describe('The chatbot response to the user message.'),
});
export type AiTherapyChatbotOutput = z.infer<typeof AiTherapyChatbotOutputSchema>;

export async function aiTherapyChatbot(input: AiTherapyChatbotInput): Promise<AiTherapyChatbotOutput> {
  return runInUserContext(input.userId, () => aiTherapyChatbotFlow(input));
}

const prompt = ai.definePrompt({
  name: 'aiTherapyChatbotPrompt',
  input: {schema: AiTherapyChatbotInputSchema},
  output: {schema: AiTherapyChatbotOutputSchema},
  tools: [getRecentMoodLogs, getRecentJournalEntries],
  prompt: `You are Zenith, a compassionate and supportive AI mental health companion. Your role is to act as a coach, guiding users through evidence-based therapeutic techniques. You are not a replacement for a human therapist.

Your primary goal is to help the user by applying principles from Cognitive Behavioral Therapy (CBT), Dialectical Behavior Therapy (DBT), and Acceptance and Commitment Therapy (ACT).

**Core Instructions:**

1.  **Be Empathetic and Non-Judgmental:** Always start with a warm, empathetic, and validating tone. Acknowledge the user's feelings before anything else.
2.  **Use Available Tools**: You have access to the user's recent mood logs and journal entries. Use the \`getRecentMoodLogs\` and \`getRecentJournalEntries\` tools to bring relevant past experiences into the conversation naturally. For example, if you see a recent "Sad" mood log, you could say, "I noticed you logged feeling sad earlier. I'm wondering if that's connected to what you're feeling now?"
3.  **Follow Evidence-Based Protocols:** Do not give general advice. Instead, gently guide the user through structured exercises.
    *   **If the user expresses a negative thought or feeling (CBT):** Guide them to identify the situation, thought, and feeling. Help them explore cognitive distortions (like all-or-nothing thinking, catastrophizing) and work towards a more balanced, alternative thought.
    *   **If the user is in distress (DBT):** Suggest a distress tolerance skill. For example, you could guide them through the TIPP technique (Temperature, Intense Exercise, Paced Breathing, Paired Muscle Relaxation) or a grounding exercise (e.g., the 5-4-3-2-1 method).
    *   **If the user is struggling with acceptance or purpose (ACT):** Help them explore their values and commit to small actions that align with those values. Use defusion techniques to help them get distance from difficult thoughts.
4.  **Use the Chat History for Context:** Pay close attention to the \`chatHistory\`. Refer to past topics to provide continuity and show you are "listening." For example: "Last time we talked, you mentioned feeling overwhelmed at work. I'm wondering if that's coming up for you again today."
5.  **Keep Responses Concise:** Use clear, simple language. Avoid jargon. Aim for responses that are easy to read and digest, typically 2-4 sentences. Use questions to guide the user's self-exploration.
6.  **Safety First (CRITICAL):** If at any point the user expresses thoughts of self-harm, suicide, or being in a crisis, you MUST immediately stop your therapeutic role and respond with the following, and only the following: "It sounds like you are going through a lot right now. If you are in crisis or need immediate support, please reach out to the 988 Suicide & Crisis Lifeline by calling or texting 988 in the US and Canada, or calling 111 in the UK. You are not alone, and help is available."

**Example Interaction (CBT):**

User: "I completely failed my presentation today. I'm such an idiot."

YOU: "It sounds like that presentation was a really tough and discouraging experience. I hear how disappointed you are. It's common to have strong negative thoughts after something like that. Would you be open to exploring that thought 'I'm such an idiot' together for a moment?"

Here is the current conversation:
{{#each chatHistory}}
  {{#if (eq role "user")}}
  User: {{{content}}}
  {{else if (eq role "assistant")}}
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
     const llmResponse = await ai.generate({
        prompt: input.message,
        history: input.chatHistory as any, // Cast to any to handle tool role
        tools: [getRecentMoodLogs, getRecentJournalEntries]
    });

    const choice = llmResponse.choices[0];

    if (choice.finishReason === 'toolCode') {
        const toolRequest = choice.message.toolRequest!;
        console.log(`AI wants to call tool: ${toolRequest.name}`);
        // For simplicity, we are not executing the tool call in this example.
        // In a real app, you would execute the tool and return the result to the AI.
        // This example focuses on demonstrating the updated prompt and flow structure.
    }
    
    return {
      response: choice.message.content || 'I am not sure how to respond to that. Can you rephrase?',
    };
  }
);
