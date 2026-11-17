'use client';

import { Button, toast } from '@trellis-ui-pack/react';

// <Toaster /> is mounted once in the app's root layout.
export default function ToastDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="outline" color="neutral" onPress={() => toast('Event has been created')}>
        Default
      </Button>
      <Button
        variant="soft"
        onPress={() => toast.success('Changes saved', { description: 'Your profile has been updated.' })}
      >
        Success
      </Button>
      <Button variant="soft" color="neutral" onPress={() => toast.warning('Storage almost full')}>
        Warning
      </Button>
      <Button
        variant="soft"
        color="danger"
        onPress={() => toast.error('Payment failed', { description: 'Check your card details and try again.' })}
      >
        Error
      </Button>
    </div>
  );
}
