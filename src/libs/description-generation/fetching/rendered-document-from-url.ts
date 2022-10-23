interface UnrenderedDocument {

}

interface RenderedDocumentFromUrl {
    [k: string]: RenderedDocumentFromUrlOpts
}

interface RenderedDocumentFromUrlOpts {
    fetchingWith: (url: string) => UnrenderedDocument,
    renderingWith: (unrenderedDocument: UnrenderedDocument) => Document
}

export const RenderedDocumentFromUrl: RenderedDocumentFromUrl = {
};

export const renderedDocumentFromUrl = (
    url: string,
    {
        fetchingWith: fetch,
        renderingWith: render
    }: RenderedDocumentFromUrlOpts
) => {
    const unrenderedDocument = fetch(url);

    const renderedDocument = render(unrenderedDocument);
    
    return renderedDocument;
};