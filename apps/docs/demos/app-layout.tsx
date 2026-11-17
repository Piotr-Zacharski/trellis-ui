'use client';

import {
  AppLayout,
  Avatar,
  Button,
  Kpi,
  Navbar,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarSection,
} from '@trellis-ui-pack/react';
import { useState } from 'react';

const icon = (d: string) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={d} />
  </svg>
);

const nav = [
  { id: 'dashboard', label: 'Dashboard', icon: icon('M3 3h7v9H3zM14 3h7v5h-7zM14 12h7v9h-7zM3 16h7v5H3z') },
  { id: 'forms', label: 'Forms', icon: icon('M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M8 13h8M8 17h5'), badge: 12 },
  { id: 'inbox', label: 'Inbox', icon: icon('M22 12h-6l-2 3h-4l-2-3H2'), badge: 3 },
  { id: 'settings', label: 'Settings', icon: icon('M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z') },
];

export default function AppLayoutDemo() {
  const [active, setActive] = useState('dashboard');

  return (
    <div className="w-full overflow-hidden rounded-[calc(var(--tr-radius)*1.6)] border border-border">
      <AppLayout
        className="h-[30rem] min-h-0 [&>aside]:h-full"
        sidebar={
          <Sidebar>
            <SidebarHeader className="font-semibold">Acme Inc.</SidebarHeader>
            <SidebarContent>
              <SidebarSection title="Workspace">
                {nav.map((item) => (
                  <SidebarItem
                    key={item.id}
                    icon={item.icon}
                    badge={item.badge}
                    isActive={active === item.id}
                    onPress={() => setActive(item.id)}
                  >
                    {item.label}
                  </SidebarItem>
                ))}
              </SidebarSection>
            </SidebarContent>
            <SidebarFooter className="flex items-center gap-2">
              <Avatar name="Ada Lovelace" size="sm" />
              <span className="text-sm">Ada Lovelace</span>
            </SidebarFooter>
          </Sidebar>
        }
        navbar={
          <Navbar>
            <span className="font-medium capitalize">{active}</span>
            <Button size="sm" className="ml-auto">
              New form
            </Button>
          </Navbar>
        }
      >
        <div className="grid gap-4 p-6 sm:grid-cols-2">
          <Kpi title="Submissions" value="2,431" change={12.4} description="vs. last week" />
          <Kpi title="Conversion" value="38.2%" change={-2.1} description="vs. last week" />
        </div>
      </AppLayout>
    </div>
  );
}
