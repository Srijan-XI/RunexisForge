fn main() {
    let mut a = 5;
    let mut b = 10;

    println!("Before swap: a = {}, b = {}", a, b);

    a = a + b;
    b = a - b;
    a = a - b;

    println!("After swap: a = {}, b = {}", a, b);
}
