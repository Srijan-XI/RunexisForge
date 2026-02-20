# 📡 Erlang Programming Language

> *"Erlang: Built for Systems That Never Stop"*

---

## Table of Contents

1. [Introduction](#introduction)
2. [Key Features](#key-features)
3. [What is Erlang Used For?](#what-is-erlang-used-for)
4. [Advantages](#advantages)
5. [Disadvantages](#disadvantages)
6. [Erlang vs Other Languages](#erlang-vs-other-languages)
7. [Real-World Impact](#real-world-impact)
8. [Who Should Learn Erlang?](#who-should-learn-erlang)
9. [Learning Resources](#learning-resources)
10. [Legacy & Future](#legacy--future)
11. [User Guide](#user-guide)
    - [Installation](#installation)
    - [Your First Erlang Program](#your-first-erlang-program)
    - [Basic Syntax](#basic-syntax)
    - [Data Types](#data-types)
    - [Pattern Matching](#pattern-matching)
    - [Functions & Modules](#functions--modules)
    - [Processes & Concurrency](#processes--concurrency)
    - [OTP Framework](#otp-framework)
    - [Error Handling & Supervisors](#error-handling--supervisors)
    - [Distributed Erlang](#distributed-erlang)
    - [Build Tools & Project Structure](#build-tools--project-structure)
    - [Testing](#testing)
    - [Debugging & Tracing](#debugging--tracing)
    - [Hot Code Swapping](#hot-code-swapping)
    - [Common Patterns & Best Practices](#common-patterns--best-practices)

---

## Introduction

**Erlang** is a functional programming language designed for building massively concurrent, distributed, and fault-tolerant systems. Created at Ericsson in 1986 for telecom switches, Erlang has proven **99.9999999% uptime** ("nine nines") in production systems and powers critical infrastructure worldwide — including WhatsApp, RabbitMQ, and global telecommunications networks.

### History & Creators

| Attribute | Detail |
|-----------|--------|
| **Created by** | Joe Armstrong, Robert Virding, Mike Williams (Ericsson) |
| **First Release** | 1986 (internal), 1998 (open-sourced) |
| **Current Version** | Erlang/OTP 26+ |
| **Named After** | Danish mathematician Agner Krarup Erlang |
| **Original Purpose** | Telecom switching systems (99.999% uptime requirement) |
| **License** | Apache License 2.0 |

### Why Erlang Exists

Ericsson needed a language for telephone switches that must:
- **Never go down** — telecom reliability demands 99.999%+ uptime
- Handle **millions of concurrent connections** simultaneously
- Update code **without stopping** the system (hot code swapping)
- **Automatically recover** from process failures

**Result**: Erlang became the foundation of modern distributed, fault-tolerant systems and the bedrock of the BEAM virtual machine ecosystem (Erlang, Elixir, Gleam).

---

## Key Features

### 1. BEAM VM — Battle-Tested for 35+ Years
- Powers telecom infrastructure globally
- **Fault isolation** — one process crash does not affect others
- **Hot code swapping** — update running system without downtime
- **Preemptive scheduling** — fair, predictable resource distribution

### 2. 99.9999999% Uptime (Nine Nines)
- **31.5 milliseconds** of downtime per year in the Ericsson AXD301 system
- WhatsApp: 900M users served by ~50 servers
- Self-healing systems via supervisor trees

### 3. Massive Concurrency
- **Millions of lightweight processes** per node
- Each process uses ~2.5 KB of memory
- **Message passing** — no shared memory, no race conditions
- Implements the **Actor Model**

### 4. Let It Crash Philosophy
- Don't defensively code for every possible error
- Let processes crash; supervisors automatically restart them
- Simplifies code while increasing overall reliability
- Counter-intuitive, but production-proven for decades

### 5. Distributed by Design
- Node clustering is built into the runtime
- **Location transparency** — send a message to any process, anywhere
- Network-aware process model
- Global process registry (`global`, `gproc`)

### 6. Immutable Data
- All data structures are immutable by default
- No shared-state bugs or data races
- Easier to reason about and debug
- Pattern matching drives control flow

### 7. OTP Framework
- **O**pen **T**elecom **P**latform — industry-proven design patterns
- `GenServer`, `Supervisor`, `Application`, `GenStateMachine`
- Production-ready from day one

### 8. Hot Code Swapping
- Update live running systems without any downtime
- Two module versions can coexist during transition
- Graceful upgrade paths via release handling

---

## What is Erlang Used For?

### 📞 Telecommunications (Original Purpose)

**Ericsson AXD301**:
- Achieved **99.9999999% uptime**
- 1.7 million lines of Erlang
- Handled ~40% of global mobile traffic at peak

**Why Telecom Loves Erlang**:
- Cannot afford any downtime
- Handles millions of concurrent connections
- Geographic distribution across nodes
- Hot swapping allows updates on live switches

### 💬 Messaging Systems

| System | Details |
|--------|---------|
| **WhatsApp** | 2+ billion users, ~50 engineers, acquired for $19B |
| **ejabberd** | XMPP server powering millions of users |
| **RabbitMQ** | World's most popular open-source message broker |
| **MongooseIM** | Enterprise-grade instant messaging |

### 🗄️ Distributed Databases

- **CouchDB** — NoSQL database written entirely in Erlang; multi-master replication
- **Riak** — Distributed key-value store; used by GitHub, Comcast, NHS

### 🎮 Gaming

- **League of Legends** — Chat infrastructure
- **Call of Duty** — Matchmaking backend
- **Nintendo** — Online services
- **Bet365** — Real-time betting platform

### 💰 Financial Services

- **Goldman Sachs** — Trading systems
- **Klarna** — Payment processing
- **High-frequency trading** — Low-latency message processing

### 🌐 Web & Infrastructure

- **Discord** — Elixir (on BEAM) powers real-time communication
- **Heroku** — Internal routing layer
- **T-Mobile** — Network infrastructure

---

## Advantages

| # | Advantage | Summary |
|---|-----------|---------|
| 1 | **Unmatched Reliability** | 99.9999999% uptime, proven for decades |
| 2 | **Massive Scalability** | Millions of lightweight processes per node |
| 3 | **True Concurrency** | 2.5 KB per process, message passing, no shared state |
| 4 | **Hot Code Swapping** | Update critical systems without any downtime |
| 5 | **Native Distribution** | Node clustering, location transparency |
| 6 | **Let It Crash Simplicity** | Supervisors handle recovery, code stays clean |
| 7 | **Soft Real-Time** | Per-process GC — no global GC pauses |
| 8 | **Immutability** | No race conditions, easier debugging |
| 9 | **Battle-Tested** | 35+ years in telecom production environments |
| 10 | **OTP Ecosystem** | Proven patterns for servers, supervisors, state machines |

---

## Disadvantages

| # | Disadvantage | Explanation |
|---|-------------|-------------|
| 1 | **Unconventional Syntax** | Prolog-inspired, period-terminated statements |
| 2 | **Not for CPU-Intensive Work** | Optimized for I/O; use NIFs for heavy computation |
| 3 | **Awkward String Handling** | Strings are lists of integers; binaries preferred |
| 4 | **Smaller Ecosystem** | ~25,000 packages vs npm's millions |
| 5 | **Limited Type System** | Dynamic only; Dialyzer helps but no compile-time checks |
| 6 | **Elixir Overshadowing** | New projects often prefer Elixir (same VM, nicer DX) |
| 7 | **Debugging Distributed Systems** | Complex to trace across nodes |
| 8 | **Record System** | Records are compile-time tuples, awkward to use |

---

## Erlang vs Other Languages

### Erlang vs Elixir

| Feature | Erlang | Elixir |
|---------|--------|--------|
| **VM** | BEAM (original) | BEAM (same!) |
| **Syntax** | Prolog-like | Ruby-like |
| **Ecosystem** | Mature, stable | Modern, growing |
| **Tooling** | rebar3 | Mix (excellent) |
| **Best For** | Telecom, legacy systems | New projects, web (Phoenix) |

**Verdict**: Learn Elixir for new projects; learn Erlang to truly understand the BEAM.

### Erlang vs Go

| Feature | Erlang | Go |
|---------|--------|-----|
| **Concurrency** | BEAM actor processes | Goroutines + channels |
| **Fault Tolerance** | Built-in supervisors | Manual error handling |
| **Performance** | Excellent I/O-bound | Excellent CPU-bound |
| **Distribution** | Native | Requires libraries |
| **Learning Curve** | Steeper | Gentle |

---

## Real-World Impact

### WhatsApp Acquisition
- Facebook acquired for **$19 billion**
- Built by **50–100 engineers** with Erlang at the core
- **2+ billion users** worldwide on minimal infrastructure

### Ericsson AXD301
- **99.9999999% uptime** — 31.5 ms downtime per year
- Handled **~40% of global mobile traffic**
- 1.7 million lines of Erlang in production

### RabbitMQ
- World's most popular open-source message broker
- Written entirely in Erlang
- Used by NASA, AT&T, VMware — processing millions of messages/second

---

## Who Should Learn Erlang?

### ✅ Perfect For:
- **Distributed systems engineers** building highly available services
- **Telecom developers** working with existing Erlang systems
- **Backend engineers** handling millions of concurrent connections
- **System architects** studying fault-tolerance patterns
- **BEAM VM enthusiasts** — essential foundation for Elixir/Gleam

### 💡 Consider Elixir Instead If:
- You are new to the BEAM ecosystem (Elixir is more approachable)
- Your focus is web development (Phoenix framework)
- You want modern tooling (Mix is superior to rebar3)
- You are starting a greenfield project

---

## Learning Resources

### Official
- [erlang.org](https://www.erlang.org/) — Official documentation and downloads
- [Learn You Some Erlang](https://learnyousomeerlang.com/) — Free, excellent community book

### Books
- *Programming Erlang* — Joe Armstrong (the creator)
- *Erlang Programming* — Cesarini & Thompson
- *Designing for Scalability with Erlang/OTP* — Cesarini & Vinoski

### Online
- [Erlang Forums](https://erlangforums.com/)
- [Hex.pm](https://hex.pm/) — Package repository (shared with Elixir)

---

## Legacy & Future

### Erlang Created:
- The **Actor Model** practical implementation
- **Let-it-crash** fault-tolerance philosophy
- **OTP** framework design patterns
- The **BEAM VM** (now powers Erlang, Elixir, and Gleam)

### Erlang Influenced:
- **Elixir** — Modern language on BEAM
- **Akka** (Scala) — Actor model for JVM
- **Orleans** (.NET) — Virtual actors
- All modern distributed systems thinking

### Outlook: 🟢 Stable Niche
- Will remain in telecom infrastructure indefinitely
- Foundation of the growing BEAM ecosystem
- Elixir takes new developers; Erlang runs critical systems
- Will outlive many "modern" languages

---

## User Guide

This guide walks you from zero to writing production-quality Erlang code. It covers installation, syntax, OTP patterns, testing, and deployment.

---

### Installation

#### On Windows

1. Download the official installer from [Erlang.org Downloads](https://www.erlang.org/downloads).
2. Run the `.exe` installer and follow the prompts.
3. Add Erlang's `bin` directory to your `PATH` (e.g., `C:\Program Files\Erlang OTP\bin`).
4. Verify installation:

```powershell
erl -version
```

#### On macOS

```bash
# Using Homebrew
brew install erlang

# Verify
erl -version
```

#### On Ubuntu/Debian

```bash
# Official Erlang Solutions repository (recommended for latest version)
wget https://packages.erlang-solutions.com/erlang-solutions_2.0_all.deb
sudo dpkg -i erlang-solutions_2.0_all.deb
sudo apt-get update
sudo apt-get install -y esl-erlang

# Or via apt (older version)
sudo apt-get install -y erlang

# Verify
erl -version
```

#### On Fedora/RHEL

```bash
sudo dnf install erlang
erl -version
```

#### Using asdf (Version Manager — Recommended)

```bash
# Install asdf first (https://asdf-vm.com)
asdf plugin add erlang
asdf install erlang 26.2.5
asdf global erlang 26.2.5
erl -version
```

---

### Your First Erlang Program

#### 1. Start the Erlang Shell (REPL)

```bash
erl
```

You will see:

```
Erlang/OTP 26 [erts-14.2] ...
Eshell V14.2 (press Ctrl+G to abort)
1>
```

#### 2. Run expressions in the shell

```erlang
% Arithmetic
1> 2 + 3.
5
2> 10 * 4.
40

% Strings (binaries)
3> <<"Hello, Erlang!">>.
<<"Hello, Erlang!">>

% Exit the shell
4> q().
```

#### 3. Create your first module

Create a file called `hello.erl`:

```erlang
-module(hello).
-export([greet/1]).

greet(Name) ->
    io:format("Hello, ~s!~n", [Name]).
```

#### 4. Compile and run

```bash
erl
```

```erlang
1> c(hello).           % compile hello.erl
{ok,hello}
2> hello:greet("World").
Hello, World!
ok
```

---

### Basic Syntax

#### Comments

```erlang
% This is a single-line comment. Erlang has no block comments.
```

#### Variables

Variables in Erlang start with an **uppercase letter** or `_` (underscore). They are **immutable** — once bound, they cannot be rebound.

```erlang
Name = "Alice",
Age  = 30,
_Ignored = some_value.   % _ prefix means intentionally unused
```

#### Atoms

Atoms are constants whose name is their value. They start with a **lowercase letter** or are enclosed in single quotes.

```erlang
ok
error
true
false
'Hello World'     % atoms with spaces need quotes
my_atom
```

#### Tuples

```erlang
Point = {10, 20}.
Person = {person, "Alice", 30}.
{X, Y} = Point.   % pattern matching to unpack
```

#### Lists

```erlang
Numbers = [1, 2, 3, 4, 5].
[Head | Tail] = Numbers.   % Head = 1, Tail = [2,3,4,5]

% List operations
lists:length([1,2,3]).     % 3
lists:reverse([1,2,3]).    % [3,2,1]
[1,2] ++ [3,4].            % [1,2,3,4]  (concatenation)
[1,2,3] -- [2].            % [1,3]      (difference)
```

#### Maps (Key-Value Store)

```erlang
User = #{name => "Alice", age => 30}.

% Access a value
Name = maps:get(name, User).

% Update a map (returns a new map)
UpdatedUser = User#{age => 31}.

% Pattern match on a map
#{name := N, age := A} = User.
```

#### Binaries (Strings)

In Erlang, use binaries for text (not lists):

```erlang
Bin = <<"Hello, World!">>.
Size = byte_size(Bin).      % 13
Part = binary:part(Bin, 0, 5).  % <<"Hello">>
```

#### If and Case

```erlang
% case expression
grade(Score) ->
    case Score of
        S when S >= 90 -> "A";
        S when S >= 80 -> "B";
        S when S >= 70 -> "C";
        _              -> "F"
    end.

% if expression (guards only, no pattern matching)
classify(X) ->
    if
        X > 0  -> positive;
        X < 0  -> negative;
        X =:= 0 -> zero
    end.
```

---

### Data Types

| Type | Example | Notes |
|------|---------|-------|
| **Integer** | `42`, `-7`, `16#FF` | Arbitrary precision |
| **Float** | `3.14`, `1.0e10` | IEEE 754 double |
| **Atom** | `ok`, `error`, `true` | Symbolic constant |
| **boolean** | `true`, `false` | Atoms |
| **Tuple** | `{ok, Value}` | Fixed-size container |
| **List** | `[1, 2, 3]` | Singly-linked list |
| **Map** | `#{key => val}` | Key-value store |
| **Binary** | `<<"text">>` | Byte string |
| **String** | `"text"` | Shorthand for list of chars |
| **Pid** | `<0.80.0>` | Process identifier |
| **Reference** | `make_ref()` | Unique reference |
| **Fun** | `fun(X) -> X + 1 end` | Anonymous function |

---

### Pattern Matching

Pattern matching is the cornerstone of Erlang programming. The `=` operator is a match operator, not assignment.

```erlang
% Basic matching
{ok, Value} = {ok, 42}.       % Value = 42
{error, Reason} = {error, not_found}.  % Reason = not_found

% List matching
[H | T] = [1, 2, 3].          % H = 1, T = [2, 3]
[A, B | _] = [10, 20, 30].    % A = 10, B = 20

% Function clause matching
describe(0)        -> "zero";
describe(N) when N > 0 -> "positive";
describe(_)        -> "negative".

% Tuple matching
process({add, X, Y})  -> X + Y;
process({sub, X, Y})  -> X - Y;
process({mul, X, Y})  -> X * Y.

% Map matching
handle(#{type := login,  user := U}) -> io:format("Login: ~s~n", [U]);
handle(#{type := logout, user := U}) -> io:format("Logout: ~s~n", [U]).
```

---

### Functions & Modules

#### Module Structure

Every Erlang file contains exactly one module.

```erlang
%% File: math_utils.erl

-module(math_utils).

%% Export public API: function_name/arity
-export([add/2, subtract/2, factorial/1, fibonacci/1]).

%% Public functions
add(A, B) -> A + B.

subtract(A, B) -> A - B.

%% Recursive functions
factorial(0) -> 1;
factorial(N) when N > 0 -> N * factorial(N - 1).

fibonacci(0) -> 0;
fibonacci(1) -> 1;
fibonacci(N) -> fibonacci(N - 1) + fibonacci(N - 2).

%% Private helper (not exported)
is_even(N) -> N rem 2 =:= 0.
```

#### Higher-Order Functions

```erlang
%% Anonymous functions (funs)
Double = fun(X) -> X * 2 end.
Double(5).   % 10

%% Passing functions
lists:map(fun(X) -> X * 2 end, [1, 2, 3]).   % [2, 4, 6]
lists:filter(fun(X) -> X > 2 end, [1, 2, 3, 4]).  % [3, 4]
lists:foldl(fun(X, Acc) -> X + Acc end, 0, [1, 2, 3]).  % 6

%% List comprehensions
Squares = [X * X || X <- [1, 2, 3, 4, 5]].
% [1, 4, 9, 16, 25]

EvenSquares = [X * X || X <- lists:seq(1, 10), X rem 2 =:= 0].
% [4, 16, 36, 64, 100]
```

#### Guards

Guards are additional constraints on function clauses:

```erlang
max(X, Y) when X >= Y -> X;
max(_, Y) -> Y.

classify_age(Age) when Age < 0             -> invalid;
classify_age(Age) when Age >= 0, Age < 18  -> minor;
classify_age(Age) when Age >= 18, Age < 65 -> adult;
classify_age(_)                             -> senior.
```

---

### Processes & Concurrency

Erlang's concurrency model is based on lightweight **processes** that communicate via **message passing**. There is no shared memory.

#### Spawning Processes

```erlang
%% Spawn a process
Pid = spawn(fun() -> io:format("I am a process!~n") end).

%% Spawn with a module function
Pid2 = spawn(module_name, function_name, [Args]).
```

#### Sending & Receiving Messages

```erlang
%% Send a message: Pid ! Message
self() ! hello.

%% Receive messages
receive
    hello ->
        io:format("Got hello!~n");
    {from, Sender, Msg} ->
        io:format("Got ~p from ~p~n", [Msg, Sender]);
    Other ->
        io:format("Unknown: ~p~n", [Other])
after 5000 ->
    io:format("Timeout after 5 seconds~n")
end.
```

#### A Complete Echo Server Example

```erlang
-module(echo_server).
-export([start/0, send/2]).

start() ->
    spawn(fun loop/0).

loop() ->
    receive
        {From, Msg} ->
            From ! {echo, Msg},
            loop();
        stop ->
            ok
    end.

send(Pid, Msg) ->
    Pid ! {self(), Msg},
    receive
        {echo, Reply} -> Reply
    after 5000 ->
        timeout
    end.
```

Usage:

```erlang
1> Pid = echo_server:start().
2> echo_server:send(Pid, "Hello!").
"Hello!"
```

#### Process Links and Monitors

```erlang
%% Link: if one dies, the other gets an exit signal
Pid = spawn_link(fun() -> do_work() end).

%% Monitor: receive a message when process dies
Ref = monitor(process, Pid).
receive
    {'DOWN', Ref, process, Pid, Reason} ->
        io:format("Process died: ~p~n", [Reason])
end.
```

---

### OTP Framework

OTP (Open Telecom Platform) provides battle-proven patterns for building robust systems.

#### GenServer — Generic Server

A `GenServer` is a process that maintains state and responds to synchronous calls and asynchronous casts.

```erlang
-module(counter).
-behaviour(gen_server).

%% API
-export([start_link/0, increment/1, get_count/1, reset/1]).

%% gen_server callbacks
-export([init/1, handle_call/3, handle_cast/2, handle_info/2,
         terminate/2, code_change/3]).

%%% API Functions %%%

start_link() ->
    gen_server:start_link({local, ?MODULE}, ?MODULE, [], []).

increment(Pid) ->
    gen_server:cast(Pid, increment).

get_count(Pid) ->
    gen_server:call(Pid, get_count).

reset(Pid) ->
    gen_server:call(Pid, reset).

%%% Callbacks %%%

init([]) ->
    {ok, 0}.   % initial state = 0

handle_call(get_count, _From, State) ->
    {reply, State, State};

handle_call(reset, _From, _State) ->
    {reply, ok, 0};

handle_call(_Request, _From, State) ->
    {reply, {error, unknown_request}, State}.

handle_cast(increment, State) ->
    {noreply, State + 1};

handle_cast(_Msg, State) ->
    {noreply, State}.

handle_info(_Info, State) ->
    {noreply, State}.

terminate(_Reason, _State) ->
    ok.

code_change(_OldVsn, State, _Extra) ->
    {ok, State}.
```

Usage:

```erlang
1> {ok, Pid} = counter:start_link().
2> counter:increment(Pid).
3> counter:increment(Pid).
4> counter:get_count(Pid).
2
5> counter:reset(Pid).
6> counter:get_count(Pid).
0
```

#### Supervisor — Fault Tolerance

A `Supervisor` monitors child processes and restarts them according to a defined strategy.

```erlang
-module(my_supervisor).
-behaviour(supervisor).

-export([start_link/0, init/1]).

start_link() ->
    supervisor:start_link({local, ?MODULE}, ?MODULE, []).

init([]) ->
    %% Child specification
    ChildSpec = #{
        id      => counter,
        start   => {counter, start_link, []},
        restart => permanent,    % always restart
        type    => worker,
        modules => [counter]
    },

    %% Supervisor flags
    SupFlags = #{
        strategy  => one_for_one,  % restart only the failed child
        intensity => 5,            % max 5 restarts
        period    => 10            % within 10 seconds
    },

    {ok, {SupFlags, [ChildSpec]}}.
```

**Restart Strategies:**

| Strategy | Behavior |
|----------|---------|
| `one_for_one` | Restart only the failed child |
| `one_for_all` | Restart all children when one fails |
| `rest_for_one` | Restart the failed child and all children started after it |

---

### Error Handling & Supervisors

#### Try/Catch

```erlang
safe_divide(A, B) ->
    try
        A / B
    catch
        error:badarith ->
            {error, division_by_zero};
        _Class:_Reason ->
            {error, unknown}
    end.
```

#### Error Tuples (Idiomatic Erlang)

```erlang
%% Idiomatic: return {ok, Value} or {error, Reason}
read_file(Path) ->
    case file:read_file(Path) of
        {ok, Content}   -> {ok, Content};
        {error, enoent} -> {error, file_not_found};
        {error, Reason} -> {error, Reason}
    end.

%% Client code
case read_file("/tmp/data.txt") of
    {ok, Data}       -> process(Data);
    {error, Reason}  -> log_error(Reason)
end.
```

#### The Let-It-Crash Philosophy

```erlang
%% BAD: defensive coding everywhere
process(Data) ->
    if
        is_binary(Data) ->
            case binary:length(Data) > 0 of
                true ->
                    % ... many nested checks ...
                false ->
                    {error, empty}
            end;
        true ->
            {error, not_binary}
    end.

%% GOOD: let it crash, supervisor handles restart
process(Data) when is_binary(Data), byte_size(Data) > 0 ->
    %% Happy path only — crashes become supervisor events
    do_work(Data).
```

---

### Distributed Erlang

#### Starting Distributed Nodes

```bash
# Terminal 1: Start node A
erl -name nodeA@hostname -setcookie secret_cookie

# Terminal 2: Start node B
erl -name nodeB@hostname -setcookie secret_cookie
```

#### Connecting Nodes

```erlang
%% On nodeA
1> net_adm:ping('nodeB@hostname').
pong   % connected!

2> nodes().
['nodeB@hostname']
```

#### Remote Process Communication

```erlang
%% Send a message to a named process on another node
{server, 'nodeB@hostname'} ! {hello, self()}.

%% Spawn a process on a remote node
Pid = spawn('nodeB@hostname', fun() -> do_work() end).

%% Call a function on a remote node
rpc:call('nodeB@hostname', lists, reverse, [[1,2,3]]).
% [3,2,1]
```

#### Global Process Registration

```erlang
%% Register a process globally (visible across all nodes)
global:register_name(my_server, self()).

%% Look up a globally registered process
Pid = global:whereis_name(my_server).

%% Send to a globally registered process
global:send(my_server, {request, Data}).
```

---

### Build Tools & Project Structure

#### rebar3 (Standard Build Tool)

```bash
# Install rebar3
curl https://s3.amazonaws.com/rebar3/rebar3 -o rebar3
chmod +x rebar3
sudo mv rebar3 /usr/local/bin/

# Create a new OTP application
rebar3 new app my_app

# Create a new release (umbrella project)
rebar3 new release my_system
```

#### Standard Project Structure

```
my_app/
├── src/
│   ├── my_app.app.src          # Application resource file
│   ├── my_app.erl              # Application callback
│   ├── my_app_sup.erl          # Top-level supervisor
│   └── my_app_worker.erl       # Worker GenServer
├── include/
│   └── my_app.hrl              # Shared header files / records
├── test/
│   └── my_app_SUITE.erl        # Common Test suites
├── priv/
│   └── ...                     # Static assets, port drivers
├── rebar.config                # Build configuration
└── README.md
```

#### rebar.config Example

```erlang
{erl_opts, [debug_info]}.

{deps, [
    {cowboy, "2.10.0"},         %% HTTP server
    {jsx,    "3.1.0"},          %% JSON parser
    {hackney, "1.18.1"}         %% HTTP client
]}.

{shell, [{apps, [my_app]}]}.

{profiles, [
    {test, [
        {deps, [{proper, "1.4.0"}]}  %% Property-based testing
    ]}
]}.
```

#### Common rebar3 Commands

```bash
rebar3 compile          # Compile the project
rebar3 shell            # Start an interactive shell with your app loaded
rebar3 eunit            # Run EUnit tests
rebar3 ct               # Run Common Test suites
rebar3 dialyzer         # Run static type analysis
rebar3 release          # Build a deployable release
rebar3 tar              # Create a tarball of the release
rebar3 upgrade          # Upgrade dependencies
rebar3 clean            # Clean build artifacts
```

---

### Testing

#### EUnit (Unit Testing)

```erlang
-module(math_utils_tests).
-include_lib("eunit/include/eunit.hrl").

add_test() ->
    ?assertEqual(5,  math_utils:add(2, 3)),
    ?assertEqual(-1, math_utils:add(2, -3)),
    ?assertEqual(0,  math_utils:add(0, 0)).

factorial_test_() ->
    [
        ?_assertEqual(1,   math_utils:factorial(0)),
        ?_assertEqual(1,   math_utils:factorial(1)),
        ?_assertEqual(120, math_utils:factorial(5))
    ].

divide_by_zero_test() ->
    ?assertError(badarith, 1 / 0).
```

Run:
```bash
rebar3 eunit
```

#### Common Test (Integration Testing)

```erlang
-module(my_app_SUITE).
-include_lib("common_test/include/ct.hrl").

%% Required exports
-export([all/0, init_per_suite/1, end_per_suite/1]).
-export([basic_ping_test/1, counter_test/1]).

all() -> [basic_ping_test, counter_test].

init_per_suite(Config) ->
    {ok, _} = application:ensure_all_started(my_app),
    Config.

end_per_suite(_Config) ->
    application:stop(my_app).

basic_ping_test(_Config) ->
    Pid = whereis(my_server),
    true = is_pid(Pid).

counter_test(_Config) ->
    {ok, C} = counter:start_link(),
    counter:increment(C),
    counter:increment(C),
    2 = counter:get_count(C).
```

Run:
```bash
rebar3 ct
```

#### Property-Based Testing with PropEr

```erlang
-module(math_props).
-include_lib("proper/include/proper.hrl").
-include_lib("eunit/include/eunit.hrl").

%% Property: reversing a list twice gives the original list
prop_reverse() ->
    ?FORALL(List, list(integer()),
        lists:reverse(lists:reverse(List)) =:= List).

%% Property: sort is idempotent
prop_sort_idempotent() ->
    ?FORALL(List, list(integer()),
        lists:sort(List) =:= lists:sort(lists:sort(List))).

proper_test_() ->
    [{atom_to_list(F), fun() -> ?assert(proper:quickcheck(?MODULE:F())) end}
     || {F, 0} <- ?MODULE:module_info(exports),
        lists:prefix("prop_", atom_to_list(F))].
```

---

### Debugging & Tracing

#### Erlang Shell Basics

```erlang
%% Check running processes
processes().

%% Process info
process_info(Pid).
process_info(Pid, [status, message_queue_len, memory]).

%% Current memory usage
erlang:memory().

%% Flush message queue in shell
flush().
```

#### The Observer GUI Tool

```erlang
%% Start the Observer (graphical system monitor)
observer:start().
```

Observer shows:
- Running processes and their memory
- Application supervision trees
- ETS table contents
- System load and scheduler info

#### dbg — Process Tracing

```erlang
%% Start the tracer
dbg:start().
dbg:tracer().

%% Trace all calls to a specific function
dbg:tpl(my_module, my_function, x).

%% Trace all processes
dbg:p(all, c).

%% Stop tracing
dbg:stop_clear().
```

#### io:format Debugging

```erlang
%% Use ~p for pretty-printing terms
io:format("Debug - State: ~p~n", [State]).
io:format("Value: ~p, Type: ~p~n", [Value, erlang:type(Value)]).

%% erlang:display/1 for quick debugging (bypasses group leader)
erlang:display({debug, MyValue}).
```

#### Logging with logger (OTP 21+)

```erlang
%% Application configuration (sys.config)
[
  {kernel, [
    {logger_level, info},
    {logger, [
      {handler, default, logger_std_h, #{
        config => #{file => "logs/app.log"}
      }}
    ]}
  ]}
].

%% Usage in code
-include_lib("kernel/include/logger.hrl").

handle_request(Req) ->
    ?LOG_INFO("Handling request: ~p", [Req]),
    case process(Req) of
        {ok, Result} ->
            ?LOG_DEBUG("Success: ~p", [Result]),
            {ok, Result};
        {error, Reason} ->
            ?LOG_ERROR("Failed: ~p", [Reason]),
            {error, Reason}
    end.
```

---

### Hot Code Swapping

One of Erlang's most powerful features — you can upgrade a running system with **zero downtime**.

#### How It Works

1. Compile the new version of a module
2. Load it into the running system
3. BEAM keeps two versions simultaneously: **current** and **old**
4. New processes use the new version; old processes migrate on the next function call

#### Manual Hot Swap in the Shell

```erlang
%% Compile and load a new version into the running system
1> c(my_module).
{ok,my_module}

%% Or using code server
2> code:purge(my_module).
3> code:load_file(my_module).
{module, my_module}
```

#### Hot Swap via OTP Release Upgrades

```bash
# Build a release upgrade
rebar3 tar

# Create an appup file describing the upgrade
# src/my_app.appup:
{"2.0.0",
  [{"1.0.0", [{update, my_gen_server, {advanced, []}}]}],
  [{"1.0.0", [{update, my_gen_server, {advanced, []}}]}]
}.

# Apply the upgrade to a running node
rebar3 relup --relvsn 2.0.0 --oldrelvsn 1.0.0
```

---

### Common Patterns & Best Practices

#### 1. Always Use OTP Behaviours

```erlang
%% Good: use gen_server for stateful processes
-behaviour(gen_server).

%% Bad: raw processes without OTP
start() -> spawn(fun loop/0).
loop() -> receive ... end.
```

#### 2. Return Tagged Tuples

```erlang
%% Always return {ok, Value} or {error, Reason}
find_user(Id) ->
    case db:lookup(user, Id) of
        [User]  -> {ok, User};
        []      -> {error, not_found};
        _       -> {error, multiple_results}
    end.
```

#### 3. Use Maps Over Records for New Code

```erlang
%% Records (legacy, compile-time only)
-record(user, {id, name, email}).
#user{id=1, name="Alice"}.

%% Maps (modern, runtime, preferred)
User = #{id => 1, name => "Alice", email => "alice@example.com"}.
#{name := Name} = User.
```

#### 4. Avoid Long Receive Loops Without Timeouts

```erlang
%% Always add an after clause to avoid blocking forever
receive
    {ok, Result} -> Result
after 5000 ->
    {error, timeout}
end.
```

#### 5. Use Binary Strings

```erlang
%% Bad: string as list of integers (inefficient)
Name = "Alice".

%% Good: binary string
Name = <<"Alice">>.
Binary = iolist_to_binary(["Hello, ", Name, "!"]).
```

#### 6. Structure Supervision Trees Thoughtfully

```
Application
└── TopSupervisor (one_for_one)
    ├── DatabaseSupervisor (one_for_all)
    │   ├── ConnectionPool
    │   └── QueryWorker
    └── WebSupervisor (rest_for_one)
        ├── Listener
        └── RequestHandler
```

#### 7. Use Dialyzer for Type Checking

Add `-spec` type annotations for Dialyzer analysis:

```erlang
-spec add(integer(), integer()) -> integer().
add(A, B) -> A + B.

-spec find_user(UserId :: pos_integer()) ->
    {ok, map()} | {error, not_found | database_error}.
find_user(Id) ->
    db:lookup(user, Id).
```

Run:
```bash
rebar3 dialyzer
```

#### 8. Periodic Tasks with gen_server

```erlang
init([]) ->
    %% Schedule first tick
    erlang:send_after(1000, self(), tick),
    {ok, #state{}}.

handle_info(tick, State) ->
    %% Do periodic work
    perform_cleanup(),
    %% Schedule next tick
    erlang:send_after(1000, self(), tick),
    {noreply, State}.
```

---

## Summary

| Use Erlang When | Choose an Alternative When |
|-----------------|---------------------------|
| 99.999%+ uptime is mandatory | Building web apps → **Elixir/Phoenix** |
| Millions of concurrent connections | CPU-heavy computation → **Rust, C++** |
| Maintaining existing Erlang codebases | First programming language → **Python** |
| Understanding BEAM VM fundamentals | Greenfield projects → **Elixir** |
| Telecom / critical infrastructure | Rich library ecosystem needed → **Go, Python** |

---

## Next Steps

1. **[OTP Deep Dive](./otp-deep-dive.md)** — GenServer, GenStateMachine, Supervisors in depth
2. **[Distributed Systems](./distributed-systems.md)** — Clustering, Mnesia, global registries
3. **[Code Examples](./examples/)** — Practical Erlang programs and patterns
4. **[Elixir](../Elixir/Elixir.md)** — Modern BEAM language built on Erlang's foundations

---

*Last Updated: February 20, 2026*
