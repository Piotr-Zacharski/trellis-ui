# @trellis-ui-pack/form

Type-safe Trellis UI form fields for React Hook Form and Zod.

```bash
npm install @trellis-ui-pack/form @trellis-ui-pack/react react-hook-form zod
```

```css
@import "tailwindcss";
@import "@trellis-ui-pack/react/styles.css";
@import "@trellis-ui-pack/form/styles.css";
```

```tsx
import { Form, FormTextField, SubmitButton, useZodForm } from '@trellis-ui-pack/form';
import { z } from 'zod';

const schema = z.object({ email: z.email() });

export function Newsletter() {
  const form = useZodForm(schema, { defaultValues: { email: '' } });
  return (
    <Form form={form} onSubmit={console.log}>
      <FormTextField control={form.control} name="email" label="Email" />
      <SubmitButton>Subscribe</SubmitButton>
    </Form>
  );
}
```

[Documentation and source](https://github.com/Piotr-Zacharski/trellis-ui)

## License

MIT
