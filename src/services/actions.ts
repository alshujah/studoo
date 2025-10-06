
'use server';

import { analyzeJournalEntry, type AnalyzeJournalEntryInput, type AnalyzeJournalEntryOutput } from '@/services/flows/analyze-journal-entry';
import { analyzeThoughtRecord as analyzeThoughtRecordFlow, type AnalyzeThoughtRecordInput, type AnalyzeThoughtRecordOutput } from '@/services/flows/analyze-thought-record';
import { triageUserIssue as triageUserIssueFlow, type TriageUserIssueInput, type TriageUserIssueOutput } from '@/services/flows/triage-user-issue';
import { generateMeditationScript, generateMeditationAudio, type GenerateMeditationScriptInput, type GenerateMeditationScriptOutput, type GenerateMeditationAudioInput, type GenerateMeditationAudioOutput } from '@/services/flows/generate-meditation-flow';
import { miracleQuestion, type MiracleQuestionInput, type MiracleQuestionOutput } from '@/services/flows/miracle-question-flow';
import { scoreGad7, type ScoreGad7Input, type ScoreGad7Output } from '@/services/flows/score-gad7-flow';
import { scorePhq9, type ScorePhq9Input, type ScorePhq9Output } from '@/services/flows/score-phq-9-flow';
import { getMoodTriggers } from './actions/get-mood-triggers';
import { generateReportAction } from './actions/generate-report-action';
export { getMoodTriggers, generateReportAction };


export async function getJournalAnalysis(
  input: AnalyzeJournalEntryInput
): Promise<{ success: boolean; data?: AnalyzeJournalEntryOutput; error?: string }> {
  try {
    if (!input.journalEntry.trim()) {
      return { success: false, error: 'Journal entry cannot be empty.' };
    }
    const result = await analyzeJournalEntry(input);
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


export async function miracleQuestionAction(
  input: MiracleQuestionInput
): Promise<{ success: boolean; data?: MiracleQuestionOutput; error?: string }> {
  try {
    const result = await miracleQuestion(input);
    return { success: true, data: result };
  } catch (error: any) {
    console.error('Error in miracle question flow:', error);
    return { success: false, error: 'Failed to get a response from the AI coach.' };
  }
}

export async function scoreGad7Action(
    input: ScoreGad7Input
): Promise<{ success: boolean; data?: ScoreGad7Output; error?: string }> {
    try {
        const result = await scoreGad7(input);
        return { success: true, data: result };
    } catch (error: any) {
        console.error('Error scoring GAD-7:', error);
        return { success: false, error: 'Failed to score the assessment.' };
    }
}

export async function scorePhq9Action(
    input: ScorePhq9Input
): Promise<{ success: boolean; data?: ScorePhq9Output; error?: string }> {
    try {
        const result = await scorePhq9(input);
        return { success: true, data: result };
    } catch (error: any) {
        console.error('Error scoring PHQ-9:', error);
        return { success: false, error: 'Failed to score the assessment.' };
    }
}
