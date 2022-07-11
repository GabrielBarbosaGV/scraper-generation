import { descriptionSuffix } from "./description-suffix";

describe('descriptionSuffix', () => {
    test('returns expected text', () => {
        expect(descriptionSuffix()).toContain(
            "in JSON:"
        )
    });
});