'use client';

import { Button, Dialog, DialogTrigger, Drawer, Switch, TextField } from '@trellis-ui-pack/react';

export default function DrawerDemo() {
  return (
    <div className="flex flex-wrap gap-3">
      <DialogTrigger>
        <Button variant="outline" color="neutral">
          Open settings
        </Button>
        <Drawer>
          <Dialog title="Settings" className="h-full">
            {({ close }) => (
              <div className="flex h-full flex-col gap-4">
                <TextField label="Display name" defaultValue="Ada" />
                <Switch defaultSelected>E-mail notifications</Switch>
                <Switch>Dark mode</Switch>
                <div className="mt-auto flex justify-end gap-2">
                  <Button variant="ghost" color="neutral" onPress={close}>
                    Cancel
                  </Button>
                  <Button onPress={close}>Save</Button>
                </div>
              </div>
            )}
          </Dialog>
        </Drawer>
      </DialogTrigger>
      <DialogTrigger>
        <Button variant="outline" color="neutral">
          Bottom sheet
        </Button>
        <Drawer placement="bottom">
          <Dialog title="Share">
            <p className="text-sm text-muted-foreground">Bottom drawers work well as mobile action sheets.</p>
          </Dialog>
        </Drawer>
      </DialogTrigger>
    </div>
  );
}
