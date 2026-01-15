# Web Components

## Overview
Web Components are a suite of native browser APIs that allow developers to create reusable, encapsulated custom HTML elements without requiring any framework. They represent a web standard for building modular, framework-agnostic UI components.

## Core Technologies

### 1. Custom Elements
Define your own HTML tags with custom behavior.

```javascript
class MyButton extends HTMLElement {
  constructor() {
    super();
    this.addEventListener('click', () => {
      console.log('Custom button clicked!');
    });
  }

  connectedCallback() {
    this.innerHTML = `<button>${this.getAttribute('label')}</button>`;
  }
}

customElements.define('my-button', MyButton);
```

**Usage:**
```html
<my-button label="Click me"></my-button>
```

### 2. Shadow DOM
Provides encapsulation for styles and markup, preventing CSS and JavaScript from leaking in or out.

```javascript
class ShadowCard extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    
    shadow.innerHTML = `
      <style>
        :host {
          display: block;
          border: 1px solid #ccc;
          border-radius: 8px;
          padding: 16px;
        }
        .title {
          font-size: 20px;
          font-weight: bold;
          color: #333;
        }
      </style>
      <div class="card">
        <div class="title"><slot name="title"></slot></div>
        <div class="content"><slot></slot></div>
      </div>
    `;
  }
}

customElements.define('shadow-card', ShadowCard);
```

**Usage:**
```html
<shadow-card>
  <span slot="title">Card Title</span>
  <p>This is the card content.</p>
</shadow-card>
```

### 3. HTML Templates
Define reusable markup that won't be rendered until activated.

```html
<template id="user-card-template">
  <style>
    .user-card {
      border: 1px solid #ddd;
      padding: 10px;
      margin: 10px;
    }
  </style>
  <div class="user-card">
    <h3 class="name"></h3>
    <p class="email"></p>
  </div>
</template>

<script>
class UserCard extends HTMLElement {
  constructor() {
    super();
    const template = document.getElementById('user-card-template');
    const content = template.content.cloneNode(true);
    
    this.attachShadow({ mode: 'open' }).appendChild(content);
  }

  set user(data) {
    this.shadowRoot.querySelector('.name').textContent = data.name;
    this.shadowRoot.querySelector('.email').textContent = data.email;
  }
}

customElements.define('user-card', UserCard);
</script>
```

### 4. ES Modules
Native JavaScript modules for organizing and importing component code.

```javascript
// counter-component.js
export class CounterComponent extends HTMLElement {
  constructor() {
    super();
    this.count = 0;
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.shadowRoot.querySelector('button').addEventListener('click', () => {
      this.count++;
      this.render();
    });
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        button { padding: 10px 20px; font-size: 16px; }
        .count { margin: 10px; font-size: 20px; }
      </style>
      <div class="count">Count: ${this.count}</div>
      <button>Increment</button>
    `;
  }
}

customElements.define('counter-component', CounterComponent);
```

**Usage:**
```html
<script type="module">
  import './counter-component.js';
</script>
<counter-component></counter-component>
```

## Lifecycle Callbacks

Web Components provide several lifecycle hooks:

```javascript
class LifecycleComponent extends HTMLElement {
  constructor() {
    super();
    console.log('Component created');
  }

  // Called when element is inserted into DOM
  connectedCallback() {
    console.log('Component connected to DOM');
  }

  // Called when element is removed from DOM
  disconnectedCallback() {
    console.log('Component removed from DOM');
  }

  // Called when an observed attribute changes
  attributeChangedCallback(name, oldValue, newValue) {
    console.log(`Attribute ${name} changed from ${oldValue} to ${newValue}`);
  }

  // Called when element is moved to a new document
  adoptedCallback() {
    console.log('Component moved to new document');
  }

  // Specify which attributes to observe
  static get observedAttributes() {
    return ['title', 'count'];
  }
}

customElements.define('lifecycle-component', LifecycleComponent);
```

## Advanced Patterns

### Props and State Management

```javascript
class TodoList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._todos = [];
  }

  connectedCallback() {
    this.render();
  }

  get todos() {
    return this._todos;
  }

  set todos(value) {
    this._todos = value;
    this.render();
  }

  addTodo(text) {
    this._todos.push({ id: Date.now(), text, completed: false });
    this.render();
  }

  toggleTodo(id) {
    const todo = this._todos.find(t => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      this.render();
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .todo { padding: 8px; cursor: pointer; }
        .completed { text-decoration: line-through; color: #999; }
      </style>
      <div class="todo-list">
        ${this._todos.map(todo => `
          <div class="todo ${todo.completed ? 'completed' : ''}" 
               data-id="${todo.id}">
            ${todo.text}
          </div>
        `).join('')}
      </div>
      <input type="text" id="new-todo" placeholder="Add new todo">
      <button id="add-btn">Add</button>
    `;

    this.attachEventListeners();
  }

  attachEventListeners() {
    this.shadowRoot.querySelectorAll('.todo').forEach(el => {
      el.addEventListener('click', () => {
        this.toggleTodo(parseInt(el.dataset.id));
      });
    });

    this.shadowRoot.getElementById('add-btn').addEventListener('click', () => {
      const input = this.shadowRoot.getElementById('new-todo');
      if (input.value.trim()) {
        this.addTodo(input.value);
        input.value = '';
      }
    });
  }
}

customElements.define('todo-list', TodoList);
```

### Slots and Composition

```javascript
class TabsComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.currentTab = 0;
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        .tabs { display: flex; border-bottom: 2px solid #ccc; }
        .tab { padding: 10px 20px; cursor: pointer; }
        .tab.active { border-bottom: 2px solid blue; }
        .panels ::slotted(*) { display: none; }
        .panels ::slotted(.active) { display: block; }
      </style>
      <div class="tabs">
        <slot name="tab"></slot>
      </div>
      <div class="panels">
        <slot name="panel"></slot>
      </div>
    `;

    this.setupTabs();
  }

  setupTabs() {
    const tabs = this.querySelectorAll('[slot="tab"]');
    const panels = this.querySelectorAll('[slot="panel"]');

    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => this.selectTab(index));
    });

    this.selectTab(0);
  }

  selectTab(index) {
    const tabs = this.querySelectorAll('[slot="tab"]');
    const panels = this.querySelectorAll('[slot="panel"]');

    tabs.forEach((tab, i) => {
      tab.classList.toggle('active', i === index);
    });

    panels.forEach((panel, i) => {
      panel.classList.toggle('active', i === index);
    });

    this.currentTab = index;
  }
}

customElements.define('tabs-component', TabsComponent);
```

**Usage:**
```html
<tabs-component>
  <div slot="tab">Tab 1</div>
  <div slot="tab">Tab 2</div>
  <div slot="tab">Tab 3</div>
  <div slot="panel">Content 1</div>
  <div slot="panel">Content 2</div>
  <div slot="panel">Content 3</div>
</tabs-component>
```

## Styling Strategies

### :host Selector
```css
:host {
  display: block;
  border: 1px solid #ccc;
}

:host([disabled]) {
  opacity: 0.5;
  pointer-events: none;
}

:host(:hover) {
  border-color: blue;
}
```

### CSS Custom Properties
```javascript
class ThemedButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        button {
          background: var(--button-bg, #007bff);
          color: var(--button-color, white);
          border: none;
          padding: var(--button-padding, 10px 20px);
          border-radius: var(--button-radius, 4px);
          cursor: pointer;
        }
        button:hover {
          background: var(--button-hover-bg, #0056b3);
        }
      </style>
      <button><slot></slot></button>
    `;
  }
}

customElements.define('themed-button', ThemedButton);
```

**Usage:**
```html
<style>
  themed-button {
    --button-bg: #28a745;
    --button-hover-bg: #218838;
    --button-padding: 12px 24px;
    --button-radius: 8px;
  }
</style>
<themed-button>Custom Styled Button</themed-button>
```

## Form Integration

```javascript
class CustomInput extends HTMLElement {
  static formAssociated = true;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._internals = this.attachInternals();
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        input {
          width: 100%;
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        :host([invalid]) input {
          border-color: red;
        }
      </style>
      <input type="text" />
    `;

    const input = this.shadowRoot.querySelector('input');
    input.addEventListener('input', (e) => {
      this._internals.setFormValue(e.target.value);
      this.validate(e.target.value);
    });
  }

  validate(value) {
    if (this.hasAttribute('required') && !value) {
      this._internals.setValidity(
        { valueMissing: true },
        'This field is required'
      );
      this.setAttribute('invalid', '');
    } else {
      this._internals.setValidity({});
      this.removeAttribute('invalid');
    }
  }

  get value() {
    return this.shadowRoot.querySelector('input').value;
  }

  set value(val) {
    this.shadowRoot.querySelector('input').value = val;
  }
}

customElements.define('custom-input', CustomInput);
```

## Browser Support

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| Custom Elements | 54+ | 63+ | 10.1+ | 79+ |
| Shadow DOM | 53+ | 63+ | 10+ | 79+ |
| HTML Templates | 26+ | 22+ | 8+ | 13+ |
| ES Modules | 61+ | 60+ | 10.1+ | 16+ |

## Best Practices

1. **Always use Shadow DOM for encapsulation**
   ```javascript
   constructor() {
     super();
     this.attachShadow({ mode: 'open' }); // Use Shadow DOM
   }
   ```

2. **Define observed attributes**
   ```javascript
   static get observedAttributes() {
     return ['title', 'disabled', 'value'];
   }
   ```

3. **Clean up event listeners**
   ```javascript
   disconnectedCallback() {
     this.removeEventListener('click', this.handleClick);
   }
   ```

4. **Use semantic HTML inside components**
   ```javascript
   render() {
     this.shadowRoot.innerHTML = `
       <article>
         <header><h2>Title</h2></header>
         <main><slot></slot></main>
       </article>
     `;
   }
   ```

5. **Provide fallback content for slots**
   ```html
   <slot>Default content if nothing is provided</slot>
   ```

## Polyfills

For older browsers, use the webcomponents.js polyfills:

```html
<script src="https://unpkg.com/@webcomponents/webcomponentsjs@2.8.0/webcomponents-loader.js"></script>
```

## Tools and Libraries

- **Lit** - Lightweight library for building Web Components
- **Stencil** - Compiler for generating Web Components
- **FAST** - Microsoft's Web Component library
- **Shoelace** - Component library built with Web Components
- **Vaadin** - Enterprise Web Components

## Framework Integration

### React
```javascript
import { createComponent } from '@lit-labs/react';
import { MyElement } from './my-element.js';

export const MyReactComponent = createComponent({
  tagName: 'my-element',
  elementClass: MyElement,
  react: React
});
```

### Vue
```vue
<template>
  <my-element :count="count" @change="handleChange"></my-element>
</template>

<script>
export default {
  data() {
    return { count: 0 };
  },
  methods: {
    handleChange(e) {
      this.count = e.detail.value;
    }
  }
};
</script>
```

### Angular
```typescript
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
```

## Resources

- [MDN Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components)
- [web.dev Web Components](https://web.dev/articles/web-components)
- [webcomponents.org](https://www.webcomponents.org/)
- [Open Web Components](https://open-wc.org/)
- [Custom Elements Everywhere](https://custom-elements-everywhere.com/)

## Example: Complete Component

```javascript
// notification-toast.js
class NotificationToast extends HTMLElement {
  static get observedAttributes() {
    return ['type', 'message', 'duration'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.autoHide();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  render() {
    const type = this.getAttribute('type') || 'info';
    const message = this.getAttribute('message') || '';

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          position: fixed;
          top: 20px;
          right: 20px;
          min-width: 250px;
          padding: 16px;
          border-radius: 4px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
          animation: slideIn 0.3s ease-out;
        }
        :host(.info) { background: #2196F3; color: white; }
        :host(.success) { background: #4CAF50; color: white; }
        :host(.warning) { background: #FF9800; color: white; }
        :host(.error) { background: #F44336; color: white; }
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .close {
          float: right;
          cursor: pointer;
          font-weight: bold;
        }
      </style>
      <span class="close" aria-label="Close">×</span>
      <div class="message">${message}</div>
    `;

    this.className = type;
    this.shadowRoot.querySelector('.close').addEventListener('click', () => {
      this.remove();
    });
  }

  autoHide() {
    const duration = parseInt(this.getAttribute('duration')) || 3000;
    setTimeout(() => this.remove(), duration);
  }
}

customElements.define('notification-toast', NotificationToast);
```

**Usage:**
```html
<notification-toast 
  type="success" 
  message="Operation completed successfully!" 
  duration="5000">
</notification-toast>

<script>
// Programmatic creation
const toast = document.createElement('notification-toast');
toast.setAttribute('type', 'error');
toast.setAttribute('message', 'Something went wrong!');
document.body.appendChild(toast);
</script>
```

## Conclusion

Web Components provide a powerful, standards-based approach to building reusable UI components that work across all modern frameworks and vanilla JavaScript. They offer true encapsulation, interoperability, and longevity as they're built on web platform APIs rather than framework-specific implementations.
