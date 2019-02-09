import { readable } from 'svelte/store';

export function isComponent(value: any): boolean {
  return value && typeof value.prototype.$destroy === 'function';
}

export function isPromise(value: any): value is Promise<any> {
  return value && typeof value.then === 'function';
}

export type unsubscribe = () => void;
const noop = () => {};

export function readwrite<T>(
  start: (set: (value: T) => void) => void | unsubscribe,
  initial?: T | undefined
): {
  subscribe(callback: (value: T) => void): unsubscribe;
  set(value: T): void;
} {
  let _set: (value: T) => void = noop;
  const { subscribe } = readable(set => {
    _set = set;
    const unsubscribe = start(set);

    () => {
      _set = noop;
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, initial);

  return {
    set: value => _set(value),
    subscribe
  };
}
