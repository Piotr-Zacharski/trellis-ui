'use client';

import { Fieldset, Switch, TextField } from '@trellis-ui/react';
import { useState } from 'react';

export default function FieldsetDemo() {
  const [sameAsBilling, setSameAsBilling] = useState(true);
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <Switch isSelected={sameAsBilling} onChange={setSameAsBilling}>
        Shipping address same as billing
      </Switch>
      <Fieldset legend="Shipping address" description="Where should we send your order?" disabled={sameAsBilling}>
        <TextField label="Street" isDisabled={sameAsBilling} />
        <div className="grid grid-cols-2 gap-3">
          <TextField label="City" isDisabled={sameAsBilling} />
          <TextField label="Postal code" isDisabled={sameAsBilling} />
        </div>
      </Fieldset>
    </div>
  );
}
