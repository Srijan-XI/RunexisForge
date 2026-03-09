fn is_armstrong(num: u32) -> bool {
    let digits: Vec<u32> = num.to_string().chars()
        .map(|d| d.to_digit(10).unwrap()).collect();
    let power = digits.len() as u32;
    let sum: u32 = digits.iter().map(|&d| d.pow(power)).sum();
    sum == num
}

fn main() {
    println!("{}", is_armstrong(153)); // true
}
