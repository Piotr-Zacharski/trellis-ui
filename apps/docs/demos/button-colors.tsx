'use client';

import { Button } from '@trellis-ui/react';

export default function ButtonColors() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button color="primary">Primary</Button>
      <Button color="neutral">Neutral</Button>
      <Button color="danger">Danger</Button>
      <Button color="danger" variant="soft">
        Delete
      </Button>
    </div>
  );
}
