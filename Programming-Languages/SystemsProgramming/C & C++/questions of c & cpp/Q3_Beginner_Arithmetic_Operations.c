/*
 * Question 3 (Beginner): Arithmetic Operations
 * 
 * Write a C program that performs basic arithmetic operations
 * on two numbers entered by the user.
 * 
 * Learning objectives:
 * - Use scanf() for user input
 * - Perform arithmetic operations (+, -, *, /, %)
 * - Handle division by zero
 */

#include <stdio.h>

int main() {
    int num1, num2;
    
    printf("Enter first number: ");
    scanf("%d", &num1);
    
    printf("Enter second number: ");
    scanf("%d", &num2);
    
    printf("\n=== Arithmetic Operations ===\n");
    printf("%d + %d = %d\n", num1, num2, num1 + num2);
    printf("%d - %d = %d\n", num1, num2, num1 - num2);
    printf("%d * %d = %d\n", num1, num2, num1 * num2);
    
    // Check for division by zero
    if (num2 != 0) {
        printf("%d / %d = %d\n", num1, num2, num1 / num2);
        printf("%d %% %d = %d\n", num1, num2, num1 % num2);
    } else {
        printf("Cannot divide by zero!\n");
    }
    
    return 0;
}

/*
 * Sample Output:
 * Enter first number: 15
 * Enter second number: 4
 * 
 * === Arithmetic Operations ===
 * 15 + 4 = 19
 * 15 - 4 = 11
 * 15 * 4 = 60
 * 15 / 4 = 3
 * 15 % 4 = 3
 */
