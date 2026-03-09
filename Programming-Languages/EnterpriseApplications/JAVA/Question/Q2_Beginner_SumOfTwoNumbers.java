//Question: Write a Java program that takes two integers as input and prints their sum.
import java.util.Scanner;

public class Q2_Beginner_SumOfTwoNumbers {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter two integers: ");
        int a = sc.nextInt();
        int b = sc.nextInt();
        System.out.println("Sum: " + (a + b));
        sc.close();
    }
}
// Output: The program will prompt the user to enter two integers and then display their sum.