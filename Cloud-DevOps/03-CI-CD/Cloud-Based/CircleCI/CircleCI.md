# CircleCI

## Introduction

### What is CircleCI?

CircleCI is a cloud-based continuous integration and continuous delivery (CI/CD) platform that automates the build, test, and deployment process. It integrates with GitHub, Bitbucket, and GitLab, enabling teams to deliver software faster with confidence. CircleCI supports Docker, provides extensive caching capabilities, and offers both cloud-hosted and self-hosted (Server) options.

### Why CircleCI?

- Fast builds with intelligent caching
- Docker support with layer caching
- Parallelism and test splitting
- SSH debugging into builds
- Orbs (reusable configuration packages)
- Matrix jobs
- Workflows for complex pipelines
- Free tier for open source
- Self-hosted option (CircleCI Server)
- Integration with major VCS platforms

### Key Features

- **Workflows**: Orchestrate complex job dependencies
- **Parallelism**: Run tests in parallel
- **Caching**: Cache dependencies and Docker layers
- **Orbs**: Reusable configuration packages
- **SSH Access**: Debug builds via SSH
- **Contexts**: Share secrets across projects
- **Insights**: Performance analytics
- **Test Splitting**: Intelligent test distribution

## Prerequisites

- GitHub, Bitbucket, or GitLab account
- Repository with code
- Basic YAML knowledge
- Understanding of CI/CD concepts

## Getting Started

### Setup CircleCI

1. Go to [circleci.com](https://circleci.com/)
2. Sign up with GitHub/Bitbucket/GitLab
3. Select a repository
4. Add `.circleci/config.yml` to your repository

### Basic Configuration

Create `.circleci/config.yml`:

```yaml
version: 2.1

jobs:
  build:
    docker:
      - image: cimg/node:18.0
    steps:
      - checkout
      - run:
          name: Install dependencies
          command: npm install
      - run:
          name: Run tests
          command: npm test

workflows:
  build-and-test:
    jobs:
      - build
```

## Configuration Basics

### Version and Jobs

```yaml
version: 2.1

jobs:
  hello-world:
    docker:
      - image: cimg/base:2023.01
    steps:
      - run:
          name: Say Hello
          command: |
            echo "Hello, World!"
            date
            uname -a

workflows:
  my-workflow:
    jobs:
      - hello-world
```

### Multiple Jobs

```yaml
version: 2.1

jobs:
  build:
    docker:
      - image: cimg/node:18.0
    steps:
      - checkout
      - run: npm install
      - run: npm run build
      - persist_to_workspace:
          root: .
          paths:
            - dist
            - node_modules

  test:
    docker:
      - image: cimg/node:18.0
    steps:
      - checkout
      - attach_workspace:
          at: .
      - run: npm test

  deploy:
    docker:
      - image: cimg/node:18.0
    steps:
      - checkout
      - attach_workspace:
          at: .
      - run: npm run deploy

workflows:
  build-test-deploy:
    jobs:
      - build
      - test:
          requires:
            - build
      - deploy:
          requires:
            - test
          filters:
            branches:
              only: main
```

## Executors

### Docker Executor

```yaml
version: 2.1

jobs:
  docker-job:
    docker:
      - image: cimg/python:3.11
    steps:
      - checkout
      - run: python --version
      - run: pip install -r requirements.txt
      - run: pytest
```

### Machine Executor (Linux VM)

```yaml
version: 2.1

jobs:
  machine-job:
    machine:
      image: ubuntu-2204:2023.07.1
    steps:
      - checkout
      - run: docker --version
      - run: docker-compose --version
      - run: docker-compose up -d
      - run: docker-compose run app npm test
```

### macOS Executor

```yaml
version: 2.1

jobs:
  macos-job:
    macos:
      xcode: "14.2.0"
    steps:
      - checkout
      - run: xcodebuild -version
      - run: swift --version
      - run: xcodebuild test -scheme MyApp
```

### Windows Executor

```yaml
version: 2.1

orbs:
  win: circleci/windows@5.0

jobs:
  windows-job:
    executor:
      name: win/default
      size: medium
    steps:
      - checkout
      - run: dotnet --version
      - run: dotnet restore
      - run: dotnet build
      - run: dotnet test
```

## Working with Docker

### Docker Compose

```yaml
version: 2.1

jobs:
  docker-compose-test:
    machine:
      image: ubuntu-2204:2023.07.1
    steps:
      - checkout
      - run:
          name: Start services
          command: docker-compose up -d
      - run:
          name: Wait for services
          command: |
            sleep 10
            docker-compose ps
      - run:
          name: Run tests
          command: docker-compose exec app npm test
      - run:
          name: Stop services
          command: docker-compose down
```

### Build and Push Docker Image

```yaml
version: 2.1

jobs:
  build-docker:
    docker:
      - image: cimg/base:2023.01
    steps:
      - checkout
      - setup_remote_docker:
          version: 20.10.24
          docker_layer_caching: true
      - run:
          name: Build Docker image
          command: |
            docker build -t myapp:${CIRCLE_SHA1} .
            docker tag myapp:${CIRCLE_SHA1} myapp:latest
      - run:
          name: Push to registry
          command: |
            echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
            docker push myapp:${CIRCLE_SHA1}
            docker push myapp:latest

workflows:
  build-and-push:
    jobs:
      - build-docker
```

## Caching

### Dependency Caching

```yaml
version: 2.1

jobs:
  build-with-cache:
    docker:
      - image: cimg/node:18.0
    steps:
      - checkout
      
      # Restore cache
      - restore_cache:
          keys:
            - v1-dependencies-{{ checksum "package-lock.json" }}
            - v1-dependencies-
      
      # Install dependencies
      - run: npm install
      
      # Save cache
      - save_cache:
          key: v1-dependencies-{{ checksum "package-lock.json" }}
          paths:
            - node_modules
      
      - run: npm test
```

### Multiple Caches

```yaml
version: 2.1

jobs:
  multi-cache:
    docker:
      - image: cimg/python:3.11
    steps:
      - checkout
      
      # Python dependencies cache
      - restore_cache:
          keys:
            - pip-{{ checksum "requirements.txt" }}
      
      - run: pip install -r requirements.txt
      
      - save_cache:
          key: pip-{{ checksum "requirements.txt" }}
          paths:
            - ~/.cache/pip
      
      # Build artifacts cache
      - restore_cache:
          keys:
            - build-{{ .Branch }}-{{ .Revision }}
            - build-{{ .Branch }}-
            - build-
      
      - run: python setup.py build
      
      - save_cache:
          key: build-{{ .Branch }}-{{ .Revision }}
          paths:
            - build
```

## Parallelism and Test Splitting

### Parallel Execution

```yaml
version: 2.1

jobs:
  test:
    docker:
      - image: cimg/node:18.0
    parallelism: 4
    steps:
      - checkout
      - run: npm install
      
      # Split tests across parallel containers
      - run:
          name: Run tests
          command: |
            TESTFILES=$(circleci tests glob "test/**/*.test.js" | circleci tests split --split-by=timings)
            npm test -- $TESTFILES
      
      # Store test results for timing data
      - store_test_results:
          path: test-results

workflows:
  test-workflow:
    jobs:
      - test
```

### Matrix Jobs

```yaml
version: 2.1

jobs:
  test:
    parameters:
      node-version:
        type: string
      os:
        type: string
    docker:
      - image: cimg/node:<< parameters.node-version >>
    steps:
      - checkout
      - run: node --version
      - run: npm install
      - run: npm test

workflows:
  matrix-tests:
    jobs:
      - test:
          matrix:
            parameters:
              node-version: ["16.20", "18.18", "20.9"]
              os: ["linux"]
```

## Workflows

### Sequential Workflow

```yaml
version: 2.1

jobs:
  build:
    docker:
      - image: cimg/node:18.0
    steps:
      - checkout
      - run: npm install
      - run: npm run build

  test:
    docker:
      - image: cimg/node:18.0
    steps:
      - checkout
      - run: npm install
      - run: npm test

  deploy:
    docker:
      - image: cimg/node:18.0
    steps:
      - checkout
      - run: npm install
      - run: npm run deploy

workflows:
  version: 2
  build-test-deploy:
    jobs:
      - build
      - test:
          requires:
            - build
      - deploy:
          requires:
            - test
          filters:
            branches:
              only: main
```

### Fan-out/Fan-in

```yaml
version: 2.1

jobs:
  build:
    docker:
      - image: cimg/node:18.0
    steps:
      - checkout
      - run: npm run build
      - persist_to_workspace:
          root: .
          paths:
            - dist

  test-unit:
    docker:
      - image: cimg/node:18.0
    steps:
      - checkout
      - attach_workspace:
          at: .
      - run: npm run test:unit

  test-integration:
    docker:
      - image: cimg/node:18.0
    steps:
      - checkout
      - attach_workspace:
          at: .
      - run: npm run test:integration

  test-e2e:
    docker:
      - image: cimg/node:18.0
    steps:
      - checkout
      - attach_workspace:
          at: .
      - run: npm run test:e2e

  deploy:
    docker:
      - image: cimg/node:18.0
    steps:
      - checkout
      - attach_workspace:
          at: .
      - run: npm run deploy

workflows:
  test-and-deploy:
    jobs:
      - build
      - test-unit:
          requires:
            - build
      - test-integration:
          requires:
            - build
      - test-e2e:
          requires:
            - build
      - deploy:
          requires:
            - test-unit
            - test-integration
            - test-e2e
          filters:
            branches:
              only: main
```

## Orbs

### Using Orbs

```yaml
version: 2.1

orbs:
  node: circleci/node@5.1
  docker: circleci/docker@2.4
  aws-cli: circleci/aws-cli@4.0

jobs:
  build-and-push:
    executor: docker/docker
    steps:
      - setup_remote_docker
      - checkout
      - docker/check
      - docker/build:
          image: myapp
          tag: ${CIRCLE_SHA1}
      - docker/push:
          image: myapp
          tag: ${CIRCLE_SHA1}

workflows:
  build-workflow:
    jobs:
      - build-and-push
```

### Popular Orbs

```yaml
version: 2.1

orbs:
  slack: circleci/slack@4.12
  aws-ecr: circleci/aws-ecr@8.2
  kubernetes: circleci/kubernetes@1.3
  snyk: snyk/snyk@1.7

jobs:
  deploy:
    docker:
      - image: cimg/base:2023.01
    steps:
      - checkout
      - kubernetes/install-kubectl
      - kubernetes/install-kubeconfig
      - run: kubectl apply -f k8s/
      - slack/notify:
          event: pass
          template: success_tagged_deploy_1

workflows:
  deploy-workflow:
    jobs:
      - deploy
```

## Contexts and Secrets

### Environment Variables

```yaml
version: 2.1

jobs:
  deploy:
    docker:
      - image: cimg/node:18.0
    steps:
      - checkout
      - run:
          name: Deploy
          command: |
            echo "API URL: $API_URL"
            echo "Environment: $ENVIRONMENT"
            npm run deploy

workflows:
  deploy-workflow:
    jobs:
      - deploy:
          context:
            - production-secrets
          filters:
            branches:
              only: main
```

Set environment variables in CircleCI UI:
- Project Settings > Environment Variables

### Contexts

Create context in CircleCI UI:
- Organization Settings > Contexts > Create Context

Use in workflow:

```yaml
workflows:
  production-deploy:
    jobs:
      - deploy:
          context:
            - docker-hub-creds
            - aws-credentials
            - production-vars
```

## Approval Jobs

### Manual Approval

```yaml
version: 2.1

jobs:
  build:
    docker:
      - image: cimg/node:18.0
    steps:
      - checkout
      - run: npm run build

  deploy-staging:
    docker:
      - image: cimg/node:18.0
    steps:
      - checkout
      - run: npm run deploy:staging

  deploy-production:
    docker:
      - image: cimg/node:18.0
    steps:
      - checkout
      - run: npm run deploy:production

workflows:
  deploy-workflow:
    jobs:
      - build
      - deploy-staging:
          requires:
            - build
      - hold-for-approval:
          type: approval
          requires:
            - deploy-staging
      - deploy-production:
          requires:
            - hold-for-approval
```

## Scheduled Workflows

```yaml
version: 2.1

jobs:
  nightly-build:
    docker:
      - image: cimg/node:18.0
    steps:
      - checkout
      - run: npm install
      - run: npm run test:all
      - run: npm run build

workflows:
  nightly:
    triggers:
      - schedule:
          cron: "0 0 * * *"  # Every day at midnight
          filters:
            branches:
              only:
                - main
    jobs:
      - nightly-build

  weekly:
    triggers:
      - schedule:
          cron: "0 0 * * 0"  # Every Sunday
          filters:
            branches:
              only:
                - develop
    jobs:
      - nightly-build
```

## Complete CI/CD Example

```yaml
version: 2.1

orbs:
  node: circleci/node@5.1
  docker: circleci/docker@2.4
  aws-ecr: circleci/aws-ecr@8.2
  slack: circleci/slack@4.12

executors:
  node-executor:
    docker:
      - image: cimg/node:18.0

jobs:
  checkout-and-install:
    executor: node-executor
    steps:
      - checkout
      - restore_cache:
          keys:
            - deps-{{ checksum "package-lock.json" }}
      - run: npm install
      - save_cache:
          key: deps-{{ checksum "package-lock.json" }}
          paths:
            - node_modules
      - persist_to_workspace:
          root: .
          paths:
            - .

  lint:
    executor: node-executor
    steps:
      - attach_workspace:
          at: .
      - run: npm run lint

  test-unit:
    executor: node-executor
    parallelism: 2
    steps:
      - attach_workspace:
          at: .
      - run:
          name: Run unit tests
          command: |
            TESTFILES=$(circleci tests glob "test/unit/**/*.test.js" | circleci tests split)
            npm test -- $TESTFILES
      - store_test_results:
          path: test-results

  test-integration:
    executor: node-executor
    steps:
      - attach_workspace:
          at: .
      - run:
          name: Run integration tests
          command: npm run test:integration

  build:
    executor: node-executor
    steps:
      - attach_workspace:
          at: .
      - run: npm run build
      - persist_to_workspace:
          root: .
          paths:
            - dist

  build-docker:
    executor: docker/docker
    steps:
      - setup_remote_docker:
          docker_layer_caching: true
      - attach_workspace:
          at: .
      - docker/check
      - docker/build:
          image: $DOCKER_USERNAME/myapp
          tag: ${CIRCLE_SHA1},latest
      - docker/push:
          image: $DOCKER_USERNAME/myapp
          tag: ${CIRCLE_SHA1},latest

  deploy-staging:
    executor: node-executor
    steps:
      - attach_workspace:
          at: .
      - run:
          name: Deploy to staging
          command: |
            echo "Deploying to staging..."
            npm run deploy:staging

  deploy-production:
    executor: node-executor
    steps:
      - attach_workspace:
          at: .
      - run:
          name: Deploy to production
          command: |
            echo "Deploying to production..."
            npm run deploy:production
      - slack/notify:
          event: pass
          template: success_tagged_deploy_1

workflows:
  build-test-deploy:
    jobs:
      - checkout-and-install
      
      - lint:
          requires:
            - checkout-and-install
      
      - test-unit:
          requires:
            - checkout-and-install
      
      - test-integration:
          requires:
            - checkout-and-install
      
      - build:
          requires:
            - lint
            - test-unit
            - test-integration
      
      - build-docker:
          requires:
            - build
          filters:
            branches:
              only:
                - main
                - develop
      
      - deploy-staging:
          requires:
            - build-docker
          filters:
            branches:
              only: develop
      
      - hold-production:
          type: approval
          requires:
            - build-docker
          filters:
            branches:
              only: main
      
      - deploy-production:
          context:
            - production-secrets
          requires:
            - hold-production
          filters:
            branches:
              only: main
```

## SSH Debugging

### Enable SSH

```yaml
version: 2.1

jobs:
  debug-job:
    docker:
      - image: cimg/node:18.0
    steps:
      - checkout
      - run: npm install
      - run: npm test
```

When job fails:
1. Click "Rerun job with SSH"
2. SSH into the container:
   ```bash
   ssh -p <port> <connection-string>
   ```
3. Debug the issue
4. Rebuild when done

## Best Practices

1. **Use Orbs**: Leverage community orbs
2. **Cache Aggressively**: Cache dependencies and build artifacts
3. **Parallelize Tests**: Use parallelism for faster builds
4. **Workflows**: Organize jobs into workflows
5. **Contexts**: Use contexts for shared secrets
6. **Resource Classes**: Choose appropriate resource classes
7. **Docker Layer Caching**: Enable for Docker builds
8. **Test Splitting**: Use intelligent test splitting
9. **Approval Jobs**: Add manual gates for production
10. **Monitor Insights**: Use CircleCI Insights for optimization

## Troubleshooting

### View Build Logs

```bash
# SSH into failed build
ssh -p <port> <connection-string>

# Check environment
env | sort

# Verify dependencies
npm list
pip list

# Test locally
npm test
```

### Common Issues

**Out of memory**:
```yaml
jobs:
  memory-intensive:
    docker:
      - image: cimg/node:18.0
    resource_class: large  # Use larger instance
```

**Slow builds**:
```yaml
# Enable caching
# Use parallelism
# Optimize Docker builds with layer caching
```

## Resources

- [CircleCI Documentation](https://circleci.com/docs/)
- [CircleCI Orbs Registry](https://circleci.com/developer/orbs)
- [Configuration Reference](https://circleci.com/docs/configuration-reference/)
- [CircleCI Blog](https://circleci.com/blog/)
- [Community Forum](https://discuss.circleci.com/)

## Next Steps

- Sign up for CircleCI
- Connect repository
- Create first pipeline
- Add caching
- Configure parallelism
- Use orbs
- Set up workflows
- Add approval jobs
- Enable SSH debugging
- Deploy to production
