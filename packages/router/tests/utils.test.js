import { readwrite } from '../src/utils';

describe('readwrite', () => {
  it('should call start on subscribe', () => {
    const stop = jest.fn();
    const start = jest.fn(() => stop);
    const subscription = jest.fn();
    const store = readwrite(start, 10);

    expect(start.mock.calls.length).toBe(0);

    store.subscribe(subscription)();

    expect(start.mock.calls.length).toBe(1);
    expect(subscription.mock.calls[0][0]).toBe(10);
    expect(stop.mock.calls.length).toBe(1);
  });

  it('should allow external set', () => {
    const start = jest.fn();
    const subscription = jest.fn();
    const store = readwrite(start, 10);

    const unsubscribe = store.subscribe(subscription);
    store.set(20);

    expect(subscription.mock.calls[0][0]).toBe(10);
    expect(subscription.mock.calls[1][0]).toBe(20);

    unsubscribe();
  });
});
