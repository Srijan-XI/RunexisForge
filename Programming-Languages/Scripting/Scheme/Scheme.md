# Scheme

## Introduction

## Overview

Scheme is a minimalist dialect of the Lisp family of programming languages. It was the first Lisp dialect to choose static (lexical) scoping over dynamic scoping. Scheme follows a minimalist design philosophy, specifying a small standard core with powerful tools for language extension.

## Key Features

- **Minimalism**: A small, clean core language.
- **Lexical Scoping**: Variables are scoped by the structure of the code.
- **Tail-Call Optimization**: Recursion is as efficient as iteration.
- **First-Class Continuations**: Powerful control flow mechanism.
- **Hygienic Macros**: Safe and powerful code transformation tools.

## Common Use Cases

- **Computer Science Education**: Famous for usage in "Structure and Interpretation of Computer Programs" (SICP).
- **Embedded Scripting**: Used as an extension language (e.g., GNU Guile in GIMP).
- **Language Research**: A common testbed for new programming concepts.
- **Symbolic AI**: Classic artificial intelligence applications.

## Resources

- The Scheme Programming Language: <https://www.scheme.com/tspl4/>
- Schemers.org: <https://www.schemers.org/>
- GNU Guile: <https://www.gnu.org/software/guile/>
- Chez Scheme: <https://cisco.github.io/ChezScheme/>

---

## User Guide

## Install

Scheme has many implementations. Two popular ones are **Chez Scheme** and **GNU Guile**.

- **macOS**: `brew install chezscheme` or `brew install guile`
- **Linux (Debian/Ubuntu)**: `sudo apt install chezscheme` or `sudo apt install guile-3.0`
- **Windows**: Install via [Chez Scheme Website](https://cisco.github.io/ChezScheme/) or use WSL.

## Quick Start

Start the REPL (Read-Eval-Print Loop).

For Chez Scheme:
```bash
scheme
```

For Guile:
```bash
guile
```

Exit the REPL:
```scheme
(exit) 
```

## Minimal Program

Create a file named `hello.scm`:

```scheme
(display "Hello, Scheme!")
(newline)
```

Run it (with Chez Scheme):

```bash
scheme --script hello.scm
```

Or with Guile:

```bash
guile hello.scm
```

## Basic Syntax

Scheme uses S-expressions (parenthesized lists) for code and data.

```scheme
; This is a comment

; Define a variable
(define pi 3.14159)

; Define a function
(define (square x)
  (* x x))

; Call a function
(display (square 5))
(newline)
; Output: 25
```

## Key Concepts

- **Lists**: The fundamental data structure, e.g., `(1 2 3)`.
- **Lambda**: Anonymous functions, e.g., `(lambda (x) (+ x 1))`.
- **Recursion**: The primary way to loop.
- **Cons/Car/Cdr**: Primitives for list manipulation (construct, head, tail).
- **Continuations**: Capturing the rest of the computation (`call-with-current-continuation` or `call/cc`).

## Next Steps

- Read "Structure and Interpretation of Computer Programs" (SICP).
- Explore macros to extend the language syntax.
- Try embedding Guile into a C program.

