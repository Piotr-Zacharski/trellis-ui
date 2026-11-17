'use client';

import { ChatMessageActions, toast } from '@trellis-ui/react';
import { useState } from 'react';

export default function ChatActionsDemo() {
  const [feedback, setFeedback] = useState<'up' | 'down' | null>(null);
  const answer = 'React Aria handles focus, keyboard and screen readers; Trellis adds the styles and form bindings.';
  return (
    <div className="flex max-w-md flex-col gap-1">
      <p className="text-sm leading-6 text-foreground">{answer}</p>
      <ChatMessageActions
        className="-ml-2"
        copyText={answer}
        onRegenerate={() => toast('Regenerating…')}
        feedback={feedback}
        onFeedback={setFeedback}
      />
    </div>
  );
}
