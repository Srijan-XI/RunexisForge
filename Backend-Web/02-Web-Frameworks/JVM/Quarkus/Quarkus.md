# Quarkus

## Introduction

## Table of Contents
1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Getting Started](#getting-started)
4. [RESTful APIs](#restful-apis)
5. [Dependency Injection](#dependency-injection)
6. [Database Integration](#database-integration)
7. [Testing](#testing)
8. [Native Images](#native-images)
9. [Configuration](#configuration)
10. [Best Practices](#best-practices)
11. [Resources](#resources)

---

## Introduction

Quarkus is a Kubernetes-native Java stack designed for containerized environments. It provides exceptional startup time and memory footprint optimization through AOT (Ahead-of-Time) compilation.

### Key Features
- **Container-native**: Optimized for containers and Kubernetes
- **Fast startup**: Start in milliseconds
- **Low memory**: Reduced heap size requirements
- **Live coding**: Hot reload during development
- **GraalVM compatible**: Native executable support
- **Cloud-ready**: Built-in health checks, metrics
- **Developer experience**: Excellent tooling and documentation

### Why Quarkus?
- Perfect for serverless deployments
- Minimal resource consumption
- Fast container startup
- Native image support
- Extensive extension ecosystem
- Enterprise-grade features

---

## Installation

### Create Project
```bash
mvn io.quarkus.platform:quarkus-maven-plugin:3.0.0.CR1:create \
    -DprojectGroupId=com.example \
    -DprojectArtifactId=quarkus-app \
    -DclassName="com.example.GreetingResource" \
    -Dpath="/hello"

cd quarkus-app
./mvnw quarkus:dev
```

### Manual Setup
Create `pom.xml`:
```xml
<project>
  <modelVersion>4.0.0</modelVersion>
  <groupId>com.example</groupId>
  <artifactId>quarkus-app</artifactId>
  <version>1.0.0</version>

  <parent>
    <groupId>io.quarkus.platform</groupId>
    <artifactId>quarkus-bom</artifactId>
    <version>3.0.0.CR1</version>
    <relativePath/>
  </parent>

  <dependencies>
    <dependency>
      <groupId>io.quarkus</groupId>
      <artifactId>quarkus-resteasy-reactive</artifactId>
    </dependency>
  </dependencies>

  <build>
    <plugins>
      <plugin>
        <groupId>io.quarkus.platform</groupId>
        <artifactId>quarkus-maven-plugin</artifactId>
        <version>3.0.0.CR1</version>
        <executions>
          <execution>
            <goals>
              <goal>build</goal>
            </goals>
          </execution>
        </executions>
      </plugin>
    </plugins>
  </build>
</project>
```

---

## Getting Started

### Hello World REST API
```java
import io.quarkus.runtime.annotations.RegisterForReflection;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("/hello")
@RegisterForReflection
public class GreetingResource {
  @GET
  @Produces(MediaType.TEXT_PLAIN)
  public String hello() {
    return "Hello, Quarkus!";
  }
}
```

### JSON Response
```java
@Path("/api")
public class DataResource {
  @GET
  @Path("/data")
  @Produces(MediaType.APPLICATION_JSON)
  public Map<String, Object> getData() {
    return Map.of("message", "Hello", "timestamp", System.currentTimeMillis());
  }
}
```

---

## RESTful APIs

### Complete CRUD Example
```java
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.*;
import java.util.*;

@Path("/items")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ItemResource {
  private static List<Item> items = new ArrayList<>();

  @GET
  public List<Item> getAll() {
    return items;
  }

  @GET
  @Path("/{id}")
  public Response getById(@PathParam("id") Long id) {
    return items.stream()
      .filter(i -> i.id.equals(id))
      .findFirst()
      .map(Response::ok)
      .orElse(Response.status(404))
      .build();
  }

  @POST
  public Response create(Item item) {
    items.add(item);
    return Response.status(201).entity(item).build();
  }

  @PUT
  @Path("/{id}")
  public Response update(@PathParam("id") Long id, Item item) {
    items.removeIf(i -> i.id.equals(id));
    items.add(item);
    return Response.ok(item).build();
  }

  @DELETE
  @Path("/{id}")
  public Response delete(@PathParam("id") Long id) {
    items.removeIf(i -> i.id.equals(id));
    return Response.noContent().build();
  }
}

class Item {
  public Long id;
  public String name;
  public String description;
}
```

---

## Dependency Injection

### Service Injection
```java
@ApplicationScoped
public class UserService {
  public User getUser(Long id) {
    return new User(id, "John Doe");
  }
}

@Path("/users")
public class UserResource {
  @Inject
  private UserService userService;

  @GET
  @Path("/{id}")
  public User getUser(@PathParam("id") Long id) {
    return userService.getUser(id);
  }
}

class User {
  public Long id;
  public String name;

  public User(Long id, String name) {
    this.id = id;
    this.name = name;
  }
}
```

---

## Database Integration

### Panache ORM
```java
import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.*;

@Entity
public class Product extends PanacheEntity {
  public String name;
  public String description;
  public Double price;

  public static List<Product> findByName(String name) {
    return find("name", name).list();
  }
}

@ApplicationScoped
public class ProductService {
  public List<Product> getAll() {
    return Product.listAll();
  }

  public Product getById(Long id) {
    return Product.findById(id);
  }

  public Product create(Product product) {
    product.persist();
    return product;
  }
}

@Path("/products")
@Produces(MediaType.APPLICATION_JSON)
public class ProductResource {
  @Inject
  ProductService productService;

  @GET
  public List<Product> getAll() {
    return productService.getAll();
  }

  @POST
  public Response create(Product product) {
    productService.create(product);
    return Response.status(201).entity(product).build();
  }
}
```

---

## Testing

### Unit Test
```java
import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.Test;
import static io.restassured.RestAssured.*;
import static org.hamcrest.CoreMatchers.*;

@QuarkusTest
public class GreetingResourceTest {
  @Test
  public void testHelloEndpoint() {
    given()
      .when().get("/hello")
      .then()
      .statusCode(200)
      .body(is("Hello, Quarkus!"));
  }
}
```

---

## Native Images

### Build Native Executable
```bash
./mvnw clean package -Pnative

# Run native image
./target/quarkus-app-1.0.0-runner
```

### Benefits
- **Startup**: < 100ms
- **Memory**: ~50MB RSS
- **Size**: Small binary size

---

## Configuration

Create `application.properties`:
```properties
# Server
quarkus.http.port=8080
quarkus.http.host=0.0.0.0

# Database
quarkus.datasource.db-kind=postgresql
quarkus.datasource.username=postgres
quarkus.datasource.password=password
quarkus.datasource.jdbc.url=jdbc:postgresql://localhost:5432/mydb

# JPA
quarkus.hibernate-orm.dialect=org.hibernate.dialect.PostgreSQLDialect
quarkus.hibernate-orm.database.generation=update

# Logging
quarkus.log.level=INFO
quarkus.log.console.level=DEBUG
```

Or `application.yaml`:
```yaml
quarkus:
  http:
    port: 8080
  datasource:
    db-kind: postgresql
    username: postgres
    password: password
    jdbc:
      url: jdbc:postgresql://localhost:5432/mydb
  hibernate-orm:
    database:
      generation: update
```

---

## Best Practices

### 1. Project Structure
```
quarkus-app/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/example/
│   │   │       ├── resource/      # REST endpoints
│   │   │       ├── service/       # Business logic
│   │   │       └── entity/        # JPA entities
│   │   └── resources/
│   │       └── application.properties
│   └── test/
├── pom.xml
└── README.md
```

### 2. Live Coding
```bash
./mvnw quarkus:dev
# Edit code and changes are automatically reloaded
```

### 3. Docker Deployment
```dockerfile
FROM quay.io/quarkus/quarkus-micro-image:2.0
COPY target/*-runner /application
ENTRYPOINT ["/application"]
```

---

## Resources

- [Quarkus Guide](https://quarkus.io/guides/)
- [Quarkus Extensions](https://quarkus.io/extensions/)

---

## Summary

Quarkus is ideal for cloud-native Java applications with exceptional performance.

✅ Fast startup  
✅ Low memory  
✅ Native image support  
✅ Container-optimized  
✅ Kubernetes-ready  

**Perfect for serverless and containerized deployments!**

