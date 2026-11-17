'use client';

import {
  Form,
  FormCheckbox,
  FormNumberField,
  FormRadioGroup,
  FormSelect,
  FormTextField,
  SubmitButton,
  useZodForm,
} from '@trellis-ui/form';
import { Radio, SelectItem } from '@trellis-ui/react';
import { useState } from 'react';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(2, 'Name must have at least 2 characters'),
  email: z.email('Enter a valid e-mail address'),
  age: z.number({ error: 'Age is required' }).int().min(18, 'You must be at least 18'),
  role: z.enum(['frontend', 'backend', 'design'], { error: 'Pick a role' }),
  plan: z.enum(['free', 'pro'], { error: 'Pick a plan' }),
  terms: z.literal(true, { error: 'You must accept the terms' }),
});

type SignupValues = z.output<typeof schema>;

export default function FormSignupDemo() {
  const [submitted, setSubmitted] = useState<SignupValues | null>(null);
  const form = useZodForm(schema, {
    defaultValues: { name: '', email: '', plan: 'free' },
  });

  async function onSubmit(values: SignupValues) {
    await new Promise((resolve) => setTimeout(resolve, 800)); // pretend to call an API
    setSubmitted(values);
  }

  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <Form form={form} onSubmit={onSubmit}>
        <FormTextField control={form.control} name="name" label="Name" placeholder="Ada Lovelace" />
        <FormTextField control={form.control} name="email" label="E-mail" type="email" placeholder="ada@example.com" />
        <FormNumberField control={form.control} name="age" label="Age" minValue={0} />
        <FormSelect control={form.control} name="role" label="Role" placeholder="Choose a role">
          <SelectItem id="frontend">Frontend</SelectItem>
          <SelectItem id="backend">Backend</SelectItem>
          <SelectItem id="design">Design</SelectItem>
        </FormSelect>
        <FormRadioGroup control={form.control} name="plan" label="Plan" orientation="horizontal">
          <Radio value="free">Free</Radio>
          <Radio value="pro">Pro</Radio>
        </FormRadioGroup>
        <FormCheckbox control={form.control} name="terms">
          I accept the terms and conditions
        </FormCheckbox>
        <SubmitButton>Create account</SubmitButton>
      </Form>
      {submitted && (
        <pre className="overflow-auto rounded-tr bg-muted p-3 text-xs text-foreground">
          {JSON.stringify(submitted, null, 2)}
        </pre>
      )}
    </div>
  );
}
