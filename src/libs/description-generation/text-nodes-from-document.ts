import { MinimalNodeIterator, nodeArrayFromIterator } from "./nodes-from-iterator";
import { obtainAllTextNodes } from "./text-node-acquisition";

export interface MinimalDocument {
    createNodeIterator: (Node) => MinimalNodeIterator,
    getRootNode: () => Node
}

export const textNodesFromDocument = (
    {
        createNodeIterator,
        getRootNode
    }: MinimalDocument
) => obtainAllTextNodes(
    getRootNode(),
    {
        nodeIteratorFromRootNode: createNodeIterator,
        nodeArrayFromIterator
    }
);
