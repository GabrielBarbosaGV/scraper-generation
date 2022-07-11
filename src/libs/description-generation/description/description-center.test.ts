import fc from "fast-check";
import { uniqueTextNodeSelectorsFromDocument } from "../dom/text-node-selectors-from-document";
import { MinimalDocument } from "../dom/text-nodes-from-document";
import { descriptionCenter } from "./description-center";
import { extractSummarizing } from "./extractors";
import { pageRepresentation } from "./page-representation";

jest.mock('../dom/text-node-selectors-from-document');
jest.mock('./extractors');

const getSelectors = uniqueTextNodeSelectorsFromDocument;

describe('descriptionCenter', () => {
    test('calls pageRepresentation with expected arguments', () => {
        fc.assert(
            fc.property(
                fc.array(fc.string(), { maxLength: 50 }),
                fc.func(fc.string()),
                (selectors, summarizer) => {
                    (getSelectors as jest.Mock).mockReturnValue(selectors);
                    (extractSummarizing as jest.Mock).mockImplementation(summarizer);

                    const document: MinimalDocument = jest.fn()();

                    expect(descriptionCenter(document)).toEqual(
                        pageRepresentation({
                            document,
                            selectorsWithExtractors: getSelectors(document)
                                .map(selector => [selector, extractSummarizing])
                        })
                    );
                }
            )
        );
    });
});