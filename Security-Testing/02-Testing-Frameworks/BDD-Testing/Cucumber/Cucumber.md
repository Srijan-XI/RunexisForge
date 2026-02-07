# Cucumber

## Introduction

### What is Cucumber?

Cucumber is a software tool that supports Behavior-Driven Development (BDD). It allows you to write tests in a natural language called Gherkin that can be read by non-technical stakeholders. Cucumber executes these tests against your application to verify that it behaves as expected.

### Why Cucumber?

- Human-readable test scenarios
- Bridges communication gap between technical and non-technical team members
- Living documentation
- Supports multiple programming languages
- Facilitates BDD practices
- Executable specifications
- Promotes collaboration
- Reusable step definitions
- Great reporting features
- Large ecosystem

### Key Features

- **Gherkin syntax**: Plain English test scenarios
- **Step definitions**: Code that executes test steps
- **Hooks**: Setup and teardown code
- **Data tables**: Structured test data
- **Scenario outlines**: Data-driven testing
- **Tags**: Organize and filter scenarios
- **Background**: Common setup steps
- **Multiple languages**: Ruby, Java, JavaScript, Python, and more

## Prerequisites

- Basic understanding of BDD
- Knowledge of Gherkin syntax
- Programming language proficiency (Ruby, JavaScript, Java, etc.)
- Test automation experience

## Installation

### Cucumber for Ruby

```bash
# Using Bundler
echo 'gem "cucumber"' >> Gemfile
bundle install

# Or install directly
gem install cucumber

# Initialize Cucumber
cucumber --init
```

Creates:
```
features/
  step_definitions/
  support/
    env.rb
```

### Cucumber for JavaScript

```bash
# Using npm
npm install --save-dev @cucumber/cucumber

# Using yarn
yarn add --dev @cucumber/cucumber

# Create directories
mkdir -p features/step_definitions features/support
```

### Cucumber for Java

```xml
<!-- pom.xml -->
<dependency>
    <groupId>io.cucumber</groupId>
    <artifactId>cucumber-java</artifactId>
    <version>7.14.0</version>
    <scope>test</scope>
</dependency>
<dependency>
    <groupId>io.cucumber</groupId>
    <artifactId>cucumber-junit</artifactId>
    <version>7.14.0</version>
    <scope>test</scope>
</dependency>
```

## Gherkin Basics

### Feature File Structure

```gherkin
# features/login.feature
Feature: User Login
  As a user
  I want to log in to the application
  So that I can access my account

  Scenario: Successful login
    Given I am on the login page
    When I enter valid credentials
    And I click the login button
    Then I should be redirected to the dashboard
    And I should see a welcome message
```

### Given-When-Then

```gherkin
Feature: Shopping Cart

  Scenario: Add item to cart
    Given I am logged in
    And I am on the products page
    When I click "Add to Cart" for "Laptop"
    Then the cart should contain 1 item
    And the cart total should be "$999.99"
```

### Scenario Outline

```gherkin
Feature: Calculator

  Scenario Outline: Add two numbers
    Given I have entered <first> into the calculator
    And I have entered <second> into the calculator
    When I press add
    Then the result should be <result> on the screen

    Examples:
      | first | second | result |
      | 1     | 2      | 3      |
      | 5     | 7      | 12     |
      | 10    | 15     | 25     |
```

### Background

```gherkin
Feature: User Profile

  Background:
    Given I am logged in as "alice@example.com"
    And I am on the profile page

  Scenario: Update email
    When I change my email to "newalice@example.com"
    And I click "Save"
    Then I should see "Profile updated successfully"

  Scenario: Update password
    When I change my password
    And I click "Save"
    Then I should see "Password updated successfully"
```

### Data Tables

```gherkin
Feature: User Registration

  Scenario: Register new user
    Given I am on the registration page
    When I fill in the following:
      | Field         | Value                |
      | Name          | Alice Johnson        |
      | Email         | alice@example.com    |
      | Password      | SecurePass123        |
      | Confirm Pass  | SecurePass123        |
    And I click "Register"
    Then I should see "Registration successful"
```

### Doc Strings

```gherkin
Feature: Email Notification

  Scenario: Send welcome email
    Given a new user "alice@example.com"
    When the welcome email is sent
    Then the email should contain:
      """
      Welcome to our platform!
      
      Thank you for registering.
      
      Best regards,
      The Team
      """
```

### Tags

```gherkin
@smoke @critical
Feature: Login

  @slow
  Scenario: Login with valid credentials
    Given I am on the login page
    When I enter valid credentials
    Then I should be logged in

  @integration
  Scenario: Login with invalid credentials
    Given I am on the login page
    When I enter invalid credentials
    Then I should see an error message
```

## Step Definitions (Ruby)

### Basic Steps

```ruby
# features/step_definitions/login_steps.rb
Given('I am on the login page') do
  visit '/login'
end

When('I enter valid credentials') do
  fill_in 'email', with: 'alice@example.com'
  fill_in 'password', with: 'password123'
end

When('I click the login button') do
  click_button 'Login'
end

Then('I should be redirected to the dashboard') do
  expect(current_path).to eq('/dashboard')
end

Then('I should see a welcome message') do
  expect(page).to have_content('Welcome')
end
```

### With Parameters

```ruby
# features/step_definitions/calculator_steps.rb
Given('I have entered {int} into the calculator') do |number|
  @calculator ||= Calculator.new
  @calculator.enter(number)
end

When('I press add') do
  @result = @calculator.add
end

Then('the result should be {int} on the screen') do |expected|
  expect(@result).to eq(expected)
end
```

### With String Capture

```ruby
When('I click {string} for {string}') do |button, product|
  within(".product[data-name='#{product}']") do
    click_button button
  end
end

Then('the cart should contain {int} item(s)') do |count|
  expect(@cart.items.count).to eq(count)
end
```

### With Data Tables

```ruby
When('I fill in the following:') do |table|
  table.rows_hash.each do |field, value|
    fill_in field, with: value
  end
end

# Alternative: table with headers
Given('the following users exist:') do |table|
  table.hashes.each do |row|
    User.create!(
      name: row['Name'],
      email: row['Email'],
      role: row['Role']
    )
  end
end
```

### With Doc Strings

```ruby
Then('the email should contain:') do |expected_content|
  email = ActionMailer::Base.deliveries.last
  expect(email.body.to_s).to include(expected_content)
end
```

## Step Definitions (JavaScript)

### Using @cucumber/cucumber

```javascript
// features/step_definitions/login.steps.js
const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('chai');

Given('I am on the login page', async function() {
  await this.page.goto('http://localhost:3000/login');
});

When('I enter valid credentials', async function() {
  await this.page.fill('#email', 'alice@example.com');
  await this.page.fill('#password', 'password123');
});

When('I click the login button', async function() {
  await this.page.click('button[type="submit"]');
});

Then('I should be redirected to the dashboard', async function() {
  await this.page.waitForURL('**/dashboard');
  expect(this.page.url()).to.include('/dashboard');
});
```

### With Parameters

```javascript
const { Given, When, Then } = require('@cucumber/cucumber');

Given('I have entered {int} into the calculator', function(number) {
  this.calculator = this.calculator || new Calculator();
  this.calculator.enter(number);
});

When('I press add', function() {
  this.result = this.calculator.add();
});

Then('the result should be {int} on the screen', function(expected) {
  expect(this.result).to.equal(expected);
});
```

### With Data Tables

```javascript
When('I fill in the following:', async function(dataTable) {
  const data = dataTable.rowsHash();
  
  for (const [field, value] of Object.entries(data)) {
    await this.page.fill(`[name="${field}"]`, value);
  }
});

// With headers
Given('the following users exist:', function(dataTable) {
  const users = dataTable.hashes();
  
  users.forEach(user => {
    this.database.createUser({
      name: user.Name,
      email: user.Email,
      role: user.Role
    });
  });
});
```

## Step Definitions (Java)

### Basic Steps

```java
// src/test/java/steps/LoginSteps.java
package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import static org.junit.Assert.*;

public class LoginSteps {
    private LoginPage loginPage;
    private Dashboard dashboard;
    
    @Given("I am on the login page")
    public void i_am_on_the_login_page() {
        loginPage = new LoginPage();
        loginPage.navigate();
    }
    
    @When("I enter valid credentials")
    public void i_enter_valid_credentials() {
        loginPage.enterEmail("alice@example.com");
        loginPage.enterPassword("password123");
    }
    
    @When("I click the login button")
    public void i_click_the_login_button() {
        dashboard = loginPage.clickLogin();
    }
    
    @Then("I should be redirected to the dashboard")
    public void i_should_be_redirected_to_the_dashboard() {
        assertTrue(dashboard.isDisplayed());
    }
}
```

### With Parameters

```java
@Given("I have entered {int} into the calculator")
public void i_have_entered_into_calculator(Integer number) {
    if (calculator == null) {
        calculator = new Calculator();
    }
    calculator.enter(number);
}

@When("I press add")
public void i_press_add() {
    result = calculator.add();
}

@Then("the result should be {int} on the screen")
public void result_should_be(Integer expected) {
    assertEquals(expected, result);
}
```

### With Data Tables

```java
@When("I fill in the following:")
public void i_fill_in_the_following(Map<String, String> data) {
    data.forEach((field, value) -> {
        page.fillField(field, value);
    });
}

@Given("the following users exist:")
public void the_following_users_exist(List<Map<String, String>> users) {
    users.forEach(user -> {
        database.createUser(
            user.get("Name"),
            user.get("Email"),
            user.get("Role")
        );
    });
}
```

## Hooks

### Before and After (Ruby)

```ruby
# features/support/hooks.rb
Before do
  @browser = Selenium::WebDriver.for :chrome
  @database = DatabaseHelper.new
  @database.clean
end

After do |scenario|
  if scenario.failed?
    screenshot = @browser.screenshot_as(:png)
    attach screenshot, 'image/png'
  end
  @browser.quit
end

Before('@slow') do
  @timeout = 30
end

After('@database') do
  @database.rollback
end
```

### Before and After (JavaScript)

```javascript
// features/support/hooks.js
const { Before, After, BeforeAll, AfterAll } = require('@cucumber/cucumber');

BeforeAll(async function() {
  // Setup before all scenarios
});

AfterAll(async function() {
  // Cleanup after all scenarios
});

Before(async function() {
  this.page = await this.browser.newPage();
});

After(async function(scenario) {
  if (scenario.result.status === 'FAILED') {
    const screenshot = await this.page.screenshot();
    this.attach(screenshot, 'image/png');
  }
  await this.page.close();
});

Before({ tags: '@slow' }, function() {
  this.timeout = 30000;
});
```

### Before and After (Java)

```java
// src/test/java/hooks/Hooks.java
package hooks;

import io.cucumber.java.Before;
import io.cucumber.java.After;
import io.cucumber.java.Scenario;

public class Hooks {
    private WebDriver driver;
    private Database database;
    
    @Before
    public void setUp() {
        driver = new ChromeDriver();
        database = new Database();
        database.clean();
    }
    
    @After
    public void tearDown(Scenario scenario) {
        if (scenario.isFailed()) {
            byte[] screenshot = ((TakesScreenshot) driver)
                .getScreenshotAs(OutputType.BYTES);
            scenario.attach(screenshot, "image/png", "Screenshot");
        }
        driver.quit();
    }
    
    @Before("@slow")
    public void setSlowTimeout() {
        driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
    }
}
```

## Configuration

### cucumber.yml (Ruby)

```yaml
default: --publish-quiet --format pretty --strict-undefined
html: --format html --out reports/cucumber.html
ci: --format json --out reports/cucumber.json --format junit --out reports/junit
```

### cucumber.js (JavaScript)

```javascript
// cucumber.js
module.exports = {
  default: {
    require: ['features/step_definitions/**/*.js', 'features/support/**/*.js'],
    format: ['progress', 'html:reports/cucumber.html'],
    publishQuiet: true
  },
  ci: {
    format: ['json:reports/cucumber.json', 'junit:reports/junit.xml'],
    parallel: 2
  }
};
```

### cucumber.properties (Java)

```properties
# cucumber.properties
cucumber.plugin=pretty,html:target/cucumber-reports.html,json:target/cucumber.json
cucumber.glue=steps,hooks
cucumber.features=src/test/resources/features
cucumber.filter.tags=not @skip
```

## Running Tests

### Ruby

```bash
# Run all features
cucumber

# Run specific feature
cucumber features/login.feature

# Run specific scenario
cucumber features/login.feature:10

# Run with tags
cucumber --tags @smoke
cucumber --tags "not @slow"
cucumber --tags "@smoke and @critical"

# Generate HTML report
cucumber --format html --out report.html

# Parallel execution
cucumber --parallel 4
```

### JavaScript

```bash
# Run all features
npx cucumber-js

# Run specific feature
npx cucumber-js features/login.feature

# Run with tags
npx cucumber-js --tags "@smoke"

# Parallel execution
npx cucumber-js --parallel 2

# With custom profile
npx cucumber-js --profile ci
```

### Java (with JUnit)

```java
// src/test/java/runners/TestRunner.java
package runners;

import org.junit.runner.RunWith;
import io.cucumber.junit.Cucumber;
import io.cucumber.junit.CucumberOptions;

@RunWith(Cucumber.class)
@CucumberOptions(
    features = "src/test/resources/features",
    glue = {"steps", "hooks"},
    plugin = {"pretty", "html:target/cucumber-reports.html"},
    tags = "@smoke"
)
public class TestRunner {
}
```

Run with Maven:
```bash
mvn test
```

## Best Practices

### Write Declarative Scenarios

**Good:**
```gherkin
Scenario: User logs in
  Given I am a registered user
  When I log in with valid credentials
  Then I should see my dashboard
```

**Bad:**
```gherkin
Scenario: User logs in
  Given I navigate to "http://example.com/login"
  And I enter "alice@example.com" in the "email" field
  And I enter "password123" in the "password" field
  When I click the "Login" button
  Then the URL should be "http://example.com/dashboard"
```

### Keep Steps Reusable

```ruby
# Good - Reusable
Given('I am logged in as {string}') do |email|
  login_as(email)
end

# Bad - Too specific
Given('I am logged in as alice@example.com with password123') do
  # ...
end
```

### Use Background for Common Setup

```gherkin
Feature: User Settings

  Background:
    Given I am logged in
    And I am on the settings page

  Scenario: Change email
    # ...

  Scenario: Change password
    # ...
```

### Organize Step Definitions

```
features/
  step_definitions/
    authentication_steps.rb
    user_steps.rb
    product_steps.rb
  support/
    env.rb
    hooks.rb
    helpers/
      database_helper.rb
      api_helper.rb
```

## Example: Complete Feature

### Feature File

```gherkin
# features/user_management.feature
@user_management
Feature: User Management
  As an administrator
  I want to manage users
  So that I can control access to the system

  Background:
    Given I am logged in as an administrator
    And I am on the users page

  @smoke
  Scenario: Create new user
    When I click "New User"
    And I fill in the following:
      | Field    | Value                |
      | Name     | Bob Smith            |
      | Email    | bob@example.com      |
      | Role     | Editor               |
    And I click "Create"
    Then I should see "User created successfully"
    And "bob@example.com" should be in the users list

  Scenario: Delete user
    Given the following users exist:
      | Name        | Email               | Role   |
      | Alice Jones | alice@example.com   | Editor |
    When I delete user "alice@example.com"
    And I confirm the deletion
    Then I should see "User deleted successfully"
    And "alice@example.com" should not be in the users list

  @integration
  Scenario Outline: User validation
    When I try to create a user with <field> as "<value>"
    Then I should see error "<error>"

    Examples:
      | field    | value           | error                    |
      | Email    |                 | Email is required        |
      | Email    | invalid         | Email is invalid         |
      | Name     |                 | Name is required         |
```

### Step Definitions

```ruby
# features/step_definitions/user_management_steps.rb
Given('I am logged in as an administrator') do
  @user = create_admin_user
  login_as(@user)
end

Given('I am on the users page') do
  visit '/admin/users'
end

When('I click {string}') do |button|
  click_button button
end

When('I fill in the following:') do |table|
  table.rows_hash.each do |field, value|
    fill_in field, with: value
  end
end

Then('I should see {string}') do |message|
  expect(page).to have_content(message)
end

Then('{string} should be in the users list') do |email|
  expect(page).to have_css('.user-list', text: email)
end

Given('the following users exist:') do |table|
  table.hashes.each do |row|
    User.create!(
      name: row['Name'],
      email: row['Email'],
      role: row['Role']
    )
  end
end

When('I delete user {string}') do |email|
  within(".user[data-email='#{email}']") do
    click_link 'Delete'
  end
end

When('I confirm the deletion') do
  click_button 'Confirm'
end
```

## Resources

- [Cucumber Documentation](https://cucumber.io/docs)
- [Gherkin Reference](https://cucumber.io/docs/gherkin/reference/)
- [Cucumber School](https://school.cucumber.io/)
- [Cucumber Community](https://cucumber.io/community)

## Next Steps

- Install Cucumber
- Write first feature
- Create step definitions
- Use scenario outlines
- Add hooks
- Organize features
- Generate reports
- CI/CD integration
- Advanced patterns
- Team collaboration
