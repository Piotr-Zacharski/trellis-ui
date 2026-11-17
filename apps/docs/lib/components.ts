// Generated from the component catalog. Drives the /docs/components grid, the home page and the sidebar order.
import type { DemoName } from '@/demos';

export const categories = ["Forms","Actions","Overlays","Navigation","Feedback","Data display","AI","Layout","Charts"] as const;
export type Category = (typeof categories)[number];

export interface ComponentEntry {
  slug: string;
  name: string;
  description: string;
  category: Category;
  demo: DemoName;
  package: 'react' | 'form' | 'markdown' | 'charts';
}

export const componentList: ComponentEntry[] = [
  {
    "slug": "form",
    "name": "Form",
    "description": "React Hook Form + Zod, fully typed.",
    "category": "Forms",
    "demo": "form-signup",
    "package": "form"
  },
  {
    "slug": "text-field",
    "name": "Text Field",
    "description": "Text input with label, errors and addons.",
    "category": "Forms",
    "demo": "text-field",
    "package": "react"
  },
  {
    "slug": "textarea-field",
    "name": "Text Area",
    "description": "Multi-line text input.",
    "category": "Forms",
    "demo": "textarea-field",
    "package": "react"
  },
  {
    "slug": "number-field",
    "name": "Number Field",
    "description": "Locale-aware numeric input.",
    "category": "Forms",
    "demo": "number-field",
    "package": "react"
  },
  {
    "slug": "input-otp",
    "name": "Input OTP",
    "description": "One-time code with separate slots.",
    "category": "Forms",
    "demo": "input-otp",
    "package": "react"
  },
  {
    "slug": "search-field",
    "name": "Search Field",
    "description": "Search input with clear button.",
    "category": "Forms",
    "demo": "search-field",
    "package": "react"
  },
  {
    "slug": "select",
    "name": "Select",
    "description": "Pick one option from a list.",
    "category": "Forms",
    "demo": "select",
    "package": "react"
  },
  {
    "slug": "combo-box",
    "name": "Combobox",
    "description": "Searchable select with autocomplete.",
    "category": "Forms",
    "demo": "combo-box",
    "package": "react"
  },
  {
    "slug": "checkbox",
    "name": "Checkbox",
    "description": "Toggle a single option.",
    "category": "Forms",
    "demo": "checkbox",
    "package": "react"
  },
  {
    "slug": "checkbox-group",
    "name": "Checkbox Group",
    "description": "Pick several options from a set.",
    "category": "Forms",
    "demo": "checkbox-group",
    "package": "react"
  },
  {
    "slug": "radio-group",
    "name": "Radio Group",
    "description": "Pick exactly one of a few options.",
    "category": "Forms",
    "demo": "radio-group",
    "package": "react"
  },
  {
    "slug": "switch",
    "name": "Switch",
    "description": "Instant on/off setting.",
    "category": "Forms",
    "demo": "switch",
    "package": "react"
  },
  {
    "slug": "slider",
    "name": "Slider",
    "description": "Pick a value or a range by dragging.",
    "category": "Forms",
    "demo": "slider",
    "package": "react"
  },
  {
    "slug": "rating",
    "name": "Rating",
    "description": "Star rating input.",
    "category": "Forms",
    "demo": "rating",
    "package": "react"
  },
  {
    "slug": "tag-field",
    "name": "Tag Field",
    "description": "Type to add tags; removable tag lists.",
    "category": "Forms",
    "demo": "tag-field",
    "package": "react"
  },
  {
    "slug": "date-picker",
    "name": "Date Picker",
    "description": "Date input with a calendar.",
    "category": "Forms",
    "demo": "date-picker",
    "package": "react"
  },
  {
    "slug": "date-range-picker",
    "name": "Date Range Picker",
    "description": "Pick a start and end date.",
    "category": "Forms",
    "demo": "date-range-picker",
    "package": "react"
  },
  {
    "slug": "date-field",
    "name": "Date & Time Field",
    "description": "Keyboard entry for dates and times.",
    "category": "Forms",
    "demo": "date-field",
    "package": "react"
  },
  {
    "slug": "color-picker",
    "name": "Color Picker",
    "description": "Pick a color with area, hue and hex.",
    "category": "Forms",
    "demo": "color-picker",
    "package": "react"
  },
  {
    "slug": "file-upload",
    "name": "File Upload",
    "description": "Drag & drop area with file list.",
    "category": "Forms",
    "demo": "file-upload",
    "package": "react"
  },
  {
    "slug": "fieldset",
    "name": "Fieldset",
    "description": "Group related fields under a legend.",
    "category": "Forms",
    "demo": "fieldset",
    "package": "react"
  },
  {
    "slug": "button",
    "name": "Button",
    "description": "Triggers an action, with a pending state.",
    "category": "Actions",
    "demo": "button-variants",
    "package": "react"
  },
  {
    "slug": "toggle-button",
    "name": "Toggle Button",
    "description": "On/off buttons and segmented controls.",
    "category": "Actions",
    "demo": "toggle-button",
    "package": "react"
  },
  {
    "slug": "link",
    "name": "Link",
    "description": "Accessible, router-aware link.",
    "category": "Actions",
    "demo": "link",
    "package": "react"
  },
  {
    "slug": "dialog",
    "name": "Dialog",
    "description": "Modal window for focused tasks.",
    "category": "Overlays",
    "demo": "dialog",
    "package": "react"
  },
  {
    "slug": "alert-dialog",
    "name": "Alert Dialog",
    "description": "Confirmation that needs a decision.",
    "category": "Overlays",
    "demo": "alert-dialog",
    "package": "react"
  },
  {
    "slug": "drawer",
    "name": "Drawer",
    "description": "Panel sliding in from a screen edge.",
    "category": "Overlays",
    "demo": "drawer",
    "package": "react"
  },
  {
    "slug": "popover",
    "name": "Popover",
    "description": "Popup anchored to a trigger.",
    "category": "Overlays",
    "demo": "popover",
    "package": "react"
  },
  {
    "slug": "tooltip",
    "name": "Tooltip",
    "description": "Short hint on hover or focus.",
    "category": "Overlays",
    "demo": "tooltip",
    "package": "react"
  },
  {
    "slug": "hover-card",
    "name": "Hover Card",
    "description": "Rich preview on hover, e.g. profiles.",
    "category": "Overlays",
    "demo": "hover-card",
    "package": "react"
  },
  {
    "slug": "menu",
    "name": "Menu",
    "description": "Dropdown menu with sections and submenus.",
    "category": "Overlays",
    "demo": "menu",
    "package": "react"
  },
  {
    "slug": "context-menu",
    "name": "Context Menu",
    "description": "Menu on right click.",
    "category": "Overlays",
    "demo": "context-menu",
    "package": "react"
  },
  {
    "slug": "command-palette",
    "name": "Command Palette",
    "description": "Search for actions with Cmd+K.",
    "category": "Overlays",
    "demo": "command-palette",
    "package": "react"
  },
  {
    "slug": "tabs",
    "name": "Tabs",
    "description": "Switch between related views.",
    "category": "Navigation",
    "demo": "tabs",
    "package": "react"
  },
  {
    "slug": "accordion",
    "name": "Accordion",
    "description": "Collapsible sections.",
    "category": "Navigation",
    "demo": "accordion",
    "package": "react"
  },
  {
    "slug": "breadcrumbs",
    "name": "Breadcrumbs",
    "description": "Trail of links to the current page.",
    "category": "Navigation",
    "demo": "breadcrumbs",
    "package": "react"
  },
  {
    "slug": "pagination",
    "name": "Pagination",
    "description": "Navigate pages of results.",
    "category": "Navigation",
    "demo": "pagination",
    "package": "react"
  },
  {
    "slug": "stepper",
    "name": "Stepper",
    "description": "Progress through a multi-step flow.",
    "category": "Navigation",
    "demo": "stepper",
    "package": "react"
  },
  {
    "slug": "toast",
    "name": "Toast",
    "description": "Brief, non-blocking notifications.",
    "category": "Feedback",
    "demo": "toast",
    "package": "react"
  },
  {
    "slug": "alert",
    "name": "Alert",
    "description": "Inline status message.",
    "category": "Feedback",
    "demo": "alert",
    "package": "react"
  },
  {
    "slug": "spinner",
    "name": "Spinner",
    "description": "Loading indicator – ring or dots.",
    "category": "Feedback",
    "demo": "spinner",
    "package": "react"
  },
  {
    "slug": "progress-bar",
    "name": "Progress Bar",
    "description": "Linear progress.",
    "category": "Feedback",
    "demo": "progress-bar",
    "package": "react"
  },
  {
    "slug": "progress-circle",
    "name": "Progress Circle",
    "description": "Circular progress.",
    "category": "Feedback",
    "demo": "progress-circle",
    "package": "react"
  },
  {
    "slug": "skeleton",
    "name": "Skeleton",
    "description": "Placeholder while content loads.",
    "category": "Feedback",
    "demo": "skeleton",
    "package": "react"
  },
  {
    "slug": "empty-state",
    "name": "Empty State",
    "description": "When there is nothing to show.",
    "category": "Feedback",
    "demo": "empty-state",
    "package": "react"
  },
  {
    "slug": "card",
    "name": "Card",
    "description": "Container for grouped content.",
    "category": "Data display",
    "demo": "card",
    "package": "react"
  },
  {
    "slug": "chip",
    "name": "Chip",
    "description": "Compact status or label.",
    "category": "Data display",
    "demo": "chip",
    "package": "react"
  },
  {
    "slug": "avatar",
    "name": "Avatar",
    "description": "User image with initials fallback.",
    "category": "Data display",
    "demo": "avatar",
    "package": "react"
  },
  {
    "slug": "badge",
    "name": "Badge",
    "description": "Count or dot on another element.",
    "category": "Data display",
    "demo": "badge",
    "package": "react"
  },
  {
    "slug": "table",
    "name": "Table",
    "description": "Sortable, selectable data table.",
    "category": "Data display",
    "demo": "table",
    "package": "react"
  },
  {
    "slug": "timeline",
    "name": "Timeline",
    "description": "Events in chronological order.",
    "category": "Data display",
    "demo": "timeline",
    "package": "react"
  },
  {
    "slug": "kbd",
    "name": "Kbd",
    "description": "Keyboard key.",
    "category": "Data display",
    "demo": "kbd",
    "package": "react"
  },
  {
    "slug": "separator",
    "name": "Separator",
    "description": "Visual divider.",
    "category": "Data display",
    "demo": "separator",
    "package": "react"
  },
  {
    "slug": "chat",
    "name": "Chat",
    "description": "AI prompt box: files, images, voice.",
    "category": "AI",
    "demo": "chat",
    "package": "react"
  },
  {
    "slug": "chat-message-actions",
    "name": "Message Actions",
    "description": "Copy, regenerate and feedback.",
    "category": "AI",
    "demo": "chat-actions",
    "package": "react"
  },
  {
    "slug": "prompt-suggestions",
    "name": "Prompt Suggestions",
    "description": "Starter prompts for an empty chat.",
    "category": "AI",
    "demo": "prompt-suggestions",
    "package": "react"
  },
  {
    "slug": "chain-of-thought",
    "name": "Chain of Thought",
    "description": "Collapsible reasoning and shimmer text.",
    "category": "AI",
    "demo": "chain-of-thought",
    "package": "react"
  },
  {
    "slug": "chat-tool",
    "name": "Tool Call",
    "description": "Status of a function / tool call.",
    "category": "AI",
    "demo": "chat-tool",
    "package": "react"
  },
  {
    "slug": "chat-sources",
    "name": "Sources",
    "description": "Citations used by an answer.",
    "category": "AI",
    "demo": "chat-sources",
    "package": "react"
  },
  {
    "slug": "markdown",
    "name": "Markdown",
    "description": "Streaming-friendly Markdown for AI answers.",
    "category": "AI",
    "demo": "markdown",
    "package": "markdown"
  },
  {
    "slug": "code-block",
    "name": "Code Block",
    "description": "Code with copy button and highlighting.",
    "category": "AI",
    "demo": "code-block",
    "package": "markdown"
  },
  {
    "slug": "app-layout",
    "name": "App Layout",
    "description": "Sidebar, navbar and content shell.",
    "category": "Layout",
    "demo": "app-layout",
    "package": "react"
  },
  {
    "slug": "resizable",
    "name": "Resizable Panels",
    "description": "Draggable split panes.",
    "category": "Layout",
    "demo": "resizable",
    "package": "react"
  },
  {
    "slug": "line-chart",
    "name": "Line Chart",
    "description": "Trends over time.",
    "category": "Charts",
    "demo": "line-chart",
    "package": "charts"
  },
  {
    "slug": "area-chart",
    "name": "Area Chart",
    "description": "Volume over time.",
    "category": "Charts",
    "demo": "area-chart",
    "package": "charts"
  },
  {
    "slug": "bar-chart",
    "name": "Bar Chart",
    "description": "Compare categories.",
    "category": "Charts",
    "demo": "bar-chart",
    "package": "charts"
  },
  {
    "slug": "donut-chart",
    "name": "Donut Chart",
    "description": "Parts of a whole.",
    "category": "Charts",
    "demo": "donut-chart",
    "package": "charts"
  },
  {
    "slug": "kpi",
    "name": "KPI & Sparkline",
    "description": "Metric cards with trend.",
    "category": "Charts",
    "demo": "kpi",
    "package": "react"
  }
];
