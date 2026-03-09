/*
 * Question 25 (Advanced): Sorting Algorithms Comparison
 * 
 * Write a C program that implements and compares:
 * - Bubble Sort
 * - Selection Sort
 * - Insertion Sort
 * - Quick Sort
 * - Merge Sort
 * 
 * Learning objectives:
 * - Understand different sorting algorithms
 * - Compare time complexities
 * - Implement recursive and iterative approaches
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>

// Utility function to print array
void printArray(int arr[], int size, const char* label) {
    printf("%s: ", label);
    for (int i = 0; i < size; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n");
}

// Utility function to copy array
void copyArray(int dest[], int src[], int size) {
    for (int i = 0; i < size; i++) {
        dest[i] = src[i];
    }
}

// ===== BUBBLE SORT =====
// Time: O(n²), Space: O(1)
void bubbleSort(int arr[], int size) {
    for (int i = 0; i < size - 1; i++) {
        int swapped = 0;
        for (int j = 0; j < size - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = 1;
            }
        }
        // If no swaps, array is sorted
        if (!swapped) break;
    }
}

// ===== SELECTION SORT =====
// Time: O(n²), Space: O(1)
void selectionSort(int arr[], int size) {
    for (int i = 0; i < size - 1; i++) {
        int minIndex = i;
        for (int j = i + 1; j < size; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        // Swap minimum with current position
        if (minIndex != i) {
            int temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;
        }
    }
}

// ===== INSERTION SORT =====
// Time: O(n²), Space: O(1)
void insertionSort(int arr[], int size) {
    for (int i = 1; i < size; i++) {
        int key = arr[i];
        int j = i - 1;
        
        // Move elements greater than key one position ahead
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}

// ===== QUICK SORT =====
// Time: O(n log n) average, O(n²) worst, Space: O(log n)

int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    
    int temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    
    return i + 1;
}

void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

// ===== MERGE SORT =====
// Time: O(n log n), Space: O(n)

void merge(int arr[], int left, int mid, int right) {
    int n1 = mid - left + 1;
    int n2 = right - mid;
    
    int* L = (int*)malloc(n1 * sizeof(int));
    int* R = (int*)malloc(n2 * sizeof(int));
    
    for (int i = 0; i < n1; i++)
        L[i] = arr[left + i];
    for (int j = 0; j < n2; j++)
        R[j] = arr[mid + 1 + j];
    
    int i = 0, j = 0, k = left;
    
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k++] = L[i++];
        } else {
            arr[k++] = R[j++];
        }
    }
    
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
    
    free(L);
    free(R);
}

void mergeSort(int arr[], int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }
}

// ===== HEAP SORT =====
// Time: O(n log n), Space: O(1)

void heapify(int arr[], int n, int i) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;
    
    if (left < n && arr[left] > arr[largest])
        largest = left;
    
    if (right < n && arr[right] > arr[largest])
        largest = right;
    
    if (largest != i) {
        int temp = arr[i];
        arr[i] = arr[largest];
        arr[largest] = temp;
        heapify(arr, n, largest);
    }
}

void heapSort(int arr[], int size) {
    // Build max heap
    for (int i = size / 2 - 1; i >= 0; i--)
        heapify(arr, size, i);
    
    // Extract elements from heap
    for (int i = size - 1; i > 0; i--) {
        int temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;
        heapify(arr, i, 0);
    }
}

int main() {
    int original[] = {64, 34, 25, 12, 22, 11, 90, 88, 45, 50, 33, 17};
    int size = sizeof(original) / sizeof(original[0]);
    int temp[size];
    
    printf("=== Sorting Algorithms Comparison ===\n\n");
    printArray(original, size, "Original Array");
    printf("\n");
    
    // Bubble Sort
    printf("=== Bubble Sort ===\n");
    printf("Time Complexity: O(n²), Space: O(1)\n");
    copyArray(temp, original, size);
    bubbleSort(temp, size);
    printArray(temp, size, "Sorted");
    printf("\n");
    
    // Selection Sort
    printf("=== Selection Sort ===\n");
    printf("Time Complexity: O(n²), Space: O(1)\n");
    copyArray(temp, original, size);
    selectionSort(temp, size);
    printArray(temp, size, "Sorted");
    printf("\n");
    
    // Insertion Sort
    printf("=== Insertion Sort ===\n");
    printf("Time Complexity: O(n²), Space: O(1)\n");
    copyArray(temp, original, size);
    insertionSort(temp, size);
    printArray(temp, size, "Sorted");
    printf("\n");
    
    // Quick Sort
    printf("=== Quick Sort ===\n");
    printf("Time Complexity: O(n log n) average, Space: O(log n)\n");
    copyArray(temp, original, size);
    quickSort(temp, 0, size - 1);
    printArray(temp, size, "Sorted");
    printf("\n");
    
    // Merge Sort
    printf("=== Merge Sort ===\n");
    printf("Time Complexity: O(n log n), Space: O(n)\n");
    copyArray(temp, original, size);
    mergeSort(temp, 0, size - 1);
    printArray(temp, size, "Sorted");
    printf("\n");
    
    // Heap Sort
    printf("=== Heap Sort ===\n");
    printf("Time Complexity: O(n log n), Space: O(1)\n");
    copyArray(temp, original, size);
    heapSort(temp, size);
    printArray(temp, size, "Sorted");
    printf("\n");
    
    // Performance comparison with larger array
    printf("=== Performance Test (10,000 elements) ===\n");
    int largeSize = 10000;
    int* largeArray = (int*)malloc(largeSize * sizeof(int));
    int* testArray = (int*)malloc(largeSize * sizeof(int));
    
    // Generate random array
    srand(time(NULL));
    for (int i = 0; i < largeSize; i++) {
        largeArray[i] = rand() % 10000;
    }
    
    clock_t start, end;
    double cpu_time;
    
    // Test Quick Sort
    copyArray(testArray, largeArray, largeSize);
    start = clock();
    quickSort(testArray, 0, largeSize - 1);
    end = clock();
    cpu_time = ((double)(end - start)) / CLOCKS_PER_SEC;
    printf("Quick Sort: %.6f seconds\n", cpu_time);
    
    // Test Merge Sort
    copyArray(testArray, largeArray, largeSize);
    start = clock();
    mergeSort(testArray, 0, largeSize - 1);
    end = clock();
    cpu_time = ((double)(end - start)) / CLOCKS_PER_SEC;
    printf("Merge Sort: %.6f seconds\n", cpu_time);
    
    // Test Heap Sort
    copyArray(testArray, largeArray, largeSize);
    start = clock();
    heapSort(testArray, largeSize);
    end = clock();
    cpu_time = ((double)(end - start)) / CLOCKS_PER_SEC;
    printf("Heap Sort:  %.6f seconds\n", cpu_time);
    
    free(largeArray);
    free(testArray);
    
    printf("\n=== Summary ===\n");
    printf("Best for small arrays: Insertion Sort\n");
    printf("Best average case: Quick Sort, Merge Sort, Heap Sort (O(n log n))\n");
    printf("Most stable: Merge Sort\n");
    printf("Least space: Bubble Sort, Selection Sort, Insertion Sort, Heap Sort (O(1))\n");
    
    return 0;
}

/*
 * Sample Output:
 * === Sorting Algorithms Comparison ===
 * 
 * Original Array: 64 34 25 12 22 11 90 88 45 50 33 17 
 * 
 * === Bubble Sort ===
 * Time Complexity: O(n²), Space: O(1)
 * Sorted: 11 12 17 22 25 33 34 45 50 64 88 90 
 * 
 * === Selection Sort ===
 * Time Complexity: O(n²), Space: O(1)
 * Sorted: 11 12 17 22 25 33 34 45 50 64 88 90 
 * 
 * === Insertion Sort ===
 * Time Complexity: O(n²), Space: O(1)
 * Sorted: 11 12 17 22 25 33 34 45 50 64 88 90 
 * 
 * === Quick Sort ===
 * Time Complexity: O(n log n) average, Space: O(log n)
 * Sorted: 11 12 17 22 25 33 34 45 50 64 88 90 
 * 
 * === Merge Sort ===
 * Time Complexity: O(n log n), Space: O(n)
 * Sorted: 11 12 17 22 25 33 34 45 50 64 88 90 
 * 
 * === Heap Sort ===
 * Time Complexity: O(n log n), Space: O(1)
 * Sorted: 11 12 17 22 25 33 34 45 50 64 88 90 
 * 
 * === Performance Test (10,000 elements) ===
 * Quick Sort: 0.001234 seconds
 * Merge Sort: 0.001567 seconds
 * Heap Sort:  0.001890 seconds
 * 
 * === Summary ===
 * Best for small arrays: Insertion Sort
 * Best average case: Quick Sort, Merge Sort, Heap Sort (O(n log n))
 * Most stable: Merge Sort
 * Least space: Bubble Sort, Selection Sort, Insertion Sort, Heap Sort (O(1))
 */
