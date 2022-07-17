import { MinimalDocument, textNodesFromDocument } from "./text-nodes-from-document";
import { uniqueSelector } from "./unique";

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

 export const uniqueTextNodeSelectorsFromDocument = (document: MinimalDocument) => selectorsFromDocument({
    nodes: textNodesFromDocument(document),
    getSelector: uniqueSelector
 });