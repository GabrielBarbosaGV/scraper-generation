import { extractedFrom } from './extract-completion-from-axios-response';
import { makeOpenAIApi } from './openai-creator';

export const completer = () => {
    const openai = makeOpenAIApi();

    return {
        for: async (prompt: string) => {
            const completionObject = await openai.createCompletion({
                model: "text-davinci-002",
                prompt,
                temperature: 0
            });

            return extractedFrom(completionObject);
        }
    };
};