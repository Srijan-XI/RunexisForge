package Question;
//Question: Implement recursive binary search on a sorted array.
public class Q7_Advanced_BinarySearchRecursive {
    static int binarySearch(int[] arr, int left, int right, int key) {
        if (left <= right) {
            int mid = left + (right - left) / 2;
            if (arr[mid] == key) return mid;
            if (arr[mid] > key) return binarySearch(arr, left, mid - 1, key);
            return binarySearch(arr, mid + 1, right, key);
        }
        return -1;
    }

    public static void main(String[] args) {
        int[] arr = {2, 4, 6, 8, 10, 12};
        int key = 10;
        int result = binarySearch(arr, 0, arr.length - 1, key);
        System.out.println(result == -1 ? "Not found" : "Found at index: " + result);
    }
}
// Output: The program will search for the number 10 in the sorted array {2, 4, 6, 8, 10, 12} and display "Found at index: 4".