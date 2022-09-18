import fc from "fast-check";
import { completionsForAllDescriptions } from "./completion";

describe('completionsForAllDescriptions', () => {
    test('awaits all completions and returns them', async () => {
        fc.assert(
            fc.property(
                fc.array(
                    fc.string(),
                    { maxLength: 50 }
                ).chain(ss => fc.tuple(fc.constant(ss), fc.func(fc.string()))),

                ([ss, immediateCompleter]) => {
                    const promiseCompleter = (s: string): Promise<string> => new Promise((resolve) => resolve(immediateCompleter(s)));

                    const allCompletions = completionsForAllDescriptions(ss, promiseCompleter);

                    allCompletions.then(allS => expect(allS.map(s => s in ss).reduce((a, b) => a && b)));
                }
            )
        )
    });
});