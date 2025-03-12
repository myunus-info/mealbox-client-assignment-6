'use client';

import * as React from 'react';
import { Bot, Settings, SquareTerminal } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { NavMain } from './nav-main';
import { NavUser } from './nav-user';
import Link from 'next/link';
import Logo from '@/assets/svgs/Logo';

const menuItems = {
  provider: [
    {
      title: 'Dashboard',
      url: '/provider/dashboard',
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: 'Meal Management',
      url: '/provider/meals/menus',
      icon: Bot,
      items: [
        {
          title: 'Manage Menus',
          url: '/provider/meals/menus',
        },
        {
          title: 'Manage Orders',
          url: '/provider/meals/orders',
        },
      ],
    },

    {
      title: 'Settings',
      url: '/provider/profile',
      icon: Settings,
      items: [
        {
          title: 'Profile',
          url: '/provider/profile',
        },
      ],
    },
  ],
  customer: [
    {
      title: 'Dashboard',
      url: '/customer/dashboard',
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: 'Shopping Management',
      url: '/customer/shopping/select-meals',
      icon: Bot,
      items: [
        {
          title: 'Select Meals',
          url: '/customer/shopping/select-meals',
        },
        {
          title: 'Track Orders',
          url: '/customer/shopping/track-orders',
        },
        {
          title: 'Manage Preferences',
          url: '/customer/shopping/manage-preferences',
        },
      ],
    },

    {
      title: 'Settings',
      url: '/customer/profile',
      icon: Settings,
      items: [
        {
          title: 'Profile',
          url: '/customer/profile',
        },
      ],
    },
  ],
};

export function AppSidebar({ userRole, ...props }: { userRole: 'customer' | 'provider' }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex items-center justify-center">
                  <Logo />
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={menuItems[userRole]} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
