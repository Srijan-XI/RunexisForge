# OpenAPI / Swagger

## Introduction

OpenAPI (formerly Swagger) is a specification for describing RESTful APIs in a machine-readable format. It enables automatic generation of interactive documentation, client SDKs, and server stubs.

## Why OpenAPI/Swagger?

- **Interactive Documentation**: Auto-generate beautiful, interactive API docs
- **Code Generation**: Generate client libraries and server stubs in multiple languages
- **API Design First**: Design APIs before implementation
- **Validation**: Validate requests/responses against the specification
- **Standardization**: Industry-standard API description format
- **Testing**: Use spec for automated API testing
- **Discovery**: Machine-readable format for API discovery

## Key Concepts

### OpenAPI Specification (OAS)

A JSON or YAML document that describes your entire API:
- Endpoints (paths)
- HTTP methods (operations)
- Parameters (query, path, header, cookie)
- Request and response bodies
- Authentication methods
- API metadata

### Swagger Tools

- **Swagger Editor**: Write and edit OpenAPI specs
- **Swagger UI**: Interactive API documentation
- **Swagger Codegen**: Generate client SDKs and server stubs
- **SwaggerHub**: Collaborative API design platform

### OpenAPI Versions

- **OpenAPI 2.0** (Swagger 2.0): Legacy version
- **OpenAPI 3.0**: Current major version (3.0.x)
- **OpenAPI 3.1**: Latest version with JSON Schema alignment

## OpenAPI vs Swagger

- **OpenAPI**: The specification standard (OAS)
- **Swagger**: Tools that support OpenAPI (Swagger UI, Swagger Codegen, etc.)
- Swagger 2.0 → OpenAPI 2.0
- Swagger 3.0 → OpenAPI 3.0

## When to Use OpenAPI/Swagger

✅ **Use when:**
- Building public APIs that need documentation
- Want to generate client SDKs automatically
- Need to validate API contracts
- Practicing API-first development
- Want interactive API documentation
- Building microservices with clear contracts
- Need to share API specs with frontend teams

❌ **May skip when:**
- Building simple internal tools
- Rapid prototyping with frequently changing APIs
- Team doesn't value API-first approach

## User Guide

## Basic OpenAPI 3.0 Structure

```yaml
openapi: 3.0.3
info:
  title: My API
  version: 1.0.0
  description: A sample API to demonstrate OpenAPI
  contact:
    name: API Support
    email: support@example.com
servers:
  - url: https://api.example.com/v1
    description: Production server
  - url: https://staging.api.example.com/v1
    description: Staging server
paths:
  /users:
    get:
      summary: List all users
      responses:
        '200':
          description: Successful response
components:
  schemas:
    User:
      type: object
      properties:
        id:
          type: integer
        name:
          type: string
```

## Complete API Example

### users-api.yaml

```yaml
openapi: 3.0.3
info:
  title: Users API
  version: 1.0.0
  description: |
    A simple API for managing users.
    
    Features:
    - Create, read, update, delete users
    - Search and filter users
    - Role-based access control
  contact:
    name: API Team
    email: api@example.com
    url: https://example.com/support
  license:
    name: MIT
    url: https://opensource.org/licenses/MIT

servers:
  - url: https://api.example.com/v1
    description: Production
  - url: https://staging-api.example.com/v1
    description: Staging
  - url: http://localhost:3000/v1
    description: Development

tags:
  - name: Users
    description: User management operations
  - name: Authentication
    description: Authentication endpoints

paths:
  /users:
    get:
      tags:
        - Users
      summary: List all users
      description: Retrieve a paginated list of users with optional filtering
      operationId: listUsers
      parameters:
        - name: page
          in: query
          description: Page number
          schema:
            type: integer
            default: 1
            minimum: 1
        - name: limit
          in: query
          description: Number of items per page
          schema:
            type: integer
            default: 20
            minimum: 1
            maximum: 100
        - name: role
          in: query
          description: Filter by role
          schema:
            type: string
            enum: [admin, user, guest]
        - name: search
          in: query
          description: Search in name and email
          schema:
            type: string
      responses:
        '200':
          description: Successful response
          content:
            application/json:
              schema:
                type: object
                properties:
                  data:
                    type: array
                    items:
                      $ref: '#/components/schemas/User'
                  pagination:
                    $ref: '#/components/schemas/Pagination'
              examples:
                success:
                  value:
                    data:
                      - id: 1
                        name: Alice Johnson
                        email: alice@example.com
                        role: admin
                        createdAt: "2024-01-15T10:30:00Z"
                      - id: 2
                        name: Bob Smith
                        email: bob@example.com
                        role: user
                        createdAt: "2024-01-16T14:20:00Z"
                    pagination:
                      page: 1
                      limit: 20
                      total: 42
                      totalPages: 3
        '400':
          $ref: '#/components/responses/BadRequest'
        '401':
          $ref: '#/components/responses/Unauthorized'
      security:
        - bearerAuth: []

    post:
      tags:
        - Users
      summary: Create a new user
      description: Create a new user with the provided data
      operationId: createUser
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UserCreate'
            examples:
              admin:
                value:
                  name: Charlie Davis
                  email: charlie@example.com
                  role: admin
                  password: securePassword123
              user:
                value:
                  name: Diana Prince
                  email: diana@example.com
                  role: user
                  password: myPassword456
      responses:
        '201':
          description: User created successfully
          headers:
            Location:
              description: URL of the created user
              schema:
                type: string
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'
              examples:
                success:
                  value:
                    id: 3
                    name: Charlie Davis
                    email: charlie@example.com
                    role: admin
                    createdAt: "2024-01-17T09:15:00Z"
        '400':
          $ref: '#/components/responses/BadRequest'
        '401':
          $ref: '#/components/responses/Unauthorized'
        '409':
          description: User already exists
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'
              examples:
                conflict:
                  value:
                    code: USER_EXISTS
                    message: User with this email already exists
      security:
        - bearerAuth: []

  /users/{userId}:
    parameters:
      - name: userId
        in: path
        required: true
        description: User ID
        schema:
          type: integer
          minimum: 1

    get:
      tags:
        - Users
      summary: Get user by ID
      description: Retrieve a specific user by their ID
      operationId: getUserById
      responses:
        '200':
          description: Successful response
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'
        '401':
          $ref: '#/components/responses/Unauthorized'
        '404':
          $ref: '#/components/responses/NotFound'
      security:
        - bearerAuth: []

    put:
      tags:
        - Users
      summary: Replace user
      description: Replace all user data
      operationId: replaceUser
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UserCreate'
      responses:
        '200':
          description: User updated successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'
        '400':
          $ref: '#/components/responses/BadRequest'
        '401':
          $ref: '#/components/responses/Unauthorized'
        '404':
          $ref: '#/components/responses/NotFound'
      security:
        - bearerAuth: []

    patch:
      tags:
        - Users
      summary: Update user
      description: Partially update user data
      operationId: updateUser
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UserUpdate'
            examples:
              updateName:
                value:
                  name: Alice Williams
              updateRole:
                value:
                  role: admin
      responses:
        '200':
          description: User updated successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'
        '400':
          $ref: '#/components/responses/BadRequest'
        '401':
          $ref: '#/components/responses/Unauthorized'
        '404':
          $ref: '#/components/responses/NotFound'
      security:
        - bearerAuth: []

    delete:
      tags:
        - Users
      summary: Delete user
      description: Delete a user by ID
      operationId: deleteUser
      responses:
        '204':
          description: User deleted successfully
        '401':
          $ref: '#/components/responses/Unauthorized'
        '403':
          $ref: '#/components/responses/Forbidden'
        '404':
          $ref: '#/components/responses/NotFound'
      security:
        - bearerAuth: []

  /auth/login:
    post:
      tags:
        - Authentication
      summary: User login
      description: Authenticate user and receive access token
      operationId: login
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required:
                - email
                - password
              properties:
                email:
                  type: string
                  format: email
                password:
                  type: string
                  format: password
            examples:
              valid:
                value:
                  email: alice@example.com
                  password: mySecurePassword
      responses:
        '200':
          description: Login successful
          content:
            application/json:
              schema:
                type: object
                properties:
                  token:
                    type: string
                  user:
                    $ref: '#/components/schemas/User'
              examples:
                success:
                  value:
                    token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
                    user:
                      id: 1
                      name: Alice Johnson
                      email: alice@example.com
                      role: admin
        '401':
          description: Invalid credentials
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'
      security: []

components:
  schemas:
    User:
      type: object
      required:
        - id
        - name
        - email
        - role
      properties:
        id:
          type: integer
          format: int64
          readOnly: true
          example: 1
        name:
          type: string
          minLength: 2
          maxLength: 100
          example: Alice Johnson
        email:
          type: string
          format: email
          example: alice@example.com
        role:
          type: string
          enum: [admin, user, guest]
          default: user
        createdAt:
          type: string
          format: date-time
          readOnly: true
          example: "2024-01-15T10:30:00Z"
        updatedAt:
          type: string
          format: date-time
          readOnly: true
          example: "2024-01-20T15:45:00Z"

    UserCreate:
      type: object
      required:
        - name
        - email
        - password
      properties:
        name:
          type: string
          minLength: 2
          maxLength: 100
        email:
          type: string
          format: email
        password:
          type: string
          format: password
          minLength: 8
        role:
          type: string
          enum: [admin, user, guest]
          default: user

    UserUpdate:
      type: object
      properties:
        name:
          type: string
          minLength: 2
          maxLength: 100
        email:
          type: string
          format: email
        role:
          type: string
          enum: [admin, user, guest]

    Pagination:
      type: object
      properties:
        page:
          type: integer
          example: 1
        limit:
          type: integer
          example: 20
        total:
          type: integer
          example: 42
        totalPages:
          type: integer
          example: 3

    Error:
      type: object
      required:
        - code
        - message
      properties:
        code:
          type: string
          example: VALIDATION_ERROR
        message:
          type: string
          example: Invalid input data
        details:
          type: array
          items:
            type: object
            properties:
              field:
                type: string
              message:
                type: string

  responses:
    BadRequest:
      description: Bad request
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          examples:
            validation:
              value:
                code: VALIDATION_ERROR
                message: Invalid input data
                details:
                  - field: email
                    message: Invalid email format

    Unauthorized:
      description: Unauthorized - authentication required
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          examples:
            noToken:
              value:
                code: UNAUTHORIZED
                message: Authentication required

    Forbidden:
      description: Forbidden - insufficient permissions
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          examples:
            insufficientPermissions:
              value:
                code: FORBIDDEN
                message: Insufficient permissions

    NotFound:
      description: Resource not found
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          examples:
            userNotFound:
              value:
                code: NOT_FOUND
                message: User not found

  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
      description: |
        JWT token-based authentication.
        
        Obtain a token via POST /auth/login and include it in the Authorization header:
        `Authorization: Bearer <token>`

security:
  - bearerAuth: []
```

## Integration with Node.js/Express

### Installation

```bash
npm install swagger-ui-express swagger-jsdoc
```

### Setup with Code Comments

```javascript
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();

const swaggerOptions = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Users API',
      version: '1.0.0',
      description: 'A simple API for managing users',
    },
    servers: [
      {
        url: 'http://localhost:3000/api/v1',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{
      bearerAuth: [],
    }],
  },
  apis: ['./routes/*.js'], // Path to API routes
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Your routes here...
app.listen(3000, () => {
  console.log('Server running on port 3000');
  console.log('API Docs available at http://localhost:3000/api-docs');
});
```

### Documenting Endpoints with JSDoc

```javascript
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *       properties:
 *         id:
 *           type: integer
 *           description: Auto-generated user ID
 *         name:
 *           type: string
 *           description: User's full name
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address
 *         role:
 *           type: string
 *           enum: [admin, user, guest]
 *           description: User's role
 *       example:
 *         id: 1
 *         name: Alice Johnson
 *         email: alice@example.com
 *         role: admin
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of users
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 *     security:
 *       - bearerAuth: []
 */
router.get('/users', authenticate, (req, res) => {
  // Implementation
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               role:
 *                 type: string
 *                 enum: [admin, user, guest]
 *     responses:
 *       201:
 *         description: User created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid input
 *     security:
 *       - bearerAuth: []
 */
router.post('/users', authenticate, (req, res) => {
  // Implementation
});
```

### Setup with Separate YAML File

```javascript
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const app = express();

// Load OpenAPI spec from file
const swaggerDocument = YAML.load('./openapi.yaml');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3000);
```

## Integration with Python/FastAPI

FastAPI has built-in OpenAPI support!

```python
from fastapi import FastAPI, HTTPException, Query
from pydantic import BaseModel, EmailStr
from typing import List, Optional
from enum import Enum

app = FastAPI(
    title="Users API",
    description="A simple API for managing users",
    version="1.0.0",
    contact={
        "name": "API Support",
        "email": "support@example.com",
    },
    license_info={
        "name": "MIT",
        "url": "https://opensource.org/licenses/MIT",
    },
)

class UserRole(str, Enum):
    admin = "admin"
    user = "user"
    guest = "guest"

class User(BaseModel):
    id: int
    name: str
    email: EmailStr
    role: UserRole = UserRole.user
    
    class Config:
        schema_extra = {
            "example": {
                "id": 1,
                "name": "Alice Johnson",
                "email": "alice@example.com",
                "role": "admin"
            }
        }

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    role: UserRole = UserRole.user

@app.get(
    "/users",
    response_model=List[User],
    summary="List all users",
    description="Retrieve a paginated list of users with optional filtering",
    tags=["Users"]
)
def list_users(
    page: int = Query(1, ge=1, description="Page number"),
    limit: int = Query(20, ge=1, le=100, description="Items per page"),
    role: Optional[UserRole] = Query(None, description="Filter by role")
):
    """
    List all users with pagination and optional filtering.
    
    - **page**: Page number (default: 1)
    - **limit**: Items per page (default: 20, max: 100)
    - **role**: Filter by user role (optional)
    """
    # Implementation
    return []

@app.post(
    "/users",
    response_model=User,
    status_code=201,
    summary="Create a new user",
    tags=["Users"],
    responses={
        201: {"description": "User created successfully"},
        400: {"description": "Invalid input data"},
        409: {"description": "User already exists"}
    }
)
def create_user(user: UserCreate):
    """
    Create a new user with all the information:
    
    - **name**: User's full name
    - **email**: User's email address
    - **role**: User's role (default: user)
    """
    # Implementation
    pass

@app.get("/users/{user_id}", response_model=User, tags=["Users"])
def get_user(user_id: int):
    """Get a specific user by ID."""
    # Implementation
    pass

# FastAPI automatically generates OpenAPI docs at:
# http://localhost:8000/docs (Swagger UI)
# http://localhost:8000/redoc (ReDoc)
# http://localhost:8000/openapi.json (OpenAPI JSON)
```

## Integration with Go/Gin

### Using swaggo/swag

```bash
go get -u github.com/swaggo/swag/cmd/swag
go get -u github.com/swaggo/gin-swagger
go get -u github.com/swaggo/files
```

```go
package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"

	_ "myapp/docs" // Import generated docs
)

// @title Users API
// @version 1.0
// @description A simple API for managing users
// @termsOfService http://swagger.io/terms/

// @contact.name API Support
// @contact.email support@example.com

// @license.name MIT
// @license.url https://opensource.org/licenses/MIT

// @host localhost:8080
// @BasePath /api/v1

// @securityDefinitions.apikey BearerAuth
// @in header
// @name Authorization

func main() {
	r := gin.Default()

	// Swagger endpoint
	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	v1 := r.Group("/api/v1")
	{
		v1.GET("/users", listUsers)
		v1.POST("/users", createUser)
		v1.GET("/users/:id", getUser)
	}

	r.Run(":8080")
}

type User struct {
	ID    int    `json:"id" example:"1"`
	Name  string `json:"name" example:"Alice Johnson"`
	Email string `json:"email" example:"alice@example.com"`
	Role  string `json:"role" example:"admin" enums:"admin,user,guest"`
}

// ListUsers godoc
// @Summary List all users
// @Description Get a paginated list of users
// @Tags Users
// @Accept json
// @Produce json
// @Param page query int false "Page number" default(1)
// @Param limit query int false "Items per page" default(20)
// @Success 200 {array} User
// @Failure 401 {object} map[string]string
// @Security BearerAuth
// @Router /users [get]
func listUsers(c *gin.Context) {
	c.JSON(http.StatusOK, []User{})
}

// CreateUser godoc
// @Summary Create a new user
// @Description Create a user with the provided data
// @Tags Users
// @Accept json
// @Produce json
// @Param user body User true "User data"
// @Success 201 {object} User
// @Failure 400 {object} map[string]string
// @Failure 401 {object} map[string]string
// @Security BearerAuth
// @Router /users [post]
func createUser(c *gin.Context) {
	c.JSON(http.StatusCreated, User{})
}

// GetUser godoc
// @Summary Get user by ID
// @Description Get a specific user by their ID
// @Tags Users
// @Accept json
// @Produce json
// @Param id path int true "User ID"
// @Success 200 {object} User
// @Failure 404 {object} map[string]string
// @Security BearerAuth
// @Router /users/{id} [get]
func getUser(c *gin.Context) {
	c.JSON(http.StatusOK, User{})
}
```

Generate docs:

```bash
swag init
```

Access Swagger UI at: `http://localhost:8080/swagger/index.html`

## Request Validation

### Using OpenAPI spec for validation (Node.js)

```bash
npm install express-openapi-validator
```

```javascript
const OpenApiValidator = require('express-openapi-validator');

app.use(
  OpenApiValidator.middleware({
    apiSpec: './openapi.yaml',
    validateRequests: true,
    validateResponses: true,
  })
);

// Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
});
```

## Code Generation

### Generate Client SDK

**Using OpenAPI Generator:**

```bash
# Install
npm install @openapitools/openapi-generator-cli -g

# Generate JavaScript/TypeScript client
openapi-generator-cli generate \
  -i openapi.yaml \
  -g typescript-axios \
  -o ./generated/client

# Generate Python client
openapi-generator-cli generate \
  -i openapi.yaml \
  -g python \
  -o ./generated/python-client

# Generate Java client
openapi-generator-cli generate \
  -i openapi.yaml \
  -g java \
  -o ./generated/java-client
```

**Using generated client:**

```typescript
import { UsersApi, Configuration } from './generated/client';

const config = new Configuration({
  basePath: 'https://api.example.com/v1',
  accessToken: 'your-jwt-token',
});

const usersApi = new UsersApi(config);

// List users
const users = await usersApi.listUsers({ page: 1, limit: 20 });

// Create user
const newUser = await usersApi.createUser({
  userCreate: {
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user',
  },
});
```

### Generate Server Stubs

```bash
# Generate Express server stub
openapi-generator-cli generate \
  -i openapi.yaml \
  -g nodejs-express-server \
  -o ./generated/server

# Generate Python FastAPI server
openapi-generator-cli generate \
  -i openapi.yaml \
  -g python-fastapi \
  -o ./generated/fastapi-server

# Generate Go Gin server
openapi-generator-cli generate \
  -i openapi.yaml \
  -g go-gin-server \
  -o ./generated/go-server
```

## Advanced Features

### Polymorphism (oneOf, anyOf, allOf)

```yaml
components:
  schemas:
    Pet:
      type: object
      required:
        - type
        - name
      properties:
        type:
          type: string
        name:
          type: string
      discriminator:
        propertyName: type
        mapping:
          dog: '#/components/schemas/Dog'
          cat: '#/components/schemas/Cat'

    Dog:
      allOf:
        - $ref: '#/components/schemas/Pet'
        - type: object
          properties:
            breed:
              type: string
            barkVolume:
              type: integer

    Cat:
      allOf:
        - $ref: '#/components/schemas/Pet'
        - type: object
          properties:
            meowVolume:
              type: integer
            indoor:
              type: boolean

    Response:
      oneOf:
        - $ref: '#/components/schemas/Dog'
        - $ref: '#/components/schemas/Cat'
```

### File Upload

```yaml
paths:
  /upload:
    post:
      summary: Upload a file
      requestBody:
        content:
          multipart/form-data:
            schema:
              type: object
              properties:
                file:
                  type: string
                  format: binary
                description:
                  type: string
      responses:
        '200':
          description: File uploaded successfully
```

### Multiple Authentication Methods

```yaml
components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
    
    apiKey:
      type: apiKey
      in: header
      name: X-API-Key
    
    oauth2:
      type: oauth2
      flows:
        authorizationCode:
          authorizationUrl: https://example.com/oauth/authorize
          tokenUrl: https://example.com/oauth/token
          scopes:
            read: Read access
            write: Write access

paths:
  /users:
    get:
      security:
        - bearerAuth: []
        - apiKey: []
        - oauth2: [read]
```

### Webhooks (OpenAPI 3.1)

```yaml
webhooks:
  userCreated:
    post:
      summary: User created event
      description: Triggered when a new user is created
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/User'
      responses:
        '200':
          description: Webhook received successfully
```

## Best Practices

### API Design

- ✅ Use consistent naming (camelCase or snake_case)
- ✅ Version your API from the start
- ✅ Group related endpoints with tags
- ✅ Provide clear descriptions and examples
- ✅ Use appropriate HTTP status codes
- ✅ Define reusable components (schemas, responses, parameters)
- ✅ Document error responses
- ✅ Include security definitions

### Documentation

- ✅ Write clear, concise descriptions
- ✅ Provide examples for all request/response bodies
- ✅ Document all possible error scenarios
- ✅ Include authentication instructions
- ✅ Add links to related documentation
- ✅ Keep spec in sync with implementation
- ✅ Use meaningful operation IDs
- ✅ Document rate limits and quotas

### Schema Design

- ✅ Use `$ref` to avoid duplication
- ✅ Define schemas separately in `components/schemas`
- ✅ Use appropriate data types and formats
- ✅ Add validation rules (min, max, pattern, etc.)
- ✅ Mark required fields explicitly
- ✅ Use enums for fixed value sets
- ✅ Add examples to schemas
- ✅ Use `readOnly` and `writeOnly` appropriately

### Maintenance

- ✅ Store spec in version control
- ✅ Use linters (e.g., Spectral) to enforce consistency
- ✅ Automate spec generation from code or vice versa
- ✅ Set up CI/CD for spec validation
- ✅ Keep spec as single source of truth
- ✅ Review spec changes in pull requests
- ✅ Archive old API versions

## Validation and Linting

### Spectral (OpenAPI Linter)

```bash
npm install -g @stoplight/spectral-cli
```

**Create `.spectral.yaml`:**

```yaml
extends: spectral:oas
rules:
  operation-description: error
  operation-tags: error
  operation-operationId: error
  no-$ref-siblings: error
```

**Run linter:**

```bash
spectral lint openapi.yaml
```

### Swagger CLI Validation

```bash
npm install -g @apidevtools/swagger-cli

swagger-cli validate openapi.yaml
```

## Testing with OpenAPI

### Dredd (API Testing)

```bash
npm install -g dredd
```

```bash
dredd openapi.yaml http://localhost:3000 --hookfiles=./hooks.js
```

### Schemathesis (Property-based testing)

```bash
pip install schemathesis
```

```python
import schemathesis

schema = schemathesis.from_uri("http://localhost:3000/openapi.json")

@schema.parametrize()
def test_api(case):
    response = case.call()
    case.validate_response(response)
```

## Tools and Resources

### Editors
- **Swagger Editor**: Online/offline OpenAPI editor
- **Stoplight Studio**: Visual API designer
- **VS Code Extensions**: OpenAPI (Swagger) Editor, Redocly

### Documentation
- **Swagger UI**: Interactive API documentation
- **ReDoc**: Beautiful API documentation
- **RapiDoc**: Web component for OpenAPI docs

### Code Generation
- **OpenAPI Generator**: Generate clients/servers in 50+ languages
- **Swagger Codegen**: Original code generator
- **openapi-typescript**: Generate TypeScript types

### Validation
- **Spectral**: Flexible OpenAPI linter
- **Redocly CLI**: OpenAPI validation and linting
- **express-openapi-validator**: Runtime validation

### Testing
- **Dredd**: HTTP API testing framework
- **Schemathesis**: Property-based API testing
- **Portman**: Convert OpenAPI to Postman collections

## Real-World Example

Complete e-commerce API specification with products, orders, cart, and authentication:

```yaml
openapi: 3.0.3
info:
  title: E-Commerce API
  version: 1.0.0

paths:
  /products:
    get:
      summary: List products
      parameters:
        - name: category
          in: query
          schema:
            type: string
        - name: minPrice
          in: query
          schema:
            type: number
        - name: maxPrice
          in: query
          schema:
            type: number
      responses:
        '200':
          description: Products list
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Product'

  /cart:
    get:
      summary: Get cart
      responses:
        '200':
          description: Current cart
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Cart'
      security:
        - bearerAuth: []

  /cart/items:
    post:
      summary: Add item to cart
      requestBody:
        content:
          application/json:
            schema:
              type: object
              properties:
                productId:
                  type: integer
                quantity:
                  type: integer
      responses:
        '200':
          description: Item added
      security:
        - bearerAuth: []

  /orders:
    post:
      summary: Create order
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/OrderCreate'
      responses:
        '201':
          description: Order created
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Order'
      security:
        - bearerAuth: []

components:
  schemas:
    Product:
      type: object
      properties:
        id:
          type: integer
        name:
          type: string
        price:
          type: number
        category:
          type: string
        inStock:
          type: boolean

    Cart:
      type: object
      properties:
        items:
          type: array
          items:
            type: object
            properties:
              product:
                $ref: '#/components/schemas/Product'
              quantity:
                type: integer
        total:
          type: number

    Order:
      type: object
      properties:
        id:
          type: integer
        items:
          type: array
          items:
            type: object
        total:
          type: number
        status:
          type: string
          enum: [pending, processing, shipped, delivered]

    OrderCreate:
      type: object
      properties:
        shippingAddress:
          type: string
        paymentMethod:
          type: string

  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
```

## References

- **OpenAPI Specification**: https://spec.openapis.org/oas/latest.html
- **Swagger Tools**: https://swagger.io/tools/
- **OpenAPI Generator**: https://openapi-generator.tech/
- **Spectral Linter**: https://stoplight.io/open-source/spectral
- **FastAPI Docs**: https://fastapi.tiangolo.com/tutorial/
- **ReDoc**: https://redocly.com/redoc/

---

## See Also

- [REST API Fundamentals](../REST-API/REST-API.md)
- [JSON:API Specification](../JSON-API/JSON-API.md)
- [GraphQL Alternative](../GraphQL/GraphQL.md)
- [API Testing & Quality](../../Security-Testing/)
