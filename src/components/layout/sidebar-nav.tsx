'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  BookOpen,
  Bot,
  LayoutGrid,
  Sprout,
  BarChart,
  CheckSquare,
  LifeBuoy,
  Settings
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

const mainNavItems = [
  { href: '/dashboard', icon: LayoutGrid, label: 'Dashboard' },
  { href: '/chatbot', icon: Bot, label: 'AI Coach' },
  { href: '/todo', icon: CheckSquare, label: 'Todo List' },
];

const secondaryNavItems = [
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
  { href: '/learn', icon: BookOpen, label: 'Learn', subItems: [] },
];

const bottomNavItems = [
    { href: '/settings', icon: Settings, label: 'Settings' },
    { href: '/support', icon: LifeBuoy, label: 'Support' },
]

function SidebarNavComponent() {
  const pathname = usePathname();

  const getActiveAccordionItem = () => {
    const activeMainItem = secondaryNavItems.find(item => pathname.startsWith(item.href) && item.subItems.length > 0);
    return activeMainItem ? [activeMainItem.label] : [];
  };

  const NavLink = ({ href, icon: Icon, label }: { href: string; icon: React.ElementType; label: string }) => {
    const isActive = pathname === href;
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href={href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted',
                isActive && 'bg-muted text-primary'
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">
            {label}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  return (
    <nav className="grid items-start px-4 text-sm font-medium">
      <div className="py-2">
        <h3 className="mb-2 px-4 text-lg font-semibold tracking-tight font-headline">Menu</h3>
        <div className="space-y-1">
          {mainNavItems.map((item) => (
            <NavLink key={item.href} {...item} />
          ))}
        </div>
      </div>
      
      <div className="py-2">
        <h3 className="mb-2 px-4 text-lg font-semibold tracking-tight font-headline">Library</h3>
        <Accordion type="multiple" className="w-full" defaultValue={getActiveAccordionItem()}>
             {secondaryNavItems.map(item => {
                if (item.subItems.length > 0) {
                   return (
                     <AccordionItem value={item.label} key={item.label} className="border-b-0">
                        <AccordionTrigger
                           className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:no-underline [&[data-state=open]>svg]:text-primary",
                            pathname.startsWith(item.href) && 'text-primary'
                           )}
                        >
                            <div className="flex items-center gap-3">
                               <item.icon className="h-4 w-4" />
                               {item.label}
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="pl-8 pt-1">
                           <nav className="grid gap-y-1">
                             {item.subItems.map(subItem => (
                                 <Link
                                    key={subItem.href}
                                    href={subItem.href}
                                    className={cn(
                                        'block rounded-md px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted',
                                        pathname.startsWith(subItem.href) && 'bg-muted text-primary font-medium'
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
                 return ( <NavLink key={item.href} {...item} /> );
             })}
        </Accordion>
      </div>
       <div className="py-2">
        <h3 className="mb-2 px-4 text-lg font-semibold tracking-tight font-headline">System</h3>
        <div className="space-y-1">
          {bottomNavItems.map((item) => (
            <NavLink key={item.href} {...item} />
          ))}
        </div>
      </div>
    </nav>
  );
}

export const SidebarNav = React.memo(SidebarNavComponent);
