# ☯️ Clojure Programming Language - Introduction

### Overview

Clojure is a dynamic, general-purpose programming language, combining the approachability and interactive development of a scripting language with an efficient and robust infrastructure for multithreaded programming. It is a dialect of Lisp that runs on the Java Virtual Machine (JVM), Common Language Runtime (CLR), and JavaScript engines (ClojureScript).

### Key Features

- **Hosted on the JVM**: Seamless Java interoperability.
- **Functional**: Immutable data structures and first-class functions.
- **Lisp Dialect**: Code as data (homoiconicity) and powerful macro system.
- **Concurrent**: Software Transactional Memory (STM) and agent systems.
- **Dynamic**: REPL-driven development workflow.

## Common Use Cases

- Backend Web Development (Ring, Compojure, Pedestal)
- Data Processing and Analysis
- Distributed Systems
- Single Page Applications (via ClojureScript/Re-frame)

## Resources

- Official Site: <https://clojure.org>
- ClojureDocs: <https://clojuredocs.org>
- Leiningen (Build Tool): <https://leiningen.org>

---

## User Guide

## Install

- **Prerequisite**: Install Java (JDK 8+).
- **Clojure CLI**: 
  - macOS: `brew install clojure/tools/clojure`
  - Linux: Follow script on <https://clojure.org/guides/install_clojure>
  - Windows: Use `scoop install clojure` or official installer.
- **Leiningen** (Alternative build tool): Follow instructions at <https://leiningen.org>.

## Quick Start

Start the REPL (Read-Eval-Print Loop) using Clojure CLI:

```bash
clj
```

Or using Leiningen:

```bash
lein repl
```

## Minimal Program

Create a file named `hello.clj`:

```clojure
(defn -main []
  (println "Hello, Clojure!"))

(-main)
```

Run with `clj`:

```bash
clj -M hello.clj
```

## Project Skeleton (Leiningen)

Create a new app:

```bash
lein new app my-project
cd my-project
lein run
```

## Build & Test

Using Leiningen:

```bash
lein uberjar
lein test
```

Using Clojure CLI (with aliases in `deps.edn`):

```bash
clj -T:build uber
clj -M:test
```

## Key Concepts

- **Immutability**: Data structures are immutable by default.
- **Collections**: Rich set of literal syntax for lists `()`, vectors `[]`, maps `{}`, and sets `#{}`.
- **Vars**: Global bindings, usually typically dynamic.
- **Atoms**: Manage shared, synchronous, independent state.
- **Macros**: Transform code before compilation.

## Next Steps

- Explore `core.async` for CSP-style concurrency.
- Build a web server with Ring and Reitit.
- Try ClojureScript for frontend development.

