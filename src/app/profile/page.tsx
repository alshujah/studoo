
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
import { useAuth } from '@/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Skeleton } from '@/components/ui/skeleton';
import { LogOut } from 'lucide-react';

export default function ProfilePage() {
  const auth = useAuth();
  const [user, loading] = useAuthState(auth);

  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">
          Profile & Settings
        </h1>
      </div>
      <div className="flex-1 space-y-6 p-4 md:p-6">
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
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
          </CardHeader>
          <CardContent>
            <Button
              variant="outline"
              onClick={() => auth.signOut()}
              disabled={loading}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </CardContent>
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
              <Button variant="outline" disabled>
                Set My Goals
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
              <Button variant="outline" disabled>
                Manage Habits
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
              <Button variant="outline" disabled>
                View My Skills
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
              <Button variant="outline" disabled>
                Export Data
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
    </main>
  );
}
