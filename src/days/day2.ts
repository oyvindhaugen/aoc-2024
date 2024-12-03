export const part1 = (lines: string): string | number => {
    const splitLines = lines.split('\n').filter(x => x).map(line => line.split(' ').map(s => parseInt(s)));

    const filteredSplitLines = splitLines.filter(line => { 
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
    });

    return filteredSplitLines.length;
};

export const part2 = (lines: string): string | number => {
    return 0;
};
