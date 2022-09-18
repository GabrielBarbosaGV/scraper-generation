import fc from "fast-check";
import { summarizedText } from "./summarizers";

const withSpacesAddedToFront = ([n, s]: [number, string]) =>
    `${new Array(n).map(_ => ' ').join('')}${s}`;

const lettersArb = fc.mapToConstant({ num: 52, build: v => String.fromCharCode(v + 65) });

describe('summarizedText', () => {
    test('summarizes strings longer than 30 characters when trimmed', () => {
        fc.assert(
            fc.property(
                fc.stringOf(lettersArb, { minLength: 31 })
                    .chain(s => fc.tuple(fc.nat({ max: 100 }), fc.constant(s)))
                    .map(withSpacesAddedToFront),

                text => {
                    expect(summarizedText(text)).toEqual(
                        `"${text.trim().substring(0, 25)}..." (${text.length} characters)`
                    );
                }
            )
        );
    });

    test('returns trimmed string if it is not longer than 30 characters when trimmed', () => {
        fc.assert(
            fc.property(
                fc.stringOf(lettersArb, { maxLength: 30 })
                    .chain(s => fc.tuple(fc.nat({ max: 100 }), fc.constant(s)))
                    .map(withSpacesAddedToFront),

                text => {
                    expect(summarizedText(text)).toEqual(`"${text.trim()}"`);
                }
            )
        )
    });
});