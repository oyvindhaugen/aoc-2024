export const part1 = (lines: string): string | number => {
    const splitLines = lines.split('\n').filter(x => x).map(line => line.split(' ').map(s => parseInt(s)));

    return splitLines.filter(line => isIncreasingOrDecreasing(line)).length;
};

export const part2 = (lines: string): string | number => {
    const splitLines = lines.split('\n').filter(x => x).map(line => line.split(' ').map(s => parseInt(s)));

    return splitLines.filter(line => { 
        const isValid = isIncreasingOrDecreasing(line);
        let isDampenedValid = false;
        if (!isValid) {
            line.forEach((_, idx) => {
                const lineToCheck = [...line.slice(0, idx), ...line.slice(idx + 1)];
                if (isIncreasingOrDecreasing(lineToCheck)) isDampenedValid = true;
            })
        }

        return isValid || isDampenedValid
    }).length;
};

const isIncreasingOrDecreasing = (line: number[]): boolean => {
    const isIncreasing = line.every((num, i, arr) => {
        if (i === 0) return true; 
        const diff = num - arr[i - 1];
        return diff >= 1 && diff <= 3;
    });

    const isDecreasing = line.every((num, i, arr) => {
        if (i === 0) return true; 
        const diff = arr[i - 1] - num;
        return diff >= 1 && diff <= 3;
    });

    return isIncreasing || isDecreasing
}
