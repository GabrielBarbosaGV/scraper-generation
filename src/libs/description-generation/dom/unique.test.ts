import fc from "fast-check";
import unique from 'unique-selector';
import { uniqueSelector } from "./unique";

jest.mock('unique-selector');

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