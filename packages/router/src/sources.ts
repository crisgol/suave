export interface Source {
  location: {
    pathname: string;
    search: string;
    replace?: (url: string) => void;
    assign?: (url: string) => void;
  };
  history: {
    replaceState(state: object, title: any, url: string): void;
    pushState(state: object, title: any, url: string): void;
  };
  addEventListener(name: string, callback: (event: any) => void): void;
  removeEventListener(name: string, callback: (event: any) => void): void;
}

export function createBrowserSource(): Source {
  return window;
}

export function createHashSource(initial = '/'): Source {
  // TODO
  return {
    location: { pathname: initial, search: '' },
    history: {
      replaceState() {},
      pushState() {}
    },
    addEventListener() {},
    removeEventListener() {}
  };
}

export function createMemorySource(initial = '/'): Source {
  // TODO
  return {
    location: { pathname: initial, search: '' },
    history: {
      replaceState() {},
      pushState() {}
    },
    addEventListener() {},
    removeEventListener() {}
  };
}
