import { MinimalDocument, textNodesFromDocument } from "./text-nodes-from-document";
import unique from 'unique-selector';

export const textNodeSelectorsFromDocument = (document: MinimalDocument) =>
    textNodesFromDocument(document).map(unique);