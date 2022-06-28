import fc from "fast-check";
import { obtainAllTextNodes } from "./text-node-acquisition";

(global as any).Node = {};

describe('obtainAllTextNodes', () => {
    test('returns the nodeArrayFromIterator . nodeIteratorFromRootNode composition', () => {
        fc.assert(
            fc.property(
                fc.array(fc.constant(jest.fn()() as Node), { maxLength: 50 })
                    .chain(arr => fc.func(fc.record({ nextNode: fc.constant(() => arr.entries().next().value) }))),

                fc.func(fc.array(fc.constant(jest.fn()() as Node))),

                (nodeIteratorFromRootNode, nodeArrayFromIterator) => {
                    expect(obtainAllTextNodes(
                        jest.fn()(),
                        {
                            nodeIteratorFromRootNode,
                            nodeArrayFromIterator
                        }
                    ))
                }
            )
        );
    });
});