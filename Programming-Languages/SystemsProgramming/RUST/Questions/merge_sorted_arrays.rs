fn merge(a: Vec<i32>, b: Vec<i32>) -> Vec<i32> {
    let mut merged = a;
    merged.extend(b);
    merged.sort();
    merged
}

fn main() {
    let a = vec![1, 3, 5];
    let b = vec![2, 4, 6];
    println!("{:?}", merge(a, b));
}
