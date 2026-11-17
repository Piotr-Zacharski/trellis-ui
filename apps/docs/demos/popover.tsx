'use client';

import { Button, PopoverContent, PopoverTrigger, Switch } from '@trellis-ui/react';

export default function PopoverDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <PopoverTrigger>
        <Button variant="outline" color="neutral">
          What is Trellis?
        </Button>
        <PopoverContent title="Trellis" showArrow>
          <p className="text-muted-foreground">An accessible React component library with built-in React Hook Form and Zod support.</p>
        </PopoverContent>
      </PopoverTrigger>

      <PopoverTrigger>
        <Button variant="soft">Notifications</Button>
        <PopoverContent title="Notification settings" placement="bottom start">
          {({ close }) => (
            <div className="flex flex-col gap-3 pt-2">
              <Switch defaultSelected>E-mail</Switch>
              <Switch>Push</Switch>
              <Button size="sm" onPress={close}>
                Done
              </Button>
            </div>
          )}
        </PopoverContent>
      </PopoverTrigger>
    </div>
  );
}
