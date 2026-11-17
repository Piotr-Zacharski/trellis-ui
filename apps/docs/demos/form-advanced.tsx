'use client';

import {
  Form,
  FormCheckboxGroup,
  FormColorPicker,
  FormDateRangePicker,
  FormFileUpload,
  FormInputOTP,
  FormRating,
  FormSlider,
  FormTagField,
  FormTimeField,
  FormToggleButtonGroup,
  SubmitButton,
  useZodForm,
} from '@trellis-ui/form';
import { Checkbox, toast, ToggleButton } from '@trellis-ui/react';
import { z } from 'zod';

const schema = z.object({
  code: z.string().length(6, 'Enter all 6 digits'),
  stay: z.object(
    { start: z.date(), end: z.date() },
    { error: 'Pick your dates' },
  ),
  checkIn: z.iso.time({ error: 'Pick a check-in time' }),
  room: z.enum(['single', 'double', 'suite'], { error: 'Pick a room' }),
  guests: z.number().min(1).max(6),
  extras: z.array(z.string()).min(1, 'Pick at least one extra'),
  tags: z.array(z.string()).max(5, 'Up to 5 tags'),
  accent: z.string(),
  rating: z.number({ error: 'Please rate us' }).min(1, 'Please rate us'),
  documents: z.array(z.instanceof(File)).min(1, 'Upload your ID'),
});

export default function FormAdvancedDemo() {
  const form = useZodForm(schema, {
    defaultValues: { code: '', guests: 2, extras: [], tags: ['quiet'], accent: '#16a34a' },
  });

  return (
    <Form
      className="w-full max-w-md"
      form={form}
      onSubmit={(values) => toast.success('Booking confirmed', { description: `${values.room} room for ${values.guests} guests` })}
    >
      <FormInputOTP control={form.control} name="code" label="Booking code" groupSize={3} />
      <FormDateRangePicker control={form.control} name="stay" label="Stay" />
      <FormTimeField control={form.control} name="checkIn" label="Check-in time" />
      <FormToggleButtonGroup control={form.control} name="room" label="Room">
        <ToggleButton id="single">Single</ToggleButton>
        <ToggleButton id="double">Double</ToggleButton>
        <ToggleButton id="suite">Suite</ToggleButton>
      </FormToggleButtonGroup>
      <FormSlider control={form.control} name="guests" label="Guests" minValue={1} maxValue={6} />
      <FormCheckboxGroup control={form.control} name="extras" label="Extras" orientation="horizontal">
        <Checkbox value="breakfast">Breakfast</Checkbox>
        <Checkbox value="parking">Parking</Checkbox>
        <Checkbox value="spa">Spa</Checkbox>
      </FormCheckboxGroup>
      <FormTagField control={form.control} name="tags" label="Room preferences" />
      <FormColorPicker control={form.control} name="accent" label="Welcome card color" />
      <FormFileUpload control={form.control} name="documents" label="ID document" allowsMultiple={false} acceptedFileTypes={['image/*', 'application/pdf']} />
      <FormRating control={form.control} name="rating" label="How did you like the booking flow?" />
      <SubmitButton>Book now</SubmitButton>
    </Form>
  );
}
