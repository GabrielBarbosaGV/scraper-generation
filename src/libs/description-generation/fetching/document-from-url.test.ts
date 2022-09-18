import { documentFromUrl } from './document-from-url';

jest.mock('node-fetch');

describe('documentFromUrl', () => {
    const url = 'abc';

    const supplyText = {
        text: jest.fn().mockReturnValue('cba')
    };

    const fetch = jest.fn().mockReturnValue(supplyText);

    const domify = jest.fn().mockReturnValue({
        window: {
            document: jest.fn()()
        }
    });

    test('fetches from url', async () => {
        await documentFromUrl(url, {
            fetch,
            domify
        });

        expect(fetch).toHaveBeenCalledTimes(1);
    });

    test('obtains text from fetched content', () => {
        expect(supplyText.text).toHaveBeenCalledTimes(1);
    });

    test('calls domify with value gotten from supplyText', () => {
        expect(domify).toHaveBeenCalledWith('cba');
    });
});