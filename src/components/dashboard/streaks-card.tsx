
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth, useFirestore, useMemoFirebase } from "@/firebase";
import { useDocument } from "react-firebase-hooks/firestore";
import { doc } from 'firebase/firestore';
import { Flame, Star, Loader } from "lucide-react";
import type { UserStreak } from "@/lib/types";
import { cn } from "@/lib/utils";
import { format, isToday } from "date-fns";

export function StreaksCard() {
    const auth = useAuth();
    const [user] = useAuth(auth);
    const firestore = useFirestore();

    const streakDocRef = useMemoFirebase(() => {
        if (!user || !firestore) return null;
        return doc(firestore, 'users', user.uid, 'streaks', 'moodCheckin');
    }, [user, firestore]);

    const [streakSnapshot, loading] = useDocument(streakDocRef);

    const streakData = streakSnapshot?.data() as UserStreak | undefined;
    const hasLoggedToday = streakData ? isToday(new Date(streakData.lastLogDate)) : false;

    if (loading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">My Streaks</CardTitle>
                    <CardDescription>Keep your momentum going!</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-center p-8">
                    <Loader className="animate-spin" />
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="col-span-1 flex flex-col">
            <CardHeader>
                <CardTitle className="font-headline">My Streaks</CardTitle>
                <CardDescription>Keep your momentum going!</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-center items-center gap-6">
                <div className="text-center">
                    <Flame className={cn("size-20 mx-auto", hasLoggedToday ? "text-orange-500" : "text-muted-foreground/30")} />
                    <p className="text-5xl font-bold">{streakData?.currentStreak || 0}</p>
                    <p className="text-muted-foreground">Day Streak</p>
                </div>
                <div className="flex items-center gap-4 text-muted-foreground">
                     <div className="flex items-center gap-2">
                        <Star className="size-5" />
                        <div>
                            <p className="font-bold">{streakData?.longestStreak || 0}</p>
                            <p className="text-xs">Longest</p>
                        </div>
                     </div>
                </div>
            </CardContent>
        </Card>
    );
}

    