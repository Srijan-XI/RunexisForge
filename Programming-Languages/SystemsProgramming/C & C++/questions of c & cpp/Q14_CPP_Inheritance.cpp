/*
 * Question 14 (C++): Inheritance
 * 
 * Write a C++ program that demonstrates:
 * - Base class and derived class
 * - Different types of inheritance
 * - Method overriding
 * - Access to base class members
 * 
 * Learning objectives:
 * - Implement inheritance
 * - Understand public, protected, private inheritance
 * - Override base class methods
 */

#include <iostream>
#include <string>
using namespace std;

// Base class
class Animal {
protected:
    string name;
    int age;
    
public:
    Animal(string n, int a) : name(n), age(a) {
        cout << "Animal constructor called" << endl;
    }
    
    virtual void makeSound() {
        cout << "Animal makes a sound" << endl;
    }
    
    void displayInfo() {
        cout << "Name: " << name << ", Age: " << age << endl;
    }
    
    virtual ~Animal() {
        cout << "Animal destructor called" << endl;
    }
};

// Derived class 1
class Dog : public Animal {
private:
    string breed;
    
public:
    Dog(string n, int a, string b) : Animal(n, a), breed(b) {
        cout << "Dog constructor called" << endl;
    }
    
    void makeSound() override {
        cout << name << " barks: Woof! Woof!" << endl;
    }
    
    void displayBreed() {
        cout << "Breed: " << breed << endl;
    }
    
    ~Dog() {
        cout << "Dog destructor called" << endl;
    }
};

// Derived class 2
class Cat : public Animal {
private:
    bool isIndoor;
    
public:
    Cat(string n, int a, bool indoor) : Animal(n, a), isIndoor(indoor) {
        cout << "Cat constructor called" << endl;
    }
    
    void makeSound() override {
        cout << name << " meows: Meow! Meow!" << endl;
    }
    
    void displayType() {
        cout << (isIndoor ? "Indoor cat" : "Outdoor cat") << endl;
    }
    
    ~Cat() {
        cout << "Cat destructor called" << endl;
    }
};

// Multi-level inheritance
class Puppy : public Dog {
private:
    bool isTrained;
    
public:
    Puppy(string n, int a, string b, bool trained) 
        : Dog(n, a, b), isTrained(trained) {
        cout << "Puppy constructor called" << endl;
    }
    
    void play() {
        cout << name << " is playing!" << endl;
    }
    
    ~Puppy() {
        cout << "Puppy destructor called" << endl;
    }
};

int main() {
    cout << "=== Single Inheritance ===" << endl;
    Dog dog1("Buddy", 3, "Golden Retriever");
    dog1.displayInfo();
    dog1.displayBreed();
    dog1.makeSound();
    
    cout << "\n=== Another Derived Class ===" << endl;
    Cat cat1("Whiskers", 2, true);
    cat1.displayInfo();
    cat1.displayType();
    cat1.makeSound();
    
    cout << "\n=== Multi-level Inheritance ===" << endl;
    Puppy puppy1("Max", 1, "Labrador", false);
    puppy1.displayInfo();
    puppy1.displayBreed();
    puppy1.makeSound();
    puppy1.play();
    
    cout << "\n=== Polymorphism ===" << endl;
    Animal* animals[3];
    animals[0] = new Dog("Rex", 4, "German Shepherd");
    animals[1] = new Cat("Mittens", 3, false);
    animals[2] = new Dog("Charlie", 2, "Beagle");
    
    for (int i = 0; i < 3; i++) {
        animals[i]->makeSound();
    }
    
    // Clean up
    for (int i = 0; i < 3; i++) {
        delete animals[i];
    }
    
    return 0;
}

/*
 * Sample Output:
 * === Single Inheritance ===
 * Animal constructor called
 * Dog constructor called
 * Name: Buddy, Age: 3
 * Breed: Golden Retriever
 * Buddy barks: Woof! Woof!
 * 
 * === Another Derived Class ===
 * Animal constructor called
 * Cat constructor called
 * Name: Whiskers, Age: 2
 * Indoor cat
 * Whiskers meows: Meow! Meow!
 * 
 * === Multi-level Inheritance ===
 * Animal constructor called
 * Dog constructor called
 * Puppy constructor called
 * Name: Max, Age: 1
 * Breed: Labrador
 * Max barks: Woof! Woof!
 * Max is playing!
 * 
 * === Polymorphism ===
 * Animal constructor called
 * Dog constructor called
 * Rex barks: Woof! Woof!
 * Animal constructor called
 * Cat constructor called
 * Mittens meows: Meow! Meow!
 * Animal constructor called
 * Dog constructor called
 * Charlie barks: Woof! Woof!
 * Dog destructor called
 * Animal destructor called
 * Cat destructor called
 * Animal destructor called
 * Dog destructor called
 * Animal destructor called
 * ...
 */
