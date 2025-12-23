/*
Question 5: Fibonacci Series (Intermediate)
------------------------------------------
Write a Go program to generate the Fibonacci series up to n terms.

Learning Objectives:
- Working with loops
- Understanding sequence generation
- Using slices to store data
- Iterative algorithm implementation

Fibonacci sequence: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34...
Each number is the sum of the two preceding ones.
*/

package main

import "fmt"

// Function to generate Fibonacci series
func fibonacci(n int) []int {
	if n <= 0 {
		return []int{}
	}
	if n == 1 {
		return []int{0}
	}
	
	fib := make([]int, n)
	fib[0] = 0
	fib[1] = 1
	
	for i := 2; i < n; i++ {
		fib[i] = fib[i-1] + fib[i-2]
	}
	
	return fib
}

func main() {
	terms := 10
	series := fibonacci(terms)
	
	fmt.Printf("Fibonacci series up to %d terms:\n", terms)
	for i, num := range series {
		fmt.Printf("F(%d) = %d\n", i, num)
	}
	
	// Display as a single line
	fmt.Println("\nSeries:", series)
}
