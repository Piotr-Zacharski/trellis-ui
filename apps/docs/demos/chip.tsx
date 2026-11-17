'use client';

import { Chip } from '@trellis-ui-pack/react';

export default function ChipDemo() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        <Chip color="primary">Active</Chip>
        <Chip color="neutral">Draft</Chip>
        <Chip color="warning">Pending</Chip>
        <Chip color="danger">Failed</Chip>
      </div>
      <div className="flex flex-wrap gap-2">
        <Chip variant="solid" color="primary">
          Solid
        </Chip>
        <Chip variant="outline" color="neutral">
          Outline
        </Chip>
        <Chip size="lg" color="primary">
          Large
        </Chip>
      </div>
    </div>
  );
}
