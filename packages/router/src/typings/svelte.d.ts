declare module 'svelte' {
  export function onMount(callback: () => () => void | undefined);
  export function beforeUpdate(callback: () => void);
  export function afterUpdate(callback: () => void);
  export function onDestroy(callback: () => void);

  export function getContext(key: any): any;
  export function setContext(key: any, value: any);
}

declare module 'svelte/store' {
  type unsubscribe = () => void;

  export function readable<T>(
    start: (set: (value: T) => void) => void | unsubscribe,
    initial?: T | undefined
  ): {
    subscribe(callback: (value: T) => void): unsubscribe;
  };

  export function writable<T>(
    initial?: T | undefined
  ): {
    subscribe(callback: (value: T) => void): unsubscribe;
    set(value: T): void;
    update(callback: (value: T) => T): void;
  };
}
