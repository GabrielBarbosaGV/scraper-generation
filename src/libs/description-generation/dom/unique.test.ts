import fc from "fast-check";
import { uniqueSelector } from "./unique";

const unique = require('unique-selector');

jest.mock('unique-selector', () => jest.fn());

describe('uniqueSelector', () => {
    test('returns unique\'s return value, and unique must have been called with proper arguments', () => {
        fc.assert(
            fc.property(
                fc.string(),
                selector => {
                    (unique as jest.Mock).mockReturnValue(selector);

                    const node = jest.fn()();

                    expect(uniqueSelector(node)).toEqual(selector);
                    expect(unique).toHaveBeenCalledWith(
                        node,
                        { selectorTypes: ['ID', 'Class', 'Tag', 'NthChild'] }
                    );
                }
            )
        );
    });
});