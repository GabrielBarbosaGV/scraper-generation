import fc from "fast-check";
import { listTopics } from "./list-topics";

describe('listTopics', () => {
    test('has expected implementation', () => {
        fc.assert(
            fc.property(
                fc.array(fc.string({ maxLength: 50 })),
                topics => {
                    expect(listTopics(topics)).toEqual(
                        `${topics.map(topic => `- "${topic}"`).join(';\n')}.`
                    );
                }
            )
        );
    });
});