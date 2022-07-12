import fc from "fast-check";
import { MinimalNodeIterator, nodeArrayFromNodeIterator } from "./nodes-from-iterator";
import { obtainAllTextNodes, TextNodeAcquisitionArgs } from "./text-node-acquisition";
import { textNodesFromDocument } from "./text-nodes-from-document";

jest.mock('./text-node-acquisition');

describe('textNodesFromDocument', () => {
    test('calls obtainAllTextNodes with expected arguments', () => {
        fc.assert(
            fc.property(
                fc.array(fc.constant('').map(_ => (jest.fn()() as Node))),
                nodes => {
                    const iterator = nodes[Symbol.iterator];

                    const rootNode: Node = jest.fn()();

                    const createNodeIterator: (node: Node, nodeType: number) => MinimalNodeIterator =
                        jest.fn().mockReturnValue(iterator);
                    const getRootNode: () => Node = jest.fn().mockReturnValue(rootNode);

                    const minimalDocument = {
                        createNodeIterator,
                        getRootNode,
                        querySelector: jest.fn()
                    };

                    textNodesFromDocument(minimalDocument);

                    expect(obtainAllTextNodes)
                        .toHaveBeenCalledWith(expect.objectContaining({ rootNode, nodeArrayFromNodeIterator }));

                    const passedCreateNodeIterator = ((obtainAllTextNodes as jest.Mock).mock.calls[0][0] as TextNodeAcquisitionArgs)
                        .createNodeIterator;

                    expect(passedCreateNodeIterator(jest.fn()(), jest.fn()())).toBe(iterator);
                }
            )
        )
    });

    test('returns nodeArrayFromNodeIterator . createNodeIterator composition over root node', () => {
        fc.assert(
            fc.property(
                fc.array(fc.constant(jest.fn()() as Node), { maxLength: 50 }),
                nodes => {
                    (obtainAllTextNodes as jest.Mock).mockReturnValue(nodes);

                    const returnedNodes = textNodesFromDocument({
                        createNodeIterator: jest.fn(),
                        getRootNode: jest.fn(),
                        querySelector: jest.fn()
                    });

                    expect(returnedNodes).toEqual(nodes);
                }
            )
        );
    });
});