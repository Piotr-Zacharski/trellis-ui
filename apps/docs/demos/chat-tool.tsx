'use client';

import { ChatTool } from '@trellis-ui/react';

export default function ChatToolDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <ChatTool name="search_web" status="running" input={{ query: 'react aria date picker' }} />
      <ChatTool
        name="get_weather"
        status="success"
        input={{ city: 'Kraków' }}
        output={{ temperature: 12, conditions: 'Partly cloudy' }}
      />
      <ChatTool name="send_email" status="error" input={{ to: 'team@example.com' }} output="Rate limit exceeded" />
    </div>
  );
}
