'use client';

import { usePathname } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { LogOut, CircleUser } from "lucide-react"
import { useAuth } from "@/firebase";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useAuthState } from "react-firebase-hooks/auth";
import { ThemeToggle } from './theme-toggle';
import { Logo } from '../icons';

const getPageTitle = (pathname: string) => {
  if (pathname.includes('/dashboard')) return 'Dashboard';
  if (pathname.includes('/chatbot')) return 'AI Coach';
  if (pathname.includes('/todo')) return 'To-Do List';
  if (pathname.includes('/track')) return 'Tracking & Assessments';
  if (pathname.includes('/tools')) return 'Therapeutic Tools';
  if (pathname.includes('/learn')) return 'Learn';
  if (pathname.includes('/profile')) return 'My Profile';
  return 'Zenith';
}

export function Header() {
    const auth = useAuth();
    const [user, loading] = useAuthState(auth);
    const pathname = usePathname();
    const pageTitle = getPageTitle(pathname);

    return (
         <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
          <div className="flex items-center gap-2 md:hidden">
              <Logo className="h-6 w-6 text-primary" />
              <span className="font-headline text-lg font-semibold">Zenith</span>
          </div>
          
          <div className="flex-1">
             <h1 className="text-lg font-semibold hidden md:block">{pageTitle}</h1>
          </div>

          <ThemeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                 {user && !loading ? (
                    <Avatar className="h-8 w-8">
                       {user.photoURL && <AvatarImage src={user.photoURL} alt={user.displayName || 'user'} />}
                       <AvatarFallback>{user.displayName?.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                 ) : (
                    <CircleUser className="h-5 w-5" />
                 )}
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild><Link href="/profile">Profile</Link></DropdownMenuItem>
              <DropdownMenuItem asChild><Link href="/profile/export">Export Data</Link></DropdownMenuItem>
              <DropdownMenuSeparator />
               <DropdownMenuItem onClick={() => auth?.signOut()}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
    )
}
