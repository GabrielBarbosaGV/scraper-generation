import fc from "fast-check";
import { completionsForAllDescriptions } from "./completion";

describe('completionsForAllDescriptions', () => {
    test('awaits all completions and returns them', () => {
        return fc.assert(
            fc.asyncProperty(
                fc.array(
                    fc.string(),
                    { maxLength: 50 }
                ),

                async (ss) => {
                    const immediateCompleter = jest.fn().mockImplementation(s => `${s}${s}`);

                    const promiseCompleter = async (s: string) => immediateCompleter(s);

                    const allCompletions = await completionsForAllDescriptions(ss, { completingWith: promiseCompleter });

                    const mappedSs = ss.map(immediateCompleter);

                    expect(allCompletions).toEqual(mappedSs);
                }
            )
        );
    });
});