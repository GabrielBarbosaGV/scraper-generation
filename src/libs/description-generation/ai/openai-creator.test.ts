import { Configuration, OpenAIApi } from "openai";
import { makeOpenAIApi } from "./openai-creator";

describe('makeOpenAIApi', () => {
    test('creates expected object', () => {
        expect(makeOpenAIApi()).toEqual(new OpenAIApi(
            new Configuration({
                apiKey: process.env.OPENAI_API_KEY
            })
        ));
    });
});