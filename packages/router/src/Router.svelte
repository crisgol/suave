<script>
  import { onDestroy } from 'svelte';
  import { getRouter, setRouter, getMatch } from './context';
  import { createRouter } from './routing';

  export let history;
  export let base;
  export let sitemap;

  const parent = getRouter();
  let router;
  if (parent) {
    const match = getMatch();
    
    const _history = history || parent.history;
    const _base = join(parent.base, match.path, base);
    // TODO sitemap

    router = createRouter({ history: _history, base: _base });
  } else {
    router = createRouter({ history, base, sitemap });
  }

  setRouter(router);
  onDestroy(() => router.stop());
</script>

<slot />
