'use client';

import React from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Logo } from '@/components/icons';
import { SidebarNav } from './sidebar-nav';
import { useAuth } from '@/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Skeleton } from '../ui/skeleton';
import { Button } from '../ui/button';
import { signInWithGoogle } from '@/firebase/auth/google-provider';
import { LogOut } from 'lucide-react';
import Link from 'next/link';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const auth = useAuth();
  const [user, loading] = useAuthState(auth);

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Logo className="size-8 text-primary" />
            <span className="text-lg font-semibold font-headline">Rejoyn</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarNav />
        </SidebarContent>
        <SidebarFooter>
          {loading ? (
            <div className="flex items-center gap-3">
              <Skeleton className="size-8 rounded-full" />
              <div className="flex flex-col gap-1">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-3 w-32" />
              </div>
            </div>
          ) : user ? (
             <div className="flex items-center gap-3 overflow-hidden">
                <Link href="/profile">
                    <Avatar className="size-8">
                        {user.photoURL && <AvatarImage src={user.photoURL} alt="User Avatar" />}
                        <AvatarFallback>{user.displayName?.charAt(0) || 'U'}</AvatarFallback>
                    </Avatar>
                </Link>
                <div className="flex flex-col overflow-hidden">
                    <Link href="/profile" className="text-sm font-medium text-sidebar-foreground truncate hover:underline">{user.displayName}</Link>
                    <span className="text-xs text-sidebar-foreground/70 truncate">{user.email}</span>
                </div>
            </div>
          ) : (
             <Button className="w-full" onClick={() => signInWithGoogle(auth)}>
                Sign In
             </Button>
          )}
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:hidden">
          <SidebarTrigger />
          <h1 className="text-lg font-semibold font-headline">Rejoyn</h1>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
