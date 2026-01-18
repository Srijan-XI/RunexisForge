# pytest

## Introduction

### What is pytest?

pytest is a mature, full-featured Python testing framework that makes it easy to write small, readable tests and scales to support complex functional testing for applications and libraries. It's one of the most popular testing frameworks in the Python ecosystem, known for its simple syntax, powerful features, and extensive plugin architecture.

### Why pytest?

- Simple and intuitive syntax
- Powerful fixture system
- Parametrized testing
- Detailed assertion introspection
- Plugin architecture (800+ plugins)
- Parallel test execution
- Test discovery automation
- Backwards compatible with unittest
- Rich ecosystem and community
- Excellent documentation

### Key Features

- **Simple assertions**: Use plain `assert` statements
- **Fixtures**: Powerful dependency injection
- **Parametrization**: Run tests with multiple inputs
- **Markers**: Categorize and skip tests
- **Plugins**: Extend functionality
- **Coverage integration**: Built-in coverage support
- **Mocking**: Integration with unittest.mock
- **Parallel execution**: Run tests concurrently

## Prerequisites

- Python 3.7+
- pip or conda
- Basic Python knowledge
- Understanding of testing concepts

## Installation

### Using pip

```bash
# Install pytest
pip install pytest

# Install with common plugins
pip install pytest pytest-cov pytest-xdist pytest-mock

# Verify installation
pytest --version
```

### Using conda

```bash
conda install pytest
```

### Requirements file

```txt
# requirements-test.txt
pytest>=7.4.0
pytest-cov>=4.1.0
pytest-xdist>=3.3.0
pytest-mock>=3.11.0
pytest-asyncio>=0.21.0
pytest-django>=4.5.0  # For Django projects
```

## Basic Usage

### Simple Test

```python
# test_calculator.py

def add(a, b):
    return a + b

def test_add():
    assert add(2, 3) == 5
    assert add(-1, 1) == 0
    assert add(0, 0) == 0

def test_add_floats():
    assert add(0.1, 0.2) == pytest.approx(0.3)
```

Run tests:

```bash
# Run all tests
pytest

# Run specific file
pytest test_calculator.py

# Run specific test
pytest test_calculator.py::test_add

# Verbose output
pytest -v

# Show print statements
pytest -s
```

### Test Classes

```python
# test_user.py

class TestUser:
    def test_create_user(self):
        user = {"name": "Alice", "age": 30}
        assert user["name"] == "Alice"
        assert user["age"] == 30
    
    def test_user_validation(self):
        user = {"name": "Bob", "age": -5}
        assert user["age"] < 0  # This should be validated
```

## Fixtures

### Basic Fixtures

```python
# conftest.py
import pytest

@pytest.fixture
def sample_data():
    return [1, 2, 3, 4, 5]

@pytest.fixture
def user():
    return {"name": "Alice", "email": "alice@example.com"}

# test_fixtures.py
def test_sum(sample_data):
    assert sum(sample_data) == 15

def test_user_name(user):
    assert user["name"] == "Alice"
```

### Fixture Scopes

```python
import pytest

@pytest.fixture(scope="function")  # Default: runs for each test
def function_scope():
    print("Setup function")
    yield "function data"
    print("Teardown function")

@pytest.fixture(scope="class")  # Runs once per class
def class_scope():
    print("Setup class")
    yield "class data"
    print("Teardown class")

@pytest.fixture(scope="module")  # Runs once per module
def module_scope():
    print("Setup module")
    yield "module data"
    print("Teardown module")

@pytest.fixture(scope="session")  # Runs once per session
def session_scope():
    print("Setup session")
    yield "session data"
    print("Teardown session")
```

### Database Fixture

```python
import pytest
import sqlite3

@pytest.fixture(scope="module")
def db_connection():
    # Setup: Create connection
    conn = sqlite3.connect(':memory:')
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE users (
            id INTEGER PRIMARY KEY,
            name TEXT,
            email TEXT
        )
    ''')
    conn.commit()
    
    yield conn
    
    # Teardown: Close connection
    conn.close()

@pytest.fixture
def db_with_users(db_connection):
    cursor = db_connection.cursor()
    cursor.execute("INSERT INTO users (name, email) VALUES (?, ?)", 
                   ("Alice", "alice@example.com"))
    cursor.execute("INSERT INTO users (name, email) VALUES (?, ?)", 
                   ("Bob", "bob@example.com"))
    db_connection.commit()
    
    yield db_connection
    
    # Cleanup: Delete test data
    cursor.execute("DELETE FROM users")
    db_connection.commit()

def test_user_count(db_with_users):
    cursor = db_with_users.cursor()
    cursor.execute("SELECT COUNT(*) FROM users")
    count = cursor.fetchone()[0]
    assert count == 2
```

### Fixture Factories

```python
import pytest

@pytest.fixture
def make_user():
    def _make_user(name, email):
        return {"name": name, "email": email}
    return _make_user

def test_users(make_user):
    user1 = make_user("Alice", "alice@example.com")
    user2 = make_user("Bob", "bob@example.com")
    
    assert user1["name"] == "Alice"
    assert user2["name"] == "Bob"
```

## Parametrization

### Basic Parametrization

```python
import pytest

@pytest.mark.parametrize("input,expected", [
    (2, 4),
    (3, 9),
    (4, 16),
    (5, 25),
])
def test_square(input, expected):
    assert input ** 2 == expected

@pytest.mark.parametrize("a,b,expected", [
    (2, 3, 5),
    (0, 0, 0),
    (-1, 1, 0),
    (10, -5, 5),
])
def test_addition(a, b, expected):
    assert a + b == expected
```

### Multiple Parameters

```python
import pytest

@pytest.mark.parametrize("x", [1, 2, 3])
@pytest.mark.parametrize("y", [10, 20])
def test_multiplication(x, y):
    # Creates 6 tests: (1,10), (1,20), (2,10), (2,20), (3,10), (3,20)
    result = x * y
    assert result > 0
```

### Parametrize with IDs

```python
import pytest

@pytest.mark.parametrize("test_input,expected", [
    ("hello", 5),
    ("world", 5),
    ("pytest", 6),
], ids=["test_hello", "test_world", "test_pytest"])
def test_string_length(test_input, expected):
    assert len(test_input) == expected
```

## Markers

### Built-in Markers

```python
import pytest

@pytest.mark.skip(reason="Not implemented yet")
def test_feature_not_ready():
    assert False

@pytest.mark.skipif(sys.version_info < (3, 10), 
                    reason="Requires Python 3.10+")
def test_new_feature():
    assert True

@pytest.mark.xfail(reason="Known bug")
def test_known_issue():
    assert 1 / 0
```

### Custom Markers

```python
# pytest.ini
[pytest]
markers =
    slow: marks tests as slow
    integration: marks tests as integration tests
    unit: marks tests as unit tests
    api: marks tests as API tests

# test_markers.py
import pytest

@pytest.mark.unit
def test_fast_function():
    assert 1 + 1 == 2

@pytest.mark.slow
def test_slow_function():
    import time
    time.sleep(2)
    assert True

@pytest.mark.integration
@pytest.mark.slow
def test_database_integration():
    # Integration test
    assert True
```

Run specific markers:

```bash
# Run only unit tests
pytest -m unit

# Run only slow tests
pytest -m slow

# Run all except slow tests
pytest -m "not slow"

# Run integration and slow tests
pytest -m "integration and slow"
```

## Assertions

### Basic Assertions

```python
def test_assertions():
    # Equality
    assert 1 + 1 == 2
    assert [1, 2, 3] == [1, 2, 3]
    
    # Identity
    x = [1, 2]
    y = x
    assert x is y
    
    # Membership
    assert 3 in [1, 2, 3]
    assert "hello" in "hello world"
    
    # Boolean
    assert True
    assert not False
    
    # None
    assert None is None
```

### Exception Testing

```python
import pytest

def divide(a, b):
    if b == 0:
        raise ValueError("Cannot divide by zero")
    return a / b

def test_divide_by_zero():
    with pytest.raises(ValueError) as exc_info:
        divide(10, 0)
    
    assert "Cannot divide by zero" in str(exc_info.value)

def test_divide_by_zero_match():
    with pytest.raises(ValueError, match="Cannot divide by zero"):
        divide(10, 0)
```

### Approximate Comparisons

```python
import pytest

def test_float_comparison():
    # Floating point comparison
    assert 0.1 + 0.2 == pytest.approx(0.3)
    
    # With tolerance
    assert 0.3333 == pytest.approx(0.3, abs=0.1)
    
    # Relative tolerance
    assert 100 == pytest.approx(99, rel=0.01)
```

## Mocking

### Using pytest-mock

```bash
pip install pytest-mock
```

```python
# api_client.py
import requests

class APIClient:
    def get_user(self, user_id):
        response = requests.get(f"https://api.example.com/users/{user_id}")
        return response.json()

# test_api_client.py
import pytest
from api_client import APIClient

def test_get_user(mocker):
    # Mock requests.get
    mock_response = mocker.Mock()
    mock_response.json.return_value = {"id": 1, "name": "Alice"}
    
    mocker.patch('requests.get', return_value=mock_response)
    
    client = APIClient()
    user = client.get_user(1)
    
    assert user["name"] == "Alice"
    requests.get.assert_called_once_with("https://api.example.com/users/1")
```

### Monkeypatch

```python
# config.py
API_URL = "https://api.example.com"

# test_config.py
def test_api_url(monkeypatch):
    monkeypatch.setattr('config.API_URL', 'https://test-api.example.com')
    import config
    assert config.API_URL == 'https://test-api.example.com'

def test_environment_variable(monkeypatch):
    monkeypatch.setenv('DATABASE_URL', 'postgresql://localhost/testdb')
    import os
    assert os.getenv('DATABASE_URL') == 'postgresql://localhost/testdb'
```

## Code Coverage

### Using pytest-cov

```bash
pip install pytest-cov
```

Run with coverage:

```bash
# Basic coverage report
pytest --cov=myapp

# HTML coverage report
pytest --cov=myapp --cov-report=html

# Terminal report with missing lines
pytest --cov=myapp --cov-report=term-missing

# Fail if coverage below threshold
pytest --cov=myapp --cov-fail-under=80
```

### Configuration

```ini
# pytest.ini
[pytest]
addopts = 
    --cov=myapp
    --cov-report=html
    --cov-report=term-missing
    --cov-fail-under=80
```

## Async Testing

### pytest-asyncio

```bash
pip install pytest-asyncio
```

```python
# pytest.ini
[pytest]
asyncio_mode = auto

# test_async.py
import pytest
import asyncio

async def fetch_data():
    await asyncio.sleep(0.1)
    return {"status": "success"}

@pytest.mark.asyncio
async def test_fetch_data():
    result = await fetch_data()
    assert result["status"] == "success"

@pytest.mark.asyncio
async def test_multiple_async_calls():
    results = await asyncio.gather(
        fetch_data(),
        fetch_data(),
        fetch_data()
    )
    assert len(results) == 3
```

## Parallel Execution

### pytest-xdist

```bash
pip install pytest-xdist
```

Run tests in parallel:

```bash
# Auto-detect CPU cores
pytest -n auto

# Specify number of workers
pytest -n 4

# Distribute tests to minimize runtime
pytest -n auto --dist loadscope
```

## Plugins

### Popular Plugins

```bash
# Web testing
pip install pytest-playwright
pip install pytest-selenium

# Django
pip install pytest-django

# Flask
pip install pytest-flask

# Database
pip install pytest-postgresql
pip install pytest-mongodb

# Utilities
pip install pytest-timeout
pip install pytest-randomly
pip install pytest-sugar  # Better output
pip install pytest-html  # HTML reports
```

### pytest.ini Configuration

```ini
[pytest]
# Test discovery
python_files = test_*.py *_test.py
python_classes = Test*
python_functions = test_*

# Output
addopts = 
    -v
    --tb=short
    --strict-markers
    --disable-warnings

# Markers
markers =
    slow: marks tests as slow
    integration: integration tests
    unit: unit tests
    smoke: smoke tests

# Paths
testpaths = tests
```

## Best Practices

### Project Structure

```
myproject/
├── src/
│   └── myapp/
│       ├── __init__.py
│       ├── calculator.py
│       └── user.py
├── tests/
│   ├── __init__.py
│   ├── conftest.py
│   ├── unit/
│   │   ├── test_calculator.py
│   │   └── test_user.py
│   └── integration/
│       └── test_api.py
├── pytest.ini
└── requirements-test.txt
```

### conftest.py Example

```python
# tests/conftest.py
import pytest
import os

@pytest.fixture(scope="session")
def test_config():
    return {
        "database_url": os.getenv("TEST_DB_URL", "sqlite:///:memory:"),
        "api_url": "https://test-api.example.com"
    }

@pytest.fixture(autouse=True)
def reset_database():
    """Automatically reset database before each test"""
    # Setup
    print("Setting up database")
    yield
    # Teardown
    print("Cleaning up database")

@pytest.fixture
def api_client(test_config):
    from myapp.client import APIClient
    return APIClient(test_config["api_url"])
```

## Complete Example

### Application Code

```python
# src/myapp/user_service.py
import hashlib

class UserService:
    def __init__(self, db):
        self.db = db
    
    def create_user(self, username, email, password):
        if not username or not email:
            raise ValueError("Username and email are required")
        
        password_hash = hashlib.sha256(password.encode()).hexdigest()
        
        user = {
            "username": username,
            "email": email,
            "password_hash": password_hash
        }
        
        self.db.save(user)
        return user
    
    def get_user(self, username):
        return self.db.find_one({"username": username})
    
    def authenticate(self, username, password):
        user = self.get_user(username)
        if not user:
            return False
        
        password_hash = hashlib.sha256(password.encode()).hexdigest()
        return user["password_hash"] == password_hash
```

### Test Code

```python
# tests/conftest.py
import pytest

class MockDB:
    def __init__(self):
        self.users = []
    
    def save(self, user):
        self.users.append(user)
    
    def find_one(self, query):
        for user in self.users:
            if all(user.get(k) == v for k, v in query.items()):
                return user
        return None
    
    def clear(self):
        self.users = []

@pytest.fixture
def mock_db():
    db = MockDB()
    yield db
    db.clear()

@pytest.fixture
def user_service(mock_db):
    from myapp.user_service import UserService
    return UserService(mock_db)

# tests/test_user_service.py
import pytest
from myapp.user_service import UserService

class TestUserService:
    def test_create_user(self, user_service):
        user = user_service.create_user("alice", "alice@example.com", "password123")
        
        assert user["username"] == "alice"
        assert user["email"] == "alice@example.com"
        assert "password_hash" in user
    
    def test_create_user_missing_username(self, user_service):
        with pytest.raises(ValueError, match="Username and email are required"):
            user_service.create_user("", "alice@example.com", "password123")
    
    @pytest.mark.parametrize("username,email,password", [
        ("alice", "alice@example.com", "pass123"),
        ("bob", "bob@example.com", "secure456"),
        ("charlie", "charlie@example.com", "test789"),
    ])
    def test_create_multiple_users(self, user_service, username, email, password):
        user = user_service.create_user(username, email, password)
        assert user["username"] == username
        assert user["email"] == email
    
    def test_get_user(self, user_service):
        user_service.create_user("alice", "alice@example.com", "password123")
        
        retrieved = user_service.get_user("alice")
        assert retrieved["username"] == "alice"
    
    def test_authenticate_success(self, user_service):
        user_service.create_user("alice", "alice@example.com", "password123")
        
        assert user_service.authenticate("alice", "password123") is True
    
    def test_authenticate_wrong_password(self, user_service):
        user_service.create_user("alice", "alice@example.com", "password123")
        
        assert user_service.authenticate("alice", "wrongpassword") is False
    
    def test_authenticate_nonexistent_user(self, user_service):
        assert user_service.authenticate("nobody", "password") is False
```

Run tests:

```bash
# Run all tests with coverage
pytest --cov=myapp --cov-report=term-missing

# Run only user service tests
pytest tests/test_user_service.py -v

# Run with parallel execution
pytest -n auto
```

## Troubleshooting

### Common Issues

**Import errors**:
```bash
# Add src to PYTHONPATH
export PYTHONPATH="${PYTHONPATH}:${PWD}/src"

# Or install package in development mode
pip install -e .
```

**Fixtures not found**:
```python
# Make sure conftest.py is in the right location
# tests/conftest.py is discovered automatically
```

**Tests not discovered**:
```bash
# Check test discovery patterns in pytest.ini
# Default: test_*.py and *_test.py
pytest --collect-only  # Show discovered tests
```

## Resources

- [pytest Documentation](https://docs.pytest.org/)
- [pytest Plugins](https://docs.pytest.org/en/latest/reference/plugin_list.html)
- [pytest Examples](https://docs.pytest.org/en/latest/example/index.html)
- [Real Python pytest Tutorial](https://realpython.com/pytest-python-testing/)
- [pytest Best Practices](https://docs.pytest.org/en/latest/explanation/goodpractices.html)

## Next Steps

- Install pytest
- Write first test
- Learn fixtures
- Use parametrization
- Add markers
- Configure coverage
- Use plugins
- Parallel execution
- CI/CD integration
- Advanced patterns
