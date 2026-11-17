'use client';

import { Select, SelectItem } from '@trellis-ui/react';

const frameworks = [
  { id: 'next', name: 'Next.js' },
  { id: 'react-router', name: 'React Router' },
  { id: 'vite', name: 'Vite' },
  { id: 'astro', name: 'Astro' },
];

export default function SelectDemo() {
  return (
    <div className="w-full max-w-sm">
      <Select label="Framework" placeholder="Choose a framework" items={frameworks}>
        {(item) => <SelectItem id={item.id}>{item.name}</SelectItem>}
      </Select>
    </div>
  );
}
