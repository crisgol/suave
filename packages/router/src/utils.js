import { readable } from 'svelte/store';

export function isComponent(value) {
  return value && typeof value.prototype.$destroy === 'function';
}

export function isPromise(value) {
  return value && typeof value.then === 'function';
}

export function noop() {}

export function readwrite(start, initial) {
  let _set = noop;
  const { subscribe } = readable(set => {
    _set = set;
    const unsubscribe = start(set);

    return () => {
      _set = noop;
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, initial);

  return {
    set: value => _set(value),
    subscribe
  };
}
