/*
 * Question 11 (Advanced): Dynamic Memory Allocation
 * 
 * Write a C program that demonstrates:
 * - malloc(), calloc(), realloc(), free()
 * - Dynamic arrays
 * - Memory management best practices
 * 
 * Learning objectives:
 * - Allocate memory dynamically
 * - Resize allocated memory
 * - Free allocated memory to prevent leaks
 */

#include <stdio.h>
#include <stdlib.h>

int main() {
    int n, *arr, *temp;
    
    printf("=== Dynamic Memory Allocation ===\n\n");
    
    // Using malloc
    printf("Enter number of elements: ");
    scanf("%d", &n);
    
    arr = (int*)malloc(n * sizeof(int));
    
    if (arr == NULL) {
        printf("Memory allocation failed!\n");
        return 1;
    }
    
    printf("Enter %d elements:\n", n);
    for (int i = 0; i < n; i++) {
        scanf("%d", &arr[i]);
    }
    
    printf("Array elements: ");
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n\n");
    
    // Using realloc to resize
    printf("Expanding array to %d elements...\n", n + 3);
    temp = (int*)realloc(arr, (n + 3) * sizeof(int));
    
    if (temp == NULL) {
        printf("Reallocation failed!\n");
        free(arr);
        return 1;
    }
    
    arr = temp;
    printf("Enter 3 more elements:\n");
    for (int i = n; i < n + 3; i++) {
        scanf("%d", &arr[i]);
    }
    
    n = n + 3;
    printf("Updated array: ");
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n\n");
    
    // Using calloc (initialized to zero)
    int *zeroes = (int*)calloc(5, sizeof(int));
    if (zeroes != NULL) {
        printf("Array allocated with calloc (initialized to 0):\n");
        for (int i = 0; i < 5; i++) {
            printf("%d ", zeroes[i]);
        }
        printf("\n\n");
        free(zeroes);
    }
    
    // Dynamic 2D array
    int rows = 3, cols = 4;
    int **matrix = (int**)malloc(rows * sizeof(int*));
    for (int i = 0; i < rows; i++) {
        matrix[i] = (int*)malloc(cols * sizeof(int));
    }
    
    // Fill matrix
    printf("Dynamic 2D array (3x4):\n");
    int value = 1;
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            matrix[i][j] = value++;
            printf("%3d ", matrix[i][j]);
        }
        printf("\n");
    }
    
    // Free 2D array
    for (int i = 0; i < rows; i++) {
        free(matrix[i]);
    }
    free(matrix);
    
    // Free 1D array
    free(arr);
    
    printf("\nAll memory freed successfully!\n");
    
    return 0;
}

/*
 * Sample Output:
 * === Dynamic Memory Allocation ===
 * 
 * Enter number of elements: 3
 * Enter 3 elements:
 * 10 20 30
 * Array elements: 10 20 30 
 * 
 * Expanding array to 6 elements...
 * Enter 3 more elements:
 * 40 50 60
 * Updated array: 10 20 30 40 50 60 
 * 
 * Array allocated with calloc (initialized to 0):
 * 0 0 0 0 0 
 * 
 * Dynamic 2D array (3x4):
 *   1   2   3   4 
 *   5   6   7   8 
 *   9  10  11  12 
 * 
 * All memory freed successfully!
 */
