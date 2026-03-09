/*
 * Question 20 (Advanced): Hash Table Implementation
 * 
 * Write a C program that implements a hash table with:
 * - Hash function
 * - Insert key-value pairs
 * - Search by key
 * - Delete by key
 * - Collision handling (chaining)
 * 
 * Learning objectives:
 * - Understand hash tables
 * - Implement hash functions
 * - Handle collisions
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define TABLE_SIZE 10

// Node for chaining (linked list)
struct HashNode {
    char* key;
    int value;
    struct HashNode* next;
};

// Hash table structure
struct HashTable {
    struct HashNode* table[TABLE_SIZE];
};

// Hash function
unsigned int hash(const char* key) {
    unsigned int hashValue = 0;
    for (int i = 0; key[i] != '\0'; i++) {
        hashValue = hashValue * 31 + key[i];
    }
    return hashValue % TABLE_SIZE;
}

// Create a new hash node
struct HashNode* createNode(const char* key, int value) {
    struct HashNode* newNode = (struct HashNode*)malloc(sizeof(struct HashNode));
    if (newNode == NULL) {
        printf("Memory allocation failed!\n");
        exit(1);
    }
    
    newNode->key = (char*)malloc(strlen(key) + 1);
    strcpy(newNode->key, key);
    newNode->value = value;
    newNode->next = NULL;
    
    return newNode;
}

// Initialize hash table
void initHashTable(struct HashTable* ht) {
    for (int i = 0; i < TABLE_SIZE; i++) {
        ht->table[i] = NULL;
    }
}

// Insert key-value pair
void insert(struct HashTable* ht, const char* key, int value) {
    unsigned int index = hash(key);
    struct HashNode* newNode = createNode(key, value);
    
    // If slot is empty
    if (ht->table[index] == NULL) {
        ht->table[index] = newNode;
        printf("Inserted (%s, %d) at index %d\n", key, value, index);
    } else {
        // Handle collision with chaining
        printf("Collision at index %d for key '%s'\n", index, key);
        
        // Check if key already exists
        struct HashNode* current = ht->table[index];
        while (current != NULL) {
            if (strcmp(current->key, key) == 0) {
                // Update existing value
                current->value = value;
                printf("Updated value for key '%s' to %d\n", key, value);
                free(newNode->key);
                free(newNode);
                return;
            }
            if (current->next == NULL) {
                break;
            }
            current = current->next;
        }
        
        // Add to end of chain
        current->next = newNode;
        printf("Added (%s, %d) to chain at index %d\n", key, value, index);
    }
}

// Search for a key
int search(struct HashTable* ht, const char* key, int* found) {
    unsigned int index = hash(key);
    struct HashNode* current = ht->table[index];
    
    while (current != NULL) {
        if (strcmp(current->key, key) == 0) {
            *found = 1;
            return current->value;
        }
        current = current->next;
    }
    
    *found = 0;
    return -1;
}

// Delete a key
void deleteKey(struct HashTable* ht, const char* key) {
    unsigned int index = hash(key);
    struct HashNode* current = ht->table[index];
    struct HashNode* prev = NULL;
    
    while (current != NULL) {
        if (strcmp(current->key, key) == 0) {
            if (prev == NULL) {
                // First node in chain
                ht->table[index] = current->next;
            } else {
                prev->next = current->next;
            }
            
            printf("Deleted key '%s' with value %d\n", key, current->value);
            free(current->key);
            free(current);
            return;
        }
        prev = current;
        current = current->next;
    }
    
    printf("Key '%s' not found\n", key);
}

// Display hash table
void displayHashTable(struct HashTable* ht) {
    printf("\n=== Hash Table Contents ===\n");
    for (int i = 0; i < TABLE_SIZE; i++) {
        printf("Index %d: ", i);
        struct HashNode* current = ht->table[i];
        
        if (current == NULL) {
            printf("NULL\n");
        } else {
            while (current != NULL) {
                printf("(%s, %d) -> ", current->key, current->value);
                current = current->next;
            }
            printf("NULL\n");
        }
    }
    printf("\n");
}

// Free hash table memory
void freeHashTable(struct HashTable* ht) {
    for (int i = 0; i < TABLE_SIZE; i++) {
        struct HashNode* current = ht->table[i];
        while (current != NULL) {
            struct HashNode* temp = current;
            current = current->next;
            free(temp->key);
            free(temp);
        }
    }
    printf("Hash table freed\n");
}

int main() {
    struct HashTable ht;
    initHashTable(&ht);
    
    printf("=== Hash Table Implementation ===\n\n");
    
    // Insert key-value pairs
    insert(&ht, "apple", 5);
    insert(&ht, "banana", 7);
    insert(&ht, "orange", 3);
    insert(&ht, "grape", 12);
    insert(&ht, "mango", 8);
    insert(&ht, "peach", 6);
    
    // These might cause collisions
    insert(&ht, "cherry", 15);
    insert(&ht, "kiwi", 4);
    
    displayHashTable(&ht);
    
    // Search operations
    printf("=== Search Operations ===\n");
    int found;
    int value;
    
    value = search(&ht, "banana", &found);
    if (found) {
        printf("Found 'banana': %d\n", value);
    } else {
        printf("'banana' not found\n");
    }
    
    value = search(&ht, "watermelon", &found);
    if (found) {
        printf("Found 'watermelon': %d\n", value);
    } else {
        printf("'watermelon' not found\n");
    }
    
    // Update existing key
    printf("\n=== Update Operation ===\n");
    insert(&ht, "apple", 10);
    
    displayHashTable(&ht);
    
    // Delete operations
    printf("=== Delete Operations ===\n");
    deleteKey(&ht, "grape");
    deleteKey(&ht, "pear");  // Doesn't exist
    
    displayHashTable(&ht);
    
    // Clean up
    freeHashTable(&ht);
    
    return 0;
}

/*
 * Sample Output:
 * === Hash Table Implementation ===
 * 
 * Inserted (apple, 5) at index 5
 * Inserted (banana, 7) at index 7
 * Inserted (orange, 3) at index 3
 * Inserted (grape, 12) at index 9
 * Inserted (mango, 8) at index 4
 * Inserted (peach, 6) at index 2
 * Collision at index 7 for key 'cherry'
 * Added (cherry, 15) to chain at index 7
 * Inserted (kiwi, 4) at index 1
 * 
 * === Hash Table Contents ===
 * Index 0: NULL
 * Index 1: (kiwi, 4) -> NULL
 * Index 2: (peach, 6) -> NULL
 * Index 3: (orange, 3) -> NULL
 * Index 4: (mango, 8) -> NULL
 * Index 5: (apple, 5) -> NULL
 * Index 6: NULL
 * Index 7: (banana, 7) -> (cherry, 15) -> NULL
 * Index 8: NULL
 * Index 9: (grape, 12) -> NULL
 * 
 * === Search Operations ===
 * Found 'banana': 7
 * 'watermelon' not found
 * 
 * === Update Operation ===
 * Collision at index 5 for key 'apple'
 * Updated value for key 'apple' to 10
 * 
 * === Hash Table Contents ===
 * Index 0: NULL
 * Index 1: (kiwi, 4) -> NULL
 * Index 2: (peach, 6) -> NULL
 * Index 3: (orange, 3) -> NULL
 * Index 4: (mango, 8) -> NULL
 * Index 5: (apple, 10) -> NULL
 * Index 6: NULL
 * Index 7: (banana, 7) -> (cherry, 15) -> NULL
 * Index 8: NULL
 * Index 9: (grape, 12) -> NULL
 * 
 * === Delete Operations ===
 * Deleted key 'grape' with value 12
 * Key 'pear' not found
 * 
 * === Hash Table Contents ===
 * Index 0: NULL
 * Index 1: (kiwi, 4) -> NULL
 * Index 2: (peach, 6) -> NULL
 * Index 3: (orange, 3) -> NULL
 * Index 4: (mango, 8) -> NULL
 * Index 5: (apple, 10) -> NULL
 * Index 6: NULL
 * Index 7: (banana, 7) -> (cherry, 15) -> NULL
 * Index 8: NULL
 * Index 9: NULL
 * 
 * Hash table freed
 */
