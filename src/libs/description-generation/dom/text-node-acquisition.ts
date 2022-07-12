import { MinimalNodeIterator } from "./nodes-from-iterator";

export interface TextNodeAcquisitionArgs {
    rootNode: Node,
    createNodeIterator: (node: Node, nodeType: number) => MinimalNodeIterator,
    nodeArrayFromNodeIterator: (minimalNodeIterator: MinimalNodeIterator) => Node[]
}

const SHOW_ELEMENT = 1;

export const obtainAllTextNodes = (
    {
        rootNode,
        createNodeIterator,
        nodeArrayFromNodeIterator
    }: TextNodeAcquisitionArgs
) => {
    const iterator = createNodeIterator(
        rootNode,
        SHOW_ELEMENT,
    );
    
    return nodeArrayFromNodeIterator(iterator).filter(nodeDoesNotHaveEmptyText);
};

const nodeDoesNotHaveEmptyText = (node: Node) => textIsNotEmpty(node.textContent);

const textIsNotEmpty = s => !textIsEmpty(s);

const textIsEmpty = s =>  /^\s*$/.test(s);