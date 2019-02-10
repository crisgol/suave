import { createHistory, createMemorySource } from '../src/';

it('should load initial location', () => {
  const history = createHistory(mockSource());
  expect(get(history).pathname).toBe('/');
});

it('should notify subscribers on navigate', () => {
  const source = mockSource();
  const history = createHistory(source);

  const subscription = jest.fn(() => {});
  const unsubscribe = history.subscribe(subscription);

  expect(subscription.mock.calls.length).toBe(1);
  expect(subscription.mock.calls[0][0].pathname).toBe('/');

  history.navigate('/next');

  expect(subscription.mock.calls.length).toBe(2);
  expect(subscription.mock.calls[1][0].pathname).toBe('/next');

  unsubscribe();
});

function mockSource(pathname = '/') {
  const source = createMemorySource(pathname);

  // TODO mock addEventListener for popstate

  return source;
}

function get(store) {
  let value;
  store.subscribe(_value => {
    value = _value;
  })();

  return value;
}
