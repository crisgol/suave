# @suavejs/router

```html
<script>
import { Router, Route } from '@suavejs/router';
import Settings from './settings.html';
</script>

<Router>
  <Route path="/">Home</Route>

  <!-- URL parameters -->
  <Route path="users/:name" let:name>User: {name}</Route>

  <!-- Nested Routes -->
  <Route path="dashboard">
    Dashboard

    <!-- Matches dashboard/:details -->
    <Route path=":details" let:details>
      Details: {details}
    </Route>
  </Route>

  <!-- Embedded routers (Settings includes its own Router) -->
  <Route path="settings/*"><Settings /></Route>

  <!-- Support for code splitting with dynamic components -->
  <Route path="blog/*" component="{() => import('./blog.html')}">  
    <!-- Display loading message, if waiting more than 200ms -->
    <p slot="loading">Loading...</p>
  </Route>

  <!-- If no route matches, go to default route and display 404 -->
  <Route default>
    404 - Not found
  </Route>
</Router>
```
