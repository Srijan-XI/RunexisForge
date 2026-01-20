# Selenium - Web Browser Automation Framework

## Table of Contents
- [Introduction](#introduction)
- [Why Selenium?](#why-selenium)
- [Installation & Setup](#installation--setup)
- [Core Components](#core-components)
- [Writing Tests](#writing-tests)
- [Locating Elements](#locating-elements)
- [Browser Automation](#browser-automation)
- [Best Practices](#best-practices)
- [Advanced Features](#advanced-features)
- [CI/CD Integration](#cicd-integration)
- [Comparison with Other Tools](#comparison-with-other-tools)
- [Real-World Examples](#real-world-examples)
- [Resources](#resources)

---

## Introduction

Selenium is the most widely-used open-source framework for automating web browsers. It provides a portable framework for testing web applications across different browsers and platforms. Selenium supports multiple programming languages and has become the industry standard for web automation.

### Key Features
- **Cross-Browser Support**: Chrome, Firefox, Safari, Edge, Opera, and more
- **Multi-Language Support**: Java, Python, C#, Ruby, JavaScript, Kotlin
- **Platform Independence**: Windows, macOS, Linux
- **Parallel Execution**: Run tests concurrently across multiple browsers
- **Grid Support**: Distributed test execution across multiple machines
- **Mobile Testing**: Integration with Appium for mobile automation
- **Extensive Ecosystem**: Large community and third-party tools
- **Standards-Based**: W3C WebDriver protocol

### Selenium Components
- **Selenium WebDriver**: Core API for browser automation
- **Selenium IDE**: Record and playback tool (browser extension)
- **Selenium Grid**: Parallel and distributed test execution
- **Selenium Manager**: Automatic driver management (Selenium 4.6+)

---

## Why Selenium?

### Advantages

1. **Maturity & Stability**
   - Battle-tested in production environments
   - Decades of development and refinement
   - Comprehensive documentation and resources
   - Large community support

2. **Flexibility**
   - Multiple programming languages
   - Works with any testing framework
   - Extensive customization options
   - Integration with CI/CD tools

3. **Cross-Platform & Cross-Browser**
   - Test on any OS
   - Support for all major browsers
   - Consistent API across platforms
   - Mobile testing via Appium

4. **Industry Standard**
   - Most job postings require Selenium knowledge
   - Widely adopted by enterprises
   - Proven track record
   - Extensive third-party integrations

### Use Cases
- End-to-end testing
- Regression testing
- Cross-browser compatibility testing
- Web scraping and data extraction
- Repetitive task automation
- Performance testing (with JMeter)

---

## Installation & Setup

### Prerequisites
- Java Development Kit (JDK) 8 or higher (for Java)
- Python 3.7+ (for Python)
- Node.js (for JavaScript)
- Browser drivers (automatically managed in Selenium 4.6+)

### Installation by Language

#### Java with Maven

Add to `pom.xml`:
```xml
<dependencies>
    <!-- Selenium WebDriver -->
    <dependency>
        <groupId>org.seleniumhq.selenium</groupId>
        <artifactId>selenium-java</artifactId>
        <version>4.16.0</version>
    </dependency>
    
    <!-- Testing Framework (JUnit 5) -->
    <dependency>
        <groupId>org.junit.jupiter</groupId>
        <artifactId>junit-jupiter</artifactId>
        <version>5.10.1</version>
        <scope>test</scope>
    </dependency>
    
    <!-- WebDriverManager (optional, for driver management) -->
    <dependency>
        <groupId>io.github.bonigarcia</groupId>
        <artifactId>webdrivermanager</artifactId>
        <version>5.6.2</version>
    </dependency>
</dependencies>
```

#### Java with Gradle

Add to `build.gradle`:
```gradle
dependencies {
    testImplementation 'org.seleniumhq.selenium:selenium-java:4.16.0'
    testImplementation 'org.junit.jupiter:junit-jupiter:5.10.1'
    testImplementation 'io.github.bonigarcia:webdrivermanager:5.6.2'
}
```

#### Python

```bash
pip install selenium
```

Or with requirements.txt:
```txt
selenium==4.16.0
pytest==7.4.3
pytest-selenium==4.0.1
webdriver-manager==4.0.1
```

#### JavaScript/Node.js

```bash
npm install selenium-webdriver
# or
yarn add selenium-webdriver
```

#### C# (.NET)

```bash
dotnet add package Selenium.WebDriver
dotnet add package Selenium.Support
dotnet add package DotNetSeleniumExtras.WaitHelpers
```

### Browser Drivers

Selenium 4.6+ includes Selenium Manager for automatic driver management:

```java
// No manual driver setup needed!
WebDriver driver = new ChromeDriver();
```

For manual setup or older versions:

```java
// Using WebDriverManager (recommended)
import io.github.bonigarcia.wdm.WebDriverManager;

WebDriverManager.chromedriver().setup();
WebDriver driver = new ChromeDriver();
```

---

## Core Components

### WebDriver Architecture

```
Test Script → Selenium Client Library → JSON Wire Protocol/W3C WebDriver → Browser Driver → Browser
```

### Basic WebDriver Setup

#### Java
```java
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

public class BasicTest {
    public static void main(String[] args) {
        // Configure browser options
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--start-maximized");
        
        // Initialize driver
        WebDriver driver = new ChromeDriver(options);
        
        // Navigate to URL
        driver.get("https://www.example.com");
        
        // Get page title
        String title = driver.getTitle();
        System.out.println("Page title: " + title);
        
        // Close browser
        driver.quit();
    }
}
```

#### Python
```python
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

# Configure browser options
options = Options()
options.add_argument("--start-maximized")

# Initialize driver
driver = webdriver.Chrome(options=options)

# Navigate to URL
driver.get("https://www.example.com")

# Get page title
title = driver.title
print(f"Page title: {title}")

# Close browser
driver.quit()
```

#### JavaScript
```javascript
const { Builder, Browser } = require('selenium-webdriver');

(async function example() {
    // Initialize driver
    let driver = await new Builder()
        .forBrowser(Browser.CHROME)
        .build();
    
    try {
        // Navigate to URL
        await driver.get('https://www.example.com');
        
        // Get page title
        let title = await driver.getTitle();
        console.log('Page title:', title);
    } finally {
        // Close browser
        await driver.quit();
    }
})();
```

---

## Writing Tests

### Basic Test Structure with JUnit 5 (Java)

```java
import org.junit.jupiter.api.*;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

class LoginTest {
    private WebDriver driver;
    
    @BeforeEach
    void setUp() {
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
    }
    
    @Test
    void testSuccessfulLogin() {
        driver.get("https://example.com/login");
        
        WebElement emailInput = driver.findElement(By.id("email"));
        WebElement passwordInput = driver.findElement(By.id("password"));
        WebElement submitButton = driver.findElement(By.cssSelector("button[type='submit']"));
        
        emailInput.sendKeys("user@example.com");
        passwordInput.sendKeys("password123");
        submitButton.click();
        
        // Assertions
        String currentUrl = driver.getCurrentUrl();
        assertTrue(currentUrl.contains("/dashboard"));
        
        WebElement welcomeMsg = driver.findElement(By.className("welcome-message"));
        assertEquals("Welcome back!", welcomeMsg.getText());
    }
    
    @AfterEach
    void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
```

### Basic Test with pytest (Python)

```python
import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class TestLogin:
    @pytest.fixture
    def driver(self):
        driver = webdriver.Chrome()
        driver.maximize_window()
        driver.implicitly_wait(10)
        yield driver
        driver.quit()
    
    def test_successful_login(self, driver):
        driver.get("https://example.com/login")
        
        email_input = driver.find_element(By.ID, "email")
        password_input = driver.find_element(By.ID, "password")
        submit_button = driver.find_element(By.CSS_SELECTOR, "button[type='submit']")
        
        email_input.send_keys("user@example.com")
        password_input.send_keys("password123")
        submit_button.click()
        
        # Wait for redirect
        WebDriverWait(driver, 10).until(
            EC.url_contains("/dashboard")
        )
        
        # Assertions
        assert "/dashboard" in driver.current_url
        
        welcome_msg = driver.find_element(By.CLASS_NAME, "welcome-message")
        assert welcome_msg.text == "Welcome back!"
```

---

## Locating Elements

### Locator Strategies

#### By ID (Most Reliable)
```java
WebElement element = driver.findElement(By.id("username"));
```

#### By Name
```java
WebElement element = driver.findElement(By.name("email"));
```

#### By Class Name
```java
WebElement element = driver.findElement(By.className("submit-button"));
```

#### By Tag Name
```java
WebElement element = driver.findElement(By.tagName("button"));
```

#### By Link Text
```java
WebElement element = driver.findElement(By.linkText("Click Here"));
```

#### By Partial Link Text
```java
WebElement element = driver.findElement(By.partialLinkText("Click"));
```

#### By CSS Selector (Flexible)
```java
// ID
WebElement element = driver.findElement(By.cssSelector("#username"));

// Class
WebElement element = driver.findElement(By.cssSelector(".submit-button"));

// Attribute
WebElement element = driver.findElement(By.cssSelector("input[name='email']"));

// Nested
WebElement element = driver.findElement(By.cssSelector("div.container > form > input"));

// Multiple classes
WebElement element = driver.findElement(By.cssSelector("button.btn.btn-primary"));
```

#### By XPath (Most Powerful)
```java
// Absolute path (avoid)
WebElement element = driver.findElement(By.xpath("/html/body/div/form/input"));

// Relative path (preferred)
WebElement element = driver.findElement(By.xpath("//input[@name='email']"));

// Text content
WebElement element = driver.findElement(By.xpath("//button[text()='Submit']"));

// Contains
WebElement element = driver.findElement(By.xpath("//button[contains(text(), 'Submit')]"));

// Multiple attributes
WebElement element = driver.findElement(By.xpath("//input[@type='text' and @name='email']"));

// Parent/child relationships
WebElement element = driver.findElement(By.xpath("//div[@class='form']//input[@type='submit']"));

// Following sibling
WebElement element = driver.findElement(By.xpath("//label[text()='Email']/following-sibling::input"));
```

### Finding Multiple Elements

```java
// Find all matching elements
List<WebElement> buttons = driver.findElements(By.tagName("button"));

// Iterate through elements
for (WebElement button : buttons) {
    System.out.println(button.getText());
}
```

### Chaining Locators

```java
WebElement form = driver.findElement(By.id("login-form"));
WebElement emailInput = form.findElement(By.name("email"));
```

---

## Browser Automation

### Navigation

```java
// Navigate to URL
driver.get("https://example.com");

// Navigate forward/backward
driver.navigate().back();
driver.navigate().forward();
driver.navigate().refresh();

// Navigate to URL (alternative)
driver.navigate().to("https://example.com");
```

### Browser Information

```java
// Get current URL
String url = driver.getCurrentUrl();

// Get page title
String title = driver.getTitle();

// Get page source
String source = driver.getPageSource();
```

### Window Management

```java
// Maximize window
driver.manage().window().maximize();

// Full screen
driver.manage().window().fullscreen();

// Set size
driver.manage().window().setSize(new Dimension(1920, 1080));

// Set position
driver.manage().window().setPosition(new Point(0, 0));

// Get window handle
String mainWindow = driver.getWindowHandle();

// Get all window handles
Set<String> allWindows = driver.getWindowHandles();
```

### Handling Multiple Windows/Tabs

```java
// Store original window
String originalWindow = driver.getWindowHandle();

// Click element that opens new window
driver.findElement(By.linkText("Open New Window")).click();

// Wait for new window
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
wait.until(ExpectedConditions.numberOfWindowsToBe(2));

// Switch to new window
for (String windowHandle : driver.getWindowHandles()) {
    if (!windowHandle.equals(originalWindow)) {
        driver.switchTo().window(windowHandle);
        break;
    }
}

// Work with new window
System.out.println(driver.getTitle());

// Close new window and switch back
driver.close();
driver.switchTo().window(originalWindow);
```

### Frames and IFrames

```java
// Switch to frame by index
driver.switchTo().frame(0);

// Switch to frame by name or ID
driver.switchTo().frame("frameName");

// Switch to frame by WebElement
WebElement iframe = driver.findElement(By.id("myFrame"));
driver.switchTo().frame(iframe);

// Switch back to main content
driver.switchTo().defaultContent();

// Switch to parent frame
driver.switchTo().parentFrame();
```

### Alerts and Popups

```java
// Accept alert
Alert alert = driver.switchTo().alert();
alert.accept();

// Dismiss alert
alert.dismiss();

// Get alert text
String alertText = alert.getText();

// Send text to alert (prompt)
alert.sendKeys("Input text");
```

### Cookies

```java
// Add cookie
Cookie cookie = new Cookie("key", "value");
driver.manage().addCookie(cookie);

// Get all cookies
Set<Cookie> cookies = driver.manage().getCookies();

// Get specific cookie
Cookie specificCookie = driver.manage().getCookieNamed("key");

// Delete cookie
driver.manage().deleteCookieNamed("key");

// Delete all cookies
driver.manage().deleteAllCookies();
```

---

## Best Practices

### 1. Use Explicit Waits

```java
// ❌ Bad - implicit wait or sleep
Thread.sleep(5000);

// ✅ Good - explicit wait
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
WebElement element = wait.until(
    ExpectedConditions.visibilityOfElementLocated(By.id("myElement"))
);
```

### 2. Page Object Model (POM)

```java
// LoginPage.java
public class LoginPage {
    private WebDriver driver;
    
    // Locators
    private By emailInput = By.id("email");
    private By passwordInput = By.id("password");
    private By submitButton = By.cssSelector("button[type='submit']");
    
    public LoginPage(WebDriver driver) {
        this.driver = driver;
    }
    
    public void enterEmail(String email) {
        driver.findElement(emailInput).sendKeys(email);
    }
    
    public void enterPassword(String password) {
        driver.findElement(passwordInput).sendKeys(password);
    }
    
    public void clickSubmit() {
        driver.findElement(submitButton).click();
    }
    
    public void login(String email, String password) {
        enterEmail(email);
        enterPassword(password);
        clickSubmit();
    }
}

// Test using POM
@Test
void testLogin() {
    driver.get("https://example.com/login");
    
    LoginPage loginPage = new LoginPage(driver);
    loginPage.login("user@example.com", "password123");
    
    assertTrue(driver.getCurrentUrl().contains("/dashboard"));
}
```

### 3. Use Page Factory Pattern

```java
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

public class LoginPage {
    private WebDriver driver;
    
    @FindBy(id = "email")
    private WebElement emailInput;
    
    @FindBy(id = "password")
    private WebElement passwordInput;
    
    @FindBy(css = "button[type='submit']")
    private WebElement submitButton;
    
    public LoginPage(WebDriver driver) {
        this.driver = driver;
        PageFactory.initElements(driver, this);
    }
    
    public void login(String email, String password) {
        emailInput.sendKeys(email);
        passwordInput.sendKeys(password);
        submitButton.click();
    }
}
```

### 4. Handle StaleElementReferenceException

```java
// Retry mechanism
public WebElement findElementWithRetry(By locator, int maxAttempts) {
    WebElement element = null;
    int attempts = 0;
    
    while (attempts < maxAttempts) {
        try {
            element = driver.findElement(locator);
            return element;
        } catch (StaleElementReferenceException e) {
            attempts++;
        }
    }
    throw new RuntimeException("Element not found after " + maxAttempts + " attempts");
}
```

### 5. Take Screenshots on Failure

```java
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.OutputType;
import org.apache.commons.io.FileUtils;

public void takeScreenshot(String fileName) {
    TakesScreenshot ts = (TakesScreenshot) driver;
    File source = ts.getScreenshotAs(OutputType.FILE);
    File destination = new File("screenshots/" + fileName + ".png");
    
    try {
        FileUtils.copyFile(source, destination);
    } catch (IOException e) {
        e.printStackTrace();
    }
}

@AfterEach
void tearDown(TestInfo testInfo) {
    if (testInfo.getTestClass().isPresent()) {
        takeScreenshot(testInfo.getDisplayName());
    }
    driver.quit();
}
```

---

## Advanced Features

### Waits

#### Implicit Wait
```java
driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
```

#### Explicit Wait
```java
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

// Wait for element to be visible
wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("element")));

// Wait for element to be clickable
wait.until(ExpectedConditions.elementToBeClickable(By.id("button")));

// Wait for text to be present
wait.until(ExpectedConditions.textToBePresentInElementLocated(By.id("status"), "Success"));

// Wait for URL to contain
wait.until(ExpectedConditions.urlContains("/dashboard"));

// Wait for title
wait.until(ExpectedConditions.titleIs("Dashboard"));
```

#### Fluent Wait
```java
Wait<WebDriver> wait = new FluentWait<>(driver)
    .withTimeout(Duration.ofSeconds(30))
    .pollingEvery(Duration.ofSeconds(2))
    .ignoring(NoSuchElementException.class);

WebElement element = wait.until(driver -> driver.findElement(By.id("element")));
```

### Actions Class

```java
import org.openqa.selenium.interactions.Actions;

Actions actions = new Actions(driver);

// Hover
WebElement element = driver.findElement(By.id("menu"));
actions.moveToElement(element).perform();

// Double click
actions.doubleClick(element).perform();

// Right click
actions.contextClick(element).perform();

// Drag and drop
WebElement source = driver.findElement(By.id("source"));
WebElement target = driver.findElement(By.id("target"));
actions.dragAndDrop(source, target).perform();

// Key combinations
actions.keyDown(Keys.CONTROL).sendKeys("a").keyUp(Keys.CONTROL).perform();

// Complex chain
actions
    .moveToElement(element)
    .click()
    .sendKeys("text")
    .perform();
```

### JavaScript Execution

```java
import org.openqa.selenium.JavascriptExecutor;

JavascriptExecutor js = (JavascriptExecutor) driver;

// Execute JavaScript
js.executeScript("alert('Hello World');");

// Scroll to element
WebElement element = driver.findElement(By.id("footer"));
js.executeScript("arguments[0].scrollIntoView(true);", element);

// Click element (bypass interception)
js.executeScript("arguments[0].click();", element);

// Get value
String title = (String) js.executeScript("return document.title;");

// Change element attribute
js.executeScript("arguments[0].setAttribute('value', 'New Value')", element);
```

### File Upload

```java
// Simple file upload
WebElement uploadElement = driver.findElement(By.id("file-upload"));
uploadElement.sendKeys("/path/to/file.txt");

// Upload button click
driver.findElement(By.id("upload-button")).click();
```

### Select Dropdown

```java
import org.openqa.selenium.support.ui.Select;

WebElement dropdown = driver.findElement(By.id("country"));
Select select = new Select(dropdown);

// Select by visible text
select.selectByVisibleText("United States");

// Select by value
select.selectByValue("us");

// Select by index
select.selectByIndex(1);

// Get all options
List<WebElement> options = select.getOptions();

// Deselect (multi-select only)
select.deselectAll();
select.deselectByVisibleText("Option 1");
```

### Headless Mode

```java
ChromeOptions options = new ChromeOptions();
options.addArguments("--headless=new");
options.addArguments("--disable-gpu");
WebDriver driver = new ChromeDriver(options);
```

---

## CI/CD Integration

### Jenkins Pipeline

```groovy
pipeline {
    agent any
    
    tools {
        maven 'Maven 3.9.0'
        jdk 'JDK 17'
    }
    
    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/your-repo/selenium-tests.git'
            }
        }
        
        stage('Build') {
            steps {
                sh 'mvn clean compile'
            }
        }
        
        stage('Run Tests') {
            steps {
                sh 'mvn test'
            }
        }
    }
    
    post {
        always {
            junit '**/target/surefire-reports/*.xml'
            publishHTML([
                reportDir: 'target/surefire-reports',
                reportFiles: 'index.html',
                reportName: 'Test Report'
            ])
        }
    }
}
```

### GitHub Actions

```yaml
name: Selenium Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up JDK
      uses: actions/setup-java@v3
      with:
        java-version: '17'
        distribution: 'temurin'
    
    - name: Install Chrome
      run: |
        sudo apt-get update
        sudo apt-get install -y google-chrome-stable
    
    - name: Run tests
      run: mvn test
    
    - name: Upload test results
      if: always()
      uses: actions/upload-artifact@v3
      with:
        name: test-results
        path: target/surefire-reports/
```

### Docker

```dockerfile
FROM maven:3.9-eclipse-temurin-17

# Install Chrome
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list \
    && apt-get update \
    && apt-get install -y google-chrome-stable

WORKDIR /app

COPY pom.xml .
RUN mvn dependency:go-offline

COPY src ./src

CMD ["mvn", "test"]
```

---

## Comparison with Other Tools

| Feature | Selenium | Cypress | Playwright | Puppeteer |
|---------|----------|---------|------------|-----------|
| **Browser Support** | All major | Chrome, Firefox, Edge | Chromium, Firefox, WebKit | Chrome only |
| **Languages** | Java, Python, C#, JS, Ruby | JavaScript | JS, Python, Java, .NET | JavaScript |
| **Learning Curve** | Moderate | Easy | Moderate | Easy |
| **Speed** | Moderate | Fast | Fast | Fast |
| **Mobile Testing** | Via Appium | Limited | Limited | No |
| **Community** | Very Large | Large | Growing | Moderate |
| **Maturity** | Very High | Moderate | Moderate | Moderate |
| **Grid Support** | Built-in | Cloud only | Experimental | Manual |

---

## Real-World Examples

### Complete Login Flow

```java
@Test
void testCompleteLoginFlow() {
    driver.get("https://example.com");
    
    // Navigate to login
    driver.findElement(By.linkText("Sign In")).click();
    
    // Wait for login page
    WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("email")));
    
    // Enter credentials
    driver.findElement(By.id("email")).sendKeys("user@example.com");
    driver.findElement(By.id("password")).sendKeys("password123");
    
    // Remember me checkbox
    WebElement rememberMe = driver.findElement(By.id("remember-me"));
    if (!rememberMe.isSelected()) {
        rememberMe.click();
    }
    
    // Submit form
    driver.findElement(By.cssSelector("button[type='submit']")).click();
    
    // Wait for dashboard
    wait.until(ExpectedConditions.urlContains("/dashboard"));
    
    // Verify login success
    WebElement userMenu = driver.findElement(By.className("user-menu"));
    assertTrue(userMenu.isDisplayed());
    
    String welcomeText = driver.findElement(By.className("welcome-message")).getText();
    assertTrue(welcomeText.contains("Welcome"));
}
```

### Data-Driven Testing

```java
@ParameterizedTest
@CsvSource({
    "user1@example.com, password1",
    "user2@example.com, password2",
    "user3@example.com, password3"
})
void testLoginWithMultipleUsers(String email, String password) {
    driver.get("https://example.com/login");
    
    driver.findElement(By.id("email")).sendKeys(email);
    driver.findElement(By.id("password")).sendKeys(password);
    driver.findElement(By.cssSelector("button[type='submit']")).click();
    
    WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    wait.until(ExpectedConditions.urlContains("/dashboard"));
    
    assertTrue(driver.getCurrentUrl().contains("/dashboard"));
}
```

### Handling Dynamic Content

```java
@Test
void testDynamicContent() {
    driver.get("https://example.com/dynamic");
    
    // Click button that loads content
    driver.findElement(By.id("load-data")).click();
    
    // Wait for content to appear
    WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    WebElement dynamicContent = wait.until(
        ExpectedConditions.presenceOfElementLocated(By.id("dynamic-content"))
    );
    
    // Verify content
    assertNotNull(dynamicContent.getText());
    assertTrue(dynamicContent.isDisplayed());
}
```

---

## Resources

### Official Documentation
- [Selenium Documentation](https://www.selenium.dev/documentation/)
- [Selenium API (Java)](https://www.selenium.dev/selenium/docs/api/java/)
- [Selenium GitHub](https://github.com/SeleniumHQ/selenium)

### Learning Resources
- [Selenium with Java](https://www.selenium.dev/documentation/webdriver/)
- [Test Automation University](https://testautomationu.applitools.com/)
- [Selenium Easy Tutorials](https://www.seleniumeasy.com/)

### Tools & Frameworks
- [Selenide](https://selenide.org/) - Selenium wrapper for easier testing
- [Selenium Grid](https://www.selenium.dev/documentation/grid/) - Distributed testing
- [Appium](http://appium.io/) - Mobile automation
- [WebDriverManager](https://github.com/bonigarcia/webdrivermanager) - Driver management

### Community
- [Selenium Slack](https://www.selenium.dev/support/)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/selenium)
- [Selenium Users Group](https://groups.google.com/g/selenium-users)

---

**Last Updated**: January 2026  
**Selenium Version**: 4.16+
