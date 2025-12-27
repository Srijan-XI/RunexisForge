# Postman — Introduction

## What is Postman?

Postman is a collaborative API platform used to design, test, document, mock, and monitor APIs. It provides a powerful GUI and scripting environment for sending HTTP requests, validating responses, organizing endpoints into collections, collaborating in workspaces, and automating checks in CI/CD using Newman or the Postman CLI.

## Why Use Postman?

- Faster API Exploration: Send requests quickly; inspect headers, body, and status.
- Organized API Work: Group endpoints in collections with folders and examples.
- Automated Testing: Write JavaScript tests to validate responses and contracts.
- Environments & Variables: Reuse endpoints and credentials across stages.
- Mocking & Monitoring: Create mock servers and scheduled monitors.
- Collaboration: Workspaces, roles, versioning, comments, and changelogs.

## Core Concepts

- Request: An HTTP call (method, URL, headers, body, auth).
- Collection: A versioned set of requests, folders, and scripts.
- Environment: Key-value variables for dev/stage/prod targets.
- Variables: local, collection, environment, global, and secret variables.
- Pre-request Script: JS that runs before a request (setup, auth, signatures).
- Tests: JS assertions that run after a response (validation and state).
- Examples: Example responses for documentation and mocks.
- Mock Server: Serve example responses without a live backend.
- Monitor: Scheduled run of collections with reporting and alerts.
- Documentation: Human-readable docs generated from collections.

## Example Test (Quick Taste)

```javascript
pm.test("Status is 200", function () {
 pm.response.to.have.status(200);
});

pm.test("Response time < 500ms", function () {
 pm.expect(pm.response.responseTime).to.be.below(500);
});
```text

## Common Use Cases

- Manual and automated API testing
- Contract testing from OpenAPI/Swagger
- Prototyping with mock servers
- Scheduled uptime and functional monitors
- Sharing documented APIs with teams and consumers

## Learning Path

1. Create your first request and save it to a collection.
2. Add an environment and use variables in URLs/headers.
3. Write pre-request and test scripts using the `pm` API.
4. Run a collection and export a report with Newman.
5. Publish documentation and set up a monitor.

Postman streamlines the entire API lifecycle—from design to production—so teams can build reliable, well-tested APIs faster.
