# Playwright - Modern Cross-Browser Testing Framework

## Table of Contents
- [Introduction](#introduction)
- [Why Playwright?](#why-playwright)
- [Installation & Setup](#installation--setup)
- [Core Concepts](#core-concepts)
- [Writing Tests](#writing-tests)
- [Browser Automation](#browser-automation)
- [Best Practices](#best-practices)
- [Advanced Features](#advanced-features)
- [CI/CD Integration](#cicd-integration)
- [Comparison with Other Tools](#comparison-with-other-tools)
- [Real-World Examples](#real-world-examples)
- [Resources](#resources)

---

## Introduction

Playwright is a powerful open-source automation framework developed by Microsoft that enables reliable end-to-end testing across all modern browsers. It provides a unified API to automate Chromium, Firefox, and WebKit browsers, making it an excellent choice for cross-browser testing.

### Key Features
- **Cross-Browser Support**: Test on Chromium, Firefox, and WebKit with a single API
- **Auto-Wait**: Playwright waits for elements to be actionable before performing actions
- **Web-First Assertions**: Built-in assertions designed for the dynamic web
- **Network Interception**: Full control over network traffic
- **Trace Viewer**: Visual debugging tool with timeline and snapshots
- **Multiple Language Support**: JavaScript/TypeScript, Python, Java, .NET
- **Mobile Emulation**: Test mobile web experiences
- **Codegen**: Generate tests by recording your actions
- **Parallel Execution**: Run tests in parallel across multiple browsers
- **Headless & Headed Modes**: Run tests with or without UI

---

## Why Playwright?

### Advantages Over Traditional Testing Tools

1. **True Cross-Browser Testing**
   - Single API works across all browsers
   - Includes WebKit (Safari) support
   - Tests run the same way on all browsers
   - No browser-specific workarounds needed

2. **Modern Web Support**
   - Handles Shadow DOM and Web Components
   - Supports modern JavaScript frameworks
   - Auto-waits for elements to be ready
   - Handles dynamic content naturally

3. **Powerful Debugging**
   - Trace viewer with timeline visualization
   - Video recording of test execution
   - Screenshot on failure
   - Inspector for step-by-step debugging

4. **Developer Experience**
   - TypeScript support out of the box
   - Excellent documentation
   - Code generation tool (Codegen)
   - VS Code extension

5. **Reliability**
   - Auto-retry on flaky assertions
   - Smart waiting mechanisms
   - Network control and stubbing
   - Isolated browser contexts

---

## Installation & Setup

### Prerequisites
- Node.js 18+ (for JavaScript/TypeScript)
- npm, yarn, or pnpm package manager

### Installing Playwright

#### Via npm
```bash
npm init playwright@latest
```

This interactive installer will:
- Create test examples
- Install Playwright browsers
- Set up configuration file
- Create GitHub Actions workflow (optional)

#### Manual Installation
```bash
npm install --save-dev @playwright/test
npx playwright install
```

#### Install Specific Browsers
```bash
# Install all browsers
npx playwright install

# Install specific browser
npx playwright install chromium
npx playwright install firefox
npx playwright install webkit

# Install with dependencies (Linux)
npx playwright install --with-deps
```

### Project Structure

```
your-project/
├── tests/                    # Test files
│   ├── example.spec.ts
│   └── login.spec.ts
├── test-results/            # Test results and artifacts
├── playwright-report/       # HTML test reports
├── playwright.config.ts     # Configuration file
└── package.json
```

### Basic Configuration

Create or edit `playwright.config.ts`:

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  
  // Run tests in files in parallel
  fullyParallel: true,
  
  // Fail the build on CI if you accidentally left test.only
  forbidOnly: !!process.env.CI,
  
  // Retry on CI only
  retries: process.env.CI ? 2 : 0,
  
  // Opt out of parallel tests on CI
  workers: process.env.CI ? 1 : undefined,
  
  // Reporter to use
  reporter: [
    ['html'],
    ['list'],
    ['json', { outputFile: 'test-results/results.json' }]
  ],
  
  use: {
    // Base URL to use in actions like `await page.goto('/')`
    baseURL: 'http://localhost:3000',
    
    // Collect trace when retrying the failed test
    trace: 'on-first-retry',
    
    // Screenshot on failure
    screenshot: 'only-on-failure',
    
    // Video on failure
    video: 'retain-on-failure',
    
    // Maximum time for page.goto()
    navigationTimeout: 30000,
  },

  // Configure projects for major browsers
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],

  // Run local dev server before starting tests
  webServer: {
    command: 'npm run start',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

---

## Core Concepts

### Test Structure

Playwright uses a familiar testing structure:

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    // Runs before each test
    await page.goto('/');
  });

  test('should do something', async ({ page }) => {
    // Test implementation
  });

  test('should do something else', async ({ page }) => {
    // Another test
  });
});
```

### Page Object Model

Recommended pattern for organizing tests:

```typescript
// pages/LoginPage.ts
import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('input[name="email"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.submitButton = page.locator('button[type="submit"]');
  }

  async goto() {
    await this.page.goto('/login');
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
```

Using the Page Object:

```typescript
import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';

test('user can login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('user@example.com', 'password123');
  
  await expect(page).toHaveURL('/dashboard');
});
```

### Fixtures

Playwright provides built-in fixtures and allows custom ones:

```typescript
import { test as base } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';

// Extend base test with custom fixtures
type MyFixtures = {
  loginPage: LoginPage;
  authenticatedPage: Page;
};

export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  authenticatedPage: async ({ page }, use) => {
    // Auto-login before each test
    await page.goto('/login');
    await page.fill('[name="email"]', 'user@example.com');
    await page.fill('[name="password"]', 'password123');
    await page.click('button[type="submit"]');
    await use(page);
  },
});

export { expect } from '@playwright/test';
```

---

## Writing Tests

### Basic Test Example

```typescript
import { test, expect } from '@playwright/test';

test('homepage has correct title', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  
  // Expect a title "to contain" a substring
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  
  // Click the get started link
  await page.getByRole('link', { name: 'Get started' }).click();
  
  // Expects page to have a heading with the name of Installation
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
```

### Locators

Playwright offers multiple ways to locate elements:

```typescript
// By role (recommended)
await page.getByRole('button', { name: 'Submit' }).click();
await page.getByRole('textbox', { name: 'Email' }).fill('test@example.com');

// By label
await page.getByLabel('Email').fill('test@example.com');

// By placeholder
await page.getByPlaceholder('Enter your email').fill('test@example.com');

// By text
await page.getByText('Welcome back').click();

// By test id
await page.getByTestId('submit-button').click();

// By CSS selector
await page.locator('.submit-button').click();

// By XPath
await page.locator('xpath=//button[@type="submit"]').click();

// Chaining locators
await page.locator('.user-list')
  .locator('li')
  .filter({ hasText: 'John' })
  .click();
```

### Actions

```typescript
// Click
await page.getByRole('button').click();

// Fill input
await page.getByLabel('Email').fill('user@example.com');

// Type with delay
await page.getByLabel('Search').type('playwright', { delay: 100 });

// Select option
await page.selectOption('select#country', 'USA');

// Check/uncheck
await page.getByRole('checkbox').check();
await page.getByRole('checkbox').uncheck();

// Upload file
await page.getByLabel('Upload file').setInputFiles('path/to/file.pdf');

// Hover
await page.getByRole('button').hover();

// Double click
await page.getByRole('button').dblclick();

// Right click
await page.getByRole('button').click({ button: 'right' });

// Drag and drop
await page.locator('#source').dragTo(page.locator('#target'));
```

### Assertions

```typescript
// Page assertions
await expect(page).toHaveURL('https://example.com/dashboard');
await expect(page).toHaveTitle('Dashboard');

// Element visibility
await expect(page.getByText('Welcome')).toBeVisible();
await expect(page.getByText('Loading')).toBeHidden();

// Element state
await expect(page.getByRole('button')).toBeEnabled();
await expect(page.getByRole('button')).toBeDisabled();
await expect(page.getByRole('checkbox')).toBeChecked();

// Text content
await expect(page.getByRole('heading')).toHaveText('Dashboard');
await expect(page.locator('.error')).toContainText('Invalid email');

// Attributes
await expect(page.locator('img')).toHaveAttribute('alt', 'Logo');
await expect(page.locator('input')).toHaveValue('user@example.com');

// Count
await expect(page.getByRole('listitem')).toHaveCount(5);

// CSS
await expect(page.locator('.success')).toHaveCSS('color', 'rgb(0, 128, 0)');

// Soft assertions (continue on failure)
await expect.soft(page.locator('.header')).toHaveText('Header');
await expect.soft(page.locator('.footer')).toHaveText('Footer');
```

---

## Browser Automation

### Browser Contexts

Browser contexts are isolated environments within a browser:

```typescript
import { test, chromium } from '@playwright/test';

test('multiple contexts', async () => {
  const browser = await chromium.launch();
  
  // Create two isolated contexts
  const context1 = await browser.newContext();
  const context2 = await browser.newContext();
  
  const page1 = await context1.newPage();
  const page2 = await context2.newPage();
  
  await page1.goto('https://example.com');
  await page2.goto('https://example.com');
  
  // Cookies and storage are isolated
  await context1.close();
  await context2.close();
  await browser.close();
});
```

### Mobile Emulation

```typescript
import { test, devices } from '@playwright/test';

test('mobile test', async ({ browser }) => {
  const iPhone = devices['iPhone 12'];
  const context = await browser.newContext({
    ...iPhone,
  });
  
  const page = await context.newPage();
  await page.goto('https://example.com');
  
  // Test mobile-specific features
  await page.screenshot({ path: 'mobile-view.png' });
  
  await context.close();
});
```

### Geolocation & Permissions

```typescript
test('geolocation', async ({ browser }) => {
  const context = await browser.newContext({
    geolocation: { latitude: 40.7128, longitude: -74.0060 },
    permissions: ['geolocation'],
  });
  
  const page = await context.newPage();
  await page.goto('https://maps.google.com');
  
  await context.close();
});
```

### Network Interception

```typescript
test('intercept API calls', async ({ page }) => {
  // Intercept and modify requests
  await page.route('**/api/users', async route => {
    const response = await route.fetch();
    const json = await response.json();
    json.users.push({ id: 999, name: 'Test User' });
    await route.fulfill({ response, json });
  });
  
  await page.goto('/users');
});

test('block images', async ({ page }) => {
  // Block image requests
  await page.route('**/*.{png,jpg,jpeg}', route => route.abort());
  
  await page.goto('/');
});

test('mock API response', async ({ page }) => {
  await page.route('**/api/data', route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ data: 'mocked data' }),
    });
  });
  
  await page.goto('/dashboard');
});
```

---

## Best Practices

### 1. Use Web-First Assertions

```typescript
// ❌ Avoid manual waiting
await page.waitForTimeout(5000);
expect(await page.textContent('.status')).toBe('Success');

// ✅ Use auto-waiting assertions
await expect(page.locator('.status')).toHaveText('Success');
```

### 2. Use Proper Locators

```typescript
// ✅ Best - semantic locators
await page.getByRole('button', { name: 'Submit' }).click();
await page.getByLabel('Email').fill('test@example.com');

// ⚠️ OK - test IDs
await page.getByTestId('submit-button').click();

// ❌ Avoid - fragile CSS selectors
await page.locator('.btn.btn-primary.mt-4').click();
```

### 3. Isolate Tests

```typescript
// Each test should be independent
test.beforeEach(async ({ page }) => {
  // Set up fresh state
  await page.goto('/');
  // Clear cookies, reset database, etc.
});

test.afterEach(async ({ page }) => {
  // Clean up
});
```

### 4. Use Page Object Model

```typescript
// pages/DashboardPage.ts
export class DashboardPage {
  constructor(private page: Page) {}
  
  async goto() {
    await this.page.goto('/dashboard');
  }
  
  async getUserName() {
    return this.page.getByTestId('user-name').textContent();
  }
}
```

### 5. Organize Tests with Tags

```typescript
test('critical user flow @smoke @critical', async ({ page }) => {
  // Critical test
});

test('edge case @regression', async ({ page }) => {
  // Regression test
});
```

Run specific tags:
```bash
npx playwright test --grep @smoke
npx playwright test --grep-invert @slow
```

---

## Advanced Features

### Trace Viewer

Record traces for debugging:

```typescript
// playwright.config.ts
use: {
  trace: 'on-first-retry', // or 'on', 'off', 'retain-on-failure'
}
```

View traces:
```bash
npx playwright show-trace test-results/trace.zip
```

### Screenshots & Videos

```typescript
// Screenshot
await page.screenshot({ path: 'screenshot.png' });
await page.screenshot({ path: 'full-page.png', fullPage: true });

// Screenshot of element
await page.locator('.header').screenshot({ path: 'header.png' });

// Configure in playwright.config.ts
use: {
  screenshot: 'only-on-failure',
  video: 'retain-on-failure',
}
```

### Code Generation

Generate tests by recording actions:

```bash
npx playwright codegen https://example.com
```

### API Testing

```typescript
import { test, expect } from '@playwright/test';

test('API test', async ({ request }) => {
  // GET request
  const response = await request.get('https://api.example.com/users');
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);
  
  const users = await response.json();
  expect(users.length).toBeGreaterThan(0);
  
  // POST request
  const newUser = await request.post('https://api.example.com/users', {
    data: {
      name: 'John Doe',
      email: 'john@example.com'
    }
  });
  expect(newUser.ok()).toBeTruthy();
});
```

### Visual Regression Testing

```typescript
import { test, expect } from '@playwright/test';

test('visual comparison', async ({ page }) => {
  await page.goto('/');
  
  // Take and compare screenshot
  await expect(page).toHaveScreenshot('homepage.png', {
    maxDiffPixels: 100,
  });
});
```

### Parallel Execution

```typescript
// playwright.config.ts
export default defineConfig({
  workers: 4, // Number of parallel workers
  fullyParallel: true,
});

// Run specific number of workers
// npx playwright test --workers=4
```

### Global Setup & Teardown

```typescript
// global-setup.ts
import { chromium, FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Perform global setup (e.g., login and save state)
  await page.goto('https://example.com/login');
  await page.fill('[name="email"]', 'admin@example.com');
  await page.fill('[name="password"]', 'password');
  await page.click('button[type="submit"]');
  
  // Save signed-in state
  await page.context().storageState({ path: 'auth.json' });
  await browser.close();
}

export default globalSetup;
```

```typescript
// playwright.config.ts
export default defineConfig({
  globalSetup: require.resolve('./global-setup'),
  
  use: {
    storageState: 'auth.json', // Use saved state
  },
});
```

---

## CI/CD Integration

### GitHub Actions

```yaml
name: Playwright Tests

on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]

jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - uses: actions/setup-node@v3
      with:
        node-version: 20
    
    - name: Install dependencies
      run: npm ci
    
    - name: Install Playwright Browsers
      run: npx playwright install --with-deps
    
    - name: Run Playwright tests
      run: npx playwright test
    
    - uses: actions/upload-artifact@v3
      if: always()
      with:
        name: playwright-report
        path: playwright-report/
        retention-days: 30
```

### GitLab CI

```yaml
image: mcr.microsoft.com/playwright:v1.40.0-jammy

stages:
  - test

playwright:
  stage: test
  script:
    - npm ci
    - npx playwright test
  artifacts:
    when: always
    paths:
      - playwright-report/
      - test-results/
    expire_in: 1 week
```

### Jenkins

```groovy
pipeline {
  agent {
    docker {
      image 'mcr.microsoft.com/playwright:v1.40.0-jammy'
    }
  }
  
  stages {
    stage('Install') {
      steps {
        sh 'npm ci'
      }
    }
    
    stage('Test') {
      steps {
        sh 'npx playwright test'
      }
    }
  }
  
  post {
    always {
      publishHTML([
        reportDir: 'playwright-report',
        reportFiles: 'index.html',
        reportName: 'Playwright Test Report'
      ])
    }
  }
}
```

### Docker

```dockerfile
FROM mcr.microsoft.com/playwright:v1.40.0-jammy

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

CMD ["npx", "playwright", "test"]
```

---

## Comparison with Other Tools

| Feature | Playwright | Cypress | Selenium | Puppeteer |
|---------|-----------|---------|----------|-----------|
| **Browsers** | Chromium, Firefox, WebKit | Chrome, Firefox, Edge | All major | Chrome only |
| **Language** | JS/TS, Python, Java, .NET | JavaScript | Multiple | JavaScript |
| **Auto-wait** | Yes | Yes | No | Limited |
| **Parallel Tests** | Yes | Paid feature | Yes | Manual |
| **Mobile Emulation** | Yes | Via viewport | Via Appium | Limited |
| **API Testing** | Built-in | Via cy.request | External | Via fetch |
| **Trace Viewer** | Excellent | Time travel | No | No |
| **Shadow DOM** | Full support | Limited | Limited | Full support |
| **Speed** | Very fast | Fast | Slower | Very fast |

---

## Real-World Examples

### Complete E2E Flow

```typescript
import { test, expect } from '@playwright/test';

test.describe('E-Commerce Flow', () => {
  test('complete purchase journey', async ({ page }) => {
    // Navigate to product page
    await page.goto('/products');
    
    // Search for product
    await page.getByPlaceholder('Search products').fill('laptop');
    await page.getByRole('button', { name: 'Search' }).click();
    
    // Select first product
    await page.getByRole('link', { name: 'MacBook Pro' }).click();
    
    // Add to cart
    await page.getByRole('button', { name: 'Add to Cart' }).click();
    await expect(page.getByText('Item added to cart')).toBeVisible();
    
    // Go to cart
    await page.getByRole('link', { name: 'Cart' }).click();
    await expect(page.getByRole('heading', { name: 'Shopping Cart' })).toBeVisible();
    
    // Proceed to checkout
    await page.getByRole('button', { name: 'Checkout' }).click();
    
    // Fill shipping information
    await page.getByLabel('Full Name').fill('John Doe');
    await page.getByLabel('Address').fill('123 Main St');
    await page.getByLabel('City').fill('New York');
    await page.getByLabel('ZIP Code').fill('10001');
    
    // Continue to payment
    await page.getByRole('button', { name: 'Continue to Payment' }).click();
    
    // Fill payment information
    await page.getByLabel('Card Number').fill('4242424242424242');
    await page.getByLabel('Expiry Date').fill('12/25');
    await page.getByLabel('CVV').fill('123');
    
    // Place order
    await page.getByRole('button', { name: 'Place Order' }).click();
    
    // Verify success
    await expect(page.getByText('Order confirmed')).toBeVisible();
    await expect(page.locator('.order-number')).toBeVisible();
  });
});
```

### Multi-Tab Testing

```typescript
test('handle multiple tabs', async ({ context, page }) => {
  await page.goto('/');
  
  // Click link that opens new tab
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    page.getByRole('link', { name: 'Open in new tab' }).click()
  ]);
  
  // Work with new tab
  await newPage.waitForLoadState();
  await expect(newPage).toHaveTitle(/New Page/);
  
  // Switch back to original tab
  await page.bringToFront();
});
```

### Authentication State Reuse

```typescript
// auth.setup.ts
import { test as setup } from '@playwright/test';

setup('authenticate', async ({ page }) => {
  await page.goto('/login');
  await page.fill('[name="email"]', 'user@example.com');
  await page.fill('[name="password"]', 'password123');
  await page.click('button[type="submit"]');
  
  await page.waitForURL('/dashboard');
  await page.context().storageState({ path: 'auth.json' });
});
```

```typescript
// dashboard.spec.ts
import { test, expect } from '@playwright/test';

test.use({ storageState: 'auth.json' });

test('access dashboard', async ({ page }) => {
  await page.goto('/dashboard');
  await expect(page).toHaveURL('/dashboard');
});
```

---

## Resources

### Official Documentation
- [Playwright Documentation](https://playwright.dev/)
- [API Reference](https://playwright.dev/docs/api/class-playwright)
- [Playwright GitHub](https://github.com/microsoft/playwright)

### Tools & Plugins
- [Playwright Test VS Code Extension](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright)
- [Playwright Inspector](https://playwright.dev/docs/debug#playwright-inspector)
- [Trace Viewer](https://playwright.dev/docs/trace-viewer)

### Learning Resources
- [Playwright University](https://testautomationu.applitools.com/js-playwright-tutorial/)
- [Playwright YouTube Channel](https://www.youtube.com/@Playwrightdev)
- [Awesome Playwright](https://github.com/mxschmitt/awesome-playwright)

### Community
- [Playwright Discord](https://aka.ms/playwright/discord)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/playwright)
- [GitHub Discussions](https://github.com/microsoft/playwright/discussions)

---

**Last Updated**: January 2026  
**Playwright Version**: 1.40+
