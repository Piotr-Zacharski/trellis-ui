import Link from 'next/link';
import { categories, componentList } from '@/lib/components';
import { Demo } from './demo';

const badge: Partial<Record<string, string>> = { form: 'RHF + Zod', markdown: '@trellis-ui/markdown', charts: '@trellis-ui/charts' };

/** HeroUI-style overview: components grouped by category, each card with a live, non-interactive thumbnail. */
export function ComponentsGrid() {
  return (
    <div className="not-prose flex flex-col gap-12">
      {categories.map((category) => {
        const items = componentList.filter((item) => item.category === category);
        return (
          <section key={category} aria-labelledby={`category-${category}`} className="flex flex-col gap-4">
            <div className="flex items-baseline gap-2">
              <h2 id={`category-${category}`} className="text-lg font-semibold text-fd-foreground">
                {category}
              </h2>
              <span className="text-sm text-fd-muted-foreground">{items.length}</span>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <Link
                  key={item.slug}
                  href={`/docs/components/${item.slug}`}
                  className="group flex flex-col overflow-hidden rounded-xl border border-fd-border bg-fd-card transition hover:border-fd-primary/60 hover:shadow-md"
                >
                  <div
                    aria-hidden
                    inert
                    className="pointer-events-none relative flex h-44 items-center justify-center overflow-hidden bg-background text-foreground"
                  >
                    <div className="flex w-[160%] origin-center scale-[0.6] items-center justify-center">
                      <Demo name={item.demo} />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 border-t border-fd-border p-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-medium text-fd-foreground">{item.name}</span>
                      {badge[item.package] && (
                        <span className="rounded-full bg-fd-primary/10 px-2 py-0.5 text-xs font-medium text-fd-primary">
                          {badge[item.package]}
                        </span>
                      )}
                    </div>
                    <span className="text-sm text-fd-muted-foreground">{item.description}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
