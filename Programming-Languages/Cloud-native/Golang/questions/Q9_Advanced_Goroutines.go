/*
Question 9: Goroutines and Channels (Advanced)
----------------------------------------------
Write a Go program demonstrating concurrent programming using goroutines and channels.
Calculate squares of numbers concurrently and collect results.

Learning Objectives:
- Understanding goroutines (lightweight threads)
- Using channels for communication
- Synchronizing concurrent operations
- Working with buffered channels
- Understanding Go's concurrency model

Key Concepts:
- goroutine: lightweight thread managed by Go runtime
- channel: typed conduit for sending/receiving values
- WaitGroups or channel-based synchronization
*/

package main

import (
	"fmt"
	"time"
)

// Function to calculate square and send to channel
func calculateSquare(num int, resultChan chan<- int) {
	// Simulate some processing time
	time.Sleep(time.Millisecond * 100)
	
	square := num * num
	fmt.Printf("Goroutine: Calculated square of %d = %d\n", num, square)
	
	// Send result to channel
	resultChan <- square
}

// Function to demonstrate concurrent processing
func processNumbers(numbers []int) []int {
	// Create buffered channel to hold results
	resultChan := make(chan int, len(numbers))
	
	// Launch goroutines for each number
	for _, num := range numbers {
		go calculateSquare(num, resultChan)
	}
	
	// Collect results from channel
	results := make([]int, len(numbers))
	for i := 0; i < len(numbers); i++ {
		results[i] = <-resultChan
	}
	
	close(resultChan)
	return results
}

// Simple producer-consumer example
func producerConsumer() {
	messages := make(chan string, 3) // Buffered channel
	
	// Producer goroutine
	go func() {
		messages <- "Hello"
		messages <- "from"
		messages <- "Go!"
		close(messages)
	}()
	
	// Consumer (main goroutine)
	fmt.Println("\nProducer-Consumer Example:")
	for msg := range messages {
		fmt.Println("Received:", msg)
		time.Sleep(time.Millisecond * 500)
	}
}

func main() {
	fmt.Println("=== Concurrent Square Calculation ===")
	numbers := []int{1, 2, 3, 4, 5, 6, 7, 8}
	
	startTime := time.Now()
	results := processNumbers(numbers)
	elapsed := time.Since(startTime)
	
	fmt.Println("\n--- Results ---")
	for i, num := range numbers {
		fmt.Printf("%d² = %d\n", num, results[i])
	}
	fmt.Printf("\nTotal time: %v\n", elapsed)
	
	// Demonstrate producer-consumer pattern
	fmt.Println("\n" + "=".repeat(40))
	producerConsumer()
	
	fmt.Println("\nAll goroutines completed!")
}

// Helper function to repeat strings (Go doesn't have built-in repeat)
func repeat(s string, count int) string {
	result := ""
	for i := 0; i < count; i++ {
		result += s
	}
	return result
}
