'use client';

import { AlertDialog, Button, DialogTrigger, toast } from '@trellis-ui/react';

export default function AlertDialogDemo() {
  return (
    <DialogTrigger>
      <Button color="danger" variant="soft">
        Delete account
      </Button>
      <AlertDialog
        variant="danger"
        title="Delete your account?"
        confirmLabel="Delete account"
        onConfirm={async () => {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          toast.success('Account deleted');
        }}
      >
        All of your projects and data will be permanently removed. This cannot be undone.
      </AlertDialog>
    </DialogTrigger>
  );
}
