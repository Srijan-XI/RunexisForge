# 🧩 Prolog - Logic Programming Language

**Prolog** is a logic programming language based on formal logic, used in AI, expert systems, and computational linguistics. Declares relationships and lets Prolog find solutions through logical inference.

Prolog (Programming in Logic) is a logic programming language associated with artificial intelligence and computational linguistics. It is based on formal logic, allowing variables to be bound to values via unification.

## Key Features

- **Declarative nature**: Express logic without defining control flow
- **Unification**: Powerful pattern matching for variables and structures
- **Backtracking**: Automated search mechanism for finding solutions
- **Recursion**: The primary method for iteration
- **Horn Clauses**: Rules and facts structure

## Common Use Cases

- Artificial Intelligence & Expert Systems
- Natural Language Processing (NLP)
- Constraint Satisfaction Problems
- Theorem Proving
- Relational Databases

## Resources

- SWI-Prolog: <https://www.swi-prolog.org/>
- Learn Prolog Now!: <http://www.learnprolognow.org/>
- Real World Prolog: <https://www.metalevel.at/prolog>

---

## User Guide

## Install

- **Windows/macOS/Linux**: Install SWI-Prolog from <https://www.swi-prolog.org/Download.html>
- Verify: `swipl --version`

## Quick Start

Start the REPL (Read-Eval-Print Loop):

```bash
swipl
```

Quit the REPL:

```prolog
?- halt.
```

## Minimal Program

Create a file named `hello.pl`:

```prolog
hello_world :-
    writeln('Hello, Prolog!').
```

Run inside `swipl`:

```prolog
?- [hello].
?- hello_world.
```

## Facts and Rules

Prolog databases are built from facts and rules.

```prolog
% Facts
parent(john, mary).
parent(john, tom).

% Rule
sibling(X, Y) :-
    parent(Z, X),
    parent(Z, Y),
    X \= Y.
```

Querying the database:

```prolog
?- sibling(mary, tom).
true.
```

## Build & Test

Prolog is typically interpreted. For effective testing, `plunit` is standard in SWI-Prolog.

```prolog
:- begin_tests(util).

test(reverse) :-
    reverse([a, b], Res),
    Res == [b, a].

:- end_tests(util).
```

Run tests in REPL:

```prolog
?- run_tests.
```

## Key Concepts

- **Atom**: A general-purpose name with no inherent meaning (e.g., `john`, `cat`).
- **Variable**: Placeholder for an unspecified term, starts with uppercase or underscore (e.g., `X`, `_Value`).
- **Compound Term**: Structure like `functor(arg1, arg2)`.
- **List**: Linked list structure `[Head|Tail]`.
- **Cut (!)**: Control flow operator to prune the search tree.

## Next Steps

- Explore Definite Clause Grammars (DCGs) for parsing
- Learn Constraint Logic Programming (CLP)
- Experiment with meta-interpreters

