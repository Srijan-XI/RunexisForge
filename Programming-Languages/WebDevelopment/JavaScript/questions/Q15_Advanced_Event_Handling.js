/*
 * Question 15 (Advanced): Event Handling
 * 
 * Write a JavaScript program that demonstrates:
 * - Adding event listeners
 * - Event object properties
 * - Event propagation (bubbling and capturing)
 * - Event delegation
 * - Preventing default behavior
 * - Custom events
 * 
 * Learning objectives:
 * - Handle user interactions
 * - Understand event flow in the DOM
 * - Use event delegation for performance
 * 
 * Note: This example uses simulated events for demonstration.
 * In a real browser, these work with actual user interactions.
 */

console.log("=== Event Handling Overview ===");

// Simulated Event class
class SimulatedEvent {
    constructor(type, target, bubbles = true) {
        this.type = type;
        this.target = target;
        this.currentTarget = target;
        this.bubbles = bubbles;
        this.defaultPrevented = false;
        this.propagationStopped = false;
        this.immediatePropagationStopped = false;
        this.timeStamp = Date.now();
    }
    
    preventDefault() {
        this.defaultPrevented = true;
    }
    
    stopPropagation() {
        this.propagationStopped = true;
    }
    
    stopImmediatePropagation() {
        this.immediatePropagationStopped = true;
        this.propagationStopped = true;
    }
}

// Simulated Element with event handling
class EventElement {
    constructor(tagName, id = null) {
        this.tagName = tagName;
        this.id = id;
        this.listeners = new Map();
        this.children = [];
        this.parent = null;
    }
    
    addEventListener(type, handler, options = false) {
        if (!this.listeners.has(type)) {
            this.listeners.set(type, []);
        }
        
        const useCapture = typeof options === 'boolean' ? options : options.capture || false;
        const once = typeof options === 'object' ? options.once || false : false;
        
        this.listeners.get(type).push({ handler, useCapture, once });
        console.log(`Added '${type}' listener to ${this.tagName}${this.id ? `#${this.id}` : ''}`);
    }
    
    removeEventListener(type, handler) {
        if (this.listeners.has(type)) {
            const listeners = this.listeners.get(type);
            const index = listeners.findIndex(l => l.handler === handler);
            if (index > -1) {
                listeners.splice(index, 1);
                console.log(`Removed '${type}' listener from ${this.tagName}`);
            }
        }
    }
    
    dispatchEvent(event) {
        console.log(`\nDispatching '${event.type}' event on ${this.tagName}${this.id ? `#${this.id}` : ''}`);
        
        // Capture phase
        const path = this.getEventPath();
        for (let i = path.length - 1; i >= 0; i--) {
            if (event.immediatePropagationStopped) break;
            
            const element = path[i];
            event.currentTarget = element;
            
            if (element.listeners.has(event.type)) {
                element.listeners.get(event.type)
                    .filter(l => l.useCapture)
                    .forEach(({ handler, once }) => {
                        handler.call(element, event);
                        if (once) element.removeEventListener(event.type, handler);
                    });
            }
        }
        
        // Bubble phase
        if (event.bubbles && !event.propagationStopped) {
            for (let i = 0; i < path.length; i++) {
                if (event.immediatePropagationStopped) break;
                
                const element = path[i];
                event.currentTarget = element;
                
                if (element.listeners.has(event.type)) {
                    element.listeners.get(event.type)
                        .filter(l => !l.useCapture)
                        .forEach(({ handler, once }) => {
                            handler.call(element, event);
                            if (once) element.removeEventListener(event.type, handler);
                        });
                }
                
                if (event.propagationStopped) break;
            }
        }
    }
    
    getEventPath() {
        const path = [this];
        let current = this.parent;
        while (current) {
            path.push(current);
            current = current.parent;
        }
        return path;
    }
    
    appendChild(child) {
        this.children.push(child);
        child.parent = this;
    }
}

console.log("\n=== Basic Event Listeners ===");

const button = new EventElement('button', 'myButton');

// Adding event listener
button.addEventListener('click', function(event) {
    console.log(`Button clicked! Event type: ${event.type}`);
    console.log(`Target: ${event.target.tagName}`);
});

// Trigger the event
button.dispatchEvent(new SimulatedEvent('click', button));

/*
 * In a real browser:
 * 
 * const button = document.getElementById('myButton');
 * 
 * button.addEventListener('click', function(event) {
 *     console.log('Button clicked!');
 *     console.log('Event:', event);
 * });
 * 
 * // Or using arrow function
 * button.addEventListener('click', (e) => {
 *     console.log('Clicked!', e);
 * });
 * 
 * // Remove listener
 * function handleClick(e) {
 *     console.log('Clicked');
 * }
 * button.addEventListener('click', handleClick);
 * button.removeEventListener('click', handleClick);
 */

console.log("\n=== Event Object Properties ===");

const link = new EventElement('a', 'myLink');

link.addEventListener('click', function(event) {
    console.log('Event properties:');
    console.log('  type:', event.type);
    console.log('  target:', event.target.tagName);
    console.log('  currentTarget:', event.currentTarget.tagName);
    console.log('  timeStamp:', event.timeStamp);
    console.log('  defaultPrevented:', event.defaultPrevented);
});

link.dispatchEvent(new SimulatedEvent('click', link));

/*
 * In a real browser:
 * 
 * element.addEventListener('click', (e) => {
 *     console.log('type:', e.type);              // 'click'
 *     console.log('target:', e.target);          // Element clicked
 *     console.log('currentTarget:', e.currentTarget);  // Element with listener
 *     console.log('clientX:', e.clientX);        // Mouse X position
 *     console.log('clientY:', e.clientY);        // Mouse Y position
 *     console.log('key:', e.key);                // For keyboard events
 *     console.log('shiftKey:', e.shiftKey);      // Was Shift pressed?
 *     console.log('ctrlKey:', e.ctrlKey);        // Was Ctrl pressed?
 * });
 */

console.log("\n=== Event Propagation (Bubbling) ===");

const outer = new EventElement('div', 'outer');
const middle = new EventElement('div', 'middle');
const inner = new EventElement('button', 'inner');

outer.appendChild(middle);
middle.appendChild(inner);

outer.addEventListener('click', () => {
    console.log('Outer div clicked (bubble phase)');
});

middle.addEventListener('click', () => {
    console.log('Middle div clicked (bubble phase)');
});

inner.addEventListener('click', () => {
    console.log('Inner button clicked (bubble phase)');
});

console.log('\nClicking inner button:');
inner.dispatchEvent(new SimulatedEvent('click', inner));

console.log("\n=== Event Capturing ===");

const outer2 = new EventElement('div', 'outer2');
const middle2 = new EventElement('div', 'middle2');
const inner2 = new EventElement('button', 'inner2');

outer2.appendChild(middle2);
middle2.appendChild(inner2);

outer2.addEventListener('click', () => {
    console.log('Outer div (capture phase)');
}, true);  // true = use capture

middle2.addEventListener('click', () => {
    console.log('Middle div (capture phase)');
}, true);

inner2.addEventListener('click', () => {
    console.log('Inner button (bubble phase)');
}, false);

console.log('\nClicking with capture:');
inner2.dispatchEvent(new SimulatedEvent('click', inner2));

console.log("\n=== Stopping Propagation ===");

const parent = new EventElement('div', 'parent');
const child = new EventElement('button', 'child');
parent.appendChild(child);

parent.addEventListener('click', () => {
    console.log('Parent clicked');
});

child.addEventListener('click', (event) => {
    console.log('Child clicked - stopping propagation');
    event.stopPropagation();
});

console.log('\nClicking child (propagation stopped):');
child.dispatchEvent(new SimulatedEvent('click', child));

console.log("\n=== Preventing Default Behavior ===");

const form = new EventElement('form', 'myForm');

form.addEventListener('submit', (event) => {
    console.log('Form submitted');
    event.preventDefault();
    console.log('Default prevented:', event.defaultPrevented);
    console.log('(Form would normally reload page)');
});

form.dispatchEvent(new SimulatedEvent('submit', form));

/*
 * In a real browser:
 * 
 * // Prevent link navigation
 * link.addEventListener('click', (e) => {
 *     e.preventDefault();
 *     console.log('Link click prevented');
 * });
 * 
 * // Prevent form submission
 * form.addEventListener('submit', (e) => {
 *     e.preventDefault();
 *     // Handle form with AJAX instead
 * });
 * 
 * // Prevent context menu
 * element.addEventListener('contextmenu', (e) => {
 *     e.preventDefault();
 * });
 */

console.log("\n=== Event Delegation ===");

const list = new EventElement('ul', 'list');

// Add listener to parent instead of each child
list.addEventListener('click', (event) => {
    if (event.target.tagName === 'LI') {
        console.log(`List item clicked: ${event.target.id}`);
    }
});

// Simulate clicking different items
const item1 = new EventElement('li', 'item1');
const item2 = new EventElement('li', 'item2');
const item3 = new EventElement('li', 'item3');

list.appendChild(item1);
list.appendChild(item2);
list.appendChild(item3);

console.log('\nClicking items (delegation):');
item1.dispatchEvent(new SimulatedEvent('click', item1));
item2.dispatchEvent(new SimulatedEvent('click', item2));

/*
 * In a real browser:
 * 
 * // Instead of this (inefficient):
 * document.querySelectorAll('li').forEach(li => {
 *     li.addEventListener('click', handleClick);
 * });
 * 
 * // Do this (efficient):
 * document.getElementById('list').addEventListener('click', (e) => {
 *     if (e.target.tagName === 'LI') {
 *         handleClick(e);
 *     }
 * });
 * 
 * // Works for dynamically added elements too!
 */

console.log("\n=== Common Event Types ===");

/*
 * Mouse Events:
 * - click: Element clicked
 * - dblclick: Element double-clicked
 * - mousedown: Mouse button pressed
 * - mouseup: Mouse button released
 * - mousemove: Mouse moved
 * - mouseenter: Mouse enters element (no bubbling)
 * - mouseleave: Mouse leaves element (no bubbling)
 * - mouseover: Mouse over element (bubbles)
 * - mouseout: Mouse out of element (bubbles)
 * 
 * Keyboard Events:
 * - keydown: Key pressed
 * - keyup: Key released
 * - keypress: Key pressed (deprecated)
 * 
 * Form Events:
 * - submit: Form submitted
 * - change: Input value changed (after blur)
 * - input: Input value changing (real-time)
 * - focus: Element focused
 * - blur: Element lost focus
 * 
 * Document Events:
 * - DOMContentLoaded: HTML parsed
 * - load: Page fully loaded
 * - unload: Page unloading
 * - resize: Window resized
 * - scroll: Element scrolled
 */

console.log("Event types documented");

console.log("\n=== Event Options ===");

const optButton = new EventElement('button', 'optButton');

// once: Remove listener after first trigger
optButton.addEventListener('click', () => {
    console.log('This will only fire once');
}, { once: true });

optButton.dispatchEvent(new SimulatedEvent('click', optButton));
console.log('Second click (listener removed):');
optButton.dispatchEvent(new SimulatedEvent('click', optButton));

/*
 * In a real browser:
 * 
 * element.addEventListener('click', handler, {
 *     once: true,      // Remove after first trigger
 *     capture: true,   // Use capture phase
 *     passive: true    // Won't call preventDefault()
 * });
 */

console.log("\n=== Custom Events ===");

const customElement = new EventElement('div', 'custom');

// Listen for custom event
customElement.addEventListener('customEvent', (event) => {
    console.log('Custom event triggered!');
    console.log('Event type:', event.type);
});

// Dispatch custom event
customElement.dispatchEvent(new SimulatedEvent('customEvent', customElement));

/*
 * In a real browser:
 * 
 * // Create custom event
 * const event = new CustomEvent('myEvent', {
 *     detail: { message: 'Hello', value: 42 },
 *     bubbles: true,
 *     cancelable: true
 * });
 * 
 * // Listen for it
 * element.addEventListener('myEvent', (e) => {
 *     console.log(e.detail.message);  // "Hello"
 *     console.log(e.detail.value);    // 42
 * });
 * 
 * // Dispatch it
 * element.dispatchEvent(event);
 */

console.log("\n=== Practical Examples ===");

// Example 1: Form validation
console.log('\nForm Validation:');

const formExample = new EventElement('form');
formExample.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log('Validating form...');
    console.log('✓ Validation passed');
    console.log('✓ Form submitted via AJAX');
});

formExample.dispatchEvent(new SimulatedEvent('submit', formExample));

// Example 2: Keyboard shortcuts
console.log('\nKeyboard Shortcuts:');

/*
 * document.addEventListener('keydown', (e) => {
 *     if (e.ctrlKey && e.key === 's') {
 *         e.preventDefault();
 *         console.log('Save shortcut triggered');
 *         saveDocument();
 *     }
 *     
 *     if (e.key === 'Escape') {
 *         closeModal();
 *     }
 * });
 */

console.log('Keyboard shortcuts documented');

// Example 3: Debouncing events
console.log('\nDebouncing:');

function debounce(func, delay) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

const debouncedSearch = debounce((query) => {
    console.log('Searching for:', query);
}, 300);

// Simulate rapid input
console.log('Typing...');
debouncedSearch('a');
debouncedSearch('ap');
debouncedSearch('app');
console.log('(Only last search will execute after 300ms)');

/*
 * In a real browser:
 * 
 * const searchInput = document.getElementById('search');
 * searchInput.addEventListener('input', debounce((e) => {
 *     performSearch(e.target.value);
 * }, 300));
 */

// Example 4: Event delegation with dynamic content
console.log('\nDynamic Content:');

const todoList = new EventElement('ul', 'todoList');

todoList.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
        console.log(`Delete button clicked for: ${event.target.id}`);
    }
});

// Simulate adding new todos dynamically
const newTodo = new EventElement('li');
const deleteBtn = new EventElement('button', 'todo-1');
newTodo.appendChild(deleteBtn);
todoList.appendChild(newTodo);

console.log('Clicking dynamically added button:');
deleteBtn.dispatchEvent(new SimulatedEvent('click', deleteBtn));

/*
 * Sample Output:
 * === Event Handling Overview ===
 * 
 * === Basic Event Listeners ===
 * Added 'click' listener to button#myButton
 * 
 * Dispatching 'click' event on button#myButton
 * Button clicked! Event type: click
 * Target: button
 * 
 * [Additional output continues...]
 */
