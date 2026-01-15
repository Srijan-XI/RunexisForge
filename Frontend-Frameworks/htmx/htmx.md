# htmx - High Power Tools for HTML

## Table of Contents
- [Introduction](#introduction)
- [Core Concepts](#core-concepts)
- [Installation & Setup](#installation--setup)
- [AJAX Requests](#ajax-requests)
- [Attributes](#attributes)
- [Triggers](#triggers)
- [Targets & Swapping](#targets--swapping)
- [CSS Transitions](#css-transitions)
- [WebSockets & SSE](#websockets--sse)
- [Extensions](#extensions)
- [Advanced Patterns](#advanced-patterns)
- [Backend Integration](#backend-integration)
- [Real-World Examples](#real-world-examples)
- [Best Practices](#best-practices)

---

## Introduction

### What is htmx?

htmx is a library that allows you to access modern browser features directly from HTML, without using JavaScript. It extends HTML with attributes that enable AJAX requests, CSS transitions, WebSockets, and Server Sent Events directly in your markup.

**Key Features:**
- **No JavaScript Required**: Interactivity via HTML attributes
- **Tiny Size**: ~14KB minified and gzipped
- **HATEOAS/REST**: Embraces hypermedia as the engine of application state
- **Progressive Enhancement**: Works without JavaScript enabled
- **Framework Agnostic**: Works with any backend
- **Dependency Free**: No framework dependencies

### Why htmx?

**Traditional Approach:**
```javascript
// JavaScript required for simple AJAX
fetch('/api/data')
    .then(response => response.text())
    .then(html => {
        document.getElementById('target').innerHTML = html
    })
```

**htmx Approach:**
```html
<!-- Pure HTML, no JavaScript -->
<button hx-get="/api/data" hx-target="#target">
    Load Data
</button>
<div id="target"></div>
```

### Philosophy: Hypermedia-Driven Applications

htmx embraces the original vision of the web where the server sends HTML (hypermedia) and the browser renders it. This approach:
- Reduces JavaScript complexity
- Improves server-side rendering
- Simplifies state management
- Enables progressive enhancement
- Reduces frontend/backend coupling

### htmx vs Other Approaches

| Approach | JavaScript | Backend Returns | State Management |
|----------|-----------|-----------------|------------------|
| **htmx** | Minimal | HTML | Server-side |
| **SPA (React/Vue)** | Heavy | JSON | Client-side |
| **jQuery** | Medium | HTML/JSON | Mixed |
| **Turbo/Hotwire** | Minimal | HTML | Server-side |

---

## Core Concepts

### AJAX with Attributes

htmx allows any element to issue AJAX requests:

```html
<!-- GET request -->
<button hx-get="/api/users">Load Users</button>

<!-- POST request -->
<button hx-post="/api/users">Create User</button>

<!-- PUT request -->
<button hx-put="/api/users/1">Update User</button>

<!-- DELETE request -->
<button hx-delete="/api/users/1">Delete User</button>

<!-- PATCH request -->
<button hx-patch="/api/users/1">Patch User</button>
```

### Triggering Events

Control when requests are made:

```html
<!-- On click (default for buttons) -->
<button hx-get="/data" hx-trigger="click">Click Me</button>

<!-- On change (default for inputs) -->
<input hx-get="/search" hx-trigger="change">

<!-- On custom event -->
<div hx-get="/data" hx-trigger="myEvent">Div</div>

<!-- Multiple triggers -->
<input hx-get="/search" hx-trigger="keyup changed delay:500ms">
```

### Targeting Elements

Specify where the response should go:

```html
<!-- Target by ID -->
<button hx-get="/data" hx-target="#result">Load</button>
<div id="result"></div>

<!-- Target by CSS selector -->
<button hx-get="/data" hx-target=".content">Load</button>

<!-- Special targets -->
<button hx-get="/data" hx-target="this">Replace Self</button>
<button hx-get="/data" hx-target="closest div">Closest Div</button>
```

### Swapping Strategies

Control how content is inserted:

```html
<!-- Replace inner HTML (default) -->
<div hx-get="/data" hx-swap="innerHTML"></div>

<!-- Replace outer HTML -->
<div hx-get="/data" hx-swap="outerHTML"></div>

<!-- Insert before -->
<div hx-get="/data" hx-swap="beforebegin"></div>

<!-- Insert after -->
<div hx-get="/data" hx-swap="afterend"></div>

<!-- Append to end -->
<div hx-get="/data" hx-swap="beforeend"></div>

<!-- Prepend to beginning -->
<div hx-get="/data" hx-swap="afterbegin"></div>

<!-- Delete the element -->
<div hx-delete="/item" hx-swap="delete"></div>

<!-- Don't swap, just send request -->
<div hx-post="/log" hx-swap="none"></div>
```

---

## Installation & Setup

### CDN Installation

**Latest Version:**
```html
<!DOCTYPE html>
<html>
<head>
    <title>htmx App</title>
</head>
<body>
    <button hx-get="/hello" hx-target="#result">
        Say Hello
    </button>
    <div id="result"></div>
    
    <!-- htmx CDN -->
    <script src="https://unpkg.com/htmx.org@1.9.10"></script>
</body>
</html>
```

**Specific Version:**
```html
<script src="https://unpkg.com/htmx.org@1.9.10/dist/htmx.min.js"></script>
```

**Integrity Hash:**
```html
<script 
    src="https://unpkg.com/htmx.org@1.9.10" 
    integrity="sha384-D1Kt99CQMDuVetoL1lrYwg5t+9QdHe7NLX/SoJYkXDFfX37iInKRy5xLSi8nO7UC" 
    crossorigin="anonymous">
</script>
```

### NPM Installation

```bash
npm install htmx.org
```

**Import in JavaScript:**
```javascript
import 'htmx.org'
```

**Webpack/Vite:**
```javascript
// main.js
import 'htmx.org'
```

### Download and Self-Host

```bash
# Download
curl -O https://unpkg.com/htmx.org@1.9.10/dist/htmx.min.js

# Or use npm
npm install htmx.org
cp node_modules/htmx.org/dist/htmx.min.js public/js/
```

```html
<script src="/js/htmx.min.js"></script>
```

### Configuration

```html
<script>
    htmx.config.historyCacheSize = 20;
    htmx.config.timeout = 120000; // 2 minutes
    htmx.config.defaultSwapStyle = 'innerHTML';
    htmx.config.defaultSwapDelay = 0;
    htmx.config.defaultSettleDelay = 20;
    htmx.config.includeIndicatorStyles = true;
</script>
```

---

## AJAX Requests

### GET Requests

```html
<!-- Simple GET -->
<button hx-get="/api/users" hx-target="#users">
    Load Users
</button>
<div id="users"></div>

<!-- With query parameters -->
<button hx-get="/api/search?q=htmx" hx-target="#results">
    Search
</button>

<!-- Form data as query params -->
<form hx-get="/search">
    <input name="q" type="text">
    <button type="submit">Search</button>
</form>
```

### POST Requests

```html
<!-- Form POST -->
<form hx-post="/api/users" hx-target="#result">
    <input name="name" type="text" required>
    <input name="email" type="email" required>
    <button type="submit">Create User</button>
</form>
<div id="result"></div>

<!-- Button POST with form data -->
<div hx-target="#response">
    <input name="message" type="text" id="msg">
    <button 
        hx-post="/api/messages" 
        hx-include="#msg">
        Send
    </button>
</div>
```

### PUT/PATCH Requests

```html
<!-- Update resource -->
<form hx-put="/api/users/123" hx-target="#user-123">
    <input name="name" value="John Doe">
    <input name="email" value="john@example.com">
    <button type="submit">Update</button>
</form>

<!-- Partial update -->
<button 
    hx-patch="/api/users/123"
    hx-vals='{"status": "active"}'
    hx-target="#user-status">
    Activate User
</button>
```

### DELETE Requests

```html
<!-- Delete with confirmation -->
<button 
    hx-delete="/api/users/123"
    hx-confirm="Are you sure you want to delete this user?"
    hx-target="closest tr"
    hx-swap="outerHTML swap:1s">
    Delete User
</button>

<!-- Soft delete -->
<button 
    hx-delete="/api/users/123"
    hx-swap="none"
    hx-on="htmx:afterRequest: this.closest('tr').classList.add('deleted')">
    Archive
</button>
```

### Request Headers

```html
<!-- Custom headers -->
<button 
    hx-post="/api/data"
    hx-headers='{"X-Custom-Header": "value"}'>
    Send with Header
</button>

<!-- CSRF token -->
<button 
    hx-post="/api/data"
    hx-headers='{"X-CSRFToken": "token-value"}'>
    Protected Request
</button>
```

### Including Data

```html
<!-- Include specific elements -->
<div>
    <input id="username" name="username">
    <input id="password" name="password">
    <button 
        hx-post="/login"
        hx-include="#username, #password">
        Login
    </button>
</div>

<!-- Include closest form -->
<input name="search">
<button hx-get="/search" hx-include="closest form">
    Search
</button>

<!-- Extra values -->
<button 
    hx-post="/api/vote"
    hx-vals='{"item_id": "123", "direction": "up"}'>
    Upvote
</button>

<!-- Dynamic values with JavaScript -->
<button 
    hx-post="/api/data"
    hx-vals='js:{timestamp: Date.now()}'>
    Submit
</button>
```

---

## Attributes

### Core Attributes

**hx-get, hx-post, hx-put, hx-delete, hx-patch**
```html
<button hx-get="/data">GET</button>
<button hx-post="/data">POST</button>
<button hx-put="/data">PUT</button>
<button hx-delete="/data">DELETE</button>
<button hx-patch="/data">PATCH</button>
```

**hx-trigger**
```html
<!-- Event triggers -->
<div hx-get="/data" hx-trigger="click">Click</div>
<div hx-get="/data" hx-trigger="mouseenter">Hover</div>
<input hx-get="/data" hx-trigger="keyup">

<!-- With modifiers -->
<div hx-get="/data" hx-trigger="click once">Once</div>
<div hx-get="/data" hx-trigger="click changed">Changed</div>
<input hx-get="/search" hx-trigger="keyup changed delay:500ms">

<!-- Load trigger -->
<div hx-get="/data" hx-trigger="load">Load on mount</div>
<div hx-get="/data" hx-trigger="load delay:1s">Delayed load</div>

<!-- Revealed trigger -->
<div hx-get="/data" hx-trigger="revealed">Load when visible</div>

<!-- Polling -->
<div hx-get="/updates" hx-trigger="every 2s">Poll every 2s</div>

<!-- Multiple triggers -->
<div hx-get="/data" hx-trigger="click, keyup delay:500ms">
    Multiple
</div>
```

**hx-target**
```html
<!-- CSS selectors -->
<button hx-get="/data" hx-target="#result">By ID</button>
<button hx-get="/data" hx-target=".content">By Class</button>
<button hx-get="/data" hx-target="[data-content]">By Attribute</button>

<!-- Relative selectors -->
<button hx-get="/data" hx-target="this">This Element</button>
<button hx-get="/data" hx-target="closest div">Closest Div</button>
<button hx-get="/data" hx-target="next div">Next Sibling</button>
<button hx-get="/data" hx-target="previous div">Previous Sibling</button>
<button hx-get="/data" hx-target="find .result">Child Element</button>
```

**hx-swap**
```html
<!-- Swap strategies -->
<div hx-swap="innerHTML">Default</div>
<div hx-swap="outerHTML">Replace element</div>
<div hx-swap="beforebegin">Before element</div>
<div hx-swap="afterbegin">First child</div>
<div hx-swap="beforeend">Last child</div>
<div hx-swap="afterend">After element</div>
<div hx-swap="delete">Remove element</div>
<div hx-swap="none">No swap</div>

<!-- With modifiers -->
<div hx-swap="innerHTML swap:1s">With 1s swap delay</div>
<div hx-swap="innerHTML settle:200ms">With settle time</div>
<div hx-swap="innerHTML scroll:top">Scroll to top</div>
<div hx-swap="innerHTML scroll:bottom">Scroll to bottom</div>
<div hx-swap="innerHTML show:top">Show at top</div>
<div hx-swap="innerHTML focus-scroll:true">Focus scroll</div>
```

**hx-vals**
```html
<!-- Static JSON -->
<button hx-post="/vote" hx-vals='{"answer": "yes"}'>Yes</button>

<!-- Dynamic with JavaScript -->
<button hx-post="/data" hx-vals='js:{
    timestamp: Date.now(),
    random: Math.random()
}'>Submit</button>
```

**hx-confirm**
```html
<button 
    hx-delete="/users/123"
    hx-confirm="Are you sure?">
    Delete
</button>
```

**hx-include**
```html
<!-- Include other form fields -->
<input id="field1" name="field1">
<input id="field2" name="field2">
<button hx-post="/submit" hx-include="#field1, #field2">
    Submit
</button>

<!-- Include parent form -->
<form>
    <input name="name">
    <button hx-post="/submit" hx-include="closest form">
        Submit
    </button>
</form>
```

### Control Attributes

**hx-boost**
```html
<!-- Boost all links and forms in section -->
<div hx-boost="true">
    <a href="/page1">Page 1</a>
    <a href="/page2">Page 2</a>
    <form action="/search" method="get">
        <input name="q">
        <button>Search</button>
    </form>
</div>
```

**hx-push-url**
```html
<!-- Push to history -->
<button hx-get="/page" hx-push-url="true">Navigate</button>

<!-- Custom URL -->
<button hx-get="/data" hx-push-url="/custom-url">Navigate</button>
```

**hx-select**
```html
<!-- Select portion of response -->
<button 
    hx-get="/page"
    hx-select="#main-content"
    hx-target="#content">
    Load Content
</button>
```

**hx-select-oob**
```html
<!-- Select and swap out-of-band -->
<button 
    hx-get="/data"
    hx-select="#main"
    hx-select-oob="#sidebar, #header">
    Load
</button>
```

**hx-preserve**
```html
<!-- Preserve element across swaps -->
<div id="video-player" hx-preserve="true">
    <video src="/video.mp4"></video>
</div>
```

**hx-indicator**
```html
<!-- Show loading indicator -->
<button hx-get="/data" hx-indicator="#spinner">
    Load
</button>
<div id="spinner" class="htmx-indicator">Loading...</div>

<style>
.htmx-indicator {
    display: none;
}
.htmx-request .htmx-indicator,
.htmx-request.htmx-indicator {
    display: inline;
}
</style>
```

---

## Triggers

### Event Triggers

```html
<!-- Standard events -->
<div hx-get="/data" hx-trigger="click">Click</div>
<div hx-get="/data" hx-trigger="mouseenter">Mouse Enter</div>
<div hx-get="/data" hx-trigger="focus">Focus</div>
<input hx-get="/data" hx-trigger="keyup">Key Up</input>
<input hx-get="/data" hx-trigger="change">Change</input>

<!-- Form events -->
<form hx-post="/submit" hx-trigger="submit">
    <button type="submit">Submit</button>
</form>
```

### Trigger Modifiers

```html
<!-- Once -->
<div hx-get="/data" hx-trigger="click once">
    Click once
</div>

<!-- Changed (only if value changed) -->
<input hx-get="/search" hx-trigger="keyup changed">

<!-- Delay -->
<input hx-get="/search" hx-trigger="keyup delay:500ms">

<!-- Throttle -->
<div hx-get="/data" hx-trigger="scroll throttle:100ms">
    Scroll
</div>

<!-- From (listen on other element) -->
<input id="search">
<div hx-get="/results" hx-trigger="keyup from:#search delay:500ms">
    Results
</div>

<!-- Consume (prevent event bubbling) -->
<div hx-get="/data" hx-trigger="click consume">
    Click
</div>

<!-- Target (filter by event target) -->
<div hx-get="/data" hx-trigger="click target:.btn">
    <button class="btn">Click Me</button>
</div>
```

### Special Triggers

```html
<!-- Load (when element loads) -->
<div hx-get="/data" hx-trigger="load">
    Loads immediately
</div>

<!-- Revealed (when scrolled into view) -->
<div hx-get="/data" hx-trigger="revealed">
    Infinite scroll
</div>

<!-- Intersect (when element intersects viewport) -->
<div hx-get="/data" hx-trigger="intersect once">
    Load when visible
</div>

<!-- Every (polling) -->
<div hx-get="/updates" hx-trigger="every 5s">
    Poll every 5 seconds
</div>

<!-- Condition with every -->
<div hx-get="/updates" hx-trigger="every 2s [document.hasFocus()]">
    Poll only when page has focus
</div>
```

### Custom Events

```html
<!-- Listen for custom event -->
<div hx-get="/data" hx-trigger="customEvent">
    Listens for customEvent
</div>

<!-- Trigger custom event -->
<button onclick="htmx.trigger('#target', 'customEvent')">
    Trigger
</button>

<!-- Or with hx-on -->
<button hx-on:click="htmx.trigger('#target', 'customEvent')">
    Trigger
</button>
```

---

## Targets & Swapping

### Target Selectors

```html
<!-- ID selector -->
<button hx-get="/data" hx-target="#content">Load</button>

<!-- Class selector -->
<button hx-get="/data" hx-target=".content">Load</button>

<!-- Attribute selector -->
<button hx-get="/data" hx-target="[data-result]">Load</button>

<!-- Multiple selectors -->
<button hx-get="/data" hx-target="#main, .sidebar">Load</button>
```

### Relative Targets

```html
<!-- This element -->
<button hx-get="/refresh" hx-target="this">
    Refresh Self
</button>

<!-- Closest ancestor -->
<div class="card">
    <button hx-get="/card" hx-target="closest .card">
        Refresh Card
    </button>
</div>

<!-- Next sibling -->
<button hx-get="/data" hx-target="next div">Load Next</button>

<!-- Previous sibling -->
<button hx-get="/data" hx-target="previous div">Load Previous</button>

<!-- Find descendant -->
<div>
    <button hx-get="/data" hx-target="find .result">Load</button>
    <div class="result"></div>
</div>
```

### Swap Strategies

```html
<!-- innerHTML (default) -->
<div hx-get="/content" hx-swap="innerHTML">
    Content replaced
</div>

<!-- outerHTML -->
<div hx-get="/card" hx-swap="outerHTML">
    Entire element replaced
</div>

<!-- beforebegin -->
<div>
    <button hx-get="/item" hx-swap="beforebegin">
        Add Before
    </button>
</div>
<!-- Result: <new-item></new-item><div>...</div> -->

<!-- afterbegin -->
<ul>
    <button hx-get="/item" hx-swap="afterbegin">
        Prepend
    </button>
</ul>
<!-- Result: <ul><new-item></new-item>...</ul> -->

<!-- beforeend -->
<ul>
    <button hx-get="/item" hx-swap="beforeend">
        Append
    </button>
</ul>
<!-- Result: <ul>...<new-item></new-item></ul> -->

<!-- afterend -->
<div>
    <button hx-get="/item" hx-swap="afterend">
        Add After
    </button>
</div>
<!-- Result: <div>...</div><new-item></new-item> -->

<!-- delete -->
<div hx-delete="/item/123" hx-swap="delete">
    Delete Me
</div>

<!-- none -->
<button hx-post="/log" hx-swap="none">
    Log (no UI update)
</button>
```

### Swap Modifiers

```html
<!-- Transition duration -->
<div hx-swap="innerHTML swap:1s">1 second swap</div>

<!-- Settle duration -->
<div hx-swap="innerHTML settle:500ms">500ms settle</div>

<!-- Scroll behavior -->
<div hx-swap="innerHTML scroll:top">Scroll to top</div>
<div hx-swap="innerHTML scroll:bottom">Scroll to bottom</div>

<!-- Show behavior -->
<div hx-swap="innerHTML show:top">Show at top of viewport</div>
<div hx-swap="innerHTML show:bottom">Show at bottom</div>

<!-- Focus scroll -->
<div hx-swap="innerHTML focus-scroll:true">Auto-scroll to focus</div>

<!-- Multiple modifiers -->
<div hx-swap="innerHTML swap:500ms settle:200ms scroll:top">
    Combined
</div>
```

### Out of Band Swaps

**Server Response:**
```html
<!-- Main response -->
<div id="main-content">
    New main content
</div>

<!-- Out of band updates -->
<div id="sidebar" hx-swap-oob="true">
    Updated sidebar
</div>

<div id="notifications" hx-swap-oob="beforeend">
    New notification
</div>

<div id="old-element" hx-swap-oob="delete">
    <!-- This element will be deleted -->
</div>
```

---

## CSS Transitions

### Request Lifecycle Classes

htmx adds classes during request lifecycle:

```css
/* While request is in flight */
.htmx-request {
    opacity: 0.5;
}

/* Element about to be added */
.htmx-adding {
    opacity: 0;
}

/* Element being swapped */
.htmx-swapping {
    opacity: 0;
    transition: opacity 200ms ease-out;
}

/* Element being settled */
.htmx-settling {
    opacity: 1;
    transition: opacity 200ms ease-in;
}
```

### View Transitions API

```html
<!-- Enable view transitions -->
<button 
    hx-get="/page"
    hx-swap="innerHTML transition:true">
    Smooth Page Transition
</button>

<!-- View transition names -->
<div style="view-transition-name: main-content">
    Content
</div>
```

```css
/* Customize transitions */
::view-transition-old(main-content) {
    animation: fade-out 0.3s ease-out;
}

::view-transition-new(main-content) {
    animation: fade-in 0.3s ease-in;
}
```

### Custom CSS Transitions

```html
<style>
/* Loading state */
.loading {
    opacity: 0.5;
    pointer-events: none;
}

/* Fade in */
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

.fade-in {
    animation: fadeIn 0.3s ease-in;
}

/* Slide in */
@keyframes slideIn {
    from {
        transform: translateY(-20px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

.slide-in {
    animation: slideIn 0.3s ease-out;
}
</style>

<!-- Apply with hx-on -->
<div 
    hx-get="/data"
    hx-on::before-request="this.classList.add('loading')"
    hx-on::after-request="this.classList.remove('loading')"
    hx-on::after-swap="this.classList.add('fade-in')">
    Content
</div>
```

---

## WebSockets & SSE

### WebSockets

**Extension Required:**
```html
<script src="https://unpkg.com/htmx.org@1.9.10/dist/ext/ws.js"></script>
```

**Usage:**
```html
<!-- Connect to WebSocket -->
<div hx-ext="ws" ws-connect="/chatroom">
    <div id="chat-messages"></div>
    
    <!-- Send message -->
    <form ws-send>
        <input name="message" type="text">
        <button type="submit">Send</button>
    </form>
</div>
```

**Server (Node.js example):**
```javascript
const WebSocket = require('ws')
const wss = new WebSocket.Server({ port: 8080 })

wss.on('connection', (ws) => {
    ws.on('message', (data) => {
        const message = JSON.parse(data)
        
        // Broadcast to all clients
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(`
                    <div hx-swap-oob="beforeend:#chat-messages">
                        <div>${message.message}</div>
                    </div>
                `)
            }
        })
    })
})
```

### Server-Sent Events (SSE)

**Extension Required:**
```html
<script src="https://unpkg.com/htmx.org@1.9.10/dist/ext/sse.js"></script>
```

**Usage:**
```html
<!-- Connect to SSE -->
<div hx-ext="sse" sse-connect="/events">
    <!-- Listen for specific event -->
    <div sse-swap="message" hx-swap="beforeend">
        Messages appear here
    </div>
    
    <!-- Listen for multiple events -->
    <div sse-swap="notification" hx-target="#notifications">
        Notifications
    </div>
    <div id="notifications"></div>
</div>
```

**Server (Express example):**
```javascript
app.get('/events', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')
    
    // Send event
    const sendEvent = (event, data) => {
        res.write(`event: ${event}\n`)
        res.write(`data: ${data}\n\n`)
    }
    
    // Example: Send notification every 5 seconds
    const interval = setInterval(() => {
        sendEvent('notification', '<div>New notification!</div>')
    }, 5000)
    
    req.on('close', () => {
        clearInterval(interval)
    })
})
```

---

## Extensions

### Loading Extensions

```html
<!-- From CDN -->
<script src="https://unpkg.com/htmx.org@1.9.10/dist/ext/json-enc.js"></script>

<!-- Enable globally -->
<body hx-ext="json-enc">
    <!-- All elements use extension -->
</body>

<!-- Enable on specific element -->
<div hx-ext="json-enc">
    <button hx-post="/api/data">Post JSON</button>
</div>
```

### Built-in Extensions

**json-enc** - Send request as JSON:
```html
<script src="https://unpkg.com/htmx.org@1.9.10/dist/ext/json-enc.js"></script>

<form hx-post="/api/user" hx-ext="json-enc">
    <input name="name" value="John">
    <input name="email" value="john@example.com">
    <button type="submit">Submit as JSON</button>
</form>

<!-- Sends: {"name": "John", "email": "john@example.com"} -->
```

**method-override** - Use hidden input for HTTP method:
```html
<script src="https://unpkg.com/htmx.org@1.9.10/dist/ext/method-override.js"></script>

<form hx-post="/users/123" hx-ext="method-override">
    <input type="hidden" name="_method" value="PUT">
    <button type="submit">Update</button>
</form>
```

**alpine-morph** - Use Alpine.js morph for swapping:
```html
<script src="https://unpkg.com/htmx.org@1.9.10/dist/ext/alpine-morph.js"></script>

<div hx-ext="alpine-morph" hx-swap="morph">
    <!-- Content morphs smoothly -->
</div>
```

**debug** - Debug htmx events:
```html
<script src="https://unpkg.com/htmx.org@1.9.10/dist/ext/debug.js"></script>

<body hx-ext="debug">
    <!-- Logs all htmx events to console -->
</body>
```

**response-targets** - Different targets based on HTTP status:
```html
<script src="https://unpkg.com/htmx.org@1.9.10/dist/ext/response-targets.js"></script>

<form 
    hx-post="/submit"
    hx-ext="response-targets"
    hx-target="#success"
    hx-target-400="#validation-errors"
    hx-target-500="#server-error">
    <button type="submit">Submit</button>
</form>

<div id="success"></div>
<div id="validation-errors"></div>
<div id="server-error"></div>
```

**preload** - Preload content on hover:
```html
<script src="https://unpkg.com/htmx.org@1.9.10/dist/ext/preload.js"></script>

<a 
    href="/page"
    hx-get="/page"
    hx-ext="preload"
    preload="mousedown">
    Link (preloads on mousedown)
</a>
```

---

## Advanced Patterns

### Infinite Scroll

```html
<div id="content">
    <!-- Initial items -->
    <div class="item">Item 1</div>
    <div class="item">Item 2</div>
    
    <!-- Load more trigger -->
    <div 
        hx-get="/api/items?page=2"
        hx-trigger="revealed"
        hx-swap="afterend">
        <span class="loading">Loading more...</span>
    </div>
</div>
```

**Server Response:**
```html
<!-- New items -->
<div class="item">Item 11</div>
<div class="item">Item 12</div>

<!-- Next page trigger -->
<div 
    hx-get="/api/items?page=3"
    hx-trigger="revealed"
    hx-swap="afterend">
    <span class="loading">Loading more...</span>
</div>
```

### Active Search

```html
<div>
    <input 
        type="search"
        name="q"
        hx-get="/search"
        hx-trigger="keyup changed delay:500ms, search"
        hx-target="#search-results"
        hx-indicator="#spinner"
        placeholder="Search...">
    
    <span id="spinner" class="htmx-indicator">
        Searching...
    </span>
    
    <div id="search-results"></div>
</div>
```

### Click to Edit

```html
<!-- View mode -->
<div id="contact-1" hx-target="this" hx-swap="outerHTML">
    <div>
        <label>Name:</label> John Doe
    </div>
    <div>
        <label>Email:</label> john@example.com
    </div>
    <button hx-get="/contact/1/edit">Edit</button>
</div>
```

**Edit Response:**
```html
<form id="contact-1" hx-put="/contact/1" hx-target="this" hx-swap="outerHTML">
    <div>
        <label>Name:</label>
        <input name="name" value="John Doe">
    </div>
    <div>
        <label>Email:</label>
        <input name="email" value="john@example.com">
    </div>
    <button type="submit">Save</button>
    <button hx-get="/contact/1">Cancel</button>
</form>
```

### Lazy Loading

```html
<!-- Placeholder -->
<div 
    hx-get="/api/expensive-content"
    hx-trigger="load delay:1s"
    hx-swap="outerHTML">
    <img src="/spinner.gif" alt="Loading...">
</div>
```

**Or with revealed:**
```html
<div 
    hx-get="/api/image-gallery"
    hx-trigger="revealed">
    <div class="placeholder">
        Content loads when scrolled into view
    </div>
</div>
```

### Inline Validation

```html
<form hx-post="/register">
    <input 
        name="email"
        type="email"
        hx-post="/validate/email"
        hx-trigger="blur"
        hx-target="next .error"
        required>
    <div class="error"></div>
    
    <input 
        name="username"
        type="text"
        hx-post="/validate/username"
        hx-trigger="blur"
        hx-target="next .error"
        required>
    <div class="error"></div>
    
    <button type="submit">Register</button>
</form>
```

**Server Validation Response:**
```html
<!-- Valid -->
<div class="error success">✓ Available</div>

<!-- Invalid -->
<div class="error">✗ Email already exists</div>
```

### Optimistic Updates

```html
<button 
    hx-post="/api/like/123"
    hx-swap="outerHTML"
    hx-on::before-request="
        this.textContent = '❤️ Liked';
        this.disabled = true;
    ">
    🤍 Like
</button>
```

**Server confirms:**
```html
<button 
    hx-delete="/api/like/123"
    hx-swap="outerHTML">
    ❤️ Liked
</button>
```

### Polling with Condition

```html
<div 
    hx-get="/api/job-status/123"
    hx-trigger="every 2s [!document.querySelector('#job-complete')]"
    hx-swap="innerHTML">
    Status: Pending...
</div>
```

**Server stops polling when done:**
```html
<div id="job-complete">
    Status: Complete!
</div>
```

---

## Backend Integration

### Flask (Python)

```python
from flask import Flask, render_template_string, request

app = Flask(__name__)

@app.route('/')
def index():
    return '''
    <html>
        <script src="https://unpkg.com/htmx.org"></script>
        <body>
            <button hx-get="/hello" hx-target="#result">
                Say Hello
            </button>
            <div id="result"></div>
        </body>
    </html>
    '''

@app.route('/hello')
def hello():
    return '<p>Hello from Flask!</p>'

@app.route('/users', methods=['POST'])
def create_user():
    name = request.form.get('name')
    return f'<div>Created user: {name}</div>'
```

### Django (Python)

```python
# views.py
from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.http import require_http_methods

def index(request):
    return render(request, 'index.html')

@require_http_methods(["GET"])
def get_users(request):
    users = User.objects.all()
    return render(request, 'partials/users.html', {'users': users})

@require_http_methods(["POST"])
def create_user(request):
    name = request.POST.get('name')
    user = User.objects.create(name=name)
    return render(request, 'partials/user.html', {'user': user})

@require_http_methods(["DELETE"])
def delete_user(request, user_id):
    User.objects.filter(id=user_id).delete()
    return HttpResponse('')  # Empty response with 200 status
```

```html
<!-- templates/partials/users.html -->
{% for user in users %}
    <div id="user-{{ user.id }}">
        {{ user.name }}
        <button 
            hx-delete="/users/{{ user.id }}"
            hx-target="#user-{{ user.id }}"
            hx-swap="outerHTML">
            Delete
        </button>
    </div>
{% endfor %}
```

### Express (Node.js)

```javascript
const express = require('express')
const app = express()

app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send(`
        <html>
            <script src="https://unpkg.com/htmx.org"></script>
            <body>
                <button hx-get="/time" hx-target="#result">
                    Get Time
                </button>
                <div id="result"></div>
            </body>
        </html>
    `)
})

app.get('/time', (req, res) => {
    res.send(`<p>Current time: ${new Date().toLocaleTimeString()}</p>`)
})

app.post('/users', (req, res) => {
    const { name, email } = req.body
    res.send(`
        <div class="user">
            <p>Name: ${name}</p>
            <p>Email: ${email}</p>
        </div>
    `)
})

app.delete('/users/:id', (req, res) => {
    // Delete user from database
    res.status(200).send('') // Empty response
})

app.listen(3000)
```

### Ruby on Rails

```ruby
# app/controllers/users_controller.rb
class UsersController < ApplicationController
  def index
    @users = User.all
    
    if request.headers['HX-Request']
      render partial: 'users/list'
    else
      render :index
    end
  end
  
  def create
    @user = User.create(user_params)
    render partial: 'users/user', locals: { user: @user }
  end
  
  def destroy
    User.find(params[:id]).destroy
    head :ok
  end
  
  private
  
  def user_params
    params.require(:user).permit(:name, :email)
  end
end
```

```erb
<!-- app/views/users/_user.html.erb -->
<div id="user-<%= user.id %>">
  <%= user.name %>
  <button 
    data-hx-delete="<%= user_path(user) %>"
    data-hx-target="#user-<%= user.id %>"
    data-hx-swap="outerHTML">
    Delete
  </button>
</div>
```

### Laravel (PHP)

```php
// routes/web.php
Route::get('/', function () {
    return view('index');
});

Route::get('/users', function () {
    $users = User::all();
    return view('partials.users', ['users' => $users]);
});

Route::post('/users', function (Request $request) {
    $user = User::create($request->all());
    return view('partials.user', ['user' => $user]);
});

Route::delete('/users/{id}', function ($id) {
    User::destroy($id);
    return response('', 200);
});
```

```blade
{{-- resources/views/partials/user.blade.php --}}
<div id="user-{{ $user->id }}">
    {{ $user->name }}
    <button 
        hx-delete="/users/{{ $user->id }}"
        hx-target="#user-{{ $user->id }}"
        hx-swap="outerHTML">
        Delete
    </button>
</div>
```

### Spring Boot (Java)

```java
@Controller
public class UserController {
    
    @GetMapping("/")
    public String index() {
        return "index";
    }
    
    @GetMapping("/users")
    public String getUsers(Model model) {
        model.addAttribute("users", userRepository.findAll());
        return "fragments/users :: usersList";
    }
    
    @PostMapping("/users")
    public String createUser(@ModelAttribute User user, Model model) {
        User saved = userRepository.save(user);
        model.addAttribute("user", saved);
        return "fragments/users :: user";
    }
    
    @DeleteMapping("/users/{id}")
    @ResponseBody
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
```

```html
<!-- templates/fragments/users.html -->
<div th:fragment="user">
    <div th:id="'user-' + ${user.id}">
        <span th:text="${user.name}"></span>
        <button 
            th:hx-delete="@{/users/{id}(id=${user.id})}"
            th:hx-target="'#user-' + ${user.id}"
            hx-swap="outerHTML">
            Delete
        </button>
    </div>
</div>
```

---

## Real-World Examples

### Todo List

```html
<div id="todo-app">
    <!-- Add todo form -->
    <form hx-post="/todos" hx-target="#todo-list" hx-swap="beforeend">
        <input name="text" placeholder="New todo" required>
        <button type="submit">Add</button>
    </form>
    
    <!-- Todo list -->
    <div id="todo-list">
        <div class="todo" id="todo-1">
            <input 
                type="checkbox"
                hx-put="/todos/1/toggle"
                hx-target="#todo-1"
                hx-swap="outerHTML">
            <span>Buy groceries</span>
            <button 
                hx-delete="/todos/1"
                hx-target="#todo-1"
                hx-swap="outerHTML">
                Delete
            </button>
        </div>
    </div>
</div>
```

### Pagination

```html
<div id="users-list">
    <!-- User items -->
    <div class="user">User 1</div>
    <div class="user">User 2</div>
    
    <!-- Pagination -->
    <div class="pagination">
        <button 
            hx-get="/users?page=1"
            hx-target="#users-list"
            disabled>
            Previous
        </button>
        
        <span>Page 2 of 10</span>
        
        <button 
            hx-get="/users?page=3"
            hx-target="#users-list">
            Next
        </button>
    </div>
</div>
```

### File Upload with Progress

```html
<form 
    hx-post="/upload"
    hx-encoding="multipart/form-data"
    hx-target="#upload-result">
    
    <input type="file" name="file" required>
    
    <button type="submit">Upload</button>
    
    <progress 
        id="upload-progress"
        value="0"
        max="100"
        style="display:none;">
    </progress>
</form>

<div id="upload-result"></div>

<script>
htmx.on('#upload-form', 'htmx:xhr:progress', function(evt) {
    const progress = document.getElementById('upload-progress')
    progress.style.display = 'block'
    progress.setAttribute('value', (evt.detail.loaded / evt.detail.total * 100))
})
</script>
```

### Bulk Actions

```html
<form>
    <div class="bulk-actions">
        <button 
            type="button"
            hx-delete="/users/bulk"
            hx-include="[name='user_ids']:checked"
            hx-confirm="Delete selected users?">
            Delete Selected
        </button>
    </div>
    
    <div class="user-list">
        <div>
            <input type="checkbox" name="user_ids" value="1">
            <span>User 1</span>
        </div>
        <div>
            <input type="checkbox" name="user_ids" value="2">
            <span>User 2</span>
        </div>
    </div>
</form>
```

---

## Best Practices

### Performance

**1. Use appropriate swap strategies:**
```html
<!-- For frequent updates, use innerHTML -->
<div hx-get="/updates" hx-swap="innerHTML">

<!-- For replacing entire sections, use outerHTML -->
<div hx-get="/section" hx-swap="outerHTML">
```

**2. Debounce input events:**
```html
<input 
    hx-get="/search"
    hx-trigger="keyup changed delay:500ms">
```

**3. Use polling wisely:**
```html
<!-- Poll only when necessary -->
<div 
    hx-get="/status"
    hx-trigger="every 5s [document.hasFocus()]">
```

**4. Preload on mousedown:**
```html
<a 
    hx-get="/page"
    hx-ext="preload"
    preload="mousedown">
    Fast navigation
</a>
```

### Security

**1. CSRF Protection:**
```html
<meta name="csrf-token" content="{{ csrf_token }}">

<script>
document.body.addEventListener('htmx:configRequest', (event) => {
    event.detail.headers['X-CSRF-Token'] = 
        document.querySelector('meta[name="csrf-token"]').content
})
</script>
```

**2. Sanitize HTML:**
```python
# Backend (Python example)
from markupsafe import escape

@app.route('/comment', methods=['POST'])
def add_comment():
    comment = escape(request.form.get('comment'))
    return f'<div>{comment}</div>'
```

**3. Validate on server:**
```javascript
// Never trust client-side validation alone
app.post('/users', (req, res) => {
    const { email } = req.body
    
    if (!isValidEmail(email)) {
        res.status(400).send('<div class="error">Invalid email</div>')
        return
    }
    
    // Process valid data
})
```

### Accessibility

**1. Use proper ARIA attributes:**
```html
<button 
    hx-get="/content"
    hx-target="#content"
    aria-controls="content"
    aria-expanded="false"
    hx-on::after-swap="this.setAttribute('aria-expanded', 'true')">
    Load Content
</button>
```

**2. Announce changes to screen readers:**
```html
<div 
    role="status"
    aria-live="polite"
    aria-atomic="true"
    hx-get="/notifications"
    hx-trigger="every 30s">
</div>
```

**3. Maintain focus:**
```html
<button 
    hx-get="/modal"
    hx-on::after-swap="document.querySelector('#modal input').focus()">
    Open Modal
</button>
```

### Code Organization

**1. Extract to partials:**
```
/templates
  /partials
    /_user_card.html
    /_comment.html
  /pages
    /index.html
```

**2. Use semantic HTML:**
```html
<!-- Good -->
<article hx-get="/post/1" hx-swap="outerHTML">
    <header>
        <h2>Title</h2>
    </header>
    <section>Content</section>
</article>

<!-- Avoid -->
<div hx-get="/post/1" hx-swap="outerHTML">
    <div>Title</div>
    <div>Content</div>
</div>
```

**3. Comment complex interactions:**
```html
<!-- 
    Loads next page when scrolled into view
    Throttled to prevent excessive requests
-->
<div 
    hx-get="/items?page=2"
    hx-trigger="revealed throttle:1s">
    Loading...
</div>
```

---

## Resources & Learning

### Official Resources
- **Documentation**: https://htmx.org
- **Examples**: https://htmx.org/examples
- **GitHub**: https://github.com/bigskysoftware/htmx
- **Discord**: https://htmx.org/discord

### Extensions
- **Official Extensions**: https://htmx.org/extensions
- **Community Extensions**: https://htmx.org/extensions#community

### Learning Path
1. Understand core concepts (AJAX with attributes)
2. Practice with simple examples (buttons, forms)
3. Learn triggers and modifiers
4. Explore swapping strategies
5. Build real-world patterns (infinite scroll, search)
6. Integrate with your backend framework
7. Advanced: WebSockets, SSE, custom extensions

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- IE11 with polyfills
- Mobile browsers
- Works without JavaScript (progressive enhancement)

---

**htmx empowers developers to build modern, interactive web applications using HTML instead of JavaScript. By leveraging hypermedia and server-side rendering, it simplifies development while maintaining the power and flexibility needed for complex applications.**
