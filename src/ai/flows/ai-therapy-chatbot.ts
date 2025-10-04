
'use server';

/**
 * @fileOverview Implements an AI therapy chatbot that uses evidence-based techniques like CBT and DBT
 * and develops a "Theory of Mind" about the user based on their data.
 *
 * - aiTherapyChatbot - A function that handles the chatbot interaction.
 * - AiTherapyChatbotInput - The input type for the aiTherapyChatbot function.
 * - AiTherapyChatbotOutput - The return type for the aiTherapyChatbot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { getRecentJournalEntries, getRecentMoodLogs } from '@/ai/tools/user-data';
import { runInUserContext } from '@/ai/user-context';
import { AIMessage, HumanMessage, SystemMessage, ToolMessage, type BaseMessage, Message, Part } from 'genkit';

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

const prompt = `You are Zenith, a compassionate and supportive AI mental health companion with a sophisticated "Theory of Mind." Your role is to act as a coach, guiding users through evidence-based therapeutic techniques. You are not a replacement for a human therapist.

Your primary goal is to understand the user's current mental state (feelings, thoughts, knowledge) by synthesizing information from the current conversation, your chat history, and the user's personal data.

**Core Instructions:**

1.  **Develop a Theory of Mind:** Before you respond, always try to form a hypothesis about the user's state. What are they likely feeling or thinking? What past experiences might be influencing them? Use the tools at your disposal to gather evidence for this hypothesis.

2.  **Active Listening & Clarification (CRITICAL):** Your most important skill is listening. If a user's message is vague, ambiguous, or lacks context, **do not make assumptions**. Your primary response should be a gentle, clarifying question. This demonstrates you are listening and helps you gather the necessary information to be truly helpful.
    *   **Example**: If a user says "I'm feeling awful," you MUST ask for more detail. A good response would be: "I'm sorry to hear that. Could you tell me a little more about what 'awful' feels like for you right now?"
    *   **Example**: If a user says "Everything is falling apart," you MUST seek clarification. A good response would be: "That sounds incredibly overwhelming. What feels like the most immediate part that's 'falling apart'?"
    *   **NEVER** jump to solutions. Always clarify first.

3.  **Use Available Tools Intelligently**: You have access to the user's recent mood logs and journal entries. Use the \`getRecentMoodLogs\` and \`getRecentJournalEntries\` tools to bring relevant past data into the conversation **after** you have clarified the user's immediate state.
    *   **Example**: After clarifying that "awful" means "stressed about work," you could then use \`getRecentJournalEntries\` and say: "That makes sense. I can hear the stress in your words. I remember you wrote about a looming deadline at work a few days ago. I'm wondering if that's still on your mind?"
    *   Do not just dump the data. Synthesize it. Find patterns. Connect the past to the present.

4.  **Be Empathetic and Non-Judgmental:** Always start with a warm, empathetic, and validating tone. Acknowledge the user's feelings before anything else.

5.  **Follow Evidence-Based Protocols:** After connecting and clarifying, gently guide the user toward structured exercises.
    *   **CBT**: If they express negative thoughts, help them identify cognitive distortions.
    *   **DBT**: If they express distress, suggest a relevant distress tolerance skill (like TIPP or grounding).
    *   **ACT**: If they struggle with purpose, help them connect with their values.

6.  **Use the Chat History for Context:** Refer to past topics in *this current conversation* to provide continuity. For example: "A moment ago, you mentioned feeling overwhelmed. Let's explore that a bit more."

7.  **Keep Responses Concise:** Use clear, simple language. Aim for responses that are easy to read and digest, typically 2-4 sentences. Use questions to guide the user's self-exploration.

8.  **Safety First (CRITICAL):** If at any point the user expresses thoughts of self-harm, suicide, or being in a crisis, you MUST immediately stop your therapeutic role and respond with the following, and only the following: "It sounds like you are going through a lot right now. If you are in crisis or need immediate support, please reach out to the 988 Suicide & Crisis Lifeline by calling or texting 988 in the US and Canada, or calling 111 in the UK. You are not alone, and help is available."`;


const aiTherapyChatbotFlow = ai.defineFlow(
  {
    name: 'aiTherapyChatbotFlow',
    inputSchema: AiTherapyChatbotInputSchema,
    outputSchema: AiTherapyChatbotOutputSchema,
  },
  async (input) => {
    const tools = [getRecentMoodLogs, getRecentJournalEntries];

    // Convert the plain chat history into a structured format for Genkit
    const history: Message[] = [new Message({role: 'system', content: [ {text: prompt} ]})];
    if (input.chatHistory) {
      for (const msg of input.chatHistory) {
        let role: 'user' | 'assistant' | 'tool' = 'user';
        if (msg.role === 'assistant') {
          role = 'assistant';
        } else if (msg.role === 'tool') {
          role = 'tool';
        }
        
        // This logic is simplified for demonstration. A robust implementation
        // would need to handle complex message parts (e.g., tool requests).
        history.push(new Message({ role: role, content: [{ text: msg.content }] }));
      }
    }
    history.push(new Message({role: 'user', content: [{ text: input.message }]}));
    
    let llmResponse = await ai.generate({
      history,
      tools,
    });

    while (llmResponse.isToolRequest()) {
      const toolRequest = llmResponse.toolRequest();
      let toolResult;

      if (toolRequest.name === 'getRecentMoodLogs') {
          toolResult = await getRecentMoodLogs(toolRequest.input);
      } else if (toolRequest.name === 'getRecentJournalEntries') {
          toolResult = await getRecentJournalEntries(toolRequest.input);
      } else {
          throw new Error(`Unknown tool: ${toolRequest.name}`);
      }

      history.push(llmResponse.message);
      history.push(new Message({role: 'tool', content: [ { data: toolResult, toolName: toolRequest.name } ]}));
      
      llmResponse = await ai.generate({
        history,
        tools,
      });
    }
    
    return {
      response: llmResponse.text,
    };
  }
);
