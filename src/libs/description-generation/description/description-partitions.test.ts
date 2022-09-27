import fc from 'fast-check';
import { MinimalDocument } from '../dom/text-nodes-from-document';
import { descriptionPrefix } from './description-prefix';
import { descriptionCenter } from './description-center';
import { descriptionSuffix } from './description-suffix';
import { partitionedDescription } from './description-partitions';

jest.mock('./description-center');
jest.mock('./description-prefix');
jest.mock('./description-suffix');

describe('partitionedDescription', () => {
    test('produces replicas of the description with the result of partitioning the center', () => {
        fc.assert(
            fc.property(
                fc.string(),
                fc.string(),
                fc.string(),
                fc.func(fc.array(fc.string())),
                (
                    prefix,
                    center,
                    suffix,
                    partitioner
                ) => {
                    [
                        [descriptionPrefix, prefix],
                        [descriptionCenter, center],
                        [descriptionSuffix, suffix],
                    ].forEach(([m, v]) => (m as jest.Mock).mockReturnValue(v));

                    const topics: string[] = jest.fn()();
                    const document: MinimalDocument = jest.fn()();

                    const prefixText = descriptionPrefix(topics);
                    const centerText = descriptionCenter(document);
                    const suffixText = descriptionSuffix();

                    expect(
                        partitionedDescription({
                            topics,
                            document,
                            partitioningWith: partitioner
                        })
                    ).toEqual(
                        partitioner(centerText).map(c => {
                            return `${prefixText}${c}${suffixText}`
                        })
                    )
                }
            )
        )
    });
});