import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { z } from 'zod';
import { ComboBoxItem } from '@trellis-ui/react';
import {
  Form,
  FormCheckbox,
  FormComboBox,
  FormDatePicker,
  FormNumberField,
  FormTextField,
  SubmitButton,
  useZodForm,
} from './index';

const schema = z.object({
  email: z.email('Enter a valid e-mail'),
  age: z.number({ error: 'Age is required' }).min(18, 'You must be at least 18'),
  terms: z.literal(true, { error: 'You must accept the terms' }),
});

function SignupForm({ onSubmit }: { onSubmit: (data: z.output<typeof schema>) => void }) {
  const form = useZodForm(schema, { defaultValues: { email: '', terms: false as unknown as true } });
  return (
    <Form form={form} onSubmit={onSubmit}>
      <FormTextField control={form.control} name="email" label="E-mail" />
      <FormNumberField control={form.control} name="age" label="Age" />
      <FormCheckbox control={form.control} name="terms">
        I accept the terms
      </FormCheckbox>
      <SubmitButton>Sign up</SubmitButton>
    </Form>
  );
}

afterEach(cleanup);

describe('@trellis-ui/form', () => {
  it('shows Zod errors and does not submit invalid data', async () => {
    const onSubmit = vi.fn();
    render(<SignupForm onSubmit={onSubmit} />);

    await userEvent.type(screen.getByLabelText('E-mail'), 'not-an-email');
    await userEvent.click(screen.getByRole('button', { name: 'Sign up' }));

    expect(await screen.findByText('Enter a valid e-mail')).toBeTruthy();
    expect(screen.getByText('Age is required')).toBeTruthy();
    expect(screen.getByText('You must accept the terms')).toBeTruthy();
    expect(screen.getByLabelText('E-mail').getAttribute('aria-invalid')).toBe('true');
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('validates FormDatePicker and FormComboBox', async () => {
    const eventSchema = z.object({
      date: z.date({ error: 'Pick a date' }),
      city: z.string({ error: 'Pick a city' }),
    });
    function EventForm() {
      const form = useZodForm(eventSchema);
      return (
        <Form form={form} onSubmit={() => {}}>
          <FormDatePicker control={form.control} name="date" label="Date" />
          <FormComboBox control={form.control} name="city" label="City">
            <ComboBoxItem id="krk">Kraków</ComboBoxItem>
          </FormComboBox>
          <SubmitButton>Save</SubmitButton>
        </Form>
      );
    }
    render(<EventForm />);

    await userEvent.click(screen.getByRole('button', { name: 'Save' }));

    expect(await screen.findByText('Pick a date')).toBeTruthy();
    expect(screen.getByText('Pick a city')).toBeTruthy();
  });

  it('submits parsed values when valid', async () => {
    const onSubmit = vi.fn();
    render(<SignupForm onSubmit={onSubmit} />);

    await userEvent.type(screen.getByLabelText('E-mail'), 'ada@example.com');
    await userEvent.type(screen.getByRole('textbox', { name: 'Age' }), '36');
    await userEvent.click(screen.getByRole('checkbox', { name: 'I accept the terms' }));
    await userEvent.click(screen.getByRole('button', { name: 'Sign up' }));

    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));
    expect(onSubmit.mock.calls[0]?.[0]).toEqual({ email: 'ada@example.com', age: 36, terms: true });
  });
});
