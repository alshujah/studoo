
'use server';

import { identifyMoodTriggers, type IdentifyMoodTriggersInput, type IdentifyMoodTriggersOutput } from '@/app/api/ai/flows/identify-mood-triggers';

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
