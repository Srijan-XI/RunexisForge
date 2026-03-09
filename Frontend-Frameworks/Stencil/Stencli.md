# Stencil

## Overview
Stencil is a compiler that generates Web Components (specifically, Custom Elements) and builds high-performance web apps. Created by the Ionic team, Stencil combines the best concepts from popular frameworks into a simple build-time tool that generates standards-compliant Web Components.

**Key Features:**
- Generates 100% standards-based Web Components
- TypeScript support out of the box
- JSX templating
- Virtual DOM for efficient rendering
- Async rendering (inspired by React Fiber)
- Reactive data-binding
- Lazy loading and code splitting
- Pre-rendering and SSR support
- Zero runtime dependencies

## Why Stencil?

Stencil is not a framework - it's a compiler that generates Web Components. The output is:
- Framework-agnostic (works with React, Vue, Angular, or vanilla JS)
- Standards-based (native browser APIs)
- Highly optimized (only loads what's needed)
- Future-proof (based on web standards)

## Installation

```bash
# Create new project
npm init stencil

# Or manually
npm install @stencil/core --save-dev
```

### Project Structure

```
my-component/
├── src/
│   ├── components/
│   │   └── my-component/
│   │       ├── my-component.tsx
│   │       ├── my-component.css
│   │       └── my-component.spec.ts
│   └── index.html
├── stencil.config.ts
├── tsconfig.json
└── package.json
```

## Quick Start

### Basic Component

```typescript
import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true
})
export class MyComponent {
  @Prop() name: string;

  render() {
    return <div>Hello, {this.name}!</div>;
  }
}
```

**Usage:**
```html
<my-component name="World"></my-component>
```

### Component Configuration

```typescript
import { Component, h } from '@stencil/core';

@Component({
  tag: 'my-button',
  styleUrl: 'my-button.css',
  shadow: true,              // Use Shadow DOM
  scoped: false,             // Or use scoped CSS (if shadow: false)
  assetsDirs: ['assets'],    // Asset directories
})
export class MyButton {
  render() {
    return <button><slot /></button>;
  }
}
```

## Decorators

### @Prop - Properties

```typescript
import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'user-profile',
  shadow: true
})
export class UserProfile {
  // String prop
  @Prop() name: string;

  // Number prop
  @Prop() age: number;

  // Boolean prop (attribute: disabled)
  @Prop() disabled: boolean = false;

  // Mutable prop (can be changed internally)
  @Prop({ mutable: true }) count: number = 0;

  // Reflected prop (updates attribute when changed)
  @Prop({ reflect: true }) status: string = 'active';

  // Custom attribute name
  @Prop({ attribute: 'user-id' }) userId: string;

  // Object/Array prop
  @Prop() userData: { name: string; email: string };

  incrementCount() {
    this.count++; // Works because mutable: true
  }

  render() {
    return (
      <div>
        <h2>{this.name}</h2>
        <p>Age: {this.age}</p>
        <p>Status: {this.status}</p>
        <p>Count: {this.count}</p>
        <button onClick={() => this.incrementCount()}>Increment</button>
      </div>
    );
  }
}
```

### @State - Internal State

```typescript
import { Component, State, h } from '@stencil/core';

@Component({
  tag: 'counter-component',
  shadow: true
})
export class CounterComponent {
  @State() count: number = 0;
  @State() isEven: boolean = true;

  increment() {
    this.count++;
    this.isEven = this.count % 2 === 0;
  }

  render() {
    return (
      <div>
        <p>Count: {this.count}</p>
        <p>{this.isEven ? 'Even' : 'Odd'}</p>
        <button onClick={() => this.increment()}>+</button>
      </div>
    );
  }
}
```

### @Watch - Property Watching

```typescript
import { Component, Prop, Watch, h } from '@stencil/core';

@Component({
  tag: 'data-fetcher',
  shadow: true
})
export class DataFetcher {
  @Prop() userId: string;
  @State() userData: any = null;
  @State() loading: boolean = false;

  @Watch('userId')
  async userIdChanged(newValue: string, oldValue: string) {
    console.log(`User ID changed from ${oldValue} to ${newValue}`);
    await this.fetchUserData(newValue);
  }

  async fetchUserData(id: string) {
    this.loading = true;
    try {
      const response = await fetch(`/api/users/${id}`);
      this.userData = await response.json();
    } finally {
      this.loading = false;
    }
  }

  render() {
    if (this.loading) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        {this.userData && (
          <div>
            <h2>{this.userData.name}</h2>
            <p>{this.userData.email}</p>
          </div>
        )}
      </div>
    );
  }
}
```

### @Event - Custom Events

```typescript
import { Component, Event, EventEmitter, h } from '@stencil/core';

@Component({
  tag: 'custom-button',
  shadow: true
})
export class CustomButton {
  // Custom event
  @Event() buttonClicked: EventEmitter<{ count: number }>;

  // Composed event (bubbles through shadow DOM)
  @Event({
    eventName: 'customClick',
    composed: true,
    bubbles: true,
    cancelable: true
  }) customClickEvent: EventEmitter<string>;

  private clickCount = 0;

  handleClick() {
    this.clickCount++;
    
    // Emit events
    this.buttonClicked.emit({ count: this.clickCount });
    this.customClickEvent.emit('Button was clicked');
  }

  render() {
    return (
      <button onClick={() => this.handleClick()}>
        <slot>Click Me</slot>
      </button>
    );
  }
}
```

**Usage:**
```html
<custom-button onButtonClicked={(e) => console.log(e.detail.count)}>
  Custom Button
</custom-button>
```

### @Listen - Event Listening

```typescript
import { Component, Listen, h } from '@stencil/core';

@Component({
  tag: 'event-listener',
  shadow: true
})
export class EventListener {
  // Listen to events on host element
  @Listen('click')
  handleClick(event: MouseEvent) {
    console.log('Component clicked', event);
  }

  // Listen to window events
  @Listen('scroll', { target: 'window' })
  handleScroll(event: Event) {
    console.log('Window scrolled', event);
  }

  // Listen to document events
  @Listen('keydown', { target: 'document' })
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      console.log('Escape pressed');
    }
  }

  // Listen to events from child components
  @Listen('buttonClicked')
  handleButtonClicked(event: CustomEvent) {
    console.log('Custom button clicked:', event.detail);
  }

  // Capture phase
  @Listen('click', { capture: true })
  handleClickCapture(event: MouseEvent) {
    console.log('Click captured');
  }

  render() {
    return <div>Event Listener Component</div>;
  }
}
```

### @Element - Host Element Reference

```typescript
import { Component, Element, h } from '@stencil/core';

@Component({
  tag: 'element-ref',
  shadow: true
})
export class ElementRef {
  @Element() el: HTMLElement;

  componentDidLoad() {
    // Access host element
    console.log('Host element:', this.el);
    console.log('Tag name:', this.el.tagName);
    
    // Add class to host
    this.el.classList.add('loaded');
    
    // Query shadow DOM
    const button = this.el.shadowRoot.querySelector('button');
    console.log('Button:', button);
  }

  render() {
    return <button>Click me</button>;
  }
}
```

### @Method - Public Methods

```typescript
import { Component, Method, State, h } from '@stencil/core';

@Component({
  tag: 'modal-component',
  shadow: true
})
export class ModalComponent {
  @State() isOpen: boolean = false;

  @Method()
  async open() {
    this.isOpen = true;
  }

  @Method()
  async close() {
    this.isOpen = false;
  }

  @Method()
  async toggle() {
    this.isOpen = !this.isOpen;
  }

  render() {
    return (
      <div class={this.isOpen ? 'modal open' : 'modal'}>
        <div class="modal-content">
          <slot />
          <button onClick={() => this.close()}>Close</button>
        </div>
      </div>
    );
  }
}
```

**Usage:**
```javascript
const modal = document.querySelector('modal-component');
await modal.open();
await modal.close();
```

## JSX Templating

### Conditional Rendering

```typescript
import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'conditional-render',
  shadow: true
})
export class ConditionalRender {
  @Prop() isLoggedIn: boolean = false;
  @Prop() userRole: string = 'guest';

  render() {
    return (
      <div>
        {/* Ternary operator */}
        {this.isLoggedIn ? (
          <p>Welcome back!</p>
        ) : (
          <p>Please log in.</p>
        )}

        {/* Logical AND */}
        {this.userRole === 'admin' && <button>Admin Panel</button>}

        {/* Multiple conditions */}
        {this.userRole === 'admin' ? (
          <admin-panel />
        ) : this.userRole === 'moderator' ? (
          <moderator-panel />
        ) : (
          <user-panel />
        )}
      </div>
    );
  }
}
```

### Lists and Loops

```typescript
import { Component, Prop, h } from '@stencil/core';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

@Component({
  tag: 'todo-list',
  shadow: true
})
export class TodoList {
  @Prop() todos: Todo[] = [];

  render() {
    return (
      <ul>
        {this.todos.map(todo => (
          <li key={todo.id} class={todo.completed ? 'completed' : ''}>
            {todo.text}
          </li>
        ))}
      </ul>
    );
  }
}
```

### Event Handlers

```typescript
import { Component, State, h } from '@stencil/core';

@Component({
  tag: 'form-component',
  shadow: true
})
export class FormComponent {
  @State() inputValue: string = '';
  @State() selectValue: string = '';

  handleInput = (event: Event) => {
    this.inputValue = (event.target as HTMLInputElement).value;
  }

  handleSubmit = (event: Event) => {
    event.preventDefault();
    console.log('Form submitted:', this.inputValue);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.inputValue}
          onInput={this.handleInput}
        />
        
        <select onChange={(e) => this.selectValue = (e.target as HTMLSelectElement).value}>
          <option value="a">Option A</option>
          <option value="b">Option B</option>
        </select>

        <button type="submit">Submit</button>
      </form>
    );
  }
}
```

## Lifecycle Methods

```typescript
import { Component, h } from '@stencil/core';

@Component({
  tag: 'lifecycle-component',
  shadow: true
})
export class LifecycleComponent {
  // 1. Component is created
  constructor() {
    console.log('Constructor called');
  }

  // 2. Component will load (before first render)
  componentWillLoad() {
    console.log('Component will load');
    // Good for async data fetching
  }

  // 3. Component did load (after first render)
  componentDidLoad() {
    console.log('Component did load');
    // Good for DOM manipulation, starting animations
  }

  // 4. Component will update (before re-render)
  componentWillUpdate() {
    console.log('Component will update');
  }

  // 5. Component did update (after re-render)
  componentDidUpdate() {
    console.log('Component did update');
  }

  // 6. Component will render (before render)
  componentWillRender() {
    console.log('Component will render');
  }

  // 7. Component did render (after render, but before DOM update)
  componentDidRender() {
    console.log('Component did render');
  }

  // 8. Component disconnected from DOM
  disconnectedCallback() {
    console.log('Component disconnected');
    // Cleanup: remove event listeners, cancel timers
  }

  render() {
    return <div>Lifecycle Component</div>;
  }
}
```

## Styling

### Component Styles

```typescript
import { Component, h } from '@stencil/core';

@Component({
  tag: 'styled-component',
  styleUrl: 'styled-component.css',
  shadow: true
})
export class StyledComponent {
  render() {
    return (
      <div class="container">
        <h1 class="title">Title</h1>
        <p class="text">Content</p>
      </div>
    );
  }
}
```

**styled-component.css:**
```css
:host {
  display: block;
  padding: 16px;
}

:host(.large) {
  font-size: 20px;
}

.container {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
}

.title {
  color: #333;
  margin: 0 0 8px 0;
}
```

### Multiple Style Sheets

```typescript
@Component({
  tag: 'multi-style',
  styleUrls: ['multi-style.css', 'theme.css'],
  shadow: true
})
```

### Inline Styles

```typescript
@Component({
  tag: 'inline-styled',
  styles: `
    :host {
      display: block;
    }
    .button {
      background: blue;
      color: white;
    }
  `,
  shadow: true
})
```

### Dynamic Styles

```typescript
import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'dynamic-styled',
  shadow: true
})
export class DynamicStyled {
  @Prop() color: string = 'blue';
  @Prop() size: number = 16;

  render() {
    return (
      <div style={{
        color: this.color,
        fontSize: `${this.size}px`,
        padding: '10px'
      }}>
        Dynamic Styles
      </div>
    );
  }
}
```

### CSS Variables

```typescript
@Component({
  tag: 'themed-button',
  styles: `
    button {
      background: var(--button-bg, #007bff);
      color: var(--button-color, white);
      padding: var(--button-padding, 10px 20px);
      border: none;
      border-radius: 4px;
    }
  `,
  shadow: true
})
export class ThemedButton {
  render() {
    return <button><slot /></button>;
  }
}
```

## Slots

```typescript
import { Component, h } from '@stencil/core';

@Component({
  tag: 'card-component',
  styleUrl: 'card-component.css',
  shadow: true
})
export class CardComponent {
  render() {
    return (
      <div class="card">
        <header>
          <slot name="header">Default Header</slot>
        </header>
        <main>
          <slot>Default Content</slot>
        </main>
        <footer>
          <slot name="footer">Default Footer</slot>
        </footer>
      </div>
    );
  }
}
```

**Usage:**
```html
<card-component>
  <h2 slot="header">Custom Header</h2>
  <p>Main content</p>
  <button slot="footer">Action</button>
</card-component>
```

## Async Rendering

Stencil uses async rendering to batch DOM updates:

```typescript
import { Component, State, h } from '@stencil/core';

@Component({
  tag: 'async-component',
  shadow: true
})
export class AsyncComponent {
  @State() count: number = 0;

  async incrementMultiple() {
    // These updates are batched
    this.count++;
    this.count++;
    this.count++;
    // Component renders once with count = 3
  }

  render() {
    return <div>Count: {this.count}</div>;
  }
}
```

## Functional Components

```typescript
import { FunctionalComponent, h } from '@stencil/core';

interface GreetingProps {
  name: string;
  age?: number;
}

export const Greeting: FunctionalComponent<GreetingProps> = ({ name, age }) => {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      {age && <p>Age: {age}</p>}
    </div>
  );
};

// Usage in another component
@Component({
  tag: 'parent-component',
  shadow: true
})
export class ParentComponent {
  render() {
    return <Greeting name="Alice" age={30} />;
  }
}
```

## Advanced Features

### Lazy Loading

```typescript
// stencil.config.ts
import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'myapp',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader'
    }
  ],
  // Enable lazy loading
  bundles: [
    { components: ['my-component', 'related-component'] },
    { components: ['another-component'] }
  ]
};
```

### Pre-rendering / SSR

```typescript
// stencil.config.ts
export const config: Config = {
  outputTargets: [
    {
      type: 'www',
      serviceWorker: null,
      prerender: {
        crawlUrls: true,
        routes: [
          '/',
          '/page1',
          '/page2'
        ]
      }
    }
  ]
};
```

### Framework Integrations

```typescript
// stencil.config.ts
import { Config } from '@stencil/core';
import { reactOutputTarget } from '@stencil/react-output-target';
import { angularOutputTarget } from '@stencil/angular-output-target';
import { vueOutputTarget } from '@stencil/vue-output-target';

export const config: Config = {
  namespace: 'mylib',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader'
    },
    reactOutputTarget({
      componentCorePackage: 'my-lib',
      proxiesFile: '../my-lib-react/src/components.ts'
    }),
    angularOutputTarget({
      componentCorePackage: 'my-lib',
      directivesProxyFile: '../my-lib-angular/src/directives/proxies.ts'
    }),
    vueOutputTarget({
      componentCorePackage: 'my-lib',
      proxiesFile: '../my-lib-vue/src/components.ts'
    })
  ]
};
```

## Testing

```typescript
// my-component.spec.ts
import { newSpecPage } from '@stencil/core/testing';
import { MyComponent } from './my-component';

describe('my-component', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MyComponent],
      html: `<my-component></my-component>`,
    });
    expect(page.root).toEqualHtml(`
      <my-component>
        <mock:shadow-root>
          <div>
            Hello, World!
          </div>
        </mock:shadow-root>
      </my-component>
    `);
  });

  it('renders with values', async () => {
    const page = await newSpecPage({
      components: [MyComponent],
      html: `<my-component name="Alice"></my-component>`,
    });
    expect(page.root).toEqualHtml(`
      <my-component name="Alice">
        <mock:shadow-root>
          <div>
            Hello, Alice!
          </div>
        </mock:shadow-root>
      </my-component>
    `);
  });
});
```

### E2E Testing

```typescript
// my-component.e2e.ts
import { newE2EPage } from '@stencil/core/testing';

describe('my-component', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<my-component></my-component>');

    const element = await page.find('my-component');
    expect(element).toHaveClass('hydrated');
  });

  it('responds to click', async () => {
    const page = await newE2EPage();
    await page.setContent('<my-component></my-component>');

    const button = await page.find('my-component >>> button');
    await button.click();
    await page.waitForChanges();

    const count = await page.find('my-component >>> .count');
    expect(count.textContent).toBe('1');
  });
});
```

## Best Practices

1. **Use Shadow DOM for encapsulation**
2. **Keep components small and focused**
3. **Use TypeScript for type safety**
4. **Leverage lazy loading for better performance**
5. **Write tests for components**
6. **Use functional components for simple, stateless UI**
7. **Follow naming conventions** (kebab-case for tags)

## Resources

- [Official Stencil Documentation](https://stenciljs.com/)
- [Stencil GitHub](https://github.com/ionic-team/stencil)
- [Ionic Framework](https://ionicframework.com/) (built with Stencil)
- [Stencil Discord](https://chat.stenciljs.com/)
- [Awesome Stencil](https://github.com/mappmechanic/awesome-stenciljs)

## Comparison

| Feature | Stencil | Lit | React | Vue |
|---------|---------|-----|-------|-----|
| Output | Web Components | Web Components | Virtual DOM | Virtual DOM |
| Runtime | None | ~5KB | ~40KB | ~33KB |
| TypeScript | Built-in | Good | Excellent | Good |
| JSX | Yes | No | Yes | Optional |
| Learning Curve | Medium | Low | Medium | Medium |
| SSR/Pre-render | Yes | Via DSD | Yes | Yes |

Stencil is ideal for building design systems, component libraries, and reusable UI components that need to work across multiple frameworks.
