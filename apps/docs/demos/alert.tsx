'use client';

import { Alert, Button } from '@trellis-ui-pack/react';
import { useState } from 'react';

export default function AlertDemo() {
  const [visible, setVisible] = useState(true);
  return (
    <div className="flex w-full max-w-lg flex-col gap-3">
      <Alert title="New version available">Trellis 0.2 adds charts and AI components.</Alert>
      <Alert color="success" title="Payment received">Your invoice has been paid.</Alert>
      <Alert color="warning" title="Your trial ends in 3 days" actions={<Button size="sm">Upgrade</Button>}>
        Upgrade to keep your projects.
      </Alert>
      {visible && (
        <Alert color="danger" title="Deployment failed" onClose={() => setVisible(false)}>
          Build step exited with code 1.
        </Alert>
      )}
    </div>
  );
}
