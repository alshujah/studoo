'use client';

import Link from 'next/link';
import { Logo } from '../icons';
import { SidebarNav } from './sidebar-nav';
import { useAuth } from '@/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Skeleton } from '../ui/skeleton';
import { Button } from '../ui/button';

export function Sidebar() {
    const auth = useAuth();
    const [user, loading] = useAuthState(auth);

    return (
        <aside className="hidden md:flex flex-col w-64 border-r bg-background/60">
            <div className="flex h-14 items-center border-b px-6">
                <Link href="/" className="flex items-center gap-2 font-semibold">
                    <Logo className="h-6 w-6 text-primary" />
                    <span className="font-headline text-lg">Zenith</span>
                </Link>
            </div>
            <div className="flex-1 overflow-y-auto">
                <SidebarNav />
            </div>
             <div className="mt-auto p-4 border-t">
                {loading ? (
                    <div className="flex items-center gap-3">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <div className="space-y-1">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-3 w-32" />
                        </div>
                    </div>
                ) : !user ? (
                     <Button asChild className="w-full">
                        <Link href="/login">Login</Link>
                    </Button>
                ) : null}
            </div>
        </aside>
    )
}
