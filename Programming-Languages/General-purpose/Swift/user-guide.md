# Swift User Guide

## Prerequisites

Swift is most straightforward to run on **macOS**.

- Install **Xcode** from the Mac App Store (includes Swift and toolchain)
- Or install the official Swift toolchain (advanced)

## Verify Swift

```bash
swift --version
```bash

## Run a Swift Script

Create `main.swift`:

```swift
import Foundation

let name = "Swift"
print("Hello, \(name)!")
```bash

Run:

```bash
swift main.swift
```bash

## Build a Swift Executable

```bash
swiftc main.swift -o app
./app
```bash

## Swift Basics

### let vs var

```swift
let x = 10      // constant
var y = 20      // variable
y += 1
```bash

### Optionals

```swift
let maybe: String? = nil
let length = maybe?.count ?? 0
print(length)
```bash

### Arrays and Dictionaries

```swift
let nums = [1, 2, 3, 4]
let doubled = nums.map { $0 * 2 }

let ages: [String: Int] = ["Ada": 36, "Linus": 54]
print(doubled)
print(ages["Ada"] ?? 0)
```bash

## Next Steps

- Try the scripts in `Swift/examples/`.
- Work through exercises in `Swift/questions/`.
- If you want iOS: start with SwiftUI basics and Xcode projects.
