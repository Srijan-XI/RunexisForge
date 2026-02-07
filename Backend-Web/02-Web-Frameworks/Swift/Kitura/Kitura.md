# Kitura

## Introduction

## Quick Reference

Kitura was a Swift web framework created by IBM. While it's no longer actively maintained, it's included for historical context and learning purposes. **For new Swift projects, use Vapor instead.**

## Key Features (Historical)
- Written entirely in Swift
- REST API development
- Database integration
- Testing support
- OpenAPI/Swagger support

## Basic Example
```swift
import Kitura

let router = Router()

router.get("/") { request, response, next in
    response.send("Hello, Kitura!")
    next()
}

Kitura.addHTTPServer(onPort: 8080, with: router)
Kitura.run()
```

## Status
⚠️ **Archived/Legacy** - Maintenance has ended. Use Vapor for new Swift server projects.

## Learning Value
Kitura was important in the history of Swift server-side development and demonstrated that Swift could be viable for web frameworks. The patterns and concepts influenced modern frameworks like Vapor.

## Resources
- [Kitura GitHub (Archived)](https://github.com/Kitura/Kitura)
- Historical documentation available on web.archive.org

---

**Recommendation**: For production Swift web applications, migrate to or start with **Vapor**, which is actively maintained and offers superior developer experience.

