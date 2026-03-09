/*
Question 7: Bubble Sort (Intermediate)
-------------------------------------
Write a Go program to implement the Bubble Sort algorithm.

Learning Objectives:
- Understanding sorting algorithms
- Working with slices and arrays
- Nested loops implementation
- Swap operations
- Algorithm complexity awareness (O(n²))

Bubble Sort: Repeatedly steps through the list, compares adjacent elements
and swaps them if they're in the wrong order.
*/

package main

import "fmt"

// Function to perform bubble sort
func bubbleSort(arr []int) {
	n := len(arr)
	
	// Outer loop for passes
	for i := 0; i < n-1; i++ {
		swapped := false
		
		// Inner loop for comparisons
		for j := 0; j < n-i-1; j++ {
			// Swap if current element is greater than next
			if arr[j] > arr[j+1] {
				arr[j], arr[j+1] = arr[j+1], arr[j]
				swapped = true
			}
		}
		
		// If no swaps occurred, array is sorted
		if !swapped {
			break
		}
	}
}

func main() {
	numbers := []int{64, 34, 25, 12, 22, 11, 90}
	
	fmt.Println("Original array:", numbers)
	
	// Create a copy to preserve original
	sortedNumbers := make([]int, len(numbers))
	copy(sortedNumbers, numbers)
	
	bubbleSort(sortedNumbers)
	
	fmt.Println("Sorted array:  ", sortedNumbers)
	
	// Test with another array
	fmt.Println("\n--- Another Example ---")
	arr2 := []int{5, 2, 8, 1, 9, 3}
	fmt.Println("Before:", arr2)
	bubbleSort(arr2)
	fmt.Println("After: ", arr2)
}
