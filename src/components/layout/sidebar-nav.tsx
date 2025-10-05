
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


const navItems = [
  { href: '/dashboard', icon: LayoutGrid, label: 'Dashboard' },
  { href: '/chatbot', icon: Bot, label: 'AI Coach' },
];

const mainNavItems = [
  { href: '/track', icon: ClipboardList, label: 'Track' },
  { href: '/tools', icon: Sprout, label: 'Tools' },
  { href: '/programs', icon: BookOpen, label: 'Programs' },
  { href: '/learn', icon: BookOpen, label: 'Learn' },
];


function SidebarNavComponent() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/dashboard' || href === '/') return pathname === href;
    const currentPath = pathname.split('/')[1];
    const targetPath = href.split('/')[1];
    return currentPath === targetPath;
  };

  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
            isActive(item.href) && 'bg-muted text-primary'
          )}
        >
          <item.icon className="h-4 w-4" />
          {item.label}
        </Link>
      ))}

        <Accordion type="multiple" className="w-full" >
             {mainNavItems.map(item => {
                let subItems: {href: string, label: string}[] = [];
                if (item.href === '/tools') {
                    subItems = [
                        { href: '/tools/cbt', label: 'CBT' },
                        { href: '/tools/dbt', label: 'DBT' },
                        { href: '/tools/act', label: 'ACT' },
                        { href: '/tools/mindfulness', label: 'Mindfulness' },
                    ]
                }
                 if (item.href === '/track') {
                    subItems = [
                        { href: '/track/mood', label: 'Mood' },
                        { href: '/track/journal', label: 'Journal' },
                        { href: '/track/sleep-quality', label: 'Sleep' },
                    ]
                }

                if (subItems.length > 0) {
                   return (
                     <AccordionItem value={item.label} key={item.label} className="border-b-0">
                        <AccordionTrigger
                           className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:no-underline",
                            isActive(item.href) && 'text-primary'
                           )}
                        >
                            <div className="flex items-center gap-3">
                               <item.icon className="h-4 w-4" />
                               {item.label}
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="pl-8">
                           <nav className="grid gap-1">
                             {subItems.map(subItem => (
                                 <Link
                                    key={subItem.href}
                                    href={subItem.href}
                                    className={cn(
                                        'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                                        pathname.startsWith(subItem.href) && 'bg-muted text-primary'
                                    )}
                                >
                                    {subItem.label}
                                 </Link>
                             ))}
                           </nav>
                        </AccordionContent>
                    </AccordionItem>
                   )
                }

                 return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                            isActive(item.href) && 'bg-muted text-primary'
                        )}
                        >
                        <item.icon className="h-4 w-4" />
                        {item.label}
                    </Link>
                 )
             })}
        </Accordion>
    </nav>
  );
}

export const SidebarNav = React.memo(SidebarNavComponent);
