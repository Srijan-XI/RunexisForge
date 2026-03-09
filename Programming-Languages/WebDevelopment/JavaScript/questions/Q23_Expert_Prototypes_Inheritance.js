/*
 * Question 23 (Expert): Prototypes and Inheritance
 * 
 * Write a JavaScript program that demonstrates:
 * - Prototype chain
 * - Object.create() and prototypal inheritance
 * - Constructor functions and prototypes
 * - ES6 classes vs prototypes
 * - Inheritance patterns
 * 
 * Learning objectives:
 * - Understand JavaScript's prototype-based inheritance
 * - Master object creation patterns
 * - Implement inheritance effectively
 */

console.log("=== Prototypes and Inheritance Overview ===");

console.log("\n=== Prototype Basics ===");

const person = {
    greet() {
        return `Hello, I'm ${this.name}`;
    }
};

const john = Object.create(person);
john.name = 'John';

console.log(john.greet());
console.log("john has own 'name':", john.hasOwnProperty('name'));
console.log("john has own 'greet':", john.hasOwnProperty('greet'));
console.log("john.__proto__ === person:", john.__proto__ === person);

console.log("\n=== Prototype Chain ===");

const animal = {
    type: 'Animal',
    speak() {
        return 'Some sound';
    }
};

const dog = Object.create(animal);
dog.type = 'Dog';
dog.speak = function() {
    return 'Woof!';
};

const puppy = Object.create(dog);
puppy.name = 'Buddy';

console.log("puppy.name:", puppy.name);           // Own property
console.log("puppy.type:", puppy.type);           // From dog
console.log("puppy.speak():", puppy.speak());     // From dog

// Prototype chain
console.log("\nPrototype chain:");
console.log("puppy.__proto__ === dog:", puppy.__proto__ === dog);
console.log("dog.__proto__ === animal:", dog.__proto__ === animal);
console.log("animal.__proto__ === Object.prototype:", 
    animal.__proto__ === Object.prototype);

console.log("\n=== Constructor Functions ===");

function Person(name, age) {
    this.name = name;
    this.age = age;
}

// Add methods to prototype
Person.prototype.greet = function() {
    return `Hello, I'm ${this.name}, ${this.age} years old`;
};

Person.prototype.birthday = function() {
    this.age++;
    console.log(`${this.name} is now ${this.age}`);
};

const alice = new Person('Alice', 25);
const bob = new Person('Bob', 30);

console.log(alice.greet());
console.log(bob.greet());

// Shared prototype
console.log("Same prototype:", 
    alice.greet === bob.greet);  // true

alice.birthday();

console.log("\n=== What 'new' Does ===");

function MyConstructor(value) {
    // 1. Create new object: const obj = {};
    // 2. Set prototype: obj.__proto__ = MyConstructor.prototype;
    // 3. Bind this: this = obj;
    this.value = value;
    // 4. Return this (implicitly)
}

MyConstructor.prototype.getValue = function() {
    return this.value;
};

const instance = new MyConstructor(42);
console.log("Instance value:", instance.getValue());
console.log("instance instanceof MyConstructor:", 
    instance instanceof MyConstructor);

// Manual implementation of 'new'
function customNew(constructor, ...args) {
    const obj = Object.create(constructor.prototype);
    const result = constructor.apply(obj, args);
    return result instanceof Object ? result : obj;
}

const instance2 = customNew(MyConstructor, 100);
console.log("Custom new value:", instance2.getValue());

console.log("\n=== Prototypal Inheritance ===");

function Animal(name) {
    this.name = name;
}

Animal.prototype.speak = function() {
    return 'Some sound';
};

Animal.prototype.describe = function() {
    return `${this.name} is an animal`;
};

function Dog(name, breed) {
    Animal.call(this, name);  // Call parent constructor
    this.breed = breed;
}

// Set up inheritance
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

// Override method
Dog.prototype.speak = function() {
    return 'Woof!';
};

// Add new method
Dog.prototype.fetch = function() {
    return `${this.name} is fetching`;
};

const myDog = new Dog('Buddy', 'Golden Retriever');
console.log(myDog.describe());    // From Animal
console.log(myDog.speak());       // Overridden in Dog
console.log(myDog.fetch());       // New in Dog

console.log("\nInheritance check:");
console.log("myDog instanceof Dog:", myDog instanceof Dog);
console.log("myDog instanceof Animal:", myDog instanceof Animal);

console.log("\n=== ES6 Classes (Syntactic Sugar) ===");

class Vehicle {
    constructor(make, model) {
        this.make = make;
        this.model = model;
    }
    
    start() {
        return `${this.make} ${this.model} started`;
    }
    
    stop() {
        return `${this.make} ${this.model} stopped`;
    }
}

class Car extends Vehicle {
    constructor(make, model, doors) {
        super(make, model);
        this.doors = doors;
    }
    
    // Override
    start() {
        return `${super.start()} (${this.doors}-door car)`;
    }
    
    // New method
    honk() {
        return 'Beep beep!';
    }
}

const myCar = new Car('Toyota', 'Camry', 4);
console.log(myCar.start());
console.log(myCar.honk());
console.log(myCar.stop());

// Still uses prototypes under the hood
console.log("\nClasses use prototypes:");
console.log("Car.prototype:", typeof Car.prototype);
console.log("myCar.__proto__ === Car.prototype:", 
    myCar.__proto__ === Car.prototype);

console.log("\n=== Object.create() ===");

const protoObject = {
    type: 'Proto',
    greet() {
        return `Hello from ${this.name}`;
    }
};

const obj1 = Object.create(protoObject);
obj1.name = 'Object 1';

const obj2 = Object.create(protoObject);
obj2.name = 'Object 2';

console.log(obj1.greet());
console.log(obj2.greet());
console.log("Share prototype:", obj1.greet === obj2.greet);

// Create with null prototype
const pureObject = Object.create(null);
pureObject.key = 'value';

console.log("\nPure object:");
console.log("Has __proto__:", '__proto__' in pureObject);
console.log("Has toString:", 'toString' in pureObject);

console.log("\n=== Adding to Prototype ===");

function Product(name, price) {
    this.name = name;
    this.price = price;
}

Product.prototype.getPrice = function() {
    return this.price;
};

const product1 = new Product('Laptop', 999);
console.log("Price:", product1.getPrice());

// Add method after creating instances
Product.prototype.discount = function(percent) {
    return this.price * (1 - percent / 100);
};

console.log("Discounted:", product1.discount(10));

// All existing instances get the new method
const product2 = new Product('Mouse', 25);
console.log("Product2 has discount:", 'discount' in product2);

console.log("\n=== Prototype Methods ===");

const obj = { a: 1, b: 2 };

// Object.getPrototypeOf()
console.log("Prototype:", Object.getPrototypeOf(obj) === Object.prototype);

// Object.setPrototypeOf()
const proto = { c: 3 };
Object.setPrototypeOf(obj, proto);
console.log("obj.c:", obj.c);

// isPrototypeOf()
console.log("proto.isPrototypeOf(obj):", proto.isPrototypeOf(obj));

// hasOwnProperty()
console.log("obj.hasOwnProperty('a'):", obj.hasOwnProperty('a'));
console.log("obj.hasOwnProperty('c'):", obj.hasOwnProperty('c'));

console.log("\n=== Property Descriptors ===");

const descriptor = {
    value: 42,
    writable: true,
    enumerable: true,
    configurable: true
};

const testObj = {};
Object.defineProperty(testObj, 'myProp', descriptor);

console.log("Property value:", testObj.myProp);

// Non-writable
Object.defineProperty(testObj, 'constant', {
    value: 100,
    writable: false
});

testObj.constant = 200;  // Fails silently
console.log("Constant:", testObj.constant);  // Still 100

// Non-enumerable
Object.defineProperty(testObj, 'hidden', {
    value: 'secret',
    enumerable: false
});

console.log("Keys:", Object.keys(testObj));  // 'hidden' not included

console.log("\n=== Mixins ===");

const canEat = {
    eat(food) {
        return `Eating ${food}`;
    }
};

const canWalk = {
    walk() {
        return 'Walking...';
    }
};

const canSwim = {
    swim() {
        return 'Swimming...';
    }
};

// Compose object with multiple behaviors
function createDuck(name) {
    const duck = { name };
    Object.assign(duck, canEat, canWalk, canSwim);
    return duck;
}

const duck = createDuck('Donald');
console.log(duck.eat('bread'));
console.log(duck.walk());
console.log(duck.swim());

console.log("\n=== Practical Examples ===");

// Example 1: Shape hierarchy
class Shape {
    constructor(color) {
        this.color = color;
    }
    
    describe() {
        return `A ${this.color} shape`;
    }
    
    area() {
        throw new Error('area() must be implemented');
    }
}

class Circle extends Shape {
    constructor(color, radius) {
        super(color);
        this.radius = radius;
    }
    
    area() {
        return Math.PI * this.radius ** 2;
    }
    
    describe() {
        return `${super.describe()} with radius ${this.radius}`;
    }
}

class Rectangle extends Shape {
    constructor(color, width, height) {
        super(color);
        this.width = width;
        this.height = height;
    }
    
    area() {
        return this.width * this.height;
    }
    
    describe() {
        return `${super.describe()} (${this.width}x${this.height})`;
    }
}

const circle = new Circle('red', 5);
const rectangle = new Rectangle('blue', 10, 20);

console.log("Circle:", circle.describe());
console.log("Circle area:", circle.area().toFixed(2));
console.log("Rectangle:", rectangle.describe());
console.log("Rectangle area:", rectangle.area());

// Example 2: Plugin system
function createPluginSystem() {
    const plugins = [];
    
    return {
        register(plugin) {
            if (typeof plugin.init === 'function') {
                plugins.push(plugin);
                plugin.init();
                console.log(`Plugin "${plugin.name}" registered`);
            }
        },
        
        execute(method, ...args) {
            plugins.forEach(plugin => {
                if (typeof plugin[method] === 'function') {
                    plugin[method](...args);
                }
            });
        }
    };
}

const system = createPluginSystem();

const loggerPlugin = {
    name: 'Logger',
    init() {
        console.log('Logger plugin initialized');
    },
    log(message) {
        console.log(`[LOG] ${message}`);
    }
};

const analyticsPlugin = {
    name: 'Analytics',
    init() {
        console.log('Analytics plugin initialized');
    },
    track(event) {
        console.log(`[ANALYTICS] ${event}`);
    }
};

system.register(loggerPlugin);
system.register(analyticsPlugin);
system.execute('log', 'Application started');
system.execute('track', 'page_view');

console.log("\n=== Best Practices ===");

/*
 * Prototype Best Practices:
 * 
 * 1. Use ES6 classes for clarity
 * class MyClass {
 *     constructor() { ... }
 *     method() { ... }
 * }
 * 
 * 2. Put methods on prototype
 * - Saves memory (shared across instances)
 * - Don't define methods in constructor
 * 
 * 3. Use Object.create() for prototypal inheritance
 * const child = Object.create(parent);
 * 
 * 4. Check prototype chain carefully
 * obj.hasOwnProperty(prop)
 * Object.getPrototypeOf(obj)
 * 
 * 5. Don't modify built-in prototypes
 * - Array.prototype, Object.prototype, etc.
 * - Can break code and cause conflicts
 * 
 * 6. Use composition over inheritance
 * - More flexible
 * - Avoid deep hierarchies
 * 
 * 7. Understand instanceof
 * - Checks prototype chain
 * - Can give unexpected results
 * 
 * 8. Use super in derived classes
 * - Call parent constructors
 * - Access parent methods
 * 
 * 9. Be careful with 'this'
 * - Arrow functions don't have prototype
 * - Bind methods when necessary
 * 
 * 10. Use mixins for cross-cutting concerns
 * Object.assign(target, mixin1, mixin2)
 */

console.log("Best practices documented");

/*
 * Sample Output:
 * === Prototypes and Inheritance Overview ===
 * 
 * === Prototype Basics ===
 * Hello, I'm John
 * john has own 'name': true
 * john has own 'greet': false
 * john.__proto__ === person: true
 * 
 * [Additional output continues...]
 */
