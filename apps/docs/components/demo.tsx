'use client';

import { type DemoName, demos } from '@/demos';

/** Renders a live example by name. Lives in a client module so server components can reference demos by string. */
export function Demo({ name }: { name: DemoName }) {
  const Component = demos[name];
  return <Component />;
}
