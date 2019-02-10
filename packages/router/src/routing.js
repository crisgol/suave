import { readable } from 'svelte/store';
import { createHistory } from './history';
import { createBrowserSource } from './sources';

export function createRouter(options = {}) {
  const {
    history = createHistory(createBrowserSource()),
    base = '/',
    sitemap = {}
  } = options;

  const register = route => {
    const { path, matches, rank, default: is_default, catch: is_catch } = route;

    const setComponent = Component => {
      // TODO
    };

    const match = Object.assign(
      readable(set => {
        // TODO
      }),
      {
        route,
        setComponent
      }
    );

    return match;
  };
  const unregister = match => {
    // TODO
  };

  const prefetch = url => {
    // TODO
  };

  const start = () => {
    // TODO
  };
  const stop = () => {
    // TODO
  };

  start();

  return { register, unregister, stop };
}
