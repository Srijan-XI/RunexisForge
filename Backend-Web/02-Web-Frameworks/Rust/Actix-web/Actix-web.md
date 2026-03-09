# Actix-web

## Introduction

## Overview

**Actix-web** is one of the fastest and most powerful web frameworks for Rust. It's built on top of the Actix actor framework and provides excellent performance, excellent for building RESTful APIs and real-time applications.

### Key Features

- **Extremely Fast**: Consistently one of the fastest web frameworks
- **Actor-based Architecture**: Uses Actix actor framework
- **Type-Safe**: Full Rust type safety
- **Async/Await**: Native async support
- **Middleware System**: Flexible middleware pipeline
- **WebSocket Support**: Built-in WebSocket support
- **JSON Support**: Automatic JSON serialization
- **Routing**: Powerful routing system
- **Testing**: Integrated testing utilities

### Why Choose Actix-web?

✅ Blazing fast performance  
✅ Type-safe Rust code  
✅ Great for microservices  
✅ Built-in testing  
✅ Active community  

---

## Installation

### Prerequisites
- Rust (1.41+ for `async/await`)
- Cargo

### Setup

```bash
# Create new Rust project
cargo new my-actix-app
cd my-actix-app

# Add dependencies
cargo add actix-web
cargo add tokio --features full
cargo add serde --features derive
cargo add serde_json
```

### Cargo.toml

```toml
[package]
name = "my-actix-app"
version = "0.1.0"
edition = "2021"

[dependencies]
actix-web = "4"
actix-rt = "2"
tokio = { version = "1", features = ["full"] }
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"
```

---

## Getting Started

### Basic Server

```rust
// src/main.rs
use actix_web::{web, App, HttpServer, HttpResponse};

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    println!("Starting server at http://localhost:8080");

    HttpServer::new(|| {
        App::new()
            .route("/", web::get().to(hello))
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}

async fn hello() -> HttpResponse {
    HttpResponse::Ok().json(serde_json::json!({
        "message": "Hello, Actix-web!"
    }))
}
```

Run with:
```bash
cargo run
```

---

## Core Concepts

### 1. Routing

**Basic Routes**
```rust
#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .route("/", web::get().to(index))
            .route("/users", web::get().to(get_users))
            .route("/users", web::post().to(create_user))
            .route("/users/{id}", web::get().to(get_user))
            .route("/users/{id}", web::put().to(update_user))
            .route("/users/{id}", web::delete().to(delete_user))
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}

async fn index() -> HttpResponse {
    HttpResponse::Ok().json(serde_json::json!({"message": "Home"}))
}

async fn get_users() -> HttpResponse {
    HttpResponse::Ok().json(serde_json::json!({"users": []}))
}

async fn create_user() -> HttpResponse {
    HttpResponse::Created().json(serde_json::json!({"created": true}))
}
```

**Route Parameters**
```rust
use actix_web::{web, HttpResponse};

// Single parameter
async fn get_user(id: web::Path<u32>) -> HttpResponse {
    HttpResponse::Ok().json(serde_json::json!({
        "user_id": id.into_inner()
    }))
}

// Multiple parameters
async fn get_comment(
    path: web::Path<(u32, u32)>,
) -> HttpResponse {
    let (post_id, comment_id) = path.into_inner();
    HttpResponse::Ok().json(serde_json::json!({
        "post_id": post_id,
        "comment_id": comment_id
    }))
}

// In App configuration
.route("/users/{id}", web::get().to(get_user))
.route("/posts/{post_id}/comments/{comment_id}", 
       web::get().to(get_comment))
```

**Query Parameters**
```rust
use serde::Deserialize;

#[derive(Deserialize)]
struct Query {
    q: Option<String>,
    limit: Option<u32>,
}

async fn search(query: web::Query<Query>) -> HttpResponse {
    let q = &query.q;
    let limit = query.limit.unwrap_or(10);
    
    HttpResponse::Ok().json(serde_json::json!({
        "query": q,
        "limit": limit
    }))
}

// In App
.route("/search", web::get().to(search))
```

### 2. Request/Response

**Request Body**
```rust
use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize)]
struct User {
    name: String,
    email: String,
}

async fn create_user(user: web::Json<User>) -> HttpResponse {
    let user_data = user.into_inner();
    
    HttpResponse::Created().json(serde_json::json!({
        "created": true,
        "name": user_data.name,
        "email": user_data.email
    }))
}
```

**Response Types**
```rust
// JSON response
HttpResponse::Ok().json(data)

// String response
HttpResponse::Ok().body("Hello")

// Custom status
HttpResponse::Created().json(data)
HttpResponse::NotFound().finish()
HttpResponse::BadRequest().json(error_msg)

// Headers
HttpResponse::Ok()
    .insert_header(("X-Custom", "value"))
    .json(data)

// Redirect
HttpResponse::Found()
    .insert_header(("Location", "/new-path"))
    .finish()
```

### 3. Middleware

**Built-in Middleware**
```rust
use actix_web::middleware;

App::new()
    .wrap(middleware::Logger::default())
    .wrap(middleware::NormalizePath::trim())
    .wrap(middleware::Compress::default())
```

**Custom Middleware**
```rust
use actix_web::{
    dev::{forward_ready, Service, ServiceRequest, ServiceResponse, Transform},
    Error, HttpMessage,
};
use futures::future::LocalBoxFuture;
use std::rc::Rc;

pub struct LoggingMiddleware;

impl<S, B> Transform<S, ServiceRequest> for LoggingMiddleware
where
    S: Service<ServiceRequest, Response = ServiceResponse<B>, Error = Error> + 'static,
    S::Future: 'static,
    B: 'static,
{
    type Response = ServiceResponse<B>;
    type Error = Error;
    type InitError = ();
    type Transform = LoggingMiddlewareService<S>;
    type Future = std::future::Ready<Result<Self::Transform, Self::InitError>>;

    fn new_transform(&self, service: S) -> Self::Future {
        std::future::ready(Ok(LoggingMiddlewareService {
            service: Rc::new(service),
        }))
    }
}

pub struct LoggingMiddlewareService<S> {
    service: Rc<S>,
}

impl<S, B> Service<ServiceRequest> for LoggingMiddlewareService<S>
where
    S: Service<ServiceRequest, Response = ServiceResponse<B>, Error = Error> + 'static,
    S::Future: 'static,
    B: 'static,
{
    type Response = ServiceResponse<B>;
    type Error = Error;
    type Future = LocalBoxFuture<'static, Result<Self::Response, Self::Error>>;

    forward_ready!(service);

    fn call(&self, req: ServiceRequest) -> Self::Future {
        let svc = self.service.clone();
        
        Box::pin(async move {
            println!("{} {}", req.method(), req.path());
            svc.call(req).await
        })
    }
}

// Use middleware
App::new()
    .wrap(LoggingMiddleware)
```

**Function Middleware**
```rust
use actix_web::middleware::Logger;

env_logger::init_from_env(env_logger::Env::new().default_filter_or("info"));

App::new()
    .wrap(Logger::default())
```

### 4. Handlers

**Handler Functions**
```rust
// Basic handler
async fn hello() -> impl Responder {
    HttpResponse::Ok().json(json!({"msg": "hello"}))
}

// With path parameters
async fn show(id: web::Path<u32>) -> impl Responder {
    HttpResponse::Ok().json(json!({"id": id.into_inner()}))
}

// With query parameters
async fn list(
    q: web::Query<std::collections::HashMap<String, String>>,
) -> impl Responder {
    HttpResponse::Ok().json(q.into_inner())
}

// With JSON body
async fn create(user: web::Json<User>) -> impl Responder {
    HttpResponse::Created().json(user.into_inner())
}

// Multiple extracts
async fn update(
    id: web::Path<u32>,
    user: web::Json<User>,
) -> impl Responder {
    HttpResponse::Ok().json(json!({
        "id": id.into_inner(),
        "user": user.into_inner()
    }))
}
```

### 5. JSON Handling

**JSON Serialization**
```rust
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
struct User {
    id: u32,
    name: String,
    email: String,
}

async fn get_user() -> web::Json<User> {
    let user = User {
        id: 1,
        name: "John".to_string(),
        email: "john@example.com".to_string(),
    };
    
    web::Json(user)
}
```

**Error Handling**
```rust
use actix_web::{error, HttpResponse};

#[derive(Serialize)]
struct ErrorResponse {
    error: String,
}

async fn get_user(id: web::Path<u32>) -> Result<HttpResponse, error::Error> {
    if id.into_inner() == 0 {
        return Err(error::ErrorNotFound("User not found"));
    }
    
    Ok(HttpResponse::Ok().json(json!({"id": 1})))
}
```

### 6. Application State

**Shared State**
```rust
use std::sync::Mutex;

struct AppState {
    counter: Mutex<i32>,
}

async fn increment(data: web::Data<AppState>) -> impl Responder {
    let mut counter = data.counter.lock().unwrap();
    *counter += 1;
    
    HttpResponse::Ok().json(json!({"count": *counter}))
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let app_state = web::Data::new(AppState {
        counter: Mutex::new(0),
    });

    HttpServer::new(move || {
        App::new()
            .app_data(app_state.clone())
            .route("/increment", web::get().to(increment))
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}
```

### 7. Scopes and Routing Groups

```rust
// API scope
App::new()
    .service(
        web::scope("/api/v1")
            .route("/users", web::get().to(get_users))
            .route("/users/{id}", web::get().to(get_user))
            .route("/users", web::post().to(create_user))
    )
```

---

## Testing

**Testing Example**
```rust
#[cfg(test)]
mod tests {
    use super::*;
    use actix_web::{test, web, App};

    #[actix_web::test]
    async fn test_index() {
        let app = test::init_service(
            App::new().route("/", web::get().to(index))
        ).await;

        let req = test::TestRequest::get()
            .uri("/")
            .to_request();

        let resp = test::call_service(&app, req).await;
        assert!(resp.status().is_success());
    }
}
```

---

## Useful Resources

- **Official Docs**: https://actix.rs
- **GitHub**: https://github.com/actix/actix-web
- **Examples**: https://github.com/actix/actix-web/tree/master/examples
- **Benchmarks**: https://www.techempower.com/benchmarks

---

**Status**: ✅ Complete  
**Last Updated**: January 2025  
**Version**: 1.0

