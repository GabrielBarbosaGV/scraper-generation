import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';

interface TextSupplier {
    text: () => Promise<string>
}

interface DocumentFromUrlOpts  {
    fetch: (s: string) => Promise<TextSupplier>,
    domify: (s: string) => JSDOM
}

const defaultDocumentFromUrlOpts = {
    fetch,
    domify: (s: string) => new JSDOM(s)
};

export const documentFromUrl = async (
    url: string,
    {
        fetch,
        domify
    }: DocumentFromUrlOpts = defaultDocumentFromUrlOpts
) => {
    const fetched = await fetch(url);

    const text = await fetched.text();

    return domify(text);
};