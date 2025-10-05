
'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { BookOpen, Bot, ClipboardList, LayoutGrid, Sprout, User } from 'lucide-react';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';

const navItems = [
  { href: '/dashboard', icon: LayoutGrid, label: 'Dashboard' },
  { 
    href: '/track', 
    icon: ClipboardList, 
    label: 'Track',
    subItems: [
      { href: '/track/mood', label: 'Mood Check-in' },
      { href: '/track/journal', label: 'Journal' },
      { href: '/track/phq-9', label: 'PHQ-9 Assessment' },
      { href: '/track/gad-7', label: 'GAD-7 Assessment' },
    ]
  },
  { 
    href: '/tools', 
    icon: Sprout, 
    label: 'Tools',
    subItems: [
        { href: '/tools/cbt', label: 'CBT' },
        { href: '/tools/dbt', label: 'DBT' },
        { href: '/tools/act', label: 'ACT' },
        { href: '/tools/mindfulness', label: 'Mindfulness' },
        { href: '/tools/positive-psychology', label: 'Positive Psychology' },
    ]
  },
  { href: '/programs', icon: BookOpen, label: 'Programs' },
  { href: '/chatbot', icon: Bot, label: 'AI Coach' },
  { href: '/learn', icon: BookOpen, label: 'Learn' },
  { href: '/profile', icon: User, label: 'Profile' },
];

export function SidebarNav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <SidebarMenuButton
            asChild
            isActive={isActive(item.href) && !item.subItems}
            tooltip={{ children: item.label }}
          >
            <Link href={item.href}>
              <item.icon />
              <span>{item.label}</span>
            </Link>
          </SidebarMenuButton>
          {item.subItems && (
              <SidebarMenuSub>
                {item.subItems.map(subItem => (
                    <SidebarMenuSubItem key={subItem.href}>
                        <SidebarMenuSubButton asChild isActive={pathname === subItem.href}>
                            <Link href={subItem.href}>{subItem.label}</Link>
                        </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
          )}
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
