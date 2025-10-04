
'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { BookOpen, Bot, ClipboardList, LayoutGrid, Sprout, User, PenSquare, BrainCircuit, Smile, Rocket } from 'lucide-react';
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
    ]
  },
  { href: '/tools', icon: Sprout, label: 'Tools' },
  { href: '/programs', icon: Rocket, label: 'Programs' },
  { href: '/chatbot', icon: Bot, label: 'AI Coach' },
  { href: '/ai-features', icon: BrainCircuit, label: 'AI Features' },
  { href: '/learn', icon: BookOpen, label: 'Learn' },
  { href: '/profile', icon: User, label: 'Profile' },
];

export function SidebarNav() {
  const pathname = usePathname();

  const isActive = (href: string, isSubItem: boolean = false) => {
    if (isSubItem) {
        return pathname === href;
    }
    if (href === '/dashboard') return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <SidebarMenuButton
            asChild
            isActive={!item.subItems && isActive(item.href)}
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
                        <SidebarMenuSubButton asChild isActive={isActive(subItem.href, true)}>
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
