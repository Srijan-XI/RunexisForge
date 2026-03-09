//Question: Write a C program using a function pointer array to perform operations.
#include <stdio.h>

int add(int a, int b) { return a + b; }
int sub(int a, int b) { return a - b; }

int main() {
    int (*funcArr[])(int, int) = { add, sub };
    int choice, x = 10, y = 5;

    printf("0 for add, 1 for sub: ");
    scanf("%d", &choice);
    printf("Result: %d\n", funcArr[choice](x, y));

    return 0;
}
// Output: The program will prompt the user to choose an operation (0 for addition, 1 for subtraction)