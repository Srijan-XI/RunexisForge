/*
 * Question 6 (Intermediate): Arrays
 * 
 * Write a C program that:
 * - Declares and initializes an array
 * - Finds the largest and smallest elements
 * - Calculates the sum and average
 * 
 * Learning objectives:
 * - Declare and initialize arrays
 * - Access array elements
 * - Iterate through arrays
 * - Perform array operations
 */

#include <stdio.h>

int main() {
    int numbers[] = {45, 23, 67, 12, 89, 34, 56, 78, 90, 21};
    int size = sizeof(numbers) / sizeof(numbers[0]);
    
    int max = numbers[0];
    int min = numbers[0];
    int sum = 0;
    
    printf("Array elements: ");
    for (int i = 0; i < size; i++) {
        printf("%d ", numbers[i]);
        
        // Find max and min
        if (numbers[i] > max) {
            max = numbers[i];
        }
        if (numbers[i] < min) {
            min = numbers[i];
        }
        
        // Calculate sum
        sum += numbers[i];
    }
    printf("\n\n");
    
    double average = (double)sum / size;
    
    printf("Array size: %d\n", size);
    printf("Largest element: %d\n", max);
    printf("Smallest element: %d\n", min);
    printf("Sum of elements: %d\n", sum);
    printf("Average: %.2f\n", average);
    
    // Reverse the array
    printf("\nReversed array: ");
    for (int i = size - 1; i >= 0; i--) {
        printf("%d ", numbers[i]);
    }
    printf("\n");
    
    return 0;
}

/*
 * Sample Output:
 * Array elements: 45 23 67 12 89 34 56 78 90 21 
 * 
 * Array size: 10
 * Largest element: 90
 * Smallest element: 12
 * Sum of elements: 515
 * Average: 51.50
 * 
 * Reversed array: 21 90 78 56 34 89 12 67 23 45 
 */
