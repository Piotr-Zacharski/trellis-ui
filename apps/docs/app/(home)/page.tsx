import Link from 'next/link';
import { Demo } from '@/components/demo';
import { categories, componentList } from '@/lib/components';

const features = [
  {
    title: 'Forms are first-class',
    description:
      'useZodForm + Form* fields wire React Hook Form, Zod and accessible error messages together. Field names autocomplete from your schema.',
  },
  {
    title: 'Accessible by default',
    description: 'Built on React Aria Components: keyboard navigation, focus management and screen reader support included.',
  },
  {
    title: 'Tailwind CSS v4 theming',
    description: 'Every design token is an OKLCH CSS variable. Re-theme by overriding a few --tr-* variables.',
  },
  {
    title: 'TypeScript everywhere',
    description: 'Strict types, generic form fields and variant props exported for every component.',
  },
];

export default function HomePage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-20 px-6 py-16 md:py-24">
      <section className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
        <div className="flex flex-col gap-6">
          <span className="w-fit rounded-full border border-fd-border px-3 py-1 text-xs font-medium text-fd-muted-foreground">
            v0.1 · React 19 · Tailwind CSS v4
          </span>
          <h1 className="text-4xl font-semibold tracking-tight text-balance md:text-6xl">
            Components that make <span className="text-fd-primary">forms</span> effortless.
          </h1>
          <p className="max-w-xl text-lg text-fd-muted-foreground">
            Trellis is an accessible React component library with built-in, fully typed React Hook Form and Zod
            integration. Install it from npm and ship validated forms in minutes.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/docs"
              className="inline-flex h-11 items-center rounded-lg bg-fd-primary px-5 font-medium text-fd-primary-foreground hover:opacity-90"
            >
              Get started
            </Link>
            <Link
              href="/docs/components"
              className="inline-flex h-11 items-center rounded-lg border border-fd-border px-5 font-medium hover:bg-fd-accent"
            >
              Browse components
            </Link>
          </div>
          <code className="w-fit rounded-lg border border-fd-border bg-fd-card px-4 py-2.5 font-mono text-sm">
            npm i @trellis-ui-pack/react @trellis-ui-pack/form
          </code>
        </div>
        <div className="flex justify-center rounded-2xl border border-fd-border bg-background p-6 text-foreground shadow-sm md:p-8">
          <Demo name="form-signup" />
        </div>
      </section>

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <div key={feature.title} className="flex flex-col gap-2">
            <h2 className="font-semibold">{feature.title}</h2>
            <p className="text-sm text-fd-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </section>

      <section className="flex flex-col gap-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold">Components</h2>
            <p className="text-fd-muted-foreground">{componentList.length} components in {categories.length} categories.</p>
          </div>
          <Link href="/docs/components" className="text-sm font-medium text-fd-primary hover:underline">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {componentList.map((item) => (
            <Link
              key={item.slug}
              href={`/docs/components/${item.slug}`}
              className="rounded-xl border border-fd-border bg-fd-card p-4 transition hover:border-fd-primary/60"
            >
              <div className="font-medium">{item.name}</div>
              <div className="text-sm text-fd-muted-foreground">{item.description}</div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
