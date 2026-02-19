# Swift

## Introduction

## What is Swift?

Swift is a modern, statically typed programming language created by Apple for building apps across the Apple ecosystem (iOS, macOS, watchOS, tvOS). Swift is designed to be safe, fast, and expressive, with features like optionals, type inference, and powerful enums.

## Why Swift?

- **Safety**: Optionals and strong typing reduce common runtime crashes.
- **Performance**: Compiled language with strong optimization.
- **Expressive**: Clean syntax, great standard library.
- **Ecosystem**: First-class language for Apple platforms.

## Where Swift is used

- **iOS/iPadOS apps** (UIKit / SwiftUI)
- **macOS apps**
- **Server-side Swift** (smaller ecosystem, but possible)
- **Scripting and CLI tools** on macOS

## Core Concepts

- **Variables**: `let` (constant) and `var` (mutable).
- **Optionals**: `String?` means “may be nil”.
- **Enums**: Can hold associated values; used heavily in Swift.
- **Protocols**: Similar to interfaces; central to Swift design.
- **Closures**: Inline functions used for callbacks and functional style.

## Minimal Example

```swift
import Foundation

print("Hello, Swift!")
```

## Learning Path

1. Install Xcode (or Swift toolchain) and run a simple program.
2. Learn `let/var`, functions, structs, and optionals.
3. Practice collections and control flow.
4. Learn SwiftUI or UIKit for building apps.
5. Explore concurrency (async/await) and networking.

---

## User Guide

## Prerequisites

Swift is most straightforward to run on **macOS**.

- Install **Xcode** from the Mac App Store (includes Swift and toolchain)
- Or install the official Swift toolchain (advanced)

## Verify Swift

```bash
swift --version
```

## Run a Swift Script

Create `main.swift`:

```swift
import Foundation

let name = "Swift"
print("Hello, \(name)!")
```

Run:

```bash
swift main.swift
```

## Build a Swift Executable

```bash
swiftc main.swift -o app
./app
```

## Swift Basics

### let vs var

```swift
let x = 10      // constant
var y = 20      // variable
y += 1
```

### Optionals

```swift
let maybe: String? = nil
let length = maybe?.count ?? 0
print(length)
```

### Arrays and Dictionaries

```swift
let nums = [1, 2, 3, 4]
let doubled = nums.map { $0 * 2 }

let ages: [String: Int] = ["Ada": 36, "Linus": 54]
print(doubled)
print(ages["Ada"] ?? 0)
```

## Next Steps

- Try the scripts in `Swift/examples/`.
- Work through exercises in `Swift/questions/`.
- If you want iOS: start with SwiftUI basics and Xcode projects.

