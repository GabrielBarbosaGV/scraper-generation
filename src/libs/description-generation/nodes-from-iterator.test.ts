import fc from "fast-check";
import { MinimalNodeIterator, nodeArrayFromIterable, nodesFromIterator } from "./nodes-from-iterator";

(global as any).Node = {};

describe('nodesFromIterator', () => {
    test('finishes after as many iterations as supplied by "nextNode"', () => {
        fc.assert(
            fc.property(fc.array(fc.record({}), { maxLength: 50 }), nodes => {
                const myIterator: MinimalNodeIterator = {
                    nextNode: jest.fn()
                };

                nodes.forEach((myIterator.nextNode as jest.Mock).mockReturnValueOnce);

                expect(Array.from(nodesFromIterator(myIterator))).toHaveLength(nodes.length);
            })
        );
    });
});

describe('nodeArrayFromIterator', () => {
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

                const iterable = nodesFromIterator(myIterator);

                nodeArrayFromIterable(iterable);

                expect(mockArrayFrom).toHaveBeenCalled();
            })
        )
    });
});