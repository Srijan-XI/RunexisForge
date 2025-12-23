/*
 * Question 14 (Advanced): DOM Manipulation
 * 
 * Write a JavaScript program that demonstrates:
 * - Selecting elements (querySelector, getElementById, etc.)
 * - Creating and modifying elements
 * - Adding/removing elements
 * - Modifying attributes and styles
 * - Working with classes
 * 
 * Learning objectives:
 * - Manipulate the Document Object Model
 * - Create dynamic web content
 * - Understand DOM API methods
 * 
 * Note: This example uses a simulated DOM for demonstration.
 * In a real browser, these methods work with actual HTML elements.
 */

console.log("=== DOM Manipulation Overview ===");

// Simulated DOM element class for demonstration
class DOMElement {
    constructor(tagName, id = null) {
        this.tagName = tagName;
        this.id = id;
        this.className = '';
        this.classList = new Set();
        this.style = {};
        this.innerHTML = '';
        this.textContent = '';
        this.attributes = {};
        this.children = [];
        this.parentElement = null;
        this.dataset = {};
    }
    
    setAttribute(name, value) {
        this.attributes[name] = value;
    }
    
    getAttribute(name) {
        return this.attributes[name];
    }
    
    appendChild(child) {
        this.children.push(child);
        child.parentElement = this;
        return child;
    }
    
    removeChild(child) {
        const index = this.children.indexOf(child);
        if (index > -1) {
            this.children.splice(index, 1);
            child.parentElement = null;
        }
    }
    
    remove() {
        if (this.parentElement) {
            this.parentElement.removeChild(this);
        }
    }
    
    toString() {
        return `<${this.tagName}${this.id ? ` id="${this.id}"` : ''}${this.className ? ` class="${this.className}"` : ''}>`;
    }
}

console.log("\n=== Selecting Elements ===");

/*
 * In a real browser:
 * 
 * // By ID
 * const element = document.getElementById('myId');
 * 
 * // By class
 * const elements = document.getElementsByClassName('myClass');
 * 
 * // By tag name
 * const divs = document.getElementsByTagName('div');
 * 
 * // Query selector (CSS selector)
 * const element = document.querySelector('.myClass');
 * const elements = document.querySelectorAll('div.container > p');
 * 
 * // More examples:
 * document.querySelector('#header');           // ID
 * document.querySelector('.nav-item');         // Class
 * document.querySelector('div');               // Tag
 * document.querySelector('[data-id="123"]');   // Attribute
 * document.querySelectorAll('.item');          // All matching
 */

// Simulated examples
const container = new DOMElement('div', 'container');
console.log("Selected container:", container.toString());

console.log("\n=== Creating Elements ===");

// Creating elements
const heading = new DOMElement('h1');
heading.textContent = "Welcome to DOM Manipulation";
console.log("Created heading:", heading.toString());
console.log("Text:", heading.textContent);

const paragraph = new DOMElement('p');
paragraph.innerHTML = "This is a <strong>paragraph</strong> with HTML.";
console.log("Created paragraph:", paragraph.toString());

const button = new DOMElement('button');
button.textContent = "Click Me";
button.setAttribute('type', 'button');
console.log("Created button:", button.toString());
console.log("Button type:", button.getAttribute('type'));

/*
 * In a real browser:
 * 
 * const div = document.createElement('div');
 * const text = document.createTextNode('Hello');
 * const fragment = document.createDocumentFragment();
 */

console.log("\n=== Modifying Content ===");

const contentDiv = new DOMElement('div');

// Setting text content (escapes HTML)
contentDiv.textContent = "Plain text <span>not parsed</span>";
console.log("textContent:", contentDiv.textContent);

// Setting HTML content (parses HTML)
contentDiv.innerHTML = "HTML text <span>parsed</span>";
console.log("innerHTML:", contentDiv.innerHTML);

/*
 * In a real browser:
 * 
 * element.textContent = 'Text only';
 * element.innerHTML = '<p>HTML content</p>';
 * element.innerText = 'Visible text only';
 * 
 * // Creating text nodes
 * const textNode = document.createTextNode('Some text');
 * element.appendChild(textNode);
 */

console.log("\n=== Modifying Attributes ===");

const link = new DOMElement('a');
link.setAttribute('href', 'https://example.com');
link.setAttribute('target', '_blank');
link.setAttribute('rel', 'noopener noreferrer');
link.textContent = "Visit Example";

console.log("Link attributes:");
console.log("  href:", link.getAttribute('href'));
console.log("  target:", link.getAttribute('target'));
console.log("  rel:", link.getAttribute('rel'));

// Data attributes
link.dataset.userId = '123';
link.dataset.action = 'view';
console.log("Data attributes:", link.dataset);

/*
 * In a real browser:
 * 
 * element.setAttribute('name', 'value');
 * element.getAttribute('name');
 * element.removeAttribute('name');
 * element.hasAttribute('name');
 * 
 * // Direct property access
 * link.href = 'https://example.com';
 * input.value = 'text';
 * img.src = 'image.jpg';
 * 
 * // Data attributes
 * element.dataset.userId = '123';
 * console.log(element.dataset.userId);
 */

console.log("\n=== Working with Classes ===");

const box = new DOMElement('div');

// classList methods
box.classList.add('box');
console.log("Classes after add:", Array.from(box.classList));

box.classList.add('active', 'highlighted');
console.log("Classes after multiple add:", Array.from(box.classList));

box.classList.remove('highlighted');
console.log("Classes after remove:", Array.from(box.classList));

// Toggle class
const hasActive = box.classList.has('active');
console.log("Has 'active' class:", hasActive);

if (box.classList.has('active')) {
    box.classList.remove('active');
} else {
    box.classList.add('active');
}
console.log("After toggle:", Array.from(box.classList));

/*
 * In a real browser:
 * 
 * element.classList.add('class-name');
 * element.classList.remove('class-name');
 * element.classList.toggle('class-name');
 * element.classList.contains('class-name');
 * element.classList.replace('old-class', 'new-class');
 * 
 * // className property (overwrites all classes)
 * element.className = 'class1 class2';
 */

console.log("\n=== Modifying Styles ===");

const styledDiv = new DOMElement('div');
styledDiv.style.backgroundColor = 'blue';
styledDiv.style.color = 'white';
styledDiv.style.padding = '20px';
styledDiv.style.fontSize = '16px';
styledDiv.style.borderRadius = '5px';

console.log("Inline styles:", styledDiv.style);

/*
 * In a real browser:
 * 
 * element.style.color = 'red';
 * element.style.backgroundColor = '#f0f0f0';
 * element.style.fontSize = '16px';
 * element.style.display = 'none';
 * 
 * // Get computed styles
 * const styles = window.getComputedStyle(element);
 * console.log(styles.color);
 * console.log(styles.fontSize);
 * 
 * // CSS custom properties
 * element.style.setProperty('--main-color', '#ff0000');
 * const color = element.style.getPropertyValue('--main-color');
 */

console.log("\n=== Adding/Removing Elements ===");

const list = new DOMElement('ul');

// Creating list items
for (let i = 1; i <= 3; i++) {
    const li = new DOMElement('li');
    li.textContent = `Item ${i}`;
    list.appendChild(li);
}

console.log("List children:", list.children.length);
console.log("First item:", list.children[0].textContent);

// Removing an element
const firstItem = list.children[0];
list.removeChild(firstItem);
console.log("After removing first:", list.children.length);

/*
 * In a real browser:
 * 
 * // Append child
 * parent.appendChild(child);
 * 
 * // Insert before
 * parent.insertBefore(newNode, referenceNode);
 * 
 * // Insert adjacent
 * element.insertAdjacentHTML('beforebegin', '<p>Before</p>');
 * element.insertAdjacentHTML('afterbegin', '<p>Start</p>');
 * element.insertAdjacentHTML('beforeend', '<p>End</p>');
 * element.insertAdjacentHTML('afterend', '<p>After</p>');
 * 
 * // Append/Prepend (modern)
 * parent.append(child1, child2, 'text');
 * parent.prepend(child);
 * 
 * // Remove
 * element.remove();
 * parent.removeChild(child);
 * 
 * // Replace
 * parent.replaceChild(newChild, oldChild);
 * element.replaceWith(newElement);
 */

console.log("\n=== Traversing the DOM ===");

const nav = new DOMElement('nav');
const ul = new DOMElement('ul');
const li1 = new DOMElement('li');
const li2 = new DOMElement('li');
const li3 = new DOMElement('li');

li1.textContent = "Home";
li2.textContent = "About";
li3.textContent = "Contact";

ul.appendChild(li1);
ul.appendChild(li2);
ul.appendChild(li3);
nav.appendChild(ul);

console.log("Navigation structure:");
console.log("  Parent of ul:", ul.parentElement?.tagName);
console.log("  Children of ul:", ul.children.length);
console.log("  First child:", ul.children[0].textContent);
console.log("  Last child:", ul.children[ul.children.length - 1].textContent);

/*
 * In a real browser:
 * 
 * // Parent/Child relationships
 * element.parentElement
 * element.parentNode
 * element.children           // HTMLCollection (elements only)
 * element.childNodes         // NodeList (includes text nodes)
 * element.firstChild
 * element.firstElementChild
 * element.lastChild
 * element.lastElementChild
 * 
 * // Siblings
 * element.nextSibling
 * element.nextElementSibling
 * element.previousSibling
 * element.previousElementSibling
 * 
 * // Closest ancestor matching selector
 * element.closest('.container');
 * 
 * // Check if contains
 * parent.contains(child);
 */

console.log("\n=== Practical Examples ===");

// Example 1: Dynamic list creation
function createTodoList(items) {
    const ul = new DOMElement('ul');
    ul.className = 'todo-list';
    
    items.forEach(item => {
        const li = new DOMElement('li');
        li.textContent = item;
        li.classList.add('todo-item');
        ul.appendChild(li);
    });
    
    return ul;
}

const todos = ["Buy groceries", "Finish homework", "Call mom"];
const todoList = createTodoList(todos);
console.log("Todo list created with", todoList.children.length, "items");

// Example 2: Building a card component
function createCard(title, content, imageUrl) {
    const card = new DOMElement('div');
    card.classList.add('card');
    
    if (imageUrl) {
        const img = new DOMElement('img');
        img.setAttribute('src', imageUrl);
        img.setAttribute('alt', title);
        card.appendChild(img);
    }
    
    const cardBody = new DOMElement('div');
    cardBody.classList.add('card-body');
    
    const heading = new DOMElement('h3');
    heading.textContent = title;
    cardBody.appendChild(heading);
    
    const text = new DOMElement('p');
    text.textContent = content;
    cardBody.appendChild(text);
    
    card.appendChild(cardBody);
    
    return card;
}

const card = createCard(
    "JavaScript DOM",
    "Learn to manipulate the Document Object Model",
    "image.jpg"
);
console.log("Card created:", card.toString());
console.log("Card children:", card.children.length);

// Example 3: Table generation
function createTable(data) {
    const table = new DOMElement('table');
    
    // Header
    const thead = new DOMElement('thead');
    const headerRow = new DOMElement('tr');
    
    Object.keys(data[0]).forEach(key => {
        const th = new DOMElement('th');
        th.textContent = key;
        headerRow.appendChild(th);
    });
    
    thead.appendChild(headerRow);
    table.appendChild(thead);
    
    // Body
    const tbody = new DOMElement('tbody');
    
    data.forEach(row => {
        const tr = new DOMElement('tr');
        
        Object.values(row).forEach(value => {
            const td = new DOMElement('td');
            td.textContent = value;
            tr.appendChild(td);
        });
        
        tbody.appendChild(tr);
    });
    
    table.appendChild(tbody);
    
    return table;
}

const tableData = [
    { name: "Alice", age: 30, city: "New York" },
    { name: "Bob", age: 25, city: "London" },
    { name: "Charlie", age: 35, city: "Paris" }
];

const table = createTable(tableData);
console.log("Table created");
console.log("Header columns:", table.children[0].children[0].children.length);
console.log("Body rows:", table.children[1].children.length);

/*
 * Real Browser Usage:
 * 
 * // HTML:
 * // <div id="app"></div>
 * 
 * const app = document.getElementById('app');
 * 
 * // Create heading
 * const h1 = document.createElement('h1');
 * h1.textContent = 'My App';
 * app.appendChild(h1);
 * 
 * // Create button with event
 * const button = document.createElement('button');
 * button.textContent = 'Click Me';
 * button.addEventListener('click', () => {
 *     alert('Button clicked!');
 * });
 * app.appendChild(button);
 * 
 * // Create list
 * const ul = document.createElement('ul');
 * ['Item 1', 'Item 2', 'Item 3'].forEach(text => {
 *     const li = document.createElement('li');
 *     li.textContent = text;
 *     ul.appendChild(li);
 * });
 * app.appendChild(ul);
 */

console.log("\n=== Performance Tips ===");

/*
 * 1. Document Fragments (for multiple insertions)
 * const fragment = document.createDocumentFragment();
 * for (let i = 0; i < 100; i++) {
 *     const div = document.createElement('div');
 *     fragment.appendChild(div);
 * }
 * container.appendChild(fragment);  // Single reflow
 * 
 * 2. Clone nodes instead of creating new ones
 * const template = document.querySelector('#template');
 * const clone = template.content.cloneNode(true);
 * 
 * 3. Use innerHTML for large HTML structures
 * container.innerHTML = `<div class="card">...</div>`.repeat(100);
 * 
 * 4. Cache DOM references
 * const element = document.querySelector('.expensive-selector');
 * // Use element multiple times
 * 
 * 5. Batch style changes
 * element.style.cssText = 'color: red; font-size: 16px; padding: 10px;';
 * 
 * 6. Use CSS classes instead of inline styles
 * element.classList.add('styled');  // Better than setting style properties
 */

console.log("Performance tips documented");

/*
 * Sample Output:
 * === DOM Manipulation Overview ===
 * 
 * === Selecting Elements ===
 * Selected container: <div id="container">
 * 
 * === Creating Elements ===
 * Created heading: <h1>
 * Text: Welcome to DOM Manipulation
 * Created paragraph: <p>
 * Created button: <button>
 * Button type: button
 * 
 * [Additional output continues...]
 */
