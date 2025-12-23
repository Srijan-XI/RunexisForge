//Question: Write a program in C to print the first n Fibonacci numbers.
#include <stdio.h>

int main() {
    int n, t1 = 0, t2 = 1, nextTerm;
    printf("Enter the number of terms: ");
    scanf("%d", &n);

    printf("Fibonacci Series: ");
    for (int i = 1; i <= n; ++i) {
        printf("%d ", t1);
        nextTerm = t1 + t2;
        t1 = t2;
        t2 = nextTerm;
    }

    return 0;
}
// Output: The program will print the first n Fibonacci numbers based on user input.