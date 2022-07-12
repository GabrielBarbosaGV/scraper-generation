import fc from "fast-check";
import { MinimalNodeIterator } from "./nodes-from-iterator";
import { obtainAllTextNodes } from "./text-node-acquisition";

(global as any).Node = {};

describe('obtainAllTextNodes', () => {
    test('returns the nodeArrayFromIterator . nodeIteratorFromRootNode composition', () => {
        fc.assert(
            fc.property(
                fc.array(fc.string({ maxLength: 20 }).map(s => ({ ...(jest.fn()() as Node), textContent: s })), { maxLength: 10 }),

                fc.constant((iterator: MinimalNodeIterator) => 
                    Array.from(function* () {
                        while (true) {
                            const nextNode = iterator.nextNode();

                            if (nextNode) yield nextNode;
                            else return;
                        }
                    }())),

                fc.string(),

                (nodes, nodeArrayFromNodeIterator, rootNodeTextContent) => {
                    const rootNode: Node = {
                        ...jest.fn()(),
                        textContent: rootNodeTextContent
                    };

                    const createNodeIterator = jest.fn().mockImplementation(() => {
                        const entries = [...nodes].entries();

                        return {
                            nextNode: () => entries.next().value
                        };
                    });

                    expect(
                        obtainAllTextNodes({
                            rootNode,
                            createNodeIterator,
                            nodeArrayFromNodeIterator
                        })
                    ).toEqual(
                        nodeArrayFromNodeIterator(
                            createNodeIterator(rootNode)
                        ).filter(node => !/^\s*$/.test(node.textContent))
                    );
                }
            )
        );
    });
});