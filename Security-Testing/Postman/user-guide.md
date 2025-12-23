# Postman User Guide

## Table of Contents
- Installation
- First Request
- Authorization
- Collections
- Variables & Environments
- Scripts (Pre-request & Tests)
- Running Collections (Runner & Newman)
- Mock Servers
- Monitors
- Documentation
- Importing OpenAPI/Swagger
- Workspaces & Collaboration
- CI/CD Integration
- Best Practices & Troubleshooting

---

## Installation

You can use the Desktop app (recommended), Web app, or CLI tools.

- Desktop: Download from https://www.postman.com/downloads/
- Web: https://web.postman.co (requires the Postman Desktop Agent to access local networks)
- CLI: Newman (collection runner) via npm

### Install Newman (CLI Runner)

```pwsh
npm install -g newman
```

---

## First Request

1. Open Postman → New → HTTP Request.
2. Set Method: `GET`, URL: `https://api.postman-echo.com/get?hello=world`.
3. Click Send and review the status, headers, and JSON body.
4. Save the request into a new Collection named "Echo Demo".

---

## Authorization

Set auth at the request, folder, or collection level.

- No Auth: For public endpoints.
- API Key: Put in header (e.g., `x-api-key`) or query param.
- Bearer Token: Paste token or use a variable (recommended).
- Basic Auth: Username/password (avoid hardcoding; use variables).
- OAuth 2.0: Get new access tokens using configured auth servers.

Tip: Store credentials in environment variables and mark secrets as secret variables when possible.

---

## Collections

Collections organize related requests and scripts.

### Create a Collection
1. New → Collection → Name it (e.g., "Pet Store API").
2. Add folders (e.g., "Pets", "Orders").
3. Add requests with URLs, headers, body, and tests.

### Examples for Documentation
Add an Example to a request to capture a sample response; this powers documentation and mocks.

---

## Variables & Environments

Variable scopes (in increasing priority):
- Global
- Environment
- Collection
- Local (request runtime)

Use variables with `{{varName}}` in URLs, headers, or bodies.

### Create an Environment
1. Environments → New → Add variables: `baseUrl`, `apiKey`, etc.
2. Reference in requests: `{{baseUrl}}/pets`.

### Variable Example

```json
{
	"baseUrl": "https://api.example.com",
	"authToken": "{{secrets.token}}"
}
```

---

## Scripts (Pre-request & Tests)

Scripts use JavaScript and the Postman `pm` API.

### Pre-request Script
Runs before the request; useful for auth signatures or dynamic headers.

```javascript
// Timestamp and HMAC signature example
const ts = Date.now().toString();
pm.variables.set('timestamp', ts);

const payload = ts + pm.request.url.getPath();
const sig = CryptoJS.HmacSHA256(payload, pm.environment.get('apiSecret')).toString();
pm.request.headers.add({ key: 'X-Signature', value: sig });
```

### Tests
Runs after the response; write assertions and save data.

```javascript
pm.test("Status is 200", function () {
	pm.response.to.have.status(200);
});

pm.test("JSON has id", function () {
	const json = pm.response.json();
	pm.expect(json).to.have.property('id');
});

// Set data for next requests
pm.collectionVariables.set('lastId', pm.response.json().id);
```

### Common Assertions

```javascript
pm.response.to.be.ok;                // 2xx
pm.response.to.have.header('etag');
pm.response.to.have.jsonBody('$.data.items[*]');
pm.expect(pm.response.responseTime).below(800);
```

---

## Running Collections (Runner & Newman)

### Collection Runner (GUI)
1. Open collection → Run.
2. Select environment and data file (CSV/JSON) if needed.
3. Configure iterations and concurrency.
4. Run and export results.

### Newman (CLI)

Install globally (see Installation). Run a saved collection export (`.json`).

```pwsh
newman run .\collections\petstore.postman_collection.json `
	-e .\environments\staging.postman_environment.json `
	--reporters cli,htmlextra `
	--reporter-htmlextra-export .\reports\run.html
```

Data-driven runs:

```pwsh
newman run .\collections\orders.json -d .\data\orders.csv
```

Exit codes are CI-friendly (non-zero on failures).

---

## Mock Servers

Use Examples to define responses, then create a mock server:
1. Select collection → More → Mock collection.
2. Choose environment and mock URL; Postman returns `{{mockServerUrl}}`.
3. Point clients to the mock to unblock frontend/mobile work.

---

## Monitors

Schedule collection runs from Postman’s cloud:
1. Collection → Monitor → Create Monitor.
2. Set schedule, environment, regions, and alerts.
3. View run history, failures, and performance trends.

---

## Documentation

Generate and share docs directly from collections:
1. Collection → View in Web → Publish Documentation.
2. Add descriptions, examples, and authentication guidance.
3. Share public or restricted links.

---

## Importing OpenAPI/Swagger

1. Import → Upload/Open URL to OpenAPI (YAML/JSON).
2. Postman generates a collection with folders and requests.
3. Enhance with tests, examples, and variables.

---

## Workspaces & Collaboration

- Personal, Team, and Public workspaces.
- Invite collaborators with roles (Viewer, Editor, Admin).
- Comments, changelogs, and versioned collections.

Tip: Sync collections to Git using Postman’s integrations or export JSON for manual versioning.

---

## CI/CD Integration

Run Postman tests in pipelines using Newman. Example GitHub Actions workflow:

```yaml
name: API Tests
on: [push, pull_request]
jobs:
	newman:
		runs-on: ubuntu-latest
		steps:
			- uses: actions/checkout@v4
			- uses: actions/setup-node@v4
				with: { node-version: '20' }
			- run: npm i -g newman newman-reporter-htmlextra
			- run: |
					newman run ./collections/petstore.json \
						-e ./environments/staging.json \
						--reporters cli,htmlextra \
						--reporter-htmlextra-export ./report.html
			- uses: actions/upload-artifact@v4
				with: { name: newman-report, path: report.html }
```

---

## Best Practices & Troubleshooting

Best Practices
- Use environments and secret variables for credentials.
- Keep collections modular; one domain per collection.
- Write idempotent tests; avoid cross-test coupling where possible.
- Version collections and document breaking changes.
- Reuse utilities via collection-level scripts.

Troubleshooting
- CORS in web app? Use desktop app or Desktop Agent.
- Auth failures? Verify token refresh and environment selection.
- Flaky tests? Add retries/backoff and assert only what matters.
- Timeouts? Increase request timeout and inspect server logs.

---

You’re ready to design, test, and automate APIs with Postman. Start small with a single collection and grow into mocks, monitors, and CI—your future self will thank you.
