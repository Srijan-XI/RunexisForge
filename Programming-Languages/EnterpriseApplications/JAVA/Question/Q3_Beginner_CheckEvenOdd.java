//Question: Write a program to check whether a number is even or odd.
import java.util.Scanner;

public class Q3_Beginner_CheckEvenOdd {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a number: ");
        int num = sc.nextInt();
        System.out.println(num % 2 == 0 ? "Even" : "Odd");
        sc.close();
    }
}
// Output: The program will prompt the user to enter a number and then display whether it is even or odd.