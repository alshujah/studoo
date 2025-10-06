
'use client';

import { useState, useTransition, useCallback, useEffect } from 'react';
import { useFirestore } from '@/firebase';
import { collection, getDocs, query, where, orderBy, Timestamp, limit } from 'firebase/firestore';
import { getMoodTriggers } from '@/services/actions';
import { subDays } from 'date-fns';
import type { MoodLog } from '@/lib/types';


export type MoodTrigger = {
    trigger: string;
    relatedEmotions: string[];
    pattern: string;
};

export function useMoodTriggers(userId: string) {
    const [isPending, startTransition] = useTransition();
    const [triggers, setTriggers] = useState<MoodTrigger[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const firestore = useFirestore();

    const findTriggers = useCallback(async () => {
        setTriggers(null);
        setError(null);
        startTransition(async () => {
            if (!userId || !firestore) {
                setError("User not authenticated.");
                return;
            }

            try {
                // 1. Fetch recent mood logs
                const thirtyDaysAgo = subDays(new Date(), 30);
                const moodLogsQuery = query(
                    collection(firestore, 'users', userId, 'moodLogs'),
                    where('timestamp', '>=', thirtyDaysAgo),
                    orderBy('timestamp', 'desc'),
                    limit(100) // Limit to a reasonable number for analysis
                );

                const snapshot = await getDocs(moodLogsQuery);
                if (snapshot.docs.length < 5) {
                    setTriggers([]);
                    // This is not an error, but a state of insufficient data.
                    setError("Not enough mood logs in the last 30 days to identify triggers. Keep logging your mood to see insights here.");
                    return;
                }
                
                const moodLogs: MoodLog[] = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                    // Firestore Timestamps need to be converted for JSON stringification
                    timestamp: (doc.data().timestamp as Timestamp).toDate().toISOString()
                } as MoodLog));

                // 2. Call the AI flow with the logs
                const result = await getMoodTriggers({ moodLogs: JSON.stringify(moodLogs) });

                if (result.success && result.data?.triggers) {
                    setTriggers(result.data.triggers);
                    if (result.data.triggers.length === 0) {
                       setError("No significant triggers were identified from your recent mood logs.");
                    }
                } else {
                    setError(result.error || "An unknown error occurred during analysis.");
                    setTriggers([]);
                }

            } catch (e: any) {
                console.error("Error finding mood triggers:", e);
                setError(e.message || "Failed to fetch or analyze mood logs.");
                setTriggers([]);
            }
        });
    }, [userId, firestore]);

    useEffect(() => {
        findTriggers();
    }, [findTriggers]);

    return {
        triggers,
        isLoading: isPending,
        error
    };
}
