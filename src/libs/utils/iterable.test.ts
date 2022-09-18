import fc from 'fast-check';

import {
  takeWhile,
  takeUntil,
  zipWithNext,
  indicesWhere,
  nthFrom,
  iterate,
  take,
  lastFromIterable
} from './iterable';

describe('takeWhile', () => {
  test('yields as long as predicate is true', () => {
    fc.assert(
      fc.property(
        fc.array(fc.anything())
          .chain(arr => fc.tuple(fc.constant(arr), fc.nat({ max: arr.length })))
          .map(([arr, length]) => {
            const predicateMock = jest.fn();

            for (let i = 0; i < length; i++) {
              predicateMock.mockReturnValueOnce(true);
            }

            predicateMock.mockReturnValueOnce(false);

            return [arr, length, predicateMock];
          }),

        ([arr, length, predicate]) => {
          expect(
            Array.from(
              takeWhile(
                arr as Iterable<any>,
                predicate as (a: any) => boolean
              )
            ).length
          ).toEqual(length);
        }
      )
    );
  });

  test('yields all of array if predicate never returns false', () => {
    fc.assert(
      fc.property(
        fc.array(fc.anything())
          .map(arr => [arr, jest.fn().mockReturnValue(true)]),

        ([arr, predicate]) => {
          expect(
            Array.from(
              takeWhile(
                arr as Iterable<any>,
                predicate as (a: any) => boolean
              )
            ).length
          ).toEqual(arr.length);
        }
      )
    );
  });
});

describe('takeUntil', () => {
  describe('is equivalent to takeWhile with a negated predicate', () => {
    fc.assert(
      fc.property(
        fc.array(fc.anything())
          .map(arr => {
            const predicateMock = jest.fn();

            const inversePredicateMock = jest.fn();

            for (let i = 0; i < arr.length; i++) {
              predicateMock.mockReturnValueOnce(true);
              inversePredicateMock.mockReturnValueOnce(false);
            }

            predicateMock.mockReturnValueOnce(false);
            inversePredicateMock.mockReturnValueOnce(true);

            return [arr, predicateMock, inversePredicateMock];
          }),

        ([arr, predicateMock, inversePredicateMock]) => {
          expect(
            Array.from(
              takeWhile(
                arr as Iterable<any>,
                predicateMock as (a: any) => boolean
              )
            )
          ).toEqual(
            Array.from(
              takeUntil(
                arr as Iterable<any>,
                inversePredicateMock as (a: any) => boolean
              )
            )
          );
        }
      )
    );
  });
});

describe('zipWithNext', () => {
  const selectFirst = <T,>([a, _]: [T, any]) => a;
  const selectSecond = <T,>([_, b]: [any, T]) => b;

  test('can be used to rebuild original lists', () => {
    fc.assert(
      fc.property(
        fc.tuple(fc.anything(), fc.anything(), fc.array(fc.anything()))
          .map(([a, b, rest]) => [a, b, ...rest]),

        arr => {
          const firsts = [...arr].slice(0, arr.length - 1);
          const [_, ...lasts] = [...arr];

          expect(Array.from(zipWithNext(arr)).map(selectFirst))
            .toEqual(firsts);

          expect(Array.from(zipWithNext(arr)).map(selectSecond))
            .toEqual(lasts);
        }
      )
    );
  });

  test('generates expected pairs', () => {
    type NumberPair = [number, number];

    const listsToZipped: [number[], NumberPair[]][] = [
      [[0, 1, 2], [[0, 1], [1, 2]]],
      [[6, 5, 4], [[6, 5], [5, 4]]],
      [[], []],
      [[1], []]
    ];

    listsToZipped.forEach(([l, z]) => {
      expect(Array.from(zipWithNext(l))).toEqual(z);
    });
  })
});

describe('indicesWhere', () => {
  test('should select only and all elements for which predicate is true', () => {
    fc.assert(
      fc.property(
        fc.array(fc.boolean()),
        booleans => {
          const isTrue = (t: boolean) => t;
          const isFalse = (t: boolean) => !t;

          const trueIndices = Array.from(indicesWhere(booleans, isTrue));
          const falseIndices = Array.from(indicesWhere(booleans, isFalse));

          expect(trueIndices.map(i => booleans[i]).every(isTrue)).toBe(true);
          expect(falseIndices.map(i => booleans[i]).every(isFalse)).toBe(true);
        }
      )
    )
  });
});

describe('nthFrom', () => {
  test('returns nth element from given iterable', () => {
    fc.assert(
      fc.property(
        fc.array(fc.anything())
          .filter(arr => arr.length > 0)
          .chain(arr => fc.tuple(fc.constant(arr), fc.nat({ max: arr.length - 1 }))),

        ([arr, index]) => {
          expect(nthFrom(arr, index)).toEqual(arr[index]);
        }
      )
    );
  });

  test('throws error on out of bounds number', () => {
    fc.assert(
      fc.property(
        fc.nat({ max: 20 })
          .chain(n => fc.tuple(
            fc.array(
              fc.anything(),
              { minLength: n, maxLength: n }
            ),
            fc.nat().map(m => n + m)
          )),
        ([arr, index]) => {
          expect(() => nthFrom(arr, index)).toThrow(Error);
        }
      )
    )
  });
});

describe('iterate', () => {
  test('applies function sequentially', () => {
    fc.assert(
      fc.property(
        fc.func(fc.anything()),
        fc.anything(),
        fc.nat({ max: 10 }),
        (fn, start, elemCount) => {
          const iteration = iterate(start, fn);

          const items = Array.from(take(iteration, elemCount));

          let curr = start;

          let elems = [];

          for (let i = 0; i < elemCount; i++) {
            elems.push(curr);
            curr = fn(curr);
          }

          expect(elems).toEqual(items);
        }
      )
    )
  });
});

describe('lastFromIterable', () => {
  test('returns last element from given iterable', () => {
    fc.assert(
      fc.property(
        fc.array(fc.anything()),
        arr => {
          const lastElement = arr.length > 0
            ? arr[arr.length - 1]
            : null;

          expect(lastFromIterable(arr)).toEqual(lastElement);
        }
      )
    );
  });
});
