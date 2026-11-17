import { Checkbox, ToggleButton } from '@trellis-ui-pack/react';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { z } from 'zod';
import {
  Form,
  FormCheckboxGroup,
  FormInputOTP,
  FormRating,
  FormTagField,
  FormToggleButtonGroup,
  SubmitButton,
  useZodForm,
} from './index';

const schema = z.object({
  code: z.string().length(4, 'Enter all 4 digits'),
  extras: z.array(z.string()).min(1, 'Pick at least one extra'),
  tags: z.array(z.string()).min(1, 'Add a tag'),
  room: z.enum(['single', 'double'], { error: 'Pick a room' }),
  rating: z.number({ error: 'Please rate' }).min(1, 'Please rate'),
});

function BookingForm({ onSubmit }: { onSubmit: (values: z.output<typeof schema>) => void }) {
  const form = useZodForm(schema, { defaultValues: { code: '', extras: [], tags: [] } });
  return (
    <Form form={form} onSubmit={onSubmit}>
      <FormInputOTP control={form.control} name="code" label="Code" length={4} />
      <FormCheckboxGroup control={form.control} name="extras" label="Extras">
        <Checkbox value="breakfast">Breakfast</Checkbox>
      </FormCheckboxGroup>
      <FormTagField control={form.control} name="tags" label="Tags" />
      <FormToggleButtonGroup control={form.control} name="room" label="Room">
        <ToggleButton id="single">Single</ToggleButton>
        <ToggleButton id="double">Double</ToggleButton>
      </FormToggleButtonGroup>
      <FormRating control={form.control} name="rating" label="Rating" />
      <SubmitButton>Book</SubmitButton>
    </Form>
  );
}

afterEach(cleanup);

describe('extra Form fields', () => {
  it('shows a Zod error for every empty field', async () => {
    const onSubmit = vi.fn();
    render(<BookingForm onSubmit={onSubmit} />);
    await userEvent.click(screen.getByRole('button', { name: 'Book' }));

    for (const message of ['Enter all 4 digits', 'Pick at least one extra', 'Add a tag', 'Pick a room', 'Please rate']) {
      expect(await screen.findByText(message)).toBeTruthy();
    }
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('submits values from every field', async () => {
    const onSubmit = vi.fn();
    render(<BookingForm onSubmit={onSubmit} />);

    await userEvent.type(screen.getByLabelText('Code'), '12a34');
    await userEvent.click(screen.getByRole('checkbox', { name: 'Breakfast' }));
    await userEvent.type(screen.getByLabelText('Tags'), 'quiet{Enter}');
    await userEvent.click(screen.getByRole('radio', { name: 'Double' }));
    await userEvent.click(screen.getByRole('radio', { name: '4 of 5 stars' }));
    await userEvent.click(screen.getByRole('button', { name: 'Book' }));

    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));
    expect(onSubmit.mock.calls[0]?.[0]).toEqual({ code: '1234', extras: ['breakfast'], tags: ['quiet'], room: 'double', rating: 4 });
  });
});
