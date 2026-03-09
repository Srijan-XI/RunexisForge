/*
Question 3: Check Even or Odd (Beginner)
----------------------------------------
Write a Go program that checks whether a given number is even or odd.

Learning Objectives:
- Using if-else statements
- Understanding the modulo operator (%)
- Working with conditional logic
- User-friendly output formatting
*/

package main

import "fmt"

// Function to check if number is even or odd
func checkEvenOdd(num int) string {
	if num%2 == 0 {
		return "even"
	}
	return "odd"
}

func main() {
	number := 42
	
	result := checkEvenOdd(number)
	fmt.Printf("%d is %s\n", number, result)
	
	// Test with another number
	number2 := 17
	result2 := checkEvenOdd(number2)
	fmt.Printf("%d is %s\n", number2, result2)
}
