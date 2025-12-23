/*
 * Question 12 (Advanced): File Input/Output
 * 
 * Write a C program that demonstrates:
 * - Opening and closing files
 * - Reading from files
 * - Writing to files
 * - Error handling
 * 
 * Learning objectives:
 * - Use fopen(), fclose(), fprintf(), fscanf()
 * - Handle file operations safely
 * - Check for errors
 */

#include <stdio.h>
#include <stdlib.h>

int main() {
    FILE *file;
    char filename[] = "student_data.txt";
    
    printf("=== File I/O Operations ===\n\n");
    
    // Writing to file
    file = fopen(filename, "w");
    if (file == NULL) {
        printf("Error opening file for writing!\n");
        return 1;
    }
    
    fprintf(file, "Student Records\n");
    fprintf(file, "================\n");
    fprintf(file, "ID,Name,Age,GPA\n");
    fprintf(file, "101,Alice,20,3.8\n");
    fprintf(file, "102,Bob,21,3.5\n");
    fprintf(file, "103,Charlie,19,3.9\n");
    
    fclose(file);
    printf("Data written to %s\n\n", filename);
    
    // Reading from file
    file = fopen(filename, "r");
    if (file == NULL) {
        printf("Error opening file for reading!\n");
        return 1;
    }
    
    printf("Reading from %s:\n", filename);
    printf("----------------------------\n");
    
    char line[100];
    while (fgets(line, sizeof(line), file) != NULL) {
        printf("%s", line);
    }
    
    fclose(file);
    
    // Appending to file
    printf("\n\nAppending new record...\n");
    file = fopen(filename, "a");
    if (file != NULL) {
        fprintf(file, "104,Diana,22,3.7\n");
        fclose(file);
        printf("Record appended successfully!\n");
    }
    
    // Reading specific data
    printf("\n=== Parsing Student Data ===\n");
    file = fopen(filename, "r");
    if (file != NULL) {
        // Skip header lines
        for (int i = 0; i < 3; i++) {
            fgets(line, sizeof(line), file);
        }
        
        int id, age;
        char name[50];
        float gpa;
        
        printf("%-5s %-15s %-5s %-5s\n", "ID", "Name", "Age", "GPA");
        printf("-------------------------------------\n");
        
        while (fscanf(file, "%d,%49[^,],%d,%f\n", &id, name, &age, &gpa) == 4) {
            printf("%-5d %-15s %-5d %.2f\n", id, name, age, gpa);
        }
        
        fclose(file);
    }
    
    // Binary file operations
    printf("\n=== Binary File Operations ===\n");
    FILE *binFile = fopen("numbers.bin", "wb");
    if (binFile != NULL) {
        int numbers[] = {10, 20, 30, 40, 50};
        fwrite(numbers, sizeof(int), 5, binFile);
        fclose(binFile);
        printf("Binary data written to numbers.bin\n");
    }
    
    // Read binary file
    binFile = fopen("numbers.bin", "rb");
    if (binFile != NULL) {
        int readNumbers[5];
        fread(readNumbers, sizeof(int), 5, binFile);
        fclose(binFile);
        
        printf("Binary data read: ");
        for (int i = 0; i < 5; i++) {
            printf("%d ", readNumbers[i]);
        }
        printf("\n");
    }
    
    return 0;
}

/*
 * Sample Output:
 * === File I/O Operations ===
 * 
 * Data written to student_data.txt
 * 
 * Reading from student_data.txt:
 * ----------------------------
 * Student Records
 * ================
 * ID,Name,Age,GPA
 * 101,Alice,20,3.8
 * 102,Bob,21,3.5
 * 103,Charlie,19,3.9
 * 
 * Appending new record...
 * Record appended successfully!
 * 
 * === Parsing Student Data ===
 * ID    Name            Age   GPA  
 * -------------------------------------
 * 101   Alice           20    3.80
 * 102   Bob             21    3.50
 * 103   Charlie         19    3.90
 * 104   Diana           22    3.70
 * 
 * === Binary File Operations ===
 * Binary data written to numbers.bin
 * Binary data read: 10 20 30 40 50 
 */
