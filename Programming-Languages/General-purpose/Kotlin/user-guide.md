# Kotlin User Guide

## Prerequisites

- **JDK 17+** recommended (any recent JDK works for learning)
- A terminal (PowerShell on Windows is fine)

## Option A: Kotlin via IntelliJ IDEA (easiest)

1. Install **IntelliJ IDEA Community**.
2. Create a new project:
   - **New Project** → **Kotlin** → **JVM**
   - Select an installed JDK
3. Create `Main.kt` and run.

## Option B: Kotlin Command Line Compiler

### Windows (PowerShell)

1. Install a JDK (e.g., Temurin / Microsoft Build of OpenJDK).
2. Download Kotlin compiler (zip) from JetBrains.
3. Extract it and add `.../kotlinc/bin` to your `PATH`.

Verify:

```pwsh
kotlinc -version
```bash

Compile and run:

```pwsh
# Compile to a runnable jar
kotlinc Main.kt -include-runtime -d app.jar

# Run
java -jar app.jar
```bash

## Kotlin Basics

### Variables

```kotlin
val x = 10      // read-only
var y = 20      // mutable
```bash

### Null Safety

```kotlin
val a: String = "hi"
val b: String? = null

val len = b?.length ?: 0  // safe call + Elvis operator
```bash

### Collections

```kotlin
val nums = listOf(1, 2, 3, 4)
val evens = nums.filter { it % 2 == 0 }
val squares = nums.map { it * it }
```bash

### Data Classes

```kotlin
data class User(val id: Int, val name: String)

val u = User(1, "Ada")
println(u)
```bash

## Next Steps

- Learn the standard library (`kotlin.collections`, `kotlin.io`).
- Practice with small scripts in `Kotlin/examples/`.
- Try the exercises in `Kotlin/questions/`.
- If you want Android: learn Gradle + Android Studio + Jetpack basics.
