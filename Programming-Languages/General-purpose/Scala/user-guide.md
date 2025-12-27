# Scala Installation and Usage Guide

## Install

- Install Java 17+
- Install sbt from <https://www.scala-sbt.org/download.html> or Scala CLI from <https://scala-cli.virtuslab.org>
- Verify: `sbt --version` or `scala-cli --version`

## Quick Start with Scala CLI

```bash
scala-cli repl
scala-cli run Hello.scala
```bash

### Minimal Program

```scala
@main def hello() = println("Hello, Scala")
```bash

Run with `scala-cli run Hello.scala`.

## sbt Project Skeleton

```bash
sbt new scala/scala-seed.g8
cd <project>
sbt run
```bash

## Build & Test

```bash
sbt compile
sbt test
```bash

## Dependencies (sbt)

```scala
libraryDependencies += "org.typelevel" %% "cats-core" % "2.10.0"
```bash

## Key Concepts

- `case class` for immutable data with pattern matching
- `trait` for interfaces/mixins
- `given`/`using` for context parameters (Scala 3)
- `Option`, `Either`, `Future` for effects

## Next Steps

- Explore Play Framework or http4s for services
- Use `scalafmt` for formatting and `scalafix` for refactoring
- Try Spark: `libraryDependencies += "org.apache.spark" %% "spark-sql" % "<ver>"`
