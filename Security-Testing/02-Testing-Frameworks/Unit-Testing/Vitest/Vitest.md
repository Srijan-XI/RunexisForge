# Vitest

## Introduction

## What is Vitest?

Vitest is a fast unit test framework designed for Vite-powered projects. It supports TypeScript, ESM, watch mode, snapshots, mocking, and coverage.

## Why Vitest?

- Very fast dev feedback
- Great TypeScript support
- Works nicely with Vite projects

## Learning Path

1. Install Vitest.
2. Write simple unit tests.
3. Learn mocking and async testing.
4. Add coverage.

---

## User Guide

## Install (npm)

```bash
npm i -D vitest
```bash

Add a script to `package.json`:

```json
{
  "scripts": {
    "test": "vitest"
  }
}
```bash

Run:

```bash
npm test
```bash

## A simple test

See `Vitest/examples/sum.ts` and `Vitest/examples/sum.test.ts`.

## Tips

- Use `vitest --watch` for watch mode.
- Use `vitest --coverage` if you add a coverage provider.

