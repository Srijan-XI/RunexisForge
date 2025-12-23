/*
 * Question 5 (Beginner): Loops (for, while, do-while)
 * 
 * Write a C program that demonstrates all three types of loops
 * by printing numbers from 1 to 10.
 * 
 * Learning objectives:
 * - Understand for loop
 * - Understand while loop
 * - Understand do-while loop
 * - Know when to use each type
 */

#include <stdio.h>

int main() {
    int i;
    
    // For loop
    printf("For loop (1 to 10):\n");
    for (i = 1; i <= 10; i++) {
        printf("%d ", i);
    }
    printf("\n\n");
    
    // While loop
    printf("While loop (1 to 10):\n");
    i = 1;
    while (i <= 10) {
        printf("%d ", i);
        i++;
    }
    printf("\n\n");
    
    // Do-while loop
    printf("Do-while loop (1 to 10):\n");
    i = 1;
    do {
        printf("%d ", i);
        i++;
    } while (i <= 10);
    printf("\n\n");
    
    // Nested loop - multiplication table
    printf("Multiplication table (5x5):\n");
    for (int row = 1; row <= 5; row++) {
        for (int col = 1; col <= 5; col++) {
            printf("%3d ", row * col);
        }
        printf("\n");
    }
    
    return 0;
}

/*
 * Sample Output:
 * For loop (1 to 10):
 * 1 2 3 4 5 6 7 8 9 10 
 * 
 * While loop (1 to 10):
 * 1 2 3 4 5 6 7 8 9 10 
 * 
 * Do-while loop (1 to 10):
 * 1 2 3 4 5 6 7 8 9 10 
 * 
 * Multiplication table (5x5):
 *   1   2   3   4   5 
 *   2   4   6   8  10 
 *   3   6   9  12  15 
 *   4   8  12  16  20 
 *   5  10  15  20  25 
 */
