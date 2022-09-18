import { MinimalDocument } from "../dom/text-nodes-from-document"

interface SelectorRepresentationArgs {
    document: MinimalDocument,
    selectorWithExtractor: SelectorWithExtractor
}

export interface ExtractorArgs {
    selector: string,
    querySelector: (string) => Node
}

type SelectorWithExtractor = [string, (extractorArgs: ExtractorArgs) => string];

const selectorRepresentation = ({ document, selectorWithExtractor: [selector, extractor] }: SelectorRepresentationArgs) =>
    `${selector}: ${extractor({ selector, querySelector: document.querySelector.bind(document) })}`;

const selectorRepresentationGetterFor =
    (document: MinimalDocument) => (selectorWithExtractor: SelectorWithExtractor) =>
        selectorRepresentation({ document, selectorWithExtractor });

interface PageRepresentationArgs {
    document: MinimalDocument,
    selectorsWithExtractors: SelectorWithExtractor[]
}

export const pageRepresentation = (
    {
        document,
        selectorsWithExtractors
    }: PageRepresentationArgs
) => selectorsWithExtractors.map(selectorRepresentationGetterFor(document)).join('\n');