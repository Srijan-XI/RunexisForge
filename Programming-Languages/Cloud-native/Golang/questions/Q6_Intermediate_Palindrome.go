/*
Question 6: Palindrome String Check (Intermediate)
-------------------------------------------------
Write a Go program to check if a given string is a palindrome.

Learning Objectives:
- String manipulation in Go
- Working with runes for Unicode support
- Using strings package
- Implementing comparison logic

A palindrome reads the same forwards and backwards.
Examples: "racecar", "madam", "level"
*/

package main

import (
	"fmt"
	"strings"
)

// Function to check if a string is palindrome
func isPalindrome(str string) bool {
	// Convert to lowercase and remove spaces
	str = strings.ToLower(strings.ReplaceAll(str, " ", ""))
	
	// Convert string to rune slice for proper Unicode handling
	runes := []rune(str)
	length := len(runes)
	
	// Compare characters from both ends
	for i := 0; i < length/2; i++ {
		if runes[i] != runes[length-1-i] {
			return false
		}
	}
	
	return true
}

func main() {
	testStrings := []string{
		"racecar",
		"hello",
		"madam",
		"A man a plan a canal Panama",
		"go",
		"level",
	}
	
	fmt.Println("Palindrome Check Results:")
	fmt.Println("-------------------------")
	for _, str := range testStrings {
		result := isPalindrome(str)
		fmt.Printf("'%s' -> %v\n", str, result)
	}
}
