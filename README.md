<p align="center">
  <img src="./logo.svg" width="72" height="72" alt="Trellis logo" />
</p>

<h1 align="center">Trellis</h1>

<p align="center">
  Accessible React components with first-class React Hook Form and Zod support.<br />
  Built on React Aria Components and Tailwind CSS v4.
</p>

## Packages

| Package | Description |
| --- | --- |
| [`@trellis-ui/react`](./packages/react) | UI components – forms, overlays, navigation, data display, AI chat, layout |
| [`@trellis-ui/form`](./packages/form) | `useZodForm`, `<Form>` and type-safe `Form*` fields for React Hook Form + Zod |
| [`@trellis-ui/markdown`](./packages/markdown) | Streaming-friendly Markdown and code blocks for AI answers |
| [`@trellis-ui/charts`](./packages/charts) | Themed line, area, bar and donut charts (Recharts) |
| [`@trellis-ui/styles`](./packages/styles) | Design tokens for Tailwind CSS v4 (installed with `@trellis-ui/react`) |

## Installation

```bash
npm i @trellis-ui/react @trellis-ui/form react-hook-form zod
# or
yarn add @trellis-ui/react @trellis-ui/form react-hook-form zod
```

```css
/* app/globals.css */
@import "tailwindcss";
@import "@trellis-ui/react/styles.css";
@import "@trellis-ui/form/styles.css";
```

```tsx
import { Form, FormTextField, SubmitButton, useZodForm } from '@trellis-ui/form';
import { z } from 'zod';

const schema = z.object({ email: z.email() });

export function Newsletter() {
  const form = useZodForm(schema, { defaultValues: { email: '' } });
  return (
    <Form form={form} onSubmit={(values) => console.log(values.email)}>
      <FormTextField control={form.control} name="email" label="E-mail" />
      <SubmitButton>Subscribe</SubmitButton>
    </Form>
  );
}
```

Requirements: React 19, Tailwind CSS 4, and for forms React Hook Form ≥ 7.55 and Zod 4.

## Development

This is a pnpm + Turborepo monorepo. The documentation site lives in `apps/docs` (Next.js + Fumadocs).

```bash
pnpm install
pnpm build:packages               # build the libraries
pnpm --filter @trellis-ui/docs dev  # docs on http://localhost:3000
pnpm test                         # unit tests + render test of every demo
pnpm typecheck
```

To add a component to the docs, add a demo to `apps/docs/demos`, an entry to `apps/docs/scripts/generate-catalog.mjs`
and run `pnpm --filter @trellis-ui/docs catalog`.

Releases are managed with [Changesets](https://github.com/changesets/changesets): run `pnpm changeset`, merge to `main`
and the release workflow publishes to npm.

## License

Trellis is released under the [MIT License](./LICENSE). You can use it in personal and commercial projects.

### Third-party licenses

Trellis is written from scratch. It does not contain code from HeroUI, shadcn/ui or other component libraries.
It depends on the following open-source packages, installed from npm under their own licenses:

| Dependency | Used by | License |
| --- | --- | --- |
| [react-aria-components](https://github.com/adobe/react-spectrum) | `@trellis-ui/react` | Apache-2.0 |
| [@internationalized/date](https://github.com/adobe/react-spectrum) | `@trellis-ui/react`, `@trellis-ui/form` | Apache-2.0 |
| [tailwind-variants](https://github.com/heroui-inc/tailwind-variants) | `@trellis-ui/react` | MIT |
| [@hookform/resolvers](https://github.com/react-hook-form/resolvers) | `@trellis-ui/form` | MIT |
| [react-markdown](https://github.com/remarkjs/react-markdown) | `@trellis-ui/markdown` | MIT |
| [remark-gfm](https://github.com/remarkjs/remark-gfm) | `@trellis-ui/markdown` | MIT |
| [sugar-high](https://github.com/huozhi/sugar-high) | `@trellis-ui/markdown` | MIT |
| [recharts](https://github.com/recharts/recharts) | `@trellis-ui/charts` | MIT |

Peer dependencies you install yourself: [React](https://github.com/facebook/react) (MIT),
[Tailwind CSS](https://github.com/tailwindlabs/tailwindcss) (MIT), [React Hook Form](https://github.com/react-hook-form/react-hook-form) (MIT)
and [Zod](https://github.com/colinhacks/zod) (MIT). The documentation site additionally uses
[Next.js](https://github.com/vercel/next.js) (MIT) and [Fumadocs](https://github.com/fuma-nama/fumadocs) (MIT).

Apache-2.0 packages are used unmodified through npm, so their license and notice files ship with them. If you copy their source
code into your own project, keep their `LICENSE` and `NOTICE` files.

All product names and trademarks mentioned here belong to their respective owners. Trellis is not affiliated with or endorsed by
HeroUI, shadcn/ui or Adobe.
