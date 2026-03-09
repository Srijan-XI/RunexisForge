//Question: Create a C++ class for Complex numbers and overload the + operator.
#include <iostream>
using namespace std;

class Complex {
    float real, imag;
public:
    Complex(float r = 0, float i = 0) : real(r), imag(i) {}
    
    Complex operator+(const Complex &obj) {
        return Complex(real + obj.real, imag + obj.imag);
    }

    void display() {
        cout << real << " + " << imag << "i" << endl;
    }
};

int main() {
    Complex c1(2.5, 3.5), c2(1.6, 4.2);
    Complex c3 = c1 + c2;
    c3.display();
    return 0;
}
// Output: 4.1 + 7.7i
// This code defines a Complex class with a constructor, an overloaded + operator, and a display    