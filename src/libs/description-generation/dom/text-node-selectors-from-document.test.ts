import fc from "fast-check";
import { selectorsFromDocument, uniqueTextNodeSelectorsFromDocument } from "./text-node-selectors-from-document";
const unique = require('unique-selector');
import { textNodesFromDocument } from './text-nodes-from-document';
import { uniqueSelector } from "./unique";

jest.mock('unique-selector', () => jest.fn());
jest.mock('./text-nodes-from-document');

describe('selectorsFromDocument', () => {
    test('maps a selector getter over nodes', () => {
        fc.assert(
            fc.property(
                fc.array(fc.constant(jest.fn()() as Node), { maxLength: 50 }),
                fc.func(fc.string({ maxLength: 20 })),
                (nodes, getSelector) => {
                    expect(selectorsFromDocument({ nodes, getSelector })).toEqual(nodes.map(getSelector));
                }
            )
        );
    });
});

describe('uniqueTextNodeSelectorsFromDocument', () => {
    test('call selectorsFromDocument with expected arguments', () => {
        fc.assert(
            fc.property(
                fc.array(fc.constant(jest.fn()() as Node), { maxLength: 50 }),
                fc.func(fc.string({ maxLength: 20 })),
                (nodes, getSelector) => {
                    (textNodesFromDocument as jest.Mock).mockReturnValue(nodes);
                    (unique as jest.Mock).mockReturnValue(getSelector);

                    const mockDocument = jest.fn()() as Document;

                    expect(uniqueTextNodeSelectorsFromDocument(mockDocument))
                        .toEqual(selectorsFromDocument({
                            nodes: textNodesFromDocument(mockDocument),
                            getSelector: uniqueSelector
                        }));
                }
            )
        )
    });
});