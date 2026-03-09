/*
 * Question 12 (Advanced): ES6 Classes and OOP
 * 
 * Write a JavaScript program that demonstrates:
 * - Class syntax
 * - Constructors and methods
 * - Inheritance with extends
 * - super keyword
 * - Static methods
 * - Getters and setters
 * - Private fields
 * 
 * Learning objectives:
 * - Implement object-oriented programming in JavaScript
 * - Use modern class syntax
 * - Understand inheritance and polymorphism
 */

console.log("=== Basic Class Syntax ===");

// Simple class
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    
    greet() {
        return `Hello, my name is ${this.name}`;
    }
    
    getInfo() {
        return `${this.name} is ${this.age} years old`;
    }
}

const person1 = new Person("Alice", 30);
console.log(person1.greet());
console.log(person1.getInfo());

// Class with multiple methods
class Calculator {
    add(a, b) {
        return a + b;
    }
    
    subtract(a, b) {
        return a - b;
    }
    
    multiply(a, b) {
        return a * b;
    }
    
    divide(a, b) {
        if (b === 0) throw new Error("Division by zero");
        return a / b;
    }
}

const calc = new Calculator();
console.log("5 + 3 =", calc.add(5, 3));
console.log("10 - 4 =", calc.subtract(10, 4));
console.log("6 * 7 =", calc.multiply(6, 7));
console.log("15 / 3 =", calc.divide(15, 3));

// Getters and Setters
console.log("\n=== Getters and Setters ===");

class Rectangle {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    
    get area() {
        return this.width * this.height;
    }
    
    get perimeter() {
        return 2 * (this.width + this.height);
    }
    
    set dimensions({ width, height }) {
        this.width = width;
        this.height = height;
    }
}

const rect = new Rectangle(10, 5);
console.log("Area:", rect.area);
console.log("Perimeter:", rect.perimeter);

rect.dimensions = { width: 20, height: 10 };
console.log("New area:", rect.area);

// Static Methods
console.log("\n=== Static Methods ===");

class MathUtils {
    static PI = 3.14159;
    
    static square(x) {
        return x * x;
    }
    
    static cube(x) {
        return x * x * x;
    }
    
    static circleArea(radius) {
        return this.PI * this.square(radius);
    }
}

console.log("Square of 5:", MathUtils.square(5));
console.log("Cube of 3:", MathUtils.cube(3));
console.log("Circle area (r=4):", MathUtils.circleArea(4));
console.log("PI:", MathUtils.PI);

// Inheritance
console.log("\n=== Inheritance ===");

class Animal {
    constructor(name, species) {
        this.name = name;
        this.species = species;
    }
    
    makeSound() {
        return "Some generic sound";
    }
    
    describe() {
        return `${this.name} is a ${this.species}`;
    }
}

class Dog extends Animal {
    constructor(name, breed) {
        super(name, "Dog");
        this.breed = breed;
    }
    
    makeSound() {
        return "Woof! Woof!";
    }
    
    fetch() {
        return `${this.name} is fetching the ball`;
    }
}

class Cat extends Animal {
    constructor(name, color) {
        super(name, "Cat");
        this.color = color;
    }
    
    makeSound() {
        return "Meow!";
    }
    
    scratch() {
        return `${this.name} is scratching`;
    }
}

const dog = new Dog("Buddy", "Golden Retriever");
const cat = new Cat("Whiskers", "Orange");

console.log(dog.describe());
console.log(dog.makeSound());
console.log(dog.fetch());

console.log(cat.describe());
console.log(cat.makeSound());
console.log(cat.scratch());

// Super keyword
console.log("\n=== Super Keyword ===");

class Shape {
    constructor(color) {
        this.color = color;
    }
    
    describe() {
        return `A ${this.color} shape`;
    }
}

class Circle extends Shape {
    constructor(color, radius) {
        super(color);
        this.radius = radius;
    }
    
    describe() {
        return `${super.describe()} with radius ${this.radius}`;
    }
    
    area() {
        return Math.PI * this.radius * this.radius;
    }
}

const circle = new Circle("red", 5);
console.log(circle.describe());
console.log("Area:", circle.area().toFixed(2));

// Private Fields (ES2022)
console.log("\n=== Private Fields ===");

class BankAccount {
    #balance = 0;  // Private field
    #accountNumber;
    
    constructor(accountNumber, initialBalance = 0) {
        this.#accountNumber = accountNumber;
        this.#balance = initialBalance;
    }
    
    deposit(amount) {
        if (amount > 0) {
            this.#balance += amount;
            return `Deposited $${amount}. New balance: $${this.#balance}`;
        }
        return "Invalid amount";
    }
    
    withdraw(amount) {
        if (amount > 0 && amount <= this.#balance) {
            this.#balance -= amount;
            return `Withdrew $${amount}. New balance: $${this.#balance}`;
        }
        return "Invalid amount or insufficient funds";
    }
    
    getBalance() {
        return this.#balance;
    }
    
    #calculateInterest(rate) {  // Private method
        return this.#balance * rate;
    }
    
    applyInterest(rate) {
        const interest = this.#calculateInterest(rate);
        this.#balance += interest;
        return `Applied ${(rate * 100).toFixed(2)}% interest: $${interest.toFixed(2)}`;
    }
}

const account = new BankAccount("ACC-001", 1000);
console.log("Initial balance:", account.getBalance());
console.log(account.deposit(500));
console.log(account.withdraw(200));
console.log(account.applyInterest(0.05));
// console.log(account.#balance);  // Error: Private field

// Polymorphism
console.log("\n=== Polymorphism ===");

class Employee {
    constructor(name, baseSalary) {
        this.name = name;
        this.baseSalary = baseSalary;
    }
    
    calculateSalary() {
        return this.baseSalary;
    }
    
    getDetails() {
        return `${this.name}: $${this.calculateSalary()}`;
    }
}

class Manager extends Employee {
    constructor(name, baseSalary, bonus) {
        super(name, baseSalary);
        this.bonus = bonus;
    }
    
    calculateSalary() {
        return this.baseSalary + this.bonus;
    }
}

class Developer extends Employee {
    constructor(name, baseSalary, projectBonus) {
        super(name, baseSalary);
        this.projectBonus = projectBonus;
    }
    
    calculateSalary() {
        return this.baseSalary + this.projectBonus;
    }
}

const employees = [
    new Employee("Alice", 50000),
    new Manager("Bob", 70000, 10000),
    new Developer("Charlie", 60000, 5000)
];

console.log("Employee salaries:");
employees.forEach(emp => console.log(emp.getDetails()));

// Method Chaining
console.log("\n=== Method Chaining ===");

class QueryBuilder {
    constructor() {
        this.query = "";
    }
    
    select(fields) {
        this.query = `SELECT ${fields}`;
        return this;
    }
    
    from(table) {
        this.query += ` FROM ${table}`;
        return this;
    }
    
    where(condition) {
        this.query += ` WHERE ${condition}`;
        return this;
    }
    
    orderBy(field) {
        this.query += ` ORDER BY ${field}`;
        return this;
    }
    
    build() {
        return this.query;
    }
}

const query = new QueryBuilder()
    .select("name, email")
    .from("users")
    .where("age > 25")
    .orderBy("name")
    .build();

console.log("Query:", query);

// Composition over Inheritance
console.log("\n=== Composition ===");

const canEat = {
    eat(food) {
        return `Eating ${food}`;
    }
};

const canWalk = {
    walk() {
        return "Walking...";
    }
};

const canSwim = {
    swim() {
        return "Swimming...";
    }
};

class Duck {
    constructor(name) {
        this.name = name;
        Object.assign(this, canEat, canWalk, canSwim);
    }
}

const duck = new Duck("Donald");
console.log(duck.eat("bread"));
console.log(duck.walk());
console.log(duck.swim());

// Factory Pattern
console.log("\n=== Factory Pattern ===");

class Car {
    constructor(make, model) {
        this.make = make;
        this.model = model;
        this.type = "car";
    }
    
    drive() {
        return `Driving ${this.make} ${this.model}`;
    }
}

class Bike {
    constructor(make, model) {
        this.make = make;
        this.model = model;
        this.type = "bike";
    }
    
    ride() {
        return `Riding ${this.make} ${this.model}`;
    }
}

class VehicleFactory {
    static createVehicle(type, make, model) {
        switch(type) {
            case "car":
                return new Car(make, model);
            case "bike":
                return new Bike(make, model);
            default:
                throw new Error("Unknown vehicle type");
        }
    }
}

const myCar = VehicleFactory.createVehicle("car", "Toyota", "Camry");
const myBike = VehicleFactory.createVehicle("bike", "Harley", "Davidson");

console.log(myCar.drive());
console.log(myBike.ride());

// Singleton Pattern
console.log("\n=== Singleton Pattern ===");

class Database {
    static #instance = null;
    
    constructor() {
        if (Database.#instance) {
            return Database.#instance;
        }
        
        this.connection = "Connected to database";
        Database.#instance = this;
    }
    
    query(sql) {
        return `Executing: ${sql}`;
    }
}

const db1 = new Database();
const db2 = new Database();

console.log("Same instance?", db1 === db2);  // true
console.log(db1.query("SELECT * FROM users"));

// instanceof operator
console.log("\n=== instanceof ===");

console.log("dog instanceof Dog:", dog instanceof Dog);
console.log("dog instanceof Animal:", dog instanceof Animal);
console.log("dog instanceof Cat:", dog instanceof Cat);

/*
 * Sample Output:
 * === Basic Class Syntax ===
 * Hello, my name is Alice
 * Alice is 30 years old
 * 5 + 3 = 8
 * 10 - 4 = 6
 * 6 * 7 = 42
 * 15 / 3 = 5
 * 
 * === Getters and Setters ===
 * Area: 50
 * Perimeter: 30
 * New area: 200
 * 
 * === Static Methods ===
 * Square of 5: 25
 * Cube of 3: 27
 * Circle area (r=4): 50.26544
 * PI: 3.14159
 * 
 * [Additional output continues...]
 */
