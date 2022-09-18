export function* takeWhile<T>(iterable: Iterable<T>, predicate: (t: T) => boolean) {
  for (const item of iterable) {
    if (predicate(item)) yield item;
    else return;
  }
}

export function* takeUntil<T>(iterable: Iterable<T>, predicate: (t: T) => boolean) {
  const negatedPredicate = (t: T) => !predicate(t);

  for (const item of takeWhile(iterable, negatedPredicate))
    yield item;
}

export function* zipWithNext<T>(iterable: Iterable<T>) {
  // As we yield elements only for lists with lengths over
  // two, at start we do not yield, reason for which this
  // variable is used
  let atStart = true;

  let curr: T | null = null;

  for (const next of iterable) {
    if (!atStart)
      yield [curr!, next];

    curr = next;
    atStart = false;
  }
}

export function* indicesWhere<T>(iterable: Iterable<T>, predicate: (t: T) => boolean) {
  let i = 0;

  for (const curr of iterable) {
    if (predicate(curr))
      yield i;

    i++;
  }
}

export const nthFrom = <T,>(iterable: Iterable<T>, n: number) => {
  let i = 0;

  for (const curr of iterable) {
    if (i++ === n)
      return curr;
  }

  throw new Error(`Given number, ${n}, out of bounds. Counted until ${i}.`);
};

export function* iterate<T>(initial: T, f: (t: T) => T) {
  for (let t = initial; ; t = f(t))
    yield t;
}

export const lastFromIterable = <T,>(iterable: Iterable<T>): T => {
  let ret = null;

  for (const r of iterable)
    ret = r;

  return ret!;
}

export function* take<T>(iterable: Iterable<T>, n: number) {
  let i = 0;

  for (const item of iterable) {
    if (i++ >= n)
      break;

    yield item;
  }
}
