
'use client';

import Link from 'next/link';
import {
  Bell,
  CircleUser,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Logo } from '../icons';
import { SidebarNav } from './sidebar-nav';
import { useAuth } from '@/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Skeleton } from '../ui/skeleton';

export function Sidebar() {
    const auth = useAuth();
    const [user, loading] = useAuthState(auth);

    return (
        <div className="hidden border-r bg-muted/40 md:block w-64">
            <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                    <Link href="/" className="flex items-center gap-2 font-semibold">
                        <Logo className="h-6 w-6" />
                        <span className="">Rejoyn</span>
                    </Link>
                </div>
                <div className="flex-1">
                    <SidebarNav />
                </div>
                <div className="mt-auto p-4">
                    {loading ? (
                         <div className="flex items-center gap-2">
                            <Skeleton className="h-9 w-9 rounded-full" />
                            <div className="space-y-1">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-3 w-32" />
                            </div>
                        </div>
                    ) : user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-auto w-full justify-start gap-2 p-2">
                                     <Avatar className="h-9 w-9 border">
                                        {user.photoURL && <AvatarImage src={user.photoURL} alt={user.displayName || ''} />}
                                        <AvatarFallback>{user.displayName?.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className='text-left'>
                                        <p className="text-sm font-medium leading-none">{user.displayName}</p>
                                        <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                                    </div>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link href="/profile">Profile</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/profile">Settings</Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => auth.signOut()}>Logout</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Button asChild>
                            <Link href="/login">Login</Link>
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
}
