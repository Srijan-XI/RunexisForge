# RSpec

## Introduction

### What is RSpec?

RSpec is a behavior-driven development (BDD) testing framework for Ruby. It provides a domain-specific language (DSL) that allows developers to write human-readable tests that describe the behavior of code. RSpec is the most popular testing framework in the Ruby community and is known for its expressive syntax and powerful features.

### Why RSpec?

- Expressive and readable syntax
- BDD-focused approach
- Rich matcher library
- Powerful mocking and stubbing
- Test doubles and spies
- Metadata and filtering
- Shared examples and contexts
- Built-in formatters
- Extensive ecosystem
- Great documentation

### Key Features

- **Descriptive syntax**: `describe`, `context`, `it`
- **Matchers**: Readable expectations
- **Hooks**: `before`, `after`, `around`
- **Mocking**: Test doubles and method stubbing
- **Shared examples**: DRY test code
- **Metadata**: Tag and filter tests
- **Custom matchers**: Extend the DSL
- **Formatters**: Multiple output formats

## Prerequisites

- Ruby 2.7+
- Bundler
- Basic Ruby knowledge
- Understanding of BDD principles

## Installation

### Using Bundler

```bash
# Create Gemfile
bundle init

# Add RSpec to Gemfile
echo 'gem "rspec"' >> Gemfile

# Install
bundle install

# Initialize RSpec
rspec --init
```

### Manual Installation

```bash
gem install rspec
rspec --init
```

This creates:
```
.rspec
spec/
  spec_helper.rb
```

## Basic Usage

### Simple Spec

```ruby
# spec/calculator_spec.rb
require 'rspec'

class Calculator
  def add(a, b)
    a + b
  end
  
  def subtract(a, b)
    a - b
  end
end

RSpec.describe Calculator do
  describe '#add' do
    it 'adds two numbers' do
      calculator = Calculator.new
      result = calculator.add(2, 3)
      expect(result).to eq(5)
    end
    
    it 'handles negative numbers' do
      calculator = Calculator.new
      expect(calculator.add(-1, 1)).to eq(0)
    end
  end
  
  describe '#subtract' do
    it 'subtracts two numbers' do
      calculator = Calculator.new
      expect(calculator.subtract(5, 3)).to eq(2)
    end
  end
end
```

Run specs:

```bash
# Run all specs
rspec

# Run specific file
rspec spec/calculator_spec.rb

# Run specific line
rspec spec/calculator_spec.rb:10

# Verbose output
rspec --format documentation
```

### Subject and Let

```ruby
RSpec.describe Calculator do
  subject(:calculator) { Calculator.new }
  
  let(:a) { 5 }
  let(:b) { 3 }
  
  describe '#add' do
    it 'adds two numbers' do
      expect(calculator.add(a, b)).to eq(8)
    end
  end
  
  describe '#subtract' do
    it 'subtracts two numbers' do
      expect(calculator.subtract(a, b)).to eq(2)
    end
  end
end
```

## Matchers

### Equality Matchers

```ruby
RSpec.describe 'Equality matchers' do
  it 'tests equality' do
    expect(1 + 1).to eq(2)              # ==
    expect([1, 2]).to eq([1, 2])
    
    expect(1 + 1).to eql(2)             # eql?
    expect('hello').to eql('hello')
    
    x = 'hello'
    y = x
    expect(x).to equal(y)                # equal? (same object)
    expect(x).to be(y)                   # Alias for equal
  end
end
```

### Comparison Matchers

```ruby
RSpec.describe 'Comparison matchers' do
  it 'compares values' do
    expect(10).to be > 5
    expect(10).to be >= 10
    expect(5).to be < 10
    expect(5).to be <= 5
    
    expect(10).to be_between(5, 15).inclusive
    expect(10).to be_between(5, 15).exclusive
  end
end
```

### Type/Class Matchers

```ruby
RSpec.describe 'Type matchers' do
  it 'checks types' do
    expect('hello').to be_a(String)
    expect('hello').to be_an_instance_of(String)
    expect(5).to be_a(Integer)
    expect(5).to be_kind_of(Numeric)
    
    expect([]).to respond_to(:each)
    expect('hello').to respond_to(:upcase)
  end
end
```

### Truthiness Matchers

```ruby
RSpec.describe 'Truthiness matchers' do
  it 'checks truthiness' do
    expect(true).to be true
    expect(false).to be false
    
    expect('hello').to be_truthy
    expect(nil).to be_falsey
    expect(nil).to be_nil
    
    expect(5).to be_positive
    expect(-5).to be_negative
    expect(0).to be_zero
  end
end
```

### Collection Matchers

```ruby
RSpec.describe 'Collection matchers' do
  let(:array) { [1, 2, 3, 4, 5] }
  
  it 'tests collections' do
    expect(array).to include(3)
    expect(array).to include(2, 4)
    
    expect(array).to contain_exactly(5, 4, 3, 2, 1)  # Order doesn't matter
    expect(array).to match_array([5, 4, 3, 2, 1])
    
    expect(array).to start_with(1, 2)
    expect(array).to end_with(4, 5)
    
    expect(array).to all(be_a(Integer))
    expect(array).to all(be > 0)
  end
  
  it 'tests empty collections' do
    expect([]).to be_empty
    expect({}).to be_empty
    expect('').to be_empty
  end
end
```

### String Matchers

```ruby
RSpec.describe 'String matchers' do
  let(:string) { 'Hello, World!' }
  
  it 'tests strings' do
    expect(string).to match(/Hello/)
    expect(string).to start_with('Hello')
    expect(string).to end_with('!')
    expect(string).to include('World')
  end
end
```

### Error Matchers

```ruby
RSpec.describe 'Error matchers' do
  it 'tests exceptions' do
    expect { raise StandardError }.to raise_error
    expect { raise StandardError, 'Error!' }.to raise_error('Error!')
    expect { raise ArgumentError }.to raise_error(ArgumentError)
    expect { raise ArgumentError, 'Bad arg' }.to raise_error(ArgumentError, /Bad/)
    
    expect { 1 + 1 }.not_to raise_error
  end
end
```

## Hooks

### before and after

```ruby
RSpec.describe 'Hooks' do
  before(:each) do
    puts 'Running before each example'
    @value = 0
  end
  
  after(:each) do
    puts 'Running after each example'
  end
  
  it 'example 1' do
    @value += 1
    expect(@value).to eq(1)
  end
  
  it 'example 2' do
    @value += 2
    expect(@value).to eq(2)
  end
end
```

### Context-level Hooks

```ruby
RSpec.describe 'Context hooks' do
  before(:context) do
    puts 'Running before all examples in context'
    @shared_resource = 'initialized'
  end
  
  after(:context) do
    puts 'Running after all examples in context'
  end
  
  it 'accesses shared resource' do
    expect(@shared_resource).to eq('initialized')
  end
end
```

### around Hooks

```ruby
RSpec.describe 'Around hooks' do
  around(:each) do |example|
    puts 'Before example'
    example.run
    puts 'After example'
  end
  
  it 'runs with around hook' do
    expect(1 + 1).to eq(2)
  end
end
```

## Let and Subject

### let

```ruby
RSpec.describe 'Let' do
  let(:user) { { name: 'Alice', age: 30 } }
  let(:admin) { { name: 'Bob', role: 'admin' } }
  
  it 'creates memoized values' do
    expect(user[:name]).to eq('Alice')
    expect(admin[:role]).to eq('admin')
  end
  
  # let! is evaluated immediately
  let!(:count) do
    puts 'Calculating count'
    5
  end
  
  it 'evaluates let! before example' do
    expect(count).to eq(5)
  end
end
```

### subject

```ruby
class User
  attr_accessor :name, :email
  
  def initialize(name, email)
    @name = name
    @email = email
  end
  
  def valid?
    !name.empty? && !email.empty?
  end
end

RSpec.describe User do
  subject(:user) { User.new('Alice', 'alice@example.com') }
  
  it { is_expected.to be_valid }
  
  describe '#name' do
    it 'returns the name' do
      expect(subject.name).to eq('Alice')
    end
  end
  
  context 'with missing email' do
    subject { User.new('Bob', '') }
    
    it { is_expected.not_to be_valid }
  end
end
```

## Contexts and Descriptions

```ruby
RSpec.describe User do
  describe '#valid?' do
    context 'with valid attributes' do
      let(:user) { User.new('Alice', 'alice@example.com') }
      
      it 'returns true' do
        expect(user).to be_valid
      end
    end
    
    context 'with missing name' do
      let(:user) { User.new('', 'alice@example.com') }
      
      it 'returns false' do
        expect(user).not_to be_valid
      end
    end
    
    context 'with missing email' do
      let(:user) { User.new('Alice', '') }
      
      it 'returns false' do
        expect(user).not_to be_valid
      end
    end
  end
end
```

## Mocking and Stubbing

### Test Doubles

```ruby
RSpec.describe 'Test doubles' do
  it 'creates a double' do
    user = double('User')
    allow(user).to receive(:name).and_return('Alice')
    
    expect(user.name).to eq('Alice')
  end
  
  it 'creates a double with hash' do
    user = double('User', name: 'Bob', email: 'bob@example.com')
    
    expect(user.name).to eq('Bob')
    expect(user.email).to eq('bob@example.com')
  end
end
```

### Method Stubbing

```ruby
class EmailService
  def send_email(to, message)
    # Actually send email
  end
end

RSpec.describe 'Method stubbing' do
  let(:service) { EmailService.new }
  
  it 'stubs a method' do
    allow(service).to receive(:send_email).and_return(true)
    
    result = service.send_email('alice@example.com', 'Hello')
    expect(result).to be true
  end
  
  it 'stubs with arguments' do
    allow(service).to receive(:send_email)
      .with('alice@example.com', 'Hello')
      .and_return(true)
    
    expect(service.send_email('alice@example.com', 'Hello')).to be true
  end
  
  it 'stubs multiple return values' do
    allow(service).to receive(:send_email)
      .and_return(true, false, true)
    
    expect(service.send_email('', '')).to be true
    expect(service.send_email('', '')).to be false
    expect(service.send_email('', '')).to be true
  end
end
```

### Message Expectations

```ruby
RSpec.describe 'Message expectations' do
  let(:service) { EmailService.new }
  
  it 'expects method to be called' do
    expect(service).to receive(:send_email)
    service.send_email('alice@example.com', 'Hello')
  end
  
  it 'expects method with arguments' do
    expect(service).to receive(:send_email)
      .with('alice@example.com', 'Hello')
    
    service.send_email('alice@example.com', 'Hello')
  end
  
  it 'expects method called multiple times' do
    expect(service).to receive(:send_email).twice
    
    service.send_email('alice@example.com', 'Hello')
    service.send_email('bob@example.com', 'Hi')
  end
  
  it 'expects no call' do
    expect(service).not_to receive(:send_email)
  end
end
```

### Spies

```ruby
RSpec.describe 'Spies' do
  let(:service) { spy('EmailService') }
  
  it 'verifies calls after the fact' do
    service.send_email('alice@example.com', 'Hello')
    service.send_email('bob@example.com', 'Hi')
    
    expect(service).to have_received(:send_email).twice
    expect(service).to have_received(:send_email)
      .with('alice@example.com', 'Hello')
  end
end
```

## Shared Examples

```ruby
RSpec.shared_examples 'a collection' do
  it 'is empty when created' do
    expect(subject).to be_empty
  end
  
  it 'can add items' do
    subject << item
    expect(subject).not_to be_empty
  end
end

RSpec.describe Array do
  subject { [] }
  let(:item) { 1 }
  
  it_behaves_like 'a collection'
end

RSpec.describe Hash do
  subject { {} }
  let(:item) { [:key, 'value'] }
  
  it_behaves_like 'a collection'
end
```

## Shared Context

```ruby
RSpec.shared_context 'user setup' do
  let(:user) { User.new('Alice', 'alice@example.com') }
  let(:admin) { User.new('Bob', 'bob@example.com', role: 'admin') }
  
  before do
    @created_at = Time.now
  end
end

RSpec.describe 'User operations' do
  include_context 'user setup'
  
  it 'has users' do
    expect(user.name).to eq('Alice')
    expect(admin.name).to eq('Bob')
  end
end
```

## Metadata and Filtering

```ruby
RSpec.describe 'Metadata' do
  it 'normal test' do
    expect(1 + 1).to eq(2)
  end
  
  it 'slow test', :slow do
    sleep 1
    expect(true).to be true
  end
  
  it 'integration test', :integration do
    # Integration test
  end
  
  it 'focus test', :focus do
    expect(1 + 1).to eq(2)
  end
end
```

Run with filters:

```bash
# Run only slow tests
rspec --tag slow

# Exclude slow tests
rspec --tag ~slow

# Run focus tests
rspec --tag focus
```

## Custom Matchers

```ruby
# spec/support/matchers.rb
RSpec::Matchers.define :be_multiple_of do |expected|
  match do |actual|
    actual % expected == 0
  end
  
  failure_message do |actual|
    "expected #{actual} to be a multiple of #{expected}"
  end
end

# Usage
RSpec.describe 'Custom matchers' do
  it 'uses custom matcher' do
    expect(10).to be_multiple_of(5)
    expect(15).to be_multiple_of(3)
  end
end
```

## Configuration

### .rspec

```
--require spec_helper
--format documentation
--color
--warnings
```

### spec_helper.rb

```ruby
RSpec.configure do |config|
  # Enable flags like --only-failures
  config.example_status_persistence_file_path = '.rspec_status'
  
  # Disable RSpec exposing methods globally
  config.disable_monkey_patching!
  
  # Use expect syntax
  config.expect_with :rspec do |c|
    c.syntax = :expect
  end
  
  # Filter tags
  config.filter_run_when_matching :focus
  config.run_all_when_everything_filtered = true
  
  # Output settings
  config.default_formatter = 'doc' if config.files_to_run.one?
  
  # Profile slow tests
  config.profile_examples = 10
  
  # Randomize order
  config.order = :random
  Kernel.srand config.seed
end
```

## Rails Integration

### Installation

```ruby
# Gemfile
group :development, :test do
  gem 'rspec-rails'
end
```

```bash
bundle install
rails generate rspec:install
```

### Model Spec

```ruby
# spec/models/user_spec.rb
require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'validations' do
    it { should validate_presence_of(:name) }
    it { should validate_presence_of(:email) }
    it { should validate_uniqueness_of(:email) }
  end
  
  describe 'associations' do
    it { should have_many(:posts) }
  end
  
  describe '#full_name' do
    let(:user) { User.new(first_name: 'John', last_name: 'Doe') }
    
    it 'returns the full name' do
      expect(user.full_name).to eq('John Doe')
    end
  end
end
```

### Controller Spec

```ruby
# spec/controllers/users_controller_spec.rb
require 'rails_helper'

RSpec.describe UsersController, type: :controller do
  describe 'GET #index' do
    it 'returns a success response' do
      get :index
      expect(response).to be_successful
    end
    
    it 'assigns @users' do
      user = User.create!(name: 'Alice', email: 'alice@example.com')
      get :index
      expect(assigns(:users)).to eq([user])
    end
  end
  
  describe 'POST #create' do
    context 'with valid params' do
      let(:valid_params) { { user: { name: 'Alice', email: 'alice@example.com' } } }
      
      it 'creates a new User' do
        expect {
          post :create, params: valid_params
        }.to change(User, :count).by(1)
      end
    end
  end
end
```

## Resources

- [RSpec Documentation](https://rspec.info/)
- [RSpec Core](https://rspec.info/documentation/core/)
- [RSpec Expectations](https://rspec.info/documentation/expectations/)
- [RSpec Mocks](https://rspec.info/documentation/mocks/)
- [Better Specs](https://www.betterspecs.org/)

## Next Steps

- Install RSpec
- Write first spec
- Learn matchers
- Use let and subject
- Practice mocking
- Shared examples
- Custom matchers
- Rails integration
- CI/CD integration
- Advanced patterns
