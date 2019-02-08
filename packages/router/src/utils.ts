export function isComponent(value: any): boolean {
  return value && typeof value.prototype.$destroy === 'function';
}

export function isPromise(value: any): value is Promise<any> {
  return value && typeof value.then === 'function';
}
