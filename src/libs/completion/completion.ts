type Completer = (prompt: string) => Promise<string>;

export const completionsForAllDescriptions = async (ss: string[], completer: Completer) => {
    return await Promise.all(ss.map(completer));
};