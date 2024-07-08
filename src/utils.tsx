export function calcWiggle(
    minNum: number,
    maxNum: number,
    interval: number,
    date: Date
): number {
    // If max smaller than min, swap them
    if (minNum > maxNum) {
        [minNum, maxNum] = [maxNum, minNum];
    }

    const difference = maxNum - minNum;
    const secondsSinceEpoch = Math.round(date.getTime() / 1000);
    const cycles = Math.floor(secondsSinceEpoch / interval);
    const currentPosition = cycles % (2 * difference);

    let result = currentPosition;
    if (result > difference) {
        result = 2 * difference - result;
    }

    return result;
}
