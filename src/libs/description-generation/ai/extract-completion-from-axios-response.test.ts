import fc from "fast-check";

import { extractedFrom, Response } from './extract-completion-from-axios-response';

describe('extracted', () => {
    test('extracts value according to expected object hierarchy', () => {
        fc.assert(
            fc.property(
                fc.string(),
                text => {
                    const response: Response = {
                        data: {
                            choices: [
                                {
                                    text
                                }
                            ]
                        }
                    };

                    expect(extractedFrom(response)).toEqual(text);
                }
            )
        )
    });

    test('returns null if object does not follow given pattern', () => {
        fc.assert(
            fc.property(
                fc.object()
                    .filter(o => !(o as unknown as Response['data'])?.choices?.[0]?.text)
                    .map(data => ({ data })),

                response => {
                    expect(extractedFrom(response as unknown as Response)).toBeFalsy();
                }
            )
        );
    });
});