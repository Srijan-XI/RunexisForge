# Travis CI

## Introduction

### What is Travis CI?

Travis CI is a hosted continuous integration service used to build and test software projects hosted on GitHub and Bitbucket. It was one of the first CI services to provide free builds for open-source projects. Travis CI automatically detects when commits are made to a repository, builds the project, and runs tests based on the configuration in `.travis.yml`.

### Why Travis CI?

- Free for open-source projects
- Easy GitHub integration
- Multi-language support
- Build matrix for testing multiple configurations
- Pre-installed software and databases
- Deployment integrations
- Caching for faster builds
- Custom Docker images
- Parallel builds
- Conditional builds

### Key Features

- **Build Matrix**: Test across multiple language versions, OS, and environments
- **Multi-OS Support**: Linux, macOS, Windows
- **Pre-installed Tools**: Common languages, databases, and tools pre-installed
- **Deployment**: Built-in deployment to various platforms
- **Caching**: Cache dependencies for faster builds
- **Stages**: Organize jobs into stages
- **Conditional Builds**: Control when jobs run

## Prerequisites

- GitHub or Bitbucket account
- Repository with code
- Basic YAML knowledge
- Travis CI account

## Getting Started

### Setup Travis CI

1. Go to [travis-ci.com](https://travis-ci.com/)
2. Sign up with GitHub
3. Activate Travis CI for your repository
4. Add `.travis.yml` to your repository root

### Basic Configuration

Create `.travis.yml`:

```yaml
language: node_js

node_js:
  - 18

script:
  - npm install
  - npm test
```

Commit and push to trigger build:

```bash
git add .travis.yml
git commit -m "Add Travis CI configuration"
git push origin main
```

## Configuration Basics

### Language Support

#### Node.js

```yaml
language: node_js

node_js:
  - 16
  - 18
  - 20

install:
  - npm install

script:
  - npm test
  - npm run lint
```

#### Python

```yaml
language: python

python:
  - "3.9"
  - "3.10"
  - "3.11"

install:
  - pip install -r requirements.txt

script:
  - pytest
  - flake8 .
```

#### Java

```yaml
language: java

jdk:
  - openjdk11
  - openjdk17

script:
  - ./mvnw clean test
  - ./mvnw verify
```

#### Ruby

```yaml
language: ruby

rvm:
  - 2.7
  - 3.0
  - 3.1

script:
  - bundle install
  - bundle exec rspec
```

#### Go

```yaml
language: go

go:
  - "1.20"
  - "1.21"

script:
  - go test -v ./...
  - go build
```

#### PHP

```yaml
language: php

php:
  - "8.0"
  - "8.1"
  - "8.2"

install:
  - composer install

script:
  - ./vendor/bin/phpunit
```

## Build Lifecycle

### Default Lifecycle

```yaml
language: node_js

node_js:
  - 18

# 1. before_install
before_install:
  - echo "Before install phase"

# 2. install
install:
  - npm install

# 3. before_script
before_script:
  - echo "Setting up test environment"

# 4. script (main build)
script:
  - npm test

# 5. after_success or after_failure
after_success:
  - echo "Build succeeded!"

after_failure:
  - echo "Build failed!"

# 6. after_script (always runs)
after_script:
  - echo "Build completed"
```

## Build Matrix

### Multiple Versions

```yaml
language: node_js

node_js:
  - 16
  - 18
  - 20

env:
  - NODE_ENV=development
  - NODE_ENV=production

# This creates 6 builds:
# Node 16 + development
# Node 16 + production
# Node 18 + development
# Node 18 + production
# Node 20 + development
# Node 20 + production
```

### Matrix Expansion

```yaml
language: python

python:
  - "3.9"
  - "3.10"
  - "3.11"

env:
  - DJANGO_VERSION=3.2
  - DJANGO_VERSION=4.0
  - DJANGO_VERSION=4.1

matrix:
  # Allow some combinations to fail
  allow_failures:
    - python: "3.11"
      env: DJANGO_VERSION=3.2
  
  # Exclude specific combinations
  exclude:
    - python: "3.9"
      env: DJANGO_VERSION=4.1
  
  # Add specific combinations
  include:
    - python: "3.11"
      env: DJANGO_VERSION=4.2

install:
  - pip install django==$DJANGO_VERSION
  - pip install -r requirements.txt

script:
  - python manage.py test
```

### Fast Finish

```yaml
matrix:
  fast_finish: true
  allow_failures:
    - node_js: 21  # Latest unstable version

# Build will succeed as soon as required jobs pass
# Won't wait for allowed failures
```

## Services

### Database Services

```yaml
language: python

services:
  - postgresql
  - redis
  - mongodb

before_script:
  - psql -c 'create database test_db;' -U postgres
  - redis-cli ping
  - mongo --eval 'db.version()'

env:
  - DATABASE_URL=postgresql://postgres@localhost/test_db
  - REDIS_URL=redis://localhost:6379

script:
  - pytest
```

### Docker

```yaml
language: python

services:
  - docker

before_install:
  - docker --version
  - docker-compose --version

script:
  - docker-compose up -d
  - docker-compose exec web pytest
  - docker-compose down
```

## Caching

### Dependency Caching

```yaml
language: node_js

node_js:
  - 18

cache:
  directories:
    - node_modules

install:
  - npm install

script:
  - npm test
```

### Multiple Cache Directories

```yaml
language: python

cache:
  directories:
    - $HOME/.cache/pip
    - $HOME/.cache/pre-commit
    - .pytest_cache

install:
  - pip install -r requirements.txt

script:
  - pytest
```

### Bundler Cache (Ruby)

```yaml
language: ruby

cache: bundler

install:
  - bundle install

script:
  - bundle exec rspec
```

## Operating Systems

### Linux (Default)

```yaml
language: node_js

os: linux
dist: focal  # Ubuntu 20.04

node_js:
  - 18

script:
  - npm test
```

### macOS

```yaml
language: objective-c

os: osx
osx_image: xcode14.2

script:
  - xcodebuild test -scheme MyApp
```

### Windows

```yaml
language: node_js

os: windows

node_js:
  - 18

script:
  - npm test
```

### Multi-OS Matrix

```yaml
language: node_js

node_js:
  - 18

os:
  - linux
  - osx
  - windows

script:
  - npm test
```

## Stages

### Build Pipeline with Stages

```yaml
language: node_js

node_js:
  - 18

stages:
  - name: test
  - name: build
  - name: deploy
    if: branch = main AND type = push

jobs:
  include:
    # Test stage
    - stage: test
      name: "Unit Tests"
      script: npm run test:unit
    
    - stage: test
      name: "Integration Tests"
      script: npm run test:integration
    
    - stage: test
      name: "Lint"
      script: npm run lint
    
    # Build stage
    - stage: build
      name: "Build Application"
      script: npm run build
      before_deploy:
        - echo "Preparing deployment"
    
    # Deploy stage
    - stage: deploy
      name: "Deploy to Production"
      script: skip
      deploy:
        provider: heroku
        api_key: $HEROKU_API_KEY
        app: my-app-name
```

## Deployment

### Heroku

```yaml
language: node_js

node_js:
  - 18

script:
  - npm test

deploy:
  provider: heroku
  api_key:
    secure: $HEROKU_API_KEY
  app: my-app-name
  on:
    branch: main
```

### AWS S3

```yaml
language: node_js

node_js:
  - 18

script:
  - npm run build

deploy:
  provider: s3
  access_key_id: $AWS_ACCESS_KEY_ID
  secret_access_key: $AWS_SECRET_ACCESS_KEY
  bucket: my-bucket
  region: us-east-1
  skip_cleanup: true
  local_dir: dist
  on:
    branch: main
```

### GitHub Pages

```yaml
language: node_js

node_js:
  - 18

script:
  - npm run build

deploy:
  provider: pages
  skip_cleanup: true
  github_token: $GITHUB_TOKEN
  local_dir: dist
  on:
    branch: main
```

### Custom Deployment Script

```yaml
language: node_js

node_js:
  - 18

script:
  - npm test
  - npm run build

after_success:
  - bash ./deploy.sh

env:
  global:
    - DEPLOY_HOST=example.com
    - DEPLOY_USER=deploy
```

## Environment Variables

### Global Variables

```yaml
env:
  global:
    - NODE_ENV=production
    - API_URL=https://api.example.com

jobs:
  include:
    - script: npm test
```

### Encrypted Variables

```bash
# Install Travis CLI
gem install travis

# Encrypt variable
travis encrypt MY_SECRET_KEY=super_secret --add env.global
```

In `.travis.yml`:

```yaml
env:
  global:
    - secure: "encrypted_string_here"
```

### Matrix Variables

```yaml
env:
  matrix:
    - TEST_SUITE=unit
    - TEST_SUITE=integration
    - TEST_SUITE=e2e

script:
  - npm run test:$TEST_SUITE
```

## Conditional Builds

### Branch Conditions

```yaml
language: node_js

node_js:
  - 18

script:
  - npm test

jobs:
  include:
    - stage: deploy
      if: branch = main
      script: ./deploy.sh
    
    - stage: deploy-staging
      if: branch = develop
      script: ./deploy-staging.sh
```

### Event Conditions

```yaml
jobs:
  include:
    # Only on pull requests
    - if: type = pull_request
      script: npm run test:all
    
    # Only on push to main
    - if: branch = main AND type = push
      script: npm run deploy
    
    # Only on tags
    - if: tag IS present
      script: npm run release
```

## Docker Builds

### Build and Push Docker Image

```yaml
language: minimal

services:
  - docker

before_install:
  - echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin

script:
  - docker build -t myapp:${TRAVIS_COMMIT} .
  - docker tag myapp:${TRAVIS_COMMIT} myapp:latest

after_success:
  - docker push myapp:${TRAVIS_COMMIT}
  - docker push myapp:latest
  - if [ "$TRAVIS_BRANCH" == "main" ]; then
      docker tag myapp:${TRAVIS_COMMIT} myapp:stable;
      docker push myapp:stable;
    fi
```

## Notifications

### Email Notifications

```yaml
notifications:
  email:
    recipients:
      - dev@example.com
      - ops@example.com
    on_success: change  # default: change
    on_failure: always  # default: always
```

### Slack Notifications

```yaml
notifications:
  slack:
    rooms:
      - secure: "encrypted_slack_token"
    on_success: always
    on_failure: always
    template:
      - "Build <%{build_url}|#%{build_number}> %{result} in %{duration}"
```

## Complete Example

### Full CI/CD Pipeline

```yaml
language: node_js

node_js:
  - 16
  - 18
  - 20

os:
  - linux
  - osx

env:
  global:
    - NODE_ENV=test
  matrix:
    - TEST_SUITE=unit
    - TEST_SUITE=integration

services:
  - docker
  - postgresql
  - redis

cache:
  directories:
    - node_modules
    - $HOME/.cache

before_install:
  - npm install -g npm@latest

install:
  - npm ci

before_script:
  - psql -c 'create database test_db;' -U postgres
  - redis-cli ping

script:
  - npm run lint
  - npm run test:$TEST_SUITE
  - npm run build

after_success:
  - npm run coverage
  - bash <(curl -s https://codecov.io/bash)

stages:
  - name: test
  - name: build
  - name: deploy
    if: branch = main AND type = push

jobs:
  include:
    # Additional test jobs
    - stage: test
      name: "Security Audit"
      script: npm audit
    
    - stage: test
      name: "Type Check"
      script: npm run typecheck
    
    # Build stage
    - stage: build
      name: "Build Docker Image"
      if: branch IN (main, develop)
      services:
        - docker
      script:
        - docker build -t myapp:${TRAVIS_COMMIT} .
      before_deploy:
        - echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
        - docker tag myapp:${TRAVIS_COMMIT} myapp:latest
        - docker push myapp:${TRAVIS_COMMIT}
        - docker push myapp:latest
    
    # Deploy stage
    - stage: deploy
      name: "Deploy to Production"
      script: skip
      deploy:
        provider: script
        script: bash ./deploy.sh production
        on:
          branch: main
  
  allow_failures:
    - node_js: 20  # Allow Node 20 to fail (beta)
  
  fast_finish: true

notifications:
  email:
    on_success: change
    on_failure: always
  slack:
    rooms:
      - secure: "encrypted_token"
    on_success: change
    on_failure: always
```

## Best Practices

1. **Use Build Matrix**: Test multiple versions
2. **Cache Dependencies**: Speed up builds
3. **Use Stages**: Organize complex pipelines
4. **Conditional Builds**: Skip unnecessary jobs
5. **Secure Secrets**: Use encrypted variables
6. **Fast Finish**: Don't wait for allowed failures
7. **Minimize Build Time**: Use caching and parallel jobs
8. **Test Locally**: Use Docker to test `.travis.yml`
9. **Keep Jobs Small**: Split large jobs into stages
10. **Monitor Build Times**: Optimize slow builds

## Troubleshooting

### Debug Mode

```yaml
env:
  global:
    - TRAVIS_DEBUG_MODE=true
```

### View Build Logs

```bash
# View recent builds
travis history

# View specific build
travis show 123

# View logs
travis logs
```

### Common Issues

**Build timeout**:
```yaml
# Increase timeout
script:
  - travis_wait 30 npm test  # Wait up to 30 minutes
```

**Out of memory**:
```yaml
# Use environment variable
env:
  - NODE_OPTIONS=--max_old_space_size=4096
```

## Travis CLI Commands

```bash
# Install Travis CLI
gem install travis

# Login
travis login --pro

# Encrypt variable
travis encrypt MY_VAR=value --add

# Encrypt file
travis encrypt-file secret.key

# Lint configuration
travis lint

# View history
travis history

# View logs
travis logs

# Cancel build
travis cancel

# Restart build
travis restart 123

# Enable repository
travis enable

# Disable repository
travis disable
```

## Migration to Travis CI .com

Travis CI migrated from `.org` to `.com`:

```bash
# Update remote in your configs
# Old: travis-ci.org
# New: travis-ci.com

# Migrate repositories
travis migrate --pro
```

## Resources

- [Travis CI Documentation](https://docs.travis-ci.com/)
- [Build Configuration Reference](https://docs.travis-ci.com/user/customizing-the-build/)
- [Travis CI Blog](https://blog.travis-ci.com/)
- [GitHub Integration](https://docs.travis-ci.com/user/tutorial/)
- [Common Build Problems](https://docs.travis-ci.com/user/common-build-problems/)

## Next Steps

- Sign up for Travis CI
- Connect GitHub repository
- Create `.travis.yml`
- Configure build matrix
- Add caching
- Set up deployment
- Configure notifications
- Use build stages
- Optimize build times
- Deploy to production
