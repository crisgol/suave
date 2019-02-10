import { getContext, setContext } from 'svelte';

export const symbols = {
  catch: Symbol('catch'),
  router: Symbol('router'),
  match: Symbol('match')
};

export function getRouter() {
  return getContext(symbols.router);
}

export function setRouter(router) {
  return setContext(symbols.router, router);
}

export function getMatch() {
  return getContext(symbols.match);
}

export function setMatch(match) {
  return setContext(symbols.match, match);
}
