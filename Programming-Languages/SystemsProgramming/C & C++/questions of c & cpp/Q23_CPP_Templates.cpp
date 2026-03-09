/*
 * Question 23 (C++): Templates and Generic Programming
 * 
 * Write a C++ program that demonstrates:
 * - Function templates
 * - Class templates
 * - Template specialization
 * - Generic data structures
 * 
 * Learning objectives:
 * - Create reusable code with templates
 * - Understand generic programming
 * - Implement type-safe generic functions
 */

#include <iostream>
#include <string>
#include <vector>
using namespace std;

// ===== FUNCTION TEMPLATES =====

// Generic function to find maximum
template <typename T>
T getMax(T a, T b) {
    return (a > b) ? a : b;
}

// Generic function to swap values
template <typename T>
void swap(T& a, T& b) {
    T temp = a;
    a = b;
    b = temp;
}

// Generic function to print array
template <typename T>
void printArray(T arr[], int size) {
    cout << "[";
    for (int i = 0; i < size; i++) {
        cout << arr[i];
        if (i < size - 1) cout << ", ";
    }
    cout << "]" << endl;
}

// Template with multiple parameters
template <typename T1, typename T2>
void displayPair(T1 first, T2 second) {
    cout << "(" << first << ", " << second << ")" << endl;
}

// ===== CLASS TEMPLATES =====

// Generic Stack class
template <typename T>
class Stack {
private:
    vector<T> elements;
    
public:
    void push(T element) {
        elements.push_back(element);
    }
    
    T pop() {
        if (elements.empty()) {
            throw runtime_error("Stack is empty!");
        }
        T top = elements.back();
        elements.pop_back();
        return top;
    }
    
    T peek() {
        if (elements.empty()) {
            throw runtime_error("Stack is empty!");
        }
        return elements.back();
    }
    
    bool isEmpty() {
        return elements.empty();
    }
    
    int size() {
        return elements.size();
    }
    
    void display() {
        cout << "Stack: ";
        for (auto& elem : elements) {
            cout << elem << " ";
        }
        cout << endl;
    }
};

// Generic Pair class
template <typename T1, typename T2>
class Pair {
private:
    T1 first;
    T2 second;
    
public:
    Pair(T1 f, T2 s) : first(f), second(s) {}
    
    T1 getFirst() { return first; }
    T2 getSecond() { return second; }
    
    void display() {
        cout << "(" << first << ", " << second << ")" << endl;
    }
};

// Generic Box class with multiple operations
template <typename T>
class Box {
private:
    T value;
    
public:
    Box(T v) : value(v) {}
    
    T getValue() { return value; }
    void setValue(T v) { value = v; }
    
    void display() {
        cout << "Box contains: " << value << endl;
    }
};

// ===== TEMPLATE SPECIALIZATION =====

// Specialized version for char*
template <>
class Box<const char*> {
private:
    string value;
    
public:
    Box(const char* v) : value(v) {}
    
    string getValue() { return value; }
    void setValue(const char* v) { value = v; }
    
    void display() {
        cout << "String Box contains: \"" << value << "\"" << endl;
    }
};

// ===== GENERIC ALGORITHMS =====

// Generic binary search
template <typename T>
int binarySearch(T arr[], int size, T target) {
    int left = 0, right = size - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (arr[mid] == target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return -1;  // Not found
}

// Generic bubble sort
template <typename T>
void bubbleSort(T arr[], int size) {
    for (int i = 0; i < size - 1; i++) {
        for (int j = 0; j < size - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
            }
        }
    }
}

int main() {
    cout << "=== Function Templates ===" << endl;
    
    cout << "Max of 10 and 20: " << getMax(10, 20) << endl;
    cout << "Max of 5.5 and 3.2: " << getMax(5.5, 3.2) << endl;
    cout << "Max of 'a' and 'z': " << getMax('a', 'z') << endl;
    
    int a = 5, b = 10;
    cout << "\nBefore swap: a=" << a << ", b=" << b << endl;
    swap(a, b);
    cout << "After swap: a=" << a << ", b=" << b << endl;
    
    cout << "\n=== Array Printing ===" << endl;
    int intArr[] = {1, 2, 3, 4, 5};
    double doubleArr[] = {1.1, 2.2, 3.3};
    string strArr[] = {"Hello", "World", "C++"};
    
    printArray(intArr, 5);
    printArray(doubleArr, 3);
    printArray(strArr, 3);
    
    cout << "\n=== Multiple Type Parameters ===" << endl;
    displayPair(10, "ten");
    displayPair(3.14, 'A');
    displayPair(string("Name"), 42);
    
    cout << "\n=== Class Templates - Stack ===" << endl;
    Stack<int> intStack;
    intStack.push(10);
    intStack.push(20);
    intStack.push(30);
    intStack.display();
    
    cout << "Popped: " << intStack.pop() << endl;
    cout << "Top: " << intStack.peek() << endl;
    
    Stack<string> stringStack;
    stringStack.push("First");
    stringStack.push("Second");
    stringStack.push("Third");
    stringStack.display();
    
    cout << "\n=== Pair Class ===" << endl;
    Pair<int, string> p1(1, "One");
    Pair<string, double> p2("Pi", 3.14159);
    
    p1.display();
    p2.display();
    
    cout << "\n=== Box Class ===" << endl;
    Box<int> intBox(42);
    Box<double> doubleBox(3.14);
    Box<string> stringBox("Hello Templates");
    
    intBox.display();
    doubleBox.display();
    stringBox.display();
    
    cout << "\n=== Template Specialization ===" << endl;
    Box<const char*> charBox("Specialized for C-strings");
    charBox.display();
    
    cout << "\n=== Generic Algorithms ===" << endl;
    int sortedArr[] = {1, 3, 5, 7, 9, 11, 13, 15};
    int target = 7;
    int index = binarySearch(sortedArr, 8, target);
    cout << "Binary search for " << target << ": found at index " << index << endl;
    
    int unsortedArr[] = {64, 34, 25, 12, 22, 11, 90};
    cout << "\nBefore sorting: ";
    printArray(unsortedArr, 7);
    
    bubbleSort(unsortedArr, 7);
    cout << "After sorting: ";
    printArray(unsortedArr, 7);
    
    return 0;
}

/*
 * Sample Output:
 * === Function Templates ===
 * Max of 10 and 20: 20
 * Max of 5.5 and 3.2: 5.5
 * Max of 'a' and 'z': z
 * 
 * Before swap: a=5, b=10
 * After swap: a=10, b=5
 * 
 * === Array Printing ===
 * [1, 2, 3, 4, 5]
 * [1.1, 2.2, 3.3]
 * [Hello, World, C++]
 * 
 * === Multiple Type Parameters ===
 * (10, ten)
 * (3.14, A)
 * (Name, 42)
 * 
 * === Class Templates - Stack ===
 * Stack: 10 20 30 
 * Popped: 30
 * Top: 20
 * Stack: First Second Third 
 * 
 * === Pair Class ===
 * (1, One)
 * (Pi, 3.14159)
 * 
 * === Box Class ===
 * Box contains: 42
 * Box contains: 3.14
 * Box contains: Hello Templates
 * 
 * === Template Specialization ===
 * String Box contains: "Specialized for C-strings"
 * 
 * === Generic Algorithms ===
 * Binary search for 7: found at index 3
 * 
 * Before sorting: [64, 34, 25, 12, 22, 11, 90]
 * After sorting: [11, 12, 22, 25, 34, 64, 90]
 */
