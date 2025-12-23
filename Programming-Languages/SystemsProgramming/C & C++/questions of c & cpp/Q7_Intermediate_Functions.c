/*
 * Question 7 (Intermediate): Functions
 * 
 * Write a C program that demonstrates:
 * - Function declaration and definition
 * - Pass by value
 * - Return values
 * - Multiple functions working together
 * 
 * Learning objectives:
 * - Create user-defined functions
 * - Understand function parameters and return types
 * - Practice function calling
 */

#include <stdio.h>

// Function declarations
int add(int a, int b);
int subtract(int a, int b);
int multiply(int a, int b);
float divide(int a, int b);
int isPrime(int n);
void printPrimes(int limit);

// Main function
int main() {
    int x = 15, y = 4;
    
    printf("=== Calculator Functions ===\n");
    printf("%d + %d = %d\n", x, y, add(x, y));
    printf("%d - %d = %d\n", x, y, subtract(x, y));
    printf("%d * %d = %d\n", x, y, multiply(x, y));
    printf("%d / %d = %.2f\n", x, y, divide(x, y));
    
    printf("\n=== Prime Numbers ===\n");
    printf("Is %d prime? %s\n", x, isPrime(x) ? "Yes" : "No");
    printf("Is %d prime? %s\n", 17, isPrime(17) ? "Yes" : "No");
    
    printf("\nPrime numbers up to 50:\n");
    printPrimes(50);
    
    return 0;
}

// Function definitions
int add(int a, int b) {
    return a + b;
}

int subtract(int a, int b) {
    return a - b;
}

int multiply(int a, int b) {
    return a * b;
}

float divide(int a, int b) {
    if (b == 0) {
        printf("Error: Division by zero!\n");
        return 0;
    }
    return (float)a / b;
}

int isPrime(int n) {
    if (n <= 1) return 0;
    if (n == 2) return 1;
    if (n % 2 == 0) return 0;
    
    for (int i = 3; i * i <= n; i += 2) {
        if (n % i == 0) return 0;
    }
    return 1;
}

void printPrimes(int limit) {
    for (int i = 2; i <= limit; i++) {
        if (isPrime(i)) {
            printf("%d ", i);
        }
    }
    printf("\n");
}

/*
 * Sample Output:
 * === Calculator Functions ===
 * 15 + 4 = 19
 * 15 - 4 = 11
 * 15 * 4 = 60
 * 15 / 4 = 3.75
 * 
 * === Prime Numbers ===
 * Is 15 prime? No
 * Is 17 prime? Yes
 * 
 * Prime numbers up to 50:
 * 2 3 5 7 11 13 17 19 23 29 31 37 41 43 47 
 */
