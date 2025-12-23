/*
 * Question 24 (C++): Move Semantics and Rvalue References
 * 
 * Write a C++ program that demonstrates:
 * - Rvalue references (&&)
 * - Move constructor
 * - Move assignment operator
 * - std::move
 * - Perfect forwarding
 * 
 * Learning objectives:
 * - Understand move semantics
 * - Optimize resource transfer
 * - Avoid unnecessary copying
 */

#include <iostream>
#include <string>
#include <vector>
#include <utility>  // for std::move
using namespace std;

// Class demonstrating move semantics
class DynamicArray {
private:
    int* data;
    size_t size;
    
public:
    // Constructor
    DynamicArray(size_t s) : size(s) {
        data = new int[size];
        for (size_t i = 0; i < size; i++) {
            data[i] = i + 1;
        }
        cout << "Constructor: Created array of size " << size << endl;
    }
    
    // Copy constructor (expensive)
    DynamicArray(const DynamicArray& other) : size(other.size) {
        data = new int[size];
        for (size_t i = 0; i < size; i++) {
            data[i] = other.data[i];
        }
        cout << "Copy Constructor: Copied array of size " << size << endl;
    }
    
    // Move constructor (efficient)
    DynamicArray(DynamicArray&& other) noexcept 
        : data(other.data), size(other.size) {
        other.data = nullptr;
        other.size = 0;
        cout << "Move Constructor: Moved array of size " << size << endl;
    }
    
    // Copy assignment operator
    DynamicArray& operator=(const DynamicArray& other) {
        if (this != &other) {
            delete[] data;
            size = other.size;
            data = new int[size];
            for (size_t i = 0; i < size; i++) {
                data[i] = other.data[i];
            }
            cout << "Copy Assignment: Copied array of size " << size << endl;
        }
        return *this;
    }
    
    // Move assignment operator
    DynamicArray& operator=(DynamicArray&& other) noexcept {
        if (this != &other) {
            delete[] data;
            data = other.data;
            size = other.size;
            other.data = nullptr;
            other.size = 0;
            cout << "Move Assignment: Moved array of size " << size << endl;
        }
        return *this;
    }
    
    // Destructor
    ~DynamicArray() {
        delete[] data;
        if (size > 0) {
            cout << "Destructor: Freed array of size " << size << endl;
        } else {
            cout << "Destructor: Freed moved-from object" << endl;
        }
    }
    
    void display() {
        if (data == nullptr) {
            cout << "Array is empty (moved from)" << endl;
            return;
        }
        cout << "Array[" << size << "]: ";
        for (size_t i = 0; i < min(size, size_t(10)); i++) {
            cout << data[i] << " ";
        }
        if (size > 10) cout << "...";
        cout << endl;
    }
};

// Function returning by value (demonstrates RVO)
DynamicArray createArray(size_t size) {
    cout << "\nInside createArray:" << endl;
    return DynamicArray(size);
}

// Function taking rvalue reference
void processArray(DynamicArray&& arr) {
    cout << "\nProcessing rvalue reference:" << endl;
    arr.display();
}

// Template with perfect forwarding
template <typename T>
void wrapper(T&& arg) {
    cout << "\nPerfect forwarding:" << endl;
    processArray(forward<T>(arg));
}

// String class with move semantics
class MyString {
private:
    char* str;
    size_t length;
    
public:
    // Constructor
    MyString(const char* s = "") {
        length = strlen(s);
        str = new char[length + 1];
        strcpy(str, s);
        cout << "MyString Constructor: \"" << str << "\"" << endl;
    }
    
    // Copy constructor
    MyString(const MyString& other) {
        length = other.length;
        str = new char[length + 1];
        strcpy(str, other.str);
        cout << "MyString Copy Constructor: \"" << str << "\"" << endl;
    }
    
    // Move constructor
    MyString(MyString&& other) noexcept {
        str = other.str;
        length = other.length;
        other.str = nullptr;
        other.length = 0;
        cout << "MyString Move Constructor" << endl;
    }
    
    // Destructor
    ~MyString() {
        delete[] str;
    }
    
    void display() {
        if (str) {
            cout << "MyString: \"" << str << "\"" << endl;
        } else {
            cout << "MyString: (moved from)" << endl;
        }
    }
};

int main() {
    cout << "=== Basic Move Semantics ===" << endl;
    
    DynamicArray arr1(5);
    arr1.display();
    
    // Move constructor
    cout << "\nMoving arr1 to arr2:" << endl;
    DynamicArray arr2 = move(arr1);
    arr2.display();
    arr1.display();  // arr1 is now in moved-from state
    
    cout << "\n=== Copy vs Move ===" << endl;
    
    DynamicArray arr3(3);
    
    // Copy
    cout << "\nCopying arr3 to arr4:" << endl;
    DynamicArray arr4 = arr3;
    arr3.display();
    arr4.display();
    
    // Move
    cout << "\nMoving arr3 to arr5:" << endl;
    DynamicArray arr5 = move(arr3);
    arr3.display();
    arr5.display();
    
    cout << "\n=== Return Value Optimization ===" << endl;
    DynamicArray arr6 = createArray(4);
    arr6.display();
    
    cout << "\n=== Move Assignment ===" << endl;
    DynamicArray arr7(2);
    DynamicArray arr8(3);
    
    cout << "\nBefore move assignment:" << endl;
    arr7.display();
    arr8.display();
    
    cout << "\nMove assigning arr8 to arr7:" << endl;
    arr7 = move(arr8);
    
    cout << "\nAfter move assignment:" << endl;
    arr7.display();
    arr8.display();
    
    cout << "\n=== Vector with Move Semantics ===" << endl;
    vector<DynamicArray> vec;
    
    cout << "\nAdding arrays to vector:" << endl;
    vec.push_back(DynamicArray(2));  // Temporary, will be moved
    
    DynamicArray arr9(3);
    vec.push_back(move(arr9));  // Explicitly move
    
    cout << "\n=== MyString Move Semantics ===" << endl;
    MyString s1("Hello");
    MyString s2("World");
    
    cout << "\nMoving s1:" << endl;
    MyString s3 = move(s1);
    s3.display();
    s1.display();
    
    cout << "\n=== STL Containers with Move ===" << endl;
    vector<string> vec1 = {"one", "two", "three"};
    
    cout << "Before move: vec1.size() = " << vec1.size() << endl;
    vector<string> vec2 = move(vec1);
    cout << "After move: vec1.size() = " << vec1.size() << endl;
    cout << "After move: vec2.size() = " << vec2.size() << endl;
    
    cout << "\n=== Program Ending ===" << endl;
    
    return 0;
}

/*
 * Sample Output:
 * === Basic Move Semantics ===
 * Constructor: Created array of size 5
 * Array[5]: 1 2 3 4 5 
 * 
 * Moving arr1 to arr2:
 * Move Constructor: Moved array of size 5
 * Array[5]: 1 2 3 4 5 
 * Array is empty (moved from)
 * 
 * === Copy vs Move ===
 * Constructor: Created array of size 3
 * 
 * Copying arr3 to arr4:
 * Copy Constructor: Copied array of size 3
 * Array[3]: 1 2 3 
 * Array[3]: 1 2 3 
 * 
 * Moving arr3 to arr5:
 * Move Constructor: Moved array of size 3
 * Array is empty (moved from)
 * Array[3]: 1 2 3 
 * 
 * === Return Value Optimization ===
 * 
 * Inside createArray:
 * Constructor: Created array of size 4
 * Array[4]: 1 2 3 4 
 * 
 * === Move Assignment ===
 * Constructor: Created array of size 2
 * Constructor: Created array of size 3
 * 
 * Before move assignment:
 * Array[2]: 1 2 
 * Array[3]: 1 2 3 
 * 
 * Move assigning arr8 to arr7:
 * Move Assignment: Moved array of size 3
 * 
 * After move assignment:
 * Array[3]: 1 2 3 
 * Array is empty (moved from)
 * 
 * === Vector with Move Semantics ===
 * 
 * Adding arrays to vector:
 * Constructor: Created array of size 2
 * Move Constructor: Moved array of size 2
 * Destructor: Freed moved-from object
 * Constructor: Created array of size 3
 * Move Constructor: Moved array of size 3
 * 
 * === MyString Move Semantics ===
 * MyString Constructor: "Hello"
 * MyString Constructor: "World"
 * 
 * Moving s1:
 * MyString Move Constructor
 * MyString: "Hello"
 * MyString: (moved from)
 * 
 * === STL Containers with Move ===
 * Before move: vec1.size() = 3
 * After move: vec1.size() = 0
 * After move: vec2.size() = 3
 * 
 * === Program Ending ===
 * Destructor: Freed moved-from object
 * Destructor: Freed array of size 3
 * Destructor: Freed array of size 2
 * Destructor: Freed array of size 3
 * Destructor: Freed moved-from object
 * Destructor: Freed array of size 3
 * Destructor: Freed array of size 3
 * Destructor: Freed array of size 4
 * Destructor: Freed array of size 3
 * Destructor: Freed array of size 3
 * Destructor: Freed array of size 5
 * Destructor: Freed moved-from object
 */
