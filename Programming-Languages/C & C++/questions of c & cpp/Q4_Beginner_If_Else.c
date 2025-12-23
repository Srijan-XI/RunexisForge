/*
 * Question 4 (Beginner): If-Else Statements
 * 
 * Write a C program that checks if a number is positive,
 * negative, or zero using if-else statements.
 * 
 * Learning objectives:
 * - Use if-else conditional statements
 * - Understand logical comparisons
 * - Practice nested conditions
 */

#include <stdio.h>

int main() {
    int number;
    
    printf("Enter a number: ");
    scanf("%d", &number);
    
    if (number > 0) {
        printf("%d is a positive number.\n", number);
        
        // Check if even or odd
        if (number % 2 == 0) {
            printf("It is also an even number.\n");
        } else {
            printf("It is also an odd number.\n");
        }
    } else if (number < 0) {
        printf("%d is a negative number.\n", number);
    } else {
        printf("The number is zero.\n");
    }
    
    return 0;
}

/*
 * Sample Output 1:
 * Enter a number: 42
 * 42 is a positive number.
 * It is also an even number.
 * 
 * Sample Output 2:
 * Enter a number: -5
 * -5 is a negative number.
 */
