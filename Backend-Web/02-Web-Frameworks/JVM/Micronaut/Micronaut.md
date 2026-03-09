# Micronaut

## Introduction

## Table of Contents
1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Getting Started](#getting-started)
4. [Controllers](#controllers)
5. [Dependency Injection](#dependency-injection)
6. [Routing](#routing)
7. [Request/Response](#requestresponse)
8. [Validation](#validation)
9. [Database](#database)
10. [Testing](#testing)
11. [Performance](#performance)
12. [Deployment](#deployment)
13. [Best Practices](#best-practices)
14. [Resources](#resources)

---

## Introduction

Micronaut is a modern JVM-based framework designed for building modular, easily testable microservices. It provides compile-time dependency injection, minimal runtime overhead, and fast startup times.

### Key Features
- **Compile-time DI**: No reflection at runtime
- **Fast startup**: Milliseconds startup time
- **Low memory**: Optimized for containerization
- **Flexible**: Works with Java, Kotlin, Groovy
- **Cloud-native**: Built for serverless, containers, Kubernetes
- **GraalVM compatible**: Native executable support
- **Type-safe**: Full type safety with minimal configuration
- **Built-in testing**: Excellent test framework integration

### Why Micronaut?
- Extremely fast startup (important for serverless)
- Low memory footprint (ideal for containers)
- Compile-time dependency injection
- Great for microservices architecture
- Cloud-native first design
- Excellent performance characteristics

---

## Installation

### Create Project
```bash
# Using SDKMAN
sdk install micronaut
mn create-app my-app

# Or manual setup with Maven/Gradle
cd my-app
./mvnw compile
./mvnw mn:run
```

### Maven Setup
Create `pom.xml`:
```xml
<project>
  <modelVersion>4.0.0</modelVersion>
  <groupId>com.example</groupId>
  <artifactId>micronaut-app</artifactId>
  <version>1.0.0</version>

  <parent>
    <groupId>io.micronaut.platform</groupId>
    <artifactId>micronaut-parent</artifactId>
    <version>4.0.0</version>
  </parent>

  <dependencies>
    <dependency>
      <groupId>io.micronaut</groupId>
      <artifactId>micronaut-http-server-netty</artifactId>
      <scope>runtime</scope>
    </dependency>
    <dependency>
      <groupId>io.micronaut</groupId>
      <artifactId>micronaut-runtime</artifactId>
    </dependency>
  </dependencies>

  <build>
    <plugins>
      <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-compiler-plugin</artifactId>
        <version>3.10.1</version>
        <configuration>
          <source>17</source>
          <target>17</target>
          <annotationProcessorPaths>
            <path>
              <groupId>io.micronaut</groupId>
              <artifactId>micronaut-inject-java</artifactId>
            </path>
          </annotationProcessorPaths>
        </configuration>
      </plugin>
    </plugins>
  </build>
</project>
```

---

## Getting Started

### Hello World
Create `Main.java`:
```java
import io.micronaut.runtime.Micronaut;

public class Main {
  public static void main(String[] args) {
    Micronaut.run(Main.class, args);
  }
}
```

Create `HelloController.java`:
```java
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;

@Controller("/hello")
public class HelloController {
  @Get
  public String index() {
    return "Hello, Micronaut!";
  }
}
```

Access: `http://localhost:8080/hello`

### JSON Response
```java
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;
import java.util.Collections;
import java.util.Map;

@Controller("/api")
public class DataController {
  @Get("/data")
  public Map<String, Object> getData() {
    return Collections.singletonMap("message", "Hello, JSON!");
  }
}
```

---

## Controllers

### Basic Controller
```java
import io.micronaut.http.annotation.*;

@Controller("/users")
public class UserController {
  @Get
  public String getAll() {
    return "Get all users";
  }

  @Get("/{id}")
  public String getById(Long id) {
    return "Get user " + id;
  }

  @Post
  public String create() {
    return "User created";
  }

  @Put("/{id}")
  public String update(Long id) {
    return "User " + id + " updated";
  }

  @Delete("/{id}")
  public String delete(Long id) {
    return "User " + id + " deleted";
  }
}
```

### Path Parameters
```java
@Controller("/posts")
public class PostController {
  @Get("/{id}")
  public String getPost(Long id) {
    return "Post: " + id;
  }

  @Get("/{postId}/comments/{commentId}")
  public String getComment(Long postId, Long commentId) {
    return "Post " + postId + ", Comment " + commentId;
  }
}
```

### Query Parameters
```java
@Controller("/search")
public class SearchController {
  @Get
  public String search(
      @QueryValue(required = false) String q,
      @QueryValue(defaultValue = "10") Integer limit) {
    return "Query: " + q + ", Limit: " + limit;
  }
}
```

---

## Dependency Injection

### Basic Injection
```java
// Service
@Singleton
public class UserService {
  public String getUser(Long id) {
    return "User " + id;
  }
}

// Controller
@Controller("/users")
public class UserController {
  private final UserService userService;

  public UserController(UserService userService) {
    this.userService = userService;
  }

  @Get("/{id}")
  public String getUser(Long id) {
    return userService.getUser(id);
  }
}
```

### Constructor Injection
```java
@Controller("/items")
public class ItemController {
  private final ItemService itemService;
  private final Logger logger;

  public ItemController(ItemService itemService, Logger logger) {
    this.itemService = itemService;
    this.logger = logger;
  }
}
```

### Field Injection
```java
import io.micronaut.context.annotation.Inject;

@Controller("/api")
public class ApiController {
  @Inject
  private DataService dataService;
}
```

### Factory Beans
```java
@Factory
public class DatabaseFactory {
  @Singleton
  public Database createDatabase() {
    return new Database("jdbc:mysql://localhost:3306/mydb");
  }
}

// Use it
@Controller("/data")
public class DataController {
  private final Database database;

  public DataController(Database database) {
    this.database = database;
  }
}
```

---

## Routing

### Route Prefixes
```java
@Controller("/api")
public class ApiController {
  @Get("/users")          // GET /api/users
  public String getUsers() {
    return "Users";
  }

  @Get("/posts")          // GET /api/posts
  public String getPosts() {
    return "Posts";
  }
}
```

### Variable Routes
```java
@Controller("/items")
public class ItemController {
  @Get("/{id}")
  public Item getItem(@PathVariable Long id) {
    return new Item(id, "Item " + id);
  }

  @Get("/{?sort,order}")
  public String listItems(
      @QueryValue(required = false) String sort,
      @QueryValue(required = false) String order) {
    return "Sort: " + sort + ", Order: " + order;
  }
}
```

### Regex Routes
```java
@Controller
public class FileController {
  @Get("/files/{path:.+}")
  public String serveFile(String path) {
    return "File: " + path;
  }
}
```

---

## Request/Response

### Request Body
```java
import io.micronaut.http.HttpResponse;

@Controller("/users")
public class UserController {
  @Post
  public HttpResponse<Map<String, Object>> create(User user) {
    Map<String, Object> response = new HashMap<>();
    response.put("created", user);
    response.put("id", 1);
    return HttpResponse.created(response);
  }
}

class User {
  public String name;
  public String email;
}
```

### File Upload
```java
import io.micronaut.http.multipart.CompletedFileUpload;

@Controller("/upload")
public class UploadController {
  @Post
  public HttpResponse<String> upload(CompletedFileUpload file) {
    String filename = file.getFilename();
    byte[] bytes = file.getBytes();
    return HttpResponse.ok("File " + filename + " uploaded");
  }
}
```

### Response Headers
```java
@Controller("/headers")
public class HeaderController {
  @Get
  public HttpResponse<String> getWithHeaders() {
    return HttpResponse.ok("Success")
      .header("X-Custom-Header", "value")
      .header("Cache-Control", "no-cache");
  }
}
```

### Status Codes
```java
@Controller("/status")
public class StatusController {
  @Get("/ok")
  public HttpResponse<String> ok() {
    return HttpResponse.ok("OK");
  }

  @Get("/created")
  public HttpResponse<String> created() {
    return HttpResponse.created("Resource created");
  }

  @Get("/not-found")
  public HttpResponse<String> notFound() {
    return HttpResponse.notFound();
  }

  @Get("/error")
  public HttpResponse<String> error() {
    return HttpResponse.serverError("Error message");
  }
}
```

---

## Validation

### Validation Annotations
```java
import javax.validation.constraints.*;

class CreateUserDto {
  @NotBlank
  public String name;

  @Email
  public String email;

  @Min(18)
  @Max(100)
  public Integer age;

  @Pattern(regexp = "^[0-9]{10}$")
  public String phone;
}

@Controller("/users")
public class UserController {
  @Post
  public HttpResponse<Map<String, Object>> create(
      @Valid CreateUserDto dto) {
    // Only called if validation passes
    Map<String, Object> response = new HashMap<>();
    response.put("created", dto);
    return HttpResponse.created(response);
  }
}
```

### Custom Validation
```java
import io.micronaut.core.annotation.Introspected;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintViolation;

@Introspected
class CustomValidator {
  public static boolean isValidUsername(String username) {
    return username.length() >= 3 && username.length() <= 20;
  }
}
```

---

## Database

### JDBC Integration
```java
import io.r2dbc.spi.Connection;
import io.r2dbc.spi.ConnectionFactory;
import reactor.core.publisher.Mono;

@Singleton
public class UserRepository {
  private final ConnectionFactory connectionFactory;

  public UserRepository(ConnectionFactory connectionFactory) {
    this.connectionFactory = connectionFactory;
  }

  public Mono<List<Map<String, Object>>> findAll() {
    return Mono.from(connectionFactory.create())
      .flatMapMany(conn -> Mono.from(conn
        .createStatement("SELECT * FROM users")
        .execute())
        .flatMapMany(result -> result.map((row, meta) ->
          Map.of("id", row.get("id"), "name", row.get("name")))))
      .collectList();
  }
}
```

### JPA Integration
Add dependency:
```xml
<dependency>
  <groupId>io.micronaut.data</groupId>
  <artifactId>micronaut-data-jpa</artifactId>
</dependency>
```

Create entity:
```java
import javax.persistence.*;

@Entity
@Table(name = "users")
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  public Long id;

  @Column
  public String name;

  @Column
  public String email;
}
```

Create repository:
```java
import io.micronaut.data.annotation.Repository;
import io.micronaut.data.repository.CrudRepository;
import java.util.List;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
  List<User> findByNameLike(String name);
}
```

---

## Testing

### Unit Test
```java
import io.micronaut.test.extensions.junit5.annotation.MicronautTest;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

@MicronautTest
public class UserServiceTest {
  private UserService userService;

  public UserServiceTest(UserService userService) {
    this.userService = userService;
  }

  @Test
  public void testGetUser() {
    String result = userService.getUser(1L);
    assertEquals("User 1", result);
  }
}
```

### Controller Test
```java
import io.micronaut.http.client.HttpClient;
import io.micronaut.http.client.annotation.Client;
import io.micronaut.test.extensions.junit5.annotation.MicronautTest;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

@MicronautTest
public class UserControllerTest {
  @Client("/")
  HttpClient client;

  @Test
  public void testGetUser() {
    String result = client.toBlocking()
      .retrieve("/users/1", String.class);
    assertEquals("Get user 1", result);
  }
}
```

---

## Performance

### Build Native Image
```bash
# With GraalVM
./mvnw clean package -Dpackaging=native-image

# Result
./target/micronaut-app
```

### Benchmarking
```bash
# Response time
time curl http://localhost:8080/hello

# Load testing
./mvnw clean test
```

---

## Deployment

### Docker
Create `Dockerfile`:
```dockerfile
FROM openjdk:17-alpine
COPY target/micronaut-app-*.jar app.jar
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]
```

Build:
```bash
./mvnw clean package
docker build -t my-micronaut-app .
docker run -p 8080:8080 my-micronaut-app
```

### Kubernetes
Create `k8s.yaml`:
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: micronaut-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: micronaut
  template:
    metadata:
      labels:
        app: micronaut
    spec:
      containers:
      - name: micronaut
        image: my-micronaut-app:latest
        ports:
        - containerPort: 8080
```

---

## Best Practices

### 1. Service Layer
```java
@Singleton
public class UserService {
  private final UserRepository userRepository;

  public UserService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  public User getUser(Long id) {
    return userRepository.findById(id)
      .orElseThrow(() -> new NotFoundException("User not found"));
  }

  public User createUser(String name, String email) {
    User user = new User();
    user.name = name;
    user.email = email;
    return userRepository.save(user);
  }
}
```

### 2. Error Handling
```java
@Controller("/users")
public class UserController {
  private final UserService userService;

  public UserController(UserService userService) {
    this.userService = userService;
  }

  @Get("/{id}")
  public HttpResponse<User> getUser(Long id) {
    try {
      User user = userService.getUser(id);
      return HttpResponse.ok(user);
    } catch (NotFoundException e) {
      return HttpResponse.notFound();
    }
  }
}
```

### 3. Configuration
Create `application.yaml`:
```yaml
micronaut:
  application:
    name: my-app
  server:
    port: 8080
    netty:
      logLevel: DEBUG

datasources:
  default:
    url: jdbc:mysql://localhost:3306/mydb
    username: root
    password: password
```

---

## Resources

### Official Documentation
- [Micronaut Guide](https://docs.micronaut.io/)
- [Micronaut API](https://docs.micronaut.io/latest/api/index.html)

### Learning
- [Micronaut Launch](https://micronaut.io/launch/)
- [Guides](https://guides.micronaut.io/)

---

## Summary

Micronaut is perfect for building fast, lightweight microservices with minimal overhead.

✅ Fast startup times  
✅ Low memory footprint  
✅ Compile-time DI  
✅ Native executable support  
✅ Cloud-native first  
✅ Type-safe  

Ideal for serverless, containers, and Kubernetes deployments.

**Happy building with Micronaut! 🚀**

