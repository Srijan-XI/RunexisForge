# Vapor

## Introduction

## Table of Contents
1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Getting Started](#getting-started)
4. [Routing](#routing)
5. [Controllers](#controllers)
6. [Request/Response](#requestresponse)
7. [Database](#database)
8. [Middleware](#middleware)
9. [Testing](#testing)
10. [Best Practices](#best-practices)
11. [Resources](#resources)

---

## Introduction

Vapor is an elegant, safe, and performant web framework for Swift. It enables building complete server-side applications using the Swift programming language.

### Key Features
- **Type-safe**: Full type safety across framework
- **Async/await**: Modern async patterns
- **Cross-platform**: Works on Linux and macOS
- **RESTful**: Built for API development
- **Database support**: Multiple database backends
- **Templating**: Leaf templating engine
- **Testing**: Excellent testing support
- **Community**: Strong community and ecosystem

### Why Vapor?
- Swift everywhere (client and server)
- Type-safe web development
- Great performance
- Modern async/await
- Excellent developer experience
- Cross-platform support

---

## Installation

### macOS
```
# Using Homebrew
brew install vapor

# Or download from vapor.codes
```

### Linux
```
# Ubuntu/Debian
curl -sL https://apt.vapor.codes | sudo bash
sudo apt-get install vapor

# Or from source
git clone https://github.com/vapor/vapor.git
```

### Create Project
```
vapor new my-app
cd my-app
swift build
swift run
```

---

## Getting Started

### Hello World
Create `Sources/App/routes.swift`:
```swift
import Vapor

func routes(_ app: Application) throws {
  app.get("hello") { req -> String in
    return "Hello, Vapor!"
  }
}
```

Create `Sources/App/main.swift`:
```swift
import Vapor

var env = try Environment.detect()
try LoggingSystem.bootstrap(from: &env)
let app = Application(env)
defer { app.shutdown() }

try configure(app)
try routes(app)
try app.run()
```

### JSON Response
```swift
struct Message: Content {
  let text: String
  let timestamp: Date
}

app.get("api", "message") { req -> Message in
  return Message(text: "Hello", timestamp: Date())
}
```

---

## Routing

### Basic Routes
```swift
app.get("") { req -> String in
  return "Home"
}

app.get("about") { req -> String in
  return "About"
}

app.get("contact") { req -> String in
  return "Contact"
}
```

### Path Parameters
```swift
app.get("users", ":id") { req -> String in
  let id = req.parameters.get("id")!
  return "User: \(id)"
}

app.get("posts", ":postId", "comments", ":commentId") { req -> String in
  let postId = req.parameters.get("postId")!
  let commentId = req.parameters.get("commentId")!
  return "Post \(postId), Comment \(commentId)"
}
```

### Query Parameters
```swift
app.get("search") { req -> String in
  let query = req.query[String.self, at: "q"] ?? ""
  let limit = req.query[Int.self, at: "limit"] ?? 10
  return "Query: \(query), Limit: \(limit)"
}
```

### HTTP Methods
```swift
// GET
app.get("items") { req -> String in
  return "GET /items"
}

// POST
app.post("items") { req -> String in
  return "POST /items"
}

// PUT
app.put("items", ":id") { req -> String in
  return "PUT /items"
}

// DELETE
app.delete("items", ":id") { req -> String in
  return "DELETE /items"
}
```

---

## Controllers

### Basic Controller
```swift
import Vapor

struct UserController: RouteCollection {
  func boot(routes: RoutesBuilder) throws {
    let users = routes.grouped("users")
    users.get(use: index)
    users.post(use: create)
    users.group(":id") { user in
      user.get(use: show)
      user.put(use: update)
      user.delete(use: delete)
    }
  }

  func index(req: Request) async throws -> [User] {
    return try await User.query(on: req.db).all()
  }

  func show(req: Request) async throws -> User {
    guard let user = try await User.find(req.parameters.get("id"), on: req.db) else {
      throw Abort(.notFound)
    }
    return user
  }

  func create(req: Request) async throws -> User {
    let user = try req.content.decode(User.self)
    try await user.save(on: req.db)
    return user
  }

  func update(req: Request) async throws -> User {
    guard let user = try await User.find(req.parameters.get("id"), on: req.db) else {
      throw Abort(.notFound)
    }
    let updated = try req.content.decode(User.self)
    user.name = updated.name
    user.email = updated.email
    try await user.save(on: req.db)
    return user
  }

  func delete(req: Request) async throws -> HTTPStatus {
    guard let user = try await User.find(req.parameters.get("id"), on: req.db) else {
      throw Abort(.notFound)
    }
    try await user.delete(on: req.db)
    return .noContent
  }
}

// Register controller
try routes.register(collection: UserController())
```

---

## Request/Response

### Decoding Request Body
```swift
struct CreateUserRequest: Content {
  let name: String
  let email: String
}

app.post("users") { req -> User in
  let create = try req.content.decode(CreateUserRequest.self)
  let user = User(name: create.name, email: create.email)
  try await user.save(on: req.db)
  return user
}
```

### Custom Response Headers
```swift
app.get("custom") { req -> Response in
  let response = Response(status: .ok, body: .init(string: "OK"))
  response.headers.add(name: "X-Custom-Header", value: "value")
  return response
}
```

### File Upload
```swift
app.post("upload") { req -> String in
  let file = try req.fileio.collectFile(at: req.url.path)
  // Process file
  return "File uploaded"
}
```

---

## Database

### Fluent ORM
```swift
import Fluent
import FluentPostgresDriver

final class User: Model, Content {
  static let schema = "users"

  @ID(key: .id)
  var id: UUID?

  @Field(key: "name")
  var name: String

  @Field(key: "email")
  var email: String

  @Timestamp(key: "created_at", on: .create)
  var createdAt: Date?

  init() {}

  init(id: UUID? = nil, name: String, email: String) {
    self.id = id
    self.name = name
    self.email = email
  }
}

// Database Configuration
app.databases.use(.postgres(
  hostname: "localhost",
  port: 5432,
  username: "postgres",
  password: "password",
  database: "mydb"
), as: .psql)

// Migrations
struct CreateUserMigration: AsyncMigration {
  func prepare(on database: Database) async throws {
    try await database.schema("users")
      .id()
      .field("name", .string, .required)
      .field("email", .string, .required)
      .field("created_at", .datetime)
      .create()
  }

  func revert(on database: Database) async throws {
    try await database.schema("users").delete()
  }
}

app.migrations.add(CreateUserMigration())
```

### Querying
```swift
// Find all
let users = try await User.query(on: req.db).all()

// Find by ID
let user = try await User.find(id, on: req.db)

// Filter
let admins = try await User.query(on: req.db)
  .filter(\.$role == "admin")
  .all()

// Count
let count = try await User.query(on: req.db).count()
```

---

## Middleware

### Custom Middleware
```swift
struct LoggingMiddleware: AsyncMiddleware {
  func respond(to request: Request, chainingTo next: AsyncResponder) async throws -> Response {
    print("[\(request.method)] \(request.url)")
    let response = try await next.respond(to: request)
    print("Status: \(response.status)")
    return response
  }
}

app.middleware.use(LoggingMiddleware())
```

### Authentication
```swift
struct TokenAuthenticator: AsyncBearerAuthenticator {
  typealias User = AppUser

  func authenticate(bearer: BearerAuthorization, for request: Request) async throws {
    let token = bearer.token
    if token == "valid-token" {
      request.auth.login(AppUser())
    }
  }
}

app.grouped(TokenAuthenticator())
  .get("protected") { req -> String in
    return "This is protected"
  }
```

---

## Testing

### Unit Test
```swift
import XCTVapor

final class AppTests: XCTestCase {
  func testHello() async throws {
    let app = Application(.testing)
    defer { app.shutdown() }

    try configure(app)

    try await app.test(.GET, "hello") { res in
      XCTAssertEqual(res.status, .ok)
      XCTAssertEqual(try res.content.decode(String.self), "Hello, Vapor!")
    }
  }

  func testJSON() async throws {
    let app = Application(.testing)
    defer { app.shutdown() }

    try configure(app)

    try await app.test(.GET, "api/message") { res in
      XCTAssertEqual(res.status, .ok)
      let message = try res.content.decode(Message.self)
      XCTAssertEqual(message.text, "Hello")
    }
  }
}
```

---

## Best Practices

### 1. Project Structure
```
Sources/App/
├── configure.swift       # Configuration
├── routes.swift          # Routes
├── main.swift            # Entry point
├── Controllers/
│   └── UserController.swift
├── Models/
│   └── User.swift
├── Migrations/
│   └── CreateUserMigration.swift
└── Middleware/
```

### 2. Environment Configuration
```swift
switch env {
case .development:
  app.http.server.configuration.port = 8080
case .production:
  app.http.server.configuration.port = 80
}
```

---

## Resources

- [Vapor Documentation](https://docs.vapor.codes/)
- [Vapor GitHub](https://github.com/vapor/vapor)
- [Vapor Discord](https://discord.gg/vapor)

---

## Summary

Vapor brings modern Swift to server-side development with type safety and great performance.

✅ Type-safe  
✅ Async/await  
✅ Cross-platform  
✅ Excellent community  
✅ Great performance  

**Perfect for Swift developers building web APIs!**

