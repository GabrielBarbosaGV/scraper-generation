import { MinimalNodeIterator, nodeArrayFromNodeIterator } from "./nodes-from-iterator";
import { obtainAllTextNodes } from "./text-node-acquisition";
import { textNodesFromDocument } from "./text-nodes-from-document";

jest.mock('./text-node-acquisition');

describe('textNodesFromDocument', () => {
    test('calls obtainAllTextNodes with expected arguments', () => {
        const rootNodeMock: Node = jest.fn()();

        const createNodeIterator: (Node) => MinimalNodeIterator = jest.fn();
        const getRootNode: () => Node = jest.fn().mockReturnValue(rootNodeMock);

        textNodesFromDocument({ createNodeIterator, getRootNode });

        expect(obtainAllTextNodes)
            .toHaveBeenCalledWith(
                rootNodeMock,
                {
                    nodeIteratorFromRootNode: createNodeIterator,
                    nodeArrayFromNodeIterator
                }
            );
    });
});