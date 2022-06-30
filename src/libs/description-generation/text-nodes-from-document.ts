import { MinimalNodeIterator, nodeArrayFromNodeIterator } from "./nodes-from-iterator";
import { obtainAllTextNodes } from "./text-node-acquisition";

export interface MinimalDocument {
    createNodeIterator: (node: Node, nodeFilter: number) => MinimalNodeIterator,
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
        createNodeIterator: createNodeIterator,
        nodeArrayFromNodeIterator: nodeArrayFromNodeIterator
    }
);