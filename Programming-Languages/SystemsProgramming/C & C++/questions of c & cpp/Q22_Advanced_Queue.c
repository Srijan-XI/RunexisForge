/*
 * Question 22 (Advanced): Queue Implementation
 * 
 * Write a C program that implements a circular queue with:
 * - Enqueue operation
 * - Dequeue operation
 * - Check if empty/full
 * - Display queue
 * 
 * Learning objectives:
 * - Understand queue data structure (FIFO)
 * - Implement circular queue
 * - Handle queue operations efficiently
 */

#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

#define MAX_SIZE 5

// Queue structure
struct Queue {
    int items[MAX_SIZE];
    int front;
    int rear;
    int count;
};

// Initialize queue
void initQueue(struct Queue* queue) {
    queue->front = 0;
    queue->rear = -1;
    queue->count = 0;
}

// Check if queue is empty
bool isEmpty(struct Queue* queue) {
    return queue->count == 0;
}

// Check if queue is full
bool isFull(struct Queue* queue) {
    return queue->count == MAX_SIZE;
}

// Get queue size
int size(struct Queue* queue) {
    return queue->count;
}

// Enqueue (add to rear)
void enqueue(struct Queue* queue, int value) {
    if (isFull(queue)) {
        printf("Queue Overflow! Cannot enqueue %d\n", value);
        return;
    }
    
    queue->rear = (queue->rear + 1) % MAX_SIZE;
    queue->items[queue->rear] = value;
    queue->count++;
    printf("Enqueued: %d\n", value);
}

// Dequeue (remove from front)
int dequeue(struct Queue* queue) {
    if (isEmpty(queue)) {
        printf("Queue Underflow! Cannot dequeue from empty queue\n");
        return -1;
    }
    
    int value = queue->items[queue->front];
    queue->front = (queue->front + 1) % MAX_SIZE;
    queue->count--;
    return value;
}

// Peek at front element
int peek(struct Queue* queue) {
    if (isEmpty(queue)) {
        printf("Queue is empty!\n");
        return -1;
    }
    
    return queue->items[queue->front];
}

// Display queue contents
void displayQueue(struct Queue* queue) {
    if (isEmpty(queue)) {
        printf("Queue is empty!\n");
        return;
    }
    
    printf("Queue (front to rear): ");
    int i = queue->front;
    for (int j = 0; j < queue->count; j++) {
        printf("%d ", queue->items[i]);
        i = (i + 1) % MAX_SIZE;
    }
    printf("\n");
}

// Priority Queue using array
struct PriorityQueue {
    struct {
        int value;
        int priority;
    } items[MAX_SIZE];
    int size;
};

void initPriorityQueue(struct PriorityQueue* pq) {
    pq->size = 0;
}

void priorityEnqueue(struct PriorityQueue* pq, int value, int priority) {
    if (pq->size >= MAX_SIZE) {
        printf("Priority Queue is full!\n");
        return;
    }
    
    // Find position to insert
    int i;
    for (i = pq->size - 1; i >= 0 && pq->items[i].priority > priority; i--) {
        pq->items[i + 1] = pq->items[i];
    }
    
    pq->items[i + 1].value = value;
    pq->items[i + 1].priority = priority;
    pq->size++;
    printf("Priority enqueued: value=%d, priority=%d\n", value, priority);
}

int priorityDequeue(struct PriorityQueue* pq) {
    if (pq->size == 0) {
        printf("Priority Queue is empty!\n");
        return -1;
    }
    
    int value = pq->items[0].value;
    for (int i = 0; i < pq->size - 1; i++) {
        pq->items[i] = pq->items[i + 1];
    }
    pq->size--;
    return value;
}

void displayPriorityQueue(struct PriorityQueue* pq) {
    if (pq->size == 0) {
        printf("Priority Queue is empty!\n");
        return;
    }
    
    printf("Priority Queue:\n");
    for (int i = 0; i < pq->size; i++) {
        printf("  Value: %d, Priority: %d\n", 
               pq->items[i].value, pq->items[i].priority);
    }
}

int main() {
    printf("=== Circular Queue Operations ===\n\n");
    
    struct Queue queue;
    initQueue(&queue);
    
    // Enqueue operations
    enqueue(&queue, 10);
    enqueue(&queue, 20);
    enqueue(&queue, 30);
    enqueue(&queue, 40);
    enqueue(&queue, 50);
    
    displayQueue(&queue);
    printf("Queue size: %d\n", size(&queue));
    printf("Front element: %d\n\n", peek(&queue));
    
    // Try to enqueue when full
    enqueue(&queue, 60);
    printf("\n");
    
    // Dequeue operations
    printf("Dequeued: %d\n", dequeue(&queue));
    printf("Dequeued: %d\n", dequeue(&queue));
    
    displayQueue(&queue);
    printf("Queue size: %d\n\n", size(&queue));
    
    // Enqueue more (circular behavior)
    enqueue(&queue, 60);
    enqueue(&queue, 70);
    
    displayQueue(&queue);
    printf("Queue size: %d\n\n", size(&queue));
    
    // Dequeue all
    printf("=== Dequeuing All Elements ===\n");
    while (!isEmpty(&queue)) {
        printf("Dequeued: %d\n", dequeue(&queue));
    }
    
    displayQueue(&queue);
    dequeue(&queue);  // Should show underflow
    
    // Priority Queue
    printf("\n=== Priority Queue Operations ===\n\n");
    struct PriorityQueue pq;
    initPriorityQueue(&pq);
    
    // Lower priority number = higher priority
    priorityEnqueue(&pq, 100, 3);
    priorityEnqueue(&pq, 200, 1);  // Highest priority
    priorityEnqueue(&pq, 300, 5);
    priorityEnqueue(&pq, 400, 2);
    priorityEnqueue(&pq, 500, 4);
    
    printf("\n");
    displayPriorityQueue(&pq);
    
    printf("\n=== Dequeuing by Priority ===\n");
    while (pq.size > 0) {
        printf("Dequeued: %d\n", priorityDequeue(&pq));
    }
    
    return 0;
}

/*
 * Sample Output:
 * === Circular Queue Operations ===
 * 
 * Enqueued: 10
 * Enqueued: 20
 * Enqueued: 30
 * Enqueued: 40
 * Enqueued: 50
 * Queue (front to rear): 10 20 30 40 50 
 * Queue size: 5
 * Front element: 10
 * 
 * Queue Overflow! Cannot enqueue 60
 * 
 * Dequeued: 10
 * Dequeued: 20
 * Queue (front to rear): 30 40 50 
 * Queue size: 3
 * 
 * Enqueued: 60
 * Enqueued: 70
 * Queue (front to rear): 30 40 50 60 70 
 * Queue size: 5
 * 
 * === Dequeuing All Elements ===
 * Dequeued: 30
 * Dequeued: 40
 * Dequeued: 50
 * Dequeued: 60
 * Dequeued: 70
 * Queue is empty!
 * Queue Underflow! Cannot dequeue from empty queue
 * 
 * === Priority Queue Operations ===
 * 
 * Priority enqueued: value=100, priority=3
 * Priority enqueued: value=200, priority=1
 * Priority enqueued: value=300, priority=5
 * Priority enqueued: value=400, priority=2
 * Priority enqueued: value=500, priority=4
 * 
 * Priority Queue:
 *   Value: 200, Priority: 1
 *   Value: 400, Priority: 2
 *   Value: 100, Priority: 3
 *   Value: 500, Priority: 4
 *   Value: 300, Priority: 5
 * 
 * === Dequeuing by Priority ===
 * Dequeued: 200
 * Dequeued: 400
 * Dequeued: 100
 * Dequeued: 500
 * Dequeued: 300
 */
