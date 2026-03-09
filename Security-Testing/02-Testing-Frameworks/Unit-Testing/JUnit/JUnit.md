# JUnit - Java Unit Testing Framework

## Table of Contents
- [Introduction](#introduction)
- [Why JUnit?](#why-junit)
- [Installation & Setup](#installation--setup)
- [JUnit 5 Architecture](#junit-5-architecture)
- [Annotations](#annotations)
- [Writing Tests](#writing-tests)
- [Assertions](#assertions)
- [Assumptions](#assumptions)
- [Best Practices](#best-practices)
- [Advanced Features](#advanced-features)
- [Parameterized Tests](#parameterized-tests)
- [Test Lifecycle](#test-lifecycle)
- [Integration](#integration)
- [Migration from JUnit 4](#migration-from-junit-4)
- [Real-World Examples](#real-world-examples)
- [Resources](#resources)

---

## Introduction

JUnit is the most widely-used testing framework for Java applications. Originally created by Kent Beck and Erich Gamma, JUnit has become the de facto standard for unit testing in the Java ecosystem. JUnit 5 (also known as JUnit Jupiter) represents a complete rewrite with modern features and extensibility.

### Key Features
- **Annotations-Based**: Clean, declarative test definitions
- **Rich Assertions**: Comprehensive assertion library
- **Parameterized Tests**: Data-driven testing support
- **Dynamic Tests**: Generate tests at runtime
- **Extensions**: Powerful extension model for customization
- **Nested Tests**: Organize related tests hierarchically
- **Conditional Execution**: Control when tests run
- **Parallel Execution**: Run tests concurrently
- **IDE Integration**: First-class support in all major Java IDEs
- **Build Tool Integration**: Maven, Gradle, and more

---

## Why JUnit?

### Advantages

1. **Industry Standard**
   - Most popular Java testing framework
   - Required knowledge for Java developers
   - Extensive community and resources
   - Battle-tested in production environments

2. **Modern Features (JUnit 5)**
   - Lambda support and functional interfaces
   - Better assertion messages
   - Improved parameterized tests
   - Display name customization
   - Tag-based filtering

3. **Excellent Integration**
   - Native IDE support (IntelliJ, Eclipse, VS Code)
   - Build tools (Maven, Gradle)
   - CI/CD pipelines
   - Coverage tools (JaCoCo, Cobertura)

4. **Extensibility**
   - Custom extensions
   - Third-party integrations
   - Flexible configuration
   - Composable annotations

### Use Cases
- Unit testing
- Integration testing
- Test-Driven Development (TDD)
- Behavior-Driven Development (BDD)
- Regression testing
- API testing

---

## Installation & Setup

### Prerequisites
- Java Development Kit (JDK) 8 or higher
- Maven or Gradle build tool

### Maven Setup

Add to `pom.xml`:
```xml
<dependencies>
    <!-- JUnit 5 (Jupiter) -->
    <dependency>
        <groupId>org.junit.jupiter</groupId>
        <artifactId>junit-jupiter</artifactId>
        <version>5.10.1</version>
        <scope>test</scope>
    </dependency>
    
    <!-- Optional: JUnit 5 Params for parameterized tests -->
    <dependency>
        <groupId>org.junit.jupiter</groupId>
        <artifactId>junit-jupiter-params</artifactId>
        <version>5.10.1</version>
        <scope>test</scope>
    </dependency>
</dependencies>

<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-surefire-plugin</artifactId>
            <version>3.2.3</version>
        </plugin>
    </plugins>
</build>
```

### Gradle Setup

Add to `build.gradle`:
```gradle
dependencies {
    testImplementation 'org.junit.jupiter:junit-jupiter:5.10.1'
}

test {
    useJUnitPlatform()
}
```

### Project Structure

```
src/
├── main/
│   └── java/
│       └── com/example/
│           └── Calculator.java
└── test/
    └── java/
        └── com/example/
            └── CalculatorTest.java
```

---

## JUnit 5 Architecture

JUnit 5 consists of three main modules:

### JUnit Platform
- Foundation for launching testing frameworks on the JVM
- Provides the `TestEngine` API
- Console launcher, Maven/Gradle plugins

### JUnit Jupiter
- Programming model for writing tests
- Extension model for custom behavior
- New annotations and assertions

### JUnit Vintage
- Backward compatibility with JUnit 3 and JUnit 4
- Allows running legacy tests

---

## Annotations

### Core Annotations

```java
import org.junit.jupiter.api.*;

class AnnotationExamples {
    
    @BeforeAll
    static void initAll() {
        // Runs once before all tests in the class
        System.out.println("Before all tests");
    }
    
    @AfterAll
    static void tearDownAll() {
        // Runs once after all tests in the class
        System.out.println("After all tests");
    }
    
    @BeforeEach
    void init() {
        // Runs before each test method
        System.out.println("Before each test");
    }
    
    @AfterEach
    void tearDown() {
        // Runs after each test method
        System.out.println("After each test");
    }
    
    @Test
    void test1() {
        System.out.println("Test 1");
    }
    
    @Test
    @DisplayName("Custom test name with spaces and emojis ✅")
    void test2() {
        System.out.println("Test 2");
    }
    
    @Test
    @Disabled("Not implemented yet")
    void skippedTest() {
        System.out.println("This won't run");
    }
    
    @Test
    @Timeout(5)  // Timeout in seconds
    void timeoutTest() {
        // Test must complete within 5 seconds
    }
}
```

### Execution Order

```
@BeforeAll
  @BeforeEach
    @Test (test1)
  @AfterEach
  @BeforeEach
    @Test (test2)
  @AfterEach
@AfterAll
```

---

## Writing Tests

### Basic Test

```java
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class CalculatorTest {
    
    @Test
    void testAddition() {
        Calculator calculator = new Calculator();
        int result = calculator.add(2, 3);
        assertEquals(5, result, "2 + 3 should equal 5");
    }
    
    @Test
    void testDivision() {
        Calculator calculator = new Calculator();
        double result = calculator.divide(10, 2);
        assertEquals(5.0, result, 0.001);
    }
    
    @Test
    void testDivisionByZero() {
        Calculator calculator = new Calculator();
        assertThrows(ArithmeticException.class, () -> {
            calculator.divide(10, 0);
        });
    }
}
```

### Test Lifecycle

```java
import org.junit.jupiter.api.*;

class LifecycleTest {
    
    @BeforeAll
    static void setupDatabase() {
        System.out.println("Setting up database connection");
        // Initialize database, create tables, etc.
    }
    
    @BeforeEach
    void prepareTestData() {
        System.out.println("Preparing test data");
        // Insert test data into database
    }
    
    @Test
    void testUserCreation() {
        System.out.println("Testing user creation");
        // Test logic
    }
    
    @Test
    void testUserRetrieval() {
        System.out.println("Testing user retrieval");
        // Test logic
    }
    
    @AfterEach
    void cleanupTestData() {
        System.out.println("Cleaning up test data");
        // Remove test data from database
    }
    
    @AfterAll
    static void closeDatabase() {
        System.out.println("Closing database connection");
        // Close database connection
    }
}
```

---

## Assertions

### Basic Assertions

```java
import static org.junit.jupiter.api.Assertions.*;

class AssertionExamples {
    
    @Test
    void testBasicAssertions() {
        // Equality
        assertEquals(expected, actual);
        assertEquals(expected, actual, "Custom failure message");
        
        // Not equals
        assertNotEquals(unexpected, actual);
        
        // True/False
        assertTrue(condition);
        assertFalse(condition);
        
        // Null checks
        assertNull(object);
        assertNotNull(object);
        
        // Same instance
        assertSame(expected, actual);
        assertNotSame(unexpected, actual);
        
        // Array equality
        assertArrayEquals(expectedArray, actualArray);
        
        // Fail test
        fail("Test failed intentionally");
    }
}
```

### Advanced Assertions

```java
@Test
void testAdvancedAssertions() {
    // Assert all (grouped assertions)
    assertAll("User validation",
        () -> assertEquals("John", user.getFirstName()),
        () -> assertEquals("Doe", user.getLastName()),
        () -> assertEquals("john@example.com", user.getEmail())
    );
    
    // Exception assertion
    Exception exception = assertThrows(IllegalArgumentException.class, () -> {
        throw new IllegalArgumentException("Invalid argument");
    });
    assertEquals("Invalid argument", exception.getMessage());
    
    // Timeout assertion
    assertTimeout(Duration.ofSeconds(2), () -> {
        // Code that should complete within 2 seconds
        Thread.sleep(1000);
    });
    
    // Timeout with preemptive termination
    assertTimeoutPreemptively(Duration.ofSeconds(2), () -> {
        // Terminates if exceeds timeout
    });
}
```

### Custom Assertions

```java
public class CustomAssertions {
    
    public static void assertContains(String actual, String expected) {
        assertTrue(actual.contains(expected),
            () -> "Expected '" + actual + "' to contain '" + expected + "'");
    }
    
    public static void assertBetween(int value, int min, int max) {
        assertTrue(value >= min && value <= max,
            () -> value + " should be between " + min + " and " + max);
    }
    
    public static void assertEmpty(Collection<?> collection) {
        assertTrue(collection == null || collection.isEmpty(),
            "Collection should be empty");
    }
}
```

---

## Assumptions

Assumptions allow tests to run only when certain conditions are met:

```java
import static org.junit.jupiter.api.Assumptions.*;

class AssumptionExamples {
    
    @Test
    void testOnlyOnCIServer() {
        assumeTrue("CI".equals(System.getenv("ENV")));
        // This test only runs in CI environment
    }
    
    @Test
    void testOnlyOnLinux() {
        assumeTrue(System.getProperty("os.name").toLowerCase().contains("linux"));
        // This test only runs on Linux
    }
    
    @Test
    void testWithAssumption() {
        String environment = System.getProperty("env");
        assumingThat("dev".equals(environment), () -> {
            // These assertions only run in dev environment
            assertEquals(8080, port);
        });
        
        // This assertion always runs
        assertNotNull(environment);
    }
}
```

---

## Best Practices

### 1. Meaningful Test Names

```java
// ❌ Bad
@Test
void test1() { }

// ✅ Good
@Test
@DisplayName("Should throw IllegalArgumentException when age is negative")
void shouldThrowExceptionWhenAgeIsNegative() { }
```

### 2. Follow AAA Pattern (Arrange-Act-Assert)

```java
@Test
void testUserRegistration() {
    // Arrange
    UserService userService = new UserService();
    User user = new User("john@example.com", "password123");
    
    // Act
    boolean result = userService.register(user);
    
    // Assert
    assertTrue(result);
    assertNotNull(userService.findByEmail("john@example.com"));
}
```

### 3. One Assertion Per Test (When Possible)

```java
// ❌ Bad - multiple unrelated assertions
@Test
void testUser() {
    assertEquals("John", user.getName());
    assertEquals(25, user.getAge());
    assertTrue(user.isActive());
}

// ✅ Good - focused tests
@Test
void shouldHaveCorrectName() {
    assertEquals("John", user.getName());
}

@Test
void shouldHaveCorrectAge() {
    assertEquals(25, user.getAge());
}

@Test
void shouldBeActive() {
    assertTrue(user.isActive());
}
```

### 4. Use Nested Tests for Organization

```java
@DisplayName("User Service Tests")
class UserServiceTest {
    
    @Nested
    @DisplayName("When user is new")
    class NewUser {
        
        @Test
        @DisplayName("Should create user successfully")
        void shouldCreateUser() {
            // Test logic
        }
        
        @Test
        @DisplayName("Should validate email format")
        void shouldValidateEmail() {
            // Test logic
        }
    }
    
    @Nested
    @DisplayName("When user exists")
    class ExistingUser {
        
        @Test
        @DisplayName("Should update user details")
        void shouldUpdateUser() {
            // Test logic
        }
        
        @Test
        @DisplayName("Should not allow duplicate email")
        void shouldNotAllowDuplicateEmail() {
            // Test logic
        }
    }
}
```

### 5. Clean Up Resources

```java
class ResourceTest {
    private DatabaseConnection connection;
    
    @BeforeEach
    void setUp() {
        connection = new DatabaseConnection();
        connection.connect();
    }
    
    @AfterEach
    void tearDown() {
        if (connection != null) {
            connection.close();
        }
    }
    
    @Test
    void testDatabaseQuery() {
        // Test logic
    }
}
```

---

## Advanced Features

### Parameterized Tests

```java
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.*;

class ParameterizedTestExamples {
    
    @ParameterizedTest
    @ValueSource(strings = {"apple", "banana", "orange"})
    void testWithValueSource(String fruit) {
        assertNotNull(fruit);
    }
    
    @ParameterizedTest
    @ValueSource(ints = {1, 2, 3, 4, 5})
    void testWithInts(int number) {
        assertTrue(number > 0);
    }
    
    @ParameterizedTest
    @CsvSource({
        "apple, 1",
        "banana, 2",
        "orange, 3"
    })
    void testWithCsvSource(String fruit, int count) {
        assertNotNull(fruit);
        assertTrue(count > 0);
    }
    
    @ParameterizedTest
    @CsvFileSource(resources = "/test-data.csv", numLinesToSkip = 1)
    void testWithCsvFile(String name, int age) {
        assertNotNull(name);
        assertTrue(age > 0);
    }
    
    @ParameterizedTest
    @MethodSource("provideTestData")
    void testWithMethodSource(String input, String expected) {
        assertEquals(expected, process(input));
    }
    
    static Stream<Arguments> provideTestData() {
        return Stream.of(
            Arguments.of("input1", "expected1"),
            Arguments.of("input2", "expected2"),
            Arguments.of("input3", "expected3")
        );
    }
    
    @ParameterizedTest
    @EnumSource(value = DayOfWeek.class, names = {"MONDAY", "FRIDAY"})
    void testWithEnumSource(DayOfWeek day) {
        assertTrue(day.getValue() >= 1 && day.getValue() <= 7);
    }
}
```

### Dynamic Tests

```java
import org.junit.jupiter.api.DynamicTest;
import org.junit.jupiter.api.TestFactory;
import java.util.stream.Stream;

class DynamicTestExamples {
    
    @TestFactory
    Stream<DynamicTest> dynamicTestsFromStream() {
        return Stream.of("apple", "banana", "orange")
            .map(fruit -> DynamicTest.dynamicTest(
                "Test for " + fruit,
                () -> assertTrue(fruit.length() > 0)
            ));
    }
    
    @TestFactory
    Collection<DynamicTest> dynamicTestsFromCollection() {
        List<String> fruits = Arrays.asList("apple", "banana", "orange");
        
        return fruits.stream()
            .map(fruit -> DynamicTest.dynamicTest(
                "Length test for " + fruit,
                () -> assertTrue(fruit.length() > 0)
            ))
            .collect(Collectors.toList());
    }
}
```

### Conditional Test Execution

```java
import org.junit.jupiter.api.condition.*;

class ConditionalTestExamples {
    
    @Test
    @EnabledOnOs(OS.LINUX)
    void onlyOnLinux() {
        // Runs only on Linux
    }
    
    @Test
    @EnabledOnOs({OS.MAC, OS.WINDOWS})
    void onMacOrWindows() {
        // Runs on Mac or Windows
    }
    
    @Test
    @EnabledOnJre(JRE.JAVA_17)
    void onlyOnJava17() {
        // Runs only on Java 17
    }
    
    @Test
    @EnabledForJreRange(min = JRE.JAVA_11, max = JRE.JAVA_17)
    void onJava11To17() {
        // Runs on Java 11 to 17
    }
    
    @Test
    @EnabledIfSystemProperty(named = "env", matches = "dev")
    void onlyInDevEnvironment() {
        // Runs only when system property env=dev
    }
    
    @Test
    @EnabledIfEnvironmentVariable(named = "CI", matches = "true")
    void onlyOnCI() {
        // Runs only in CI environment
    }
}
```

### Tagging Tests

```java
import org.junit.jupiter.api.Tag;

class TaggedTests {
    
    @Test
    @Tag("fast")
    void fastTest() {
        // Quick test
    }
    
    @Test
    @Tag("slow")
    void slowTest() {
        // Slow test
    }
    
    @Test
    @Tag("integration")
    @Tag("database")
    void integrationTest() {
        // Integration test
    }
}
```

Run specific tags:
```bash
mvn test -Dgroups="fast"
mvn test -DexcludedGroups="slow"
```

---

## Test Lifecycle

### Test Instance Lifecycle

```java
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.TestInstance.Lifecycle;

// Default: new instance per test method
@TestInstance(Lifecycle.PER_METHOD)
class PerMethodTest {
    private int counter = 0;
    
    @Test
    void test1() {
        counter++;
        assertEquals(1, counter);
    }
    
    @Test
    void test2() {
        counter++;
        assertEquals(1, counter);  // Still 1 (new instance)
    }
}

// One instance for all test methods
@TestInstance(Lifecycle.PER_CLASS)
class PerClassTest {
    private int counter = 0;
    
    @BeforeAll
    void init() {  // No need for static with PER_CLASS
        System.out.println("Init");
    }
    
    @Test
    void test1() {
        counter++;
        assertEquals(1, counter);
    }
    
    @Test
    void test2() {
        counter++;
        assertEquals(2, counter);  // Shared instance
    }
}
```

---

## Integration

### With Mockito

```java
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.junit.jupiter.api.extension.ExtendWith;

@ExtendWith(MockitoExtension.class)
class MockitoTest {
    
    @Mock
    private UserRepository userRepository;
    
    @Test
    void testUserService() {
        when(userRepository.findById(1L))
            .thenReturn(Optional.of(new User("John")));
        
        UserService service = new UserService(userRepository);
        User user = service.getUser(1L);
        
        assertEquals("John", user.getName());
        verify(userRepository).findById(1L);
    }
}
```

### With Spring Boot

```java
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.beans.factory.annotation.Autowired;

@SpringBootTest
class SpringBootTest {
    
    @Autowired
    private UserService userService;
    
    @Test
    void testSpringBean() {
        assertNotNull(userService);
        // Test Spring-managed bean
    }
}
```

### With AssertJ (Better Assertions)

```java
import static org.assertj.core.api.Assertions.*;

class AssertJTest {
    
    @Test
    void testWithAssertJ() {
        String name = "John Doe";
        
        assertThat(name)
            .isNotNull()
            .startsWith("John")
            .endsWith("Doe")
            .contains("o");
        
        List<String> fruits = Arrays.asList("apple", "banana", "orange");
        
        assertThat(fruits)
            .hasSize(3)
            .contains("apple", "banana")
            .doesNotContain("grape");
    }
}
```

---

## Migration from JUnit 4

### Annotation Changes

| JUnit 4 | JUnit 5 |
|---------|---------|
| `@Before` | `@BeforeEach` |
| `@After` | `@AfterEach` |
| `@BeforeClass` | `@BeforeAll` |
| `@AfterClass` | `@AfterAll` |
| `@Ignore` | `@Disabled` |
| `@Category` | `@Tag` |
| `@RunWith` | `@ExtendWith` |

### Assertion Changes

```java
// JUnit 4
import static org.junit.Assert.*;

// JUnit 5
import static org.junit.jupiter.api.Assertions.*;
```

### Example Migration

**JUnit 4:**
```java
import org.junit.*;

public class OldTest {
    
    @BeforeClass
    public static void setup() { }
    
    @Before
    public void init() { }
    
    @Test
    public void testSomething() {
        Assert.assertEquals(expected, actual);
    }
    
    @After
    public void cleanup() { }
    
    @AfterClass
    public static void tearDown() { }
}
```

**JUnit 5:**
```java
import org.junit.jupiter.api.*;

class NewTest {
    
    @BeforeAll
    static void setup() { }
    
    @BeforeEach
    void init() { }
    
    @Test
    void testSomething() {
        assertEquals(expected, actual);
    }
    
    @AfterEach
    void cleanup() { }
    
    @AfterAll
    static void tearDown() { }
}
```

---

## Real-World Examples

### Testing a Service Layer

```java
class UserServiceTest {
    private UserService userService;
    private UserRepository userRepository;
    
    @BeforeEach
    void setUp() {
        userRepository = new InMemoryUserRepository();
        userService = new UserService(userRepository);
    }
    
    @Test
    @DisplayName("Should create user with valid data")
    void shouldCreateUserWithValidData() {
        // Arrange
        User user = new User("john@example.com", "John Doe");
        
        // Act
        User created = userService.createUser(user);
        
        // Assert
        assertNotNull(created.getId());
        assertEquals("john@example.com", created.getEmail());
        assertEquals("John Doe", created.getName());
    }
    
    @Test
    @DisplayName("Should throw exception for duplicate email")
    void shouldThrowExceptionForDuplicateEmail() {
        // Arrange
        User user1 = new User("john@example.com", "John Doe");
        userService.createUser(user1);
        
        User user2 = new User("john@example.com", "Jane Doe");
        
        // Act & Assert
        assertThrows(DuplicateEmailException.class, () -> {
            userService.createUser(user2);
        });
    }
    
    @Test
    @DisplayName("Should find user by email")
    void shouldFindUserByEmail() {
        // Arrange
        User user = new User("john@example.com", "John Doe");
        userService.createUser(user);
        
        // Act
        Optional<User> found = userService.findByEmail("john@example.com");
        
        // Assert
        assertTrue(found.isPresent());
        assertEquals("John Doe", found.get().getName());
    }
}
```

### Testing with Parameterized Tests

```java
class EmailValidatorTest {
    
    @ParameterizedTest
    @ValueSource(strings = {
        "user@example.com",
        "john.doe@company.org",
        "test+filter@domain.co.uk"
    })
    @DisplayName("Should accept valid email addresses")
    void shouldAcceptValidEmails(String email) {
        assertTrue(EmailValidator.isValid(email));
    }
    
    @ParameterizedTest
    @ValueSource(strings = {
        "invalid",
        "@example.com",
        "user@",
        "user@.com",
        "user name@example.com"
    })
    @DisplayName("Should reject invalid email addresses")
    void shouldRejectInvalidEmails(String email) {
        assertFalse(EmailValidator.isValid(email));
    }
}
```

---

## Resources

### Official Documentation
- [JUnit 5 User Guide](https://junit.org/junit5/docs/current/user-guide/)
- [JUnit 5 API Documentation](https://junit.org/junit5/docs/current/api/)
- [JUnit 5 GitHub](https://github.com/junit-team/junit5)

### Learning Resources
- [Baeldung JUnit 5 Guide](https://www.baeldung.com/junit-5)
- [JUnit 5 Samples](https://github.com/junit-team/junit5-samples)
- [Testing with JUnit 5](https://www.petrikainulainen.net/junit-5-tutorial/)

### Tools & Extensions
- [Mockito](https://site.mockito.org/) - Mocking framework
- [AssertJ](https://assertj.github.io/doc/) - Fluent assertions
- [JaCoCo](https://www.jacoco.org/jacoco/) - Code coverage
- [Testcontainers](https://www.testcontainers.org/) - Docker containers for testing

### Community
- [Stack Overflow - JUnit](https://stackoverflow.com/questions/tagged/junit)
- [JUnit Gitter Chat](https://gitter.im/junit-team/junit5)

---

**Last Updated**: January 2026  
**JUnit Version**: 5.10+
