// Inspired by and copied from @reach/router
// Copyright (c) 2018-present, Ryan Florence

import { readwrite } from './utils';

export function createHistory(source) {
  // Use readable source in order to better handle listeners
  // Only need to listen to popstate, push and replace happen internally
  const location = readwrite(set => {
    const setLocation = () => set(getLocation(source));
    source.addEventListener('popstate', setLocation);

    return () => {
      source.removeEventListener('popstate', setLocation);
    };
  }, getLocation(source));

  const navigate = (url, options = {}) => {
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

function getLocation(source) {
  const state = source.history.state;

  return {
    ...source.location,
    state,
    key: (state && state.key) || 'initial'
  };
}
