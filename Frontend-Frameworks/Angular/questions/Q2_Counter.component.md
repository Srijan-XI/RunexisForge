## Q2_Counter.component.ts

Create a Counter component with increment and decrement buttons

```python
import { Component } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: `
    <div class="counter">
      <h1>Counter: {{ count }}</h1>
      <button (click)="increment()">Increment</button>
      <button (click)="decrement()">Decrement</button>
      <button (click)="reset()">Reset</button>
    </div>
  `,
  styles: [`
    .counter {
      text-align: center;
      padding: 20px;
    }
    button {
      margin: 5px;
      padding: 8px 16px;
      cursor: pointer;
    }
  `]
})
export class CounterComponent {
  count: number = 0;

  increment(): void {
    this.count++;
  }

  decrement(): void {
    this.count--;
  }

  reset(): void {
    this.count = 0;
  }
}
```python
