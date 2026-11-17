'use client';

import { ColorPicker } from '@trellis-ui/react';
import { useState } from 'react';

export default function ColorPickerDemo() {
  const [color, setColor] = useState('#16a34a');
  return (
    <div className="flex flex-col items-center gap-4">
      <ColorPicker label="Brand color" value={color} onChange={(c) => setColor(c.toString('hex'))} />
      <div className="h-10 w-40 rounded-tr" style={{ background: color }} />
    </div>
  );
}
