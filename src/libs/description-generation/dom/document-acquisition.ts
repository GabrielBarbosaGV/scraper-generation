import { JSDOM } from 'jsdom';

export const documentFromText = (text: string) => new JSDOM(text).window.document;
