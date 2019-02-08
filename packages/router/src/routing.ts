import { readable } from 'svelte/store';
import { History, Location, createHistory } from './history';
import { createBrowserSource } from './sources';

export interface Route {
  path: string | RegExp;
  matches(location: Location): false | object;
  rank: number;
  default?: boolean;
  catch?: boolean;
}

export interface Component {
  default: any;
  preload?: (match: Match) => object | undefined;
}

export interface Transition {
  params: object;
}

export interface Match {
  subscribe(callback: (match: false | Transition) => void): () => void;
  route: Route;
  setComponent(component: Component): void;
}

export interface Router {
  register(route: Route): Match;
  unregister(match: Match): void;
  stop(): void;
}

export interface Options {
  history?: History;
  base?: string;
  sitemap?: object;
}

export function createRouter(options: Options = {}): Router {
  const {
    history = createHistory(createBrowserSource()),
    base = '/',
    sitemap = {}
  } = options;

  const register = (route: Route) => {
    const { path, matches, rank, default: is_default, catch: is_catch } = route;

    const setComponent = Component => {
      // TODO
    };

    const match: Match = Object.assign(
      readable<Transition>(set => {
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

  const start = () => {
    // TODO
  };
  const stop = () => {
    // TODO
  };

  start();

  return { register, unregister, stop };
}
