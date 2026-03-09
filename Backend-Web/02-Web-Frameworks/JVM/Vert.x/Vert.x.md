# Vert.x

## Introduction

## Table of Contents
1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Getting Started](#getting-started)
4. [Web Server](#web-server)
5. [Routing](#routing)
6. [Async Operations](#async-operations)
7. [Event Bus](#event-bus)
8. [Database Operations](#database-operations)
9. [Request/Response](#requestresponse)
10. [Middleware](#middleware)
11. [Error Handling](#error-handling)
12. [Testing](#testing)
13. [Performance](#performance)
14. [Best Practices](#best-practices)
15. [Resources](#resources)

---

## Introduction

Vert.x is a reactive application framework for the JVM. It enables building scalable, non-blocking applications using an event-driven model inspired by Node.js but with JVM benefits.

### Key Features
- **Reactive**: Event-driven, non-blocking architecture
- **Scalable**: Handle thousands of concurrent connections
- **Polyglot**: Write in Java, Kotlin, Groovy, JavaScript, Ruby
- **Modular**: Verticles for independent components
- **Event Bus**: In-process and distributed messaging
- **Non-blocking I/O**: Async/await style operations
- **Built-in tooling**: Clustering, distribution, monitoring
- **WebSocket support**: Real-time bidirectional communication

### Why Vert.x?
- Extreme scalability and performance
- Non-blocking by design
- Event-driven architecture
- JVM benefits (mature ecosystem, tooling)
- Great for microservices
- Real-time applications
- High-performance APIs

---

## Installation

### Maven Setup
Create `pom.xml`:
```xml
<project>
  <modelVersion>4.0.0</modelVersion>
  <groupId>com.example</groupId>
  <artifactId>vertx-app</artifactId>
  <version>1.0.0</version>

  <dependencyManagement>
    <dependencies>
      <dependency>
        <groupId>io.vertx</groupId>
        <artifactId>vertx-stack-depchain</artifactId>
        <version>4.5.0</version>
        <type>pom</type>
        <scope>import</scope>
      </dependency>
    </dependencies>
  </dependencyManagement>

  <dependencies>
    <dependency>
      <groupId>io.vertx</groupId>
      <artifactId>vertx-core</artifactId>
    </dependency>
    <dependency>
      <groupId>io.vertx</groupId>
      <artifactId>vertx-web</artifactId>
    </dependency>
  </dependencies>

  <build>
    <plugins>
      <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-shade-plugin</artifactId>
        <version>3.4.1</version>
        <executions>
          <execution>
            <phase>package</phase>
            <goals>
              <goal>shade</goal>
            </goals>
          </execution>
        </executions>
      </plugin>
    </plugins>
  </build>
</project>
```

### Gradle Setup
Create `build.gradle`:
```gradle
plugins {
  id 'java'
  id 'application'
  id 'com.github.johnrengelman.shadow' version '7.1.2'
}

repositories {
  mavenCentral()
}

dependencies {
  implementation 'io.vertx:vertx-core:4.5.0'
  implementation 'io.vertx:vertx-web:4.5.0'
}

application {
  mainClassName = 'com.example.Main'
}

jar {
  manifest {
    attributes 'Main-Class': 'com.example.Main'
  }
}
```

---

## Getting Started

### Hello World Server
```java
import io.vertx.core.Vertx;
import io.vertx.core.http.HttpServer;

public class Main {
  public static void main(String[] args) {
    Vertx vertx = Vertx.vertx();
    
    HttpServer server = vertx.createHttpServer();
    
    server.requestHandler(request -> {
      request.response()
        .putHeader("Content-Type", "text/plain")
        .end("Hello, Vert.x!");
    });
    
    server.listen(8000, result -> {
      if (result.succeeded()) {
        System.out.println("Server listening on http://localhost:8000");
      } else {
        System.err.println("Failed to start server: " + result.cause());
      }
    });
  }
}
```

### JSON Response
```java
HttpServer server = vertx.createHttpServer();

server.requestHandler(request -> {
  JsonObject response = new JsonObject()
    .put("message", "Hello")
    .put("timestamp", System.currentTimeMillis());
  
  request.response()
    .putHeader("Content-Type", "application/json")
    .end(response.encodePrettily());
});

server.listen(8000);
```

---

## Web Server

### Using Vert.x Web
```java
import io.vertx.core.Vertx;
import io.vertx.ext.web.Router;

Vertx vertx = Vertx.vertx();
Router router = Router.router(vertx);

// Simple route
router.get("/").handler(ctx -> {
  ctx.response()
    .putHeader("Content-Type", "text/html")
    .end("<h1>Home</h1>");
});

// JSON endpoint
router.get("/api/data").handler(ctx -> {
  JsonObject data = new JsonObject()
    .put("id", 1)
    .put("name", "John");
  
  ctx.response()
    .putHeader("Content-Type", "application/json")
    .end(data.encodePrettily());
});

vertx.createHttpServer()
  .requestHandler(router)
  .listen(8000);
```

### Server Configuration
```java
HttpServerOptions options = new HttpServerOptions()
  .setPort(8000)
  .setHost("localhost")
  .setLogActivity(true)
  .setCompressionSupported(true)
  .setMaxHeaderSize(8192);

vertx.createHttpServer(options)
  .requestHandler(router)
  .listen();
```

---

## Routing

### Route Parameters
```java
Router router = Router.router(vertx);

// Path parameter
router.get("/users/:id").handler(ctx -> {
  String userId = ctx.pathParam("id");
  ctx.response()
    .putHeader("Content-Type", "application/json")
    .end(new JsonObject()
      .put("userId", userId)
      .encodePrettily());
});

// Multiple parameters
router.get("/posts/:postId/comments/:commentId").handler(ctx -> {
  String postId = ctx.pathParam("postId");
  String commentId = ctx.pathParam("commentId");
  ctx.response().end("Post " + postId + ", Comment " + commentId);
});
```

### Query Parameters
```java
router.get("/search").handler(ctx -> {
  String query = ctx.queryParam("q").stream()
    .findFirst()
    .orElse("");
  
  String limit = ctx.queryParam("limit").stream()
    .findFirst()
    .orElse("10");
  
  ctx.response()
    .putHeader("Content-Type", "application/json")
    .end(new JsonObject()
      .put("query", query)
      .put("limit", Integer.parseInt(limit))
      .encodePrettily());
});
```

### HTTP Methods
```java
// GET
router.get("/items").handler(ctx -> {
  ctx.response().end("GET /items");
});

// POST
router.post("/items").handler(ctx -> {
  ctx.response().end("POST /items");
});

// PUT
router.put("/items/:id").handler(ctx -> {
  ctx.response().end("PUT /items/" + ctx.pathParam("id"));
});

// DELETE
router.delete("/items/:id").handler(ctx -> {
  ctx.response().end("DELETE /items/" + ctx.pathParam("id"));
});

// PATCH
router.patch("/items/:id").handler(ctx -> {
  ctx.response().end("PATCH /items/" + ctx.pathParam("id"));
});
```

---

## Async Operations

### Async Handler Pattern
```java
router.get("/async-data").handler(ctx -> {
  // Non-blocking operation
  vertx.setTimer(1000, timerId -> {
    ctx.response()
      .putHeader("Content-Type", "application/json")
      .end(new JsonObject()
        .put("data", "Delayed response")
        .encodePrettily());
  });
});
```

### Verticles (Async Components)
```java
import io.vertx.core.AbstractVerticle;
import io.vertx.core.Promise;

public class DataVerticle extends AbstractVerticle {
  @Override
  public void start(Promise<Void> startPromise) {
    // Initialize resources
    vertx.createHttpServer()
      .requestHandler(req -> {
        req.response().end("Data Verticle Response");
      })
      .listen(8001, result -> {
        if (result.succeeded()) {
          startPromise.complete();
        } else {
          startPromise.fail(result.cause());
        }
      });
  }

  @Override
  public void stop(Promise<Void> stopPromise) {
    // Cleanup resources
    stopPromise.complete();
  }
}

// Deploy verticle
Vertx vertx = Vertx.vertx();
vertx.deployVerticle(new DataVerticle(), res -> {
  if (res.succeeded()) {
    System.out.println("Verticle deployed");
  }
});
```

### Multiple Instances
```java
DeploymentOptions options = new DeploymentOptions()
  .setInstances(4);  // Run 4 instances

vertx.deployVerticle(new DataVerticle(), options, res -> {
  if (res.succeeded()) {
    System.out.println("4 instances deployed");
  }
});
```

---

## Event Bus

### Publish-Subscribe
```java
// Sender
EventBus eb = vertx.eventBus();

eb.publish("orders.new", new JsonObject()
  .put("orderId", "12345")
  .put("amount", 99.99));

// Receiver
eb.consumer("orders.new", message -> {
  JsonObject order = (JsonObject) message.body();
  System.out.println("New order: " + order.encodePrettily());
});
```

### Request-Reply Pattern
```java
// Handler
eb.consumer("greeting", message -> {
  String name = (String) message.body();
  message.reply("Hello, " + name);
});

// Sender
eb.request("greeting", "Alice", reply -> {
  if (reply.succeeded()) {
    System.out.println(reply.result().body());
  }
});
```

### Distributed Event Bus
```java
ClusterManager clusterManager = new HazelcastClusterManager();

VertxOptions vertxOptions = new VertxOptions()
  .setClusterManager(clusterManager);

Vertx.clusteredVertx(vertxOptions, res -> {
  if (res.succeeded()) {
    Vertx vertx = res.result();
    // Event bus is now distributed
  }
});
```

---

## Database Operations

### JDBC Client
```java
dependencies {
  implementation 'io.vertx:vertx-jdbc-client:4.5.0'
}

// Connection pool
JDBCPool pool = JDBCPool.pool(vertx,
  new JDBCConnectOptions()
    .setJdbcUrl("jdbc:mysql://localhost:3306/mydb")
    .setUser("root")
    .setPassword("password"),
  new PoolOptions().setMaxSize(4)
);

// Query
pool.query("SELECT * FROM users").execute(ar -> {
  if (ar.succeeded()) {
    RowSet<Row> rows = ar.result();
    for (Row row : rows) {
      System.out.println(row.getString("name"));
    }
  }
});

// Prepared statement
pool.preparedQuery("SELECT * FROM users WHERE id = ?")
  .execute(Tuple.of(1), ar -> {
    if (ar.succeeded()) {
      // Handle result
    }
  });
```

### MongoDB Client
```java
dependencies {
  implementation 'io.vertx:vertx-mongo-client:4.5.0'
}

MongoClient mongoClient = MongoClient.createShared(vertx,
  new JsonObject()
    .put("connection_string", "mongodb://localhost:27017")
    .put("db_name", "mydb")
);

// Insert
mongoClient.insertOne("users",
  new JsonObject()
    .put("name", "Alice")
    .put("email", "alice@example.com"),
  res -> {
    if (res.succeeded()) {
      System.out.println("Document inserted");
    }
  });

// Find
mongoClient.find("users",
  new JsonObject().put("name", "Alice"),
  res -> {
    if (res.succeeded()) {
      List<JsonObject> documents = res.result();
      documents.forEach(doc -> System.out.println(doc));
    }
  });
```

---

## Request/Response

### Reading Request Body
```java
router.post("/users").handler(ctx -> {
  ctx.request().bodyHandler(buffer -> {
    JsonObject user = new JsonObject(buffer.toString());
    System.out.println("Received: " + user.encodePrettily());
    
    ctx.response()
      .putHeader("Content-Type", "application/json")
      .setStatusCode(201)
      .end(user);
  });
});
```

### Form Data
```java
router.post("/form").handler(ctx -> {
  MultiMap form = ctx.request().formAttributes();
  String name = form.get("name");
  String email = form.get("email");
  
  ctx.response().end("Name: " + name + ", Email: " + email);
});
```

### File Upload
```java
router.post("/upload").handler(ctx -> {
  for (FileUpload upload : ctx.fileUploads()) {
    System.out.println("Filename: " + upload.fileName());
    System.out.println("Path: " + upload.uploadedFileName());
    
    // Move file
    vertx.fileSystem().move(upload.uploadedFileName(),
      "./uploads/" + upload.fileName(),
      res -> {
        if (res.succeeded()) {
          System.out.println("File saved");
        }
      });
  }
  
  ctx.response().end("File uploaded");
});
```

### Response Headers
```java
router.get("/custom-headers").handler(ctx -> {
  ctx.response()
    .putHeader("X-Custom", "value")
    .putHeader("Cache-Control", "no-cache")
    .putHeader("Content-Type", "application/json")
    .end(new JsonObject().put("data", "test"));
});
```

---

## Middleware

### Request Logging
```java
router.route().handler(ctx -> {
  System.out.println(ctx.request().method() + " " + ctx.request().path());
  ctx.next();
});
```

### CORS Middleware
```java
router.route()
  .handler(CORSHandler.create("*")
    .allowedMethod(HttpMethod.GET)
    .allowedMethod(HttpMethod.POST)
    .allowedMethod(HttpMethod.PUT)
    .allowedMethod(HttpMethod.DELETE)
    .allowedHeader("Content-Type")
    .allowedHeader("Authorization"));

router.get("/api/data").handler(ctx -> {
  ctx.response().end("CORS enabled");
});
```

### Authentication Middleware
```java
router.route("/api/*").handler(ctx -> {
  String token = ctx.request().getHeader("Authorization");
  
  if (token == null || !validateToken(token)) {
    ctx.response().setStatusCode(401).end("Unauthorized");
    return;
  }
  
  ctx.next();
});

router.get("/api/protected").handler(ctx -> {
  ctx.response().end("Protected resource");
});

private static boolean validateToken(String token) {
  return token.startsWith("Bearer ") && token.length() > 7;
}
```

---

## Error Handling

### Exception Handler
```java
router.route().failureHandler(ctx -> {
  Throwable failure = ctx.failure();
  int statusCode = ctx.statusCode() > 0 ? ctx.statusCode() : 500;
  
  ctx.response()
    .setStatusCode(statusCode)
    .putHeader("Content-Type", "application/json")
    .end(new JsonObject()
      .put("error", failure.getMessage())
      .encodePrettily());
});
```

### Try-Catch in Handler
```java
router.get("/json").handler(ctx -> {
  try {
    String jsonString = "{invalid json}";
    JsonObject json = new JsonObject(jsonString);
    ctx.response().end(json.encodePrettily());
  } catch (DecodeException e) {
    ctx.response()
      .setStatusCode(400)
      .putHeader("Content-Type", "application/json")
      .end(new JsonObject()
        .put("error", "Invalid JSON")
        .encodePrettily());
  }
});
```

---

## Testing

### Unit Test with Vert.x Test Suite
```java
import io.vertx.junit5.VertxExtension;
import io.vertx.junit5.VertxTestContext;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

@ExtendWith(VertxExtension.class)
public class ServerTest {
  @Test
  public void testServer(Vertx vertx, VertxTestContext ctx) {
    Router router = Router.router(vertx);
    
    router.get("/test").handler(h -> {
      h.response().end("Test");
    });
    
    vertx.createHttpServer()
      .requestHandler(router)
      .listen(8000, ar -> {
        if (ar.succeeded()) {
          ctx.completeNow();
        } else {
          ctx.failNow(ar.cause());
        }
      });
  }

  @Test
  public void testEndpoint(Vertx vertx, VertxTestContext ctx) {
    WebClient client = WebClient.create(vertx);
    
    client.get(8000, "localhost", "/test")
      .send(ar -> {
        if (ar.succeeded()) {
          assertEquals("Test", ar.result().bodyAsString());
          ctx.completeNow();
        } else {
          ctx.failNow(ar.cause());
        }
      });
  }
}
```

---

## Performance

### Scaling Strategies
- Deploy multiple verticle instances
- Use clustering for distributed processing
- Leverage non-blocking operations
- Use thread pools for blocking operations

### Benchmarking
```
# Using Apache Bench
ab -n 10000 -c 100 http://localhost:8000/

# Using wrk
wrk -t4 -c100 -d30s http://localhost:8000/
```

---

## Best Practices

### 1. Verticle Organization
```java
public class ApiVerticle extends AbstractVerticle {
  private Router router;

  @Override
  public void start(Promise<Void> startPromise) {
    setupRoutes();
    
    vertx.createHttpServer()
      .requestHandler(router)
      .listen(8000, result -> {
        if (result.succeeded()) {
          startPromise.complete();
        } else {
          startPromise.fail(result.cause());
        }
      });
  }

  private void setupRoutes() {
    router = Router.router(vertx);
    router.get("/api/data").handler(this::handleGetData);
    router.post("/api/data").handler(this::handlePostData);
  }

  private void handleGetData(RoutingContext ctx) {
    // Handle GET
  }

  private void handlePostData(RoutingContext ctx) {
    // Handle POST
  }
}
```

### 2. Error Handling
Always use failure handlers and handle async failures

### 3. Resource Management
Use dependency injection and lifecycle management

---

## Resources

### Official Documentation
- [Vert.x Guide](https://vertx.io/)
- [Vert.x API Documentation](https://vertx.io/docs/)

### Learning
- [Vert.x Web](https://vertx.io/docs/vertx-web/java/)
- [Vert.x Examples](https://github.com/vert-x3/vertx-examples)

---

## Summary

Vert.x provides extreme scalability with reactive, event-driven architecture on the JVM.

✅ Highly scalable  
✅ Non-blocking I/O  
✅ Event bus messaging  
✅ Polyglot support  
✅ Clustering support  
✅ Real-time capable  

Perfect for building high-performance APIs and microservices.

**Happy building with Vert.x! ⚡**

