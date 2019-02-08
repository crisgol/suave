import { getContext, setContext } from 'svelte';
import { Router, Match } from './routing';

export const symbols = {
  catch: Symbol('catch'),
  router: Symbol('router'),
  match: Symbol('match')
};

export function getRouter(): Router | undefined {
  return getContext(symbols.router);
}

export function setRouter(router: Router) {
  return setContext(symbols.router, router);
}

export function getMatch(): Match | undefined {
  return getContext(symbols.match);
}

export function setMatch(match: Match) {
  return setContext(symbols.match, match);
}
