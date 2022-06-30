import fc from "fast-check";
import { textNodeSelectorsFromDocument } from "./text-node-selectors-from-document";
import { MinimalDocument, textNodesFromDocument } from "./text-nodes-from-document";
import unique from 'unique-selector';

jest.mock('unique-selector');
jest.mock('./text-nodes-from-document');

describe('textNodeSelectorsFromDocument', () => {
    test('gets unique selectors for each node obtained from document using textNodesFromDocument', () => {
        fc.assert(
            fc.property(fc.array(fc.constant(jest.fn()() as Node), { maxLength: 50 }), nodes => {
                const document: MinimalDocument = jest.fn()();

                (textNodesFromDocument as jest.Mock).mockReturnValue(nodes);

                textNodeSelectorsFromDocument(document);

                expect(textNodesFromDocument).toHaveBeenCalledTimes(1);
                expect(unique).toHaveBeenCalledTimes(nodes.length);

                jest.clearAllMocks();
            })
        );
    });
});