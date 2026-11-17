'use client';

import { Tag, TagField, TagGroup } from '@trellis-ui/react';
import { useState } from 'react';

export default function TagFieldDemo() {
  const [labels, setLabels] = useState(['Bug', 'Frontend', 'Urgent']);

  return (
    <div className="flex w-full max-w-sm flex-col gap-8">
      <TagField label="Skills" defaultValue={['React', 'TypeScript']} description="Press Enter or comma to add." maxTags={8} />
      <TagGroup label="Labels" onRemove={(keys) => setLabels((current) => current.filter((label) => !keys.has(label)))}>
        {labels.map((label) => (
          <Tag key={label} id={label}>
            {label}
          </Tag>
        ))}
      </TagGroup>
    </div>
  );
}
