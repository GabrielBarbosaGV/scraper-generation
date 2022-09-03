import { indicesOf } from './string';

describe('indicesOf', () => {
    test('returns correct indices of substrings', () => {
        const examplePairs: [string, string, number[]][] = [
            ['asdajhsdiqjsd', 'asd', [0]],
            ['asdsdjhadsasd', 'asd', [0, 10]],
            ['sdahjskdhsa', 'hsa', [8]],
            ['', 'asd', []],
            ['sdqwjhfdiashdjsakhd', 'asd', []]
        ];

        examplePairs.forEach(([s, sub, expectedIndices]) => {
            expect(Array.from(indicesOf(s, sub))).toEqual(expectedIndices);
        });
    });
});
