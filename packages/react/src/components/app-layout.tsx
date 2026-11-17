'use client';

import { type ComponentProps, createContext, type ReactNode, useContext, useState } from 'react';
import { Button as RACButton, Dialog, Link as RACLink, type LinkProps } from 'react-aria-components';
import { cn } from '../utils';
import { Drawer } from './drawer';

interface AppLayoutContextValue {
  isSidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const AppLayoutContext = createContext<AppLayoutContextValue | null>(null);

export function useAppLayout() {
  const ctx = useContext(AppLayoutContext);
  if (!ctx) throw new Error('useAppLayout must be used inside <AppLayout>');
  return ctx;
}

export interface AppLayoutProps {
  /** Usually a <Sidebar>. Shown as a fixed column on desktop and in a drawer on small screens. */
  sidebar?: ReactNode;
  /** Usually a <Navbar>. */
  navbar?: ReactNode;
  children: ReactNode;
  className?: string;
}

/** Application shell: sidebar + top bar + scrollable content. */
export function AppLayout({ sidebar, navbar, children, className }: AppLayoutProps) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  return (
    <AppLayoutContext.Provider value={{ isSidebarOpen, setSidebarOpen }}>
      <div className={cn('flex min-h-dvh w-full bg-background text-foreground', className)}>
        {sidebar && (
          <>
            <aside className="sticky top-0 hidden h-dvh w-64 shrink-0 border-r border-border bg-surface md:flex">{sidebar}</aside>
            <Drawer placement="left" size="sm" isOpen={isSidebarOpen} onOpenChange={setSidebarOpen} className="md:hidden">
              <Dialog aria-label="Navigation" className="flex h-full outline-none">
                {sidebar}
              </Dialog>
            </Drawer>
          </>
        )}
        <div className="flex min-w-0 flex-1 flex-col">
          {navbar}
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </AppLayoutContext.Provider>
  );
}

/** Hamburger button that opens the sidebar drawer on small screens. Hidden on desktop. */
export function SidebarTrigger({ className }: { className?: string }) {
  const ctx = useContext(AppLayoutContext);
  if (!ctx) return null;
  return (
    <RACButton
      aria-label="Open navigation"
      onPress={() => ctx.setSidebarOpen(true)}
      className={({ isFocusVisible }) =>
        cn(
          'flex size-9 cursor-default items-center justify-center rounded-tr text-muted-foreground outline-none hover:bg-muted md:hidden',
          isFocusVisible && 'ring-3 ring-ring',
          className,
        )
      }
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="size-5" aria-hidden="true">
        <path d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </RACButton>
  );
}

export function Navbar({ className, children, ...props }: ComponentProps<'header'>) {
  return (
    <header
      {...props}
      className={cn(
        'sticky top-0 z-30 flex h-14 shrink-0 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur',
        className,
      )}
    >
      <SidebarTrigger />
      {children}
    </header>
  );
}

export function Sidebar({ className, children, ...props }: ComponentProps<'nav'>) {
  return (
    <nav aria-label="Main" {...props} className={cn('flex h-full w-full flex-col', className)}>
      {children}
    </nav>
  );
}

export function SidebarHeader({ className, ...props }: ComponentProps<'div'>) {
  return <div {...props} className={cn('flex h-14 shrink-0 items-center gap-2 px-4', className)} />;
}

export function SidebarContent({ className, ...props }: ComponentProps<'div'>) {
  return <div {...props} className={cn('flex flex-1 flex-col gap-5 overflow-y-auto px-3 py-2', className)} />;
}

export function SidebarFooter({ className, ...props }: ComponentProps<'div'>) {
  return <div {...props} className={cn('shrink-0 border-t border-border p-3', className)} />;
}

export function SidebarSection({ title, className, children, ...props }: ComponentProps<'div'> & { title?: ReactNode }) {
  return (
    <div {...props} className={cn('flex flex-col gap-0.5', className)}>
      {title && <p className="px-2.5 pb-1 text-xs font-medium text-muted-foreground">{title}</p>}
      <ul className="flex flex-col gap-0.5">{children}</ul>
    </div>
  );
}

export interface SidebarItemProps extends Omit<LinkProps, 'children' | 'className'> {
  icon?: ReactNode;
  /** Marks the item as the current page. */
  isActive?: boolean;
  /** Count or label on the right, e.g. unread messages. */
  badge?: ReactNode;
  children: ReactNode;
}

export function SidebarItem({ icon, isActive, badge, children, onPress, ...props }: SidebarItemProps) {
  const ctx = useContext(AppLayoutContext);
  return (
    <li>
      <RACLink
        {...props}
        aria-current={isActive ? 'page' : undefined}
        onPress={(e) => {
          onPress?.(e);
          ctx?.setSidebarOpen(false);
        }}
        className={({ isFocusVisible }) =>
          cn(
            'flex h-9 cursor-pointer items-center gap-2.5 rounded-tr px-2.5 text-sm outline-none transition-colors',
            isActive ? 'bg-primary-soft font-medium text-primary' : 'text-foreground hover:bg-muted',
            isFocusVisible && 'ring-3 ring-ring',
          )
        }
      >
        {icon && <span className={cn('flex size-4 shrink-0 [&>svg]:size-4', !isActive && 'text-muted-foreground')}>{icon}</span>}
        <span className="flex-1 truncate">{children}</span>
        {badge != null && (
          <span className="rounded-full bg-muted px-1.5 py-0.5 text-[11px] font-medium text-muted-foreground tabular-nums">{badge}</span>
        )}
      </RACLink>
    </li>
  );
}
