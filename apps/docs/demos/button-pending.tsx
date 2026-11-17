'use client';

import { Button } from '@trellis-ui/react';
import { useState } from 'react';

export default function ButtonPending() {
  const [isPending, setPending] = useState(false);

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button
        isPending={isPending}
        onPress={() => {
          setPending(true);
          setTimeout(() => setPending(false), 2000);
        }}
      >
        Save changes
      </Button>
      <Button isDisabled>Disabled</Button>
    </div>
  );
}
