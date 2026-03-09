/*
 * Question 2 (Beginner): Variables and Data Types
 * 
 * Write a C program that demonstrates different data types:
 * - int, float, double, char
 * - Print their sizes and values
 * 
 * Learning objectives:
 * - Understand different data types in C
 * - Learn about sizeof operator
 * - Practice variable declaration and initialization
 */

#include <stdio.h>

int main() {
    // Integer types
    int age = 25;
    short score = 100;
    long population = 1000000L;
    
    // Floating point types
    float price = 99.99f;
    double pi = 3.14159265359;
    
    // Character type
    char grade = 'A';
    
    // Boolean (using int)
    int isActive = 1;  // 1 for true, 0 for false
    
    printf("=== Data Types in C ===\n\n");
    
    printf("Integer: %d, Size: %zu bytes\n", age, sizeof(age));
    printf("Short: %hd, Size: %zu bytes\n", score, sizeof(score));
    printf("Long: %ld, Size: %zu bytes\n", population, sizeof(population));
    printf("Float: %.2f, Size: %zu bytes\n", price, sizeof(price));
    printf("Double: %.10f, Size: %zu bytes\n", pi, sizeof(pi));
    printf("Char: %c, Size: %zu byte\n", grade, sizeof(grade));
    printf("Boolean (int): %d, Size: %zu bytes\n", isActive, sizeof(isActive));
    
    return 0;
}

/*
 * Sample Output:
 * === Data Types in C ===
 * 
 * Integer: 25, Size: 4 bytes
 * Short: 100, Size: 2 bytes
 * Long: 1000000, Size: 8 bytes
 * Float: 99.99, Size: 4 bytes
 * Double: 3.1415926536, Size: 8 bytes
 * Char: A, Size: 1 byte
 * Boolean (int): 1, Size: 4 bytes
 */
