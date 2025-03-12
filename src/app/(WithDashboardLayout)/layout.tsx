'use client';

import { AppSidebar } from '@/components/modules/dashboard/sidebar/app-sidebar';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { useUser } from '@/context/UserContext';
import { useEffect, useState } from 'react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [userRole, setUserRole] = useState<'customer' | 'provider' | null>(null);
  const { user } = useUser();

  useEffect(() => {
    setUserRole(user?.role ?? null);
  }, [user?.role]);

  if (!userRole) {
    return <p className="w-screen h-screen flex justify-center items-center">Loading...</p>;
  }

  return (
    <SidebarProvider>
      <AppSidebar userRole={userRole} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
          </div>
        </header>
        <div className="p-4 pt-0 min-h-screen">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
