# Kotlin — Introduction

## What is Kotlin?

Kotlin is a modern, statically typed programming language that runs on the JVM (and also targets Android, native binaries, and JavaScript). It is designed to be concise, safe, and interoperable with Java, making it a popular choice for Android development, backend services, and general-purpose JVM programming.

## Why Kotlin?

- **Concise**: Less boilerplate than Java (data classes, type inference).
- **Safer by default**: Null-safety helps prevent `NullPointerException`.
- **Interoperable**: Use existing Java libraries and call Java code directly.
- **Modern features**: Lambdas, extension functions, coroutines, sealed classes.
- **Great tooling**: IntelliJ IDEA and Android Studio support.

## Where Kotlin is used

- **Android apps** (officially recommended by Google)
- **Backend services** with frameworks like Ktor and Spring Boot
- **Scripting and tooling** (Gradle build scripts)
- **Multiplatform apps** (shared business logic)

## Core Concepts

- **val vs var**: `val` is read-only, `var` is mutable.
- **Null safety**: `String?` (nullable) vs `String` (non-null).
- **Functions**: First-class functions and lambdas.
- **Data classes**: Automatic `equals/hashCode/toString` and copying.
- **Extension functions**: Add functions to types without inheritance.
- **Coroutines**: Lightweight concurrency for async work.

## Minimal Example

```kotlin
fun main() {
    val name = "Kotlin"
    println("Hello, $name!")
}
```

## Learning Path

1. Install Kotlin/JDK and run a simple program.
2. Learn variables, functions, collections, and control flow.
3. Understand null-safety, data classes, and extension functions.
4. Learn coroutines for async/concurrency.
5. Choose a track: Android, backend (Ktor/Spring), or multiplatform.
