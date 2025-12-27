# Rust Programming: Comprehensive Guide

## 1. Installation Guides

### Windows

- **Using Rustup (Recommended):**
  - Download and run [rustup-init.exe] from the official Rust website.
  - Follow on-screen instructions; choose default installation.
  - Update Rust regularly via Command Prompt:

```bash
rustup update
```bash

### macOS

- **Using Homebrew (Recommended for Mac):**

```bash
brew install rust
```bash

- **Using rustup:**
  - Run the following in Terminal:

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```bash

### Linux

- **Using rustup:**
  - Open a terminal and run:

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```bash

- **Update your PATH:**

```bash
source $HOME/.cargo/env
```bash

## 2. Usage Examples

### Basic "Hello, World!"

```rust
fn main() {
    println!("Hello, world!");
}
```bash

### Declaring Variables

```rust
let mut x = 5;
x = 10;
println!("{}", x);
```bash

### Functions

```rust
fn add(a: i32, b: i32) -> i32 {
    a + b
}
```bash

### Control Flow

```rust
let number = 7;
if number > 5 {
    println!("Greater than 5");
} else {
    println!("Not greater than 5");
}
```bash

## 3. Platform Coverage

| Task | Windows | Linux/MacOS |
| :-- | :-- | :-- |
| Install Rust | Run `rustup-init.exe` or use Chocolatey (`choco install rust`) [if installed] | Use `curl` as above or Homebrew on mac |
| Start Project | `cargo new projectname` | Same as Windows |
| Update Rust | `rustup update` | Same as Windows |
| IDE Integration | VS Code, CLion, IntelliJ Rust | Same as Windows (Cross-platform IDEs) |

## 4. Tooling Help

- **IDE Setup**
  - **VS Code:** Install the "rust-analyzer" extension.
  - **JetBrains:** Use "IntelliJ Rust" plugin for CLion, IntelliJ IDEA.
  - **Other Editors:** Vim and Emacs have Rust support via plugins.
- **Compilers \& Package Manager**
  - **Compiler:** `rustc`
  - **Package Manager:** `cargo` (handles build, test, dependency management)

## 5. Troubleshooting Tips

- **Path Issues:** Ensure `$HOME/.cargo/bin` is in your PATH.
- **Compiling Errors:** Read error messages carefully; Rust offers helpful suggestions.
- **Dependency Issues:** Delete `Cargo.lock` and run `cargo build` to regenerate.
- **Failed Installation:** Try running installation as admin (Windows) or with `sudo` (Linux/macOS) if permissions issues occur.

***

# 10 Rust Questions (Progressive: Beginner → Advanced)

1. **Beginner:** What command sets up a new Rust project structure?
2. **Beginner:** How do you print output to the console in Rust?
3. **Beginner:** What is the difference between `let` and `let mut`?
4. **Intermediate:** How does Rust ensure memory safety without a garbage collector?
5. **Intermediate:** What is a "borrow checker" and why is it important?
6. **Intermediate:** Give an example of pattern matching in Rust.
7. **Advanced:** Explain the concept and use of lifetimes in Rust.
8. **Advanced:** How can you create and use a generic function in Rust?
9. **Advanced:** Describe error handling in Rust (`Result`, `Option`).
10. **Challenge:** Write a Rust function that takes a vector of integers and returns another vector containing only the even numbers.
