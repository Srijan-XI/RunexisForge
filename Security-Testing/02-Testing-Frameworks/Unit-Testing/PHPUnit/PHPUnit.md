# PHPUnit - PHP Testing Framework

## Table of Contents
- [Introduction](#introduction)
- [Why PHPUnit?](#why-phpunit)
- [Installation & Setup](#installation--setup)
- [Writing Tests](#writing-tests)
- [Assertions](#assertions)
- [Test Fixtures](#test-fixtures)
- [Data Providers](#data-providers)
- [Test Organization](#test-organization)
- [Best Practices](#best-practices)
- [Advanced Features](#advanced-features)
- [Mocking & Stubbing](#mocking--stubbing)
- [Code Coverage](#code-coverage)
- [Integration](#integration)
- [Real-World Examples](#real-world-examples)
- [Resources](#resources)

---

## Introduction

PHPUnit is the de facto standard testing framework for PHP. Created by Sebastian Bergmann, it provides a comprehensive testing solution for PHP applications, supporting unit tests, integration tests, and functional tests. PHPUnit is heavily inspired by the xUnit family of testing frameworks.

### Key Features
- **Unit Testing**: Test individual PHP classes and methods
- **Rich Assertions**: Comprehensive assertion library
- **Data Providers**: Data-driven testing support
- **Mock Objects**: Built-in mocking and stubbing
- **Code Coverage**: Integrated code coverage analysis
- **Test Doubles**: Support for test doubles (mocks, stubs, spies)
- **Fixtures**: Setup and teardown support
- **CLI & Web Runner**: Run tests from command line or browser
- **XML Configuration**: Flexible test configuration
- **Integration**: Works with CI/CD pipelines

---

## Why PHPUnit?

### Advantages

1. **Industry Standard**
   - Most widely-used PHP testing framework
   - Required for most PHP projects
   - Extensive community support
   - Well-maintained and actively developed

2. **Comprehensive Features**
   - Built-in mocking framework
   - Code coverage reporting
   - Data-driven testing
   - Test isolation
   - Flexible configuration

3. **Framework Integration**
   - Laravel, Symfony, WordPress support
   - Composer integration
   - CI/CD pipeline compatibility
   - IDE support (PhpStorm, VS Code)

4. **Test-Driven Development**
   - Supports TDD workflow
   - Fast test execution
   - Clear error messages
   - Excellent documentation

### Use Cases
- Unit testing
- Integration testing
- Functional testing
- API testing
- Database testing
- Test-Driven Development (TDD)

---

## Installation & Setup

### Prerequisites
- PHP 7.4 or higher
- Composer package manager

### Installation via Composer

```bash
# Install PHPUnit as dev dependency
composer require --dev phpunit/phpunit ^10

# Verify installation
./vendor/bin/phpunit --version
```

### Global Installation

```bash
# Install globally (not recommended for projects)
composer global require phpunit/phpunit

# Verify
phpunit --version
```

### Project Structure

```
project/
├── src/
│   └── Calculator.php
├── tests/
│   └── CalculatorTest.php
├── composer.json
├── phpunit.xml
└── vendor/
```

### Configuration File (phpunit.xml)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<phpunit xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:noNamespaceSchemaLocation="vendor/phpunit/phpunit/phpunit.xsd"
         bootstrap="vendor/autoload.php"
         colors="true"
         verbose="true">
    
    <testsuites>
        <testsuite name="Unit Tests">
            <directory>tests/Unit</directory>
        </testsuite>
        <testsuite name="Integration Tests">
            <directory>tests/Integration</directory>
        </testsuite>
    </testsuites>
    
    <coverage>
        <include>
            <directory suffix=".php">src</directory>
        </include>
        <exclude>
            <directory>vendor</directory>
        </exclude>
    </coverage>
    
    <php>
        <env name="APP_ENV" value="testing"/>
        <env name="DB_CONNECTION" value="sqlite"/>
        <env name="DB_DATABASE" value=":memory:"/>
    </php>
</phpunit>
```

### Composer Configuration

```json
{
    "name": "your-project/name",
    "require-dev": {
        "phpunit/phpunit": "^10.0"
    },
    "autoload": {
        "psr-4": {
            "App\\": "src/"
        }
    },
    "autoload-dev": {
        "psr-4": {
            "Tests\\": "tests/"
        }
    },
    "scripts": {
        "test": "phpunit",
        "test-coverage": "phpunit --coverage-html coverage"
    }
}
```

---

## Writing Tests

### Basic Test Structure

```php
<?php

namespace Tests;

use PHPUnit\Framework\TestCase;
use App\Calculator;

class CalculatorTest extends TestCase
{
    public function testAddition(): void
    {
        $calculator = new Calculator();
        $result = $calculator->add(2, 3);
        
        $this->assertEquals(5, $result);
    }
    
    public function testSubtraction(): void
    {
        $calculator = new Calculator();
        $result = $calculator->subtract(10, 4);
        
        $this->assertEquals(6, $result);
    }
    
    public function testDivision(): void
    {
        $calculator = new Calculator();
        $result = $calculator->divide(10, 2);
        
        $this->assertEquals(5, $result);
    }
    
    public function testDivisionByZero(): void
    {
        $this->expectException(\DivisionByZeroError::class);
        
        $calculator = new Calculator();
        $calculator->divide(10, 0);
    }
}
```

### Test Naming Conventions

```php
class UserTest extends TestCase
{
    // ✅ Good - descriptive test names
    public function testUserCanBeCreatedWithValidData(): void
    {
        // Test implementation
    }
    
    public function testUserEmailMustBeUnique(): void
    {
        // Test implementation
    }
    
    public function testUserPasswordIsHashed(): void
    {
        // Test implementation
    }
    
    // Using @test annotation (alternative)
    /**
     * @test
     */
    public function user_can_update_profile(): void
    {
        // Test implementation
    }
}
```

### Running Tests

```bash
# Run all tests
./vendor/bin/phpunit

# Run specific test file
./vendor/bin/phpunit tests/CalculatorTest.php

# Run specific test method
./vendor/bin/phpunit --filter testAddition

# Run specific test suite
./vendor/bin/phpunit --testsuite "Unit Tests"

# Run with coverage
./vendor/bin/phpunit --coverage-html coverage

# Run with colors
./vendor/bin/phpunit --colors=always

# Run in verbose mode
./vendor/bin/phpunit --verbose
```

---

## Assertions

### Common Assertions

```php
class AssertionExamples extends TestCase
{
    public function testEqualityAssertions(): void
    {
        // Equality
        $this->assertEquals(expected, actual);
        $this->assertEquals(expected, actual, 'Custom message');
        
        // Strict equality (type-safe)
        $this->assertSame(expected, actual);
        
        // Not equal
        $this->assertNotEquals(unexpected, actual);
        $this->assertNotSame(unexpected, actual);
    }
    
    public function testBooleanAssertions(): void
    {
        $this->assertTrue(condition);
        $this->assertFalse(condition);
        
        $this->assertNull($variable);
        $this->assertNotNull($variable);
    }
    
    public function testStringAssertions(): void
    {
        $this->assertStringContainsString('needle', 'haystack');
        $this->assertStringStartsWith('prefix', 'prefixed string');
        $this->assertStringEndsWith('suffix', 'string with suffix');
        $this->assertStringMatchesFormat('%s at line %d', 'Error at line 42');
        $this->assertMatchesRegularExpression('/pattern/', 'string');
    }
    
    public function testArrayAssertions(): void
    {
        $this->assertCount(3, $array);
        $this->assertContains('value', $array);
        $this->assertArrayHasKey('key', $array);
        $this->assertEmpty($array);
        $this->assertNotEmpty($array);
    }
    
    public function testObjectAssertions(): void
    {
        $this->assertInstanceOf(ClassName::class, $object);
        $this->assertObjectHasProperty('propertyName', $object);
    }
    
    public function testFileAssertions(): void
    {
        $this->assertFileExists('/path/to/file');
        $this->assertFileIsReadable('/path/to/file');
        $this->assertDirectoryExists('/path/to/directory');
    }
    
    public function testNumericAssertions(): void
    {
        $this->assertGreaterThan(5, 10);
        $this->assertGreaterThanOrEqual(5, 5);
        $this->assertLessThan(10, 5);
        $this->assertLessThanOrEqual(10, 10);
        $this->assertEqualsWithDelta(1.5, 1.51, 0.02);
    }
}
```

### Exception Assertions

```php
class ExceptionTest extends TestCase
{
    public function testExceptionIsThrown(): void
    {
        $this->expectException(\InvalidArgumentException::class);
        $this->expectExceptionMessage('Invalid email');
        $this->expectExceptionCode(400);
        
        throw new \InvalidArgumentException('Invalid email', 400);
    }
    
    public function testExceptionWithClosure(): void
    {
        $user = new User();
        
        $this->expectException(\InvalidArgumentException::class);
        $user->setEmail('invalid-email');
    }
}
```

---

## Test Fixtures

### Setup and Teardown

```php
class FixtureExample extends TestCase
{
    private $calculator;
    private $database;
    
    /**
     * Runs once before all tests in the class
     */
    public static function setUpBeforeClass(): void
    {
        echo "Setting up before class\n";
        // Initialize shared resources
    }
    
    /**
     * Runs before each test method
     */
    protected function setUp(): void
    {
        echo "Setting up before test\n";
        $this->calculator = new Calculator();
        $this->database = new DatabaseConnection();
    }
    
    /**
     * Runs after each test method
     */
    protected function tearDown(): void
    {
        echo "Tearing down after test\n";
        $this->database->close();
        $this->calculator = null;
    }
    
    /**
     * Runs once after all tests in the class
     */
    public static function tearDownAfterClass(): void
    {
        echo "Tearing down after class\n";
        // Clean up shared resources
    }
    
    public function testSomething(): void
    {
        $this->assertNotNull($this->calculator);
    }
}
```

### Execution Order

```
setUpBeforeClass()
  setUp()
    test1()
  tearDown()
  setUp()
    test2()
  tearDown()
tearDownAfterClass()
```

---

## Data Providers

### Basic Data Provider

```php
class DataProviderTest extends TestCase
{
    /**
     * @dataProvider additionProvider
     */
    public function testAddition(int $a, int $b, int $expected): void
    {
        $calculator = new Calculator();
        $result = $calculator->add($a, $b);
        
        $this->assertEquals($expected, $result);
    }
    
    public static function additionProvider(): array
    {
        return [
            'positive numbers' => [2, 3, 5],
            'negative numbers' => [-2, -3, -5],
            'mixed numbers' => [-2, 3, 1],
            'zero' => [0, 0, 0],
        ];
    }
}
```

### Advanced Data Provider

```php
class UserValidationTest extends TestCase
{
    /**
     * @dataProvider validEmailProvider
     */
    public function testValidEmails(string $email): void
    {
        $validator = new EmailValidator();
        $this->assertTrue($validator->isValid($email));
    }
    
    /**
     * @dataProvider invalidEmailProvider
     */
    public function testInvalidEmails(string $email): void
    {
        $validator = new EmailValidator();
        $this->assertFalse($validator->isValid($email));
    }
    
    public static function validEmailProvider(): array
    {
        return [
            ['user@example.com'],
            ['john.doe@company.org'],
            ['test+filter@domain.co.uk'],
        ];
    }
    
    public static function invalidEmailProvider(): array
    {
        return [
            ['invalid'],
            ['@example.com'],
            ['user@'],
            ['user@.com'],
        ];
    }
}
```

### Data Provider with Objects

```php
class UserTest extends TestCase
{
    /**
     * @dataProvider userProvider
     */
    public function testUserCreation(array $userData): void
    {
        $user = new User(
            $userData['name'],
            $userData['email'],
            $userData['age']
        );
        
        $this->assertEquals($userData['name'], $user->getName());
        $this->assertEquals($userData['email'], $user->getEmail());
        $this->assertEquals($userData['age'], $user->getAge());
    }
    
    public static function userProvider(): array
    {
        return [
            'adult user' => [
                [
                    'name' => 'John Doe',
                    'email' => 'john@example.com',
                    'age' => 30
                ]
            ],
            'young user' => [
                [
                    'name' => 'Jane Smith',
                    'email' => 'jane@example.com',
                    'age' => 18
                ]
            ],
        ];
    }
}
```

---

## Test Organization

### Test Suites

```php
// tests/Unit/UnitTestSuite.php
class UnitTestSuite extends TestCase
{
    public static function suite(): TestSuite
    {
        $suite = new TestSuite('Unit Tests');
        
        $suite->addTestSuite(CalculatorTest::class);
        $suite->addTestSuite(UserTest::class);
        $suite->addTestSuite(EmailValidatorTest::class);
        
        return $suite;
    }
}
```

### Test Groups

```php
class GroupedTest extends TestCase
{
    /**
     * @group fast
     */
    public function testFastOperation(): void
    {
        // Quick test
    }
    
    /**
     * @group slow
     * @group database
     */
    public function testDatabaseQuery(): void
    {
        // Slow database test
    }
    
    /**
     * @group integration
     */
    public function testApiIntegration(): void
    {
        // Integration test
    }
}
```

Run specific groups:
```bash
# Run only fast tests
./vendor/bin/phpunit --group fast

# Exclude slow tests
./vendor/bin/phpunit --exclude-group slow

# Run multiple groups
./vendor/bin/phpunit --group fast,integration
```

---

## Best Practices

### 1. Follow AAA Pattern (Arrange-Act-Assert)

```php
public function testUserRegistration(): void
{
    // Arrange
    $userService = new UserService();
    $userData = [
        'name' => 'John Doe',
        'email' => 'john@example.com',
        'password' => 'secret123'
    ];
    
    // Act
    $user = $userService->register($userData);
    
    // Assert
    $this->assertInstanceOf(User::class, $user);
    $this->assertEquals('John Doe', $user->getName());
    $this->assertEquals('john@example.com', $user->getEmail());
}
```

### 2. Use Type Declarations

```php
// ✅ Good - type declarations
public function testAddition(): void
{
    $result = $this->calculator->add(2, 3);
    $this->assertIsInt($result);
    $this->assertEquals(5, $result);
}

// ❌ Bad - no type declaration
public function testAddition()
{
    $result = $this->calculator->add(2, 3);
    $this->assertEquals(5, $result);
}
```

### 3. One Assertion Per Test (When Possible)

```php
// ✅ Good - focused tests
public function testUserHasName(): void
{
    $this->assertEquals('John', $this->user->getName());
}

public function testUserHasEmail(): void
{
    $this->assertEquals('john@example.com', $this->user->getEmail());
}

// ⚠️ Acceptable - related assertions
public function testUserProperties(): void
{
    $this->assertEquals('John', $this->user->getName());
    $this->assertEquals('john@example.com', $this->user->getEmail());
    $this->assertEquals(30, $this->user->getAge());
}
```

### 4. Use Meaningful Test Names

```php
// ✅ Good
public function testUserCannotRegisterWithDuplicateEmail(): void
{
    // Test implementation
}

public function testPasswordIsHashedBeforeSaving(): void
{
    // Test implementation
}

// ❌ Bad
public function test1(): void
{
    // Test implementation
}
```

### 5. Clean Up Test Data

```php
class DatabaseTest extends TestCase
{
    private $connection;
    
    protected function setUp(): void
    {
        $this->connection = new DatabaseConnection();
        $this->connection->beginTransaction();
    }
    
    protected function tearDown(): void
    {
        $this->connection->rollback();
        $this->connection->close();
    }
    
    public function testInsertUser(): void
    {
        // Test will be rolled back automatically
    }
}
```

---

## Advanced Features

### Mocking & Stubbing

```php
class OrderServiceTest extends TestCase
{
    public function testOrderProcessing(): void
    {
        // Create mock
        $paymentGateway = $this->createMock(PaymentGateway::class);
        
        // Configure expectations
        $paymentGateway
            ->expects($this->once())
            ->method('charge')
            ->with($this->equalTo(100.00))
            ->willReturn(true);
        
        // Use mock in test
        $orderService = new OrderService($paymentGateway);
        $result = $orderService->processOrder(100.00);
        
        $this->assertTrue($result);
    }
    
    public function testWithStub(): void
    {
        // Create stub
        $userRepository = $this->createStub(UserRepository::class);
        
        // Configure stub
        $userRepository
            ->method('findById')
            ->willReturn(new User('John Doe'));
        
        $userService = new UserService($userRepository);
        $user = $userService->getUser(1);
        
        $this->assertEquals('John Doe', $user->getName());
    }
}
```

### Test Doubles

```php
class TestDoubleExamples extends TestCase
{
    public function testWithMock(): void
    {
        $mock = $this->createMock(Mailer::class);
        $mock->expects($this->once())
             ->method('send')
             ->with($this->stringContains('Welcome'));
        
        $userService = new UserService($mock);
        $userService->sendWelcomeEmail('user@example.com');
    }
    
    public function testWithPartialMock(): void
    {
        $mock = $this->getMockBuilder(UserService::class)
                     ->onlyMethods(['sendEmail'])
                     ->getMock();
        
        $mock->expects($this->once())
             ->method('sendEmail');
        
        $mock->registerUser('john@example.com');
    }
}
```

### Database Testing

```php
use PHPUnit\Framework\TestCase;

class DatabaseTest extends TestCase
{
    private $pdo;
    
    protected function setUp(): void
    {
        $this->pdo = new PDO('sqlite::memory:');
        $this->pdo->exec('
            CREATE TABLE users (
                id INTEGER PRIMARY KEY,
                name TEXT,
                email TEXT
            )
        ');
    }
    
    public function testInsertUser(): void
    {
        $stmt = $this->pdo->prepare('
            INSERT INTO users (name, email) VALUES (?, ?)
        ');
        $stmt->execute(['John Doe', 'john@example.com']);
        
        $stmt = $this->pdo->query('SELECT * FROM users WHERE email = "john@example.com"');
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        
        $this->assertEquals('John Doe', $user['name']);
    }
}
```

---

## Code Coverage

### Generating Coverage Reports

```bash
# HTML coverage report
./vendor/bin/phpunit --coverage-html coverage

# Text coverage summary
./vendor/bin/phpunit --coverage-text

# XML coverage (for CI)
./vendor/bin/phpunit --coverage-clover coverage.xml

# Coverage filter
./vendor/bin/phpunit --coverage-filter src/
```

### Coverage Annotations

```php
/**
 * @covers App\Calculator
 */
class CalculatorTest extends TestCase
{
    /**
     * @covers App\Calculator::add
     */
    public function testAddition(): void
    {
        // Test implementation
    }
    
    /**
     * @coversNothing
     */
    public function testIntegration(): void
    {
        // This test won't count toward coverage
    }
}
```

---

## Integration

### Laravel Integration

```php
namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UserControllerTest extends TestCase
{
    use RefreshDatabase;
    
    public function test_user_can_register(): void
    {
        $response = $this->post('/register', [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);
        
        $response->assertStatus(302);
        $this->assertDatabaseHas('users', [
            'email' => 'john@example.com'
        ]);
    }
}
```

### Symfony Integration

```php
namespace App\Tests;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class UserControllerTest extends WebTestCase
{
    public function testUserRegistration(): void
    {
        $client = static::createClient();
        
        $client->request('POST', '/register', [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => 'password'
        ]);
        
        $this->assertResponseStatusCodeSame(302);
    }
}
```

---

## Real-World Examples

### Testing a Service Class

```php
class UserServiceTest extends TestCase
{
    private UserService $userService;
    private UserRepository $userRepository;
    
    protected function setUp(): void
    {
        $this->userRepository = $this->createMock(UserRepository::class);
        $this->userService = new UserService($this->userRepository);
    }
    
    public function testCreateUser(): void
    {
        // Arrange
        $userData = [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => 'secret123'
        ];
        
        $this->userRepository
            ->expects($this->once())
            ->method('save')
            ->willReturn(new User($userData['name'], $userData['email']));
        
        // Act
        $user = $this->userService->createUser($userData);
        
        // Assert
        $this->assertInstanceOf(User::class, $user);
        $this->assertEquals('John Doe', $user->getName());
    }
    
    public function testCreateUserWithDuplicateEmail(): void
    {
        $this->userRepository
            ->method('findByEmail')
            ->willReturn(new User('Existing User', 'john@example.com'));
        
        $this->expectException(DuplicateEmailException::class);
        
        $this->userService->createUser([
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => 'secret123'
        ]);
    }
}
```

### Testing API Endpoints

```php
class ApiTest extends TestCase
{
    private $client;
    
    protected function setUp(): void
    {
        $this->client = new GuzzleHttp\Client([
            'base_uri' => 'http://api.example.com',
        ]);
    }
    
    public function testGetUsers(): void
    {
        $response = $this->client->get('/users');
        
        $this->assertEquals(200, $response->getStatusCode());
        
        $data = json_decode($response->getBody(), true);
        $this->assertIsArray($data);
        $this->assertNotEmpty($data);
    }
    
    public function testCreateUser(): void
    {
        $response = $this->client->post('/users', [
            'json' => [
                'name' => 'John Doe',
                'email' => 'john@example.com'
            ]
        ]);
        
        $this->assertEquals(201, $response->getStatusCode());
        
        $data = json_decode($response->getBody(), true);
        $this->assertEquals('John Doe', $data['name']);
    }
}
```

---

## Resources

### Official Documentation
- [PHPUnit Documentation](https://phpunit.de/documentation.html)
- [PHPUnit GitHub](https://github.com/sebastianbergmann/phpunit)
- [PHPUnit Manual](https://phpunit.readthedocs.io/)

### Learning Resources
- [PHPUnit Testing Tutorial](https://www.tutorialspoint.com/php/php_and_phpunit.htm)
- [Laracasts PHPUnit](https://laracasts.com/series/phpunit-testing-in-laravel)
- [PHP Testing Basics](https://phpunit.de/getting-started/)

### Tools & Extensions
- [Mockery](https://github.com/mockery/mockery) - Alternative mocking library
- [Faker](https://github.com/FakerPHP/Faker) - Generate fake data
- [PHPUnit Pretty Result Printer](https://github.com/mikeerickson/phpunit-pretty-result-printer)

### Community
- [PHPUnit Slack](https://phpunit.de/support.html)
- [Stack Overflow - PHPUnit](https://stackoverflow.com/questions/tagged/phpunit)
- [PHP Testing Community](https://phptesting.org/)

---

**Last Updated**: January 2026  
**PHPUnit Version**: 10.x+
