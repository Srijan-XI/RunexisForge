/*
 * Question 21 (Advanced): Stack Implementation
 * 
 * Write a C program that implements a stack using array with:
 * - Push operation
 * - Pop operation
 * - Peek operation
 * - Check if empty/full
 * 
 * Learning objectives:
 * - Understand stack data structure (LIFO)
 * - Implement basic stack operations
 * - Handle overflow and underflow conditions
 */

#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

#define MAX_SIZE 100

// Stack structure
struct Stack {
    int items[MAX_SIZE];
    int top;
};

// Initialize stack
void initStack(struct Stack* stack) {
    stack->top = -1;
}

// Check if stack is empty
bool isEmpty(struct Stack* stack) {
    return stack->top == -1;
}

// Check if stack is full
bool isFull(struct Stack* stack) {
    return stack->top == MAX_SIZE - 1;
}

// Push element onto stack
void push(struct Stack* stack, int value) {
    if (isFull(stack)) {
        printf("Stack Overflow! Cannot push %d\n", value);
        return;
    }
    
    stack->items[++stack->top] = value;
    printf("Pushed: %d\n", value);
}

// Pop element from stack
int pop(struct Stack* stack) {
    if (isEmpty(stack)) {
        printf("Stack Underflow! Cannot pop from empty stack\n");
        return -1;
    }
    
    return stack->items[stack->top--];
}

// Peek at top element
int peek(struct Stack* stack) {
    if (isEmpty(stack)) {
        printf("Stack is empty!\n");
        return -1;
    }
    
    return stack->items[stack->top];
}

// Get size of stack
int size(struct Stack* stack) {
    return stack->top + 1;
}

// Display stack contents
void displayStack(struct Stack* stack) {
    if (isEmpty(stack)) {
        printf("Stack is empty!\n");
        return;
    }
    
    printf("Stack (top to bottom): ");
    for (int i = stack->top; i >= 0; i--) {
        printf("%d ", stack->items[i]);
    }
    printf("\n");
}

// Check if parentheses are balanced
bool areParenthesesBalanced(const char* expression) {
    struct Stack stack;
    initStack(&stack);
    
    for (int i = 0; expression[i] != '\0'; i++) {
        char ch = expression[i];
        
        if (ch == '(' || ch == '{' || ch == '[') {
            push(&stack, ch);
        } else if (ch == ')' || ch == '}' || ch == ']') {
            if (isEmpty(&stack)) {
                return false;
            }
            
            char top = pop(&stack);
            if ((ch == ')' && top != '(') ||
                (ch == '}' && top != '{') ||
                (ch == ']' && top != '[')) {
                return false;
            }
        }
    }
    
    return isEmpty(&stack);
}

// Reverse a string using stack
void reverseString(char* str) {
    struct Stack stack;
    initStack(&stack);
    
    // Push all characters
    for (int i = 0; str[i] != '\0'; i++) {
        push(&stack, str[i]);
    }
    
    // Pop all characters
    int i = 0;
    while (!isEmpty(&stack)) {
        str[i++] = pop(&stack);
    }
}

int main() {
    struct Stack stack;
    initStack(&stack);
    
    printf("=== Stack Operations ===\n\n");
    
    // Push operations
    push(&stack, 10);
    push(&stack, 20);
    push(&stack, 30);
    push(&stack, 40);
    push(&stack, 50);
    
    displayStack(&stack);
    printf("Stack size: %d\n", size(&stack));
    printf("Top element: %d\n\n", peek(&stack));
    
    // Pop operations
    printf("Popped: %d\n", pop(&stack));
    printf("Popped: %d\n", pop(&stack));
    
    displayStack(&stack);
    printf("Stack size: %d\n", size(&stack));
    printf("Top element: %d\n\n", peek(&stack));
    
    // Push more elements
    push(&stack, 60);
    push(&stack, 70);
    
    displayStack(&stack);
    printf("\n");
    
    // Test empty stack
    printf("=== Testing Empty Stack ===\n");
    struct Stack emptyStack;
    initStack(&emptyStack);
    
    printf("Is empty? %s\n", isEmpty(&emptyStack) ? "Yes" : "No");
    pop(&emptyStack);  // Should show underflow
    printf("\n");
    
    // Test balanced parentheses
    printf("=== Balanced Parentheses Checker ===\n");
    char expr1[] = "{[()]}";
    char expr2[] = "{[(])}";
    char expr3[] = "((a+b) * (c-d))";
    char expr4[] = "((a+b)";
    
    printf("'%s' is %s\n", expr1, 
           areParenthesesBalanced(expr1) ? "balanced" : "not balanced");
    printf("'%s' is %s\n", expr2, 
           areParenthesesBalanced(expr2) ? "balanced" : "not balanced");
    printf("'%s' is %s\n", expr3, 
           areParenthesesBalanced(expr3) ? "balanced" : "not balanced");
    printf("'%s' is %s\n", expr4, 
           areParenthesesBalanced(expr4) ? "balanced" : "not balanced");
    
    // Reverse string using stack
    printf("\n=== String Reversal ===\n");
    char str[] = "Hello World";
    printf("Original: %s\n", str);
    reverseString(str);
    printf("Reversed: %s\n", str);
    
    return 0;
}

/*
 * Sample Output:
 * === Stack Operations ===
 * 
 * Pushed: 10
 * Pushed: 20
 * Pushed: 30
 * Pushed: 40
 * Pushed: 50
 * Stack (top to bottom): 50 40 30 20 10 
 * Stack size: 5
 * Top element: 50
 * 
 * Popped: 50
 * Popped: 40
 * Stack (top to bottom): 30 20 10 
 * Stack size: 3
 * Top element: 30
 * 
 * Pushed: 60
 * Pushed: 70
 * Stack (top to bottom): 70 60 30 20 10 
 * 
 * === Testing Empty Stack ===
 * Is empty? Yes
 * Stack Underflow! Cannot pop from empty stack
 * 
 * === Balanced Parentheses Checker ===
 * '{[()]}' is balanced
 * '{[(])}' is not balanced
 * '((a+b) * (c-d))' is balanced
 * '((a+b)' is not balanced
 * 
 * === String Reversal ===
 * Original: Hello World
 * Reversed: dlroW olleH
 */
