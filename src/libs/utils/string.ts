export function* indicesOf(s: string, sub: string) {
    let currS = s;

    let cumulativeIndex = 0;

    const subLength = sub.length;

    while (currS.length > 0) {
        const index = currS.indexOf(sub);

        if (index === -1) {
            return;
        } else {
            yield cumulativeIndex + index;

            const lastPositionOfSubstring = index + subLength;

            cumulativeIndex += lastPositionOfSubstring;
            currS = currS.slice(lastPositionOfSubstring);
        }
    }
}
