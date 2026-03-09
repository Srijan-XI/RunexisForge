fn main() {
    let s = "level";
    let rev: String = s.chars().rev().collect();
    if s == rev {
        println!("Palindrome");
    } else {
        println!("Not a palindrome");
    }
}
