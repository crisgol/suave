export function without(object, excluded_keys) {
  const result = {};
  for (const key in object) {
    if (!excluded_keys.includes(key)) {
      result[key] = object[key];
    }
  }

  return result;
}
