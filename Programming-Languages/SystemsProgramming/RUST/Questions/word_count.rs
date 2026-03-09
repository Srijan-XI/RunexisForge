use std::fs;

fn main() {
    let content = fs::read_to_string("sample.txt").expect("Unable to read file");
    let word_count = content.split_whitespace().count();
    println!("Word count: {}", word_count);
}
