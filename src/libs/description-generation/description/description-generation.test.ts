import fc from 'fast-check';

import { descriptionPrefix } from './description-prefix';
import { descriptionCenter } from './description-center';
import { descriptionSuffix } from './description-suffix';

import { description, partitionsOf } from './description-generation';
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

describe('partitionsOf', () => {
  test('Partitions given text into sections smaller than 3000 characters if given value surpasses this limit', () => {
    fc.assert(
      fc.property(
        fc.nat({ max: 200 }),
        (nat) => {
          const finalNat = 2900 + nat;

          const text = [...new Array(finalNat)].map(_v => 'a').join('');

          const partitions = partitionsOf(text);

          if (text.length < 3000) {
            console.log(`Partitions is: ${partitions}`);
            const [partition] = partitions;
            expect(partition).toEqual(text);
          } else {
            partitions.forEach(s => {
              expect(s.length).toBeLessThanOrEqual(3000);
            });

            expect(partitions.join('')).toEqual(text);
          }
        }
      )
    );
  });
});
