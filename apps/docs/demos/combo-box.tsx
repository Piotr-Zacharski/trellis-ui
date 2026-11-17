'use client';

import { ComboBox, ComboBoxItem } from '@trellis-ui/react';

const countries = [
  { id: 'pl', name: 'Poland' },
  { id: 'de', name: 'Germany' },
  { id: 'cz', name: 'Czechia' },
  { id: 'sk', name: 'Slovakia' },
  { id: 'lt', name: 'Lithuania' },
  { id: 'fr', name: 'France' },
  { id: 'es', name: 'Spain' },
  { id: 'it', name: 'Italy' },
];

export default function ComboBoxDemo() {
  return (
    <div className="w-full max-w-sm">
      <ComboBox label="Country" placeholder="Start typing…" items={countries}>
        {(item) => <ComboBoxItem id={item.id}>{item.name}</ComboBoxItem>}
      </ComboBox>
    </div>
  );
}
