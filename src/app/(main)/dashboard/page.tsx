
'use client';

import { useAuth } from '@/lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Skeleton } from '@/components/ui/skeleton';
import { DashboardAuthenticated } from '@/components/dashboard/dashboard-authenticated';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardPage() {
  const auth = useAuth();
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [user, loading, router]);


  if (loading || !user) {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-6">
        <Skeleton className="h-48 col-span-1 md:col-span-2 xl:col-span-4" />
        <Skeleton className="h-96 col-span-1 md:col-span-2 xl:col-span-2" />
        <Skeleton className="h-96 col-span-1" />
        <Skeleton className="h-96 col-span-1" />
        <Skeleton className="h-96 col-span-1 md:col-span-2" />
        <Skeleton className="h-96 col-span-1 md:col-span-2" />
      </div>
    );
  }

  return <DashboardAuthenticated user={user} />;
}

    