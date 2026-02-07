# unittest

## Introduction

### What is unittest?

unittest is Python's built-in testing framework, inspired by Java's JUnit. It comes bundled with the Python standard library, so no installation is required. unittest provides a solid foundation for writing and running tests with support for test automation, sharing of setup and shutdown code, aggregation of tests into collections, and independence of tests from the reporting framework.

### Why unittest?

- Built into Python standard library
- No additional dependencies
- Object-oriented approach
- Test discovery automation
- Rich assertion methods
- Test fixtures (setUp/tearDown)
- Test suites and runners
- Compatible with pytest
- Mocking support (unittest.mock)
- Widely used and well-documented

### Key Features

- **TestCase class**: Base class for test cases
- **Assertions**: Comprehensive assertion methods
- **Fixtures**: setUp and tearDown methods
- **Test suites**: Group tests together
- **Test runners**: Execute tests
- **Mocking**: Built-in mock objects
- **Subtests**: Multiple assertions without stopping
- **Skip decorators**: Conditional test execution

## Prerequisites

- Python 3.x (comes with unittest)
- Basic Python knowledge
- Understanding of OOP concepts
- Testing fundamentals

## Basic Usage

### Simple Test Case

```python
# test_calculator.py
import unittest

def add(a, b):
    return a + b

def subtract(a, b):
    return a - b

class TestCalculator(unittest.TestCase):
    
    def test_add(self):
        self.assertEqual(add(2, 3), 5)
        self.assertEqual(add(-1, 1), 0)
        self.assertEqual(add(0, 0), 0)
    
    def test_subtract(self):
        self.assertEqual(subtract(5, 3), 2)
        self.assertEqual(subtract(0, 5), -5)
    
    def test_add_floats(self):
        self.assertAlmostEqual(add(0.1, 0.2), 0.3)

if __name__ == '__main__':
    unittest.main()
```

Run tests:

```bash
# Run test file
python test_calculator.py

# Run with unittest discovery
python -m unittest test_calculator.py

# Run specific test
python -m unittest test_calculator.TestCalculator.test_add

# Verbose output
python -m unittest -v test_calculator.py
```

## Test Fixtures

### setUp and tearDown

```python
import unittest

class TestDatabase(unittest.TestCase):
    
    def setUp(self):
        """Called before each test method"""
        print("Setting up test")
        self.connection = self.create_connection()
    
    def tearDown(self):
        """Called after each test method"""
        print("Tearing down test")
        self.connection.close()
    
    def create_connection(self):
        # Simulate database connection
        return {"connected": True}
    
    def test_connection(self):
        self.assertTrue(self.connection["connected"])
    
    def test_query(self):
        self.assertIsNotNone(self.connection)
```

### Class-level Fixtures

```python
import unittest

class TestExpensiveSetup(unittest.TestCase):
    
    @classmethod
    def setUpClass(cls):
        """Called once before all tests in class"""
        print("Setting up class")
        cls.resource = cls.create_expensive_resource()
    
    @classmethod
    def tearDownClass(cls):
        """Called once after all tests in class"""
        print("Tearing down class")
        cls.resource.cleanup()
    
    @staticmethod
    def create_expensive_resource():
        # Simulate expensive setup
        return {"data": "loaded"}
    
    def test_resource_exists(self):
        self.assertIsNotNone(self.resource)
    
    def test_resource_data(self):
        self.assertEqual(self.resource["data"], "loaded")
```

### Module-level Fixtures

```python
# test_module_fixtures.py
import unittest

def setUpModule():
    """Called once before all tests in module"""
    print("Setting up module")
    global shared_resource
    shared_resource = {"initialized": True}

def tearDownModule():
    """Called once after all tests in module"""
    print("Tearing down module")
    global shared_resource
    shared_resource = None

class TestWithModuleFixture(unittest.TestCase):
    
    def test_shared_resource(self):
        self.assertTrue(shared_resource["initialized"])
```

## Assertions

### Common Assertions

```python
import unittest

class TestAssertions(unittest.TestCase):
    
    def test_equality(self):
        self.assertEqual(1 + 1, 2)
        self.assertNotEqual(1, 2)
    
    def test_identity(self):
        x = [1, 2]
        y = x
        self.assertIs(x, y)
        self.assertIsNot(x, [1, 2])
    
    def test_boolean(self):
        self.assertTrue(1 < 2)
        self.assertFalse(1 > 2)
    
    def test_none(self):
        self.assertIsNone(None)
        self.assertIsNotNone("value")
    
    def test_membership(self):
        self.assertIn(3, [1, 2, 3])
        self.assertNotIn(4, [1, 2, 3])
    
    def test_type(self):
        self.assertIsInstance("hello", str)
        self.assertNotIsInstance(123, str)
    
    def test_comparison(self):
        self.assertGreater(5, 3)
        self.assertGreaterEqual(5, 5)
        self.assertLess(3, 5)
        self.assertLessEqual(3, 3)
    
    def test_almost_equal(self):
        self.assertAlmostEqual(0.1 + 0.2, 0.3)
        self.assertAlmostEqual(1.0, 1.001, places=2)
    
    def test_regex(self):
        self.assertRegex("hello world", r"hello.*")
        self.assertNotRegex("hello", r"\d+")
    
    def test_count_equal(self):
        # Order doesn't matter
        self.assertCountEqual([1, 2, 3], [3, 2, 1])
```

### Exception Testing

```python
import unittest

def divide(a, b):
    if b == 0:
        raise ValueError("Cannot divide by zero")
    return a / b

class TestExceptions(unittest.TestCase):
    
    def test_divide_by_zero(self):
        with self.assertRaises(ValueError):
            divide(10, 0)
    
    def test_divide_by_zero_message(self):
        with self.assertRaises(ValueError) as context:
            divide(10, 0)
        
        self.assertIn("Cannot divide by zero", str(context.exception))
    
    def test_divide_by_zero_regex(self):
        with self.assertRaisesRegex(ValueError, "Cannot divide.*zero"):
            divide(10, 0)
    
    def test_no_exception(self):
        # Test that no exception is raised
        result = divide(10, 2)
        self.assertEqual(result, 5)
```

## Subtests

```python
import unittest

class TestSubtests(unittest.TestCase):
    
    def test_even_numbers(self):
        """Test multiple values without stopping on first failure"""
        test_cases = [
            (0, True),
            (2, True),
            (3, False),
            (4, True),
            (5, False),
        ]
        
        for number, expected in test_cases:
            with self.subTest(number=number):
                is_even = number % 2 == 0
                self.assertEqual(is_even, expected)
    
    def test_string_operations(self):
        strings = ["hello", "world", "python"]
        
        for s in strings:
            with self.subTest(string=s):
                self.assertEqual(s.upper(), s.swapcase().swapcase())
                self.assertTrue(s.islower())
```

## Mocking

### unittest.mock

```python
import unittest
from unittest.mock import Mock, MagicMock, patch

# Code to test
class APIClient:
    def fetch_data(self, url):
        import requests
        response = requests.get(url)
        return response.json()

class TestMocking(unittest.TestCase):
    
    def test_mock_object(self):
        # Create a mock
        mock = Mock()
        mock.method.return_value = 42
        
        result = mock.method()
        self.assertEqual(result, 42)
        mock.method.assert_called_once()
    
    def test_mock_with_spec(self):
        # Mock with specification
        mock = Mock(spec=['method1', 'method2'])
        mock.method1.return_value = "result"
        
        self.assertEqual(mock.method1(), "result")
    
    @patch('requests.get')
    def test_api_client(self, mock_get):
        # Mock the requests.get call
        mock_response = Mock()
        mock_response.json.return_value = {"status": "success"}
        mock_get.return_value = mock_response
        
        client = APIClient()
        result = client.fetch_data("https://api.example.com")
        
        self.assertEqual(result["status"], "success")
        mock_get.assert_called_once_with("https://api.example.com")
```

### Patching

```python
import unittest
from unittest.mock import patch, mock_open

class FileProcessor:
    def read_file(self, filename):
        with open(filename, 'r') as f:
            return f.read()
    
    def write_file(self, filename, content):
        with open(filename, 'w') as f:
            f.write(content)

class TestFileProcessor(unittest.TestCase):
    
    @patch('builtins.open', mock_open(read_data='test data'))
    def test_read_file(self):
        processor = FileProcessor()
        content = processor.read_file('test.txt')
        self.assertEqual(content, 'test data')
    
    @patch('builtins.open', new_callable=mock_open)
    def test_write_file(self, mock_file):
        processor = FileProcessor()
        processor.write_file('test.txt', 'new content')
        
        mock_file.assert_called_once_with('test.txt', 'w')
        mock_file().write.assert_called_once_with('new content')
```

### Mocking Properties

```python
import unittest
from unittest.mock import PropertyMock, patch

class User:
    def __init__(self, name):
        self._name = name
    
    @property
    def name(self):
        return self._name

class TestProperties(unittest.TestCase):
    
    def test_mock_property(self):
        user = User("Alice")
        
        with patch.object(User, 'name', new_callable=PropertyMock) as mock_name:
            mock_name.return_value = "Bob"
            self.assertEqual(user.name, "Bob")
```

## Test Discovery

### Project Structure

```
project/
├── src/
│   └── myapp/
│       ├── __init__.py
│       ├── calculator.py
│       └── user.py
└── tests/
    ├── __init__.py
    ├── test_calculator.py
    └── test_user.py
```

### Run Discovery

```bash
# Discover and run all tests
python -m unittest discover

# Specify start directory
python -m unittest discover -s tests

# Pattern matching
python -m unittest discover -p 'test_*.py'

# Verbose output
python -m unittest discover -v
```

## Test Suites

### Creating Test Suites

```python
import unittest
from test_calculator import TestCalculator
from test_user import TestUser

def suite():
    """Create a test suite"""
    test_suite = unittest.TestSuite()
    
    # Add individual tests
    test_suite.addTest(TestCalculator('test_add'))
    test_suite.addTest(TestCalculator('test_subtract'))
    
    # Add all tests from a class
    test_suite.addTests(unittest.TestLoader().loadTestsFromTestCase(TestUser))
    
    return test_suite

if __name__ == '__main__':
    runner = unittest.TextTestRunner(verbosity=2)
    runner.run(suite())
```

## Skip and Expected Failures

### Skip Decorators

```python
import unittest
import sys

class TestSkipping(unittest.TestCase):
    
    @unittest.skip("Not implemented yet")
    def test_future_feature(self):
        self.fail("This test is skipped")
    
    @unittest.skipIf(sys.version_info < (3, 10), "Requires Python 3.10+")
    def test_new_feature(self):
        # Use match case (Python 3.10+)
        pass
    
    @unittest.skipUnless(sys.platform.startswith("linux"), "Linux only")
    def test_linux_feature(self):
        pass
    
    @unittest.expectedFailure
    def test_known_bug(self):
        self.assertEqual(1, 0)  # Known to fail
```

### Conditional Skipping

```python
import unittest

def has_feature(feature):
    """Check if feature is available"""
    return feature in ["feature1", "feature2"]

class TestConditional(unittest.TestCase):
    
    def setUp(self):
        if not has_feature("database"):
            self.skipTest("Database not available")
    
    def test_database_operation(self):
        # This test runs only if database is available
        pass
```

## Parameterized Tests

### Using subTest

```python
import unittest

class TestParameterized(unittest.TestCase):
    
    def test_addition(self):
        test_cases = [
            (1, 2, 3),
            (0, 0, 0),
            (-1, 1, 0),
            (10, -5, 5),
        ]
        
        for a, b, expected in test_cases:
            with self.subTest(a=a, b=b):
                self.assertEqual(a + b, expected)
```

## Custom Test Runner

```python
import unittest

class ColoredTextTestResult(unittest.TextTestResult):
    """Custom test result with colors"""
    
    def addSuccess(self, test):
        super().addSuccess(test)
        print(f"\033[92m✓ {test}\033[0m")  # Green
    
    def addFailure(self, test, err):
        super().addFailure(test, err)
        print(f"\033[91m✗ {test}\033[0m")  # Red
    
    def addError(self, test, err):
        super().addError(test, err)
        print(f"\033[93m! {test}\033[0m")  # Yellow

class ColoredTextTestRunner(unittest.TextTestRunner):
    resultclass = ColoredTextTestResult

if __name__ == '__main__':
    unittest.main(testRunner=ColoredTextTestRunner(verbosity=2))
```

## Best Practices

### Organizing Tests

```python
# tests/test_user_service.py
import unittest
from myapp.user_service import UserService

class TestUserServiceCreation(unittest.TestCase):
    """Test user creation"""
    
    def setUp(self):
        self.service = UserService()
    
    def test_create_valid_user(self):
        user = self.service.create_user("alice", "alice@example.com")
        self.assertEqual(user["username"], "alice")
    
    def test_create_user_missing_email(self):
        with self.assertRaises(ValueError):
            self.service.create_user("alice", "")

class TestUserServiceAuthentication(unittest.TestCase):
    """Test user authentication"""
    
    def setUp(self):
        self.service = UserService()
        self.service.create_user("alice", "alice@example.com", "password123")
    
    def test_authenticate_success(self):
        result = self.service.authenticate("alice", "password123")
        self.assertTrue(result)
    
    def test_authenticate_wrong_password(self):
        result = self.service.authenticate("alice", "wrong")
        self.assertFalse(result)
```

## Integration with pytest

```python
# unittest tests can be run with pytest
import unittest

class TestWithUnittest(unittest.TestCase):
    def test_something(self):
        self.assertEqual(1 + 1, 2)

# Run with pytest
# pytest test_file.py
```

## Command Line Interface

```bash
# Run all tests
python -m unittest

# Run specific module
python -m unittest test_module

# Run specific class
python -m unittest test_module.TestClass

# Run specific method
python -m unittest test_module.TestClass.test_method

# Verbose output
python -m unittest -v

# Fail fast (stop on first failure)
python -m unittest -f

# Show local variables in tracebacks
python -m unittest --locals

# Buffer stdout/stderr
python -m unittest -b
```

## Complete Example

### Application Code

```python
# src/myapp/user_manager.py
class UserManager:
    def __init__(self):
        self.users = {}
    
    def add_user(self, username, email):
        if not username or not email:
            raise ValueError("Username and email required")
        
        if username in self.users:
            raise ValueError("User already exists")
        
        self.users[username] = {"email": email}
        return self.users[username]
    
    def get_user(self, username):
        return self.users.get(username)
    
    def delete_user(self, username):
        if username not in self.users:
            raise ValueError("User not found")
        
        del self.users[username]
    
    def update_email(self, username, new_email):
        if username not in self.users:
            raise ValueError("User not found")
        
        self.users[username]["email"] = new_email
```

### Test Code

```python
# tests/test_user_manager.py
import unittest
from myapp.user_manager import UserManager

class TestUserManager(unittest.TestCase):
    
    def setUp(self):
        """Create a fresh UserManager for each test"""
        self.manager = UserManager()
    
    def test_add_user_success(self):
        user = self.manager.add_user("alice", "alice@example.com")
        self.assertEqual(user["email"], "alice@example.com")
    
    def test_add_user_missing_username(self):
        with self.assertRaises(ValueError) as context:
            self.manager.add_user("", "alice@example.com")
        
        self.assertIn("Username and email required", str(context.exception))
    
    def test_add_user_missing_email(self):
        with self.assertRaises(ValueError):
            self.manager.add_user("alice", "")
    
    def test_add_duplicate_user(self):
        self.manager.add_user("alice", "alice@example.com")
        
        with self.assertRaises(ValueError) as context:
            self.manager.add_user("alice", "alice2@example.com")
        
        self.assertIn("User already exists", str(context.exception))
    
    def test_get_existing_user(self):
        self.manager.add_user("alice", "alice@example.com")
        user = self.manager.get_user("alice")
        self.assertIsNotNone(user)
        self.assertEqual(user["email"], "alice@example.com")
    
    def test_get_nonexistent_user(self):
        user = self.manager.get_user("nobody")
        self.assertIsNone(user)
    
    def test_delete_user_success(self):
        self.manager.add_user("alice", "alice@example.com")
        self.manager.delete_user("alice")
        user = self.manager.get_user("alice")
        self.assertIsNone(user)
    
    def test_delete_nonexistent_user(self):
        with self.assertRaises(ValueError) as context:
            self.manager.delete_user("nobody")
        
        self.assertIn("User not found", str(context.exception))
    
    def test_update_email_success(self):
        self.manager.add_user("alice", "alice@example.com")
        self.manager.update_email("alice", "newemail@example.com")
        user = self.manager.get_user("alice")
        self.assertEqual(user["email"], "newemail@example.com")
    
    def test_update_email_nonexistent_user(self):
        with self.assertRaises(ValueError):
            self.manager.update_email("nobody", "email@example.com")

if __name__ == '__main__':
    unittest.main()
```

Run tests:

```bash
python -m unittest tests.test_user_manager -v
```

## Resources

- [unittest Documentation](https://docs.python.org/3/library/unittest.html)
- [unittest.mock Documentation](https://docs.python.org/3/library/unittest.mock.html)
- [Python Testing with unittest](https://realpython.com/python-testing/)
- [unittest Best Practices](https://docs.python-guide.org/writing/tests/)

## Next Steps

- Write first unittest test
- Learn assertion methods
- Use fixtures (setUp/tearDown)
- Practice mocking
- Organize test suites
- Use test discovery
- CI/CD integration
- Migrate to pytest (optional)
- Advanced patterns
- Test coverage
