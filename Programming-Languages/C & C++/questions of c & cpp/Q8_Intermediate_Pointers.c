/*
 * Question 8 (Intermediate): Pointers Basics
 * 
 * Write a C program that demonstrates:
 * - Pointer declaration and initialization
 * - Dereferencing pointers
 * - Pointer arithmetic
 * - Pointers with arrays
 * 
 * Learning objectives:
 * - Understand pointer concepts
 * - Use & (address-of) and * (dereference) operators
 * - Work with pointer arithmetic
 */

#include <stdio.h>

int main() {
    int num = 42;
    int *ptr = &num;
    
    printf("=== Basic Pointers ===\n");
    printf("Value of num: %d\n", num);
    printf("Address of num: %p\n", (void*)&num);
    printf("Value of ptr (address it holds): %p\n", (void*)ptr);
    printf("Value pointed to by ptr: %d\n", *ptr);
    
    // Modify value through pointer
    *ptr = 100;
    printf("\nAfter *ptr = 100:\n");
    printf("Value of num: %d\n", num);
    
    // Pointers with arrays
    printf("\n=== Pointers with Arrays ===\n");
    int arr[] = {10, 20, 30, 40, 50};
    int *arrPtr = arr;  // Array name is a pointer to first element
    
    printf("Array elements using pointer:\n");
    for (int i = 0; i < 5; i++) {
        printf("arr[%d] = %d, *(arrPtr + %d) = %d\n", 
               i, arr[i], i, *(arrPtr + i));
    }
    
    // Pointer arithmetic
    printf("\n=== Pointer Arithmetic ===\n");
    int *p = arr;
    printf("p points to: %d\n", *p);
    p++;
    printf("After p++, p points to: %d\n", *p);
    p += 2;
    printf("After p += 2, p points to: %d\n", *p);
    
    // Swap using pointers
    printf("\n=== Swap using Pointers ===\n");
    int a = 5, b = 10;
    int *pa = &a, *pb = &b;
    
    printf("Before swap: a = %d, b = %d\n", a, b);
    int temp = *pa;
    *pa = *pb;
    *pb = temp;
    printf("After swap: a = %d, b = %d\n", a, b);
    
    return 0;
}

/*
 * Sample Output:
 * === Basic Pointers ===
 * Value of num: 42
 * Address of num: 0x7ffc8c9d3a4c
 * Value of ptr (address it holds): 0x7ffc8c9d3a4c
 * Value pointed to by ptr: 42
 * 
 * After *ptr = 100:
 * Value of num: 100
 * 
 * === Pointers with Arrays ===
 * Array elements using pointer:
 * arr[0] = 10, *(arrPtr + 0) = 10
 * arr[1] = 20, *(arrPtr + 1) = 20
 * arr[2] = 30, *(arrPtr + 2) = 30
 * arr[3] = 40, *(arrPtr + 3) = 40
 * arr[4] = 50, *(arrPtr + 4) = 50
 * 
 * === Pointer Arithmetic ===
 * p points to: 10
 * After p++, p points to: 20
 * After p += 2, p points to: 40
 * 
 * === Swap using Pointers ===
 * Before swap: a = 5, b = 10
 * After swap: a = 10, b = 5
 */
