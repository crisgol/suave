# @suavejs/router

- [Installation](#installation)
- [Basic usage](#basic-usage)
- [Links](#links)
- [URL parameters](#url-parameters)
- [Nested routes](#nested-routes)
- [Nested routers](#nested-routers)
- [Multiple routers](#multiple-routers)
- [Component](#component)
- [Redirect](#redirect)
- [Lifecycle (preload and beforeLeave)](#lifecyle)
- [Context](#context)
- [Methods](#methods)
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

  <Route default let:location>
    404 - {location} not found
  </div>
</Router>
```

TODO location on `Router` or `Route` (`let:match` makes more sense on `Route`)

### Links

TODO capturing `<a>` links and `rel=prefetch` on links and disabling scroll restoration.

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

  export let cohort;
</script>

<Router>
  <Route path="/nested" component="{cohort === 'a' ? A : B}" />
</Router>
```

### Redirect

```html
<script>
  import { Router, Route, Redirect } from '@suave/router';
</script>

<Router>
  <Route path="/blog">
    <Redirect path="/articles" />
  </Route>
  <Route path="/articles">
    Articles
  </Route>
</Router>
```

TODO pass through stem (e.g. `/blog/1` -> `/articles/1`)

### Lifecycle (preload and beforeLeave)

```html
<script>
  import { Router, Route } from '@suave/router';
  import Todo, { preload } from './Todo.html';
  import CreateTodo from './CreateTodo.html';
</script>

<Router>
  <Route path="/todo/{id}" {preload} component={Todo} />
  <Route path="/todo/create">
    <CreateTodo />
  </Route>
</Router>
```

```html
<!-- Todo.html -->
<script context="module">
  export function preload(transition) {
    const { id } = transition.params;
    const response = await fetch(`/api/todos/${id}`);
    const todo = await response.json();

    return { todo };
  }
</script>

<script>
  export let todo;
</script>

Description: {todo.description}
```

```html
<!-- CreateTodo.html -->
<script>
  import { beforeLeave } from '@suave/router';

  let value = '';
  
  beforeLeave(transition => {
    if (value !== '' && !confirm('Are you sure you want to leave?')) {
      transition.abort();
    }
  });
</script>

<label>Description: <input bind:value /></label>
```

### Context

TODO router, location, match

### Methods

TODO back, forward, go, push, replace

```html
<script>
  import { getContext } from 'svelte';
  import { Router } from '@suave/router';

  const { back, forward } = getContext(Router);
</script>

<button on:click={back}>Back</button>
<button on:click={forward}>Forward</button>
```

### Code splitting

```html
<script>
  import { Router, Route } from '@suave/router';

  const Index = () => import('/index.html');
  const Todos = () => import('/todos.html');
  const Settings = () => import('/settings.html');
</script>

<Router>
  <Route path="/" component="{Index}" />
  <Route path="/todos" component="{Todos}">
    <p slot="loading">
      Loading Todos component then preloading...
    </p>
  </Route>
  <Route path="/settings" component="{Settings}">
    <p>(This is put in settings's slot)</p>
  </Route>
</Router>
```

```html
<!-- Todos -->
<script context="module">
  // The preload lifecycle hook is called automatically
  // for imported components
  export async function preload(transition) {
    const response = await fetch('/api/todos');
    const todos = await response.json();

    return { todos };
  }
</script>
<script>
  export let todos;
</script>

{#each todos as todo}
  ...
{/each}
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
const polka = require('polka');
const { createMemoryHistory } = require('@suave/router');
const App = require('./App.html');
const template = require('./template');

polka().get('/*', (req, res) => {
  const history = createMemoryHistory(req.url);
  const { html, css, head } = App.render({ history });

  if (history.redirect) {
    return res.redirect(history.redirect);
  }

  const page = template(html, css, head);

  res.status(history.status);
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

  <Route catch let:error>
    500 - {error}
  </div>
</Router>
```

### Hash history

```html
<script>
  import { Router, Route, createHashHistory } from '@suave/router';
  const history = createHashHistory();
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

### Redirect

TODO

### createHistory

TODO

### createMemoryHistory

TODO

### createHashHistory

TODO
