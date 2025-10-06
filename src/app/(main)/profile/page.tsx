
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Skeleton } from '@/components/ui/skeleton';
import { LogOut } from 'lucide-react';
import Link from 'next/link';
import { PageLayout } from '@/components/layout/page-layout';

export default function ProfilePage() {
  const auth = useAuth();
  const [user, loading] = useAuthState(auth);

  return (
    <PageLayout title="Profile & Settings">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    {loading ? (
                      <Skeleton className="h-16 w-16 rounded-full" />
                    ) : (
                      <Avatar className="h-16 w-16">
                        {user?.photoURL && (
                          <AvatarImage src={user.photoURL} alt="User avatar" />
                        )}
                        <AvatarFallback className="text-xl">
                          {user?.displayName?.charAt(0) || 'U'}
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div className="grid gap-1">
                      <CardTitle className="font-headline text-2xl">
                        {loading ? (
                          <Skeleton className="h-7 w-40" />
                        ) : (
                          user?.displayName || 'Welcome'
                        )}
                      </CardTitle>
                      <CardDescription>
                        {loading ? (
                          <Skeleton className="mt-1 h-4 w-52" />
                        ) : (
                          user?.email || 'Your personal space to grow'
                        )}
                      </CardDescription>
                    </div>
                </div>
                 <Button
                  variant="outline"
                  onClick={() => auth.signOut()}
                  disabled={loading}
                  size="sm"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>My Goals</CardTitle>
              <CardDescription>
                Define and track what you want to achieve.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline">
                <Link href="/tools/act/values-clarification">Set My Values</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Habit Tracker</CardTitle>
              <CardDescription>
                Build and maintain positive daily habits.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline">
                <Link href="/track/activity-log">Log an Activity</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>My Coping Skills</CardTitle>
              <CardDescription>
                Access your personalized toolbox of coping strategies.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline">
                <Link href="/tools">View All Tools</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Progress Reports</CardTitle>
              <CardDescription>
                Export summaries for yourself or a therapist.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline">
                <Link href="/profile/export">Export Data</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Account Security</CardTitle>
              <CardDescription>
                Manage your login and security settings.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" disabled>
                Update Security
              </Button>
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
              <CardTitle>Privacy</CardTitle>
              <CardDescription>
                Control how your data is used and stored.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" disabled>
                Manage Privacy
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
}

    