// Question 7 (Advanced): Type Guards and Narrowing
// Implement custom type guards and use TypeScript's type narrowing features
// to safely work with different types.

// Solution:

// Basic type guards with typeof
function processValue(value: string | number | boolean): string {
  if (typeof value === "string") {
    // TypeScript knows value is string here
    return value.toUpperCase();
  } else if (typeof value === "number") {
    // TypeScript knows value is number here
    return value.toFixed(2);
  } else {
    // TypeScript knows value is boolean here
    return value ? "TRUE" : "FALSE";
  }
}

console.log(processValue("hello"));  // HELLO
console.log(processValue(42.567));   // 42.57
console.log(processValue(true));     // TRUE

// instanceof type guard
class Dog {
  bark(): string {
    return "Woof!";
  }
}

class Cat {
  meow(): string {
    return "Meow!";
  }
}

function makeSound(animal: Dog | Cat): string {
  if (animal instanceof Dog) {
    return animal.bark();
  } else {
    return animal.meow();
  }
}

const dog = new Dog();
const cat = new Cat();
console.log(makeSound(dog));  // Woof!
console.log(makeSound(cat));  // Meow!

// Custom type guard functions
interface Car {
  type: "car";
  wheels: 4;
  drive(): void;
}

interface Bike {
  type: "bike";
  wheels: 2;
  pedal(): void;
}

interface Truck {
  type: "truck";
  wheels: number;
  haul(): void;
}

type Vehicle = Car | Bike | Truck;

// Type predicate: 'vehicle is Car'
function isCar(vehicle: Vehicle): vehicle is Car {
  return vehicle.type === "car";
}

function isBike(vehicle: Vehicle): vehicle is Bike {
  return vehicle.type === "bike";
}

function isTruck(vehicle: Vehicle): vehicle is Truck {
  return vehicle.type === "truck";
}

function operateVehicle(vehicle: Vehicle): void {
  if (isCar(vehicle)) {
    console.log("Driving a car with", vehicle.wheels, "wheels");
    vehicle.drive();
  } else if (isBike(vehicle)) {
    console.log("Riding a bike with", vehicle.wheels, "wheels");
    vehicle.pedal();
  } else if (isTruck(vehicle)) {
    console.log("Operating a truck with", vehicle.wheels, "wheels");
    vehicle.haul();
  }
}

// Discriminated unions (tagged unions)
interface SuccessResult {
  status: "success";
  data: any;
}

interface ErrorResult {
  status: "error";
  error: string;
}

interface LoadingResult {
  status: "loading";
}

type Result = SuccessResult | ErrorResult | LoadingResult;

function handleResult(result: Result): void {
  // TypeScript narrows type based on 'status' property
  switch (result.status) {
    case "success":
      console.log("Data:", result.data);
      break;
    case "error":
      console.log("Error:", result.error);
      break;
    case "loading":
      console.log("Loading...");
      break;
  }
}

handleResult({ status: "success", data: { id: 1 } });
handleResult({ status: "error", error: "Network failed" });
handleResult({ status: "loading" });

// Truthiness narrowing
function printLength(str: string | null | undefined): void {
  if (str) {
    // TypeScript knows str is string (not null/undefined)
    console.log("Length:", str.length);
  } else {
    console.log("No string provided");
  }
}

printLength("hello");     // Length: 5
printLength(null);        // No string provided
printLength(undefined);   // No string provided

// Equality narrowing
function compareValues(x: string | number, y: string | boolean): void {
  if (x === y) {
    // TypeScript knows both must be string
    console.log("Both are strings:", x.toUpperCase(), y.toUpperCase());
  } else {
    console.log("Different types or values");
  }
}

// in operator narrowing
interface Fish {
  swim: () => void;
}

interface Bird {
  fly: () => void;
}

function move(animal: Fish | Bird): void {
  if ("swim" in animal) {
    // TypeScript knows animal is Fish
    animal.swim();
  } else {
    // TypeScript knows animal is Bird
    animal.fly();
  }
}

// Array type narrowing
function processInput(input: string | string[]): string {
  if (Array.isArray(input)) {
    // TypeScript knows input is string[]
    return input.join(", ");
  } else {
    // TypeScript knows input is string
    return input.toUpperCase();
  }
}

console.log(processInput("hello"));           // HELLO
console.log(processInput(["a", "b", "c"]));  // a, b, c

// Exhaustiveness checking with never
type Shape = Circle | Square | Triangle;

interface Circle {
  kind: "circle";
  radius: number;
}

interface Square {
  kind: "square";
  sideLength: number;
}

interface Triangle {
  kind: "triangle";
  base: number;
  height: number;
}

function getArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.sideLength ** 2;
    case "triangle":
      return (shape.base * shape.height) / 2;
    default:
      // Ensures all cases are handled
      const _exhaustiveCheck: never = shape;
      throw new Error(`Unhandled shape: ${_exhaustiveCheck}`);
  }
}

// Advanced type guard with generics
function isArrayOf<T>(
  value: unknown,
  check: (item: unknown) => item is T
): value is T[] {
  return Array.isArray(value) && value.every(check);
}

function isNumber(value: unknown): value is number {
  return typeof value === "number";
}

function isString(value: unknown): value is string {
  return typeof value === "string";
}

const mixedArray: unknown = [1, 2, 3];
const stringArray: unknown = ["a", "b", "c"];

if (isArrayOf(mixedArray, isNumber)) {
  console.log("Sum:", mixedArray.reduce((a, b) => a + b, 0));
}

if (isArrayOf(stringArray, isString)) {
  console.log("Joined:", stringArray.join("-"));
}

// Type assertion with type guards
function assertIsString(value: unknown): asserts value is string {
  if (typeof value !== "string") {
    throw new Error("Value is not a string");
  }
}

function processUnknown(value: unknown): void {
  assertIsString(value);
  // After assertion, TypeScript knows value is string
  console.log(value.toUpperCase());
}

try {
  processUnknown("hello");  // HELLO
  processUnknown(123);      // Throws error
} catch (error) {
  console.log("Error:", (error as Error).message);
}
