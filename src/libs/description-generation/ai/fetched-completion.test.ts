import fc from "fast-check";
import { completer } from "./fetched-completion";
import { makeOpenAIApi } from "./openai-creator";

jest.mock('./openai-creator');

describe('completer', () => {
    test('creates object with "for" property function that calls underlying OpenAI object', () => {
        fc.assert(
            fc.property(
                fc.string(),
                fc.string(),
                (completionArg, completionReturnValue) => {
                    const wrapperObject = {
                        data: {
                            choices: [
                                { text: completionReturnValue }
                            ]
                        }
                    };

                    const createCompletion = jest.fn().mockReturnValue(wrapperObject);

                    (makeOpenAIApi as jest.Mock).mockReturnValue({
                        createCompletion
                    });

                    const completion = completer();

                    expect(completion.for(completionArg)).resolves.toEqual(completionReturnValue);

                    expect(createCompletion).toHaveBeenCalledWith({
                        model: "text-davinci-002",
                        prompt: completionArg,
                        temperature: 0,
                        max_tokens: 300
                    });

                    jest.resetAllMocks();
                }
            )
        )
    });
});