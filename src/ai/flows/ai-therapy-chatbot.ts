
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
import { AIMessage, HumanMessage, SystemMessage, ToolMessage, type BaseMessage } from 'genkit';

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
2.  **Use Available Tools Intelligently**: You have access to the user's recent mood logs and journal entries. Use the \`getRecentMoodLogs\` and \`getRecentJournalEntries\` tools to bring relevant past data into the conversation.
    *   **Example**: If the user says "I'm so stressed," you might use \`getRecentJournalEntries\` to see if they've written about work lately. You could then respond: "I can hear the stress in your words. I remember you wrote about a looming deadline at work a few days ago. I'm wondering if that's still on your mind?"
    *   Do not just dump the data. Synthesize it. Find patterns. Connect the past to the present.
3.  **Be Empathetic and Non-Judgmental:** Always start with a warm, empathetic, and validating tone. Acknowledge the user's feelings before anything else.
4.  **Follow Evidence-Based Protocols:** After connecting, gently guide the user through structured exercises.
    *   **CBT**: If they express negative thoughts, help them identify cognitive distortions.
    *   **DBT**: If they express distress, suggest a relevant distress tolerance skill (like TIPP or grounding).
    *   **ACT**: If they struggle with purpose, help them connect with their values.
5.  **Use the Chat History for Context:** Refer to past topics in *this current conversation* to provide continuity. For example: "A moment ago, you mentioned feeling overwhelmed. Let's explore that a bit more."
6.  **Keep Responses Concise:** Use clear, simple language. Aim for responses that are easy to read and digest, typically 2-4 sentences. Use questions to guide the user's self-exploration.
7.  **Safety First (CRITICAL):** If at any point the user expresses thoughts of self-harm, suicide, or being in a crisis, you MUST immediately stop your therapeutic role and respond with the following, and only the following: "It sounds like you are going through a lot right now. If you are in crisis or need immediate support, please reach out to the 988 Suicide & Crisis Lifeline by calling or texting 988 in the US and Canada, or calling 111 in the UK. You are not alone, and help is available."`;


const aiTherapyChatbotFlow = ai.defineFlow(
  {
    name: 'aiTherapyChatbotFlow',
    inputSchema: AiTherapyChatbotInputSchema,
    outputSchema: AiTherapyChatbotOutputSchema,
  },
  async (input) => {
    const tools = [getRecentMoodLogs, getRecentJournalEntries];
    
    // Construct the message history
    const history: BaseMessage[] = [new SystemMessage(prompt)];
    if (input.chatHistory) {
        input.chatHistory.forEach(msg => {
            if (msg.role === 'user') {
                history.push(new HumanMessage(msg.content));
            } else if (msg.role === 'assistant') {
                history.push(new AIMessage(msg.content));
            } else if (msg.role === 'tool') {
                // Find the associated tool request in the previous AI message to get the tool name
                const aiMsg = history[history.length-1] as AIMessage;
                const toolName = aiMsg.toolRequest?.name;
                if (toolName) {
                    history.push(new ToolMessage(toolName, msg.content));
                }
            }
        });
    }
    history.push(new HumanMessage(input.message));

    // Generate the initial response, which may be a tool call
    const llmResponse = await ai.generate({
        history,
        tools,
    });

    const choice = llmResponse.choices[0];

    // If the model chose to use a tool
    if (choice.finishReason === 'toolCode' && choice.message.toolRequest) {
        const toolRequest = choice.message.toolRequest;
        
        // Add the AI's tool request to the history
        history.push(choice.message);

        let toolResult;
        if (toolRequest.name === 'getRecentMoodLogs') {
            toolResult = await getRecentMoodLogs(toolRequest.input);
        } else if (toolRequest.name === 'getRecentJournalEntries') {
            toolResult = await getRecentJournalEntries(toolRequest.input);
        } else {
            throw new Error(`Unknown tool: ${toolRequest.name}`);
        }

        // Add the result from the tool call to the history
        history.push(new ToolMessage(toolRequest.name, toolResult));
        
        // Call the model again with the new history containing the tool result
        const finalResponse = await ai.generate({
            history,
            tools,
        });

        return {
            response: finalResponse.text,
        };
    }
    
    // If the model did not use a tool, return its direct response
    return {
      response: choice.text || 'I am not sure how to respond to that. Can you rephrase?',
    };
  }
);
