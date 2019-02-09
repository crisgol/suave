// Inspired by and copied from @reach/router
// Copyright (c) 2018-present, Ryan Florence

import { readwrite } from './utils';
import { Source } from './sources';

export interface History {
  subscribe(callback: (location: Location) => void): () => void;
  navigate(url: string, options?: { state?: object; replace: boolean }): void;
}

export interface Location {
  pathname: string;
  search: string;

  // Other values are likely to be included in browser,
  // but aren't support by other sources
  //
  // (hash, href, protocol, host, hostname, port, origin)

  state: object;
  key: string;
}

export function createHistory(source: Source): History {
  // Use readable source in order to better handle listeners
  // Only need to listen to popstate, push and replace happen internally
  const location = readwrite(set => {
    const setLocation = () => set(getLocation(source));
    source.addEventListener('popstate', setLocation);

    return () => {
      source.removeEventListener('popstate', setLocation);
    };
  }, getLocation(source));

  const navigate = (
    url: string,
    options: { state: object | undefined; replace: boolean }
  ) => {
    let { state, replace = false } = options;
    state = { ...state, key: String(Date.now()) };

    // try...catch iOS Safari limits to 100 pushState calls
    try {
      if (replace) {
        source.history.replaceState(state, null, url);
      } else {
        source.history.pushState(state, null, url);
      }
    } catch (e) {
      source.location[replace ? 'replace' : 'assign'](url);
    }

    location.set(getLocation(source));
  };

  return { subscribe: location.subscribe, navigate };
}

function getLocation(source): Location {
  return {
    ...source.location,
    state: source.history.state,
    key: (source.history.state && source.history.state.key) || 'initial'
  };
}
