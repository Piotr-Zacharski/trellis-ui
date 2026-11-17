'use client';

import { Button, Stepper } from '@trellis-ui/react';
import { useState } from 'react';

const steps = [
  { title: 'Account', description: 'E-mail & password' },
  { title: 'Profile', description: 'Name and avatar' },
  { title: 'Team', description: 'Invite people' },
  { title: 'Done' },
];

export default function StepperDemo() {
  const [step, setStep] = useState(1);
  return (
    <div className="flex w-full max-w-xl flex-col gap-8">
      <Stepper steps={steps} currentStep={step} />
      <div className="flex justify-center gap-2">
        <Button variant="outline" color="neutral" isDisabled={step === 0} onPress={() => setStep(step - 1)}>
          Back
        </Button>
        <Button isDisabled={step === steps.length} onPress={() => setStep(step + 1)}>
          Next
        </Button>
      </div>
    </div>
  );
}
