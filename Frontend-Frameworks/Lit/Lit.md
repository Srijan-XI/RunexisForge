# Lit

## Overview
Lit is a simple, lightweight library for building fast, reactive Web Components. Created by Google, Lit provides a declarative template system, reactive state management, and scoped styles while staying close to web standards. It's the successor to Polymer and LitElement.

**Key Features:**
- Small footprint (~5KB minified + gzipped)
- Fast rendering with efficient updates
- Standards-based Web Components
- Simple, expressive syntax
- TypeScript support
- Excellent developer experience

## Installation

```bash
# npm
npm install lit

# yarn
yarn add lit

# pnpm
pnpm add lit
```

## Quick Start

### Basic Component

```javascript
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('simple-greeting')
export class SimpleGreeting extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 16px;
      color: #333;
    }
    .greeting {
      font-size: 24px;
      font-weight: bold;
    }
  `;

  @property()
  name = 'World';

  render() {
    return html`
      <div class="greeting">
        Hello, ${this.name}!
      </div>
    `;
  }
}
```

**Usage:**
```html
<simple-greeting name="Alice"></simple-greeting>
```

### Without Decorators (JavaScript)

```javascript
import { LitElement, html, css } from 'lit';

export class SimpleGreeting extends LitElement {
  static properties = {
    name: { type: String }
  };

  static styles = css`
    :host {
      display: block;
      padding: 16px;
    }
  `;

  constructor() {
    super();
    this.name = 'World';
  }

  render() {
    return html`<div>Hello, ${this.name}!</div>`;
  }
}

customElements.define('simple-greeting', SimpleGreeting);
```

## Templates

### HTML Template Literals

```javascript
import { LitElement, html } from 'lit';

class MyElement extends LitElement {
  render() {
    return html`
      <h1>Title</h1>
      <p>Paragraph text</p>
      <ul>
        ${['Item 1', 'Item 2', 'Item 3'].map(item => 
          html`<li>${item}</li>`
        )}
      </ul>
    `;
  }
}
```

### Conditional Rendering

```javascript
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';

class ConditionalComponent extends LitElement {
  @property({ type: Boolean })
  isLoggedIn = false;

  @property()
  userRole = 'guest';

  render() {
    return html`
      ${this.isLoggedIn
        ? html`<p>Welcome back!</p>`
        : html`<p>Please log in.</p>`
      }

      ${this.userRole === 'admin'
        ? html`<button>Admin Panel</button>`
        : null
      }
    `;
  }
}
```

### Loops and Lists

```javascript
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';

class TodoList extends LitElement {
  @property({ type: Array })
  todos = [
    { id: 1, text: 'Learn Lit', done: false },
    { id: 2, text: 'Build components', done: false },
    { id: 3, text: 'Ship product', done: false }
  ];

  render() {
    return html`
      <ul>
        ${this.todos.map(todo => html`
          <li>
            <input
              type="checkbox"
              .checked=${todo.done}
              @change=${() => this.toggleTodo(todo.id)}
            />
            <span>${todo.text}</span>
          </li>
        `)}
      </ul>
    `;
  }

  toggleTodo(id) {
    this.todos = this.todos.map(todo =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    );
  }
}
```

## Reactive Properties

### Property Options

```javascript
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';

class PropertyExample extends LitElement {
  // String property
  @property({ type: String })
  name = '';

  // Number property
  @property({ type: Number })
  count = 0;

  // Boolean property (attribute named 'active')
  @property({ type: Boolean })
  active = false;

  // Array property (doesn't reflect to attribute)
  @property({ type: Array, reflect: false })
  items = [];

  // Object property
  @property({ type: Object })
  user = { name: '', email: '' };

  // Custom attribute name
  @property({ attribute: 'data-value' })
  value = '';

  // Internal state (doesn't create attribute)
  @property({ attribute: false })
  _internal = 0;

  // Custom converter
  @property({
    converter: {
      fromAttribute: (value) => JSON.parse(value),
      toAttribute: (value) => JSON.stringify(value)
    }
  })
  config = {};

  render() {
    return html`
      <div>Name: ${this.name}</div>
      <div>Count: ${this.count}</div>
      <div>Active: ${this.active}</div>
    `;
  }
}
```

### State Decorator

```javascript
import { LitElement, html } from 'lit';
import { property, state } from 'lit/decorators.js';

class StatefulComponent extends LitElement {
  // Public property (attribute)
  @property({ type: String })
  userId = '';

  // Internal state (no attribute)
  @state()
  private _userData = null;

  @state()
  private _loading = false;

  async connectedCallback() {
    super.connectedCallback();
    await this.fetchUserData();
  }

  async fetchUserData() {
    this._loading = true;
    try {
      const response = await fetch(`/api/users/${this.userId}`);
      this._userData = await response.json();
    } finally {
      this._loading = false;
    }
  }

  render() {
    if (this._loading) {
      return html`<div>Loading...</div>`;
    }

    if (!this._userData) {
      return html`<div>No data</div>`;
    }

    return html`
      <div>
        <h2>${this._userData.name}</h2>
        <p>${this._userData.email}</p>
      </div>
    `;
  }
}
```

## Styling

### Component Styles

```javascript
import { LitElement, html, css } from 'lit';

class StyledComponent extends LitElement {
  static styles = css`
    :host {
      display: block;
      border: 1px solid #ccc;
      padding: 16px;
    }

    :host([disabled]) {
      opacity: 0.5;
      pointer-events: none;
    }

    :host(:hover) {
      border-color: blue;
    }

    h1 {
      color: #333;
      margin: 0 0 16px 0;
    }

    button {
      background: #007bff;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
    }

    button:hover {
      background: #0056b3;
    }
  `;

  render() {
    return html`
      <h1>Styled Component</h1>
      <button>Click Me</button>
    `;
  }
}
```

### Multiple Style Sheets

```javascript
import { LitElement, html, css } from 'lit';

const buttonStyles = css`
  button {
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
  }
`;

const cardStyles = css`
  :host {
    display: block;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 16px;
  }
`;

class MyCard extends LitElement {
  static styles = [cardStyles, buttonStyles, css`
    h2 {
      margin-top: 0;
    }
  `];

  render() {
    return html`
      <h2>Card Title</h2>
      <button>Action</button>
    `;
  }
}
```

### CSS Custom Properties (Theming)

```javascript
import { LitElement, html, css } from 'lit';

class ThemedButton extends LitElement {
  static styles = css`
    button {
      background: var(--button-bg, #007bff);
      color: var(--button-color, white);
      padding: var(--button-padding, 8px 16px);
      border: var(--button-border, none);
      border-radius: var(--button-radius, 4px);
      font-size: var(--button-font-size, 14px);
    }

    button:hover {
      background: var(--button-hover-bg, #0056b3);
    }
  `;

  render() {
    return html`<button><slot></slot></button>`;
  }
}
```

**Usage:**
```html
<style>
  themed-button {
    --button-bg: #28a745;
    --button-hover-bg: #218838;
    --button-padding: 12px 24px;
  }
</style>
<themed-button>Custom Button</themed-button>
```

## Event Handling

### Event Listeners

```javascript
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';

class EventExample extends LitElement {
  @property({ type: Number })
  count = 0;

  render() {
    return html`
      <button @click=${this.handleClick}>
        Clicked ${this.count} times
      </button>
      
      <input
        @input=${this.handleInput}
        @focus=${this.handleFocus}
        @blur=${this.handleBlur}
      />
    `;
  }

  handleClick(e) {
    this.count++;
    console.log('Button clicked', e);
  }

  handleInput(e) {
    console.log('Input value:', e.target.value);
  }

  handleFocus(e) {
    console.log('Input focused');
  }

  handleBlur(e) {
    console.log('Input blurred');
  }
}
```

### Custom Events

```javascript
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';

class CustomEventComponent extends LitElement {
  @property({ type: String })
  value = '';

  render() {
    return html`
      <input
        .value=${this.value}
        @input=${this.handleInput}
      />
    `;
  }

  handleInput(e) {
    this.value = e.target.value;
    
    // Dispatch custom event
    this.dispatchEvent(new CustomEvent('value-changed', {
      detail: { value: this.value },
      bubbles: true,
      composed: true
    }));
  }
}
```

**Usage:**
```html
<custom-event-component
  @value-changed=${(e) => console.log('New value:', e.detail.value)}
></custom-event-component>
```

## Lifecycle

### Lifecycle Methods

```javascript
import { LitElement, html } from 'lit';

class LifecycleExample extends LitElement {
  constructor() {
    super();
    console.log('1. Constructor called');
  }

  connectedCallback() {
    super.connectedCallback();
    console.log('2. Connected to DOM');
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    console.log('6. Disconnected from DOM');
  }

  attributeChangedCallback(name, oldVal, newVal) {
    super.attributeChangedCallback(name, oldVal, newVal);
    console.log(`3. Attribute ${name} changed: ${oldVal} -> ${newVal}`);
  }

  shouldUpdate(changedProperties) {
    console.log('4. Should update?', changedProperties);
    return true; // Return false to skip update
  }

  update(changedProperties) {
    console.log('5. Update called', changedProperties);
    super.update(changedProperties);
  }

  render() {
    console.log('5a. Render called');
    return html`<div>Lifecycle Example</div>`;
  }

  firstUpdated(changedProperties) {
    console.log('5b. First update completed', changedProperties);
  }

  updated(changedProperties) {
    console.log('5c. Update completed', changedProperties);
  }
}
```

## Directives

### Built-in Directives

```javascript
import { LitElement, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import { repeat } from 'lit/directives/repeat.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { live } from 'lit/directives/live.js';
import { until } from 'lit/directives/until.js';
import { cache } from 'lit/directives/cache.js';

class DirectivesExample extends LitElement {
  @property({ type: Array })
  items = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' }
  ];

  @property({ type: Boolean })
  isActive = false;

  @property({ type: String })
  optionalAttr;

  render() {
    // classMap - Dynamic classes
    const classes = {
      active: this.isActive,
      disabled: !this.isActive
    };

    // styleMap - Dynamic styles
    const styles = {
      color: this.isActive ? 'green' : 'red',
      fontSize: '16px'
    };

    return html`
      <!-- classMap -->
      <div class=${classMap(classes)}>Status</div>

      <!-- styleMap -->
      <div style=${styleMap(styles)}>Styled text</div>

      <!-- repeat - Efficient list rendering with keys -->
      <ul>
        ${repeat(
          this.items,
          (item) => item.id,
          (item, index) => html`<li>${index}: ${item.name}</li>`
        )}
      </ul>

      <!-- ifDefined - Only set attribute if defined -->
      <div title=${ifDefined(this.optionalAttr)}>
        Conditional attribute
      </div>

      <!-- live - For form inputs to prevent cursor jumping -->
      <input .value=${live(this.inputValue)} />

      <!-- until - Render placeholder until promise resolves -->
      <div>${until(this.fetchData(), html`<span>Loading...</span>`)}</div>

      <!-- cache - Cache DOM for toggled content -->
      ${cache(this.isActive ? html`<heavy-component></heavy-component>` : '')}
    `;
  }

  async fetchData() {
    const response = await fetch('/api/data');
    const data = await response.json();
    return html`<div>${data.message}</div>`;
  }
}
```

### Custom Directive

```javascript
import { directive, Directive } from 'lit/directive.js';
import { AsyncDirective } from 'lit/async-directive.js';

// Simple directive
const formatCurrency = directive(
  class extends Directive {
    render(value, currency = 'USD') {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency
      }).format(value);
    }
  }
);

// Async directive
const loadImage = directive(
  class extends AsyncDirective {
    render(src) {
      const img = new Image();
      img.onload = () => {
        this.setValue(html`<img src=${src} />`);
      };
      img.onerror = () => {
        this.setValue(html`<div>Failed to load image</div>`);
      };
      img.src = src;
      
      return html`<div>Loading...</div>`;
    }
  }
);

// Usage
class MyElement extends LitElement {
  render() {
    return html`
      <div>Price: ${formatCurrency(29.99, 'EUR')}</div>
      ${loadImage('https://example.com/image.jpg')}
    `;
  }
}
```

## Advanced Patterns

### Form Handling

```javascript
import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';

class LoginForm extends LitElement {
  static formAssociated = true;

  static styles = css`
    form { display: flex; flex-direction: column; gap: 12px; }
    input { padding: 8px; border: 1px solid #ccc; border-radius: 4px; }
    button { padding: 10px; background: #007bff; color: white; border: none; }
    .error { color: red; font-size: 14px; }
  `;

  @property({ type: Object })
  formData = { username: '', password: '' };

  @property({ type: Object })
  errors = {};

  render() {
    return html`
      <form @submit=${this.handleSubmit}>
        <input
          name="username"
          placeholder="Username"
          .value=${this.formData.username}
          @input=${this.handleInput}
        />
        ${this.errors.username
          ? html`<span class="error">${this.errors.username}</span>`
          : ''
        }

        <input
          type="password"
          name="password"
          placeholder="Password"
          .value=${this.formData.password}
          @input=${this.handleInput}
        />
        ${this.errors.password
          ? html`<span class="error">${this.errors.password}</span>`
          : ''
        }

        <button type="submit">Login</button>
      </form>
    `;
  }

  handleInput(e) {
    const { name, value } = e.target;
    this.formData = { ...this.formData, [name]: value };
    this.validateField(name, value);
  }

  validateField(name, value) {
    const newErrors = { ...this.errors };
    
    if (!value) {
      newErrors[name] = 'This field is required';
    } else if (name === 'password' && value.length < 6) {
      newErrors[name] = 'Password must be at least 6 characters';
    } else {
      delete newErrors[name];
    }
    
    this.errors = newErrors;
  }

  handleSubmit(e) {
    e.preventDefault();
    
    if (Object.keys(this.errors).length === 0) {
      this.dispatchEvent(new CustomEvent('login', {
        detail: this.formData,
        bubbles: true,
        composed: true
      }));
    }
  }
}
```

### Slots and Composition

```javascript
import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';

class CardComponent extends LitElement {
  static styles = css`
    :host {
      display: block;
      border: 1px solid #ddd;
      border-radius: 8px;
      overflow: hidden;
    }
    header {
      background: #f5f5f5;
      padding: 16px;
      border-bottom: 1px solid #ddd;
    }
    .content {
      padding: 16px;
    }
    footer {
      background: #f5f5f5;
      padding: 16px;
      border-top: 1px solid #ddd;
    }
  `;

  render() {
    return html`
      <header>
        <slot name="header">Default Header</slot>
      </header>
      <div class="content">
        <slot></slot>
      </div>
      <footer>
        <slot name="footer">Default Footer</slot>
      </footer>
    `;
  }
}
```

**Usage:**
```html
<card-component>
  <h2 slot="header">Custom Header</h2>
  <p>Main content goes here</p>
  <button slot="footer">Action</button>
</card-component>
```

### Context API

```javascript
import { LitElement, html } from 'lit';
import { provide, consume } from '@lit/context';
import { createContext } from '@lit/context';

// Create context
const themeContext = createContext('theme');

// Provider component
class ThemeProvider extends LitElement {
  @provide({ context: themeContext })
  @property({ type: Object })
  theme = { primary: '#007bff', secondary: '#6c757d' };

  render() {
    return html`<slot></slot>`;
  }
}

// Consumer component
class ThemedButton extends LitElement {
  @consume({ context: themeContext })
  @property({ attribute: false })
  theme;

  static styles = css`
    button {
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  `;

  render() {
    return html`
      <button style="background: ${this.theme?.primary}; color: white">
        <slot></slot>
      </button>
    `;
  }
}
```

## Testing

### Web Test Runner

```javascript
// my-element.test.js
import { fixture, expect, html } from '@open-wc/testing';
import './my-element.js';

describe('MyElement', () => {
  it('renders with default properties', async () => {
    const el = await fixture(html`<my-element></my-element>`);
    expect(el.shadowRoot.querySelector('h1')).to.exist;
  });

  it('updates on property change', async () => {
    const el = await fixture(html`<my-element name="Alice"></my-element>`);
    expect(el.shadowRoot.textContent).to.include('Alice');
    
    el.name = 'Bob';
    await el.updateComplete;
    expect(el.shadowRoot.textContent).to.include('Bob');
  });

  it('handles click events', async () => {
    const el = await fixture(html`<my-element></my-element>`);
    const button = el.shadowRoot.querySelector('button');
    
    button.click();
    await el.updateComplete;
    
    expect(el.count).to.equal(1);
  });
});
```

## Build and Development

### Vite Configuration

```javascript
// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/my-element.js',
      formats: ['es']
    },
    rollupOptions: {
      external: /^lit/
    }
  }
});
```

### TypeScript Configuration

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "moduleResolution": "node",
    "experimentalDecorators": true,
    "useDefineForClassFields": false
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules"]
}
```

## Performance Tips

1. **Use `willUpdate()` for expensive computations**
```javascript
willUpdate(changedProperties) {
  if (changedProperties.has('items')) {
    this._sortedItems = [...this.items].sort();
  }
}
```

2. **Use `repeat()` directive for lists**
```javascript
${repeat(items, item => item.id, item => html`<li>${item.name}</li>`)}
```

3. **Avoid recreating arrays/objects in render**
```javascript
// Bad
render() {
  return html`${[1,2,3].map(n => html`<div>${n}</div>`)}`;
}

// Good
items = [1, 2, 3];
render() {
  return html`${this.items.map(n => html`<div>${n}</div>`)}`;
}
```

## Resources

- [Official Lit Documentation](https://lit.dev)
- [Lit Playground](https://lit.dev/playground/)
- [Open Web Components](https://open-wc.org/)
- [Lit Element Starter](https://github.com/lit/lit-element-starter-ts)
- [Awesome Lit](https://github.com/web-padawan/awesome-lit)

## Ecosystem

- **@lit/localize** - Internationalization
- **@lit/context** - Dependency injection
- **@lit/task** - Async task management
- **@lit/react** - React wrapper for Lit components
- **Shoelace** - Component library built with Lit
- **Lion** - ING's design system built with Lit

## Comparison with Other Libraries

| Feature | Lit | React | Vue | Svelte |
|---------|-----|-------|-----|--------|
| Size | ~5KB | ~40KB | ~33KB | ~1.6KB |
| Standards | Web Components | JSX | SFC | Compiled |
| Learning Curve | Low | Medium | Medium | Low |
| Framework Lock-in | None | High | Medium | High |
| TypeScript | Excellent | Excellent | Good | Good |
| SSR | Via DSD | Excellent | Excellent | Good |

Lit is an excellent choice for building reusable components that work across frameworks, creating design systems, or building lightweight web applications with minimal overhead.
