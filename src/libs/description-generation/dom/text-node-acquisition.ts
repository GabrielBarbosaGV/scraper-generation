import { MinimalNodeIterator } from "./nodes-from-iterator";

interface AcceptNode {
    acceptNode: (node: Node) => number
}

export interface TextNodeAcquisitionArgs {
    rootNode: Node,
    createNodeIterator: (node: Node, nodeType: number, acceptNode?: AcceptNode) => MinimalNodeIterator,
    nodeArrayFromNodeIterator: (minimalNodeIterator: MinimalNodeIterator) => Node[]
}

const SHOW_TEXT = 4;

export const obtainAllTextNodes = (
    {
        rootNode,
        createNodeIterator,
        nodeArrayFromNodeIterator
    }: TextNodeAcquisitionArgs
) => {
    const iterator = createNodeIterator(
        rootNode,
        SHOW_TEXT,
    );
    
    return nodeArrayFromNodeIterator(iterator)
        .filter(nodeDoesNotHaveEmptyText)
        .map(parentOfTextElement);
};

const parentOfTextElement = (node: Node) => node.parentElement!;

const nodeDoesNotHaveEmptyText = (node: Node) => textIsNotEmpty(node.textContent ?? '');

const textIsNotEmpty = (s: string) => !textIsEmpty(s);

const textIsEmpty = (s: string) => /^\s*$/.test(s);