'use client';

import { useAuth } from '@/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Skeleton } from './ui/skeleton';
import { DashboardAuthenticated } from './dashboard-authenticated';
import { DashboardUnauthenticated } from './dashboard-unauthenticated';

export function DashboardClient() {
  const auth = useAuth();
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-6">
        <Skeleton className="h-48 col-span-1 md:col-span-2" />
        <Skeleton className="h-48 col-span-1 md:col-span-2" />
        <Skeleton className="h-96 col-span-1" />
        <Skeleton className="h-96 col-span-1 md:col-span-2 xl:col-span-1" />
        <Skeleton className="h-96 col-span-1 md:col-span-2" />
        <Skeleton className="h-96 col-span-1" />
      </div>
    );
  }

  if (user) {
    return <DashboardAuthenticated user={user} />;
  }

  return <DashboardUnauthenticated />;
}
