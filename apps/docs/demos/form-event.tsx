'use client';

import { getLocalTimeZone, today } from '@internationalized/date';
import { Form, FormComboBox, FormDatePicker, FormTextField, SubmitButton, useZodForm } from '@trellis-ui-pack/form';
import { ComboBoxItem, toast } from '@trellis-ui-pack/react';
import { z } from 'zod';

const cities = [
  { id: 'krakow', name: 'Kraków' },
  { id: 'warsaw', name: 'Warsaw' },
  { id: 'gdansk', name: 'Gdańsk' },
  { id: 'wroclaw', name: 'Wrocław' },
  { id: 'poznan', name: 'Poznań' },
];

const schema = z.object({
  title: z.string().min(3, 'Title must have at least 3 characters'),
  city: z.string({ error: 'Pick a city' }),
  date: z.date({ error: 'Pick a date' }).min(new Date(new Date().setHours(0, 0, 0, 0)), 'The date must be in the future'),
});

export default function FormEventDemo() {
  const form = useZodForm(schema, { defaultValues: { title: '' } });

  return (
    <Form
      className="w-full max-w-sm"
      form={form}
      onSubmit={(values) =>
        toast.success('Event created', {
          description: `${values.title} · ${values.date.toLocaleDateString()}`,
        })
      }
    >
      <FormTextField control={form.control} name="title" label="Title" placeholder="React meetup" />
      <FormComboBox control={form.control} name="city" label="City" placeholder="Start typing…" items={cities}>
        {(item) => <ComboBoxItem id={item.id}>{item.name}</ComboBoxItem>}
      </FormComboBox>
      <FormDatePicker control={form.control} name="date" label="Date" minValue={today(getLocalTimeZone())} />
      <SubmitButton>Create event</SubmitButton>
    </Form>
  );
}
