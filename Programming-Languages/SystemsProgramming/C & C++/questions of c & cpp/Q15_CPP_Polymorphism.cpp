/*
 * Question 15 (C++): Polymorphism
 * 
 * Write a C++ program that demonstrates:
 * - Function overloading (compile-time polymorphism)
 * - Operator overloading
 * - Virtual functions (runtime polymorphism)
 * 
 * Learning objectives:
 * - Implement different types of polymorphism
 * - Overload operators
 * - Use virtual functions effectively
 */

#include <iostream>
#include <cmath>
using namespace std;

// Class demonstrating operator overloading
class Complex {
private:
    double real;
    double imag;
    
public:
    Complex(double r = 0, double i = 0) : real(r), imag(i) {}
    
    // Operator overloading: +
    Complex operator+(const Complex& other) {
        return Complex(real + other.real, imag + other.imag);
    }
    
    // Operator overloading: -
    Complex operator-(const Complex& other) {
        return Complex(real - other.real, imag - other.imag);
    }
    
    // Operator overloading: *
    Complex operator*(const Complex& other) {
        return Complex(
            real * other.real - imag * other.imag,
            real * other.imag + imag * other.real
        );
    }
    
    // Operator overloading: ==
    bool operator==(const Complex& other) {
        return (real == other.real && imag == other.imag);
    }
    
    void display() {
        if (imag >= 0)
            cout << real << " + " << imag << "i";
        else
            cout << real << " - " << -imag << "i";
    }
};

// Function overloading
class Calculator {
public:
    // Add two integers
    int add(int a, int b) {
        return a + b;
    }
    
    // Add three integers
    int add(int a, int b, int c) {
        return a + b + c;
    }
    
    // Add two doubles
    double add(double a, double b) {
        return a + b;
    }
    
    // Add array of integers
    int add(int arr[], int size) {
        int sum = 0;
        for (int i = 0; i < size; i++) {
            sum += arr[i];
        }
        return sum;
    }
};

// Base class for runtime polymorphism
class Shape {
public:
    virtual double area() = 0;  // Pure virtual function
    virtual void display() {
        cout << "This is a shape" << endl;
    }
    virtual ~Shape() {}
};

class Circle : public Shape {
private:
    double radius;
    
public:
    Circle(double r) : radius(r) {}
    
    double area() override {
        return 3.14159 * radius * radius;
    }
    
    void display() override {
        cout << "Circle with radius " << radius << endl;
        cout << "Area: " << area() << endl;
    }
};

class Rectangle : public Shape {
private:
    double length;
    double width;
    
public:
    Rectangle(double l, double w) : length(l), width(w) {}
    
    double area() override {
        return length * width;
    }
    
    void display() override {
        cout << "Rectangle " << length << " x " << width << endl;
        cout << "Area: " << area() << endl;
    }
};

class Triangle : public Shape {
private:
    double base;
    double height;
    
public:
    Triangle(double b, double h) : base(b), height(h) {}
    
    double area() override {
        return 0.5 * base * height;
    }
    
    void display() override {
        cout << "Triangle with base " << base << " and height " << height << endl;
        cout << "Area: " << area() << endl;
    }
};

int main() {
    cout << "=== Operator Overloading ===" << endl;
    Complex c1(3, 4);
    Complex c2(1, 2);
    
    cout << "c1 = "; c1.display(); cout << endl;
    cout << "c2 = "; c2.display(); cout << endl;
    
    Complex c3 = c1 + c2;
    cout << "c1 + c2 = "; c3.display(); cout << endl;
    
    Complex c4 = c1 - c2;
    cout << "c1 - c2 = "; c4.display(); cout << endl;
    
    Complex c5 = c1 * c2;
    cout << "c1 * c2 = "; c5.display(); cout << endl;
    
    cout << "\n=== Function Overloading ===" << endl;
    Calculator calc;
    cout << "add(5, 3) = " << calc.add(5, 3) << endl;
    cout << "add(5, 3, 2) = " << calc.add(5, 3, 2) << endl;
    cout << "add(5.5, 3.2) = " << calc.add(5.5, 3.2) << endl;
    
    int arr[] = {1, 2, 3, 4, 5};
    cout << "add([1,2,3,4,5]) = " << calc.add(arr, 5) << endl;
    
    cout << "\n=== Runtime Polymorphism ===" << endl;
    Shape* shapes[3];
    shapes[0] = new Circle(5);
    shapes[1] = new Rectangle(4, 6);
    shapes[2] = new Triangle(3, 8);
    
    double totalArea = 0;
    for (int i = 0; i < 3; i++) {
        shapes[i]->display();
        totalArea += shapes[i]->area();
        cout << endl;
    }
    
    cout << "Total area of all shapes: " << totalArea << endl;
    
    // Clean up
    for (int i = 0; i < 3; i++) {
        delete shapes[i];
    }
    
    return 0;
}

/*
 * Sample Output:
 * === Operator Overloading ===
 * c1 = 3 + 4i
 * c2 = 1 + 2i
 * c1 + c2 = 4 + 6i
 * c1 - c2 = 2 + 2i
 * c1 * c2 = -5 + 10i
 * 
 * === Function Overloading ===
 * add(5, 3) = 8
 * add(5, 3, 2) = 10
 * add(5.5, 3.2) = 8.7
 * add([1,2,3,4,5]) = 15
 * 
 * === Runtime Polymorphism ===
 * Circle with radius 5
 * Area: 78.5397
 * 
 * Rectangle 4 x 6
 * Area: 24
 * 
 * Triangle with base 3 and height 8
 * Area: 12
 * 
 * Total area of all shapes: 114.54
 */
