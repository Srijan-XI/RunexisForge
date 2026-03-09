/*
 * Question 10 (Intermediate): Structures (struct)
 * 
 * Write a C program that:
 * - Defines a structure
 * - Creates and initializes structure variables
 * - Accesses structure members
 * - Uses arrays of structures
 * 
 * Learning objectives:
 * - Define and use structures
 * - Access structure members with dot operator
 * - Work with arrays of structures
 * - Pass structures to functions
 */

#include <stdio.h>
#include <string.h>

// Define a structure for Student
struct Student {
    int id;
    char name[50];
    int age;
    float gpa;
};

// Function to display student information
void displayStudent(struct Student s) {
    printf("\n--- Student Information ---\n");
    printf("ID: %d\n", s.id);
    printf("Name: %s\n", s.name);
    printf("Age: %d\n", s.age);
    printf("GPA: %.2f\n", s.gpa);
}

// Function to find student with highest GPA
struct Student findTopStudent(struct Student students[], int size) {
    struct Student top = students[0];
    for (int i = 1; i < size; i++) {
        if (students[i].gpa > top.gpa) {
            top = students[i];
        }
    }
    return top;
}

int main() {
    // Create and initialize a single student
    struct Student student1;
    student1.id = 101;
    strcpy(student1.name, "Alice Johnson");
    student1.age = 20;
    student1.gpa = 3.8;
    
    // Display student
    displayStudent(student1);
    
    // Create array of students
    struct Student classroom[3] = {
        {102, "Bob Smith", 21, 3.5},
        {103, "Charlie Brown", 19, 3.9},
        {104, "Diana Prince", 22, 3.7}
    };
    
    printf("\n=== All Students ===\n");
    for (int i = 0; i < 3; i++) {
        displayStudent(classroom[i]);
    }
    
    // Find top student
    struct Student topStudent = findTopStudent(classroom, 3);
    printf("\n=== Top Student ===\n");
    displayStudent(topStudent);
    
    // Calculate average GPA
    float totalGPA = 0;
    for (int i = 0; i < 3; i++) {
        totalGPA += classroom[i].gpa;
    }
    printf("\nAverage GPA: %.2f\n", totalGPA / 3);
    
    // Nested structure example
    struct Address {
        char street[100];
        char city[50];
        int zipcode;
    };
    
    struct Person {
        char name[50];
        int age;
        struct Address address;
    };
    
    struct Person person = {
        "John Doe",
        30,
        {"123 Main St", "New York", 10001}
    };
    
    printf("\n=== Person with Address ===\n");
    printf("Name: %s\n", person.name);
    printf("Age: %d\n", person.age);
    printf("Address: %s, %s %d\n", 
           person.address.street, 
           person.address.city, 
           person.address.zipcode);
    
    return 0;
}

/*
 * Sample Output:
 * --- Student Information ---
 * ID: 101
 * Name: Alice Johnson
 * Age: 20
 * GPA: 3.80
 * 
 * === All Students ===
 * 
 * --- Student Information ---
 * ID: 102
 * Name: Bob Smith
 * Age: 21
 * GPA: 3.50
 * 
 * --- Student Information ---
 * ID: 103
 * Name: Charlie Brown
 * Age: 19
 * GPA: 3.90
 * 
 * --- Student Information ---
 * ID: 104
 * Name: Diana Prince
 * Age: 22
 * GPA: 3.70
 * 
 * === Top Student ===
 * 
 * --- Student Information ---
 * ID: 103
 * Name: Charlie Brown
 * Age: 19
 * GPA: 3.90
 * 
 * Average GPA: 3.70
 * 
 * === Person with Address ===
 * Name: John Doe
 * Age: 30
 * Address: 123 Main St, New York 10001
 */
