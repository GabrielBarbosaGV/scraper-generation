import fc from "fast-check";
import { extractSummarizing } from "./extractors";
import { summarizedText } from "./summarizers";

jest.mock('./summarizers');

describe('extractSummarizing', () => {
    test('summarizes text extracted from tag', () => {
        fc.assert(
            fc.property(
                fc.func(fc.string().map(s => ({ firstChild: { textContent: s } }))),
                fc.func(fc.string()),
                fc.string(),
                (querySelectorImpl, summarizeTextImpl, selector) => {

                    const querySelector = jest.fn().mockImplementation(querySelectorImpl);

                    (summarizedText as jest.Mock).mockImplementation(summarizeTextImpl);

                    expect(extractSummarizing({ selector, querySelector }))
                        .toEqual(summarizeTextImpl(querySelector(selector).firstChild.textContent))
                }
            )
        )
    });
});