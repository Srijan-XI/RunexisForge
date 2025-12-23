/*
 * Question 9 (Intermediate): String Manipulation
 * 
 * Write a C program that performs various string operations:
 * - String length
 * - String copy
 * - String concatenation
 * - String comparison
 * - String reversal
 * 
 * Learning objectives:
 * - Work with character arrays (strings)
 * - Use string.h functions
 * - Implement custom string functions
 */

#include <stdio.h>
#include <string.h>

// Custom function to reverse a string
void reverseString(char str[]) {
    int len = strlen(str);
    for (int i = 0; i < len / 2; i++) {
        char temp = str[i];
        str[i] = str[len - 1 - i];
        str[len - 1 - i] = temp;
    }
}

// Custom function to count vowels
int countVowels(char str[]) {
    int count = 0;
    for (int i = 0; str[i] != '\0'; i++) {
        char c = str[i];
        if (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u' ||
            c == 'A' || c == 'E' || c == 'I' || c == 'O' || c == 'U') {
            count++;
        }
    }
    return count;
}

int main() {
    char str1[100] = "Hello";
    char str2[100] = "World";
    char str3[100];
    
    printf("=== String Operations ===\n\n");
    
    // String length
    printf("Length of \"%s\": %lu\n", str1, strlen(str1));
    
    // String copy
    strcpy(str3, str1);
    printf("After strcpy: str3 = \"%s\"\n", str3);
    
    // String concatenation
    strcat(str1, " ");
    strcat(str1, str2);
    printf("After concatenation: \"%s\"\n", str1);
    
    // String comparison
    char str4[] = "Hello";
    char str5[] = "Hello";
    if (strcmp(str4, str5) == 0) {
        printf("\"%s\" and \"%s\" are equal\n", str4, str5);
    }
    
    // String reversal
    char str6[] = "Programming";
    printf("\nOriginal string: \"%s\"\n", str6);
    reverseString(str6);
    printf("Reversed string: \"%s\"\n", str6);
    
    // Count vowels
    char str7[] = "Education";
    printf("\nNumber of vowels in \"%s\": %d\n", str7, countVowels(str7));
    
    // Character operations
    printf("\n=== Character Operations ===\n");
    char sentence[] = "Hello World 123";
    int letters = 0, digits = 0, spaces = 0;
    
    for (int i = 0; sentence[i] != '\0'; i++) {
        if ((sentence[i] >= 'a' && sentence[i] <= 'z') || 
            (sentence[i] >= 'A' && sentence[i] <= 'Z')) {
            letters++;
        } else if (sentence[i] >= '0' && sentence[i] <= '9') {
            digits++;
        } else if (sentence[i] == ' ') {
            spaces++;
        }
    }
    
    printf("String: \"%s\"\n", sentence);
    printf("Letters: %d, Digits: %d, Spaces: %d\n", letters, digits, spaces);
    
    return 0;
}

/*
 * Sample Output:
 * === String Operations ===
 * 
 * Length of "Hello": 5
 * After strcpy: str3 = "Hello"
 * After concatenation: "Hello World"
 * "Hello" and "Hello" are equal
 * 
 * Original string: "Programming"
 * Reversed string: "gnimmargorP"
 * 
 * Number of vowels in "Education": 5
 * 
 * === Character Operations ===
 * String: "Hello World 123"
 * Letters: 10, Digits: 3, Spaces: 2
 */
