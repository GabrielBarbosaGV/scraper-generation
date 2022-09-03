import fc from "fast-check";

import { indicesOf } from '../../utils/string';
import { zipWithNext } from '../../utils/iterable';
import { chompLinesUpToNCharacters } from './string-chomper';

describe('chompLinesUpToNCharacters', () => {
    const withoutNewLines = (s: string): string => s.replace(/\n/, '');

    const placeNewlinesAndJoin = (ss: string[]): string => ss.map(s => `${s}\n`).join('');

    const prepareStrings = (ss: string[]): string => placeNewlinesAndJoin(ss.map(withoutNewLines));

    test('takes elements from given line', () => {
        fc.assert(
            fc.property(
                fc.array(fc.string({ maxLength: 5 }), { minLength: 2, maxLength: 10 })
                    .map(prepareStrings)
                    .chain(s => {
                        // All indices for newlines
                        const newlineIndices = indicesOf(s, '\n');

                        // Pairs of integers representing intervals between newlines
                        const intervals = Array.from(zipWithNext(newlineIndices));

                        return fc.tuple(
                            // The generated string
                            fc.constant(s),

                            // First, we obtain a random number with which to index the
                            // intervals
                            fc.nat({ max: intervals.length - 1 })
                                .chain(n => {
                                    const [min, max] = intervals[n];

                                    // Then, we do this roundabout path to obtaining a natural
                                    // between the minimum and the maximum, since nat() does
                                    // not allow a minimum value to be passed AFAIK
                                    // TODO confirm above statement
                                    return fc.nat({ max: max - min }).map(x => x + min);
                                })
                        );
                    }),

                ([s, numberOfCharactersToChomp]) => {
                    const [untilNewline, afterNewline] = chompLinesUpToNCharacters(s, numberOfCharactersToChomp);

                    expect(`${untilNewline}${afterNewline}`).toEqual(s);
                    expect(untilNewline.length).toBeLessThanOrEqual(numberOfCharactersToChomp);
                }
            )
        );
    })
});
