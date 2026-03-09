/*
Question 10: File Operations (Advanced)
---------------------------------------
Write a Go program that demonstrates file I/O operations including:
- Creating and writing to a file
- Reading from a file
- Appending to a file
- Error handling

Learning Objectives:
- Working with os package for file operations
- Using bufio for efficient I/O
- Understanding defer for resource cleanup
- Proper error handling in Go
- File permissions in Unix-like systems
*/

package main

import (
	"bufio"
	"fmt"
	"os"
)

// Function to write content to a file
func writeToFile(filename string, content string) error {
	file, err := os.Create(filename)
	if err != nil {
		return fmt.Errorf("error creating file: %v", err)
	}
	defer file.Close() // Ensure file is closed when function returns
	
	writer := bufio.NewWriter(file)
	_, err = writer.WriteString(content)
	if err != nil {
		return fmt.Errorf("error writing to file: %v", err)
	}
	
	// Flush the buffer to ensure all data is written
	err = writer.Flush()
	if err != nil {
		return fmt.Errorf("error flushing buffer: %v", err)
	}
	
	fmt.Printf("✓ Successfully wrote to '%s'\n", filename)
	return nil
}

// Function to read content from a file
func readFromFile(filename string) (string, error) {
	file, err := os.Open(filename)
	if err != nil {
		return "", fmt.Errorf("error opening file: %v", err)
	}
	defer file.Close()
	
	scanner := bufio.NewScanner(file)
	content := ""
	
	for scanner.Scan() {
		content += scanner.Text() + "\n"
	}
	
	if err := scanner.Err(); err != nil {
		return "", fmt.Errorf("error reading file: %v", err)
	}
	
	fmt.Printf("✓ Successfully read from '%s'\n", filename)
	return content, nil
}

// Function to append content to a file
func appendToFile(filename string, content string) error {
	file, err := os.OpenFile(filename, os.O_APPEND|os.O_WRONLY, 0644)
	if err != nil {
		return fmt.Errorf("error opening file for append: %v", err)
	}
	defer file.Close()
	
	writer := bufio.NewWriter(file)
	_, err = writer.WriteString(content)
	if err != nil {
		return fmt.Errorf("error appending to file: %v", err)
	}
	
	err = writer.Flush()
	if err != nil {
		return fmt.Errorf("error flushing buffer: %v", err)
	}
	
	fmt.Printf("✓ Successfully appended to '%s'\n", filename)
	return nil
}

// Function to delete a file
func deleteFile(filename string) error {
	err := os.Remove(filename)
	if err != nil {
		return fmt.Errorf("error deleting file: %v", err)
	}
	fmt.Printf("✓ Successfully deleted '%s'\n", filename)
	return nil
}

// Function to check if file exists
func fileExists(filename string) bool {
	_, err := os.Stat(filename)
	return !os.IsNotExist(err)
}

func main() {
	filename := "test_file.txt"
	
	fmt.Println("=== File Operations Demo ===\n")
	
	// 1. Write to file
	fmt.Println("1. Writing to file...")
	initialContent := "Hello, Go!\nThis is a test file.\nLearning file operations.\n"
	if err := writeToFile(filename, initialContent); err != nil {
		fmt.Printf("Error: %v\n", err)
		return
	}
	
	// 2. Read from file
	fmt.Println("\n2. Reading from file...")
	content, err := readFromFile(filename)
	if err != nil {
		fmt.Printf("Error: %v\n", err)
		return
	}
	fmt.Println("\n--- File Content ---")
	fmt.Print(content)
	fmt.Println("--------------------")
	
	// 3. Append to file
	fmt.Println("\n3. Appending to file...")
	appendContent := "This line was appended.\nGo makes file I/O easy!\n"
	if err := appendToFile(filename, appendContent); err != nil {
		fmt.Printf("Error: %v\n", err)
		return
	}
	
	// 4. Read updated content
	fmt.Println("\n4. Reading updated file...")
	updatedContent, err := readFromFile(filename)
	if err != nil {
		fmt.Printf("Error: %v\n", err)
		return
	}
	fmt.Println("\n--- Updated Content ---")
	fmt.Print(updatedContent)
	fmt.Println("-----------------------")
	
	// 5. Check file existence
	fmt.Println("\n5. Checking file existence...")
	exists := fileExists(filename)
	fmt.Printf("File '%s' exists: %v\n", filename, exists)
	
	// 6. Delete file
	fmt.Println("\n6. Cleaning up (deleting file)...")
	if err := deleteFile(filename); err != nil {
		fmt.Printf("Error: %v\n", err)
		return
	}
	
	// 7. Verify deletion
	fmt.Println("\n7. Verifying deletion...")
	exists = fileExists(filename)
	fmt.Printf("File '%s' exists: %v\n", filename, exists)
	
	fmt.Println("\n=== File Operations Completed Successfully! ===")
}
