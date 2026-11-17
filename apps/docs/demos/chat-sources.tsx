'use client';

import { ChatSources } from '@trellis-ui/react';

export default function ChatSourcesDemo() {
  return (
    <ChatSources
      className="max-w-lg"
      sources={[
        { title: 'React Aria Components', url: 'https://react-spectrum.adobe.com/react-aria/' },
        { title: 'Zod documentation', url: 'https://zod.dev' },
        { title: 'React Hook Form – useController', url: 'https://react-hook-form.com/docs/usecontroller' },
      ]}
    />
  );
}
