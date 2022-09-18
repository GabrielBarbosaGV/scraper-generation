import fc from 'fast-check';

import { randomInt } from './random';

describe('randomInt', () => {
    test('always returns integers in given range', () => {
        fc.assert(
            fc.property(
                fc.tuple(fc.nat(), fc.nat())
                    .filter(([n1, n2]) => n1 !== n2),

                ([x, y]) => {
                    const [min, max] = x < y ? [x, y] : [y, x];

                    const result = randomInt({ min, max });

                    expect(result).toBeGreaterThanOrEqual(min);
                    expect(result).toBeLessThan(max);
                }
            )
        )
    });
});
