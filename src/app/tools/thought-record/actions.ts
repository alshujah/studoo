'use server';

import { analyzeThoughtRecord, type AnalyzeThoughtRecordInput, type AnalyzeThoughtRecordOutput } from '@/ai/flows/analyze-thought-record';

export async function getAiAnalysis(
  input: AnalyzeThoughtRecordInput
): Promise<{ success: boolean; data?: AnalyzeThoughtRecordOutput; error?: string }> {
  try {
    const result = await analyzeThoughtRecord(input);
    return { success: true, data: result };
  } catch (error) {
    console.error('Error getting AI analysis:', error);
    return { success: false, error: 'Failed to get analysis from the AI coach.' };
  }
}
