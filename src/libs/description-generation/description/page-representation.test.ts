import fc from "fast-check";
import { MinimalDocument } from "../dom/text-nodes-from-document";
import { pageRepresentation } from "./page-representation";

describe('pageRepresentation', () => {
    test('generates a representation of given document', () => {
        fc.assert(
            fc.property(
                fc.array(fc.tuple(fc.string(), fc.func(fc.string()).map(f => jest.fn().mockImplementation(f)))),
                selectorsWithExtractors => {
                    const document: MinimalDocument = jest.fn()();

                    const representation = pageRepresentation({ document, selectorsWithExtractors });

                    expect(representation).toEqual(
                        selectorsWithExtractors.map(([selector, extractor]) =>
                            `${selector}: ${extractor({ selector, ...document })}`
                        )
                        .join('\n')
                    );
                }
            )
        );
    });
});