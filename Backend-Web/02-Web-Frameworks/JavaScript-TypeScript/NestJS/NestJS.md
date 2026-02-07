# NestJS

## Introduction

## Overview

**NestJS** is a progressive Node.js framework for building efficient, scalable, and reliable server-side applications. It uses modern JavaScript/TypeScript and combines OOP (Object-Oriented Programming), FP (Functional Programming), and FRP (Functional Reactive Programming) principles.

### Key Features

- **Full TypeScript Support**: Type-safe development
- **Modular Architecture**: Organized, scalable code structure
- **Dependency Injection**: Built-in IoC (Inversion of Control) container
- **Decorators**: Metadata-driven development
- **Middleware & Guards**: Request processing control
- **Pipes & Filters**: Data transformation and exception handling
- **Testing**: Built-in testing utilities
- **Microservices**: Native microservices support
- **GraphQL & REST**: Multiple API protocols
- **Database Agnostic**: Works with any database

### Why Choose NestJS?

✅ Enterprise-grade architecture  
✅ Full TypeScript support  
✅ Excellent for large-scale applications  
✅ Built-in testing tools  
✅ Great documentation  
✅ Active community and ecosystem  

---

## Installation

### Prerequisites
- Node.js (v12.0 or higher)
- npm or yarn

### Setup with Nest CLI

```bash
# Install Nest CLI globally
npm install -g @nestjs/cli

# Create new NestJS project
nest new my-app

# Navigate to project
cd my-app

# Start development server
npm run start:dev
```

### Manual Setup

```bash
# Create project directory
mkdir my-nest-app
cd my-nest-app

# Initialize npm
npm init -y

# Install dependencies
npm install @nestjs/common @nestjs/core @nestjs/platform-express reflect-metadata tslib rxjs

# Install dev dependencies
npm install -D @types/node typescript ts-loader ts-node
```

### package.json Structure

```json
{
  "name": "my-nest-app",
  "version": "1.0.0",
  "description": "NestJS Application",
  "main": "dist/main.js",
  "scripts": {
    "start": "nest start",
    "start:dev": "nest start --watch",
    "start:debug": "nest start --debug --watch",
    "build": "nest build"
  },
  "dependencies": {
    "@nestjs/common": "^10.0.0",
    "@nestjs/core": "^10.0.0",
    "@nestjs/platform-express": "^10.0.0",
    "reflect-metadata": "^0.1.13",
    "rxjs": "^7.8.1"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "typescript": "^5.0.0"
  }
}
```

---

## Core Concepts

### 1. Modules

Modules are containers for organizing related components (controllers, services, providers).

**Creating a Module**
```bash
nest generate module users
```

```typescript
// users/users.module.ts
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
```

**Importing Modules**
```typescript
// app.module.ts
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [UsersModule, PostsModule]
})
export class AppModule {}
```

### 2. Controllers

Controllers handle incoming requests and return responses.

**Creating a Controller**
```bash
nest generate controller users
```

```typescript
// users/users.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(parseInt(id));
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: CreateUserDto) {
    return this.usersService.update(parseInt(id), updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }
}
```

**Request Decorators**
```typescript
import {
  Controller,
  Get,
  Post,
  Param,
  Query,
  Body,
  Headers,
  Req,
  Res
} from '@nestjs/common';

@Controller('users')
export class UsersController {
  // Route parameters
  @Get(':id')
  findOne(@Param('id') id: string) {}

  // Query parameters
  @Get()
  findAll(@Query() query: { limit?: number; offset?: number }) {}

  // Request body
  @Post()
  create(@Body() body: CreateUserDto) {}

  // Headers
  @Get()
  getHeaders(@Headers('authorization') auth: string) {}

  // Full request/response (Express style)
  @Get()
  expressStyle(@Req() req, @Res() res) {}
}
```

### 3. Services (Providers)

Services contain business logic and are injected into controllers.

**Creating a Service**
```bash
nest generate service users
```

```typescript
// users/users.service.ts
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  private users = [];
  private id = 1;

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    return this.users.find(user => user.id === id);
  }

  create(createUserDto: CreateUserDto) {
    const user = { id: this.id++, ...createUserDto };
    this.users.push(user);
    return user;
  }

  update(id: number, updateUserDto: CreateUserDto) {
    const user = this.findOne(id);
    if (user) {
      Object.assign(user, updateUserDto);
    }
    return user;
  }

  remove(id: number) {
    const index = this.users.findIndex(user => user.id === id);
    if (index > -1) {
      return this.users.splice(index, 1);
    }
  }
}
```

### 4. DTOs (Data Transfer Objects)

DTOs define the shape of data being transferred.

```typescript
// users/dto/create-user.dto.ts
import { IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  bio?: string;
}
```

### 5. Pipes

Pipes transform data and validate input.

```typescript
import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform {
  transform(value: string) {
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException('Validation failed');
    }
    return val;
  }
}

// Usage
@Get(':id')
findOne(@Param('id', ParseIntPipe) id: number) {}
```

**Built-in Pipes**
```typescript
import {
  ValidationPipe,
  ParseIntPipe,
  ParseBoolPipe,
  ParseArrayPipe
} from '@nestjs/common';

// Global pipe
app.useGlobalPipes(new ValidationPipe());

// Controller-level
@Controller('users')
@UsePipes(ValidationPipe)
export class UsersController {}

// Route-level
@Post()
@UsePipes(ValidationPipe)
create(@Body() createUserDto: CreateUserDto) {}
```

### 6. Guards

Guards determine whether a request is allowed to proceed.

```typescript
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;
    
    return !!token; // Simple token check
  }
}

// Usage
@Get('protected')
@UseGuards(AuthGuard)
protected() {
  return 'This is protected';
}
```

### 7. Middleware

Middleware executes before guards and pipes.

```typescript
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(`${req.method} ${req.path}`);
    next();
  }
}

// Apply middleware
@Module({
  imports: [UsersModule]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggingMiddleware)
      .forRoutes('users');
  }
}
```

### 8. Filters (Exception Handling)

Filters handle exceptions and return custom responses.

```typescript
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    response
      .status(status)
      .json({
        statusCode: status,
        message: exception.getResponse(),
      });
  }
}

// Apply filter
@UseFilters(HttpExceptionFilter)
@Get()
findAll() {}
```

---

## Database Integration

### TypeORM Integration

```bash
npm install @nestjs/typeorm typeorm mysql2
```

```typescript
// app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'myapp',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true
    }),
    UsersModule
  ]
})
export class AppModule {}
```

**Entity**
```typescript
// users/entities/user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;
}
```

**Service with Repository**
```typescript
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  findAll() {
    return this.usersRepository.find();
  }

  create(user: User) {
    return this.usersRepository.save(user);
  }
}
```

---

## Project Structure

```
my-nest-app/
├── src/
│   ├── main.ts                    # Entry point
│   ├── app.module.ts              # Root module
│   ├── app.controller.ts
│   ├── app.service.ts
│   ├── users/
│   │   ├── users.module.ts
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   ├── entities/
│   │   │   └── user.entity.ts
│   │   └── dto/
│   │       └── create-user.dto.ts
│   ├── posts/
│   │   ├── posts.module.ts
│   │   ├── posts.controller.ts
│   │   ├── posts.service.ts
│   │   └── entities/
│   │       └── post.entity.ts
│   └── common/
│       ├── filters/
│       ├── guards/
│       ├── middleware/
│       └── pipes/
├── test/
├── dist/
├── tsconfig.json
├── nest-cli.json
├── package.json
└── README.md
```

---

## Best Practices

### 1. Environment Configuration
```bash
npm install @nestjs/config
```

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    })
  ]
})
export class AppModule {}
```

### 2. Validation
```bash
npm install class-validator class-transformer
```

```typescript
// In main.ts
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true
  })
);
```

### 3. Logging
```typescript
import { Logger } from '@nestjs/common';

export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  findAll() {
    this.logger.log('Finding all users');
    return [];
  }
}
```

### 4. Testing
```bash
npm install --save-dev @nestjs/testing jest ts-jest
```

```typescript
// users.service.spec.ts
import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [UsersService]
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should return all users', () => {
    expect(service.findAll()).toBeDefined();
  });
});
```

---

## Useful Resources

- **Official Docs**: https://docs.nestjs.com
- **GitHub**: https://github.com/nestjs/nest
- **NestJS Awesome**: https://github.com/nestjs/awesome-nestjs
- **TypeORM Docs**: https://typeorm.io

---

**Status**: ✅ Complete  
**Last Updated**: January 2025  
**Version**: 1.0

