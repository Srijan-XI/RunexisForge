# PlayFramework

## Introduction

## Table of Contents
1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Getting Started](#getting-started)
4. [Routes](#routes)
5. [Controllers](#controllers)
6. [Views](#views)
7. [Forms](#forms)
8. [Database](#database)
9. [Testing](#testing)
10. [Best Practices](#best-practices)
11. [Resources](#resources)

---

## Introduction

Play Framework is a modern, high-productivity web framework for Java and Scala. It provides reactive, non-blocking I/O with excellent developer experience.

### Key Features
- **Reactive**: Non-blocking, async-first architecture
- **Productive**: Hot reload, type safety
- **Modular**: REST API or full-stack web applications
- **RESTful**: Built for API development
- **Tested**: Large test suite and tooling
- **Scalable**: High concurrency support
- **Type-safe**: Compile-time checking

### Why Play?
- Excellent developer experience
- Reactive by default
- Great for REST APIs
- Type-safe templating
- Strong community
- Production-proven

---

## Installation

### Create Project
```bash
# Using Play Templates
sbt new playframework/play-java-seed.g8
# or
sbt new playframework/play-scala-seed.g8

cd my-app
sbt run
```

---

## Getting Started

### Hello World Controller (Java)
```java
package controllers;

import play.mvc.Controller;
import play.mvc.Result;
import static play.mvc.Results.ok;

public class HomeController extends Controller {
  public Result index() {
    return ok("Hello, Play Framework!");
  }
}
```

### Routes Configuration
Create `conf/routes`:
```
GET   /                 controllers.HomeController.index()
GET   /about            controllers.HomeController.about()
POST  /users            controllers.UserController.create()
GET   /users/:id        controllers.UserController.show(id: Long)
```

---

## Routes

### Route Patterns
```
# Simple routes
GET   /about             controllers.Pages.about()

# With parameters
GET   /items/:id         controllers.Items.show(id: Long)

# Multiple parameters
GET   /users/:userId/posts/:postId   controllers.Posts.show(userId: Long, postId: Long)

# Query parameters
GET   /search            controllers.Search.query(q: String, limit: Int ?= 10)

# Regex routes
GET   /files/*filepath   controllers.Files.download(filepath)

# Static files
GET   /assets/*file      controllers.Assets.at(path="/public", file)
```

---

## Controllers

### Basic Controller
```java
import play.mvc.*;

public class UserController extends Controller {
  // GET /users
  public Result list() {
    List<User> users = User.find.all();
    return ok(Json.toJson(users));
  }

  // GET /users/1
  public Result show(Long id) {
    User user = User.find.byId(id);
    if (user == null) {
      return notFound("User not found");
    }
    return ok(Json.toJson(user));
  }

  // POST /users
  public Result create() {
    JsonNode json = request().body().asJson();
    User user = Json.fromJson(json, User.class);
    user.save();
    return created(Json.toJson(user));
  }

  // PUT /users/1
  public Result update(Long id) {
    JsonNode json = request().body().asJson();
    User user = User.find.byId(id);
    user.update(json);
    user.update();
    return ok(Json.toJson(user));
  }

  // DELETE /users/1
  public Result delete(Long id) {
    User.find.byId(id).delete();
    return noContent();
  }
}
```

### Async Actions
```java
public CompletionStage<Result> asyncAction() {
  return userService.getUser(1)
    .thenApply(user -> ok(Json.toJson(user)))
    .exceptionally(e -> internalServerError("Error"));
}
```

---

## Views

### Twirl Templates (Java)
Create `app/views/user.scala.html`:
```html
@(user: models.User)

<!DOCTYPE html>
<html>
  <head>
    <title>@user.name</title>
  </head>
  <body>
    <h1>@user.name</h1>
    <p>Email: @user.email</p>
    <a href="@routes.UserController.list()">Back to Users</a>
  </body>
</html>
```

Render from controller:
```java
public Result show(Long id) {
  User user = User.find.byId(id);
  return ok(views.html.user.render(user));
}
```

### Loops and Conditionals
```html
@(users: List[User])

<ul>
  @for(user <- users) {
    <li>
      <a href="@routes.UserController.show(user.id)">
        @user.name
      </a>
      @if(user.premium) {
        <span class="badge">Premium</span>
      }
    </li>
  }
</ul>
```

---

## Forms

### Form Binding
```java
// Controller
public Result saveUser() {
  Form<User> form = formFactory.form(User.class).bindFromRequest();
  
  if (form.hasErrors()) {
    return badRequest(form.errorsAsJson());
  }
  
  User user = form.get();
  user.save();
  return ok("User saved");
}

// Model
public class User {
  public Long id;
  
  @Constraints.Required
  @Constraints.Email
  public String email;
  
  @Constraints.Required
  @Constraints.MinLength(3)
  public String name;
}
```

---

## Database

### Ebean ORM
```java
import io.ebean.Finder;
import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {
  @Id
  public Long id;
  
  @Column
  public String name;
  
  @Column
  public String email;
  
  // Finder
  public static final Finder<Long, User> find = new Finder<>(User.class);
  
  public static User findById(Long id) {
    return find.byId(id);
  }
  
  public static List<User> all() {
    return find.all();
  }
}
```

---

## Testing

### Controller Test
```java
import org.junit.jupiter.api.Test;
import play.test.WithApplication;
import play.mvc.Http;
import static org.junit.jupiter.api.Assertions.*;
import static play.mvc.Http.Status.*;

public class UserControllerTest extends WithApplication {
  @Test
  public void testListUsers() {
    Http.RequestBuilder request = Helpers.fakeRequest()
      .method(GET)
      .uri("/users");
    
    Result result = route(app, request);
    assertEquals(OK, result.status());
  }
}
```

---

## Best Practices

### 1. Project Structure
```
conf/
├── application.conf
└── routes

app/
├── controllers/
├── models/
├── services/
└── views/

test/
```

### 2. Configuration
```properties
# application.conf
play.server.provider = play.core.server.NettyServerProvider
play.http.secret.key = "..."
play.evolutions.enabled = true

db.default.driver = org.postgresql.Driver
db.default.url = "jdbc:postgresql://localhost:5432/mydb"
db.default.username = "postgres"
db.default.password = "password"
```

---

## Resources

- [Play Framework Guide](https://www.playframework.com/documentation)
- [Play Samples](https://github.com/playframework/playframework/tree/main/samples)

---

## Summary

Play Framework offers high productivity with reactive, non-blocking I/O.

✅ Type-safe  
✅ Hot reload  
✅ Reactive  
✅ RESTful  
✅ Full-stack  

**Excellent for modern web applications!**

