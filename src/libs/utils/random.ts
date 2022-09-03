interface RandomIntArgs {
    min: number,
    max: number,
    randomFromZeroToOne?: () => number,
    floor?: (n: number) => number
}

export const randomInt = (
    {
        min,
        max,
        randomFromZeroToOne = Math.random,
        floor = Math.floor
    }: RandomIntArgs
) => {
    const scaled = randomFromZeroToOne() * (max - min);

    const based = scaled + min;

    return floor(based);
}
