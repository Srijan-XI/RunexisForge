//Question: Write a program to check if a string is a palindrome.
public class Q5_Intermediate_PalindromeString {
    public static void main(String[] args) {
        String str = "madam";
        StringBuilder sb = new StringBuilder(str);
        String reversed = sb.reverse().toString();
        System.out.println(str.equals(reversed) ? "Palindrome" : "Not Palindrome");
    }
}
// Output: The program will check if the string "madam" is a palindrome and display "Palindrome".