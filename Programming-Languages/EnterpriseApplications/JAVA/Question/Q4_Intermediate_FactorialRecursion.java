//Question: Write a program to find the factorial of a number using recursion.
public class Q4_Intermediate_FactorialRecursion {
    static int factorial(int n) {
        if (n <= 1)
            return 1;
        return n * factorial(n - 1);
    }

    public static void main(String[] args) {
        int num = 5;
        System.out.println("Factorial of " + num + " is " + factorial(num));
    }
}
// Output: The program will calculate and display the factorial of the number 5, which is 120.