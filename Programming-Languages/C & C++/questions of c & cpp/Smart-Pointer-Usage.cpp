//Question: Demonstrate the use of std::unique_ptr in C++.
#include <iostream>
#include <memory>   // For std::unique_ptr
#include <string>
#include <vector>
#include <algorithm> // For std::for_each
using namespace std;
class Demo {
public:
    Demo() { cout << "Constructor\n"; }
    ~Demo() { cout << "Destructor\n"; }
    void display() { cout << "Using unique_ptr\n"; }
};

int main() {
    unique_ptr<Demo> ptr = make_unique<Demo>();
    ptr->display();
    return 0;
}