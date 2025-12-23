## Q3_TodoApp.component.ts
Create a Todo app with add and remove functionality
```
import { Component } from '@angular/core';

interface Todo {
  id: number;
  text: string;
}

@Component({
  selector: 'app-todo-app',
  template: `
    <div class="todo-app">
      <h1>Todo App</h1>
      <div class="input-section">
        <input
          [(ngModel)]="newTodo"
          (keyup.enter)="addTodo()"
          placeholder="Add a new todo"
        />
        <button (click)="addTodo()">Add</button>
      </div>
      <ul>
        <li *ngFor="let todo of todos">
          {{ todo.text }}
          <button (click)="removeTodo(todo.id)">Remove</button>
        </li>
      </ul>
    </div>
  `,
  styles: [`
    .todo-app {
      max-width: 500px;
      margin: 0 auto;
      padding: 20px;
    }
    .input-section {
      margin-bottom: 20px;
    }
    input {
      padding: 8px;
      width: 70%;
      border: 1px solid #ccc;
    }
    button {
      padding: 8px 16px;
      margin-left: 5px;
      cursor: pointer;
    }
    li {
      padding: 10px;
      margin: 5px 0;
      background: #f5f5f5;
      display: flex;
      justify-content: space-between;
    }
  `]
})
export class TodoAppComponent {
  todos: Todo[] = [];
  newTodo: string = '';

  addTodo(): void {
    if (this.newTodo.trim()) {
      this.todos.push({ id: Date.now(), text: this.newTodo });
      this.newTodo = '';
    }
  }

  removeTodo(id: number): void {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }
}
```