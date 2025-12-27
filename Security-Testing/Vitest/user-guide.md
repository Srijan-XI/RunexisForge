# Vitest User Guide

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
