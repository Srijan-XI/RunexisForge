/*
 * Question 18 (Advanced): Linked List Implementation
 * 
 * Write a C program that implements a singly linked list with:
 * - Insert at beginning
 * - Insert at end
 * - Delete node
 * - Search
 * - Display
 * 
 * Learning objectives:
 * - Understand linked list data structure
 * - Work with dynamic memory for nodes
 * - Implement basic list operations
 */

#include <stdio.h>
#include <stdlib.h>

// Node structure
struct Node {
    int data;
    struct Node* next;
};

// Function to create a new node
struct Node* createNode(int data) {
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    if (newNode == NULL) {
        printf("Memory allocation failed!\n");
        exit(1);
    }
    newNode->data = data;
    newNode->next = NULL;
    return newNode;
}

// Insert at the beginning
void insertAtBeginning(struct Node** head, int data) {
    struct Node* newNode = createNode(data);
    newNode->next = *head;
    *head = newNode;
    printf("Inserted %d at beginning\n", data);
}

// Insert at the end
void insertAtEnd(struct Node** head, int data) {
    struct Node* newNode = createNode(data);
    
    if (*head == NULL) {
        *head = newNode;
        printf("Inserted %d (first node)\n", data);
        return;
    }
    
    struct Node* temp = *head;
    while (temp->next != NULL) {
        temp = temp->next;
    }
    temp->next = newNode;
    printf("Inserted %d at end\n", data);
}

// Insert at specific position
void insertAtPosition(struct Node** head, int data, int position) {
    if (position == 0) {
        insertAtBeginning(head, data);
        return;
    }
    
    struct Node* newNode = createNode(data);
    struct Node* temp = *head;
    
    for (int i = 0; i < position - 1 && temp != NULL; i++) {
        temp = temp->next;
    }
    
    if (temp == NULL) {
        printf("Position out of bounds\n");
        free(newNode);
        return;
    }
    
    newNode->next = temp->next;
    temp->next = newNode;
    printf("Inserted %d at position %d\n", data, position);
}

// Delete node with specific value
void deleteNode(struct Node** head, int key) {
    struct Node* temp = *head;
    struct Node* prev = NULL;
    
    // If head node holds the key
    if (temp != NULL && temp->data == key) {
        *head = temp->next;
        free(temp);
        printf("Deleted %d\n", key);
        return;
    }
    
    // Search for the key
    while (temp != NULL && temp->data != key) {
        prev = temp;
        temp = temp->next;
    }
    
    // Key not found
    if (temp == NULL) {
        printf("%d not found in list\n", key);
        return;
    }
    
    // Unlink the node and free memory
    prev->next = temp->next;
    free(temp);
    printf("Deleted %d\n", key);
}

// Search for a value
int search(struct Node* head, int key) {
    struct Node* current = head;
    int position = 0;
    
    while (current != NULL) {
        if (current->data == key) {
            return position;
        }
        current = current->next;
        position++;
    }
    return -1;  // Not found
}

// Display the list
void displayList(struct Node* head) {
    if (head == NULL) {
        printf("List is empty\n");
        return;
    }
    
    struct Node* temp = head;
    printf("List: ");
    while (temp != NULL) {
        printf("%d -> ", temp->data);
        temp = temp->next;
    }
    printf("NULL\n");
}

// Get length of list
int getLength(struct Node* head) {
    int count = 0;
    struct Node* temp = head;
    while (temp != NULL) {
        count++;
        temp = temp->next;
    }
    return count;
}

// Reverse the list
void reverseList(struct Node** head) {
    struct Node* prev = NULL;
    struct Node* current = *head;
    struct Node* next = NULL;
    
    while (current != NULL) {
        next = current->next;
        current->next = prev;
        prev = current;
        current = next;
    }
    *head = prev;
    printf("List reversed\n");
}

// Free all nodes
void freeList(struct Node** head) {
    struct Node* temp;
    while (*head != NULL) {
        temp = *head;
        *head = (*head)->next;
        free(temp);
    }
    printf("List freed\n");
}

int main() {
    struct Node* head = NULL;
    
    printf("=== Linked List Operations ===\n\n");
    
    // Insert operations
    insertAtEnd(&head, 10);
    insertAtEnd(&head, 20);
    insertAtEnd(&head, 30);
    insertAtBeginning(&head, 5);
    insertAtPosition(&head, 15, 2);
    
    displayList(head);
    printf("Length: %d\n\n", getLength(head));
    
    // Search operation
    int key = 20;
    int pos = search(head, key);
    if (pos != -1) {
        printf("Found %d at position %d\n\n", key, pos);
    } else {
        printf("%d not found\n\n", key);
    }
    
    // Delete operation
    deleteNode(&head, 15);
    displayList(head);
    printf("\n");
    
    // Reverse operation
    reverseList(&head);
    displayList(head);
    printf("\n");
    
    // Try to delete non-existent node
    deleteNode(&head, 100);
    printf("\n");
    
    // Clean up
    freeList(&head);
    displayList(head);
    
    return 0;
}

/*
 * Sample Output:
 * === Linked List Operations ===
 * 
 * Inserted 10 (first node)
 * Inserted 20 at end
 * Inserted 30 at end
 * Inserted 5 at beginning
 * Inserted 15 at position 2
 * List: 5 -> 10 -> 15 -> 20 -> 30 -> NULL
 * Length: 5
 * 
 * Found 20 at position 3
 * 
 * Deleted 15
 * List: 5 -> 10 -> 20 -> 30 -> NULL
 * 
 * List reversed
 * List: 30 -> 20 -> 10 -> 5 -> NULL
 * 
 * 100 not found in list
 * 
 * List freed
 * List is empty
 */
