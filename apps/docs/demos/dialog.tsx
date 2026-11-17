'use client';

import { Button, Dialog, DialogFooter, DialogTrigger, Modal } from '@trellis-ui/react';

export default function DialogDemo() {
  return (
    <DialogTrigger>
      <Button variant="outline" color="danger">
        Delete project
      </Button>
      <Modal isDismissable>
        <Dialog title="Delete project?">
          {({ close }) => (
            <>
              <p className="text-sm text-muted-foreground">
                This will permanently delete the project and all of its data. This action cannot be undone.
              </p>
              <DialogFooter>
                <Button variant="ghost" color="neutral" onPress={close}>
                  Cancel
                </Button>
                <Button color="danger" onPress={close}>
                  Delete
                </Button>
              </DialogFooter>
            </>
          )}
        </Dialog>
      </Modal>
    </DialogTrigger>
  );
}
