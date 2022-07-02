import { textNodesFromDocument } from "./text-nodes-from-document";
import unique from 'unique-selector';

interface TextNodeSelectorsFromDocumentArgs {
    nodes: Node[],
    getSelector: (node: Node) => string
}

export const selectorsFromDocument = (
    {
        nodes,
        getSelector
    }: TextNodeSelectorsFromDocumentArgs
) => nodes.map(getSelector);

 export const uniqueTextNodeSelectorsFromDocument = (document: Document) => selectorsFromDocument({
    nodes: textNodesFromDocument(document),
    getSelector: unique
 });