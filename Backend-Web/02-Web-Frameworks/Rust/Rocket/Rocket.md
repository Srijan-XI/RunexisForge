# Rocket

## Introduction

## Overview

**Rocket** is a web framework for Rust that makes it simple to write fast, secure web applications without sacrificing flexibility or type safety. It's known for its developer-friendly approach and expressive syntax.

### Key Features

- **Type-Safe**: Compile-time checking for routing and request handling
- **Minimal Boilerplate**: Expressive attribute macros
- **Request Guards**: Type-safe request data extraction
- **JSON Support**: Automatic JSON serialization
- **Cookies & Sessions**: Built-in session management
- **Validation**: Request validation framework
- **Testing**: Testing module included
- **Form Data**: Automatic form parsing
- **Custom Responders**: Flexible response types
- **Fairings**: Middleware-like request/response hooks

### Why Choose Rocket?

✅ Expressive and developer-friendly  
✅ Strong type safety  
✅ Minimal boilerplate  
✅ Great documentation  
✅ Excellent for learning Rust  

---

## Installation

### Prerequisites
- Rust 1.56+ (with nightly for some features)
- Cargo

### Setup

```bash
# Create new Rust project
cargo new my-rocket-app
cd my-rocket-app

# Add dependencies
cargo add rocket --features json
cargo add serde --features derive
cargo add serde_json
```

### Cargo.toml

```toml
[package]
name = "my-rocket-app"
version = "0.1.0"
edition = "2021"

[dependencies]
rocket = { version = "0.5.0", features = ["json"] }
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"
tokio = { version = "1", features = ["full"] }

[[bin]]
name = "server"
path = "src/main.rs"
```

---

## Getting Started

### Basic Server

```rust
// src/main.rs
#[macro_use]
extern crate rocket;

use rocket::serde::json::Json;
use serde::{Deserialize, Serialize};

#[get("/")]
fn hello() -> &'static str {
    "Hello, Rocket!"
}

#[get("/json")]
fn json() -> Json<serde_json::json> {
    Json(json!({
        "message": "Hello from Rocket!"
    }))
}

#[launch]
fn rocket() -> _ {
    rocket::build()
        .mount("/", routes![hello, json])
}
```

Run with:
```bash
cargo run
```

Visit `http://localhost:8000/`

---

## Core Concepts

### 1. Routing

**Basic Routes**
```rust
#[get("/")]
fn index() -> &'static str {
    "Home"
}

#[get("/users")]
fn list_users() -> &'static str {
    "List of users"
}

#[get("/users/<id>")]
fn get_user(id: u32) -> String {
    format!("User {}", id)
}

#[post("/users")]
fn create_user() -> &'static str {
    "User created"
}

#[put("/users/<id>")]
fn update_user(id: u32) -> String {
    format!("Updated user {}", id)
}

#[delete("/users/<id>")]
fn delete_user(id: u32) -> String {
    format!("Deleted user {}", id)
}

#[launch]
fn rocket() -> _ {
    rocket::build()
        .mount("/", routes![
            index,
            list_users,
            get_user,
            create_user,
            update_user,
            delete_user
        ])
}
```

**Route Parameters**
```rust
// Single parameter
#[get("/users/<id>")]
fn get_user(id: u32) -> String {
    format!("User {}", id)
}

// Multiple parameters
#[get("/posts/<post_id>/comments/<comment_id>")]
fn get_comment(post_id: u32, comment_id: u32) -> String {
    format!("Post {}, Comment {}", post_id, comment_id)
}

// Trailing segments
#[get("/files/<path..>")]
fn get_file(path: std::path::PathBuf) -> String {
    format!("File: {:?}", path)
}

// Multiple routes for same handler
#[get("/numbers/<n>")]
#[get("/numbers/?<n>")]
fn number(n: Option<u32>) -> String {
    match n {
        Some(n) => format!("Number: {}", n),
        None => "No number".to_string(),
    }
}
```

**Query Parameters**
```rust
use rocket::State;

// Optional query parameter
#[get("/search?<q>")]
fn search(q: Option<String>) -> String {
    match q {
        Some(query) => format!("Searching for: {}", query),
        None => "No query provided".to_string(),
    }
}

// Multiple query parameters
#[get("/filter?<sort>&<limit>")]
fn filter(sort: Option<String>, limit: Option<u32>) -> String {
    format!("Sort: {:?}, Limit: {:?}", sort, limit)
}
```

### 2. Request Guards

Request guards are type-safe request data extractors.

**Built-in Guards**
```rust
use rocket::State;
use rocket::request::{FromRequest, Outcome};
use rocket::http::{Status, Header};

#[get("/protected")]
fn protected(token: &str) -> String {
    format!("Token: {}", token)
}

// Path parameter
#[get("/users/<id>")]
fn user(id: u32) -> String {
    format!("User: {}", id)
}

// Query parameter
#[get("/search?<q>")]
fn search(q: String) -> String {
    format!("Search: {}", q)
}

// State guard
#[get("/state")]
fn access_state(state: &State<AppState>) -> String {
    format!("State: {}", state.value)
}
```

**Custom Request Guards**
```rust
use rocket::request::{self, FromRequest, Request};
use rocket::http::Status;
use rocket::outcome::Outcome;

// Authorization header
pub struct ApiKey(String);

#[rocket::async_trait]
impl<'r> FromRequest<'r> for ApiKey {
    type Error = ();

    async fn from_request(req: &'r Request<'_>) -> request::Outcome<Self, Self::Error> {
        match req.headers().get_one("x-api-key") {
            Some(key) if is_valid(key) => Outcome::Success(ApiKey(key.to_string())),
            Some(_) => Outcome::Error((Status::Unauthorized, ())),
            None => Outcome::Error((Status::BadRequest, ())),
        }
    }
}

fn is_valid(key: &str) -> bool {
    key == "valid-key"
}

#[get("/secure")]
fn secure(key: ApiKey) -> String {
    format!("Authorized with key: {}", key.0)
}
```

### 3. Request/Response

**Request Body**
```rust
use rocket::serde::json::Json;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
struct User {
    name: String,
    email: String,
}

#[post("/users", format = "json", data = "<user>")]
fn create_user(user: Json<User>) -> Json<User> {
    Json(user.into_inner())
}

#[post("/users", data = "<user>")]
fn create_user_form(user: Json<User>) -> String {
    format!("Created: {}", user.name)
}
```

**Responses**
```rust
use rocket::http::Status;
use rocket::response::Redirect;

// String response
#[get("/")]
fn hello() -> &'static str {
    "Hello"
}

// JSON response
#[get("/json")]
fn json() -> Json<serde_json::Value> {
    Json(json!({"message": "hello"}))
}

// Status response
#[post("/users")]
fn create() -> Status {
    Status::Created
}

// Status with body
#[post("/users", data = "<user>")]
fn create_user(user: Json<User>) -> (Status, Json<User>) {
    (Status::Created, user)
}

// Redirect
#[get("/redirect")]
fn redirect() -> Redirect {
    Redirect::to(uri!("/home"))
}

// Custom response
#[get("/custom")]
fn custom() -> Result<String, Status> {
    Ok("Success".to_string())
}
```

### 4. State Management

**Application State**
```rust
struct AppState {
    counter: std::sync::Mutex<i32>,
}

#[get("/increment")]
fn increment(state: &State<AppState>) -> String {
    let mut counter = state.counter.lock().unwrap();
    *counter += 1;
    format!("Count: {}", counter)
}

#[launch]
fn rocket() -> _ {
    rocket::build()
        .manage(AppState {
            counter: std::sync::Mutex::new(0),
        })
        .mount("/", routes![increment])
}
```

### 5. Fairings

Fairings are request/response hooks (similar to middleware).

```rust
use rocket::fairing::{Fairing, Info, Kind};
use rocket::request::Request;
use rocket::response::Response;

pub struct Timing;

#[rocket::async_trait]
impl Fairing for Timing {
    fn info(&self) -> Info {
        Info {
            name: "Request Timer",
            kind: Kind::Request | Kind::Response,
        }
    }

    async fn on_request(&self, req: &mut Request<'_>, _: &mut rocket::Data<'_>) {
        println!("Request: {}", req.uri());
    }

    async fn on_response<'r>(&self, req: &'r Request<'_>, _: &mut Response<'r>) {
        println!("Response sent for: {}", req.uri());
    }
}

#[launch]
fn rocket() -> _ {
    rocket::build()
        .attach(Timing)
        .mount("/", routes![index])
}
```

### 6. Forms and Validation

```rust
use rocket::form::Form;
use rocket::serde::{Deserialize, Serialize};

#[derive(FromForm)]
struct UserForm {
    name: String,
    email: String,
}

#[post("/users/form", data = "<form>")]
fn create_from_form(form: Form<UserForm>) -> String {
    format!("Created: {}", form.name)
}

// Validation
use rocket::form::Validate;

#[derive(FromForm)]
struct LoginForm {
    #[validate(len(1..))]
    username: String,
    #[validate(len(6..))]
    password: String,
}

#[post("/login", data = "<form>")]
fn login(form: Form<LoginForm>) -> String {
    format!("Logged in: {}", form.username)
}
```

### 7. Cookies

```rust
use rocket::http::Cookies;

#[get("/set-cookie")]
fn set_cookie(mut cookies: Cookies<'_>) -> String {
    cookies.add(rocket::http::Cookie::new("user_id", "123"));
    "Cookie set".to_string()
}

#[get("/get-cookie")]
fn get_cookie(cookies: Cookies<'_>) -> String {
    match cookies.get("user_id") {
        Some(cookie) => format!("User: {}", cookie.value()),
        None => "No cookie found".to_string(),
    }
}
```

---

## Full Example: RESTful API

```rust
#[macro_use]
extern crate rocket;

use rocket::serde::json::Json;
use serde::{Deserialize, Serialize};
use std::sync::Mutex;

#[derive(Serialize, Deserialize, Clone)]
struct User {
    id: u32,
    name: String,
    email: String,
}

struct AppState {
    users: Mutex<Vec<User>>,
}

// Get all users
#[get("/users")]
fn list_users(state: &State<AppState>) -> Json<Vec<User>> {
    let users = state.users.lock().unwrap();
    Json(users.clone())
}

// Get single user
#[get("/users/<id>")]
fn get_user(id: u32, state: &State<AppState>) -> Option<Json<User>> {
    let users = state.users.lock().unwrap();
    users
        .iter()
        .find(|u| u.id == id)
        .cloned()
        .map(Json)
}

// Create user
#[post("/users", format = "json", data = "<user>")]
fn create_user(
    user: Json<User>,
    state: &State<AppState>,
) -> (Status, Json<User>) {
    let mut users = state.users.lock().unwrap();
    let new_user = user.into_inner();
    users.push(new_user.clone());
    (Status::Created, Json(new_user))
}

// Update user
#[put("/users/<id>", format = "json", data = "<update>")]
fn update_user(
    id: u32,
    update: Json<User>,
    state: &State<AppState>,
) -> Option<Json<User>> {
    let mut users = state.users.lock().unwrap();
    if let Some(user) = users.iter_mut().find(|u| u.id == id) {
        *user = update.into_inner();
        return Some(Json(user.clone()));
    }
    None
}

// Delete user
#[delete("/users/<id>")]
fn delete_user(id: u32, state: &State<AppState>) -> Status {
    let mut users = state.users.lock().unwrap();
    if let Some(pos) = users.iter().position(|u| u.id == id) {
        users.remove(pos);
        Status::NoContent
    } else {
        Status::NotFound
    }
}

#[launch]
fn rocket() -> _ {
    rocket::build()
        .manage(AppState {
            users: Mutex::new(vec![]),
        })
        .mount("/api", routes![
            list_users,
            get_user,
            create_user,
            update_user,
            delete_user
        ])
}
```

---

## Testing

```rust
#[cfg(test)]
mod tests {
    use super::*;
    use rocket::local::blocking::Client;
    use rocket::http::Status;

    #[test]
    fn test_index() {
        let client = Client::tracked(rocket()).expect("valid rocket instance");
        let response = client.get("/").dispatch();
        assert_eq!(response.status(), Status::Ok);
    }

    #[test]
    fn test_create_user() {
        let client = Client::tracked(rocket()).expect("valid rocket instance");
        
        let response = client
            .post("/users")
            .header(rocket::http::ContentType::JSON)
            .body(r#"{"id":1,"name":"John","email":"john@example.com"}"#)
            .dispatch();

        assert_eq!(response.status(), Status::Created);
    }
}
```

---

## Project Structure

```
my-rocket-app/
├── src/
│   ├── main.rs             # Entry point
│   ├── routes/
│   │   ├── users.rs
│   │   └── mod.rs
│   ├── models/
│   │   ├── user.rs
│   │   └── mod.rs
│   ├── state.rs            # Application state
│   └── lib.rs
├── tests/
│   └── integration_tests.rs
├── Cargo.toml
├── Rocket.toml             # Configuration
└── README.md
```

---

## Configuration

**Rocket.toml**
```toml
[default]
address = "127.0.0.1"
port = 8000
log_level = "normal"

[debug]
address = "127.0.0.1"
port = 8000

[release]
address = "0.0.0.0"
port = 8000
log_level = "critical"
```

---

## Best Practices

### 1. Error Handling
```rust
#[derive(Responder)]
enum ApiError {
    #[response(status = 404, content_type = "json")]
    NotFound(String),
    #[response(status = 400, content_type = "json")]
    BadRequest(String),
}

#[get("/users/<id>")]
fn get_user(id: u32) -> Result<Json<User>, ApiError> {
    if id == 0 {
        return Err(ApiError::BadRequest("Invalid ID".to_string()));
    }
    
    // Find user...
    Err(ApiError::NotFound("User not found".to_string()))
}
```

### 2. Organized Routes
```rust
// routes/users.rs
use rocket::{State, serde::json::Json, http::Status};

#[get("/users")]
pub fn list_users(state: &State<AppState>) -> Json<Vec<User>> {
    // Implementation
}

// routes/mod.rs
pub mod users;

// main.rs
mod routes;
use routes::users;

#[launch]
fn rocket() -> _ {
    rocket::build()
        .mount("/api", routes![users::list_users])
}
```

---

## Useful Resources

- **Official Docs**: https://rocket.rs
- **GitHub**: https://github.com/SergioBenitez/Rocket
- **API Docs**: https://docs.rs/rocket
- **Examples**: https://github.com/SergioBenitez/Rocket/tree/master/examples
- **Guide**: https://rocket.rs/guide

---

**Status**: ✅ Complete  
**Last Updated**: January 2025  
**Version**: 1.0

