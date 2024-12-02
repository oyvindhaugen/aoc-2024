export const part1 = (lines: string): string | number => {
    const splitLines = lines.split('\n').map(line => line.split(' ').map(s => parseInt(s)));
    
    console.log(splitLines.length)

    const filteredSplitLines = splitLines.filter(line => {
        //logic is flawed, rethink
        line.every((val, idx) => idx === 0 || ((val < line[idx - 1] && differenceInRange(val, line[idx - 1], 3)) || (val > line[idx - 1] && differenceInRange(val, line[idx - 1], 3))));
    });
    console.log(filteredSplitLines.length)



    return 0;
};

const differenceInRange = (n1: number, n2: number, range: number): boolean => Math.abs(n1 - n2) <= range;

export const part2 = (lines: string): string | number => {
    return 0;
};
