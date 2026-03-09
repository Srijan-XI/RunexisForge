# Material Design

## Overview
Material Design is a comprehensive design system created by Google that provides guidelines, components, and tools for creating beautiful, consistent user interfaces across platforms. Material Design emphasizes bold graphics, intentional motion, and deliberate use of space and depth.

**Core Principles:**
- **Material as Metaphor** - Inspired by physical materials (paper, ink)
- **Bold, Graphic, Intentional** - Emphasis on typography, grids, space, scale, color, and imagery
- **Motion Provides Meaning** - Animation and transitions guide focus and maintain continuity

## Material Design Implementations

### 1. Material Design for Web (Material Web Components)

Google's official Web Components implementation of Material Design.

#### Installation

```bash
npm install @material/web
```

#### Usage

```javascript
// Import components
import '@material/web/button/filled-button.js';
import '@material/web/button/outlined-button.js';
import '@material/web/textfield/filled-text-field.js';
import '@material/web/checkbox/checkbox.js';
import '@material/web/radio/radio.js';
```

**HTML:**
```html
<md-filled-button>Filled Button</md-filled-button>
<md-outlined-button>Outlined Button</md-outlined-button>
<md-text-button>Text Button</md-text-button>

<md-filled-text-field label="First Name"></md-filled-text-field>
<md-outlined-text-field label="Email" type="email"></md-outlined-text-field>

<md-checkbox></md-checkbox>
<md-radio name="group"></md-radio>
```

#### Components Available

```javascript
// Buttons
import '@material/web/button/filled-button.js';
import '@material/web/button/outlined-button.js';
import '@material/web/button/text-button.js';
import '@material/web/button/elevated-button.js';
import '@material/web/button/tonal-button.js';

// FAB (Floating Action Button)
import '@material/web/fab/fab.js';
import '@material/web/fab/branded-fab.js';

// Icon Button
import '@material/web/iconbutton/icon-button.js';
import '@material/web/iconbutton/filled-icon-button.js';

// Text Fields
import '@material/web/textfield/filled-text-field.js';
import '@material/web/textfield/outlined-text-field.js';

// Select
import '@material/web/select/filled-select.js';
import '@material/web/select/outlined-select.js';

// Checkbox
import '@material/web/checkbox/checkbox.js';

// Radio
import '@material/web/radio/radio.js';

// Switch
import '@material/web/switch/switch.js';

// Chips
import '@material/web/chips/assist-chip.js';
import '@material/web/chips/filter-chip.js';
import '@material/web/chips/input-chip.js';
import '@material/web/chips/suggestion-chip.js';

// Dialog
import '@material/web/dialog/dialog.js';

// List
import '@material/web/list/list.js';
import '@material/web/list/list-item.js';

// Menu
import '@material/web/menu/menu.js';
import '@material/web/menu/menu-item.js';

// Progress
import '@material/web/progress/linear-progress.js';
import '@material/web/progress/circular-progress.js';

// Divider
import '@material/web/divider/divider.js';

// Ripple
import '@material/web/ripple/ripple.js';
```

#### Theming Material Web

```css
:root {
  --md-sys-color-primary: #6750A4;
  --md-sys-color-on-primary: #FFFFFF;
  --md-sys-color-primary-container: #EADDFF;
  --md-sys-color-on-primary-container: #21005D;
  
  --md-sys-color-secondary: #625B71;
  --md-sys-color-on-secondary: #FFFFFF;
  --md-sys-color-secondary-container: #E8DEF8;
  --md-sys-color-on-secondary-container: #1D192B;
  
  --md-sys-color-error: #B3261E;
  --md-sys-color-on-error: #FFFFFF;
  
  --md-sys-color-surface: #FFFBFE;
  --md-sys-color-on-surface: #1C1B1F;
}
```

---

### 2. Angular Material

Official Material Design components for Angular.

#### Installation

```bash
ng add @angular/material
```

#### Setup

```typescript
// app.module.ts
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  imports: [
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule
  ]
})
export class AppModule { }
```

#### Usage

```typescript
// component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <mat-toolbar color="primary">
      <span>My App</span>
    </mat-toolbar>

    <mat-card>
      <mat-card-header>
        <mat-card-title>Login</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <mat-form-field appearance="fill">
          <mat-label>Username</mat-label>
          <input matInput [(ngModel)]="username">
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>Password</mat-label>
          <input matInput type="password" [(ngModel)]="password">
        </mat-form-field>
      </mat-card-content>
      <mat-card-actions>
        <button mat-raised-button color="primary" (click)="login()">
          Login
        </button>
      </mat-card-actions>
    </mat-card>
  `
})
export class AppComponent {
  username = '';
  password = '';

  login() {
    console.log('Login:', this.username);
  }
}
```

#### Angular Material Components

```typescript
// Buttons & Indicators
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';

// Form Controls
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';

// Navigation
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

// Layout
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTreeModule } from '@angular/material/tree';

// Popups & Modals
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

// Data Table
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
```

#### Theming Angular Material

```scss
// custom-theme.scss
@use '@angular/material' as mat;

@include mat.core();

$my-primary: mat.define-palette(mat.$indigo-palette);
$my-accent: mat.define-palette(mat.$pink-palette, A200, A100, A400);
$my-warn: mat.define-palette(mat.$red-palette);

$my-theme: mat.define-light-theme((
  color: (
    primary: $my-primary,
    accent: $my-accent,
    warn: $my-warn,
  )
));

@include mat.all-component-themes($my-theme);

// Dark theme
.dark-theme {
  $dark-theme: mat.define-dark-theme((
    color: (
      primary: $my-primary,
      accent: $my-accent,
      warn: $my-warn,
    )
  ));

  @include mat.all-component-themes($dark-theme);
}
```

---

### 3. Vuetify (Material Design for Vue)

Material Design component framework for Vue.js.

#### Installation

```bash
# Vue 3
npm install vuetify@next

# Vue 2
npm install vuetify
```

#### Setup (Vue 3)

```javascript
// main.js
import { createApp } from 'vue';
import App from './App.vue';

// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import '@mdi/font/css/materialdesignicons.css';

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#1976D2',
          secondary: '#424242',
          accent: '#82B1FF',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107',
        }
      }
    }
  }
});

createApp(App)
  .use(vuetify)
  .mount('#app');
```

#### Usage

```vue
<template>
  <v-app>
    <v-app-bar color="primary" dark>
      <v-toolbar-title>My App</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-card>
          <v-card-title>Login</v-card-title>
          <v-card-text>
            <v-text-field
              v-model="username"
              label="Username"
              prepend-icon="mdi-account"
            ></v-text-field>
            
            <v-text-field
              v-model="password"
              label="Password"
              type="password"
              prepend-icon="mdi-lock"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="login">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    login() {
      console.log('Login:', this.username);
    }
  }
};
</script>
```

#### Vuetify Components

```vue
<!-- Buttons -->
<v-btn>Default</v-btn>
<v-btn color="primary">Primary</v-btn>
<v-btn outlined>Outlined</v-btn>
<v-btn text>Text</v-btn>
<v-btn icon><v-icon>mdi-heart</v-icon></v-btn>
<v-btn fab><v-icon>mdi-plus</v-icon></v-btn>

<!-- Text Fields -->
<v-text-field label="Label"></v-text-field>
<v-text-field outlined label="Outlined"></v-text-field>
<v-text-field filled label="Filled"></v-text-field>
<v-textarea label="Textarea"></v-textarea>

<!-- Select -->
<v-select :items="items" label="Select"></v-select>
<v-autocomplete :items="items" label="Autocomplete"></v-autocomplete>

<!-- Checkbox & Radio -->
<v-checkbox label="Checkbox"></v-checkbox>
<v-radio-group v-model="selected">
  <v-radio label="Option 1" value="1"></v-radio>
  <v-radio label="Option 2" value="2"></v-radio>
</v-radio-group>
<v-switch label="Switch"></v-switch>

<!-- Cards -->
<v-card>
  <v-card-title>Title</v-card-title>
  <v-card-text>Content</v-card-text>
  <v-card-actions>
    <v-btn>Action</v-btn>
  </v-card-actions>
</v-card>

<!-- Data Table -->
<v-data-table
  :headers="headers"
  :items="items"
  :items-per-page="5"
></v-data-table>

<!-- Dialog -->
<v-dialog v-model="dialog">
  <v-card>
    <v-card-title>Dialog Title</v-card-title>
    <v-card-text>Dialog content</v-card-text>
    <v-card-actions>
      <v-btn @click="dialog = false">Close</v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>

<!-- Snackbar -->
<v-snackbar v-model="snackbar">
  {{ snackbarText }}
  <template v-slot:actions>
    <v-btn @click="snackbar = false">Close</v-btn>
  </template>
</v-snackbar>

<!-- Tabs -->
<v-tabs v-model="tab">
  <v-tab>Tab 1</v-tab>
  <v-tab>Tab 2</v-tab>
  <v-tab>Tab 3</v-tab>
</v-tabs>
<v-window v-model="tab">
  <v-window-item>Content 1</v-window-item>
  <v-window-item>Content 2</v-window-item>
  <v-window-item>Content 3</v-window-item>
</v-window>
```

---

### 4. React Material UI (MUI)

Popular Material Design library for React.

#### Installation

```bash
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/icons-material
```

#### Usage

```jsx
import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  TextField,
  Button
} from '@mui/material';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Login:', username);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">My App</Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Card>
          <CardHeader title="Login" />
          <CardContent>
            <TextField
              fullWidth
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
            />
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              color="primary"
              onClick={handleLogin}
            >
              Login
            </Button>
          </CardActions>
        </Card>
      </Container>
    </>
  );
}

export default App;
```

#### MUI Components

```jsx
// Buttons
import { Button, IconButton, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

<Button variant="contained">Contained</Button>
<Button variant="outlined">Outlined</Button>
<Button variant="text">Text</Button>
<IconButton><AddIcon /></IconButton>
<Fab color="primary"><AddIcon /></Fab>

// Form Controls
import {
  TextField,
  Select,
  MenuItem,
  Checkbox,
  Radio,
  RadioGroup,
  FormControlLabel,
  Switch
} from '@mui/material';

<TextField label="Label" variant="outlined" />
<Select value={value} onChange={handleChange}>
  <MenuItem value={1}>Option 1</MenuItem>
  <MenuItem value={2}>Option 2</MenuItem>
</Select>
<Checkbox />
<FormControlLabel control={<Switch />} label="Label" />

// Data Display
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  Avatar,
  Badge
} from '@mui/material';

// Feedback
import {
  Alert,
  Snackbar,
  Dialog,
  CircularProgress,
  LinearProgress
} from '@mui/material';

// Navigation
import {
  Drawer,
  Menu,
  MenuItem,
  Tabs,
  Tab,
  Breadcrumbs,
  Link
} from '@mui/material';

// Layout
import {
  Container,
  Grid,
  Stack,
  Box,
  Card,
  Paper,
  Accordion
} from '@mui/material';
```

#### MUI Theming

```jsx
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* Your app */}
    </ThemeProvider>
  );
}
```

#### Dark Mode

```jsx
import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <IconButton onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
      {/* Your app */}
    </ThemeProvider>
  );
}
```

---

### 5. Material Components Web (Legacy)

Google's original Material Design implementation using vanilla JavaScript/CSS.

#### Installation

```bash
npm install material-components-web
```

#### Usage

```html
<!DOCTYPE html>
<html>
<head>
  <link href="https://unpkg.com/material-components-web@latest/dist/material-components-web.min.css" rel="stylesheet">
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
</head>
<body>
  <button class="mdc-button mdc-button--raised">
    <span class="mdc-button__ripple"></span>
    <span class="mdc-button__label">Button</span>
  </button>

  <label class="mdc-text-field mdc-text-field--filled">
    <span class="mdc-text-field__ripple"></span>
    <span class="mdc-floating-label">Label</span>
    <input class="mdc-text-field__input" type="text">
    <span class="mdc-line-ripple"></span>
  </label>

  <script src="https://unpkg.com/material-components-web@latest/dist/material-components-web.min.js"></script>
  <script>
    mdc.ripple.MDCRipple.attachTo(document.querySelector('.mdc-button'));
    mdc.textField.MDCTextField.attachTo(document.querySelector('.mdc-text-field'));
  </script>
</body>
</html>
```

---

## Material Design Guidelines

### Color System

Material Design uses a color system with:
- **Primary** - Main brand color
- **Secondary** - Accent color
- **Error** - Error states
- **Surface** - Background surfaces
- **Background** - Page background

### Typography Scale

```
h1: 96sp (light)
h2: 60sp (light)
h3: 48sp (regular)
h4: 34sp (regular)
h5: 24sp (regular)
h6: 20sp (medium)
subtitle1: 16sp (regular)
subtitle2: 14sp (medium)
body1: 16sp (regular)
body2: 14sp (regular)
button: 14sp (medium, uppercase)
caption: 12sp (regular)
overline: 10sp (regular, uppercase)
```

### Elevation (Shadows)

Material Design uses elevation to show hierarchy:
- Level 0: No shadow
- Level 1: Subtle shadow (cards at rest)
- Level 2-3: Raised elements
- Level 4-6: Dialogs, dropdowns
- Level 8-24: Navigation drawer, modal

### Motion

Material Design emphasizes meaningful motion:
- **Duration**: 200-300ms for simple transitions
- **Easing**: Material uses cubic-bezier curves
- **Enter**: Elements fade in and scale up
- **Exit**: Elements fade out and scale down

## Resources

- [Material Design Guidelines](https://m3.material.io/)
- [Material Web](https://github.com/material-components/material-web)
- [Angular Material](https://material.angular.io/)
- [Vuetify](https://vuetifyjs.com/)
- [MUI (React)](https://mui.com/)
- [Material Design Icons](https://fonts.google.com/icons)
- [Material Color Tool](https://m2.material.io/design/color/the-color-system.html#tools-for-picking-colors)

## Comparison

| Implementation | Framework | Best For |
|---------------|-----------|----------|
| Material Web | Web Components | Framework-agnostic |
| Angular Material | Angular | Angular apps |
| Vuetify | Vue | Vue apps |
| MUI | React | React apps |
| MDC Web | Vanilla JS | No framework |

Material Design provides a complete, well-documented design system that ensures consistency and accessibility across your application.
