// Returns a pair of strings, of which the first is the
// slice of the string up to a newline or the character
// positioned at n, whichever comes first. The second
// string is the rest
export const chompLinesUpToNCharacters = (s: string, n: number) => {
    const sUpToN = s.slice(0, n);

    const lastIndexOfNewlineWithinRange = sUpToN.lastIndexOf('\n');

    const cutoffIndex = lastIndexOfNewlineWithinRange === -1
        ? sUpToN.length
        : lastIndexOfNewlineWithinRange;

    return [
        s.slice(0, cutoffIndex),
        s.slice(cutoffIndex)
    ];
};
