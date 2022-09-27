type Completer = (prompt: string) => Promise<string>;

interface CompletionsForAllDescriptionsOpts {
    completingWith: Completer
}

export const completionsForAllDescriptions = async (ss: string[], { completingWith }: CompletionsForAllDescriptionsOpts) => {
    return await Promise.all(ss.map(completingWith));
};