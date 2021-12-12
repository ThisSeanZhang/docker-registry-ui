export function groupBy<T>(objectArray: Array<T>, fn: (target: T) => string)
: Map<string, Array<T>> {
  return objectArray.reduce((acc, obj) => {
    if (!obj) return acc;
    const key = fn(obj);
    let group = acc.get(key);
    if (group) {
      group.push(obj);
    } else {
      group = [obj];
      acc.set(key, group);
    }
    return acc;
  }, new Map<string, Array<T>>());
}
export default groupBy;
