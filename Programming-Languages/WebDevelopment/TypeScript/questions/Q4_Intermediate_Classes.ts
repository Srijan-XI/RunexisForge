// Question 4 (Intermediate): Classes and Inheritance
// Create a base class 'Animal' with properties and methods,
// then create derived classes 'Dog' and 'Cat' that extend Animal.
// Use access modifiers (public, private, protected).

// Solution:

// Base class
class Animal {
  protected name: string;
  private age: number;
  public species: string;

  constructor(name: string, age: number, species: string) {
    this.name = name;
    this.age = age;
    this.species = species;
  }

  // Public method
  public introduce(): string {
    return `I'm ${this.name}, a ${this.age}-year-old ${this.species}.`;
  }

  // Getter for private property
  public getAge(): number {
    return this.age;
  }

  // Setter for private property
  public setAge(age: number): void {
    if (age > 0) {
      this.age = age;
    }
  }

  // Method to be overridden
  public makeSound(): string {
    return "Some generic animal sound";
  }
}

// Derived class: Dog
class Dog extends Animal {
  private breed: string;

  constructor(name: string, age: number, breed: string) {
    super(name, age, "Dog");  // Call parent constructor
    this.breed = breed;
  }

  // Override parent method
  public makeSound(): string {
    return "Woof! Woof!";
  }

  // Additional method specific to Dog
  public fetch(): string {
    return `${this.name} is fetching the ball!`;
  }

  // Override introduce to add breed info
  public introduce(): string {
    return `${super.introduce()} I'm a ${this.breed}.`;
  }
}

// Derived class: Cat
class Cat extends Animal {
  private indoor: boolean;

  constructor(name: string, age: number, indoor: boolean = true) {
    super(name, age, "Cat");
    this.indoor = indoor;
  }

  // Override parent method
  public makeSound(): string {
    return "Meow! Meow!";
  }

  // Additional method specific to Cat
  public scratch(): string {
    return `${this.name} is scratching the furniture!`;
  }

  public getEnvironment(): string {
    return this.indoor ? "indoor" : "outdoor";
  }
}

// Using the classes
const dog = new Dog("Buddy", 3, "Golden Retriever");
console.log(dog.introduce());        // I'm Buddy, a 3-year-old Dog. I'm a Golden Retriever.
console.log(dog.makeSound());        // Woof! Woof!
console.log(dog.fetch());            // Buddy is fetching the ball!

const cat = new Cat("Whiskers", 2, true);
console.log(cat.introduce());        // I'm Whiskers, a 2-year-old Cat.
console.log(cat.makeSound());        // Meow! Meow!
console.log(cat.scratch());          // Whiskers is scratching the furniture!
console.log(`Environment: ${cat.getEnvironment()}`);  // Environment: indoor

// Polymorphism example
const animals: Animal[] = [dog, cat];

animals.forEach(animal => {
  console.log(animal.makeSound());  // Each animal makes its own sound
});

// Abstract class example
abstract class Shape {
  abstract area(): number;
  abstract perimeter(): number;

  public describe(): string {
    return `Area: ${this.area()}, Perimeter: ${this.perimeter()}`;
  }
}

class Rectangle extends Shape {
  constructor(private width: number, private height: number) {
    super();
  }

  area(): number {
    return this.width * this.height;
  }

  perimeter(): number {
    return 2 * (this.width + this.height);
  }
}

const rect = new Rectangle(5, 10);
console.log(rect.describe());  // Area: 50, Perimeter: 30
