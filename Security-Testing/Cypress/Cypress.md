# Cypress - Modern E2E Testing Framework

## Table of Contents
- [Introduction](#introduction)
- [Why Cypress?](#why-cypress)
- [Installation & Setup](#installation--setup)
- [Core Concepts](#core-concepts)
- [Writing Tests](#writing-tests)
- [Best Practices](#best-practices)
- [Advanced Features](#advanced-features)
- [CI/CD Integration](#cicd-integration)
- [Comparison with Other Tools](#comparison-with-other-tools)
- [Real-World Examples](#real-world-examples)
- [Resources](#resources)

---

## Introduction

Cypress is a next-generation front-end testing tool built for the modern web. It enables developers to write fast, easy, and reliable tests for anything that runs in a browser. Unlike Selenium-based tools, Cypress operates directly in the browser and provides a unique architecture that delivers faster, more reliable testing.

### Key Features
- **Time Travel**: Cypress takes snapshots as tests run, allowing you to hover over commands in the Command Log to see exactly what happened at each step
- **Real-time Reloads**: Automatically reloads whenever you make changes to your tests
- **Automatic Waiting**: Never add waits or sleeps to your tests - Cypress automatically waits for commands and assertions
- **Debuggability**: Readable errors and stack traces make debugging fast and easy
- **Network Traffic Control**: Easily control, stub, and test edge cases without touching your server
- **Screenshots & Videos**: View screenshots taken automatically on failure, or videos of your entire test suite
- **Cross-browser Testing**: Run tests within Chrome, Edge, Firefox, and Electron browsers

---

## Why Cypress?

### Advantages Over Traditional Testing Tools

1. **Developer Experience**
   - Runs in the same run-loop as your application
   - Fast, consistent, and reliable test execution
   - Powerful debugging capabilities with Chrome DevTools
   - Time-travel debugging with DOM snapshots

2. **Architecture Benefits**
   - Direct access to the DOM and window objects
   - No need for Selenium WebDriver
   - Runs inside the browser, not outside
   - Can synchronously access everything in your application

3. **Modern Features**
   - Built-in retry logic for assertions
   - Automatic screenshot and video recording
   - Network stubbing and mocking
   - Visual regression testing support

4. **Testing Capabilities**
   - E2E Testing
   - Integration Testing
   - Unit Testing
   - Component Testing (React, Vue, Angular)

---

## Installation & Setup

### Prerequisites
- Node.js (version 18.x, 20.x, or newer)
- npm or yarn package manager

### Installing Cypress

#### Via npm
```bash
npm install --save-dev cypress
```

#### Via yarn
```bash
yarn add --dev cypress
```

#### Via pnpm
```bash
pnpm add -D cypress
```

### Opening Cypress

After installation, you can open Cypress for the first time:

```bash
npx cypress open
```

Or add a script to your `package.json`:

```json
{
  "scripts": {
    "cypress:open": "cypress open",
    "cypress:run": "cypress run"
  }
}
```

### Project Structure

When you first open Cypress, it will create a default folder structure:

```
your-project/
├── cypress/
│   ├── downloads/          # Downloaded files during tests
│   ├── e2e/               # E2E test specs
│   ├── fixtures/          # Static test data
│   ├── support/           # Support files and custom commands
│   │   ├── commands.js    # Custom commands
│   │   └── e2e.js        # Runs before every spec file
├── cypress.config.js      # Cypress configuration
└── package.json
```

### Basic Configuration

Create or edit `cypress.config.js`:

```javascript
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: true,
    screenshotOnRunFailure: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
  },
})
```

---

## Core Concepts

### Test Structure

Cypress tests follow a BDD (Behavior-Driven Development) structure:

```javascript
describe('Test Suite Name', () => {
  beforeEach(() => {
    // Runs before each test
    cy.visit('/')
  })

  it('should do something', () => {
    // Test implementation
  })

  it('should do something else', () => {
    // Another test
  })
})
```

### Commands

Cypress provides a rich API of commands:

#### Navigation
```javascript
cy.visit('https://example.com')
cy.go('back')
cy.reload()
```

#### Querying
```javascript
cy.get('.my-selector')
cy.contains('Submit')
cy.find('.child-element')
cy.first()
cy.last()
```

#### Interaction
```javascript
cy.click()
cy.type('text to type')
cy.clear()
cy.check()
cy.select('option')
cy.dblclick()
cy.rightclick()
```

#### Assertions
```javascript
cy.get('button').should('be.visible')
cy.get('input').should('have.value', 'expected value')
cy.url().should('include', '/dashboard')
cy.get('.error').should('not.exist')
```

### Asynchronous Nature

Cypress commands are asynchronous and enqueued to run later. They don't return values directly:

```javascript
// ❌ Won't work
const button = cy.get('button')

// ✅ Correct way
cy.get('button').then(($button) => {
  // Access the element here
})
```

### Automatic Waiting

Cypress automatically waits for elements and assertions:

```javascript
// Cypress will retry getting this element until it exists
// or times out (default 4 seconds)
cy.get('.loading').should('not.exist')
cy.get('.loaded').should('be.visible')
```

---

## Writing Tests

### Basic Test Example

```javascript
// cypress/e2e/login.cy.js
describe('Login Functionality', () => {
  beforeEach(() => {
    cy.visit('/login')
  })

  it('should successfully log in with valid credentials', () => {
    cy.get('input[name="email"]').type('user@example.com')
    cy.get('input[name="password"]').type('password123')
    cy.get('button[type="submit"]').click()
    
    cy.url().should('include', '/dashboard')
    cy.get('.welcome-message').should('contain', 'Welcome back')
  })

  it('should show error with invalid credentials', () => {
    cy.get('input[name="email"]').type('invalid@example.com')
    cy.get('input[name="password"]').type('wrongpassword')
    cy.get('button[type="submit"]').click()
    
    cy.get('.error-message')
      .should('be.visible')
      .and('contain', 'Invalid credentials')
  })
})
```

### Working with Fixtures

Create test data in `cypress/fixtures/user.json`:

```json
{
  "email": "test@example.com",
  "password": "SecurePass123",
  "name": "Test User"
}
```

Use it in tests:

```javascript
describe('User Registration', () => {
  beforeEach(() => {
    cy.fixture('user').as('userData')
  })

  it('should register a new user', function() {
    cy.visit('/register')
    cy.get('input[name="email"]').type(this.userData.email)
    cy.get('input[name="password"]').type(this.userData.password)
    cy.get('input[name="name"]').type(this.userData.name)
    cy.get('button[type="submit"]').click()
    
    cy.url().should('include', '/welcome')
  })
})
```

### Custom Commands

Define reusable commands in `cypress/support/commands.js`:

```javascript
// Custom login command
Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login')
  cy.get('input[name="email"]').type(email)
  cy.get('input[name="password"]').type(password)
  cy.get('button[type="submit"]').click()
})

// Custom command to seed database
Cypress.Commands.add('seedDatabase', () => {
  cy.request('POST', '/api/seed', { reset: true })
})

// Custom command to check accessibility
Cypress.Commands.add('checkA11y', () => {
  cy.injectAxe()
  cy.checkA11y()
})
```

Use custom commands:

```javascript
describe('Dashboard', () => {
  beforeEach(() => {
    cy.login('user@example.com', 'password123')
    cy.visit('/dashboard')
  })

  it('should display user dashboard', () => {
    cy.get('.dashboard-header').should('be.visible')
  })
})
```

---

## Best Practices

### 1. Selecting Elements

#### Use Data Attributes
```javascript
// ✅ Best - dedicated test attribute
cy.get('[data-cy="submit-button"]').click()

// ❌ Avoid - fragile selectors
cy.get('.btn.btn-primary.submit').click()
cy.get('button:nth-child(3)').click()
```

#### Add data-cy attributes to your HTML:
```html
<button data-cy="submit-button" class="btn btn-primary">
  Submit
</button>
```

### 2. Don't Use cy.wait() with Static Time

```javascript
// ❌ Avoid
cy.wait(1000)
cy.get('.loaded').should('be.visible')

// ✅ Better - wait for specific condition
cy.get('.loaded', { timeout: 10000 }).should('be.visible')

// ✅ Best - wait for network request
cy.intercept('GET', '/api/data').as('getData')
cy.wait('@getData')
```

### 3. Keep Tests Independent

```javascript
// ❌ Bad - tests depend on each other
it('creates a user', () => {
  cy.visit('/users/new')
  // create user
})

it('edits the user', () => {
  // assumes previous test ran
  cy.visit('/users/1/edit')
})

// ✅ Good - each test is independent
it('creates a user', () => {
  cy.visit('/users/new')
  // create user
})

it('edits a user', () => {
  cy.seedDatabase() // Set up data
  cy.visit('/users/1/edit')
})
```

### 4. Use beforeEach for Common Setup

```javascript
describe('Todo App', () => {
  beforeEach(() => {
    cy.visit('/todos')
    cy.seedDatabase()
    cy.login('user@example.com', 'password')
  })

  it('should add a todo', () => {
    // Test implementation
  })

  it('should complete a todo', () => {
    // Test implementation
  })
})
```

### 5. Organize Tests Logically

```javascript
describe('E-commerce Checkout', () => {
  context('When cart is empty', () => {
    it('should show empty cart message', () => {})
  })

  context('When cart has items', () => {
    beforeEach(() => {
      cy.addItemToCart()
    })

    it('should proceed to checkout', () => {})
    it('should apply discount code', () => {})
  })
})
```

---

## Advanced Features

### Network Stubbing & Interception

#### Stubbing API Responses

```javascript
describe('API Stubbing', () => {
  it('should stub user API', () => {
    cy.intercept('GET', '/api/users', {
      statusCode: 200,
      body: [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' }
      ]
    }).as('getUsers')

    cy.visit('/users')
    cy.wait('@getUsers')
    cy.get('.user-list').should('contain', 'John Doe')
  })
})
```

#### Modifying Requests

```javascript
cy.intercept('POST', '/api/users', (req) => {
  req.body.timestamp = Date.now()
  req.continue()
})
```

#### Testing Error States

```javascript
it('should handle server errors', () => {
  cy.intercept('GET', '/api/data', {
    statusCode: 500,
    body: { error: 'Internal Server Error' }
  }).as('getDataError')

  cy.visit('/dashboard')
  cy.wait('@getDataError')
  cy.get('.error-message').should('be.visible')
})
```

### File Upload

```javascript
it('should upload a file', () => {
  cy.get('input[type="file"]').selectFile('cypress/fixtures/example.pdf')
  cy.get('.file-name').should('contain', 'example.pdf')
})

// Upload multiple files
cy.get('input[type="file"]').selectFile([
  'cypress/fixtures/file1.jpg',
  'cypress/fixtures/file2.jpg'
])
```

### Handling Iframes

```javascript
// Custom command for iframe
Cypress.Commands.add('getIframe', (iframe) => {
  return cy.get(iframe)
    .its('0.contentDocument.body')
    .should('not.be.empty')
    .then(cy.wrap)
})

// Usage
cy.getIframe('#my-iframe')
  .find('.element-in-iframe')
  .click()
```

### Visual Testing

Install cypress-image-snapshot:

```bash
npm install --save-dev @cypress/snapshot
```

```javascript
describe('Visual Regression', () => {
  it('should match homepage snapshot', () => {
    cy.visit('/')
    cy.matchImageSnapshot('homepage')
  })
})
```

### Component Testing

Test React components in isolation:

```javascript
import TodoList from '../../src/components/TodoList'

describe('TodoList Component', () => {
  it('should render todos', () => {
    const todos = [
      { id: 1, text: 'Buy milk', completed: false },
      { id: 2, text: 'Learn Cypress', completed: true }
    ]

    cy.mount(<TodoList todos={todos} />)
    cy.get('.todo-item').should('have.length', 2)
    cy.contains('Learn Cypress').should('have.class', 'completed')
  })
})
```

### Accessibility Testing

Install cypress-axe:

```bash
npm install --save-dev cypress-axe axe-core
```

```javascript
import 'cypress-axe'

describe('Accessibility', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.injectAxe()
  })

  it('should have no a11y violations', () => {
    cy.checkA11y()
  })

  it('should check specific element', () => {
    cy.checkA11y('.main-content')
  })
})
```

---

## CI/CD Integration

### GitHub Actions

```yaml
name: Cypress Tests

on: [push, pull_request]

jobs:
  cypress-run:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: 20

      - name: Install dependencies
        run: npm ci

      - name: Cypress run
        uses: cypress-io/github-action@v6
        with:
          start: npm start
          wait-on: 'http://localhost:3000'

      - name: Upload screenshots
        uses: actions/upload-artifact@v3
        if: failure()
        with:
          name: cypress-screenshots
          path: cypress/screenshots

      - name: Upload videos
        uses: actions/upload-artifact@v3
        if: always()
        with:
          name: cypress-videos
          path: cypress/videos
```

### GitLab CI

```yaml
cypress:
  image: cypress/browsers:latest
  stage: test
  script:
    - npm ci
    - npm start & npx wait-on http://localhost:3000
    - npx cypress run --browser chrome
  artifacts:
    when: always
    paths:
      - cypress/videos/**/*.mp4
      - cypress/screenshots/**/*.png
    expire_in: 1 day
```

### Jenkins

```groovy
pipeline {
  agent any
  
  stages {
    stage('Install') {
      steps {
        sh 'npm ci'
      }
    }
    
    stage('Test') {
      steps {
        sh 'npm start &'
        sh 'npx wait-on http://localhost:3000'
        sh 'npx cypress run'
      }
    }
  }
  
  post {
    always {
      archiveArtifacts artifacts: 'cypress/videos/**/*.mp4', allowEmptyArchive: true
      archiveArtifacts artifacts: 'cypress/screenshots/**/*.png', allowEmptyArchive: true
    }
  }
}
```

### Parallel Testing

Run tests in parallel using Cypress Dashboard or CI parallelization:

```yaml
# GitHub Actions - Parallel
strategy:
  matrix:
    containers: [1, 2, 3, 4]
steps:
  - name: Cypress run
    uses: cypress-io/github-action@v6
    with:
      record: true
      parallel: true
      group: 'E2E Tests'
    env:
      CYPRESS_RECORD_KEY: ${{ secrets.CYPRESS_RECORD_KEY }}
```

---

## Comparison with Other Tools

| Feature | Cypress | Selenium | Playwright | Puppeteer |
|---------|---------|----------|------------|-----------|
| **Architecture** | Runs in browser | WebDriver protocol | Browser automation | Chrome DevTools |
| **Speed** | Fast | Slower | Fast | Fast |
| **Setup** | Easy | Complex | Moderate | Easy |
| **Cross-browser** | Chrome, Firefox, Edge | All browsers | Chromium, Firefox, WebKit | Chrome/Chromium only |
| **Debugging** | Excellent | Limited | Good | Good |
| **Network Control** | Built-in | External tools | Built-in | Built-in |
| **Auto-waiting** | Yes | No | Yes | Limited |
| **Mobile Testing** | Via viewport | Via Appium | Limited | Limited |
| **Component Testing** | Yes | No | Yes (experimental) | No |

---

## Real-World Examples

### E-Commerce Checkout Flow

```javascript
describe('Checkout Process', () => {
  beforeEach(() => {
    cy.seedDatabase()
    cy.login('customer@example.com', 'password123')
  })

  it('should complete full purchase flow', () => {
    // Add items to cart
    cy.visit('/products')
    cy.get('[data-cy="product-1"]').find('[data-cy="add-to-cart"]').click()
    cy.get('[data-cy="product-3"]').find('[data-cy="add-to-cart"]').click()
    
    // View cart
    cy.get('[data-cy="cart-icon"]').click()
    cy.get('[data-cy="cart-items"]').should('have.length', 2)
    
    // Proceed to checkout
    cy.get('[data-cy="checkout-button"]').click()
    
    // Fill shipping information
    cy.get('[data-cy="shipping-address"]').type('123 Main St')
    cy.get('[data-cy="shipping-city"]').type('New York')
    cy.get('[data-cy="shipping-zip"]').type('10001')
    
    // Fill payment information
    cy.get('[data-cy="card-number"]').type('4242424242424242')
    cy.get('[data-cy="card-expiry"]').type('12/25')
    cy.get('[data-cy="card-cvc"]').type('123')
    
    // Submit order
    cy.intercept('POST', '/api/orders').as('createOrder')
    cy.get('[data-cy="place-order"]').click()
    cy.wait('@createOrder')
    
    // Verify success
    cy.url().should('include', '/order-confirmation')
    cy.get('[data-cy="order-number"]').should('exist')
  })

  it('should apply discount code', () => {
    cy.visit('/cart')
    cy.get('[data-cy="discount-input"]').type('SAVE20')
    cy.get('[data-cy="apply-discount"]').click()
    
    cy.get('[data-cy="discount-amount"]')
      .should('be.visible')
      .and('contain', '-$20.00')
  })
})
```

### Form Validation Testing

```javascript
describe('Registration Form', () => {
  beforeEach(() => {
    cy.visit('/register')
  })

  it('should validate email format', () => {
    cy.get('[data-cy="email"]').type('invalid-email')
    cy.get('[data-cy="submit"]').click()
    
    cy.get('[data-cy="email-error"]')
      .should('be.visible')
      .and('contain', 'Please enter a valid email')
  })

  it('should validate password strength', () => {
    cy.get('[data-cy="password"]').type('weak')
    
    cy.get('[data-cy="password-strength"]')
      .should('have.class', 'weak')
      .and('contain', 'Password too weak')
  })

  it('should match password confirmation', () => {
    cy.get('[data-cy="password"]').type('SecurePass123!')
    cy.get('[data-cy="password-confirm"]').type('DifferentPass123!')
    cy.get('[data-cy="submit"]').click()
    
    cy.get('[data-cy="password-confirm-error"]')
      .should('contain', 'Passwords do not match')
  })
})
```

### Dashboard Analytics Testing

```javascript
describe('Analytics Dashboard', () => {
  beforeEach(() => {
    cy.login('admin@example.com', 'admin123')
    cy.visit('/dashboard')
  })

  it('should display correct metrics', () => {
    cy.intercept('GET', '/api/metrics', {
      fixture: 'metrics.json'
    }).as('getMetrics')

    cy.wait('@getMetrics')
    
    cy.get('[data-cy="total-users"]').should('contain', '1,234')
    cy.get('[data-cy="revenue"]').should('contain', '$56,789')
    cy.get('[data-cy="conversion-rate"]').should('contain', '3.2%')
  })

  it('should filter data by date range', () => {
    cy.get('[data-cy="date-picker"]').click()
    cy.get('[data-cy="date-range-last-30-days"]').click()
    
    cy.intercept('GET', '/api/metrics?range=30d').as('getFilteredMetrics')
    cy.wait('@getFilteredMetrics')
    
    cy.get('[data-cy="chart"]').should('be.visible')
  })

  it('should export data to CSV', () => {
    cy.get('[data-cy="export-csv"]').click()
    
    const downloadsFolder = Cypress.config('downloadsFolder')
    cy.readFile(`${downloadsFolder}/analytics-export.csv`)
      .should('exist')
      .and('include', 'Date,Users,Revenue')
  })
})
```

---

## Resources

### Official Documentation
- [Cypress Documentation](https://docs.cypress.io/)
- [Cypress API Reference](https://docs.cypress.io/api/table-of-contents)
- [Cypress Examples](https://github.com/cypress-io/cypress-example-recipes)

### Plugins & Extensions
- [cypress-axe](https://github.com/component-driven/cypress-axe) - Accessibility testing
- [cypress-testing-library](https://testing-library.com/docs/cypress-testing-library/intro/) - DOM testing utilities
- [cypress-file-upload](https://github.com/abramenal/cypress-file-upload) - File upload support
- [cypress-real-events](https://github.com/dmtrKovalenko/cypress-real-events) - Real browser events
- [cypress-plugin-snapshots](https://github.com/meinaart/cypress-plugin-snapshots) - Visual regression testing

### Learning Resources
- [Cypress Real World App](https://github.com/cypress-io/cypress-realworld-app) - Full-stack example app
- [Cypress Testing Workshop](https://github.com/cypress-io/testing-workshop-cypress)
- [Test Automation University - Cypress Course](https://testautomationu.applitools.com/cypress-tutorial/)

### Community
- [Cypress Discord](https://discord.com/invite/cypress)
- [Cypress GitHub Discussions](https://github.com/cypress-io/cypress/discussions)
- [Stack Overflow - Cypress Tag](https://stackoverflow.com/questions/tagged/cypress)

### Best Practice Guides
- [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [Cypress Recipes](https://docs.cypress.io/examples/recipes)
- [Anti-patterns to Avoid](https://docs.cypress.io/guides/references/best-practices#Anti-patterns)

---

**Last Updated**: January 2026  
**Cypress Version**: 13.x
