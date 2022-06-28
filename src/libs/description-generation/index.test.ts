import fc from 'fast-check';
import { JSDOM }from 'jsdom';
import { documentFromText } from '.';

jest.mock('jsdom');

describe('documentFromTest', () => {
    test('instantiates a JSDOM', () => {
        (JSDOM as any).mockImplementation(() => ({
            window: {
                document: 'any string'
            }
        }));
        
        documentFromText('Any text');

        expect(JSDOM).toHaveBeenCalledTimes(1);
    });

    test('accesses window.document', () => {
        fc.assert(
            fc.property(fc.string(), fc.string(), (input, document) => {
                (JSDOM as any).mockImplementation(() => ({
                    window: {
                        document
                    }
                }));

                return documentFromText(input) as any === document;
            })
        );
    });
});