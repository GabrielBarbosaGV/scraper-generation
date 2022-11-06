import { JSDOM } from 'jsdom';

const endAfterMilliseconds = (timeInMilliseconds: number) => new Promise(resolve => setTimeout(resolve, timeInMilliseconds));

interface RenderedDocumentFromUrlOpts {
    numberOfMillisecondsToWaitFor: number
}

interface RenderedDocumentFromUrl {
    [k: string]: RenderedDocumentFromUrlOpts
}

export const RenderedDocumentFromUrl: RenderedDocumentFromUrl = {
    defaultOpts: {
        numberOfMillisecondsToWaitFor: 3000
    }
};

export const renderedDocumentFromUrl = async (
    url: string,
    { numberOfMillisecondsToWaitFor }: RenderedDocumentFromUrlOpts
) => {
    // TODO
};
