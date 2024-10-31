export const part1 = (lines: string) => {
  const intLines: number[] = lines.split('\n').map(x => parseInt(x));
  return intLines.reduce((acc, curr) => acc + (Math.floor(curr / 3) - 2), 0);
};
export const part2 = (lines: string) => {
  const intLines: number[] = lines.split('\n').map(x => parseInt(x));
  return intLines.reduce((acc, curr) => {
    let current = curr;
    let accumulated = 0;
    while (current > 0) {
      current = calculate(current);
      if (current > 0) accumulated += current;
    }
    return acc + accumulated;
  }, 0);
};

const calculate = (num: number): number => Math.floor(num / 3) - 2;
