export function createBrowserSource() {
  return window;
}

export function createHashSource(pathname = '/') {
  // TODO
  return createMemorySource(pathname);
}

export function createMemorySource(pathname = '/') {
  let index = 0;
  const locations = [{ pathname, search: '' }];
  const states = [];

  return {
    get location() {
      return locations[index];
    },
    history: {
      get state() {
        return states[index];
      },
      replaceState(state, _title, url) {
        const [pathname, search = ''] = url.split('?', 2);

        index += 1;
        locations[index] = { pathname, search };
        states[index] = state;
      },
      pushState(state, _title, url) {
        const [pathname, search = ''] = url.split('?', 2);

        locations[index] = { pathname, search };
        states[index] = state;
      },

      back() {
        if (index === 0) return;
        index -= 1;
      },
      forward() {
        if (index === locations.length - 1) return;
        index += 1;
      }
    },
    addEventListener() {},
    removeEventListener() {}
  };
}
