export const part1 = (lines: string): string | number => {
  const splitLines = lines.split('\n').filter(x => x).map(s => s.split('   ').map(x => parseInt(x)));

  const leftList = splitLines.map(x => x[0]).toSorted((a,b) => a - b);
  const rightList = splitLines.map(x => x[1]).toSorted((a,b) => a - b);
  const differences = leftList.map((num, idx) => Math.abs(num - rightList[idx]));

  return differences.reduce((acc, curr) => acc + curr, 0);
};

export const part2 = (lines: string): string | number => {
  const splitLines = lines.split('\n').filter(x => x).map(s => s.split('   ').map(x => parseInt(x)));

  const leftList = splitLines.map(x => x[0]);
  const rightList = splitLines.map(x => x[1]);

  return leftList.reduce((acc, curr) => acc + (curr * rightList.filter(x => x === curr).length), 0);
};
