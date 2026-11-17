import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { demos } from '@/demos';

afterEach(cleanup);

// Smoke test: every live example on the site renders without throwing or logging React errors.
describe('demos', () => {
  for (const [name, Demo] of Object.entries(demos)) {
    it(name, () => {
      const errors: unknown[] = [];
      const spy = vi.spyOn(console, 'error').mockImplementation((...args) => errors.push(args));
      const { container } = render(<Demo />);
      spy.mockRestore();
      expect(container.innerHTML.length).toBeGreaterThan(0);
      expect(errors.map((e) => String((e as unknown[])[0]).slice(0, 300))).toEqual([]);
    });
  }
});
