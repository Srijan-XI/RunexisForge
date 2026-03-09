/*
 * Question 17 (C++): Exception Handling
 * 
 * Write a C++ program that demonstrates:
 * - try-catch blocks
 * - Throwing exceptions
 * - Custom exception classes
 * - Exception specifications
 * 
 * Learning objectives:
 * - Handle runtime errors gracefully
 * - Create custom exceptions
 * - Use exception handling best practices
 */

#include <iostream>
#include <exception>
#include <stdexcept>
#include <string>
using namespace std;

// Custom exception class
class InsufficientFundsException : public exception {
private:
    string message;
    double balance;
    double requestedAmount;
    
public:
    InsufficientFundsException(double bal, double requested) 
        : balance(bal), requestedAmount(requested) {
        message = "Insufficient funds. Balance: $" + to_string(balance) + 
                  ", Requested: $" + to_string(requestedAmount);
    }
    
    const char* what() const noexcept override {
        return message.c_str();
    }
};

// Class with exception handling
class SafeBankAccount {
private:
    double balance;
    
public:
    SafeBankAccount(double initialBalance) : balance(initialBalance) {}
    
    void deposit(double amount) {
        if (amount <= 0) {
            throw invalid_argument("Deposit amount must be positive");
        }
        balance += amount;
        cout << "Deposited: $" << amount << endl;
    }
    
    void withdraw(double amount) {
        if (amount <= 0) {
            throw invalid_argument("Withdrawal amount must be positive");
        }
        if (amount > balance) {
            throw InsufficientFundsException(balance, amount);
        }
        balance -= amount;
        cout << "Withdrawn: $" << amount << endl;
    }
    
    double getBalance() const {
        return balance;
    }
};

// Function that throws exceptions
int divide(int a, int b) {
    if (b == 0) {
        throw runtime_error("Division by zero!");
    }
    return a / b;
}

// Function demonstrating multiple exception types
double calculateAverage(int* arr, int size) {
    if (arr == nullptr) {
        throw invalid_argument("Null pointer passed to calculateAverage");
    }
    if (size <= 0) {
        throw length_error("Array size must be positive");
    }
    
    int sum = 0;
    for (int i = 0; i < size; i++) {
        sum += arr[i];
    }
    return static_cast<double>(sum) / size;
}

int main() {
    cout << "=== Basic Exception Handling ===" << endl;
    
    // Example 1: Division by zero
    try {
        cout << "10 / 2 = " << divide(10, 2) << endl;
        cout << "10 / 0 = " << divide(10, 0) << endl;  // Throws exception
        cout << "This line won't execute" << endl;
    }
    catch (const runtime_error& e) {
        cout << "Error caught: " << e.what() << endl;
    }
    
    // Example 2: Bank account operations
    cout << "\n=== Bank Account Exceptions ===" << endl;
    SafeBankAccount account(1000);
    
    try {
        account.deposit(500);
        cout << "Balance: $" << account.getBalance() << endl;
        
        account.withdraw(200);
        cout << "Balance: $" << account.getBalance() << endl;
        
        // This will throw an exception
        account.withdraw(2000);
        cout << "This line won't execute" << endl;
    }
    catch (const InsufficientFundsException& e) {
        cout << "Custom exception caught: " << e.what() << endl;
    }
    catch (const invalid_argument& e) {
        cout << "Invalid argument: " << e.what() << endl;
    }
    
    // Example 3: Invalid operations
    cout << "\n=== Invalid Argument Exceptions ===" << endl;
    try {
        account.deposit(-100);
    }
    catch (const invalid_argument& e) {
        cout << "Error: " << e.what() << endl;
    }
    
    try {
        account.withdraw(-50);
    }
    catch (const invalid_argument& e) {
        cout << "Error: " << e.what() << endl;
    }
    
    // Example 4: Array operations
    cout << "\n=== Array Operation Exceptions ===" << endl;
    int numbers[] = {10, 20, 30, 40, 50};
    
    try {
        double avg = calculateAverage(numbers, 5);
        cout << "Average: " << avg << endl;
        
        // This will throw exception
        avg = calculateAverage(nullptr, 5);
    }
    catch (const invalid_argument& e) {
        cout << "Error: " << e.what() << endl;
    }
    catch (const length_error& e) {
        cout << "Error: " << e.what() << endl;
    }
    
    // Example 5: Catching all exceptions
    cout << "\n=== Catch All Exceptions ===" << endl;
    try {
        throw 42;  // Throwing an integer
    }
    catch (const exception& e) {
        cout << "Standard exception: " << e.what() << endl;
    }
    catch (...) {
        cout << "Unknown exception caught!" << endl;
    }
    
    // Example 6: Re-throwing exceptions
    cout << "\n=== Re-throwing Exceptions ===" << endl;
    try {
        try {
            throw runtime_error("Inner exception");
        }
        catch (const runtime_error& e) {
            cout << "Caught in inner catch: " << e.what() << endl;
            throw;  // Re-throw the exception
        }
    }
    catch (const runtime_error& e) {
        cout << "Caught in outer catch: " << e.what() << endl;
    }
    
    cout << "\nProgram completed successfully!" << endl;
    return 0;
}

/*
 * Sample Output:
 * === Basic Exception Handling ===
 * 10 / 2 = 5
 * Error caught: Division by zero!
 * 
 * === Bank Account Exceptions ===
 * Deposited: $500
 * Balance: $1500
 * Withdrawn: $200
 * Balance: $1300
 * Custom exception caught: Insufficient funds. Balance: $1300.000000, Requested: $2000.000000
 * 
 * === Invalid Argument Exceptions ===
 * Error: Deposit amount must be positive
 * Error: Withdrawal amount must be positive
 * 
 * === Array Operation Exceptions ===
 * Average: 30
 * Error: Null pointer passed to calculateAverage
 * 
 * === Catch All Exceptions ===
 * Unknown exception caught!
 * 
 * === Re-throwing Exceptions ===
 * Caught in inner catch: Inner exception
 * Caught in outer catch: Inner exception
 * 
 * Program completed successfully!
 */
