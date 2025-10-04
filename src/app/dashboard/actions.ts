'use server';

import { identifyMoodTriggers, type IdentifyMoodTriggersInput } from '@/ai/flows/identify-mood-triggers';

export async function getMoodTriggers(
    input: IdentifyMoodTriggersInput
): Promise<any> {
    try {
        const result = await identifyMoodTriggers(input);
        return { success: true, data: result };
    } catch (error) {
        console.error('Error getting mood triggers analysis:', error);
        return { success: false, error: 'Failed to get analysis from the AI coach.' };
    }
}
