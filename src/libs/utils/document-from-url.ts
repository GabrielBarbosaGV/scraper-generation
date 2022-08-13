import { documentFromText } from '@libs/description-generation/dom/document-acquisition';
import fetch from 'node-fetch';

export const documentFromUrl = async (url: string) => {
    const response = await fetch(url);

    const text = await response.text();

    const document = documentFromText(text);

    return document;
};