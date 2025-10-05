
'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  BookOpen,
  Bot,
  ClipboardList,
  LayoutGrid,
  Sprout,
  User,
  HeartPulse,
  Brain,
  MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard', icon: LayoutGrid, label: 'Dashboard' },
  { href: '/chatbot', icon: Bot, label: 'AI Coach' },
];

const trackingItems = [
    { href: '/track/mood', icon: HeartPulse, label: 'Mood Check-in' },
    { href: '/track/journal', icon: Brain, label: 'Journal' },
]

const mainNavItems = [
  { href: '/track', icon: ClipboardList, label: 'Track' },
  { href: '/tools', icon: Sprout, label: 'Tools' },
  { href: '/programs', icon: BookOpen, label: 'Programs' },
  { href: '/learn', icon: BookOpen, label: 'Learn' },
];


export function SidebarNav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <nav className="grid items-start gap-1 p-2 text-sm font-medium">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-all hover:bg-muted hover:text-primary',
            isActive(item.href) && 'bg-muted text-primary font-semibold'
          )}
        >
          <item.icon className="h-5 w-5" />
          {item.label}
        </Link>
      ))}
      <p className="px-3 pt-2 text-xs font-semibold text-muted-foreground/80 tracking-wider uppercase">Explore</p>
       {mainNavItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-all hover:bg-muted hover:text-primary',
            isActive(item.href) && 'bg-muted text-primary font-semibold'
          )}
        >
          <item.icon className="h-5 w-5" />
          {item.label}
        </Link>
      ))}
       <p className="px-3 pt-2 text-xs font-semibold text-muted-foreground/80 tracking-wider uppercase">Settings</p>
        <Link
          href="/profile"
          className={cn(
            'flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-all hover:bg-muted hover:text-primary',
            isActive('/profile') && 'bg-muted text-primary font-semibold'
          )}
        >
          <User className="h-5 w-5" />
          Profile
        </Link>
    </nav>
  );
}
