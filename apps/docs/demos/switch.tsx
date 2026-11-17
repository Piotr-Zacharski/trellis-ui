'use client';

import { Switch } from '@trellis-ui-pack/react';

export default function SwitchDemo() {
  return (
    <div className="flex flex-col gap-3">
      <Switch defaultSelected>Wi-Fi</Switch>
      <Switch>Airplane mode</Switch>
      <Switch isDisabled>Bluetooth</Switch>
    </div>
  );
}
