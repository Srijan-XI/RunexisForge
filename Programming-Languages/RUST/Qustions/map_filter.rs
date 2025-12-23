fn main() {
    let nums = vec![1, 2, 3, 4, 5, 6];
    let evens_squared: Vec<i32> = nums.iter()
        .filter(|&&x| x % 2 == 0)
        .map(|&x| x * x)
        .collect();
    println!("{:?}", evens_squared);
}
