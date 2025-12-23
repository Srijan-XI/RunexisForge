/*
 * Question 13 (C++): Introduction to Classes and Objects
 * 
 * Write a C++ program that demonstrates:
 * - Class declaration and definition
 * - Constructor and destructor
 * - Member functions
 * - Access specifiers (public, private)
 * 
 * Learning objectives:
 * - Understand OOP concepts
 * - Create and use classes
 * - Implement encapsulation
 */

#include <iostream>
#include <string>
using namespace std;

class BankAccount {
private:
    string accountHolder;
    int accountNumber;
    double balance;
    
public:
    // Constructor
    BankAccount(string name, int accNum, double initialBalance) {
        accountHolder = name;
        accountNumber = accNum;
        balance = initialBalance;
        cout << "Account created for " << name << endl;
    }
    
    // Destructor
    ~BankAccount() {
        cout << "Account " << accountNumber << " closed" << endl;
    }
    
    // Member functions
    void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            cout << "Deposited: $" << amount << endl;
        } else {
            cout << "Invalid deposit amount!" << endl;
        }
    }
    
    void withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            cout << "Withdrawn: $" << amount << endl;
        } else {
            cout << "Insufficient funds or invalid amount!" << endl;
        }
    }
    
    void displayInfo() {
        cout << "\n--- Account Information ---" << endl;
        cout << "Holder: " << accountHolder << endl;
        cout << "Account Number: " << accountNumber << endl;
        cout << "Balance: $" << balance << endl;
    }
    
    double getBalance() {
        return balance;
    }
};

int main() {
    cout << "=== Banking System ===" << endl << endl;
    
    // Create account
    BankAccount account1("John Doe", 12345, 1000.0);
    account1.displayInfo();
    
    // Perform transactions
    cout << "\nPerforming transactions..." << endl;
    account1.deposit(500.0);
    account1.withdraw(200.0);
    account1.withdraw(2000.0);  // Should fail
    
    account1.displayInfo();
    
    // Create another account
    cout << "\n";
    BankAccount account2("Jane Smith", 67890, 2000.0);
    account2.deposit(1000.0);
    account2.displayInfo();
    
    return 0;
}

/*
 * Sample Output:
 * === Banking System ===
 * 
 * Account created for John Doe
 * 
 * --- Account Information ---
 * Holder: John Doe
 * Account Number: 12345
 * Balance: $1000
 * 
 * Performing transactions...
 * Deposited: $500
 * Withdrawn: $200
 * Insufficient funds or invalid amount!
 * 
 * --- Account Information ---
 * Holder: John Doe
 * Account Number: 12345
 * Balance: $1300
 * 
 * Account created for Jane Smith
 * Deposited: $1000
 * 
 * --- Account Information ---
 * Holder: Jane Smith
 * Account Number: 67890
 * Balance: $3000
 * Account 67890 closed
 * Account 12345 closed
 */
