# @trellis-ui-pack/charts

Themed line, area, bar, donut and sparkline charts for Trellis UI.

```bash
npm install @trellis-ui-pack/charts @trellis-ui-pack/react react react-dom tailwindcss
```

```css
@import "tailwindcss";
@import "@trellis-ui-pack/react/styles.css";
@import "@trellis-ui-pack/charts/styles.css";
```

```tsx
import { LineChart } from '@trellis-ui-pack/charts';

const data = [{ month: 'Jan', revenue: 1200 }];
const series = [{ key: 'revenue', label: 'Revenue' }];

export function RevenueChart() {
  return <LineChart data={data} index="month" series={series} />;
}
```

[Documentation and source](https://github.com/Piotr-Zacharski/trellis-ui)

## License

MIT
