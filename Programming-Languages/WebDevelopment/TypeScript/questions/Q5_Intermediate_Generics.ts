// Question 5 (Intermediate): Generics
// Create generic functions and classes that work with multiple types.
// Build a generic data storage class that can store any type of data.

// Solution:

// Generic function - works with any type
function identity<T>(arg: T): T {
  return arg;
}

// Usage with different types
const str = identity<string>("Hello");
const num = identity<number>(42);
const bool = identity<boolean>(true);

console.log(str, num, bool);

// Generic function with array
function getFirstElement<T>(arr: T[]): T | undefined {
  return arr.length > 0 ? arr[0] : undefined;
}

const firstNumber = getFirstElement<number>([1, 2, 3]);  // 1
const firstName = getFirstElement<string>(["Alice", "Bob"]);  // "Alice"

// Generic interface
interface Pair<T, U> {
  first: T;
  second: U;
}

const pair1: Pair<string, number> = { first: "age", second: 30 };
const pair2: Pair<number, boolean> = { first: 1, second: true };

// Generic class - Data Store
class DataStore<T> {
  private items: T[] = [];

  // Add item
  add(item: T): void {
    this.items.push(item);
  }

  // Get all items
  getAll(): T[] {
    return [...this.items];
  }

  // Find item by predicate
  find(predicate: (item: T) => boolean): T | undefined {
    return this.items.find(predicate);
  }

  // Filter items
  filter(predicate: (item: T) => boolean): T[] {
    return this.items.filter(predicate);
  }

  // Remove item
  remove(predicate: (item: T) => boolean): boolean {
    const index = this.items.findIndex(predicate);
    if (index !== -1) {
      this.items.splice(index, 1);
      return true;
    }
    return false;
  }

  // Get count
  count(): number {
    return this.items.length;
  }
}

// Using DataStore with different types
interface Product {
  id: number;
  name: string;
  price: number;
}

const productStore = new DataStore<Product>();
productStore.add({ id: 1, name: "Laptop", price: 999 });
productStore.add({ id: 2, name: "Mouse", price: 25 });
productStore.add({ id: 3, name: "Keyboard", price: 75 });

console.log("All products:", productStore.getAll());
console.log("Product count:", productStore.count());

const expensive = productStore.filter(p => p.price > 50);
console.log("Expensive products:", expensive);

const laptop = productStore.find(p => p.id === 1);
console.log("Found laptop:", laptop);

// Generic constraints
interface HasId {
  id: number;
}

function findById<T extends HasId>(items: T[], id: number): T | undefined {
  return items.find(item => item.id === id);
}

const products: Product[] = [
  { id: 1, name: "Laptop", price: 999 },
  { id: 2, name: "Mouse", price: 25 }
];

const product = findById(products, 1);
console.log("Product with ID 1:", product);

// Multiple type parameters
class KeyValueStore<K, V> {
  private store = new Map<K, V>();

  set(key: K, value: V): void {
    this.store.set(key, value);
  }

  get(key: K): V | undefined {
    return this.store.get(key);
  }

  has(key: K): boolean {
    return this.store.has(key);
  }

  delete(key: K): boolean {
    return this.store.delete(key);
  }

  getAll(): Map<K, V> {
    return new Map(this.store);
  }
}

const cache = new KeyValueStore<string, number>();
cache.set("age", 30);
cache.set("score", 95);
console.log("Age:", cache.get("age"));
console.log("Has 'score':", cache.has("score"));

// Generic utility function
function map<T, U>(arr: T[], fn: (item: T) => U): U[] {
  return arr.map(fn);
}

const numbers = [1, 2, 3, 4, 5];
const doubled = map(numbers, n => n * 2);
const stringified = map(numbers, n => `Number: ${n}`);

console.log("Doubled:", doubled);
console.log("Stringified:", stringified);
