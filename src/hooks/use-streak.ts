
'use client';

import { useAuth, useFirestore } from "@/firebase";
import type { UserStreak } from "@/lib/types";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { format, isToday, isYesterday } from "date-fns";

export function useStreak(habitId: string) {
    const auth = useAuth();
    const [user] = useAuth(auth);
    const firestore = useFirestore();

    const updateStreak = async () => {
        if (!user || !firestore) return;

        const streakRef = doc(firestore, 'users', user.uid, 'streaks', habitId);
        const streakDoc = await getDoc(streakRef);
        const today = format(new Date(), 'yyyy-MM-dd');

        let streakData: Omit<UserStreak, 'id'>;

        if (streakDoc.exists()) {
            const data = streakDoc.data() as Omit<UserStreak, 'id'>;
            
            if (data.lastLogDate === today) {
                // Already logged today for this habit, do nothing.
                return;
            }

            const lastLogDate = new Date(data.lastLogDate);

            if (isYesterday(lastLogDate)) {
                // Continue streak
                const newStreak = data.currentStreak + 1;
                streakData = {
                    ...data,
                    currentStreak: newStreak,
                    longestStreak: Math.max(newStreak, data.longestStreak),
                    lastLogDate: today,
                };
            } else {
                // Reset streak
                streakData = { ...data, currentStreak: 1, lastLogDate: today };
            }
        } else {
            // First time logging this habit
            streakData = {
                userId: user.uid,
                habitId: habitId,
                currentStreak: 1,
                longestStreak: 1,
                lastLogDate: today,
            };
        }
        await setDoc(streakRef, streakData, { merge: true });
    };

    return { updateStreak };
}
