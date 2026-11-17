'use client';

import { InputOTP, toast } from '@trellis-ui/react';

export default function InputOTPDemo() {
  return (
    <div className="flex flex-col gap-6">
      <InputOTP
        label="Verification code"
        description="We sent a 6-digit code to your phone."
        groupSize={3}
        onComplete={(code) => toast.success(`Code ${code} entered`)}
      />
      <InputOTP label="Licence key" length={4} type="alphanumeric" />
    </div>
  );
}
