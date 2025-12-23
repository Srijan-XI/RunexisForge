fn main() {
    let mut nums = vec![5, 2, 8, 1, 9];
    nums.sort();
    nums.dedup();
    println!("Second largest: {}", nums[nums.len()-2]);
}
