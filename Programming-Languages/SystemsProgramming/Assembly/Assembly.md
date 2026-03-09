# Assembly

## Introduction

## Overview

Assembly language provides low-level, architecture-specific instructions that map closely to machine code, offering fine-grained control over hardware.

## Key Points

- Each CPU family (x86, x86-64, ARM) has its own syntax and instructions
- Two common syntaxes on x86: Intel and AT&T
- Used for performance-critical code, firmware, and reverse engineering
- Requires understanding of registers, memory addressing, and calling conventions

## Common Use Cases

- Embedded systems and bootloaders
- OS kernels and drivers
- Optimizing hotspots in native code
- Security research and exploit development

## Resources

- x86-64: Intel/AMD manuals
- ARM: ARM Architecture Reference Manual
- Guides: <https://wiki.osdev.org> and <https://godbolt.org> for assembly output

---

## User Guide

## Toolchain Basics (x86-64, NASM + GCC)

```
nasm -f elf64 hello.asm -o hello.o
gcc -nostartfiles -no-pie hello.o -o hello
./hello
```

## Minimal x86-64 Linux Example (Intel syntax)

```asm
; hello.asm
section .data
  msg db "Hello, asm", 10
  len equ $ - msg

section .text
global _start
_start:
  mov rax, 1        ; sys_write
  mov rdi, 1        ; stdout
  mov rsi, msg
  mov rdx, len
  syscall

  mov rax, 60       ; sys_exit
  xor rdi, rdi
  syscall
```

## Registers to Know

- General: rax, rbx, rcx, rdx, rsi, rdi, rsp, rbp
- Caller-saved (System V AMD64): rax, rcx, rdx, rsi, rdi, r8-r11
- Callee-saved: rbx, rbp, r12-r15

## Debugging

- Use `gdb` or `lldb` with `layout asm`
- Inspect registers: `info registers`
- Step instructions: `si`

## ARM64 Tooling

```
as -o hello.o hello.S
ld -o hello hello.o
```

Instruction names differ; refer to ARM docs for register usage and calling conventions.

## Tips

- Comment every non-trivial instruction when learning
- Use a disassembler (objdump, radare2) to study compiler output
- Keep calling convention rules when mixing with C

