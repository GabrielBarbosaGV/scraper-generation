import fc from "fast-check";
import { MinimalNodeIterator, nodeArrayFromIterable, iterableFromNodeIterator, nodeArrayFromNodeIterator } from "./nodes-from-iterator";

describe('nodesFromIterator', () => {
    test('finishes after as many iterations as supplied by "nextNode"', () => {
        fc.assert(
            fc.property(fc.array(fc.record({}), { maxLength: 50 }), nodes => {
                const myIterator: MinimalNodeIterator = {
                    nextNode: jest.fn()
                };

                nodes.forEach((myIterator.nextNode as jest.Mock).mockReturnValueOnce);

                expect(Array.from(iterableFromNodeIterator(myIterator))).toHaveLength(nodes.length);
            })
        );
    });
});

describe('nodeArrayFromIterable', () => {
    test('uses Array.from', () => {
        const mockArrayFrom = jest.fn();

        global.Array.from = mockArrayFrom;

        mockArrayFrom.mockImplementation(() => []);

        fc.assert(
            fc.property(fc.array(fc.record({}), { maxLength: 50 }), nodes => {
                const myIterator: MinimalNodeIterator = {
                    nextNode: jest.fn()
                };

                nodes.forEach((myIterator.nextNode as jest.Mock).mockReturnValueOnce);

                const iterable = iterableFromNodeIterator(myIterator);

                nodeArrayFromIterable(iterable);

                expect(mockArrayFrom).toHaveBeenCalled();
            })
        )
    });
});

describe('nodeArrayFromNodeIterator', () => {
    test('composes nodeArrayFromIterable . iterableFromNodeIterator', () => {
        fc.assert(
            fc.property(
                fc.array(fc.constant((jest.fn()() as Node)), { maxLength: 50 }), nodes => {
                    const entries = nodes.entries();

                    const entriesCopy = [...nodes].entries();

                    const nodeIterator: MinimalNodeIterator = {
                        nextNode: () => entries.next().value
                    };

                    const nodeIteratorCopy: MinimalNodeIterator = {
                        nextNode: () => entriesCopy.next().value
                    }

                    const returnedNodes = nodeArrayFromNodeIterator(nodeIterator);

                    expect(returnedNodes)
                        .toEqual(nodeArrayFromIterable(iterableFromNodeIterator(nodeIteratorCopy)));
                }
            )
        );
    });
});