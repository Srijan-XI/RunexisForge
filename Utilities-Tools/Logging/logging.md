# Logging - structured Application Insights

## Table of Contents
- [Introduction](#introduction)
- [Logging Levels](#logging-levels)
- [Structured Logging](#structured-logging)
- [JavaScript / Node.js (Winston)](#javascript--nodejs-winston)
- [C# / .NET (Serilog)](#c--net-serilog)
- [Java (Log4j 2 / SLF4J)](#java-log4j-2--slf4j)
- [Best Practices](#best-practices)
- [Resources](#resources)

---

## Introduction

**Logging** is the practice of recording events during the execution of software. It is crucial for debugging, monitoring, and auditing. `System.out.println` or `console.log` is NOT logging. Real logging libraries allow you to control output destination (file, database, console) and severity levels.

---

## Logging Levels

Standardize severity to filter noise.

1.  **FATAL**: The application cannot continue (e.g., Database down).
2.  **ERROR**: Something failed, but app can continue (e.g., API call failed).
3.  **WARN**: Potentially harmful limit or bad configuration.
4.  **INFO**: Standard operational events (e.g., "User logged in").
5.  **DEBUG**: Diagnostic info for developers.
6.  **TRACE**: Extremely detailed path execution (loops, variables).

---

## Structured Logging

Old logging was text-based:
`[INFO] 2023-01-01 User 123 logged in from 192.168.1.1`

**Structured Logging** outputs JSON, making it queryable:
```json
{
  "level": "INFO",
  "timestamp": "2023-01-01T12:00:00Z",
  "message": "User logged in",
  "userId": 123,
  "ip": "192.168.1.1"
}
```
Now you can search: `Show me all logs where userId = 123`.

---

## JavaScript / Node.js (Winston)

**Winston** is the most popular logger for Node.js.

```javascript
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

// If not in production, verify output to console
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

logger.info('Hello World', { customData: 'foo' });
```

---

## C# / .NET (Serilog)

**Serilog** introduced structured logging to .NET.

**Installation**:
`dotnet add package Serilog`

**Usage**:
```csharp
using Serilog;

Log.Logger = new LoggerConfiguration()
    .WriteTo.Console()
    .WriteTo.File("log-.txt", rollingInterval: RollingInterval.Day)
    .CreateLogger();

var position = new { Latitude = 25, Longitude = 134 };
var elapsedMs = 34;

// The objects are preserved as data, not just text!
Log.Information("Processed {@Position} in {Elapsed} ms", position, elapsedMs);

Log.CloseAndFlush();
```

---

## Java (Log4j 2 / SLF4J)

**Log4j 2** is a widely used logging framework. **SLF4J** is an abstraction layer (facade) that allows you to plug in different logging frameworks at deployment time.

**Configuration (log4j2.xml)**:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<Configuration status="WARN">
    <Appenders>
        <Console name="Console" target="SYSTEM_OUT">
            <PatternLayout pattern="%d{HH:mm:ss.SSS} [%t] %-5level %logger{36} - %msg%n"/>
        </Console>
    </Appenders>
    <Loggers>
        <Root level="info">
            <AppenderRef ref="Console"/>
        </Root>
    </Loggers>
</Configuration>
```

**Usage**:
```java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class MyClass {
    private static final Logger logger = LoggerFactory.getLogger(MyClass.class);

    public void doSomething() {
        logger.info("This is an info message");
        logger.error("Error occurred", new Exception("Test"));
    }
}
```

---

## Best Practices

1.  **Don't log sensitive info**: Passwords, API keys, PII (Personally Identifiable Information).
2.  **Use Correlation IDs**: Generate a unique ID for each HTTP request and pass it to every log message in that flow.
3.  **Log Context**: Don't just log "Error". Log "Error processing Order ID 555".
4.  **Async Logging**: Writing to disk/network is slow. Ensure your logger is non-blocking (asynchronous).

---

## Resources

-   [Winston GitHub](https://github.com/winstonjs/winston)
-   [Serilog](https://serilog.net/)
-   [Log4j 2](https://logging.apache.org/log4j/2.x/)
-   [The Twelve-Factor App: Logs](https://12factor.net/logs)
