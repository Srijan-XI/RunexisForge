# Angular Installation and Usage Guide

## Installation

### Prerequisites
- Node.js (v16.13.0 or higher)
- npm (v8.0.0 or higher)
- Code editor (VS Code recommended)
- Angular CLI

### Install Angular CLI
```bash
npm install -g @angular/cli
```

### Create a New Project
```bash
ng new my-app
cd my-app
ng serve
```

Visit `http://localhost:4200/` to see your application.

## Project Structure
```
my-app/
├── node_modules/
├── src/
│   ├── app/
│   │   ├── app.component.ts
│   │   ├── app.component.html
│   │   ├── app.component.css
│   │   └── app.module.ts
│   ├── assets/
│   ├── index.html
│   ├── main.ts
│   └── styles.css
├── angular.json
├── package.json
└── tsconfig.json
```

## Basic Component Example
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent {
  count: number = 0;

  increment() {
    this.count++;
  }

  decrement() {
    this.count--;
  }
}
```

## Component Template
```html
<div class="container">
  <h1>Counter: {{ count }}</h1>
  <button (click)="increment()">Increment</button>
  <button (click)="decrement()">Decrement</button>
</div>
```

## Common Commands
```bash
ng serve               # Start development server
ng build              # Build for production
ng generate component # Generate a new component
ng generate service   # Generate a new service
ng test               # Run tests
ng lint               # Run linter
```

## Key Concepts

### Decorators
- `@Component`: Defines a component
- `@Injectable`: Makes a class injectable
- `@Input`: Passes data to a component
- `@Output`: Emits events from a component

### Data Binding
- `{{ }}` - Interpolation
- `[property]` - Property binding
- `(event)` - Event binding
- `[(ngModel)]` - Two-way binding

### Directives
- `*ngIf` - Conditional rendering
- `*ngFor` - Loop rendering
- `*ngSwitch` - Conditional multiple branches
- `[ngClass]` - Dynamic class binding
- `[ngStyle]` - Dynamic style binding

### Services
```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor() { }

  getData() {
    return [1, 2, 3, 4, 5];
  }
}
```

## Reactive Forms Example
```typescript
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class MyFormComponent {
  form: FormGroup;

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      name: ['', Validators.required],
      email: ['', Validators.email]
    });
  }

  submit() {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }
}
```

## Routing
```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

## Best Practices
1. Use standalone components (Angular 14+)
2. Keep components simple and focused
3. Use services for shared logic
4. Implement OnInit, OnDestroy lifecycle hooks
5. Unsubscribe from observables
6. Use strong typing (TypeScript)
7. Lazy load feature modules
8. Write unit tests for components and services

## Testing
```bash
ng test  # Run Jasmine tests with Karma
```

## Debugging
- Angular DevTools browser extension
- Chrome DevTools
- VS Code Angular extension
