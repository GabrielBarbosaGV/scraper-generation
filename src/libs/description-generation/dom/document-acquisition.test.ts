import fc from 'fast-check';
import { JSDOM }from 'jsdom';
import { documentFromText } from './document-acquisition';

jest.mock('jsdom');

describe('documentFromText', () => {
    test('instantiates a JSDOM', () => {
        (JSDOM as any).mockReturnValue({
            window: {
                document: 'any string'
            }
        });
        
        documentFromText('Any text');

        expect(JSDOM).toHaveBeenCalledTimes(1);
    });

    test('accesses window.document', () => {
        fc.assert(
            fc.property(fc.string(), fc.string(), (input, document) => {
                (JSDOM as any).mockReturnValue({
                    window: {
                        document
                    }
                });

                expect(documentFromText(input)).toBe(document)
            })
        );
    });
});