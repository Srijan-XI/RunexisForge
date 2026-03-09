/*
Question 8: Struct and Methods (Advanced)
----------------------------------------
Write a Go program demonstrating structs and methods by creating a Person struct
with fields and methods to display information and calculate age.

Learning Objectives:
- Defining and using structs
- Creating methods with receivers
- Understanding value vs pointer receivers
- Working with struct initialization
- Encapsulation in Go
*/

package main

import (
	"fmt"
	"time"
)

// Person struct definition
type Person struct {
	FirstName string
	LastName  string
	BirthYear int
	Email     string
}

// Method with value receiver - returns full name
func (p Person) FullName() string {
	return p.FirstName + " " + p.LastName
}

// Method with value receiver - calculates age
func (p Person) Age() int {
	currentYear := time.Now().Year()
	return currentYear - p.BirthYear
}

// Method with value receiver - displays information
func (p Person) DisplayInfo() {
	fmt.Println("=== Person Information ===")
	fmt.Printf("Name: %s\n", p.FullName())
	fmt.Printf("Age: %d years\n", p.Age())
	fmt.Printf("Email: %s\n", p.Email)
	fmt.Println("========================")
}

// Method with pointer receiver - updates email
func (p *Person) UpdateEmail(newEmail string) {
	p.Email = newEmail
	fmt.Printf("Email updated to: %s\n", newEmail)
}

func main() {
	// Creating a Person instance
	person1 := Person{
		FirstName: "John",
		LastName:  "Doe",
		BirthYear: 1990,
		Email:     "john.doe@example.com",
	}
	
	// Using methods
	person1.DisplayInfo()
	
	// Update email using pointer receiver method
	fmt.Println("\nUpdating email...")
	person1.UpdateEmail("john.new@example.com")
	
	// Display updated information
	fmt.Println()
	person1.DisplayInfo()
	
	// Creating another person
	person2 := Person{"Alice", "Smith", 1985, "alice@example.com"}
	fmt.Println()
	person2.DisplayInfo()
}
