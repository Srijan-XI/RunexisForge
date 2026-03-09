# FAST (Fast Adaptive Scalable Technology)

## Overview
FAST is Microsoft's modern web component library designed to build enterprise-grade, accessible, and performant user interfaces. It's built on Web Components standards and provides a comprehensive design system that works with any framework or none at all.

**Key Features:**
- Standards-based Web Components
- Built-in accessibility (WCAG compliance)
- Adaptive design system
- Framework-agnostic
- Design tokens for theming
- TypeScript support
- High performance
- Enterprise-ready

## Core Packages

### @microsoft/fast-element
Lightweight library for building Web Components (similar to Lit).

### @microsoft/fast-components
Ready-to-use, accessible UI components.

### @microsoft/fast-foundation
Base components and building blocks.

### @fluentui/web-components
Microsoft's Fluent Design components built with FAST.

## Installation

```bash
# FAST Element (for building custom components)
npm install @microsoft/fast-element

# FAST Components (pre-built components)
npm install @microsoft/fast-components

# Fluent UI Web Components
npm install @fluentui/web-components
```

## Quick Start with FAST Components

### Basic Usage

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>FAST Example</title>
  <script type="module" src="https://cdn.jsdelivr.net/npm/@microsoft/fast-components/dist/fast-components.min.js"></script>
</head>
<body>
  <fast-card>
    <h2>Welcome to FAST</h2>
    <fast-button appearance="accent">Click Me</fast-button>
  </fast-card>
</body>
</html>
```

### With npm

```javascript
import {
  provideFASTDesignSystem,
  fastButton,
  fastCard,
  fastTextField
} from '@microsoft/fast-components';

provideFASTDesignSystem()
  .register(
    fastButton(),
    fastCard(),
    fastTextField()
  );
```

**HTML:**
```html
<fast-card>
  <h2>Sign In</h2>
  <fast-text-field placeholder="Username"></fast-text-field>
  <fast-text-field type="password" placeholder="Password"></fast-text-field>
  <fast-button appearance="accent">Sign In</fast-button>
</fast-card>
```

## FAST Element

### Creating Custom Components

```typescript
import { FASTElement, customElement, attr, html, css } from '@microsoft/fast-element';

const template = html<NameTag>`
  <div class="header">
    <h3>${x => x.greeting.toUpperCase()}</h3>
  </div>
  <div class="body">
    <slot></slot>
  </div>
`;

const styles = css`
  :host {
    display: block;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 16px;
    font-family: sans-serif;
  }

  .header {
    background: #0078d4;
    color: white;
    padding: 8px;
    margin: -16px -16px 16px;
    border-radius: 8px 8px 0 0;
  }

  h3 {
    margin: 0;
  }
`;

@customElement({
  name: 'name-tag',
  template,
  styles
})
export class NameTag extends FASTElement {
  @attr greeting: string = 'Hello';
}
```

**Usage:**
```html
<name-tag greeting="Welcome">John Doe</name-tag>
```

### Attributes and Properties

```typescript
import { FASTElement, customElement, attr, observable } from '@microsoft/fast-element';

@customElement('my-counter')
export class MyCounter extends FASTElement {
  // Attribute (syncs with HTML attribute)
  @attr({ mode: 'boolean' })
  disabled: boolean = false;

  // Attribute with converter
  @attr({ converter: {
    fromView(value: string): number {
      return parseInt(value);
    },
    toView(value: number): string {
      return value.toString();
    }
  }})
  count: number = 0;

  // Observable property (triggers re-render)
  @observable
  internalState: string = '';

  // Regular property (no reactivity)
  private cache: any = {};

  increment() {
    this.count++;
  }
}
```

### Templating

```typescript
import { html, repeat, when } from '@microsoft/fast-element';

const myTemplate = html<TodoList>`
  <h2>${x => x.title}</h2>
  
  <!-- Conditional rendering -->
  ${when(x => x.items.length > 0, html<TodoList>`
    <ul>
      ${repeat(x => x.items, html<TodoItem>`
        <li>
          <input type="checkbox" :checked=${x => x.completed} />
          <span>${x => x.text}</span>
        </li>
      `)}
    </ul>
  `)}
  
  ${when(x => x.items.length === 0, html`
    <p>No items</p>
  `)}
`;

interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
}

@customElement({
  name: 'todo-list',
  template: myTemplate
})
export class TodoList extends FASTElement {
  @attr title: string = 'My Todos';
  @observable items: TodoItem[] = [];
}
```

### Event Handling

```typescript
import { FASTElement, customElement, observable, html } from '@microsoft/fast-element';

const template = html<FormComponent>`
  <form @submit=${x => x.handleSubmit}>
    <input
      type="text"
      :value=${x => x.inputValue}
      @input=${(x, c) => x.handleInput(c.event as InputEvent)}
    />
    <button type="submit">Submit</button>
  </form>
`;

@customElement({
  name: 'form-component',
  template
})
export class FormComponent extends FASTElement {
  @observable inputValue: string = '';

  handleInput(event: InputEvent) {
    this.inputValue = (event.target as HTMLInputElement).value;
  }

  handleSubmit(event: Event) {
    event.preventDefault();
    console.log('Submitted:', this.inputValue);
    
    // Emit custom event
    this.$emit('form-submit', this.inputValue);
  }
}
```

### Directives

```typescript
import { html, ref, children, slotted } from '@microsoft/fast-element';

const template = html<MyComponent>`
  <!-- Element reference -->
  <div ${ref('divRef')}>Content</div>
  
  <!-- Children directive -->
  <div ${children('items')}>
    <slot></slot>
  </div>
  
  <!-- Slotted content -->
  <div ${slotted('slottedElements')}>
    <slot></slot>
  </div>
`;

@customElement({
  name: 'my-component',
  template
})
export class MyComponent extends FASTElement {
  divRef: HTMLDivElement;
  items: Node[];
  slottedElements: Element[];

  connectedCallback() {
    super.connectedCallback();
    console.log('Div reference:', this.divRef);
    console.log('Children:', this.items);
  }
}
```

## Design System and Theming

### Design Tokens

```typescript
import {
  DesignToken,
  DesignTokenChangeRecord
} from '@microsoft/fast-foundation';

// Create design tokens
const accentColor = DesignToken.create<string>('accent-color');
const baseFont = DesignToken.create<string>('base-font');
const spacing = DesignToken.create<number>('spacing');

// Set token values
accentColor.setValueFor(document.body, '#0078d4');
baseFont.setValueFor(document.body, 'Segoe UI, sans-serif');
spacing.setValueFor(document.body, 8);

// Use in components
@customElement('themed-button')
export class ThemedButton extends FASTElement {
  static styles = css`
    button {
      background: ${accentColor};
      font-family: ${baseFont};
      padding: ${spacing}px;
    }
  `;
}

// Subscribe to token changes
accentColor.subscribe({
  handleChange(record: DesignTokenChangeRecord<string>) {
    console.log('Accent color changed to:', record.target.value);
  }
});
```

### Custom Design System

```typescript
import {
  DesignSystem,
  DesignSystemProvider
} from '@microsoft/fast-foundation';

// Create custom design system
const myDesignSystem = DesignSystem.getOrCreate()
  .withPrefix('my-ui');

// Register components
myDesignSystem.register(
  myButton(),
  myCard(),
  myTextField()
);

// Create design system provider
const template = html<MyDesignSystemProvider>`
  <slot></slot>
`;

@customElement({
  name: 'my-design-system-provider',
  template
})
export class MyDesignSystemProvider extends DesignSystemProvider {
  // Custom design system configuration
}
```

## FAST Components Library

### Available Components

```javascript
import {
  provideFASTDesignSystem,
  // Buttons
  fastButton,
  fastAnchor,
  
  // Forms
  fastTextField,
  fastTextArea,
  fastCheckbox,
  fastRadio,
  fastRadioGroup,
  fastSwitch,
  fastSlider,
  fastSelect,
  fastOption,
  
  // Navigation
  fastTabs,
  fastTab,
  fastTabPanel,
  fastBreadcrumb,
  fastBreadcrumbItem,
  fastMenu,
  fastMenuItem,
  
  // Layout
  fastCard,
  fastAccordion,
  fastAccordionItem,
  fastDivider,
  
  // Data Display
  fastDataGrid,
  fastDataGridRow,
  fastDataGridCell,
  fastBadge,
  fastProgress,
  fastProgressRing,
  fastSkeleton,
  
  // Overlay
  fastDialog,
  fastTooltip,
  
  // Other
  fastTreeView,
  fastTreeItem,
  fastListbox,
  fastCombobox,
  fastNumberField,
  fastSearch
} from '@microsoft/fast-components';

provideFASTDesignSystem()
  .register(
    fastButton(),
    fastTextField(),
    fastCard()
    // ... register needed components
  );
```

### Component Examples

#### Button

```html
<fast-button>Default Button</fast-button>
<fast-button appearance="accent">Accent Button</fast-button>
<fast-button appearance="lightweight">Lightweight</fast-button>
<fast-button appearance="neutral">Neutral</fast-button>
<fast-button appearance="outline">Outline</fast-button>
<fast-button appearance="stealth">Stealth</fast-button>
<fast-button disabled>Disabled</fast-button>
```

#### Text Field

```html
<fast-text-field placeholder="Enter text"></fast-text-field>
<fast-text-field type="email" placeholder="Email"></fast-text-field>
<fast-text-field type="password" placeholder="Password"></fast-text-field>
<fast-text-field readonly value="Read only"></fast-text-field>
<fast-text-field disabled value="Disabled"></fast-text-field>
```

#### Card

```html
<fast-card>
  <h3>Card Title</h3>
  <p>Card content goes here.</p>
  <fast-button appearance="accent">Action</fast-button>
</fast-card>
```

#### Tabs

```html
<fast-tabs>
  <fast-tab>Tab 1</fast-tab>
  <fast-tab>Tab 2</fast-tab>
  <fast-tab>Tab 3</fast-tab>
  <fast-tab-panel>Content 1</fast-tab-panel>
  <fast-tab-panel>Content 2</fast-tab-panel>
  <fast-tab-panel>Content 3</fast-tab-panel>
</fast-tabs>
```

#### Accordion

```html
<fast-accordion>
  <fast-accordion-item expanded>
    <span slot="heading">Section 1</span>
    Content for section 1
  </fast-accordion-item>
  <fast-accordion-item>
    <span slot="heading">Section 2</span>
    Content for section 2
  </fast-accordion-item>
</fast-accordion>
```

#### Dialog

```html
<fast-button id="openDialog">Open Dialog</fast-button>

<fast-dialog id="dialog" modal>
  <h2>Dialog Title</h2>
  <p>Dialog content</p>
  <fast-button id="closeDialog">Close</fast-button>
</fast-dialog>

<script>
  document.getElementById('openDialog').addEventListener('click', () => {
    document.getElementById('dialog').show();
  });
  
  document.getElementById('closeDialog').addEventListener('click', () => {
    document.getElementById('dialog').hide();
  });
</script>
```

#### Data Grid

```html
<fast-data-grid id="grid"></fast-data-grid>

<script>
  const grid = document.getElementById('grid');
  
  grid.rowsData = [
    { name: 'Alice', age: 30, role: 'Developer' },
    { name: 'Bob', age: 25, role: 'Designer' },
    { name: 'Charlie', age: 35, role: 'Manager' }
  ];
</script>
```

## Fluent UI Web Components

```bash
npm install @fluentui/web-components
```

```javascript
import {
  provideFluentDesignSystem,
  fluentButton,
  fluentCard,
  fluentTextField
} from '@fluentui/web-components';

provideFluentDesignSystem()
  .register(
    fluentButton(),
    fluentCard(),
    fluentTextField()
  );
```

**Usage:**
```html
<fluent-card>
  <h2>Fluent Design</h2>
  <fluent-text-field placeholder="Enter text"></fluent-text-field>
  <fluent-button appearance="accent">Submit</fluent-button>
</fluent-card>
```

### Fluent Theming

```javascript
import {
  baseLayerLuminance,
  StandardLuminance,
  accentBaseColor,
  SwatchRGB
} from '@fluentui/web-components';

// Set theme
baseLayerLuminance.setValueFor(
  document.body,
  StandardLuminance.DarkMode
);

// Set accent color
accentBaseColor.setValueFor(
  document.body,
  SwatchRGB.from({ r: 0, g: 120, b: 212 })
);
```

## Advanced Patterns

### Composition

```typescript
import { FASTElement, customElement, html, css } from '@microsoft/fast-element';

// Base component
@customElement({
  name: 'base-input',
  template: html<BaseInput>`
    <label>
      ${x => x.label}
      <input
        type="text"
        :value=${x => x.value}
        @input=${(x, c) => x.handleInput(c.event)}
      />
    </label>
  `,
  styles: css`
    label { display: block; margin-bottom: 8px; }
    input { padding: 8px; border: 1px solid #ccc; }
  `
})
export class BaseInput extends FASTElement {
  @attr label: string = '';
  @observable value: string = '';

  handleInput(event: Event) {
    this.value = (event.target as HTMLInputElement).value;
    this.$emit('value-changed', this.value);
  }
}

// Extended component
@customElement({
  name: 'email-input',
  template: html<EmailInput>`
    <base-input
      label="Email"
      :value=${x => x.email}
      @value-changed=${(x, c) => x.handleEmailChange(c.event)}
    ></base-input>
    ${when(x => !x.isValid, html`
      <span class="error">Please enter a valid email</span>
    `)}
  `,
  styles: css`
    .error { color: red; font-size: 12px; }
  `
})
export class EmailInput extends FASTElement {
  @observable email: string = '';
  @observable isValid: boolean = true;

  handleEmailChange(event: CustomEvent) {
    this.email = event.detail;
    this.isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email);
  }
}
```

### Dependency Injection

```typescript
import { FASTElement, customElement, DI } from '@microsoft/fast-element';

// Create service
class DataService {
  async fetchData() {
    const response = await fetch('/api/data');
    return response.json();
  }
}

// Register service
const DataServiceToken = DI.createInterface<DataService>(x => 
  x.singleton(DataService)
);

// Use in component
@customElement('data-display')
export class DataDisplay extends FASTElement {
  private dataService = DI.inject(DataServiceToken);
  @observable data: any = null;

  async connectedCallback() {
    super.connectedCallback();
    this.data = await this.dataService.fetchData();
  }
}
```

## Performance Optimization

### Batch Updates

```typescript
import { Updates } from '@microsoft/fast-element';

@customElement('batch-component')
export class BatchComponent extends FASTElement {
  @observable items: any[] = [];

  async addMultipleItems() {
    // Queue updates
    Updates.enqueue(() => {
      this.items.push({ id: 1, name: 'Item 1' });
      this.items.push({ id: 2, name: 'Item 2' });
      this.items.push({ id: 3, name: 'Item 3' });
    });
  }
}
```

### Virtual Scrolling

```typescript
import { html, repeat } from '@microsoft/fast-element';

const template = html<VirtualList>`
  <div class="viewport" @scroll=${x => x.handleScroll}>
    <div class="spacer" :style=${x => `height: ${x.spacerHeight}px`}></div>
    ${repeat(x => x.visibleItems, html`
      <div class="item">${x => x.text}</div>
    `)}
  </div>
`;

@customElement({
  name: 'virtual-list',
  template
})
export class VirtualList extends FASTElement {
  @observable allItems: any[] = [];
  @observable visibleItems: any[] = [];
  @observable spacerHeight: number = 0;

  itemHeight = 50;
  viewportHeight = 500;

  handleScroll(event: Event) {
    const scrollTop = (event.target as HTMLElement).scrollTop;
    const startIndex = Math.floor(scrollTop / this.itemHeight);
    const endIndex = startIndex + Math.ceil(this.viewportHeight / this.itemHeight);
    
    this.visibleItems = this.allItems.slice(startIndex, endIndex);
    this.spacerHeight = startIndex * this.itemHeight;
  }
}
```

## Testing

```typescript
// component.spec.ts
import { test } from '@playwright/test';
import { expect } from '@playwright/test';

test.describe('MyComponent', () => {
  test('renders correctly', async ({ page }) => {
    await page.goto('/');
    
    const component = await page.locator('my-component');
    await expect(component).toBeVisible();
  });

  test('handles click events', async ({ page }) => {
    await page.goto('/');
    
    const button = await page.locator('my-component button');
    await button.click();
    
    const count = await page.locator('my-component .count');
    await expect(count).toHaveText('1');
  });
});
```

## Best Practices

1. **Use design tokens for theming**
2. **Leverage built-in accessibility features**
3. **Keep components focused and composable**
4. **Use TypeScript for type safety**
5. **Follow ARIA guidelines**
6. **Test with assistive technologies**
7. **Optimize for performance with batch updates**
8. **Use dependency injection for services**

## Browser Support

- Chrome/Edge: 79+
- Firefox: 63+
- Safari: 11.1+
- Opera: 66+

For older browsers, use polyfills:
```html
<script src="https://unpkg.com/@webcomponents/webcomponentsjs@2/webcomponents-loader.js"></script>
```

## Resources

- [FAST Official Documentation](https://www.fast.design/)
- [FAST Element](https://www.fast.design/docs/fast-element/getting-started)
- [FAST Components](https://explore.fast.design/components/fast-button)
- [Fluent UI Web Components](https://docs.microsoft.com/en-us/fluent-ui/web-components/)
- [GitHub Repository](https://github.com/microsoft/fast)
- [Discord Community](https://discord.gg/FcSNfg4)

## Comparison

| Feature | FAST | Lit | Stencil | Web Components |
|---------|------|-----|---------|----------------|
| Created By | Microsoft | Google | Ionic | W3C Standard |
| Size | ~6KB | ~5KB | 0 (compiler) | Native |
| Design System | Built-in | None | None | None |
| Accessibility | Excellent | Good | Good | Manual |
| Enterprise Focus | Yes | No | Yes | N/A |
| Fluent Design | Yes | No | No | No |

FAST is ideal for enterprise applications requiring accessible, themeable components that integrate with Microsoft's design language and tooling ecosystem.
