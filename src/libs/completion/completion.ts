import { backOff } from 'exponential-backoff';

type Completer<T> = (prompt: T) => Promise<T>;

interface CompletionsForAllDescriptionsOpts<T> {
    completingWith: Completer<T>
}

export const completionsForAllDescriptions = async <T,>(values: T[], { completingWith }: CompletionsForAllDescriptionsOpts<T>) => {
    return await Promise.all(values.map(completingWith));
};

export const exponentialBackOffCompletions = async <T,>(values: T[], { completingWith }: CompletionsForAllDescriptionsOpts<T>) => {
    return await Promise.all(values.map(v => backOff(() => completingWith(v), { numOfAttempts: 100 })));
};