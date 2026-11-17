'use client';

import { Markdown } from '@trellis-ui/markdown';
import { Button } from '@trellis-ui/react';
import { useEffect, useState } from 'react';

const answer = `Here is a **Zod** schema for a signup form:

\`\`\`tsx
import { z } from 'zod';

export const signupSchema = z.object({
  email: z.email('Enter a valid e-mail'),
  password: z.string().min(8, 'At least 8 characters'),
  terms: z.literal(true),
});
\`\`\`

Then pass it to \`useZodForm(signupSchema)\`. Key points:

- Field names are **type-checked** against the schema
- Errors are shown under each field
- [ ] Add a password strength meter

| Field | Validator |
| --- | --- |
| email | \`z.email()\` |
| password | \`z.string().min(8)\` |
`;

export default function MarkdownDemo() {
  const [length, setLength] = useState(answer.length);

  // Simulate a streamed response when "Replay" is pressed.
  useEffect(() => {
    if (length >= answer.length) return;
    const id = setTimeout(() => setLength((l) => Math.min(answer.length, l + 6)), 16);
    return () => clearTimeout(id);
  }, [length]);

  return (
    <div className="flex w-full max-w-xl flex-col gap-4">
      <Markdown>{answer.slice(0, length)}</Markdown>
      <Button size="sm" variant="outline" color="neutral" className="self-start" onPress={() => setLength(0)}>
        Replay streaming
      </Button>
    </div>
  );
}
