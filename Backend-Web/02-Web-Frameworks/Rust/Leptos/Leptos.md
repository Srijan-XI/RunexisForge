# Leptos

## Introduction

## Table of Contents
1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Getting Started](#getting-started)
4. [Components](#components)
5. [Signals and Reactivity](#signals-and-reactivity)
6. [Server Functions](#server-functions)
7. [Routing](#routing)
8. [Forms](#forms)
9. [Error Handling](#error-handling)
10. [Database Integration](#database-integration)
11. [Styling](#styling)
12. [Performance](#performance)
13. [Testing](#testing)
14. [Deployment](#deployment)
15. [Resources](#resources)

---

## Introduction

Leptos is a full-stack web framework for Rust combining server and client rendering with powerful reactive systems. It enables building interactive web applications without JavaScript.

### Key Features
- **Full-stack in Rust**: Server and client in same language
- **Server-side rendering**: Automatic SSR with hydration
- **Reactive system**: Fine-grained reactivity tracking
- **Type-safe routing**: Compile-time checked routes
- **Zero-cost abstractions**: Compiles to optimized WASM
- **Server functions**: RPC-like async functions
- **Async support**: Full async/await support
- **Component-based**: Composable reactive components

### Why Leptos?
- Build web apps entirely in Rust
- Excellent performance (WASM-based)
- Type-safety across full stack
- Reactive without framework overhead
- Server and client in same codebase
- Small bundle sizes

---

## Installation

### Prerequisites
```bash
# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Add WASM target
rustup target add wasm32-unknown-unknown

# Install cargo-leptos
cargo install cargo-leptos
```

### Create Project
```bash
cargo leptos new my-app
cd my-app
cargo leptos watch
```

### Project Structure
```
my-app/
├── src/
│   ├── main.rs           # Entry point
│   ├── lib.rs            # Library code
│   ├── app.rs            # App component
│   └── components/       # Components
├── Cargo.toml
├── Cargo.lock
└── style/
    └── main.scss         # Styles
```

---

## Getting Started

### Hello World
Create `src/app.rs`:
```rust
use leptos::*;

#[component]
pub fn App() -> impl IntoView {
    view! {
        <h1>"Hello, World!"</h1>
        <p>"Welcome to Leptos"</p>
    }
}
```

Create `src/main.rs`:
```rust
use leptos::*;

mod app;
use app::App;

fn main() {
    mount_to_body(|| view! { <App/> })
}
```

### Basic Component
```rust
#[component]
pub fn Welcome() -> impl IntoView {
    view! {
        <div>
            <h1>"Welcome"</h1>
            <p>"This is a Leptos component"</p>
        </div>
    }
}
```

---

## Components

### Function Components
```rust
#[component]
pub fn Greeting(name: String) -> impl IntoView {
    view! {
        <div>
            <p>"Hello, " {name}</p>
        </div>
    }
}

// Usage
view! {
    <Greeting name="Alice".to_string() />
}
```

### Components with Props
```rust
#[derive(Clone)]
pub struct ButtonProps {
    pub label: String,
    pub on_click: Callback<MouseEvent>,
}

#[component]
pub fn Button(props: ButtonProps) -> impl IntoView {
    view! {
        <button on:click=move |e| props.on_click.call(e)>
            {props.label}
        </button>
    }
}

// Or with attributes
#[component]
pub fn Card(
    #[prop(default = "white".to_string())]
    bg_color: String,
    children: Children,
) -> impl IntoView {
    view! {
        <div style:background-color=bg_color>
            {children()}
        </div>
    }
}
```

### Reusable Components
```rust
#[component]
pub fn List<T: IntoView + 'static>(
    items: Vec<String>,
    render: fn(String) -> T,
) -> impl IntoView {
    view! {
        <ul>
            {items
                .into_iter()
                .map(|item| view! {
                    <li>{render(item)}</li>
                })
                .collect_view()}
        </ul>
    }
}
```

---

## Signals and Reactivity

### Creating Signals
```rust
use leptos::*;

#[component]
pub fn Counter() -> impl IntoView {
    let (count, set_count) = create_signal(0);

    view! {
        <div>
            <p>"Count: " {count}</p>
            <button on:click=move |_| set_count.set(count.get() + 1)>
                "Increment"
            </button>
            <button on:click=move |_| set_count.set(count.get() - 1)>
                "Decrement"
            </button>
        </div>
    }
}
```

### Derived Signals
```rust
#[component]
pub fn Doubled() -> impl IntoView {
    let (count, set_count) = create_signal(5);
    let doubled = move || count.get() * 2;

    view! {
        <div>
            <p>"Count: " {count}</p>
            <p>"Doubled: " {doubled}</p>
            <button on:click=move |_| set_count.set(count.get() + 1)>
                "Increment"
            </button>
        </div>
    }
}
```

### Effects
```rust
#[component]
pub fn EffectExample() -> impl IntoView {
    let (count, set_count) = create_signal(0);

    // Runs whenever count changes
    create_effect(move |_| {
        println!("Count changed to: {}", count.get());
    });

    view! {
        <div>
            <p>"Count: " {count}</p>
            <button on:click=move |_| set_count.set(count.get() + 1)>
                "Increment"
            </button>
        </div>
    }
}
```

### Memos
```rust
#[component]
pub fn ExpensiveComputation() -> impl IntoView {
    let (input, set_input) = create_signal(String::new());
    
    let computed = create_memo(move |_| {
        // Only recomputes when input changes
        expensive_operation(input.get())
    });

    view! {
        <div>
            <input
                on:input=move |ev| set_input(event_target_value(&ev))
                value=input
            />
            <p>"Result: " {computed}</p>
        </div>
    }
}

fn expensive_operation(input: String) -> String {
    // Simulate expensive computation
    input.to_uppercase()
}
```

---

## Server Functions

### Defining Server Functions
```rust
#[server(GetUser)]
pub async fn get_user(id: u32) -> Result<String, ServerFnError> {
    // This runs on the server
    Ok(format!("User {}", id))
}

#[component]
pub fn UserComponent() -> impl IntoView {
    let user_resource = create_resource(
        || (),
        |_| get_user(1),
    );

    view! {
        <Suspense fallback=move || view! { <p>"Loading..."</p> }>
            {move || {
                user_resource.with(|user| {
                    match user {
                        Some(Ok(u)) => view! { <p>{u}</p> },
                        Some(Err(e)) => view! { <p>"Error: " {e.to_string()}</p> },
                        None => view! { <p>"Loading..."</p> },
                    }
                })
            }}
        </Suspense>
    }
}
```

### Server Function with Parameters
```rust
#[derive(serde::Serialize, serde::Deserialize, Clone)]
pub struct User {
    pub id: u32,
    pub name: String,
    pub email: String,
}

#[server(CreateUser)]
pub async fn create_user(user: User) -> Result<User, ServerFnError> {
    // Save to database
    Ok(user)
}

#[component]
pub fn CreateUserForm() -> impl IntoView {
    let (name, set_name) = create_signal(String::new());
    let (email, set_email) = create_signal(String::new());

    let create_action = create_action(|user: &User| {
        let user = user.clone();
        async move { create_user(user).await }
    });

    view! {
        <form on:submit=move |ev| {
            ev.prevent_default();
            let user = User {
                id: 0,
                name: name.get(),
                email: email.get(),
            };
            create_action.dispatch(user);
        }>
            <input
                on:input=move |ev| set_name(event_target_value(&ev))
                placeholder="Name"
            />
            <input
                on:input=move |ev| set_email(event_target_value(&ev))
                placeholder="Email"
            />
            <button type="submit">"Create"</button>
        </form>
    }
}
```

---

## Routing

### Setting Up Router
Create `src/lib.rs`:
```rust
use leptos::*;
use leptos_router::*;

mod app;
mod pages;

pub fn shell() -> impl IntoView {
    view! {
        <Router>
            <Routes>
                <Route path="" view=pages::Home />
                <Route path="about" view=pages::About />
                <Route path="users/:id" view=pages::User />
                <Route path="*" view=pages::NotFound />
            </Routes>
        </Router>
    }
}
```

### Page Components
Create `src/pages/mod.rs`:
```rust
use leptos::*;
use leptos_router::*;

#[component]
pub fn Home() -> impl IntoView {
    view! {
        <div>
            <h1>"Home"</h1>
            <nav>
                <a href="/about">"About"</a>
                <a href="/users/1">"User 1"</a>
            </nav>
        </div>
    }
}

#[component]
pub fn About() -> impl IntoView {
    view! {
        <div>
            <h1>"About"</h1>
            <a href="/">"Back Home"</a>
        </div>
    }
}

#[component]
pub fn User() -> impl IntoView {
    let params = use_params_map();
    let id = move || {
        params.with(|params| {
            params.get("id").cloned().unwrap_or_default()
        })
    };

    view! {
        <div>
            <h1>"User " {id}</h1>
        </div>
    }
}

#[component]
pub fn NotFound() -> impl IntoView {
    view! {
        <div>
            <h1>"404 - Not Found"</h1>
        </div>
    }
}
```

---

## Forms

### Simple Form
```rust
#[component]
pub fn ContactForm() -> impl IntoView {
    let (name, set_name) = create_signal(String::new());
    let (email, set_email) = create_signal(String::new());
    let (message, set_message) = create_signal(String::new());

    let handle_submit = move |ev: SubmitEvent| {
        ev.prevent_default();
        
        let form_data = format!(
            "Name: {}, Email: {}, Message: {}",
            name.get(),
            email.get(),
            message.get()
        );
        
        logging::log!("{}", form_data);
    };

    view! {
        <form on:submit=handle_submit>
            <input
                type="text"
                placeholder="Name"
                on:input=move |ev| set_name(event_target_value(&ev))
                value=name
            />
            <input
                type="email"
                placeholder="Email"
                on:input=move |ev| set_email(event_target_value(&ev))
                value=email
            />
            <textarea
                placeholder="Message"
                on:input=move |ev| set_message(event_target_value(&ev))
            >
                {message}
            </textarea>
            <button type="submit">"Send"</button>
        </form>
    }
}
```

### Form with Validation
```rust
#[component]
pub fn ValidatedForm() -> impl IntoView {
    let (email, set_email) = create_signal(String::new());
    let (errors, set_errors) = create_signal(Vec::<String>::new());

    let validate_email = move |email: &str| -> Vec<String> {
        let mut errs = vec![];
        
        if email.is_empty() {
            errs.push("Email is required".to_string());
        } else if !email.contains('@') {
            errs.push("Invalid email format".to_string());
        }
        
        errs
    };

    let handle_input = move |ev| {
        let value = event_target_value(&ev);
        set_email(value.clone());
        set_errors(validate_email(&value));
    };

    view! {
        <div>
            <input
                type="email"
                on:input=handle_input
                value=email
            />
            {move || {
                errors.with(|errs| {
                    if errs.is_empty() {
                        view! { <p class="success">"Valid!"</p> }
                    } else {
                        view! {
                            <ul class="errors">
                                {errs.iter().map(|err| view! {
                                    <li>{err}</li>
                                }).collect_view()}
                            </ul>
                        }
                    }
                })
            }}
        </div>
    }
}
```

---

## Error Handling

### Result Type
```rust
#[server(FetchData)]
pub async fn fetch_data(id: u32) -> Result<String, ServerFnError> {
    if id == 0 {
        return Err(ServerFnError::new("Invalid ID"));
    }

    Ok(format!("Data for ID: {}", id))
}

#[component]
pub fn DataComponent() -> impl IntoView {
    let data_resource = create_resource(
        || (),
        |_| fetch_data(1),
    );

    view! {
        {move || {
            data_resource.with(|data| {
                match data {
                    Some(Ok(d)) => view! { <p>{d}</p> },
                    Some(Err(e)) => view! { <p style:color="red">"Error: " {e.to_string()}</p> },
                    None => view! { <p>"Loading..."</p> },
                }
            })
        }}
    }
}
```

---

## Database Integration

### SQLx Example
Add to `Cargo.toml`:
```toml
[dependencies]
sqlx = { version = "0.7", features = ["runtime-tokio-native-tls", "sqlite"] }
```

Create database functions:
```rust
use sqlx::sqlite::SqlitePool;

#[derive(serde::Serialize, serde::Deserialize, Clone)]
pub struct User {
    pub id: i32,
    pub name: String,
    pub email: String,
}

#[server(GetUser)]
pub async fn get_user(id: i32) -> Result<User, ServerFnError> {
    let pool = SqlitePool::connect("sqlite:database.db").await
        .map_err(|e| ServerFnError::new(e.to_string()))?;

    let user = sqlx::query_as::<_, User>(
        "SELECT id, name, email FROM users WHERE id = ?"
    )
    .bind(id)
    .fetch_one(&pool)
    .await
    .map_err(|e| ServerFnError::new(e.to_string()))?;

    Ok(user)
}
```

---

## Styling

### Inline Styles
```rust
view! {
    <div style:background-color="lightblue" style:padding="20px">
        <p style:color="blue">"Styled text"</p>
    </div>
}
```

### CSS Classes
```rust
#[component]
pub fn Styled() -> impl IntoView {
    let (theme, set_theme) = create_signal("light");

    view! {
        <div class=move || {
            if theme.get() == "light" {
                "light-theme"
            } else {
                "dark-theme"
            }
        }>
            <p>"Themed content"</p>
        </div>
    }
}
```

---

## Performance

### Code Splitting
```rust
#[component]
pub fn App() -> impl IntoView {
    view! {
        <Suspense fallback=move || view! { <p>"Loading..."</p> }>
            <HeavyComponent />
        </Suspense>
    }
}
```

### Memoization
```rust
let cached = create_memo(move |_| {
    expensive_computation(input.get())
});
```

---

## Testing

### Unit Tests
```rust
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_computation() {
        let result = expensive_computation("hello".to_string());
        assert_eq!(result, "HELLO");
    }
}
```

---

## Deployment

### Build for Production
```bash
cargo leptos build --release
```

### Deploy to Netlify
Create `netlify.toml`:
```toml
[build]
command = "cargo leptos build --release"
publish = "target/site"
```

---

## Best Practices

### 1. Component Organization
```rust
// components/ui/button.rs
#[component]
pub fn Button(label: String) -> impl IntoView {
    view! {
        <button>{label}</button>
    }
}

// components/forms/contact.rs
#[component]
pub fn ContactForm() -> impl IntoView {
    view! {
        <form>
            // Form content
        </form>
    }
}
```

### 2. Separation of Concerns
- Components for UI
- Server functions for backend
- Utilities for shared logic

---

## Resources

### Official Documentation
- [Leptos Book](https://leptos.dev)
- [Leptos GitHub](https://github.com/leptos-rs/leptos)

### Learning
- [Leptos Examples](https://github.com/leptos-rs/leptos/tree/main/examples)
- [Rust Web Dev](https://www.rust-lang.org/what/wasm/)

---

## Summary

Leptos enables building full-stack web applications entirely in Rust with excellent performance and type safety.

✅ Full-stack in Rust  
✅ Server-side rendering  
✅ Reactive system  
✅ Type-safe  
✅ Zero-cost abstractions  
✅ WASM-based  

Perfect for developers wanting maximum type safety and performance.

**Happy building with Leptos! 🦀**

