## Q1_HelloWorld.component.ts
Create a simple Angular component that displays `"Hello, World!"`

```
import { Component } from '@angular/core';

@Component({
  selector: 'app-hello-world',
  template: '<h1>Hello, World!</h1>',
  styles: ['h1 { color: #3f51b5; }']
})
export class HelloWorldComponent { }
```