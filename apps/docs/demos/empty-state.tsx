'use client';

import { Button, EmptyState } from '@trellis-ui/react';

export default function EmptyStateDemo() {
  return (
    <EmptyState
      className="w-full max-w-md rounded-[calc(var(--tr-radius)*1.6)] border border-dashed border-border"
      icon={
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path d="M22 12h-6l-2 3h-4l-2-3H2" />
          <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
        </svg>
      }
      title="No projects yet"
      description="Create your first project to start building forms."
      actions={
        <>
          <Button>Create project</Button>
          <Button variant="ghost" color="neutral">
            Import
          </Button>
        </>
      }
    />
  );
}
