import fc from "fast-check";
import { listTopics } from './list-topics';
import { descriptionPrefix } from './description-prefix';

jest.mock('./list-topics');

describe('descriptionPrefix', () => {
    test('generates text containing listTopics\' return value', () => {
        fc.assert(
            fc.property(
                fc.array(fc.string({ maxLength: 20 })),
                fc.string({ maxLength: 100 }),
                (topics, listTopicsReturnValue) => {
                    (listTopics as jest.Mock).mockReturnValue(listTopicsReturnValue);

                    expect(descriptionPrefix(topics)).toContain(listTopicsReturnValue);
                }
            )
        );
    });
});