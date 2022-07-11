import { uniqueTextNodeSelectorsFromDocument } from "../dom/text-node-selectors-from-document";
import { MinimalDocument } from "../dom/text-nodes-from-document";
import { extractSummarizing } from "./extractors";
import { pageRepresentation } from "./page-representation";

const getSelectors = uniqueTextNodeSelectorsFromDocument;

export const descriptionCenter = (document: MinimalDocument) =>
    pageRepresentation({
        document,

        selectorsWithExtractors: getSelectors(document)
            .map(selector => [selector, extractSummarizing])
    });