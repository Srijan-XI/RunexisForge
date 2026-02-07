# TestNG - Testing Framework for Java

## Table of Contents
- [Introduction](#introduction)
- [Why TestNG?](#why-testng)
- [Installation & Setup](#installation--setup)
- [Core Concepts](#core-concepts)
- [Annotations](#annotations)
- [Writing Tests](#writing-tests)
- [Test Configuration](#test-configuration)
- [Data-Driven Testing](#data-driven-testing)
- [Assertions](#assertions)
- [Best Practices](#best-practices)
- [Advanced Features](#advanced-features)
- [Integration](#integration)
- [Comparison with JUnit](#comparison-with-junit)
- [Real-World Examples](#real-world-examples)
- [Resources](#resources)

---

## Introduction

TestNG (Test Next Generation) is a powerful testing framework for Java inspired by JUnit and NUnit, but introducing more powerful functionalities that make testing easier and more flexible. It's designed to cover all categories of tests: unit, functional, end-to-end, integration testing, and more.

### Key Features
- **Annotations**: Powerful annotation support for test configuration
- **Flexible Test Configuration**: Advanced test configuration using XML files
- **Parameterization**: Support for data-driven testing
- **Parallel Execution**: Run tests in parallel threads
- **Dependencies**: Define dependencies between test methods
- **Grouping**: Organize tests into groups
- **Built-in Reporting**: Comprehensive HTML reports
- **Listeners**: Customize test execution with listeners
- **Multiple Test Suites**: Run multiple test suites together
- **Easy Integration**: Works seamlessly with build tools and CI/CD

---

## Why TestNG?

### Advantages Over JUnit

1. **Advanced Annotations**
   - `@BeforeClass`, `@AfterClass`, `@BeforeMethod`, `@AfterMethod`
   - `@BeforeSuite`, `@AfterSuite`, `@BeforeTest`, `@AfterTest`
   - More granular control over test lifecycle

2. **Test Configuration**
   - XML-based test configuration (testng.xml)
   - Group tests logically
   - Define test execution order
   - Configure parallel execution

3. **Dependencies**
   - Define method-level dependencies
   - Skip dependent tests on failure
   - Better control over test flow

4. **Parameterization**
   - `@Parameters` annotation
   - `@DataProvider` for complex data
   - Excel/CSV/Database integration

5. **Parallel Execution**
   - Run tests in parallel at method, class, or suite level
   - Thread-safe execution
   - Configurable thread pool

6. **Reporting**
   - Built-in HTML reports
   - Customizable reports
   - Integration with reporting tools

---

## Installation & Setup

### Prerequisites
- Java Development Kit (JDK) 8 or higher
- Maven or Gradle build tool

### Maven Setup

Add to `pom.xml`:
```xml
<dependencies>
    <!-- TestNG -->
    <dependency>
        <groupId>org.testng</groupId>
        <artifactId>testng</artifactId>
        <version>7.9.0</version>
        <scope>test</scope>
    </dependency>
</dependencies>

<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-surefire-plugin</artifactId>
            <version>3.2.3</version>
            <configuration>
                <suiteXmlFiles>
                    <suiteXmlFile>testng.xml</suiteXmlFile>
                </suiteXmlFiles>
            </configuration>
        </plugin>
    </plugins>
</build>
```

### Gradle Setup

Add to `build.gradle`:
```gradle
dependencies {
    testImplementation 'org.testng:testng:7.9.0'
}

test {
    useTestNG() {
        suites 'src/test/resources/testng.xml'
    }
}
```

### IDE Setup

#### Eclipse
1. Install TestNG plugin from marketplace
2. Right-click project → TestNG → Convert to TestNG

#### IntelliJ IDEA
- TestNG support is built-in
- Right-click test class → Run 'TestClass'

---

## Core Concepts

### Test Hierarchy

```
Suite (testng.xml)
  └── Test
      └── Class
          └── Method
```

### Basic Test Structure

```java
import org.testng.annotations.Test;
import org.testng.Assert;

public class BasicTest {
    
    @Test
    public void testAddition() {
        int result = 2 + 2;
        Assert.assertEquals(result, 4, "Addition should work");
    }
    
    @Test
    public void testSubtraction() {
        int result = 5 - 3;
        Assert.assertEquals(result, 2, "Subtraction should work");
    }
}
```

### Test Execution Order

```java
public class OrderTest {
    
    @Test(priority = 1)
    public void firstTest() {
        System.out.println("First test");
    }
    
    @Test(priority = 2)
    public void secondTest() {
        System.out.println("Second test");
    }
    
    @Test(priority = 3)
    public void thirdTest() {
        System.out.println("Third test");
    }
}
```

---

## Annotations

### Test Annotations

```java
import org.testng.annotations.*;

public class AnnotationExample {
    
    @BeforeSuite
    public void beforeSuite() {
        System.out.println("Before Suite - runs once before all tests");
    }
    
    @AfterSuite
    public void afterSuite() {
        System.out.println("After Suite - runs once after all tests");
    }
    
    @BeforeTest
    public void beforeTest() {
        System.out.println("Before Test - runs before each <test> tag");
    }
    
    @AfterTest
    public void afterTest() {
        System.out.println("After Test - runs after each <test> tag");
    }
    
    @BeforeClass
    public void beforeClass() {
        System.out.println("Before Class - runs once before first test method");
    }
    
    @AfterClass
    public void afterClass() {
        System.out.println("After Class - runs once after all test methods");
    }
    
    @BeforeMethod
    public void beforeMethod() {
        System.out.println("Before Method - runs before each test method");
    }
    
    @AfterMethod
    public void afterMethod() {
        System.out.println("After Method - runs after each test method");
    }
    
    @Test
    public void test1() {
        System.out.println("Test 1");
    }
    
    @Test
    public void test2() {
        System.out.println("Test 2");
    }
}
```

### Execution Order

```
@BeforeSuite
  @BeforeTest
    @BeforeClass
      @BeforeMethod
        @Test (test1)
      @AfterMethod
      @BeforeMethod
        @Test (test2)
      @AfterMethod
    @AfterClass
  @AfterTest
@AfterSuite
```

---

## Writing Tests

### Basic Test with Assertions

```java
import org.testng.Assert;
import org.testng.annotations.Test;

public class CalculatorTest {
    
    @Test
    public void testAdd() {
        Calculator calc = new Calculator();
        int result = calc.add(5, 3);
        Assert.assertEquals(result, 8);
    }
    
    @Test
    public void testDivide() {
        Calculator calc = new Calculator();
        double result = calc.divide(10, 2);
        Assert.assertEquals(result, 5.0, 0.01);
    }
    
    @Test(expectedExceptions = ArithmeticException.class)
    public void testDivideByZero() {
        Calculator calc = new Calculator();
        calc.divide(10, 0);
    }
}
```

### Test Dependencies

```java
public class DependencyTest {
    
    @Test
    public void serverStartedOk() {
        System.out.println("Server started");
    }
    
    @Test(dependsOnMethods = "serverStartedOk")
    public void method1() {
        System.out.println("Method 1 - depends on server start");
    }
    
    @Test(dependsOnMethods = "serverStartedOk")
    public void method2() {
        System.out.println("Method 2 - depends on server start");
    }
    
    @Test(dependsOnMethods = {"method1", "method2"})
    public void method3() {
        System.out.println("Method 3 - depends on method1 and method2");
    }
}
```

### Test Groups

```java
public class GroupTest {
    
    @Test(groups = "smoke")
    public void smokeTest1() {
        System.out.println("Smoke test 1");
    }
    
    @Test(groups = "smoke")
    public void smokeTest2() {
        System.out.println("Smoke test 2");
    }
    
    @Test(groups = "regression")
    public void regressionTest1() {
        System.out.println("Regression test 1");
    }
    
    @Test(groups = {"smoke", "regression"})
    public void criticalTest() {
        System.out.println("Critical test - in both groups");
    }
    
    @Test(groups = "integration")
    public void integrationTest() {
        System.out.println("Integration test");
    }
}
```

---

## Test Configuration

### testng.xml Structure

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">

<suite name="Test Suite" parallel="methods" thread-count="3">
    
    <!-- Suite-level parameters -->
    <parameter name="browser" value="chrome"/>
    <parameter name="environment" value="staging"/>
    
    <test name="Smoke Tests">
        <groups>
            <run>
                <include name="smoke"/>
            </run>
        </groups>
        
        <classes>
            <class name="com.example.tests.LoginTest"/>
            <class name="com.example.tests.SignupTest"/>
        </classes>
    </test>
    
    <test name="Regression Tests">
        <groups>
            <run>
                <include name="regression"/>
                <exclude name="slow"/>
            </run>
        </groups>
        
        <packages>
            <package name="com.example.tests.*"/>
        </packages>
    </test>
</suite>
```

### Running Tests

```bash
# Run using Maven
mvn test

# Run specific suite
mvn test -DsuiteXmlFile=testng.xml

# Run specific test
mvn test -Dtest=LoginTest

# Run specific groups
mvn test -Dgroups=smoke,regression
```

### Parallel Execution

```xml
<!-- Parallel by methods -->
<suite name="Suite" parallel="methods" thread-count="5">
    ...
</suite>

<!-- Parallel by classes -->
<suite name="Suite" parallel="classes" thread-count="3">
    ...
</suite>

<!-- Parallel by tests -->
<suite name="Suite" parallel="tests" thread-count="2">
    ...
</suite>
```

---

## Data-Driven Testing

### Using @Parameters

```java
public class ParameterTest {
    
    @Parameters({"browser", "environment"})
    @Test
    public void testWithParameters(String browser, String env) {
        System.out.println("Browser: " + browser);
        System.out.println("Environment: " + env);
    }
}
```

testng.xml:
```xml
<suite name="Parameter Suite">
    <parameter name="browser" value="chrome"/>
    <parameter name="environment" value="production"/>
    
    <test name="Parameter Test">
        <classes>
            <class name="com.example.ParameterTest"/>
        </classes>
    </test>
</suite>
```

### Using @DataProvider

```java
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;

public class DataProviderTest {
    
    @DataProvider(name = "loginData")
    public Object[][] getLoginData() {
        return new Object[][] {
            {"user1@example.com", "password1"},
            {"user2@example.com", "password2"},
            {"user3@example.com", "password3"}
        };
    }
    
    @Test(dataProvider = "loginData")
    public void testLogin(String email, String password) {
        System.out.println("Testing login with: " + email);
        // Perform login test
    }
}
```

### DataProvider with Objects

```java
@DataProvider(name = "userData")
public Object[][] getUserData() {
    User user1 = new User("John", "Doe", "john@example.com");
    User user2 = new User("Jane", "Smith", "jane@example.com");
    
    return new Object[][] {
        {user1},
        {user2}
    };
}

@Test(dataProvider = "userData")
public void testUserRegistration(User user) {
    System.out.println("Registering: " + user.getEmail());
    // Test registration
}
```

### DataProvider from External Sources

```java
import org.apache.poi.ss.usermodel.*;
import java.io.FileInputStream;
import java.util.ArrayList;
import java.util.List;

public class ExcelDataProvider {
    
    @DataProvider(name = "excelData")
    public Object[][] getExcelData() throws Exception {
        FileInputStream fis = new FileInputStream("testdata.xlsx");
        Workbook workbook = WorkbookFactory.create(fis);
        Sheet sheet = workbook.getSheetAt(0);
        
        List<Object[]> data = new ArrayList<>();
        
        for (int i = 1; i <= sheet.getLastRowNum(); i++) {
            Row row = sheet.getRow(i);
            String username = row.getCell(0).getStringCellValue();
            String password = row.getCell(1).getStringCellValue();
            data.add(new Object[]{username, password});
        }
        
        workbook.close();
        fis.close();
        
        return data.toArray(new Object[0][]);
    }
    
    @Test(dataProvider = "excelData")
    public void testFromExcel(String username, String password) {
        System.out.println("Username: " + username);
        System.out.println("Password: " + password);
    }
}
```

---

## Assertions

### Common Assertions

```java
import org.testng.Assert;
import org.testng.asserts.SoftAssert;

public class AssertionExamples {
    
    @Test
    public void testHardAssertions() {
        // Equality
        Assert.assertEquals(actual, expected);
        Assert.assertEquals(actual, expected, "Custom message");
        
        // Not equals
        Assert.assertNotEquals(actual, expected);
        
        // True/False
        Assert.assertTrue(condition);
        Assert.assertFalse(condition);
        
        // Null checks
        Assert.assertNull(object);
        Assert.assertNotNull(object);
        
        // Same object
        Assert.assertSame(obj1, obj2);
        Assert.assertNotSame(obj1, obj2);
        
        // Fail test
        Assert.fail("Test failed intentionally");
    }
    
    @Test
    public void testSoftAssertions() {
        SoftAssert softAssert = new SoftAssert();
        
        // These won't stop execution immediately
        softAssert.assertEquals(actual1, expected1);
        softAssert.assertTrue(condition1);
        softAssert.assertNotNull(object1);
        
        // All assertions are evaluated at the end
        softAssert.assertAll();
    }
}
```

### Custom Assertions

```java
public class CustomAssertions {
    
    public static void assertContains(String actual, String expected) {
        if (!actual.contains(expected)) {
            Assert.fail("Expected '" + actual + "' to contain '" + expected + "'");
        }
    }
    
    public static void assertGreaterThan(int actual, int expected) {
        if (actual <= expected) {
            Assert.fail(actual + " should be greater than " + expected);
        }
    }
}
```

---

## Best Practices

### 1. Use Meaningful Test Names

```java
// ❌ Bad
@Test
public void test1() { }

// ✅ Good
@Test
public void shouldLoginSuccessfullyWithValidCredentials() { }
```

### 2. Organize Tests with Groups

```java
@Test(groups = {"smoke", "critical"})
public void testCriticalFlow() { }

@Test(groups = "regression")
public void testEdgeCase() { }
```

### 3. Use Test Dependencies Wisely

```java
// ❌ Bad - overusing dependencies
@Test
public void test1() { }

@Test(dependsOnMethods = "test1")
public void test2() { }

@Test(dependsOnMethods = "test2")
public void test3() { }

// ✅ Good - independent tests
@Test
public void testUserRegistration() {
    // Complete independent test
}

@Test
public void testUserLogin() {
    // Complete independent test
}
```

### 4. Proper Setup and Teardown

```java
public class BestPracticeTest {
    private WebDriver driver;
    
    @BeforeMethod
    public void setUp() {
        driver = new ChromeDriver();
        driver.manage().window().maximize();
    }
    
    @Test
    public void testHomePage() {
        driver.get("https://example.com");
        // Test logic
    }
    
    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
```

### 5. Use DataProvider for Data-Driven Tests

```java
@DataProvider(name = "testData")
public Object[][] getData() {
    return new Object[][] {
        {"input1", "expected1"},
        {"input2", "expected2"}
    };
}

@Test(dataProvider = "testData")
public void testWithData(String input, String expected) {
    // Test logic
}
```

---

## Advanced Features

### Listeners

```java
import org.testng.ITestListener;
import org.testng.ITestResult;

public class CustomListener implements ITestListener {
    
    @Override
    public void onTestStart(ITestResult result) {
        System.out.println("Test started: " + result.getName());
    }
    
    @Override
    public void onTestSuccess(ITestResult result) {
        System.out.println("Test passed: " + result.getName());
    }
    
    @Override
    public void onTestFailure(ITestResult result) {
        System.out.println("Test failed: " + result.getName());
        // Take screenshot, log error, etc.
    }
    
    @Override
    public void onTestSkipped(ITestResult result) {
        System.out.println("Test skipped: " + result.getName());
    }
}
```

Use listener:
```java
@Listeners(CustomListener.class)
public class TestClass {
    @Test
    public void test1() { }
}
```

Or in testng.xml:
```xml
<suite name="Suite">
    <listeners>
        <listener class-name="com.example.CustomListener"/>
    </listeners>
    ...
</suite>
```

### Retry Failed Tests

```java
import org.testng.IRetryAnalyzer;
import org.testng.ITestResult;

public class RetryAnalyzer implements IRetryAnalyzer {
    private int retryCount = 0;
    private static final int MAX_RETRY_COUNT = 3;
    
    @Override
    public boolean retry(ITestResult result) {
        if (retryCount < MAX_RETRY_COUNT) {
            retryCount++;
            return true;
        }
        return false;
    }
}
```

Use retry:
```java
@Test(retryAnalyzer = RetryAnalyzer.class)
public void flakyTest() {
    // Test that might fail intermittently
}
```

### Custom Annotations

```java
import java.lang.annotation.*;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface BugReport {
    String id();
    String description() default "";
}
```

Use custom annotation:
```java
@Test
@BugReport(id = "BUG-123", description = "Login issue")
public void testLoginBug() {
    // Test for specific bug
}
```

---

## Integration

### With Selenium

```java
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.*;

public class SeleniumTest {
    private WebDriver driver;
    
    @BeforeClass
    public void setUp() {
        driver = new ChromeDriver();
    }
    
    @Test
    public void testGoogleSearch() {
        driver.get("https://www.google.com");
        Assert.assertEquals(driver.getTitle(), "Google");
    }
    
    @AfterClass
    public void tearDown() {
        driver.quit();
    }
}
```

### With REST Assured

```java
import io.restassured.RestAssured;
import io.restassured.response.Response;
import org.testng.annotations.Test;

public class APITest {
    
    @Test
    public void testGetUser() {
        Response response = RestAssured
            .get("https://api.example.com/users/1");
        
        Assert.assertEquals(response.getStatusCode(), 200);
        Assert.assertTrue(response.jsonPath().getString("name") != null);
    }
}
```

### With Allure Reports

pom.xml:
```xml
<dependency>
    <groupId>io.qameta.allure</groupId>
    <artifactId>allure-testng</artifactId>
    <version>2.25.0</version>
</dependency>
```

Test with Allure:
```java
import io.qameta.allure.*;
import org.testng.annotations.Test;

@Epic("User Management")
@Feature("Login")
public class AllureTest {
    
    @Test
    @Description("Test login with valid credentials")
    @Severity(SeverityLevel.CRITICAL)
    @Story("User Login")
    public void testLogin() {
        // Test logic
    }
}
```

---

## Comparison with JUnit

| Feature | TestNG | JUnit 5 |
|---------|--------|---------|
| **Annotations** | More comprehensive | Basic + Extensions |
| **Dependencies** | Built-in | Via extensions |
| **Parameterization** | @DataProvider, @Parameters | @ParameterizedTest |
| **Grouping** | Built-in @Test(groups) | @Tag |
| **Parallel Execution** | Built-in XML config | Experimental |
| **XML Configuration** | testng.xml | junit-platform.properties |
| **Reporting** | Built-in HTML reports | Via extensions |
| **Listeners** | Built-in | Extension model |
| **Retry Logic** | Built-in | Manual |
| **Test Order** | Priority-based | @Order |

---

## Real-World Examples

### Login Test Suite

```java
public class LoginTestSuite {
    private WebDriver driver;
    
    @BeforeClass
    public void setUp() {
        driver = new ChromeDriver();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
    }
    
    @DataProvider(name = "validCredentials")
    public Object[][] getValidCredentials() {
        return new Object[][] {
            {"user1@example.com", "password123"},
            {"user2@example.com", "password456"}
        };
    }
    
    @DataProvider(name = "invalidCredentials")
    public Object[][] getInvalidCredentials() {
        return new Object[][] {
            {"invalid@example.com", "wrongpass"},
            {"", "password"},
            {"user@example.com", ""}
        };
    }
    
    @Test(dataProvider = "validCredentials", groups = "smoke")
    public void testValidLogin(String email, String password) {
        driver.get("https://example.com/login");
        driver.findElement(By.id("email")).sendKeys(email);
        driver.findElement(By.id("password")).sendKeys(password);
        driver.findElement(By.id("submit")).click();
        
        Assert.assertTrue(driver.getCurrentUrl().contains("/dashboard"));
    }
    
    @Test(dataProvider = "invalidCredentials", groups = "regression")
    public void testInvalidLogin(String email, String password) {
        driver.get("https://example.com/login");
        driver.findElement(By.id("email")).sendKeys(email);
        driver.findElement(By.id("password")).sendKeys(password);
        driver.findElement(By.id("submit")).click();
        
        Assert.assertTrue(driver.findElement(By.className("error")).isDisplayed());
    }
    
    @AfterClass
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
```

### API Testing with Dependencies

```java
public class APITestSuite {
    private static String authToken;
    private static String userId;
    
    @Test(priority = 1, groups = "api")
    public void testLogin() {
        Response response = RestAssured
            .given()
                .contentType("application/json")
                .body("{\"email\":\"user@example.com\",\"password\":\"pass123\"}")
            .when()
                .post("https://api.example.com/login")
            .then()
                .statusCode(200)
                .extract().response();
        
        authToken = response.jsonPath().getString("token");
        Assert.assertNotNull(authToken);
    }
    
    @Test(priority = 2, dependsOnMethods = "testLogin", groups = "api")
    public void testCreateUser() {
        Response response = RestAssured
            .given()
                .header("Authorization", "Bearer " + authToken)
                .contentType("application/json")
                .body("{\"name\":\"John Doe\",\"email\":\"john@example.com\"}")
            .when()
                .post("https://api.example.com/users")
            .then()
                .statusCode(201)
                .extract().response();
        
        userId = response.jsonPath().getString("id");
        Assert.assertNotNull(userId);
    }
    
    @Test(priority = 3, dependsOnMethods = "testCreateUser", groups = "api")
    public void testGetUser() {
        RestAssured
            .given()
                .header("Authorization", "Bearer " + authToken)
            .when()
                .get("https://api.example.com/users/" + userId)
            .then()
                .statusCode(200)
                .body("name", equalTo("John Doe"));
    }
}
```

---

## Resources

### Official Documentation
- [TestNG Documentation](https://testng.org/)
- [TestNG API Documentation](https://javadoc.io/doc/org.testng/testng)
- [TestNG GitHub](https://github.com/testng-team/testng)

### Learning Resources
- [TestNG Tutorial](https://www.tutorialspoint.com/testng/index.htm)
- [TestNG Examples](https://github.com/testng-team/testng-examples)
- [Baeldung TestNG Guide](https://www.baeldung.com/testng)

### Tools & Integrations
- [Allure Reports](https://docs.qameta.io/allure/)
- [ExtentReports](https://www.extentreports.com/)
- [ReportNG](https://reportng.uncommons.org/)

### Community
- [TestNG Google Group](https://groups.google.com/g/testng-users)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/testng)

---

**Last Updated**: January 2026  
**TestNG Version**: 7.9+
