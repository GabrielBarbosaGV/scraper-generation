import { MinimalNodeIterator } from "./nodes-from-iterator";

export interface TextNodeAcquisitionArgs {
    nodeIteratorFromRootNode: (Node) => MinimalNodeIterator,
    nodeArrayFromNodeIterator: (MinimalNodeIterator) => Node[]
}

export const obtainAllTextNodes = (
    rootNode: Node,
    {
        nodeIteratorFromRootNode,
        nodeArrayFromNodeIterator
    }: TextNodeAcquisitionArgs
) => {
    const iterator = nodeIteratorFromRootNode(rootNode);
    
    return nodeArrayFromNodeIterator(iterator);
};
