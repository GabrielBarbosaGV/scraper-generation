import { MinimalNodeIterator, nodeArrayFromNodeIterator } from "./nodes-from-iterator";
import { obtainAllTextNodes } from "./text-node-acquisition";

export interface MinimalDocument {
    createNodeIterator: (node: Node, nodeFilter: number) => MinimalNodeIterator,
    getRootNode: () => Node,
    querySelector: (selector: string) => Node
}

export const textNodesFromDocument = (
    document: MinimalDocument
) =>  {
    const {
        createNodeIterator,
        getRootNode
    } = document;

    return obtainAllTextNodes(
        {
            rootNode: getRootNode.bind(document)(),
            createNodeIterator: createNodeIterator.bind(document),
            nodeArrayFromNodeIterator
        }
    );
}