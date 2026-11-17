'use client';

import { ChainOfThought, TextShimmer } from '@trellis-ui-pack/react';

export default function ChainOfThoughtDemo() {
  return (
    <div className="flex w-full max-w-lg flex-col gap-6">
      <ChainOfThought isStreaming title="Thinking…" defaultExpanded>
        The user wants a form with an e-mail and a password. I should use z.email() for the e-mail and enforce a minimum length for
        the password…
      </ChainOfThought>
      <ChainOfThought title="Thought for 8 seconds">
        {`1. Identify the fields: e-mail, password, terms.\n2. Pick validators for each field.\n3. Map them to Form* components.`}
      </ChainOfThought>
      <TextShimmer className="text-sm">Searching the web…</TextShimmer>
    </div>
  );
}
