/*
 * Question 19 (Advanced): Binary Search Tree
 * 
 * Write a C program that implements a binary search tree with:
 * - Insert node
 * - Search node
 * - Inorder traversal
 * - Preorder traversal
 * - Postorder traversal
 * - Find minimum and maximum
 * 
 * Learning objectives:
 * - Understand tree data structures
 * - Implement recursive algorithms
 * - Work with binary search tree properties
 */

#include <stdio.h>
#include <stdlib.h>

// Tree node structure
struct Node {
    int data;
    struct Node* left;
    struct Node* right;
};

// Create a new node
struct Node* createNode(int data) {
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    if (newNode == NULL) {
        printf("Memory allocation failed!\n");
        exit(1);
    }
    newNode->data = data;
    newNode->left = NULL;
    newNode->right = NULL;
    return newNode;
}

// Insert a node in BST
struct Node* insert(struct Node* root, int data) {
    if (root == NULL) {
        return createNode(data);
    }
    
    if (data < root->data) {
        root->left = insert(root->left, data);
    } else if (data > root->data) {
        root->right = insert(root->right, data);
    }
    // Duplicate values not inserted
    
    return root;
}

// Search for a value
struct Node* search(struct Node* root, int key) {
    if (root == NULL || root->data == key) {
        return root;
    }
    
    if (key < root->data) {
        return search(root->left, key);
    }
    
    return search(root->right, key);
}

// Find minimum value node
struct Node* findMin(struct Node* root) {
    while (root && root->left != NULL) {
        root = root->left;
    }
    return root;
}

// Find maximum value node
struct Node* findMax(struct Node* root) {
    while (root && root->right != NULL) {
        root = root->right;
    }
    return root;
}

// Inorder traversal (Left-Root-Right)
void inorderTraversal(struct Node* root) {
    if (root != NULL) {
        inorderTraversal(root->left);
        printf("%d ", root->data);
        inorderTraversal(root->right);
    }
}

// Preorder traversal (Root-Left-Right)
void preorderTraversal(struct Node* root) {
    if (root != NULL) {
        printf("%d ", root->data);
        preorderTraversal(root->left);
        preorderTraversal(root->right);
    }
}

// Postorder traversal (Left-Right-Root)
void postorderTraversal(struct Node* root) {
    if (root != NULL) {
        postorderTraversal(root->left);
        postorderTraversal(root->right);
        printf("%d ", root->data);
    }
}

// Count total nodes
int countNodes(struct Node* root) {
    if (root == NULL) {
        return 0;
    }
    return 1 + countNodes(root->left) + countNodes(root->right);
}

// Calculate height of tree
int height(struct Node* root) {
    if (root == NULL) {
        return -1;
    }
    
    int leftHeight = height(root->left);
    int rightHeight = height(root->right);
    
    return (leftHeight > rightHeight ? leftHeight : rightHeight) + 1;
}

// Delete a node
struct Node* deleteNode(struct Node* root, int key) {
    if (root == NULL) {
        return root;
    }
    
    if (key < root->data) {
        root->left = deleteNode(root->left, key);
    } else if (key > root->data) {
        root->right = deleteNode(root->right, key);
    } else {
        // Node with only one child or no child
        if (root->left == NULL) {
            struct Node* temp = root->right;
            free(root);
            return temp;
        } else if (root->right == NULL) {
            struct Node* temp = root->left;
            free(root);
            return temp;
        }
        
        // Node with two children
        struct Node* temp = findMin(root->right);
        root->data = temp->data;
        root->right = deleteNode(root->right, temp->data);
    }
    return root;
}

// Free tree memory
void freeTree(struct Node* root) {
    if (root != NULL) {
        freeTree(root->left);
        freeTree(root->right);
        free(root);
    }
}

int main() {
    struct Node* root = NULL;
    
    printf("=== Binary Search Tree ===\n\n");
    
    // Insert nodes
    printf("Inserting nodes: 50, 30, 70, 20, 40, 60, 80\n");
    root = insert(root, 50);
    root = insert(root, 30);
    root = insert(root, 70);
    root = insert(root, 20);
    root = insert(root, 40);
    root = insert(root, 60);
    root = insert(root, 80);
    
    // Tree structure:
    //        50
    //       /  \
    //      30   70
    //     / \   / \
    //    20 40 60 80
    
    printf("\nTree Traversals:\n");
    printf("Inorder   (sorted): ");
    inorderTraversal(root);
    printf("\n");
    
    printf("Preorder  (root first): ");
    preorderTraversal(root);
    printf("\n");
    
    printf("Postorder (root last): ");
    postorderTraversal(root);
    printf("\n\n");
    
    // Tree information
    printf("Total nodes: %d\n", countNodes(root));
    printf("Height: %d\n\n", height(root));
    
    // Find min and max
    struct Node* minNode = findMin(root);
    struct Node* maxNode = findMax(root);
    printf("Minimum value: %d\n", minNode->data);
    printf("Maximum value: %d\n\n", maxNode->data);
    
    // Search
    int key = 40;
    struct Node* found = search(root, key);
    if (found != NULL) {
        printf("Found %d in the tree\n", key);
    } else {
        printf("%d not found in the tree\n", key);
    }
    
    key = 100;
    found = search(root, key);
    if (found != NULL) {
        printf("Found %d in the tree\n", key);
    } else {
        printf("%d not found in the tree\n", key);
    }
    
    // Delete a node
    printf("\nDeleting node 30...\n");
    root = deleteNode(root, 30);
    printf("Inorder after deletion: ");
    inorderTraversal(root);
    printf("\n");
    
    // Clean up
    freeTree(root);
    printf("\nTree memory freed\n");
    
    return 0;
}

/*
 * Sample Output:
 * === Binary Search Tree ===
 * 
 * Inserting nodes: 50, 30, 70, 20, 40, 60, 80
 * 
 * Tree Traversals:
 * Inorder   (sorted): 20 30 40 50 60 70 80 
 * Preorder  (root first): 50 30 20 40 70 60 80 
 * Postorder (root last): 20 40 30 60 80 70 50 
 * 
 * Total nodes: 7
 * Height: 2
 * 
 * Minimum value: 20
 * Maximum value: 80
 * 
 * Found 40 in the tree
 * 100 not found in the tree
 * 
 * Deleting node 30...
 * Inorder after deletion: 20 40 50 60 70 80 
 * 
 * Tree memory freed
 */
