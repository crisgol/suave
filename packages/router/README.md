# @suavejs/router

- [Installation](#installation)
- [Basic usage](#basic-usage)
- [URL parameters](#url-parameters)
- [Nested routes](#nested-routes)
- [Nested routers](#nested-routers)
- [Multiple routers](#multiple-routers)
- [Component](#component)
- [Lifecycle (preload and beforeLeave)](#lifecyle)
- [Context](#context)
- [Code splitting](#code-splitting)
- [SSR](#ssr)
- [Errors](#errors)
- [Hash history](#hash-history)
- [API](#api)

### Installation

```sh
npm install @suave/router
# or
yarn add @suave/router
```

### Basic usage

```html
<script>
import { Router, Route } from '@suave/router';
import Todos from './Todos.html';
</script>

<Router>
  <Route path="/">
    Home
  </Route>
  <Route path="/todos">
    <Todos />
  </Route>
  <Route default>
    404 - Not found
  </Route>
</Router>
```

### URL parameters

```html
<script>
import { Router, Route } from '@suave/router';
import Todos from './Todos.html';
import Todo from './Todo.html';
</script>

<Router>
  <Route path="/todos">
    <Todos />
  </Route>
  <Route path="/todos/:id" let:id>
    <Todo {id} />
  </Route>
</Router>
```

### Nested routes

```html
<script>
import { Router, Route } from '@suave/router';
</script>

<Router>
  <Route path="/todos/*">
    <Route path="/">
      (matches "/todos/")
    </Route>
    <Route path="/:id" let:id>
      (matches "/todos/:id") {id}
    </Route>
  </Route>
</Router>
```

### Nested routers

```html
<script>
import { Router, Route } from '@suave/router';
import Settings from './Settings.html';
</script>

<Router>
  <Route path="/">
    Home
  </Route>
  <Route path="/settings/*">
    <Settings />
  </Route>
</Router>
```

```html
<!-- Settings.html -->
<script>
import { Router, Route } from '@suave/router';
</script>

<Router>
  <Route path="/">
    (matches "/settings/")
  </Route>
  <Route path="/notifications">
    (matches "/settings/notifications")
  </Route>
</Router>
```

### Multiple routers

```html
<script>
import { Router, Route } from '@suave/router';
</script>

<main>
  <Router>
    <Route path="/">Home</Route>
    <Route path="/todos">Todos</Route>
  </Router>
</main>
<aside>
  <Router>
    <Route path="/">(Viewing Home)</Route>
    <Route path="/todos">(Viewing Todos)</Route>
  </Router>
</aside>
```

### Component

```html
<script>
import { Router, Route } from '@suave/router';
import A from './A.html';
import B from './B.html';
</script>

<Router>
  <Route path="/a" component={A} />
  <Route path="/b" component={B} />
</Router>
```

### Lifecycle (preload and beforeLeave)

```html
<script>
import { Router, Route } from '@suave/router';
import Todo from './Todo.html';
import CreateTodo from './CreateTodo.html';

async function loadTodo(transition) {
  const { id } = transition.params;
  const response = await fetch(`/api/todos/${id}`);
  const todo = await response.json();
  
  return todo;
}
</script>

<Router>
  <Route path="/todo/{id}" preload={loadTodo} let:preloaded={todo}>
    <Todo {todo} />
  </Route>
  <Route path="/todo/create">
    <CreateTodo />
  </Route>
</Router>
```

```html
<!-- CreateTodo.html -->
<script>
import { beforeLeave } from '@suave/router';

let value = '';
beforeLeave(transition => {
  if (value !== '' && !confirm('Are you sure?')) {
    transition.abort();
  }
});
</script>

<label>Description: <input bind:value /></label>
```

### Context

TODO

### Code splitting

```html
<script>
import { Router, Route } from '@suave/router';
</script>

<Router>
  <Route path="/" component="{() => import('/index.html')}" />
  <Route path="/todos" component="{() => import('/todos.html')}">
    <p slot="loading">Loading...</p>
  </Route>
  <Route path="/settings" component="{() => import('/settings.html')}">
    <p>(This is put in settings's slot)</p>
  </Route>
</Router>
```

### SSR

```html
<!-- App.html -->
<script>
import { Router, Route } from '@suave/router';
export let history;
</script>

<Router {history}>
  <Route path="/">Home</Route>
  <Route path="/settings">Settings</Route>
</Router>
```

```js
require('svelte/register');
const App = require('./App.html');
const polka = require('polka');
const template = require('./template');

polka().get('/*', (req, res) => {
  const history = { location: req.url };
  const { html, css, head } = App.render({ history });
  const page = template(html, css, head);

  res.end(page);
})
```

### Errors

```html
<script>
import { Router, Route } from '@suave/router';
</script>

<Router>
  <Route path="/" component="{() => import('/nonexistent.html')}" />
  
  <Route default let:error>
    {#if error}
      500 - {error}
    {:else}
      404 - Not Found
    {/if}
  </Route>
```

### Hash history

```html
<script>
import { Router, Route, HashHistory } from '@suave/router';
const history = new HashHistory();
</script>

<Router {history}>
  <Route path="/todos">
    (matches "#/todos")
  </Route>
</Router>
```

## API

### Router

TODO

### Route

TODO

