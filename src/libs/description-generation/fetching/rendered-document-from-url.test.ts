import { renderedDocumentFromUrl } from "./rendered-document-from-url";

describe('renderedDocumentFromUrl', () => {
    test('fetches then renders document', () => {
        const url = 'someurl';
    
        const unrenderedDocument = 'abc';
    
        const fetch = jest.fn().mockReturnValue(unrenderedDocument);

        const renderedDocument = 'def';

        const render = jest.fn().mockReturnValue(renderedDocument);

        const document = renderedDocumentFromUrl(
            url,
            {
                fetchingWith: fetch,
                renderingWith: render
            }
        );

        expect(fetch).toHaveBeenCalledWith(url);
        expect(render).toHaveBeenCalledWith(unrenderedDocument);
        expect(document).toEqual(renderedDocument);
    });
});