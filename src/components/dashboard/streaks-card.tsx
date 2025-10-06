
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth, useFirestore } from "@/lib/firebase";
import { useDocument } from "react-firebase-hooks/firestore";
import { doc } from 'firebase/firestore';
import { Flame, Star, Loader, BookOpen, Smile } from "lucide-react";
import type { UserStreak } from "@/types";
import { cn } from "@/lib/utils";
import { isToday } from "date-fns";
import { useAuthState } from "react-firebase-hooks/auth";
import { useMemo } from "react";

function StreakDisplay({ habitId, icon: Icon, label }: { habitId: string; icon: React.ElementType, label: string; }) {
    const auth = useAuth();
    const [user] = useAuthState(auth);
    const firestore = useFirestore();

    const streakDocRef = useMemo(() => {
        if (!user || !firestore) return null;
        return doc(firestore, 'users', user.uid, 'streaks', habitId);
    }, [user, firestore, habitId]);

    const [streakSnapshot, loading] = useDocument(streakDocRef);

    const streakData = streakSnapshot?.data() as UserStreak | undefined;
    const hasLoggedToday = streakData ? isToday(new Date(streakData.lastLogDate)) : false;

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center gap-2 text-center p-4">
                <Loader className="animate-spin" />
                <p className="text-xs text-muted-foreground">Loading {label}...</p>
            </div>
        )
    }
    
    return (
        <div className="flex flex-col items-center justify-center text-center">
            <div className="relative">
                <Icon className={cn("size-16 mx-auto mb-1", hasLoggedToday ? "text-orange-400" : "text-muted-foreground/30")} />
                {hasLoggedToday && <Flame className="size-16 mx-auto text-orange-500 absolute top-0 left-1/2 -translate-x-1/2" />}
            </div>
            <p className="text-4xl font-bold">{streakData?.currentStreak || 0}</p>
            <p className="text-xs text-muted-foreground">{label}</p>
            <div className="flex items-center gap-1 text-muted-foreground text-xs mt-2">
                <Star className="size-3" />
                <span>{streakData?.longestStreak || 0}</span>
            </div>
        </div>
    )
}


export function StreaksCard() {
    return (
        <Card className="col-span-1 flex flex-col">
            <CardHeader>
                <CardTitle className="font-headline">My Streaks</CardTitle>
                <CardDescription>Keep your momentum going!</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex justify-around items-center gap-6">
                <StreakDisplay habitId="moodCheckin" icon={Smile} label="Mood" />
                <StreakDisplay habitId="journaling" icon={BookOpen} label="Journal" />
            </CardContent>
        </Card>
    );
}
