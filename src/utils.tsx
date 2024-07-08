export function calcWiggle(
    date: Date,
    wiggleAmount: number,
    wiggleInterval: number
): number {
    const secondsSinceEpoch = Math.round(date.getTime() / 1000);
    const cycles = Math.floor(secondsSinceEpoch / wiggleInterval);
    const currentPosition = cycles % (2 * wiggleAmount);

    let result = currentPosition;
    if (result > wiggleAmount) {
        result = 2 * wiggleAmount - result;
    }
    return result - wiggleAmount + Math.round(wiggleAmount / 2);
}
