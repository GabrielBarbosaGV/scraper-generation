import { MinimalNodeIterator } from "./nodes-from-iterator";

export interface TextNodeAcquisitionArgs {
    nodeIteratorFromRootNode: (Node) => MinimalNodeIterator,
    nodeArrayFromIterator: (MinimalNodeIterator) => Node[]
}

export const obtainAllTextNodes = (
    rootNode: Node,
    {
        nodeIteratorFromRootNode,
        nodeArrayFromIterator
    }: TextNodeAcquisitionArgs
) => {
    const iterator = nodeIteratorFromRootNode(rootNode);
    
    return nodeArrayFromIterator(iterator);
};
