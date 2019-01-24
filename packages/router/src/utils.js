export function without(object, excluded_keys) {
  const result = {};
  for (const key in object) {
    if (!excluded_keys.includes(key)) {
      result[key] = object[key];
    }
  }

  return result;
}

export function isComponent(value) {
  return value && typeof value.prototype.$destroy === 'function';
}

export function isPromise(value) {
  return value && typeof value.then === 'function';
}
