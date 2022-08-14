import fc from 'fast-check';

import { descriptionPrefix } from './description-prefix';
import { descriptionCenter } from './description-center';
import { descriptionSuffix } from './description-suffix';

import { description } from './description-generation';
import { MinimalDocument } from '../dom/text-nodes-from-document';

jest.mock('./description-prefix');
jest.mock('./description-center');
jest.mock('./description-suffix');

describe('description', () => {
    test('joins return values of descriptionPrefix, descriptionCenter and descriptionSuffix', () => {
        fc.assert(
            fc.property(
                fc.array(fc.string({ maxLength: 10 }), { minLength: 3, maxLength: 3 }),
                ([prefix, center, suffix]) => {
                    [
                        [descriptionPrefix, prefix],
                        [descriptionCenter, center],
                        [descriptionSuffix, suffix]
                    ].forEach(([m, v]) => (m as jest.Mock).mockReturnValue(v));

                    const topics: string[] = jest.fn()();
                    const document: MinimalDocument = jest.fn()();

                    expect(
                        description({
                            topics,
                            document
                        })
                    ).toEqual([
                        descriptionPrefix(topics),
                        descriptionCenter(document),
                        descriptionSuffix()
                    ].join(''));
                }
            )
        );
    });
});