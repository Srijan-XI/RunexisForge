## Rust Programming: Comprehensive Guide \& Practice Questions

### 1. Installation Guides

**Windows**

- Download Rust's installer (`rustup-init.exe`) from [rustup.rs].
- Run the installer and follow on-screen instructions.
- Open Command Prompt and verify with:

```bash
rustc --version
cargo --version
```bash

- Update Rust: `rustup update`.

**Linux**

- Open the terminal and run:

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```bash

- Follow installation prompts.
- Reload your shell or restart terminal:

```bash
source $HOME/.cargo/env
```bash

- Verify:

```bash
rustc --version
cargo --version
```bash

**macOS**

- Open Terminal and run:

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```bash

- Follow installation instructions.
- To update, run: `rustup update`.

: Installation guides are available at the official Rust page.

***

### 2. Usage Examples – Basic Syntax \& Starter Scripts

**Hello World**

```rust
fn main() {
    println!("Hello, world!");
}
```bash

**Variables \& Types**

```rust
fn main() {
    let x: i32 = 5;
    let y = 10.0; // f64 by default
    println!("x = {}, y = {}", x, y);
}
```bash

**Control Flow**

```rust
fn main() {
    for i in 1..4 {
        if i % 2 == 0 {
            println!("{} is even", i);
        } else {
            println!("{} is odd", i);
        }
    }
}
```bash

***

### 3. Platform Coverage

| Platform | Installation Command/URL | Notes |
| :-- | :-- | :-- |
| Windows | rustup-init.exe | Installer GUI |
| Linux | curl | sh |
| macOS | curl | sh |

***

### 4. Tooling Help: IDE Setup, Compilers, Package Managers

- **Official Compiler**: rustc
- **Package Manager**: Cargo – bundled with rustup
- **Popular IDEs**:
  - VSCode (with Rust Analyzer extension)
  - IntelliJ IDEA (with Rust plugin)
  - CLion (Rust plugin support)
- **Editor Setup Example (VSCode)**:

1. Install [VSCode].
2. Install "Rust Analyzer" extension.
3. Open your Rust project or run `cargo new my_project`.

***

### 5. Troubleshooting Tips

- **Common Issue: rustc or cargo not found**
  - Ensure `$HOME/.cargo/bin` is in your PATH.
- **Outdated Rust version**
  - Run `rustup update`.
- **Permission errors (Linux/macOS)**
  - Try running as sudo or ensure user owns Rust installation directory.
- **IDE not recognizing Rust**
  - Check extension and version compatibility; restart IDE.

***

## 6. Coding Practice Questions (Beginner to Advanced, with Answers)

### Beginner

1. **Print Even Numbers from 1 to 10**

```rust
fn main() {
    for i in 1..=10 {
        if i % 2 == 0 { println!("{}", i); }
    }
}
```bash

1. **Sum Array Elements**

```rust
fn main() {
    let arr = [1,2,3,4,5];
    let sum: i32 = arr.iter().sum();
    println!("{}", sum);
}
```bash

### Intermediate

1. **Reverse a String**

```rust
fn main() {
    let s = "rustacean";
    let rev: String = s.chars().rev().collect();
    println!("{}", rev);
}
```bash

1. **Check if Number is Prime**

```rust
fn is_prime(n: u32) -> bool {
    if n < 2 { return false; }
    for i in 2..=(n/2) {
        if n % i == 0 { return false; }
    }
    true
}
fn main() { println!("{}", is_prime(17)); }
```bash

1. **Factorial Calculation**

```rust
fn factorial(n: u32) -> u32 {
    (1..=n).product()
}
fn main() {
    println!("{}", factorial(5));
}
```bash

### Advanced

1. **Find the Largest Element in a Vector**

```rust
fn main() {
    let v = vec![10, 44, 32, 17];
    println!("{}", v.iter().max().unwrap());
}
```bash

1. **Implement Fibonacci (Recursive)**

```rust
fn fib(n: u32) -> u32 {
    if n <= 1 { n } else { fib(n-1) + fib(n-2) }
}
fn main() {
    println!("{}", fib(6));
}
```bash

1. **Write to a File**

```rust
use std::fs::File;
use std::io::Write;
fn main() {
    let mut file = File::create("demo.txt").unwrap();
    file.write_all(b"Hello, Rust!").unwrap();
}
```bash

1. **Struct for Rectangle + Area Method**

```rust
struct Rectangle { width: u32, height: u32 }
impl Rectangle {
    fn area(&self) -> u32 { self.width * self.height }
}
fn main() {
    let rect = Rectangle { width: 7, height: 3 };
    println!("Area: {}", rect.area());
}
```bash

1. **Read Numbers from User \& Sort**

```rust
use std::io;
fn main() {
    let mut v = Vec::new();
    for _ in 0..3 {
        let mut input = String::new();
        io::stdin().read_line(&mut input).unwrap();
        v.push(input.trim().parse::<i32>().unwrap());
    }
    v.sort();
    println!("{:?}", v);
}
```bash
