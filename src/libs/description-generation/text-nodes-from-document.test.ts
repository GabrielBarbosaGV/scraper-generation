import fc from "fast-check";
import { MinimalNodeIterator, nodeArrayFromNodeIterator } from "./nodes-from-iterator";
import { obtainAllTextNodes } from "./text-node-acquisition";
import { textNodesFromDocument } from "./text-nodes-from-document";

jest.mock('./text-node-acquisition');

describe('textNodesFromDocument', () => {
    test('calls obtainAllTextNodes with expected arguments', () => {
        const rootNodeMock: Node = jest.fn()();

        const createNodeIterator: (node: Node, nodeType: number) => MinimalNodeIterator = jest.fn();
        const getRootNode: () => Node = jest.fn().mockReturnValue(rootNodeMock);

        textNodesFromDocument({ createNodeIterator, getRootNode });

        expect(obtainAllTextNodes)
            .toHaveBeenCalledWith(
                rootNodeMock,
                {
                    createNodeIterator: createNodeIterator,
                    nodeArrayFromNodeIterator
                }
            );
    });

    test('returns nodeArrayFromNodeIterator . createNodeIterator composition over root node', () => {
        fc.assert(
            fc.property(
                fc.array(fc.constant(jest.fn()() as Node), { maxLength: 50 }),
                nodes => {
                    (obtainAllTextNodes as jest.Mock).mockReturnValue(nodes);

                    const returnedNodes = textNodesFromDocument({
                        createNodeIterator: jest.fn(),
                        getRootNode: jest.fn()
                    });

                    expect(returnedNodes).toEqual(nodes);
                }
            )
        );
    });
});