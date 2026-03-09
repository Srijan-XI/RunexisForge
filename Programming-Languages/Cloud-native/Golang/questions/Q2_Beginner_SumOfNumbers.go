/*
Question 2: Sum of Two Numbers (Beginner)
-----------------------------------------
Write a Go program that takes two integers and returns their sum.

Learning Objectives:
- Understanding function declarations
- Working with parameters and return values
- Basic arithmetic operations
- Using fmt for formatted output
*/

package main

import "fmt"

// Function to add two numbers
func add(a int, b int) int {
	return a + b
}

func main() {
	num1 := 10
	num2 := 20
	
	sum := add(num1, num2)
	fmt.Printf("Sum of %d and %d is: %d\n", num1, num2, sum)
}
