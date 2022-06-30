import { MinimalNodeIterator } from "./nodes-from-iterator";
export interface TextNodeAcquisitionArgs {
    createNodeIterator: (node: Node, nodeType: number) => MinimalNodeIterator,
    nodeArrayFromNodeIterator: (minimalNodeIterator: MinimalNodeIterator) => Node[]
}

const SHOW_TEXT = 4; // Unable to find NodeFilter in JSDOM, thus using fixed value.
                     // This ensures only text nodes are selected, when used below.

export const obtainAllTextNodes = (
    rootNode: Node,
    {
        createNodeIterator,
        nodeArrayFromNodeIterator
    }: TextNodeAcquisitionArgs
) => {
    const iterator = createNodeIterator(
        rootNode,
        SHOW_TEXT
    );
    
    return nodeArrayFromNodeIterator(iterator);
};