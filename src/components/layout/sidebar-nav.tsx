'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { BookOpen, Bot, ClipboardList, LayoutGrid, Sprout, User, PenSquare, BrainCircuit } from 'lucide-react';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';

const navItems = [
  { href: '/dashboard', icon: LayoutGrid, label: 'Dashboard' },
  { href: '/track', icon: ClipboardList, label: 'Track' },
  { href: '/track/journal', icon: PenSquare, label: 'Journal' },
  { href: '/tools', icon: Sprout, label: 'Tools' },
  { href: '/chatbot', icon: Bot, label: 'AI Coach' },
  { href: '/ai-features', icon: BrainCircuit, label: 'AI Features' },
  { href: '/learn', icon: BookOpen, label: 'Learn' },
  { href: '/profile', icon: User, label: 'Profile' },
];

export function SidebarNav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === href;
    if (href === '/track') return pathname.startsWith('/track');
    return pathname.startsWith(href);
  };

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <SidebarMenuButton
            asChild
            isActive={isActive(item.href)}
            tooltip={{ children: item.label }}
          >
            <Link href={item.href}>
              <item.icon />
              <span>{item.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
