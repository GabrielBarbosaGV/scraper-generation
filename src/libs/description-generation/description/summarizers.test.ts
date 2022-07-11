import fc from "fast-check";
import { summarizedText } from "./summarizers";

describe('summarizedText', () => {
    test('summarizes strings longer than 30 characters', () => {
        fc.assert(
            fc.property(
                fc.string({ minLength: 31 }),
                text => {
                    expect(summarizedText(text)).toEqual(
                        `"${text.substring(0, 25)}..." (${text.length} characters)`
                    );
                }
            )
        );
    });

    test('returns given string if it is not longer than 30 characters', () => {
        fc.assert(
            fc.property(
                fc.string({ maxLength: 30 }),
                text => {
                    expect(summarizedText(text)).toEqual(`"${text}"`);
                }
            )
        )
    });
});