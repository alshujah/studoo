
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
  MessageSquare,
  BarChart,
  CheckSquare
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
  { href: '/todo', icon: CheckSquare, label: 'Todo List' },
];

const mainNavItems = [
  {
    href: '/track',
    icon: BarChart,
    label: 'Track',
    subItems: [
        { href: '/track/mood', label: 'Mood Check-in' },
        { href: '/track/journal', label: 'Journaling' },
        { href: '/track/sleep-quality', label: 'Sleep Quality' },
        { href: '/track/gad-7', label: 'GAD-7 Anxiety' },
        { href: '/track/phq-9', label: 'PHQ-9 Depression' },
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
        { href: '/tools/relaxation', label: 'Relaxation' },
        { href: '/tools/positive-psychology', label: 'Positive Psychology' },
    ]
  },
  { href: '/programs', icon: BookOpen, label: 'Programs', subItems: [] },
  { href: '/learn', icon: BookOpen, label: 'Learn', subItems: [] },
];


function SidebarNavComponent() {
  const pathname = usePathname();

  const getActiveAccordionItem = () => {
    const activeMainItem = mainNavItems.find(item => pathname.startsWith(item.href) && item.subItems.length > 0);
    return activeMainItem ? [activeMainItem.label] : [];
  }

  const isActive = (href: string, isMain: boolean) => {
    if (isMain) {
        return pathname.startsWith(href);
    }
    return pathname === href;
  };

  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
            isActive(item.href, false) && 'bg-muted text-primary'
          )}
        >
          <item.icon className="h-4 w-4" />
          {item.label}
        </Link>
      ))}

        <Accordion type="multiple" className="w-full" defaultValue={getActiveAccordionItem()}>
             {mainNavItems.map(item => {
                if (item.subItems.length > 0) {
                   return (
                     <AccordionItem value={item.label} key={item.label} className="border-b-0">
                        <AccordionTrigger
                           className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:no-underline",
                            isActive(item.href, true) && 'text-primary'
                           )}
                        >
                            <div className="flex items-center gap-3">
                               <item.icon className="h-4 w-4" />
                               {item.label}
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="pl-8">
                           <nav className="grid gap-1">
                             {item.subItems.map(subItem => (
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
                            isActive(item.href, true) && 'bg-muted text-primary'
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
