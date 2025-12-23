//Question: Demonstrate polymorphism using a virtual function in C++.
#include <iostream>
using namespace std;

class Base {
public:
    virtual void show() {
        cout << "Base class\n";
    }
};

class Derived : public Base {
public:
    void show() override {
        cout << "Derived class\n";
    }
};

int main() {
    Base* ptr;
    Derived d;
    ptr = &d;
    ptr->show();  // Outputs: Derived class
    return 0;
}
// This code demonstrates polymorphism using a virtual function in C++.