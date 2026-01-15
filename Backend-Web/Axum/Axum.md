# Axum

## Introduction

## Overview

**Axum** is a modular web framework built with Tokio and Tower. It's designed to be ergonomic and modular, focused on composability and reducing boilerplate while maintaining type safety.

### Key Features

- **Modular Design**: Composable middleware and extractors
- **Tokio-based**: Built on async Tokio runtime
- **Type-Safe**: Strong Rust type system
- **Extractors**: Flexible request data extraction
- **Macros**: Minimal attribute macros
- **Tower Integration**: Compatible with Tower ecosystem
- **JSON Support**: Automatic JSON handling
- **Error Handling**: Customizable error handling
- **Router**: Powerful routing with pattern matching

### Why Choose Axum?

✅ Modern and ergonomic  
✅ Strong composability  
✅ Excellent documentation  
✅ Good performance  
✅ Growing community  

---

## Installation

### Prerequisites
- Rust 1.56+
- Cargo

### Setup

```bash
# Create new Rust project
cargo new my-axum-app
cd my-axum-app

# Add dependencies
cargo add axum
cargo add tokio --features full
cargo add serde --features derive
cargo add serde_json
cargo add tower
```

### Cargo.toml

```toml
[dependencies]
axum = "0.7"
tokio = { version = "1", features = ["full"] }
serde = { version = "1", features = ["derive"] }
serde_json = "1"
tower = "0.4"
```

---

## Getting Started

### Basic Server

```rust
// src/main.rs
use axum::{
    routing::get,
    Json, Router,
};
use serde_json::json;

#[tokio::main]
async fn main() {
    let app = Router::new()
        .route("/", get(hello));

    let listener = tokio::net::TcpListener::bind("127.0.0.1:3000")
        .await
        .unwrap();

    println!("listening on {}", listener.local_addr().unwrap());

    axum::serve(listener, app)
        .await
        .unwrap();
}

async fn hello() -> Json<serde_json::Value> {
    Json(json!({
        "message": "Hello, Axum!"
    }))
}
```

---

## Core Concepts

### 1. Routing

**Basic Routes**
```rust
use axum::{routing::{get, post, put, delete}, Router};

let app = Router::new()
    .route("/users", get(list_users))
    .route("/users", post(create_user))
    .route("/users/:id", get(get_user))
    .route("/users/:id", put(update_user))
    .route("/users/:id", delete(delete_user));
```

**Route Parameters**
```rust
use axum::extract::Path;

// Single parameter
async fn get_user(Path(id): Path<u32>) -> Json<serde_json::Value> {
    Json(json!({ "id": id }))
}

// Multiple parameters
async fn get_comment(
    Path((post_id, comment_id)): Path<(u32, u32)>,
) -> Json<serde_json::Value> {
    Json(json!({
        "post_id": post_id,
        "comment_id": comment_id
    }))
}

// Named struct
use serde::Deserialize;

#[derive(Deserialize)]
struct UserPath {
    id: u32,
}

async fn get_user_named(
    Path(UserPath { id }): Path<UserPath>,
) -> Json<serde_json::Value> {
    Json(json!({ "id": id }))
}
```

**Query Parameters**
```rust
use axum::extract::Query;
use serde::Deserialize;

#[derive(Deserialize)]
struct SearchQuery {
    q: String,
    limit: Option<u32>,
}

async fn search(
    Query(params): Query<SearchQuery>,
) -> Json<serde_json::Value> {
    Json(json!({
        "query": params.q,
        "limit": params.limit.unwrap_or(10)
    }))
}
```

### 2. Extractors

**Built-in Extractors**
```rust
use axum::{
    extract::{Path, Query, Json, Request},
    http::{HeaderMap, StatusCode},
};

// Path extractor
async fn handler(Path(id): Path<u32>) -> String {
    format!("id: {}", id)
}

// Query extractor
async fn search(Query(params): Query<SearchParams>) -> String {
    format!("search: {:?}", params)
}

// JSON body extractor
async fn create(Json(user): Json<User>) -> Json<User> {
    Json(user)
}

// Headers extractor
async fn headers(headers: HeaderMap) -> String {
    format!("{:?}", headers)
}

// Request body extractor
async fn body(body: String) -> String {
    format!("received: {}", body)
}
```

**Custom Extractors**
```rust
use axum::{
    async_trait,
    extract::FromRequestParts,
    http::request::Parts,
};

struct UserId(u32);

#[async_trait]
impl<S> FromRequestParts<S> for UserId
where
    S: Send + Sync,
{
    type Rejection = String;

    async fn from_request_parts(
        parts: &mut Parts,
        _state: &S,
    ) -> Result<Self, Self::Rejection> {
        let user_id = parts
            .headers
            .get("user-id")
            .and_then(|v| v.to_str().ok())
            .and_then(|v| v.parse::<u32>().ok())
            .ok_or("no user id header".to_string())?;

        Ok(UserId(user_id))
    }
}

async fn get_user(UserId(id): UserId) -> String {
    format!("user id: {}", id)
}
```

### 3. Request/Response

**Response Types**
```rust
use axum::{
    http::StatusCode,
    Json,
    response::IntoResponse,
};

// JSON response
async fn json() -> Json<serde_json::Value> {
    Json(json!({"message": "ok"}))
}

// Status with body
async fn created() -> (StatusCode, Json<serde_json::Value>) {
    (StatusCode::CREATED, Json(json!({"created": true})))
}

// Custom response
async fn custom() -> impl IntoResponse {
    (
        StatusCode::OK,
        [("content-type", "text/plain")],
        "hello",
    )
}

// Redirect
async fn redirect() -> impl IntoResponse {
    (StatusCode::FOUND, [("location", "/")])
}

// Error response
async fn error() -> Result<(), StatusCode> {
    Err(StatusCode::NOT_FOUND)
}
```

### 4. Middleware

**Built-in Middleware**
```rust
use tower_http::trace::TraceLayer;
use tower::ServiceBuilder;

let app = Router::new()
    .route("/", get(handler))
    .layer(
        ServiceBuilder::new()
            .layer(TraceLayer::new_for_http())
    );
```

**Custom Middleware**
```rust
use axum::{
    middleware::Next,
    response::Response,
    extract::Request,
};

async fn logging_middleware(
    req: Request,
    next: Next,
) -> Response {
    println!("{} {}", req.method(), req.uri());
    next.run(req).await
}

let app = Router::new()
    .route("/", get(handler))
    .layer(axum::middleware::from_fn(logging_middleware));
```

### 5. State Management

**Shared State**
```rust
use std::sync::Arc;
use axum::extract::State;

#[derive(Clone)]
struct AppState {
    db: Arc<String>, // Simplified
}

async fn get_data(
    State(state): State<AppState>,
) -> String {
    format!("data: {}", state.db)
}

#[tokio::main]
async fn main() {
    let state = AppState {
        db: Arc::new("connection".to_string()),
    };

    let app = Router::new()
        .route("/", get(get_data))
        .with_state(state);

    // rest...
}
```

### 6. Error Handling

**Custom Error Response**
```rust
use axum::{
    http::StatusCode,
    response::{IntoResponse, Response},
    Json,
};
use serde_json::json;

enum ApiError {
    NotFound,
    BadRequest(String),
    InternalError,
}

impl IntoResponse for ApiError {
    fn into_response(self) -> Response {
        let (status, error_message) = match self {
            ApiError::NotFound => (StatusCode::NOT_FOUND, "Resource not found"),
            ApiError::BadRequest(msg) => (StatusCode::BAD_REQUEST, &msg),
            ApiError::InternalError => (StatusCode::INTERNAL_SERVER_ERROR, "Internal error"),
        };

        let body = Json(json!({"error": error_message}));
        (status, body).into_response()
    }
}

// Usage
async fn get_user(Path(id): Path<u32>) -> Result<Json<serde_json::Value>, ApiError> {
    if id == 0 {
        return Err(ApiError::NotFound);
    }
    Ok(Json(json!({"id": id})))
}
```

### 7. JSON Handling

**Serialize/Deserialize**
```rust
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
struct User {
    id: u32,
    name: String,
    email: String,
}

async fn create_user(Json(user): Json<User>) -> Json<User> {
    Json(user)
}

async fn get_user() -> Json<User> {
    Json(User {
        id: 1,
        name: "John".to_string(),
        email: "john@example.com".to_string(),
    })
}
```

---

## Full Example

```rust
use axum::{
    extract::{Path, State},
    http::StatusCode,
    routing::{get, post, put, delete},
    Json, Router,
};
use serde::{Deserialize, Serialize};
use std::sync::{Arc, Mutex};

#[derive(Clone, Serialize, Deserialize)]
struct User {
    id: u32,
    name: String,
    email: String,
}

#[derive(Clone)]
struct AppState {
    users: Arc<Mutex<Vec<User>>>,
}

async fn list_users(State(state): State<AppState>) -> Json<Vec<User>> {
    let users = state.users.lock().unwrap();
    Json(users.clone())
}

async fn get_user(
    Path(id): Path<u32>,
    State(state): State<AppState>,
) -> Result<Json<User>, StatusCode> {
    let users = state.users.lock().unwrap();
    users
        .iter()
        .find(|u| u.id == id)
        .cloned()
        .map(Json)
        .ok_or(StatusCode::NOT_FOUND)
}

async fn create_user(
    State(state): State<AppState>,
    Json(user): Json<User>,
) -> (StatusCode, Json<User>) {
    let mut users = state.users.lock().unwrap();
    users.push(user.clone());
    (StatusCode::CREATED, Json(user))
}

#[tokio::main]
async fn main() {
    let state = AppState {
        users: Arc::new(Mutex::new(vec![])),
    };

    let app = Router::new()
        .route("/users", get(list_users))
        .route("/users", post(create_user))
        .route("/users/:id", get(get_user))
        .with_state(state);

    let listener = tokio::net::TcpListener::bind("127.0.0.1:3000")
        .await
        .unwrap();

    axum::serve(listener, app).await.unwrap();
}
```

---

## Useful Resources

- **Official Docs**: https://docs.rs/axum
- **GitHub**: https://github.com/tokio-rs/axum
- **Examples**: https://github.com/tokio-rs/axum/tree/main/examples
- **Tower Docs**: https://docs.rs/tower

---

**Status**: ✅ Complete  
**Last Updated**: January 2025  
**Version**: 1.0

