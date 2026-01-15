# Gin

## Introduction

## Overview

Gin is a fast, minimalist HTTP web framework for Go, designed for building APIs with low overhead.

## Key Features

- High performance with HTTP router and middleware
- Routing with parameters and groups
- Built-in validation and binding for JSON, XML, form data
- Middleware support (logging, recovery, CORS)

## Common Use Cases

- RESTful APIs and microservices
- Lightweight backends for web/mobile apps

## Resources

- Docs: <https://gin-gonic.com/docs/>
- GitHub: <https://github.com/gin-gonic/gin>

## User Guide

## Install

```bash
go mod init example.com/gin-demo
go get github.com/gin-gonic/gin
```bash

## Minimal API

```go
package main

import "github.com/gin-gonic/gin"

func main() {
  r := gin.Default()
  r.GET("/ping", func(c *gin.Context) {
    c.JSON(200, gin.H{"message": "pong"})
  })
  r.Run() // listens on :8080
}
```bash

Run with `go run .`.

## Routing and Parameters

```go
r.GET("/users/:id", func(c *gin.Context) {
  id := c.Param("id")
  c.JSON(200, gin.H{"id": id})
})
```bash

## Binding JSON

```go
type Item struct { Name string `json:"name"` }

r.POST("/items", func(c *gin.Context) {
  var item Item
  if err := c.BindJSON(&item); err != nil {
    return
  }
  c.JSON(201, item)
})
```bash

## Middleware

- `gin.Logger()` for request logs
- `gin.Recovery()` to recover from panics
- Custom middleware via `r.Use(func(c *gin.Context) { ... })`

## Testing

- Use `httptest` with `gin.CreateTestContext`

## Deployment

- Build static binary: `go build -o app`
- Run behind reverse proxy (nginx, Caddy) for TLS

