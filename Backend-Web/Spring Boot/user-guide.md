# Spring Boot User Guide

## Table of Contents

1. [Installation and Setup](#installation-and-setup)
2. [Creating Your First Application](#creating-your-first-application)
3. [Project Structure](#project-structure)
4. [Configuration](#configuration)
5. [Dependency Injection and IoC](#dependency-injection-and-ioc)
6. [Building REST APIs](#building-rest-apis)
7. [Data Access with JPA](#data-access-with-jpa)
8. [Security](#security)
9. [Testing](#testing)
10. [Deployment](#deployment)
11. [Best Practices](#best-practices)

---

## Installation and Setup

### Prerequisites

#### 1. Install Java Development Kit (JDK)

**Download and Install JDK 17 or later:**

- **Windows/macOS/Linux**: Download from [Oracle](https://www.oracle.com/java/technologies/downloads/) or [Adoptium](https://adoptium.net/)

**Verify Installation:**

```bash
java -version
javac -version
```bash

**Set JAVA_HOME (if needed):**

Windows (PowerShell):

```powershell
[System.Environment]::SetEnvironmentVariable('JAVA_HOME', 'C:\Program Files\Java\jdk-17', 'Machine')
```bash

Linux/macOS:

```bash
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk
export PATH=$JAVA_HOME/bin:$PATH
```bash

#### 2. Install Build Tool

**Option A: Apache Maven**

Download from [maven.apache.org](https://maven.apache.org/download.cgi)

Verify:

```bash
mvn -version
```bash

**Option B: Gradle**

Download from [gradle.org](https://gradle.org/install/)

Verify:

```bash
gradle -version
```bash

#### 3. Install IDE (Choose One)

**IntelliJ IDEA** (Recommended)

- Download: [jetbrains.com/idea/download](https://www.jetbrains.com/idea/download/)
- Community Edition is free
- Ultimate Edition has better Spring support

**Eclipse**

- Download: [eclipse.org/downloads](https://www.eclipse.org/downloads/)
- Install Spring Tools Suite plugin

**Visual Studio Code**

- Download: [code.visualstudio.com](https://code.visualstudio.com/)
- Install extensions: Spring Boot Extension Pack, Java Extension Pack

### Optional Tools

**Spring Boot CLI:**

```bash
# macOS (Homebrew)
brew tap spring-io/tap
brew install spring-boot

# Windows (Chocolatey)
choco install springbootcli

# SDKMAN (Linux/macOS)
sdk install springboot
```bash

---

## Creating Your First Application

### Method 1: Spring Initializr (Recommended)

#### Web Interface

1. Visit [start.spring.io](https://start.spring.io)
2. Configure your project:
   - **Project**: Maven or Gradle
   - **Language**: Java
   - **Spring Boot**: 3.2.x or latest
   - **Group**: com.example
   - **Artifact**: demo
   - **Name**: demo
   - **Package name**: com.example.demo
   - **Packaging**: Jar
   - **Java**: 17 or 21

3. Add Dependencies:
   - Spring Web
   - Spring Boot DevTools
   - Spring Data JPA (optional)
   - H2 Database (optional)
   - Lombok (optional)

4. Click **Generate** to download ZIP
5. Extract and open in your IDE

#### Command Line (Spring Boot CLI)

```bash
spring init --dependencies=web,devtools --build=maven --java-version=17 demo
cd demo
```bash

#### Using IntelliJ IDEA

1. **File** → **New** → **Project**
2. Select **Spring Initializr**
3. Configure project settings
4. Select dependencies
5. Click **Finish**

### Method 2: Maven Archetype

```bash
mvn archetype:generate \
    -DgroupId=com.example \
    -DartifactId=demo \
    -DarchetypeArtifactId=maven-archetype-quickstart \
    -DinteractiveMode=false
```bash

Then add Spring Boot parent to `pom.xml`.

### Your First Application

**Create `DemoApplication.java`:**

```java
package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }

    @GetMapping("/")
    public String hello() {
        return "Hello, Spring Boot!";
    }
}
```bash

**Run the application:**

```bash
# Maven
./mvnw spring-boot:run

# Gradle
./gradlew bootRun

# Or run main method in IDE
```bash

**Test it:**
Open browser: [http://localhost:8080](http://localhost:8080)

---

## Project Structure

### Standard Maven/Gradle Structure

```bash
demo/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/example/demo/
│   │   │       ├── DemoApplication.java
│   │   │       ├── controller/
│   │   │       │   └── UserController.java
│   │   │       ├── service/
│   │   │       │   ├── UserService.java
│   │   │       │   └── impl/
│   │   │       │       └── UserServiceImpl.java
│   │   │       ├── repository/
│   │   │       │   └── UserRepository.java
│   │   │       ├── model/
│   │   │       │   └── User.java
│   │   │       ├── dto/
│   │   │       │   └── UserDTO.java
│   │   │       ├── config/
│   │   │       │   └── SecurityConfig.java
│   │   │       └── exception/
│   │   │           └── ResourceNotFoundException.java
│   │   └── resources/
│   │       ├── application.properties
│   │       ├── application-dev.properties
│   │       ├── application-prod.properties
│   │       ├── static/
│   │       ├── templates/
│   │       └── data.sql
│   └── test/
│       └── java/
│           └── com/example/demo/
│               ├── DemoApplicationTests.java
│               └── controller/
│                   └── UserControllerTest.java
├── pom.xml (or build.gradle)
└── README.md
```bash

### Key Directories

- **controller/**: REST controllers and request handlers
- **service/**: Business logic layer
- **repository/**: Data access layer (JPA repositories)
- **model/**: Domain entities
- **dto/**: Data Transfer Objects
- **config/**: Configuration classes
- **exception/**: Custom exceptions
- **resources/**: Configuration files, static assets

---

## Configuration

### application.properties

Located in `src/main/resources/application.properties`:

```properties
# Server Configuration
server.port=8080
server.servlet.context-path=/api

# Application Name
spring.application.name=demo

# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/mydb
spring.datasource.username=root
spring.datasource.password=password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA/Hibernate
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

# Logging
logging.level.root=INFO
logging.level.com.example.demo=DEBUG
logging.file.name=application.log

# Actuator
management.endpoints.web.exposure.include=health,info,metrics
management.endpoint.health.show-details=always
```bash

### application.yml (Alternative)

```yaml
server:
  port: 8080
  servlet:
    context-path: /api

spring:
  application:
    name: demo
  datasource:
    url: jdbc:mysql://localhost:3306/mydb
    username: root
    password: password
    driver-class-name: com.mysql.cj.jdbc.Driver
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
    properties:
      hibernate:
        format_sql: true
        dialect: org.hibernate.dialect.MySQL8Dialect

logging:
  level:
    root: INFO
    com.example.demo: DEBUG
  file:
    name: application.log
```bash

### Profile-Specific Configuration

**application-dev.properties:**

```properties
spring.datasource.url=jdbc:h2:mem:testdb
server.port=8080
```bash

**application-prod.properties:**

```properties
spring.datasource.url=jdbc:mysql://prod-server:3306/mydb
server.port=80
```bash

**Activate Profile:**

```bash
# Command line
java -jar app.jar --spring.profiles.active=dev

# Environment variable
export SPRING_PROFILES_ACTIVE=prod

# In application.properties
spring.profiles.active=dev
```bash

### Configuration Properties Class

```java
@Configuration
@ConfigurationProperties(prefix = "app")
public class AppConfig {
    private String name;
    private String version;
    private Security security;
    
    // Getters and setters
    
    public static class Security {
        private boolean enabled;
        private String secretKey;
        
        // Getters and setters
    }
}
```bash

**In application.properties:**

```properties
app.name=My Application
app.version=1.0.0
app.security.enabled=true
app.security.secret-key=my-secret-key
```bash

---

## Dependency Injection and IoC

### Core Concepts

Spring Boot uses **Dependency Injection** and **Inversion of Control** to manage object lifecycle.

### Component Scanning

```java
@SpringBootApplication
// Automatically scans components in the same package and sub-packages
public class DemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}
```bash

### Stereotype Annotations

```java
// Controller Layer
@RestController
@RequestMapping("/api/users")
public class UserController {
    // Handles HTTP requests
}

// Service Layer
@Service
public class UserService {
    // Business logic
}

// Repository Layer
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // Data access
}

// Generic Component
@Component
public class EmailService {
    // Utility component
}
```bash

### Dependency Injection Methods

#### 1. Constructor Injection (Recommended)

```java
@Service
public class UserService {
    private final UserRepository userRepository;
    private final EmailService emailService;
    
    // Constructor injection (no @Autowired needed in Spring 4.3+)
    public UserService(UserRepository userRepository, EmailService emailService) {
        this.userRepository = userRepository;
        this.emailService = emailService;
    }
}
```bash

#### 2. Field Injection

```java
@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private EmailService emailService;
}
```bash

#### 3. Setter Injection

```java
@Service
public class UserService {
    private UserRepository userRepository;
    
    @Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
}
```bash

### Bean Configuration

```java
@Configuration
public class AppConfig {
    
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
    
    @Bean
    public ObjectMapper objectMapper() {
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(SerializationFeature.INDENT_OUTPUT, true);
        return mapper;
    }
}
```text

---

## Building REST APIs

### Basic REST Controller

```java
@RestController
@RequestMapping("/api/users")
public class UserController {
    
    private final UserService userService;
    
    public UserController(UserService userService) {
        this.userService = userService;
    }
    
    // GET all users
    @GetMapping
    public List<User> getAllUsers() {
        return userService.findAll();
    }
    
    // GET user by ID
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return userService.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    // POST create user
    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody @Valid User user) {
        User savedUser = userService.save(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
    }
    
    // PUT update user
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(
            @PathVariable Long id, 
            @RequestBody @Valid User user) {
        return userService.update(id, user)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    // DELETE user
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        if (userService.delete(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
```text

### Request/Response Handling

#### Path Variables

```java
@GetMapping("/users/{id}")
public User getUser(@PathVariable Long id) {
    return userService.findById(id);
}
```text

#### Request Parameters

```java
@GetMapping("/users")
public List<User> getUsers(
    @RequestParam(defaultValue = "0") int page,
    @RequestParam(defaultValue = "10") int size,
    @RequestParam(required = false) String name) {
    return userService.findAll(page, size, name);
}
```text

#### Request Body

```java
@PostMapping("/users")
public User createUser(@RequestBody User user) {
    return userService.save(user);
}
```text

#### Response Entity

```java
@GetMapping("/users/{id}")
public ResponseEntity<User> getUser(@PathVariable Long id) {
    User user = userService.findById(id);
    if (user != null) {
        return ResponseEntity.ok(user);
    }
    return ResponseEntity.notFound().build();
}
```text

### Exception Handling

#### Custom Exception

```java
public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }
}
```bash

#### Global Exception Handler

```java
@RestControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleResourceNotFound(
            ResourceNotFoundException ex) {
        ErrorResponse error = new ErrorResponse(
            HttpStatus.NOT_FOUND.value(),
            ex.getMessage(),
            LocalDateTime.now()
        );
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }
    
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationException(
            MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error ->
            errors.put(error.getField(), error.getDefaultMessage())
        );
        ErrorResponse error = new ErrorResponse(
            HttpStatus.BAD_REQUEST.value(),
            "Validation failed",
            errors,
            LocalDateTime.now()
        );
        return ResponseEntity.badRequest().body(error);
    }
    
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGenericException(Exception ex) {
        ErrorResponse error = new ErrorResponse(
            HttpStatus.INTERNAL_SERVER_ERROR.value(),
            "An error occurred",
            LocalDateTime.now()
        );
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
    }
}
```text

### Validation

#### Add Dependency

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>
```text

#### Entity with Validation

```java
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 50, message = "Name must be between 2 and 50 characters")
    private String name;
    
    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    private String email;
    
    @Min(value = 18, message = "Age must be at least 18")
    @Max(value = 100, message = "Age must not exceed 100")
    private Integer age;
    
    // Getters and setters
}
```text

#### Controller with Validation

```java
@PostMapping
public ResponseEntity<User> createUser(@RequestBody @Valid User user) {
    User savedUser = userService.save(user);
    return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
}
```text

---

## Data Access with JPA

### Add Dependencies

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
<dependency>
    <groupId>com.mysql</groupId>
    <artifactId>mysql-connector-j</artifactId>
    <scope>runtime</scope>
</dependency>
```bash

### Entity Class

```java
@Entity
@Table(name = "users")
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 50)
    private String name;
    
    @Column(nullable = false, unique = true)
    private String email;
    
    @Column
    private Integer age;
    
    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime createdAt;
    
    @LastModifiedDate
    private LocalDateTime updatedAt;
    
    // Constructors
    public User() {}
    
    public User(String name, String email, Integer age) {
        this.name = name;
        this.email = email;
        this.age = age;
    }
    
    // Getters and setters
}
```bash

### Repository Interface

```java
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    // Derived query methods
    List<User> findByName(String name);
    List<User> findByEmail(String email);
    List<User> findByAgeGreaterThan(Integer age);
    List<User> findByNameContaining(String keyword);
    
    // Custom query with @Query
    @Query("SELECT u FROM User u WHERE u.email LIKE %:domain%")
    List<User> findByEmailDomain(@Param("domain") String domain);
    
    // Native query
    @Query(value = "SELECT * FROM users WHERE age > ?1", nativeQuery = true)
    List<User> findUsersOlderThan(Integer age);
    
    // Custom update query
    @Modifying
    @Transactional
    @Query("UPDATE User u SET u.name = :name WHERE u.id = :id")
    int updateUserName(@Param("id") Long id, @Param("name") String name);
}
```bash

### Service Layer

```java
@Service
public class UserService {
    
    private final UserRepository userRepository;
    
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    
    public List<User> findAll() {
        return userRepository.findAll();
    }
    
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }
    
    @Transactional
    public User save(User user) {
        return userRepository.save(user);
    }
    
    @Transactional
    public Optional<User> update(Long id, User userDetails) {
        return userRepository.findById(id)
            .map(user -> {
                user.setName(userDetails.getName());
                user.setEmail(userDetails.getEmail());
                user.setAge(userDetails.getAge());
                return userRepository.save(user);
            });
    }
    
    @Transactional
    public boolean delete(Long id) {
        return userRepository.findById(id)
            .map(user -> {
                userRepository.delete(user);
                return true;
            })
            .orElse(false);
    }
}
```bash

### Relationships

#### One-to-Many

```java
@Entity
public class Department {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    
    @OneToMany(mappedBy = "department", cascade = CascadeType.ALL)
    private List<Employee> employees = new ArrayList<>();
}

@Entity
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "department_id")
    private Department department;
}
```bash

#### Many-to-Many

```java
@Entity
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    
    @ManyToMany
    @JoinTable(
        name = "student_course",
        joinColumns = @JoinColumn(name = "student_id"),
        inverseJoinColumns = @JoinColumn(name = "course_id")
    )
    private Set<Course> courses = new HashSet<>();
}

@Entity
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    
    @ManyToMany(mappedBy = "courses")
    private Set<Student> students = new HashSet<>();
}
```bash

---

## Security

### Add Dependency

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>
```bash

### Basic Security Configuration

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/public/**").permitAll()
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            )
            .httpBasic(Customizer.withDefaults());
        
        return http.build();
    }
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
```bash

### User Details Service

```java
@Service
public class CustomUserDetailsService implements UserDetailsService {
    
    private final UserRepository userRepository;
    
    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    
    @Override
    public UserDetails loadUserByUsername(String username) 
            throws UsernameNotFoundException {
        User user = userRepository.findByEmail(username)
            .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        
        return org.springframework.security.core.userdetails.User
            .withUsername(user.getEmail())
            .password(user.getPassword())
            .roles(user.getRole())
            .build();
    }
}
```bash

### JWT Authentication (Advanced)

Add dependency:

```xml
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-api</artifactId>
    <version>0.11.5</version>
</dependency>
```bash

---

## Testing

### Add Dependencies

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
</dependency>
```bash

### Unit Testing Service Layer

```java
@ExtendWith(MockitoExtension.class)
class UserServiceTest {
    
    @Mock
    private UserRepository userRepository;
    
    @InjectMocks
    private UserService userService;
    
    @Test
    void testFindById_UserExists() {
        User user = new User("John", "john@example.com", 25);
        user.setId(1L);
        
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        
        Optional<User> result = userService.findById(1L);
        
        assertTrue(result.isPresent());
        assertEquals("John", result.get().getName());
        verify(userRepository).findById(1L);
    }
}
```text

### Integration Testing Controller

```java
@SpringBootTest
@AutoConfigureMockMvc
class UserControllerIntegrationTest {
    
    @Autowired
    private MockMvc mockMvc;
    
    @Autowired
    private ObjectMapper objectMapper;
    
    @Test
    void testCreateUser() throws Exception {
        User user = new User("Jane", "jane@example.com", 30);
        
        mockMvc.perform(post("/api/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(user)))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.name").value("Jane"))
            .andExpect(jsonPath("$.email").value("jane@example.com"));
    }
}
```text

### Repository Testing

```java
@DataJpaTest
class UserRepositoryTest {
    
    @Autowired
    private UserRepository userRepository;
    
    @Test
    void testSaveUser() {
        User user = new User("Alice", "alice@example.com", 28);
        User savedUser = userRepository.save(user);
        
        assertNotNull(savedUser.getId());
        assertEquals("Alice", savedUser.getName());
    }
}
```text

---

## Deployment

### Building JAR/WAR

#### Maven

```bash
./mvnw clean package
```text

#### Gradle

```bash
./gradlew build
```text

### Running JAR

```bash
java -jar target/demo-0.0.1-SNAPSHOT.jar

# With profile
java -jar target/demo-0.0.1-SNAPSHOT.jar --spring.profiles.active=prod

# With custom port
java -jar target/demo-0.0.1-SNAPSHOT.jar --server.port=9000
```text

### Docker Deployment

**Dockerfile:**

```dockerfile
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app
COPY target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```text

**Build and Run:**

```bash
docker build -t myapp .
docker run -p 8080:8080 myapp
```bash

### Cloud Deployment

#### AWS Elastic Beanstalk

```bash
eb init
eb create
eb deploy
```bash

#### Heroku

```bash
heroku create
git push heroku main
```bash

#### Azure App Service

```bash
az webapp up --name myapp --resource-group mygroup
```bash

---

## Best Practices

### 1. Use Constructor Injection

```java
@Service
public class UserService {
    private final UserRepository userRepository;
    
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
}
```bash

### 2. Keep Controllers Thin

Move business logic to service layer.

### 3. Use DTOs

Separate API models from domain entities.

### 4. Handle Exceptions Globally

Use `@RestControllerAdvice` for centralized exception handling.

### 5. Use Lombok to Reduce Boilerplate

```java
@Data
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;
}
```bash

### 6. Externalize Configuration

Use `application.properties` and environment variables.

### 7. Enable Actuator for Production

Monitor application health and metrics.

### 8. Write Tests

Maintain good test coverage (unit, integration, e2e).

### 9. Use Profiles

Separate dev, test, and prod configurations.

### 10. Follow REST Conventions

Use proper HTTP methods and status codes.

---

## Common Issues and Solutions

### Port Already in Use

```properties
server.port=8081
```bash

### Database Connection Issues

Check credentials, URL, and database availability.

### Auto-configuration Issues

Use `--debug` flag to see auto-configuration report:

```bash
java -jar app.jar --debug
```bash

### Circular Dependencies

Refactor code or use `@Lazy` annotation.

---

## Resources

### Official Documentation

- [Spring Boot Reference](https://docs.spring.io/spring-boot/docs/current/reference/html/)
- [Spring Framework Documentation](https://docs.spring.io/spring-framework/docs/current/reference/html/)
- [Spring Data JPA](https://docs.spring.io/spring-data/jpa/docs/current/reference/html/)

### Learning Platforms

- [Spring Academy](https://spring.academy/)
- [Baeldung](https://www.baeldung.com/spring-boot)
- [Spring Boot Guides](https://spring.io/guides)

### Community

- [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-boot)
- [Spring Community Forum](https://community.spring.io/)
- [GitHub Discussions](https://github.com/spring-projects/spring-boot/discussions)

---

**Congratulations!** You now have a comprehensive guide to Spring Boot development. Start building amazing applications!
