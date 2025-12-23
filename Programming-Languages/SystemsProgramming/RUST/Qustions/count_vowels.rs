fn main() {
    let text = "Rust Programming Language";
    let count = text.chars()
                    .filter(|c| "aeiouAEIOU".contains(*c))
                    .count();
    println!("Vowel count: {}", count);
}
