'use client';

import { PromptSuggestions, toast } from '@trellis-ui-pack/react';

export default function PromptSuggestionsDemo() {
  return (
    <div className="flex max-w-lg flex-col items-center gap-4 text-center">
      <p className="text-lg font-semibold">What can I help you with?</p>
      <PromptSuggestions
        className="justify-center"
        suggestions={[
          'Summarize this PDF',
          'Write a Zod schema for a signup form',
          'Explain React Server Components',
          'Draft a release note',
        ]}
        onSelect={(prompt) => toast(prompt)}
      />
    </div>
  );
}
