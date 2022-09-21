import fc from "fast-check";
import { completionsForAllDescriptions } from "./completion";

describe('completionsForAllDescriptions', () => {
    test('awaits all completions and returns them', () => {
        fc.assert(
            fc.property(
                fc.array(
                    fc.string(),
                    { maxLength: 50 }
                ).chain(ss => fc.tuple(fc.constant(ss), fc.func(fc.string()))),

                ([ss, immediateCompleter]) => {
                    const promiseCompleter = (s: string): Promise<string> => new Promise((resolve) => resolve(immediateCompleter(s)));

                    const allCompletions = completionsForAllDescriptions(ss, promiseCompleter);

                    const promise = allCompletions.then(allS => allS.map(s => ss.includes(s)).reduce((a, b) => a && b, true));

                    expect(promise).resolves.toBeTruthy();
                }
            )
        );
    });
});