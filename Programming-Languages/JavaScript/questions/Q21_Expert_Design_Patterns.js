/*
 * Question 21 (Expert): Design Patterns
 * 
 * Write a JavaScript program that demonstrates:
 * - Module Pattern
 * - Singleton Pattern
 * - Factory Pattern
 * - Observer Pattern
 * - Strategy Pattern
 * - Decorator Pattern
 * 
 * Learning objectives:
 * - Understand common design patterns
 * - Write maintainable and scalable code
 * - Apply best practices in software design
 */

console.log("=== Design Patterns Overview ===");

console.log("\n=== 1. Module Pattern ===");

const Calculator = (function() {
    // Private variables and functions
    let result = 0;
    
    function validateNumber(num) {
        if (typeof num !== 'number') {
            throw new TypeError('Argument must be a number');
        }
    }
    
    // Public API
    return {
        add(num) {
            validateNumber(num);
            result += num;
            return this;
        },
        
        subtract(num) {
            validateNumber(num);
            result -= num;
            return this;
        },
        
        multiply(num) {
            validateNumber(num);
            result *= num;
            return this;
        },
        
        getResult() {
            return result;
        },
        
        reset() {
            result = 0;
            return this;
        }
    };
})();

Calculator.add(5).multiply(3).subtract(2);
console.log("Calculator result:", Calculator.getResult());
Calculator.reset();

console.log("\n=== 2. Singleton Pattern ===");

const Database = (function() {
    let instance;
    
    function createInstance() {
        const connection = {
            host: 'localhost',
            port: 5432,
            connected: true
        };
        
        return {
            query(sql) {
                console.log(`Executing: ${sql}`);
                return { rows: [], rowCount: 0 };
            },
            
            getConnection() {
                return connection;
            }
        };
    }
    
    return {
        getInstance() {
            if (!instance) {
                instance = createInstance();
                console.log("Database instance created");
            }
            return instance;
        }
    };
})();

const db1 = Database.getInstance();
const db2 = Database.getInstance();

console.log("Same instance?", db1 === db2);
db1.query("SELECT * FROM users");

// ES6 Class Singleton
class Logger {
    static #instance = null;
    
    constructor() {
        if (Logger.#instance) {
            return Logger.#instance;
        }
        
        this.logs = [];
        Logger.#instance = this;
    }
    
    log(message) {
        const entry = {
            message,
            timestamp: new Date().toISOString()
        };
        this.logs.push(entry);
        console.log(`[LOG] ${message}`);
    }
    
    getLogs() {
        return this.logs;
    }
}

const logger1 = new Logger();
const logger2 = new Logger();

console.log("\nLogger same instance?", logger1 === logger2);
logger1.log("Application started");
logger2.log("User logged in");
console.log("Total logs:", logger1.getLogs().length);

console.log("\n=== 3. Factory Pattern ===");

class Car {
    constructor(make, model) {
        this.make = make;
        this.model = model;
        this.type = 'car';
    }
    
    drive() {
        return `Driving ${this.make} ${this.model}`;
    }
}

class Motorcycle {
    constructor(make, model) {
        this.make = make;
        this.model = model;
        this.type = 'motorcycle';
    }
    
    ride() {
        return `Riding ${this.make} ${this.model}`;
    }
}

class Truck {
    constructor(make, model) {
        this.make = make;
        this.model = model;
        this.type = 'truck';
    }
    
    haul() {
        return `Hauling with ${this.make} ${this.model}`;
    }
}

class VehicleFactory {
    static createVehicle(type, make, model) {
        switch(type) {
            case 'car':
                return new Car(make, model);
            case 'motorcycle':
                return new Motorcycle(make, model);
            case 'truck':
                return new Truck(make, model);
            default:
                throw new Error(`Unknown vehicle type: ${type}`);
        }
    }
}

const car = VehicleFactory.createVehicle('car', 'Toyota', 'Camry');
const motorcycle = VehicleFactory.createVehicle('motorcycle', 'Harley', 'Street 750');

console.log("Created:", car.type);
console.log(car.drive());
console.log("Created:", motorcycle.type);
console.log(motorcycle.ride());

console.log("\n=== 4. Observer Pattern ===");

class Subject {
    constructor() {
        this.observers = [];
    }
    
    subscribe(observer) {
        this.observers.push(observer);
        console.log(`Observer subscribed (total: ${this.observers.length})`);
    }
    
    unsubscribe(observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
        console.log(`Observer unsubscribed (total: ${this.observers.length})`);
    }
    
    notify(data) {
        console.log(`Notifying ${this.observers.length} observers`);
        this.observers.forEach(observer => observer.update(data));
    }
}

class Observer {
    constructor(name) {
        this.name = name;
    }
    
    update(data) {
        console.log(`${this.name} received update:`, data);
    }
}

const subject = new Subject();

const observer1 = new Observer('Observer 1');
const observer2 = new Observer('Observer 2');
const observer3 = new Observer('Observer 3');

subject.subscribe(observer1);
subject.subscribe(observer2);
subject.subscribe(observer3);

subject.notify({ message: 'Hello Observers!' });

subject.unsubscribe(observer2);
subject.notify({ message: 'Second notification' });

// Event Emitter (Node.js style)
class EventEmitter {
    constructor() {
        this.events = {};
    }
    
    on(event, listener) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(listener);
    }
    
    emit(event, ...args) {
        if (this.events[event]) {
            this.events[event].forEach(listener => listener(...args));
        }
    }
    
    off(event, listenerToRemove) {
        if (this.events[event]) {
            this.events[event] = this.events[event].filter(
                listener => listener !== listenerToRemove
            );
        }
    }
}

const emitter = new EventEmitter();

emitter.on('userLoggedIn', (username) => {
    console.log(`\n[Event] User logged in: ${username}`);
});

emitter.on('userLoggedIn', (username) => {
    console.log(`[Event] Welcome email sent to ${username}`);
});

emitter.emit('userLoggedIn', 'john_doe');

console.log("\n=== 5. Strategy Pattern ===");

// Strategy interface
class PaymentStrategy {
    pay(amount) {
        throw new Error('pay() must be implemented');
    }
}

class CreditCardStrategy extends PaymentStrategy {
    constructor(cardNumber) {
        super();
        this.cardNumber = cardNumber;
    }
    
    pay(amount) {
        console.log(`Paid $${amount} with credit card ${this.cardNumber}`);
    }
}

class PayPalStrategy extends PaymentStrategy {
    constructor(email) {
        super();
        this.email = email;
    }
    
    pay(amount) {
        console.log(`Paid $${amount} via PayPal (${this.email})`);
    }
}

class BitcoinStrategy extends PaymentStrategy {
    constructor(walletAddress) {
        super();
        this.walletAddress = walletAddress;
    }
    
    pay(amount) {
        console.log(`Paid $${amount} with Bitcoin (${this.walletAddress})`);
    }
}

class ShoppingCart {
    constructor() {
        this.items = [];
        this.paymentStrategy = null;
    }
    
    addItem(item) {
        this.items.push(item);
    }
    
    setPaymentStrategy(strategy) {
        this.paymentStrategy = strategy;
    }
    
    checkout() {
        const total = this.items.reduce((sum, item) => sum + item.price, 0);
        
        if (!this.paymentStrategy) {
            throw new Error('Payment strategy not set');
        }
        
        this.paymentStrategy.pay(total);
    }
}

const cart = new ShoppingCart();
cart.addItem({ name: 'Book', price: 20 });
cart.addItem({ name: 'Pen', price: 5 });

console.log("\nPayment with credit card:");
cart.setPaymentStrategy(new CreditCardStrategy('****1234'));
cart.checkout();

console.log("\nPayment with PayPal:");
cart.setPaymentStrategy(new PayPalStrategy('user@example.com'));
cart.checkout();

console.log("\n=== 6. Decorator Pattern ===");

class Coffee {
    cost() {
        return 5;
    }
    
    description() {
        return 'Coffee';
    }
}

class CoffeeDecorator {
    constructor(coffee) {
        this.coffee = coffee;
    }
    
    cost() {
        return this.coffee.cost();
    }
    
    description() {
        return this.coffee.description();
    }
}

class MilkDecorator extends CoffeeDecorator {
    cost() {
        return this.coffee.cost() + 1;
    }
    
    description() {
        return this.coffee.description() + ', Milk';
    }
}

class SugarDecorator extends CoffeeDecorator {
    cost() {
        return this.coffee.cost() + 0.5;
    }
    
    description() {
        return this.coffee.description() + ', Sugar';
    }
}

class WhipDecorator extends CoffeeDecorator {
    cost() {
        return this.coffee.cost() + 1.5;
    }
    
    description() {
        return this.coffee.description() + ', Whipped Cream';
    }
}

let myCoffee = new Coffee();
console.log(`${myCoffee.description()}: $${myCoffee.cost()}`);

myCoffee = new MilkDecorator(myCoffee);
console.log(`${myCoffee.description()}: $${myCoffee.cost()}`);

myCoffee = new SugarDecorator(myCoffee);
console.log(`${myCoffee.description()}: $${myCoffee.cost()}`);

myCoffee = new WhipDecorator(myCoffee);
console.log(`${myCoffee.description()}: $${myCoffee.cost()}`);

console.log("\n=== 7. Facade Pattern ===");

// Complex subsystems
class CPU {
    freeze() { console.log('CPU: Freezing...'); }
    jump(address) { console.log(`CPU: Jumping to ${address}`); }
    execute() { console.log('CPU: Executing...'); }
}

class Memory {
    load(address, data) {
        console.log(`Memory: Loading data at ${address}`);
    }
}

class HardDrive {
    read(sector, size) {
        console.log(`HDD: Reading ${size} bytes from sector ${sector}`);
        return 'boot data';
    }
}

// Facade
class ComputerFacade {
    constructor() {
        this.cpu = new CPU();
        this.memory = new Memory();
        this.hardDrive = new HardDrive();
    }
    
    start() {
        console.log('\nStarting computer...');
        this.cpu.freeze();
        const bootData = this.hardDrive.read(0, 1024);
        this.memory.load(0, bootData);
        this.cpu.jump(0);
        this.cpu.execute();
        console.log('Computer started!');
    }
}

const computer = new ComputerFacade();
computer.start();  // Simple interface hides complexity

console.log("\n=== 8. Prototype Pattern ===");

const carPrototype = {
    init(make, model) {
        this.make = make;
        this.model = model;
        return this;
    },
    
    drive() {
        return `Driving ${this.make} ${this.model}`;
    },
    
    clone() {
        return Object.create(this);
    }
};

const car1 = Object.create(carPrototype).init('Toyota', 'Camry');
const car2 = car1.clone().init('Honda', 'Civic');

console.log(car1.drive());
console.log(car2.drive());

console.log("\n=== 9. Command Pattern ===");

class Command {
    execute() {
        throw new Error('execute() must be implemented');
    }
    
    undo() {
        throw new Error('undo() must be implemented');
    }
}

class Light {
    on() {
        console.log('Light is ON');
    }
    
    off() {
        console.log('Light is OFF');
    }
}

class LightOnCommand extends Command {
    constructor(light) {
        super();
        this.light = light;
    }
    
    execute() {
        this.light.on();
    }
    
    undo() {
        this.light.off();
    }
}

class LightOffCommand extends Command {
    constructor(light) {
        super();
        this.light = light;
    }
    
    execute() {
        this.light.off();
    }
    
    undo() {
        this.light.on();
    }
}

class RemoteControl {
    constructor() {
        this.history = [];
    }
    
    execute(command) {
        command.execute();
        this.history.push(command);
    }
    
    undo() {
        const command = this.history.pop();
        if (command) {
            command.undo();
        }
    }
}

const light = new Light();
const remote = new RemoteControl();

console.log("\nUsing remote control:");
remote.execute(new LightOnCommand(light));
remote.execute(new LightOffCommand(light));
console.log("\nUndo last command:");
remote.undo();

console.log("\n=== Best Practices ===");

/*
 * Design Pattern Selection:
 * 
 * 1. Module Pattern
 * - Encapsulate private data
 * - Create reusable modules
 * 
 * 2. Singleton Pattern
 * - Database connections
 * - Configuration managers
 * - Loggers
 * 
 * 3. Factory Pattern
 * - Complex object creation
 * - Multiple object types
 * - Hide creation logic
 * 
 * 4. Observer Pattern
 * - Event handling
 * - State management
 * - Reactive programming
 * 
 * 5. Strategy Pattern
 * - Multiple algorithms
 * - Runtime algorithm selection
 * - Payment processing, sorting
 * 
 * 6. Decorator Pattern
 * - Add features dynamically
 * - Extend functionality
 * - Without modifying original
 * 
 * 7. Facade Pattern
 * - Simplify complex APIs
 * - Provide unified interface
 * - Library wrappers
 * 
 * 8. Command Pattern
 * - Undo/redo functionality
 * - Queue operations
 * - Macro recording
 * 
 * General Tips:
 * - Don't overuse patterns
 * - Keep it simple (KISS)
 * - Use when it solves a problem
 * - Understand the tradeoffs
 * - Consider maintainability
 */

console.log("Best practices documented");

/*
 * Sample Output:
 * === Design Patterns Overview ===
 * 
 * === 1. Module Pattern ===
 * Calculator result: 13
 * 
 * === 2. Singleton Pattern ===
 * Database instance created
 * Same instance? true
 * Executing: SELECT * FROM users
 * 
 * [Additional output continues...]
 */
