# Regular Expressions (Regex) - Pattern Matching

## Table of Contents
- [Introduction](#introduction)
- [Basic Syntax](#basic-syntax)
- [Character Classes](#character-classes)
- [Quantifiers](#quantifiers)
- [Anchors & Boundaries](#anchors--boundaries)
- [Groups & Lookarounds](#groups--lookarounds)
- [Common Patterns](#common-patterns)
  - [Email](#email)
  - [URL](#url)
  - [Date (YYYY-MM-DD)](#date)
- [Usage in Languages](#usage-in-languages)
- [Resources](#resources)

---

## Introduction

**Regular Expressions (Regex)** are a sequence of characters that specify a search pattern. They are used for Find/Replace operations and input validation (e.g., checking if an email is valid).

---

## Basic Syntax

| Symbol | Description | Example | Matches |
|--------|-------------|---------|---------|
| `.` | Any character (except newline) | `a.c` | abc, a@c |
| `\` | Escape special character | `\.` | . |
| `|` | OR | `cat|dog` | cat, dog |

---

## Character Classes

| Symbol | Description | Equivalent |
|--------|-------------|------------|
| `\d` | Digit | `[0-9]` |
| `\w` | Word char (Alphanumeric + _) | `[a-zA-Z0-9_]` |
| `\s` | Whitespace (space, tab, newline) | `[\t\r\n\f]` |
| `\D` | Non-digit | `[^0-9]` |
| `\W` | Non-word char | `[^a-zA-Z0-9_]` |
| `\S` | Non-whitespace | |
| `[...]` | Custom Class | `[aeiou]` |

---

## Quantifiers

How many times the previous character applies.

| Symbol | Description |
|--------|-------------|
| `*` | 0 or more |
| `+` | 1 or more |
| `?` | 0 or 1 (Optional) |
| `{3}` | Exactly 3 |
| `{3,}` | 3 or more |
| `{3,5}` | Between 3 and 5 |

---

## Anchors & Boundaries

| Symbol | Description |
|--------|-------------|
| `^` | Start of string (or line) |
| `$` | End of string (or line) |
| `\b` | Word boundary |

---

## Groups & Lookarounds

-   **(abc)**: Capturing group. Remembers the match.
-   **(?:abc)**: Non-capturing group. Groups without remembering.
-   **(?=abc)**: Positive Lookahead. Matches if followed by "abc".
-   **(?!abc)**: Negative Lookahead. Matches if NOT followed by "abc".

---

## Common Patterns

### Email
*Simplified standard regex (RFC 5322 is too complex)*
```regex
^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$
```

### URL
```regex
https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)
```

### Date (YYYY-MM-DD)
```regex
^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$
```

---

## Usage in Languages

### JavaScript
```javascript
const regex = /hello/i; // i = case insensitive
const str = "Hello World";
console.log(regex.test(str)); // true
console.log(str.match(regex)); // ['Hello']
```

### Python
```python
import re
pattern = r"\d+"
text = "There are 10 cats"
match = re.search(pattern, text)
print(match.group()) # 10
```

---

## Resources

-   [Regex101](https://regex101.com/) - The best online tester and debugger.
-   [RegExr](https://regexr.com/)
-   [Awesome Regex](https://github.com/aloisdg/awesome-regex)
