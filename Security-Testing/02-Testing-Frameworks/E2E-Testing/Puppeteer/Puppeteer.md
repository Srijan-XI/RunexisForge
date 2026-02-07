# Puppeteer - Headless Browser Automation

## Table of Contents
- [Introduction](#introduction)
- [Why Puppeteer?](#why-puppeteer)
- [Installation & Setup](#installation--setup)
- [Core Concepts](#core-concepts)
- [Browser Automation](#browser-automation)
- [Web Scraping](#web-scraping)
- [Testing & Screenshots](#testing--screenshots)
- [Best Practices](#best-practices)
- [Advanced Features](#advanced-features)
- [Performance Optimization](#performance-optimization)
- [Comparison with Other Tools](#comparison-with-other-tools)
- [Real-World Examples](#real-world-examples)
- [Resources](#resources)

---

## Introduction

Puppeteer is a Node.js library developed by Google that provides a high-level API to control Chrome/Chromium browsers over the DevTools Protocol. It's primarily used for automated browser testing, web scraping, and generating screenshots/PDFs of web pages.

### Key Features
- **Headless by Default**: Run Chrome in headless mode (no UI)
- **Full Chrome DevTools Protocol**: Complete control over browser behavior
- **Fast & Efficient**: Optimized for performance and resource usage
- **Screenshot & PDF Generation**: Create visual artifacts of web pages
- **Network Interception**: Control and modify network requests
- **Keyboard & Mouse Simulation**: Realistic user interactions
- **Modern JavaScript**: Async/await support with clean API
- **Automatic Browser Management**: Downloads and manages Chrome/Chromium
- **Debugging Support**: Built-in debugging and tracing capabilities

---

## Why Puppeteer?

### Advantages

1. **Official Chrome Support**
   - Maintained by Chrome team at Google
   - Always up-to-date with latest Chrome features
   - Direct access to Chrome DevTools Protocol
   - Excellent documentation and examples

2. **Performance**
   - Headless mode for faster execution
   - Efficient resource utilization
   - Quick startup time
   - Optimized for CI/CD pipelines

3. **Developer Experience**
   - Clean, intuitive API
   - TypeScript definitions included
   - Comprehensive error messages
   - Active community and ecosystem

4. **Versatility**
   - Automated testing
   - Web scraping
   - PDF/screenshot generation
   - Performance analysis
   - Server-side rendering (SSR) testing

### Use Cases
- End-to-end testing
- Automated UI testing
- Web scraping and data extraction
- Generating PDFs of web pages
- Screenshot automation
- Performance monitoring
- Pre-rendering SPA content
- Testing browser extensions

---

## Installation & Setup

### Prerequisites
- Node.js 18+ (recommended)
- npm or yarn package manager

### Installing Puppeteer

#### Via npm
```bash
npm install puppeteer
```

This installs Puppeteer along with a compatible version of Chrome (~170-300MB).

#### Install Puppeteer Core (Bring Your Own Browser)
```bash
npm install puppeteer-core
```

Use this if you have Chrome/Chromium already installed.

#### Via yarn
```bash
yarn add puppeteer
```

#### Via pnpm
```bash
pnpm add puppeteer
```

### Basic Setup

```javascript
const puppeteer = require('puppeteer');

(async () => {
  // Launch browser
  const browser = await puppeteer.launch();
  
  // Create new page
  const page = await browser.newPage();
  
  // Navigate to URL
  await page.goto('https://example.com');
  
  // Do something...
  
  // Close browser
  await browser.close();
})();
```

### Configuration Options

```javascript
const browser = await puppeteer.launch({
  headless: true,              // Run in headless mode
  headless: 'new',            // Use new headless mode (recommended)
  devtools: false,             // Open DevTools panel
  slowMo: 0,                  // Slow down operations (ms)
  
  // Browser window
  defaultViewport: {
    width: 1920,
    height: 1080
  },
  
  // Arguments
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',
    '--disable-accelerated-2d-canvas',
    '--disable-gpu'
  ],
  
  // Executable path (for custom Chrome)
  executablePath: '/path/to/chrome',
  
  // User data directory
  userDataDir: './user-data',
  
  // Ignore HTTPS errors
  ignoreHTTPSErrors: true,
  
  // Timeout
  timeout: 30000
});
```

---

## Core Concepts

### Browser & Page Hierarchy

```
Browser
  └── Browser Context (isolated environment)
      └── Page (tab)
          └── Frame (iframe)
              └── Element Handle
```

### Basic Browser Operations

```javascript
const puppeteer = require('puppeteer');

(async () => {
  // Launch browser
  const browser = await puppeteer.launch({ headless: 'new' });
  
  // Get browser version
  const version = await browser.version();
  console.log('Browser version:', version);
  
  // Create new page
  const page = await browser.newPage();
  
  // Set viewport size
  await page.setViewport({ width: 1920, height: 1080 });
  
  // Navigate to URL
  await page.goto('https://example.com', {
    waitUntil: 'networkidle2', // Wait until network is idle
    timeout: 30000
  });
  
  // Get page info
  const title = await page.title();
  const url = page.url();
  console.log('Title:', title);
  console.log('URL:', url);
  
  // Close page
  await page.close();
  
  // Close browser
  await browser.close();
})();
```

### Multiple Pages

```javascript
const browser = await puppeteer.launch();

// Create multiple pages
const page1 = await browser.newPage();
const page2 = await browser.newPage();

await page1.goto('https://example.com');
await page2.goto('https://google.com');

// Get all pages
const pages = await browser.pages();
console.log('Number of pages:', pages.length);

await browser.close();
```

### Browser Contexts

Isolated browser sessions with separate cookies, cache, etc.:

```javascript
const browser = await puppeteer.launch();

// Create isolated context
const context1 = await browser.createIncognitoBrowserContext();
const context2 = await browser.createIncognitoBrowserContext();

const page1 = await context1.newPage();
const page2 = await context2.newPage();

await page1.goto('https://example.com');
await page2.goto('https://example.com');

// Contexts are completely isolated
await context1.close();
await context2.close();
await browser.close();
```

---

## Browser Automation

### Navigation

```javascript
// Go to URL
await page.goto('https://example.com');

// Go to URL with options
await page.goto('https://example.com', {
  waitUntil: 'networkidle0',  // Wait for network to be idle
  timeout: 60000              // Timeout in milliseconds
});

// Navigate back/forward
await page.goBack();
await page.goForward();

// Reload page
await page.reload();

// Wait for navigation
await page.waitForNavigation({ waitUntil: 'domcontentloaded' });
```

### Selectors & Elements

```javascript
// Wait for selector
await page.waitForSelector('.my-class');

// Click element
await page.click('button#submit');

// Type text
await page.type('input[name="email"]', 'user@example.com');

// Select option
await page.select('select#country', 'USA');

// Check/uncheck checkbox
await page.click('input[type="checkbox"]');

// Get element
const element = await page.$('.my-class');

// Get multiple elements
const elements = await page.$$('.item');

// Get text content
const text = await page.$eval('.title', el => el.textContent);

// Get attribute
const href = await page.$eval('a', el => el.getAttribute('href'));

// Check if element exists
const exists = await page.$('.my-class') !== null;
```

### Form Interactions

```javascript
// Fill form
await page.type('#username', 'john_doe');
await page.type('#password', 'secret123');
await page.click('button[type="submit"]');

// Clear input
await page.$eval('#username', el => el.value = '');

// Focus element
await page.focus('#email');

// Select dropdown
await page.select('select#role', 'admin');

// Upload file
const fileInput = await page.$('input[type="file"]');
await fileInput.uploadFile('/path/to/file.pdf');

// Submit form
await page.$eval('form', form => form.submit());
```

### Mouse & Keyboard

```javascript
// Mouse actions
await page.mouse.click(100, 200);
await page.mouse.move(300, 400);
await page.mouse.down();
await page.mouse.up();

// Hover over element
await page.hover('.menu-item');

// Keyboard actions
await page.keyboard.type('Hello World');
await page.keyboard.press('Enter');
await page.keyboard.down('Shift');
await page.keyboard.press('KeyA');
await page.keyboard.up('Shift');

// Keyboard shortcuts
await page.keyboard.down('Control');
await page.keyboard.press('KeyA');
await page.keyboard.up('Control');
```

### Waiting Strategies

```javascript
// Wait for selector
await page.waitForSelector('.loaded');

// Wait for XPath
await page.waitForXPath('//div[@class="content"]');

// Wait for function
await page.waitForFunction(() => {
  return document.querySelector('.data').textContent !== 'Loading...';
});

// Wait for timeout
await page.waitForTimeout(3000);

// Wait for navigation
await Promise.all([
  page.waitForNavigation(),
  page.click('a.link')
]);

// Wait for network idle
await page.goto('https://example.com', {
  waitUntil: 'networkidle0'  // or 'networkidle2'
});
```

---

## Web Scraping

### Extracting Data

```javascript
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.goto('https://example.com/products');
  
  // Extract data from page
  const products = await page.evaluate(() => {
    const items = Array.from(document.querySelectorAll('.product'));
    
    return items.map(item => ({
      title: item.querySelector('.title')?.textContent.trim(),
      price: item.querySelector('.price')?.textContent.trim(),
      image: item.querySelector('img')?.src,
      link: item.querySelector('a')?.href
    }));
  });
  
  console.log(products);
  
  await browser.close();
})();
```

### Pagination

```javascript
async function scrapeAllPages() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  let allData = [];
  let currentPage = 1;
  let hasNextPage = true;
  
  while (hasNextPage) {
    await page.goto(`https://example.com/products?page=${currentPage}`);
    
    // Extract data from current page
    const pageData = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('.product')).map(el => ({
        title: el.querySelector('.title').textContent
      }));
    });
    
    allData = allData.concat(pageData);
    
    // Check for next page
    hasNextPage = await page.$('.next-page') !== null;
    
    if (hasNextPage) {
      await page.click('.next-page');
      await page.waitForSelector('.product');
    }
    
    currentPage++;
  }
  
  await browser.close();
  return allData;
}
```

### Infinite Scroll

```javascript
async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 100;
      
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        
        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
}

// Usage
await page.goto('https://example.com/feed');
await autoScroll(page);
const data = await page.evaluate(() => {
  // Extract data after all content is loaded
});
```

---

## Testing & Screenshots

### Screenshots

```javascript
// Full page screenshot
await page.screenshot({ path: 'screenshot.png', fullPage: true });

// Viewport screenshot
await page.screenshot({ path: 'viewport.png' });

// Element screenshot
const element = await page.$('.header');
await element.screenshot({ path: 'header.png' });

// Screenshot as buffer
const buffer = await page.screenshot();

// Custom options
await page.screenshot({
  path: 'custom.png',
  type: 'png',              // 'png' or 'jpeg'
  quality: 90,              // 0-100 (jpeg only)
  fullPage: true,
  clip: {                   // Capture specific area
    x: 0,
    y: 0,
    width: 500,
    height: 500
  },
  omitBackground: true      // Transparent background
});
```

### PDF Generation

```javascript
// Generate PDF
await page.pdf({ path: 'page.pdf' });

// Custom options
await page.pdf({
  path: 'page.pdf',
  format: 'A4',
  printBackground: true,
  margin: {
    top: '20px',
    right: '20px',
    bottom: '20px',
    left: '20px'
  },
  displayHeaderFooter: true,
  headerTemplate: '<div style="font-size:10px">Header</div>',
  footerTemplate: '<div style="font-size:10px">Page <span class="pageNumber"></span></div>'
});
```

### Automated Testing

```javascript
const assert = require('assert');

describe('Login Test', () => {
  let browser, page;
  
  before(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });
  
  after(async () => {
    await browser.close();
  });
  
  it('should login successfully', async () => {
    await page.goto('https://example.com/login');
    
    await page.type('#email', 'user@example.com');
    await page.type('#password', 'password123');
    await page.click('button[type="submit"]');
    
    await page.waitForNavigation();
    
    const url = page.url();
    assert(url.includes('/dashboard'));
    
    const welcomeText = await page.$eval('.welcome', el => el.textContent);
    assert(welcomeText.includes('Welcome'));
  });
});
```

---

## Best Practices

### 1. Use Async/Await Properly

```javascript
// ❌ Bad - missing await
page.goto('https://example.com');
page.click('button');

// ✅ Good - proper await
await page.goto('https://example.com');
await page.click('button');
```

### 2. Handle Errors

```javascript
try {
  await page.goto('https://example.com', { timeout: 30000 });
} catch (error) {
  console.error('Navigation failed:', error);
  await page.screenshot({ path: 'error.png' });
}
```

### 3. Close Resources

```javascript
let browser;
try {
  browser = await puppeteer.launch();
  const page = await browser.newPage();
  // ... operations
} catch (error) {
  console.error(error);
} finally {
  if (browser) {
    await browser.close();
  }
}
```

### 4. Use Page Pooling for Performance

```javascript
class BrowserPool {
  constructor(size = 5) {
    this.size = size;
    this.browsers = [];
  }
  
  async init() {
    for (let i = 0; i < this.size; i++) {
      const browser = await puppeteer.launch();
      this.browsers.push(browser);
    }
  }
  
  async getBrowser() {
    return this.browsers[Math.floor(Math.random() * this.browsers.length)];
  }
  
  async close() {
    await Promise.all(this.browsers.map(b => b.close()));
  }
}
```

### 5. Use Explicit Waits

```javascript
// ❌ Bad - arbitrary timeout
await page.waitForTimeout(5000);

// ✅ Good - wait for specific condition
await page.waitForSelector('.loaded');
await page.waitForFunction(() => {
  return document.querySelector('.status').textContent === 'Ready';
});
```

---

## Advanced Features

### Network Interception

```javascript
// Intercept requests
await page.setRequestInterception(true);

page.on('request', request => {
  // Block images
  if (request.resourceType() === 'image') {
    request.abort();
  } else {
    request.continue();
  }
});

// Modify requests
page.on('request', request => {
  const headers = Object.assign({}, request.headers(), {
    'Custom-Header': 'Custom-Value'
  });
  
  request.continue({ headers });
});

// Mock responses
page.on('request', request => {
  if (request.url().includes('/api/data')) {
    request.respond({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ data: 'mocked' })
    });
  } else {
    request.continue();
  }
});
```

### Request/Response Monitoring

```javascript
page.on('request', request => {
  console.log('Request:', request.url());
});

page.on('response', response => {
  console.log('Response:', response.url(), response.status());
});

page.on('requestfailed', request => {
  console.log('Failed:', request.url(), request.failure().errorText);
});
```

### Cookies Management

```javascript
// Set cookies
await page.setCookie({
  name: 'session',
  value: 'abc123',
  domain: 'example.com',
  path: '/',
  expires: Date.now() / 1000 + 3600,
  httpOnly: true,
  secure: true
});

// Get cookies
const cookies = await page.cookies();

// Delete cookies
await page.deleteCookie({ name: 'session' });

// Clear all cookies
const allCookies = await page.cookies();
await page.deleteCookie(...allCookies);
```

### JavaScript Execution

```javascript
// Execute script
const result = await page.evaluate(() => {
  return document.title;
});

// Pass arguments
const data = await page.evaluate((selector) => {
  return document.querySelector(selector).textContent;
}, '.my-class');

// Expose functions to page
await page.exposeFunction('md5', text => {
  return crypto.createHash('md5').update(text).digest('hex');
});

await page.evaluate(async () => {
  const hash = await window.md5('Hello World');
  console.log('Hash:', hash);
});
```

### Device Emulation

```javascript
const iPhone = puppeteer.devices['iPhone 12'];

await page.emulate(iPhone);
await page.goto('https://example.com');

// Custom device
await page.emulate({
  name: 'Custom Device',
  userAgent: 'Mozilla/5.0...',
  viewport: {
    width: 375,
    height: 667,
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true
  }
});
```

### Geolocation

```javascript
// Set geolocation
await page.setGeolocation({
  latitude: 40.7128,
  longitude: -74.0060
});

// Grant permissions
const context = browser.defaultBrowserContext();
await context.overridePermissions('https://example.com', ['geolocation']);
```

### Performance Metrics

```javascript
// Enable performance tracking
await page.goto('https://example.com');

// Get metrics
const metrics = await page.metrics();
console.log('Metrics:', metrics);

// Performance timing
const performanceTiming = JSON.parse(
  await page.evaluate(() => JSON.stringify(window.performance.timing))
);

// Coverage
await page.coverage.startJSCoverage();
await page.goto('https://example.com');
const jsCoverage = await page.coverage.stopJSCoverage();

await page.coverage.startCSSCoverage();
const cssCoverage = await page.coverage.stopCSSCoverage();
```

---

## Performance Optimization

### 1. Block Unnecessary Resources

```javascript
await page.setRequestInterception(true);

page.on('request', request => {
  const resourceType = request.resourceType();
  
  if (['image', 'stylesheet', 'font'].includes(resourceType)) {
    request.abort();
  } else {
    request.continue();
  }
});
```

### 2. Disable CSS & JavaScript (for scraping)

```javascript
await page.setJavaScriptEnabled(false);

await page.goto('https://example.com');
```

### 3. Use Headless Mode

```javascript
const browser = await puppeteer.launch({
  headless: 'new',  // Faster than headed mode
  args: ['--no-sandbox', '--disable-setuid-sandbox']
});
```

### 4. Reuse Browser Instances

```javascript
// ❌ Bad - create new browser for each task
async function task1() {
  const browser = await puppeteer.launch();
  // ...
  await browser.close();
}

// ✅ Good - reuse browser
const browser = await puppeteer.launch();

async function task1() {
  const page = await browser.newPage();
  // ...
  await page.close();
}

// Close when done with all tasks
await browser.close();
```

### 5. Parallel Execution

```javascript
const puppeteer = require('puppeteer');

async function scrapePage(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  const data = await page.evaluate(() => {
    // Extract data
  });
  await browser.close();
  return data;
}

// Scrape multiple pages in parallel
const urls = ['url1', 'url2', 'url3'];
const results = await Promise.all(urls.map(url => scrapePage(url)));
```

---

## Comparison with Other Tools

| Feature | Puppeteer | Playwright | Selenium | Cypress |
|---------|-----------|------------|----------|---------|
| **Browser** | Chrome/Chromium | Chrome, Firefox, WebKit | All major | Chrome, Firefox, Edge |
| **Language** | JavaScript/Node.js | JS, Python, Java, .NET | Multiple | JavaScript |
| **Headless** | Yes (default) | Yes | Yes | No |
| **Speed** | Very fast | Very fast | Moderate | Fast |
| **API** | DevTools Protocol | DevTools Protocol | WebDriver | Custom |
| **Mobile** | Emulation only | Emulation | Appium | Limited |
| **PDF/Screenshots** | Built-in | Built-in | Manual | Limited |
| **Learning Curve** | Easy | Moderate | Moderate | Easy |

---

## Real-World Examples

### Web Scraping E-commerce

```javascript
const puppeteer = require('puppeteer');

async function scrapeProducts() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  await page.goto('https://example-shop.com/products');
  
  const products = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.product-card')).map(card => ({
      name: card.querySelector('h3')?.textContent?.trim(),
      price: card.querySelector('.price')?.textContent?.trim(),
      rating: card.querySelector('.rating')?.textContent?.trim(),
      image: card.querySelector('img')?.src,
      url: card.querySelector('a')?.href
    }));
  });
  
  console.log(`Found ${products.length} products`);
  console.log(JSON.stringify(products, null, 2));
  
  await browser.close();
  return products;
}

scrapeProducts();
```

### Automated Form Submission

```javascript
async function submitContactForm() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  
  await page.goto('https://example.com/contact');
  
  // Fill form
  await page.type('#name', 'John Doe');
  await page.type('#email', 'john@example.com');
  await page.type('#subject', 'Inquiry');
  await page.type('#message', 'This is a test message');
  
  // Accept terms
  await page.click('#terms');
  
  // Submit
  await Promise.all([
    page.waitForNavigation(),
    page.click('button[type="submit"]')
  ]);
  
  // Verify success
  const successMessage = await page.$eval('.success', el => el.textContent);
  console.log('Success:', successMessage);
  
  await browser.close();
}
```

### Generate Invoice PDFs

```javascript
async function generateInvoicePDF(invoiceData) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Load invoice template
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial; }
        .invoice { padding: 20px; }
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #ddd; padding: 8px; }
      </style>
    </head>
    <body>
      <div class="invoice">
        <h1>Invoice #${invoiceData.id}</h1>
        <p>Date: ${invoiceData.date}</p>
        <table>
          <tr><th>Item</th><th>Quantity</th><th>Price</th></tr>
          ${invoiceData.items.map(item => `
            <tr>
              <td>${item.name}</td>
              <td>${item.quantity}</td>
              <td>$${item.price}</td>
            </tr>
          `).join('')}
        </table>
        <p><strong>Total: $${invoiceData.total}</strong></p>
      </div>
    </body>
    </html>
  `;
  
  await page.setContent(html);
  
  await page.pdf({
    path: `invoice-${invoiceData.id}.pdf`,
    format: 'A4',
    printBackground: true
  });
  
  await browser.close();
}
```

---

## Resources

### Official Documentation
- [Puppeteer Documentation](https://pptr.dev/)
- [Puppeteer API Reference](https://pptr.dev/api)
- [Puppeteer GitHub](https://github.com/puppeteer/puppeteer)

### Learning Resources
- [Puppeteer Examples](https://github.com/puppeteer/examples)
- [Try Puppeteer](https://try-puppeteer.appspot.com/)
- [Awesome Puppeteer](https://github.com/transitive-bullshit/awesome-puppeteer)

### Tools & Extensions
- [puppeteer-extra](https://github.com/berstend/puppeteer-extra) - Plugin framework
- [puppeteer-cluster](https://github.com/thomasdondorf/puppeteer-cluster) - Cluster management
- [jest-puppeteer](https://github.com/smooth-code/jest-puppeteer) - Jest integration

### Community
- [Stack Overflow](https://stackoverflow.com/questions/tagged/puppeteer)
- [Puppeteer Discord](https://discord.gg/puppeteer)
- [GitHub Discussions](https://github.com/puppeteer/puppeteer/discussions)

---

**Last Updated**: January 2026  
**Puppeteer Version**: 21.x
