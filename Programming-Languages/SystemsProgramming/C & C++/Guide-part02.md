# Installing Latest C/C++ Compiler on Windows 11 (Quick Methods)

## 0. Using WinLibs (Prebuilt GCC/Clang) for Windows

For a hassle-free experience, you can use [WinLibs](https://winlibs.com/).
[Download it here](https://winlibs.com/)

- Use **UCRT runtime** version for best compatibility.
or
- Use **MSVCRT runtime** version if you need compatibility with older Windows versions.

Go to the Release versions section at scroll down and download the latest archive.

Example :

```bash
GCC 15.2.0 (with POSIX threads) + MinGW-w64 13.0.0 (UCRT) - release 3   (LATEST)
Win32 (without LLVM/Clang/LLD/LLDB): 7-Zip archive* | Zip archive
Win64 (without LLVM/Clang/LLD/LLDB): 7-Zip archive* | Zip archive
```bash

Download Win32 or Win64 version based on your system architecture.

This is a C/C++ compiler. Simply download, extract, and use it without hassle. Just copy it to the `C drive`, add the `bin folder` to your system `PATH`, and start coding.

## 1. Using Winget (Built into Windows 11)

Winget can directly pull the compiler from official repositories.

### For GCC (MinGW-w64)

```powershell
winget install --id=GnuWin32.GCC
```bash

Or for a more up-to-date MinGW-w64 build:

```bash
winget install --id=WinLibs.MinGW-w64 --source=winget
```bash

### For LLVM Clang

```bash
winget install LLVM.LLVM
```bash

### For Microsoft Build Tools (MSVC without full Visual Studio)

```bash
winget install --id=Microsoft.VisualStudio.2022.BuildTools --source=winget
```bash

- During install, select C++ build tools.

## 2. Using Chocolatey

If you install [Chocolatey](https://chocolatey.org/install), you can get compilers with one command.

### Install GCC

```bash
choco install mingw
```bash

### Install LLVM Clang

```bash
choco install llvm
```bash

### Install Visual Studio Build Tools

```bash
choco install visualstudio2022buildtools
```bash

### Why This Method is Easier

- No manual downloading/unzipping.

- Automatic PATH setup.

- Easy to update later with:

---

```bash
winget upgrade --all
```bash

or

```bash
choco upgrade all
```bash

## 3. Use Code::Blocks IDE (with built-in MinGW)

[Download Code::Blocks](http://www.codeblocks.org/downloads/26) with MinGW included.

If you want, I can also prepare a **single combined `winget` script** in Markdown that installs GCC, Clang, and MSVC all at once so you have every major compiler ready. That way you’re set for any C/C++ project on Windows 11.

Winget script example:

```powershell
winget install codeblocks.codeblocks
```bash
