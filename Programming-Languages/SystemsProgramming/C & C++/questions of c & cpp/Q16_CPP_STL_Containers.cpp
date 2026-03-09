/*
 * Question 16 (C++): STL Containers (vector, map, set)
 * 
 * Write a C++ program that demonstrates:
 * - vector operations
 * - map (key-value pairs)
 * - set (unique elements)
 * - Common STL algorithms
 * 
 * Learning objectives:
 * - Use STL containers effectively
 * - Understand when to use each container
 * - Apply STL algorithms
 */

#include <iostream>
#include <vector>
#include <map>
#include <set>
#include <algorithm>
#include <string>
using namespace std;

int main() {
    // ===== VECTOR =====
    cout << "=== STL Vector ===" << endl;
    vector<int> numbers;
    
    // Adding elements
    numbers.push_back(10);
    numbers.push_back(20);
    numbers.push_back(30);
    numbers.push_back(40);
    numbers.push_back(50);
    
    cout << "Vector elements: ";
    for (int num : numbers) {
        cout << num << " ";
    }
    cout << endl;
    
    cout << "Size: " << numbers.size() << endl;
    cout << "First element: " << numbers.front() << endl;
    cout << "Last element: " << numbers.back() << endl;
    
    // Insert at position
    numbers.insert(numbers.begin() + 2, 25);
    cout << "After inserting 25 at index 2: ";
    for (int num : numbers) {
        cout << num << " ";
    }
    cout << endl;
    
    // Remove last element
    numbers.pop_back();
    cout << "After pop_back: ";
    for (int num : numbers) {
        cout << num << " ";
    }
    cout << endl;
    
    // Sorting
    vector<int> unsorted = {45, 12, 67, 23, 89, 34};
    sort(unsorted.begin(), unsorted.end());
    cout << "Sorted vector: ";
    for (int num : unsorted) {
        cout << num << " ";
    }
    cout << endl;
    
    // ===== MAP =====
    cout << "\n=== STL Map ===" << endl;
    map<string, int> scores;
    
    // Adding key-value pairs
    scores["Alice"] = 95;
    scores["Bob"] = 87;
    scores["Charlie"] = 92;
    scores["Diana"] = 88;
    
    cout << "Student scores:" << endl;
    for (auto& pair : scores) {
        cout << pair.first << ": " << pair.second << endl;
    }
    
    // Accessing elements
    cout << "\nBob's score: " << scores["Bob"] << endl;
    
    // Check if key exists
    string searchName = "Eve";
    if (scores.find(searchName) != scores.end()) {
        cout << searchName << " found!" << endl;
    } else {
        cout << searchName << " not found!" << endl;
    }
    
    // Update value
    scores["Bob"] = 90;
    cout << "Bob's updated score: " << scores["Bob"] << endl;
    
    // ===== SET =====
    cout << "\n=== STL Set ===" << endl;
    set<int> uniqueNumbers;
    
    // Adding elements (duplicates automatically ignored)
    uniqueNumbers.insert(5);
    uniqueNumbers.insert(2);
    uniqueNumbers.insert(8);
    uniqueNumbers.insert(2);  // Duplicate
    uniqueNumbers.insert(5);  // Duplicate
    uniqueNumbers.insert(1);
    
    cout << "Set elements (sorted, unique): ";
    for (int num : uniqueNumbers) {
        cout << num << " ";
    }
    cout << endl;
    
    // Check if element exists
    int searchNum = 8;
    if (uniqueNumbers.find(searchNum) != uniqueNumbers.end()) {
        cout << searchNum << " is in the set" << endl;
    }
    
    // Remove element
    uniqueNumbers.erase(2);
    cout << "After removing 2: ";
    for (int num : uniqueNumbers) {
        cout << num << " ";
    }
    cout << endl;
    
    // ===== MULTIMAP =====
    cout << "\n=== STL Multimap ===" << endl;
    multimap<string, string> contacts;
    
    contacts.insert({"Emergency", "911"});
    contacts.insert({"Emergency", "112"});
    contacts.insert({"Home", "555-1234"});
    contacts.insert({"Work", "555-5678"});
    
    cout << "Emergency contacts:" << endl;
    auto range = contacts.equal_range("Emergency");
    for (auto it = range.first; it != range.second; ++it) {
        cout << it->first << ": " << it->second << endl;
    }
    
    // ===== STL ALGORITHMS =====
    cout << "\n=== STL Algorithms ===" << endl;
    vector<int> data = {3, 1, 4, 1, 5, 9, 2, 6, 5};
    
    cout << "Original: ";
    for (int n : data) cout << n << " ";
    cout << endl;
    
    // Find maximum
    auto maxIt = max_element(data.begin(), data.end());
    cout << "Maximum: " << *maxIt << endl;
    
    // Find minimum
    auto minIt = min_element(data.begin(), data.end());
    cout << "Minimum: " << *minIt << endl;
    
    // Count occurrences
    int countOf5 = count(data.begin(), data.end(), 5);
    cout << "Count of 5: " << countOf5 << endl;
    
    // Reverse
    reverse(data.begin(), data.end());
    cout << "Reversed: ";
    for (int n : data) cout << n << " ";
    cout << endl;
    
    return 0;
}

/*
 * Sample Output:
 * === STL Vector ===
 * Vector elements: 10 20 30 40 50 
 * Size: 5
 * First element: 10
 * Last element: 50
 * After inserting 25 at index 2: 10 20 25 30 40 50 
 * After pop_back: 10 20 25 30 40 
 * Sorted vector: 12 23 34 45 67 89 
 * 
 * === STL Map ===
 * Student scores:
 * Alice: 95
 * Bob: 87
 * Charlie: 92
 * Diana: 88
 * 
 * Bob's score: 87
 * Eve not found!
 * Bob's updated score: 90
 * 
 * === STL Set ===
 * Set elements (sorted, unique): 1 2 5 8 
 * 8 is in the set
 * After removing 2: 1 5 8 
 * 
 * === STL Multimap ===
 * Emergency contacts:
 * Emergency: 911
 * Emergency: 112
 * 
 * === STL Algorithms ===
 * Original: 3 1 4 1 5 9 2 6 5 
 * Maximum: 9
 * Minimum: 1
 * Count of 5: 2
 * Reversed: 5 6 2 9 5 1 4 1 3 
 */
