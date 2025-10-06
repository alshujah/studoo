
'use client';

import { useState, useTransition, useMemo, useEffect } from 'react';
import type { User } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { triageIssue } from '@/services/actions';
import type { TriageUserIssueOutput } from '@/services/flows/triage-user-issue';
import { useFirestore } from '@/lib/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, query, orderBy, where, Timestamp, limit } from 'firebase/firestore';
import { subDays, format } from 'date-fns';
import type { MoodLog } from '@/lib/types';
import { useMoodTriggers } from '@/hooks/use-mood-triggers';


export function useDashboardData(user: User) {
    const [isTriagePending, startTriageTransition] = useTransition();
    const [issue, setIssue] = useState('');
    const [greeting, setGreeting] = useState('');
    const [triageResult, setTriageResult] = useState<TriageUserIssueOutput | null>(null);
    const { toast } = useToast();
    const firestore = useFirestore();

    useEffect(() => {
        const hours = new Date().getHours();
        if (hours < 12) setGreeting('Good morning');
        else if (hours < 18) setGreeting('Good afternoon');
        else setGreeting('Good evening');
    }, []);

    const {
        triggers,
        isLoading: isLoadingTriggers,
        error: triggersError,
    } = useMoodTriggers(user.uid);

    const moodLogQuery = useMemo(() => {
        if (!user || !firestore) return null;
        const sevenDaysAgo = subDays(new Date(), 7);
        return query(
            collection(firestore, 'users', user.uid, 'moodLogs'),
            where('timestamp', '>=', sevenDaysAgo),
            orderBy('timestamp', 'desc')
        );
    }, [user, firestore]);
    
    const journalQuery = useMemo(() => {
        if (!user || !firestore) return null;
        return query(
        collection(firestore, 'users', user.uid, 'journalEntries'),
        orderBy('timestamp', 'desc'),
        limit(5)
        );
    }, [user, firestore]);

    const [moodLogsSnapshot, loadingMoodLogs] = useCollection(moodLogQuery);
    const [journalEntriesSnapshot, loadingJournalEntries] = useCollection(journalQuery);

    const moodChartData = useMemo(() => {
        const last7Days = Array.from({ length: 7 }).map((_, i) => {
            const d = subDays(new Date(), 6 - i);
            return { day: format(d, 'EEE'), mood: 0, date: format(d, 'yyyy-MM-dd') };
        });

        if (!moodLogsSnapshot) return last7Days;

        const moodMapping: { [key: string]: number } = { 'Joy': 5, 'Contentment': 4, 'Surprise': 3, 'Sadness': 2, 'Fear': 1, 'Anger': 1, 'Disgust': 1 };
        
        const aggregatedData: { [key: string]: { total: number; count: number } } = {};

        moodLogsSnapshot.docs.forEach(doc => {
            const log = doc.data() as MoodLog;
            if (log.timestamp) {
                const date = (log.timestamp as Timestamp).toDate();
                const day = format(date, 'yyyy-MM-dd');
                const moodValue = moodMapping[log.coreEmotion] || (log.intensity / 25);
                if (!aggregatedData[day]) {
                    aggregatedData[day] = { total: 0, count: 0 };
                }
                aggregatedData[day].total += moodValue;
                aggregatedData[day].count += 1;
            }
        });

        return last7Days.map(day => {
            const dayData = aggregatedData[day.date];
            if (dayData) return { ...day, mood: Math.round(dayData.total / dayData.count) };
            return day;
        });

    }, [moodLogsSnapshot]);

    const handleTriageSubmit = () => {
        if (!issue.trim()) {
            toast({ variant: "destructive", title: "Error", description: "Please describe what's on your mind." });
            return;
        }
        setTriageResult(null);
        startTriageTransition(async () => {
        const result = await triageIssue({ issue });
        if (result.success && result.data) setTriageResult(result.data);
        else toast({ variant: "destructive", title: "Analysis Failed", description: result.error || "Could not get a recommendation." });
        });
    };

    return {
        issue,
        setIssue,
        greeting,
        triageResult,
        isTriagePending,
        handleTriageSubmit,
        moodChartData,
        loadingMoodLogs,
        triggers,
        isLoadingTriggers,
        triggersError,
        journalEntriesSnapshot,
        loadingJournalEntries
    }
}
