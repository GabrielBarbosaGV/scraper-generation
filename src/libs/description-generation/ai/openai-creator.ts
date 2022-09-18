import { Configuration, OpenAIApi } from "openai";

export const makeOpenAIApi = () => new OpenAIApi(
    new Configuration({
        apiKey: process.env.OPENAI_API_KEY
    })
);