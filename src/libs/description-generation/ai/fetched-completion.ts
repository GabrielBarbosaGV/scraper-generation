import { makeOpenAIApi } from './openai-creator';

export const completer = () => {
    const openai = makeOpenAIApi();

    return {
        for: (prompt: string) => openai.createCompletion({
            model: "text-davinci-002",
            prompt,
            temperature: 0
        })
    };
};