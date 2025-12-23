// Question 6 (Intermediate): Union and Intersection Types
// Work with union types (OR) and intersection types (AND).
// Create type-safe functions that handle multiple types.

// Solution:

// Union Types (OR - can be one of several types)
type StringOrNumber = string | number;

function printId(id: StringOrNumber): void {
  if (typeof id === "string") {
    console.log(`ID (string): ${id.toUpperCase()}`);
  } else {
    console.log(`ID (number): ${id}`);
  }
}

printId(101);        // ID (number): 101
printId("ABC123");   // ID (string): ABC123

// Literal union types
type Status = "pending" | "approved" | "rejected";
type Direction = "up" | "down" | "left" | "right";

function updateStatus(status: Status): void {
  console.log(`Status updated to: ${status}`);
}

updateStatus("approved");  // OK
// updateStatus("invalid"); // Error: Argument not assignable

function move(direction: Direction, steps: number): void {
  console.log(`Moving ${direction} by ${steps} steps`);
}

move("up", 5);
move("left", 3);

// Union with objects
interface Circle {
  kind: "circle";
  radius: number;
}

interface Rectangle {
  kind: "rectangle";
  width: number;
  height: number;
}

interface Triangle {
  kind: "triangle";
  base: number;
  height: number;
}

type Shape = Circle | Rectangle | Triangle;

// Discriminated union (tagged union)
function calculateArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "rectangle":
      return shape.width * shape.height;
    case "triangle":
      return (shape.base * shape.height) / 2;
  }
}

const circle: Circle = { kind: "circle", radius: 5 };
const rectangle: Rectangle = { kind: "rectangle", width: 10, height: 20 };
const triangle: Triangle = { kind: "triangle", base: 10, height: 15 };

console.log("Circle area:", calculateArea(circle));
console.log("Rectangle area:", calculateArea(rectangle));
console.log("Triangle area:", calculateArea(triangle));

// Intersection Types (AND - must have all properties)
interface Colorful {
  color: string;
}

interface Bordered {
  borderWidth: number;
  borderStyle: string;
}

type StyledElement = Colorful & Bordered;

const styledBox: StyledElement = {
  color: "blue",
  borderWidth: 2,
  borderStyle: "solid"
};

console.log("Styled element:", styledBox);

// Combining interfaces with intersection
interface Person {
  name: string;
  age: number;
}

interface Employee {
  employeeId: string;
  department: string;
}

type EmployeePerson = Person & Employee;

const employee: EmployeePerson = {
  name: "Alice",
  age: 30,
  employeeId: "E12345",
  department: "Engineering"
};

console.log("Employee:", employee);

// Function overloads with union types
function formatValue(value: string): string;
function formatValue(value: number): string;
function formatValue(value: boolean): string;
function formatValue(value: string | number | boolean): string {
  if (typeof value === "string") {
    return `"${value}"`;
  } else if (typeof value === "number") {
    return value.toFixed(2);
  } else {
    return value ? "YES" : "NO";
  }
}

console.log(formatValue("hello"));    // "hello"
console.log(formatValue(42.567));     // 42.57
console.log(formatValue(true));       // YES

// Type guards with union types
type Response = { success: true; data: any } | { success: false; error: string };

function handleResponse(response: Response): void {
  if (response.success) {
    console.log("Data received:", response.data);
  } else {
    console.log("Error:", response.error);
  }
}

handleResponse({ success: true, data: { id: 1, name: "John" } });
handleResponse({ success: false, error: "Network error" });

// Complex union and intersection example
interface Bird {
  fly(): void;
  layEggs(): void;
}

interface Fish {
  swim(): void;
  layEggs(): void;
}

type BirdOrFish = Bird | Fish;
type BirdAndFish = Bird & Fish;  // Has all methods from both

function isBird(animal: BirdOrFish): animal is Bird {
  return (animal as Bird).fly !== undefined;
}

function move(animal: BirdOrFish): void {
  if (isBird(animal)) {
    animal.fly();
  } else {
    animal.swim();
  }
  animal.layEggs();  // Common method available in both
}

// Utility with unions
type Nullable<T> = T | null | undefined;

function getValue<T>(value: Nullable<T>, defaultValue: T): T {
  return value ?? defaultValue;
}

console.log(getValue(null, "default"));      // "default"
console.log(getValue(undefined, 42));        // 42
console.log(getValue("actual", "default"));  // "actual"
