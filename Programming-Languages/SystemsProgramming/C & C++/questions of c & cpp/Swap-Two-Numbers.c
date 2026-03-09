//Question: Write a program in C to swap two numbers without using a third variable.
#include <stdio.h>

int main() {
    int a, b;
    printf("Enter two numbers: ");
    scanf("%d %d", &a, &b);

    a = a + b;
    b = a - b;
    a = a - b;

    printf("After swapping: a = %d, b = %d\n", a, b);
    return 0;
}
// Output: After swapping: a = <swapped value of a>, b = <swapped value of b>
// Example input: 5 10
// Example output: After swapping: a = 10, b = 5
// Note: This method uses arithmetic operations to swap the values without a third variable.
// This method works by first adding the two numbers and storing the result in 'a',
// then subtracting 'b' from 'a' to get the original value of 'a' in 'b',
// and finally subtracting the new 'b' from 'a' to get the original value   
// of 'b' in 'a'.
// This approach avoids the use of a temporary variable for swapping.   
// Ensure that the input numbers are within the range of int to avoid overflow.
// This code is a simple demonstration of swapping two numbers in C without using a third variable.