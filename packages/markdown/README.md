# @trellis-ui/markdown

Streaming-friendly Markdown and highlighted code blocks for React applications.

```bash
npm install @trellis-ui/markdown @trellis-ui/react react react-dom tailwindcss
```

```css
@import "tailwindcss";
@import "@trellis-ui/react/styles.css";
@import "@trellis-ui/markdown/styles.css";
```

```tsx
import { Markdown } from '@trellis-ui/markdown';

export function Answer({ content }: { content: string }) {
  return <Markdown>{content}</Markdown>;
}
```

[Documentation and source](https://github.com/Piotr-Zacharski/trellis-ui)

## License

MIT
