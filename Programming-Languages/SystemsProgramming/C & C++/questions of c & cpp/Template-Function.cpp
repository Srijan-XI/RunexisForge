//Question: Write a function template in C++ to find the maximum of two values.
#include <iostream>
using namespace std;

template <typename T>
T getMax(T a, T b) {
    return (a > b) ? a : b;
}

int main() {
    cout << "Max int: " << getMax(5, 10) << endl;
    cout << "Max double: " << getMax(2.3, 1.7) << endl;
    cout << "Max char: " << getMax('g', 'e') << endl;
    return 0;
}
// Output:
// Max int: 10  
// Max double: 2.3
// Max char: g