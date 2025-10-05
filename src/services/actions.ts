
'use server';

import { aiTherapyChatbot } from '@/services/flows/ai-therapy-chatbot';
import { analyzeJournalEntry, type AnalyzeJournalEntryOutput } from '@/services/flows/analyze-journal-entry';
import { analyzeThoughtRecord as analyzeThoughtRecordFlow, type AnalyzeThoughtRecordInput, type AnalyzeThoughtRecordOutput } from '@/services/flows/analyze-thought-record';
import { triageUserIssue as triageUserIssueFlow, type TriageUserIssueInput, type TriageUserIssueOutput } from '@/services/flows/triage-user-issue';
import type { ChatMessage } from '@/lib/types';
import { identifyMoodTriggers, type IdentifyMoodTriggersInput, type IdentifyMoodTriggersOutput } from '@/services/flows/identify-mood-triggers';
import { generateMeditationScript, generateMeditationAudio, type GenerateMeditationScriptInput, type GenerateMeditationScriptOutput, type GenerateMeditationAudioInput, type GenerateMeditationAudioOutput } from '@/services/flows/generate-meditation-flow';
import { getApps, initializeApp, type App } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';


// Initialize Firebase Admin SDK
if (!getApps().length) {
  initializeApp();
}

export async function getAiResponse(
  messages: ChatMessage[],
  userId: string
): Promise<{ success: boolean; data?: ChatMessage; error?: string }> {
  try {
    const userMessage = messages[messages.length - 1];
    if (userMessage.role !== 'user') {
      return { success: false, error: 'Invalid message sequence.' };
    }
    
    const chatHistory = messages.slice(0, -1).map(msg => ({
        role: msg.role as 'user' | 'assistant' | 'tool',
        content: msg.content
    }));

    const result = await aiTherapyChatbot({
      message: userMessage.content,
      chatHistory: chatHistory,
      userId: userId
    });
    
    const assistantMessage: ChatMessage = { role: 'assistant' as const, content: result.response };

    return { success: true, data: assistantMessage };

  } catch (error) {
    console.error('Error getting AI response:', error);
    return { success: false, error: 'Failed to get a response from the AI coach.' };
  }
}


export async function getJournalAnalysis(
  journalEntry: string
): Promise<{ success: boolean; data?: AnalyzeJournalEntryOutput; error?: string }> {
  try {
    if (!journalEntry.trim()) {
      return { success: false, error: 'Journal entry cannot be empty.' };
    }
    const result = await analyzeJournalEntry({ journalEntry });
    return { success: true, data: result };
  } catch (error)
 {
    console.error('Error getting journal analysis:', error);
    return { success: false, error: 'Failed to get analysis from the AI coach.' };
  }
}

export async function analyzeThoughtRecord(
    input: AnalyzeThoughtRecordInput
): Promise<{ success: boolean; data?: AnalyzeThoughtRecordOutput; error?: string }> {
    try {
        const result = await analyzeThoughtRecordFlow(input);
        return { success: true, data: result };
    } catch (error: any) {
        console.error('Error analyzing thought record:', error);
        return { success: false, error: 'Failed to get analysis from the AI coach.' };
    }
}


export async function getMoodTriggers(
    input: IdentifyMoodTriggersInput
): Promise<{ success: boolean; data?: IdentifyMoodTriggersOutput; error?: string }> {
    try {
        const result = await identifyMoodTriggers(input);
        return { success: true, data: result };
    } catch (error: any) {
        console.error('Error getting mood triggers:', error);
        return { success: false, error: 'Failed to get insights from the AI coach.' };
    }
}


export async function triageIssue(
  input: TriageUserIssueInput
): Promise<{ success: boolean; data?: TriageUserIssueOutput; error?: string }> {
  try {
    if (!input.issue.trim()) {
      return { success: false, error: 'Issue description cannot be empty.' };
    }
    const result = await triageUserIssueFlow(input);
    return { success: true, data: result };
  } catch (error) {
    console.error('Error getting triage recommendation:', error);
    return { success: false, error: 'Failed to get a recommendation.' };
  }
}

export async function generateMeditationScriptAction(
    input: GenerateMeditationScriptInput
): Promise<{ success: boolean; data?: GenerateMeditationScriptOutput; error?: string }> {
    try {
        const result = await generateMeditationScript(input);
        return { success: true, data: result };
    } catch (error: any) {
        console.error('Error generating meditation script:', error);
        return { success: false, error: 'Failed to generate meditation script.' };
    }
}

export async function generateMeditationAudioAction(
    input: GenerateMeditationAudioInput
): Promise<{ success: boolean; data?: GenerateMeditationAudioOutput; error?: string }> {
    try {
        const result = await generateMeditationAudio(input);
        return { success: true, data: result };
    } catch (error: any) {
        console.error('Error generating meditation audio:', error);
        return { success: false, error: 'Failed to generate meditation audio.' };
    }
}
