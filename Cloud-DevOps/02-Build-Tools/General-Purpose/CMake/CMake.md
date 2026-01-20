# CMake - Cross-Platform Build System Generator

## Table of Contents
- [Introduction](#introduction)
- [Why CMake?](#why-cmake)
- [Installation](#installation)
- [Basic Concepts](#basic-concepts)
- [CMakeLists.txt](#cmakeliststxt)
- [Variables & Properties](#variables--properties)
- [Finding Packages](#finding-packages)
- [Targets & Libraries](#targets--libraries)
- [Modern CMake](#modern-cmake)
- [Cross-Compilation](#cross-compilation)
- [Testing with CTest](#testing-with-ctest)
- [Packaging with CPack](#packaging-with-cpack)
- [Best Practices](#best-practices)
- [Real-World Examples](#real-world-examples)
- [Troubleshooting](#troubleshooting)

---

## Introduction

**CMake** is a cross-platform build system generator that generates native build files (Makefiles, Visual Studio projects, Xcode projects, Ninja files) from platform-independent CMakeLists.txt configuration files.

### Key Features
- **Cross-Platform** - Linux, macOS, Windows
- **Generator-Based** - Multiple build system support
- **Modern C++** - C++11/14/17/20/23 support
- **Package Management** - Find and use libraries
- **Testing** - Integrated CTest framework
- **Packaging** - CPack for installers
- **IDE Integration** - VS Code, CLion, Visual Studio

### Core Concepts
- **CMakeLists.txt** - Build configuration file
- **Generator** - Creates native build files
- **Target** - Executable or library to build
- **Properties** - Target-specific settings
- **Cache** - Persistent configuration variables

### Workflow

```
CMakeLists.txt → CMake → Generator → Build System → Binary
                          ↓
                  Makefile/Ninja/VS
```

---

## Why CMake?

### Advantages

✅ **Cross-Platform**
- Write once, build anywhere
- Platform-specific configurations
- Native toolchain integration

✅ **Modern C++ Support**
- C++11/14/17/20/23 features
- Target-based design
- Interface libraries

✅ **Flexibility**
- Multiple generators
- Out-of-source builds
- Configurable options

✅ **Ecosystem**
- Find modules for popular libraries
- Package configuration files
- ExternalProject for dependencies

### Use Cases
- **C/C++ Projects** - Primary use case
- **Cross-Platform Development** - Build on multiple OSs
- **Large Projects** - Modular builds
- **Library Development** - Exportable targets
- **Embedded Systems** - Cross-compilation
- **Game Development** - Complex build pipelines

---

## Installation

### Linux

```bash
# Debian/Ubuntu
sudo apt-get install cmake

# Fedora/RHEL
sudo dnf install cmake

# Arch Linux
sudo pacman -S cmake

# Or build from source
wget https://github.com/Kitware/CMake/releases/download/v3.28.0/cmake-3.28.0.tar.gz
tar xzvf cmake-3.28.0.tar.gz
cd cmake-3.28.0
./bootstrap && make && sudo make install

# Verify
cmake --version
```

### macOS

```bash
# Homebrew
brew install cmake

# Or download from https://cmake.org/download/

# Verify
cmake --version
```

### Windows

```powershell
# Chocolatey
choco install cmake

# Or download installer from https://cmake.org/download/

# Verify
cmake --version
```

---

## Basic Concepts

### Minimum CMake Project

**CMakeLists.txt**
```cmake
cmake_minimum_required(VERSION 3.20)

project(MyApp VERSION 1.0.0 LANGUAGES CXX)

add_executable(myapp main.cpp)
```

### Building the Project

```bash
# Create build directory
mkdir build
cd build

# Configure (generate build files)
cmake ..

# Build
cmake --build .

# Or use make directly
make

# Run
./myapp
```

### Out-of-Source Builds

```bash
# Recommended: separate build directory
mkdir build && cd build
cmake ..
make

# Multiple configurations
mkdir build-debug && cd build-debug
cmake -DCMAKE_BUILD_TYPE=Debug ..
make

mkdir build-release && cd build-release
cmake -DCMAKE_BUILD_TYPE=Release ..
make
```

### Generators

```bash
# List available generators
cmake --help

# Unix Makefiles (default on Linux/macOS)
cmake -G "Unix Makefiles" ..

# Ninja (faster builds)
cmake -G "Ninja" ..

# Visual Studio
cmake -G "Visual Studio 17 2022" ..

# Xcode
cmake -G "Xcode" ..
```

---

## CMakeLists.txt

### Basic Structure

```cmake
# Minimum CMake version
cmake_minimum_required(VERSION 3.20)

# Project declaration
project(MyProject
    VERSION 1.0.0
    DESCRIPTION "My awesome project"
    LANGUAGES CXX
)

# C++ standard
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Add executable
add_executable(myapp
    src/main.cpp
    src/utils.cpp
)

# Add library
add_library(mylib
    src/lib.cpp
    src/helper.cpp
)

# Link library to executable
target_link_libraries(myapp PRIVATE mylib)
```

### Project Structure

```
my-project/
├── CMakeLists.txt           # Root CMake file
├── src/
│   ├── CMakeLists.txt       # Source CMake file
│   ├── main.cpp
│   └── utils.cpp
├── include/
│   └── myproject/
│       └── utils.h
├── tests/
│   ├── CMakeLists.txt
│   └── test_utils.cpp
├── external/                 # Third-party deps
└── build/                    # Build directory (git-ignored)
```

### Subdirectories

**Root CMakeLists.txt**
```cmake
cmake_minimum_required(VERSION 3.20)
project(MyProject)

add_subdirectory(src)
add_subdirectory(tests)
```

**src/CMakeLists.txt**
```cmake
add_executable(myapp
    main.cpp
    utils.cpp
)

target_include_directories(myapp PRIVATE
    ${PROJECT_SOURCE_DIR}/include
)
```

---

## Variables & Properties

### Variables

```cmake
# Set variable
set(MY_VAR "value")

# List variable
set(SOURCES
    main.cpp
    utils.cpp
    helper.cpp
)

# Append to list
list(APPEND SOURCES extra.cpp)

# Cache variable (persistent)
set(MY_OPTION ON CACHE BOOL "Enable my option")

# Environment variable
set(ENV{MY_VAR} "value")

# Use variable
message(STATUS "MY_VAR = ${MY_VAR}")
```

### Built-in Variables

```cmake
# Project info
${PROJECT_NAME}              # Project name
${PROJECT_VERSION}           # Project version
${PROJECT_SOURCE_DIR}        # Source directory
${PROJECT_BINARY_DIR}        # Build directory

# CMake paths
${CMAKE_SOURCE_DIR}          # Top-level source dir
${CMAKE_BINARY_DIR}          # Top-level build dir
${CMAKE_CURRENT_SOURCE_DIR}  # Current source dir
${CMAKE_CURRENT_BINARY_DIR}  # Current build dir

# System info
${CMAKE_SYSTEM_NAME}         # OS name (Linux, Darwin, Windows)
${CMAKE_CXX_COMPILER}        # C++ compiler path
${CMAKE_BUILD_TYPE}          # Debug, Release, etc.

# Installation
${CMAKE_INSTALL_PREFIX}      # Install prefix (/usr/local)
```

### Target Properties

```cmake
# Set property
set_target_properties(myapp PROPERTIES
    CXX_STANDARD 17
    CXX_STANDARD_REQUIRED ON
    OUTPUT_NAME "myapplication"
)

# Get property
get_target_property(APP_NAME myapp OUTPUT_NAME)
```

---

## Finding Packages

### find_package()

```cmake
# Find required package
find_package(Boost REQUIRED)

# Find specific components
find_package(Boost REQUIRED COMPONENTS
    filesystem
    system
)

# Use found package
target_link_libraries(myapp PRIVATE
    Boost::filesystem
    Boost::system
)
```

### Common Packages

```cmake
# Threading
find_package(Threads REQUIRED)
target_link_libraries(myapp PRIVATE Threads::Threads)

# OpenSSL
find_package(OpenSSL REQUIRED)
target_link_libraries(myapp PRIVATE OpenSSL::SSL OpenSSL::Crypto)

# Protobuf
find_package(Protobuf REQUIRED)
target_link_libraries(myapp PRIVATE protobuf::libprotobuf)

# Qt
find_package(Qt6 REQUIRED COMPONENTS Core Widgets)
target_link_libraries(myapp PRIVATE Qt6::Core Qt6::Widgets)

# GoogleTest
find_package(GTest REQUIRED)
target_link_libraries(mytests PRIVATE GTest::gtest_main)
```

### pkg-config

```cmake
# Use pkg-config
find_package(PkgConfig REQUIRED)
pkg_check_modules(GLIB REQUIRED glib-2.0)

target_include_directories(myapp PRIVATE ${GLIB_INCLUDE_DIRS})
target_link_libraries(myapp PRIVATE ${GLIB_LIBRARIES})
```

### FetchContent (Modern)

```cmake
include(FetchContent)

# Fetch GoogleTest
FetchContent_Declare(
    googletest
    GIT_REPOSITORY https://github.com/google/googletest.git
    GIT_TAG v1.14.0
)
FetchContent_MakeAvailable(googletest)

# Use it
target_link_libraries(mytests PRIVATE gtest_main)
```

---

## Targets & Libraries

### Executables

```cmake
# Simple executable
add_executable(myapp main.cpp)

# Multiple sources
add_executable(myapp
    src/main.cpp
    src/utils.cpp
    src/helper.cpp
)

# Glob sources (not recommended)
file(GLOB SOURCES "src/*.cpp")
add_executable(myapp ${SOURCES})
```

### Libraries

```cmake
# Static library
add_library(mylib STATIC
    lib.cpp
    helper.cpp
)

# Shared library
add_library(mylib SHARED
    lib.cpp
    helper.cpp
)

# Object library (compile once, link many times)
add_library(mylib OBJECT
    lib.cpp
)

# Interface library (header-only)
add_library(mylib INTERFACE)
target_include_directories(mylib INTERFACE include/)
```

### Linking Libraries

```cmake
# Link library
target_link_libraries(myapp PRIVATE mylib)

# Multiple libraries
target_link_libraries(myapp
    PRIVATE
        mylib
        Boost::filesystem
        Threads::Threads
)

# Link scopes
# PRIVATE   - Used internally only
# PUBLIC    - Used internally and exposed to consumers
# INTERFACE - Not used internally, only exposed
```

---

## Modern CMake

### target_*() Commands

```cmake
# Include directories
target_include_directories(myapp
    PRIVATE
        ${PROJECT_SOURCE_DIR}/src
    PUBLIC
        ${PROJECT_SOURCE_DIR}/include
)

# Compile definitions
target_compile_definitions(myapp
    PRIVATE
        DEBUG_MODE
        VERSION="${PROJECT_VERSION}"
)

# Compile options
target_compile_options(myapp
    PRIVATE
        -Wall -Wextra -Werror
        $<$<CONFIG:DEBUG>:-g -O0>
        $<$<CONFIG:RELEASE>:-O3>
)

# Link options
target_link_options(myapp
    PRIVATE
        -static-libstdc++
)

# Link libraries
target_link_libraries(myapp
    PRIVATE mylib
    PUBLIC Boost::filesystem
)
```

### Generator Expressions

```cmake
# Conditional compilation
target_compile_options(myapp PRIVATE
    $<$<CONFIG:Debug>:-g -O0>
    $<$<CONFIG:Release>:-O3 -DNDEBUG>
)

# Platform-specific
target_compile_definitions(myapp PRIVATE
    $<$<PLATFORM_ID:Linux>:LINUX_BUILD>
    $<$<PLATFORM_ID:Windows>:WINDOWS_BUILD>
)

# Compiler-specific
target_compile_options(myapp PRIVATE
    $<$<CXX_COMPILER_ID:GNU>:-fno-strict-aliasing>
    $<$<CXX_COMPILER_ID:MSVC>/W4>
)
```

### Interface Libraries (Header-Only)

```cmake
# Header-only library
add_library(myheaderlib INTERFACE)

target_include_directories(myheaderlib INTERFACE
    $<BUILD_INTERFACE:${CMAKE_CURRENT_SOURCE_DIR}/include>
    $<INSTALL_INTERFACE:include>
)

target_compile_features(myheaderlib INTERFACE
    cxx_std_17
)

# Usage
target_link_libraries(myapp PRIVATE myheaderlib)
```

---

## Cross-Compilation

### Toolchain File

**toolchain-arm.cmake**
```cmake
set(CMAKE_SYSTEM_NAME Linux)
set(CMAKE_SYSTEM_PROCESSOR arm)

set(CMAKE_C_COMPILER arm-linux-gnueabihf-gcc)
set(CMAKE_CXX_COMPILER arm-linux-gnueabihf-g++)

set(CMAKE_FIND_ROOT_PATH /usr/arm-linux-gnueabihf)

set(CMAKE_FIND_ROOT_PATH_MODE_PROGRAM NEVER)
set(CMAKE_FIND_ROOT_PATH_MODE_LIBRARY ONLY)
set(CMAKE_FIND_ROOT_PATH_MODE_INCLUDE ONLY)
```

```bash
# Use toolchain
cmake -DCMAKE_TOOLCHAIN_FILE=toolchain-arm.cmake ..
```

---

## Testing with CTest

### Enable Testing

```cmake
# Enable testing
enable_testing()

# Add test executable
add_executable(mytests test_main.cpp)
target_link_libraries(mytests PRIVATE mylib GTest::gtest_main)

# Add test
add_test(NAME MyTests COMMAND mytests)
```

### Running Tests

```bash
# Run tests
ctest

# Verbose
ctest -V

# Specific test
ctest -R MyTests

# Parallel
ctest -j4
```

### GoogleTest Integration

```cmake
include(FetchContent)
FetchContent_Declare(
    googletest
    GIT_REPOSITORY https://github.com/google/googletest.git
    GIT_TAG v1.14.0
)
FetchContent_MakeAvailable(googletest)

enable_testing()
include(GoogleTest)

add_executable(mytests test_main.cpp)
target_link_libraries(mytests PRIVATE mylib gtest_main)

gtest_discover_tests(mytests)
```

---

## Packaging with CPack

### Basic CPack

```cmake
# Installation
install(TARGETS myapp DESTINATION bin)
install(FILES README.md LICENSE DESTINATION share/doc/myapp)

# CPack configuration
set(CPACK_PACKAGE_NAME "MyApp")
set(CPACK_PACKAGE_VERSION "${PROJECT_VERSION}")
set(CPACK_PACKAGE_VENDOR "My Company")
set(CPACK_PACKAGE_DESCRIPTION_SUMMARY "My awesome application")

# Package generators
set(CPACK_GENERATOR "TGZ;DEB;RPM")

include(CPack)
```

```bash
# Build package
cpack

# Specific generator
cpack -G DEB
```

---

## Best Practices

### Modern CMake Project

```cmake
cmake_minimum_required(VERSION 3.20)

project(MyProject
    VERSION 1.0.0
    DESCRIPTION "Modern CMake project"
    LANGUAGES CXX
)

# C++ standard
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Options
option(BUILD_SHARED_LIBS "Build shared libraries" ON)
option(BUILD_TESTING "Build tests" ON)

# Library
add_library(mylib
    src/lib.cpp
    src/helper.cpp
)

target_include_directories(mylib
    PUBLIC
        $<BUILD_INTERFACE:${CMAKE_CURRENT_SOURCE_DIR}/include>
        $<INSTALL_INTERFACE:include>
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/src
)

target_compile_features(mylib PUBLIC cxx_std_17)

# Executable
add_executable(myapp src/main.cpp)
target_link_libraries(myapp PRIVATE mylib)

# Tests
if(BUILD_TESTING)
    enable_testing()
    add_subdirectory(tests)
endif()

# Installation
install(TARGETS myapp mylib
    RUNTIME DESTINATION bin
    LIBRARY DESTINATION lib
    ARCHIVE DESTINATION lib
)
install(DIRECTORY include/ DESTINATION include)
```

---

## Real-World Examples

### Complete C++ Project

**CMakeLists.txt**
```cmake
cmake_minimum_required(VERSION 3.20)

project(CppApp
    VERSION 1.0.0
    DESCRIPTION "C++ Application"
    LANGUAGES CXX
)

# Options
option(BUILD_TESTS "Build tests" ON)
option(ENABLE_WARNINGS "Enable warnings" ON)

# C++ standard
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Find dependencies
find_package(Threads REQUIRED)
find_package(Boost REQUIRED COMPONENTS filesystem system)

# Library
add_library(applib
    src/lib.cpp
    src/utils.cpp
)

target_include_directories(applib
    PUBLIC include
    PRIVATE src
)

target_link_libraries(applib
    PUBLIC
        Boost::filesystem
        Boost::system
    PRIVATE
        Threads::Threads
)

if(ENABLE_WARNINGS)
    target_compile_options(applib PRIVATE
        -Wall -Wextra -Wpedantic
    )
endif()

# Executable
add_executable(app src/main.cpp)
target_link_libraries(app PRIVATE applib)

# Tests
if(BUILD_TESTS)
    enable_testing()
    add_subdirectory(tests)
endif()

# Installation
install(TARGETS app applib
    RUNTIME DESTINATION bin
    LIBRARY DESTINATION lib
)
```

---

## Troubleshooting

### Common Commands

```bash
# Verbose build
cmake --build . --verbose

# Clean build
cmake --build . --clean-first

# Reconfigure
cmake ..

# Clear cache
rm -rf CMakeCache.txt CMakeFiles/

# Show variables
cmake -L ..

# Show all variables
cmake -LA ..
```

### Debugging

```cmake
# Print message
message(STATUS "Building ${PROJECT_NAME}")

# Print variable
message(STATUS "CMAKE_CXX_COMPILER: ${CMAKE_CXX_COMPILER}")

# Print list
foreach(item ${MY_LIST})
    message(STATUS "Item: ${item}")
endforeach()
```

---

## Resources

### Official
- **Website:** https://cmake.org
- **Documentation:** https://cmake.org/documentation/
- **Tutorial:** https://cmake.org/cmake/help/latest/guide/tutorial/
- **Wiki:** https://gitlab.kitware.com/cmake/community/-/wikis/home

### Learning
- **Modern CMake:** https://cliutils.gitlab.io/modern-cmake/
- **CMake Examples:** https://github.com/ttroy50/cmake-examples

---

## Conclusion

CMake is the industry-standard build system generator for C/C++ projects, offering cross-platform support, modern C++ features, and powerful configuration options. It's essential for professional C++ development.

**Key Takeaways:**
- 🌍 Cross-platform (Linux, macOS, Windows)
- 🎯 Modern C++ support
- 🔧 Target-based configuration
- 📦 Package finding and management
- 🧪 Integrated testing (CTest)
- 🚀 Professional C++ standard

Essential for modern C++ development!
