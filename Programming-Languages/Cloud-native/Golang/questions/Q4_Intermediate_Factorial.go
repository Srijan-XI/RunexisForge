/*
Question 4: Factorial Using Recursion (Intermediate)
---------------------------------------------------
Write a Go program to calculate the factorial of a number using recursion.

Learning Objectives:
- Understanding recursive functions
- Base case and recursive case implementation
- Working with integer calculations
- Handling edge cases

Formula: n! = n * (n-1)!
Example: 5! = 5 * 4 * 3 * 2 * 1 = 120
*/

package main

import "fmt"

// Recursive function to calculate factorial
func factorial(n int) int {
	// Base case: factorial of 0 or 1 is 1
	if n <= 1 {
		return 1
	}
	// Recursive case
	return n * factorial(n-1)
}

func main() {
	num := 5
	result := factorial(num)
	fmt.Printf("Factorial of %d is: %d\n", num, result)
	
	// Test with more examples
	testCases := []int{0, 1, 3, 6, 10}
	fmt.Println("\nFactorial table:")
	for _, n := range testCases {
		fmt.Printf("%d! = %d\n", n, factorial(n))
	}
}
