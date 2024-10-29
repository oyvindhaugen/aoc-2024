export const getTodayLines = async (year: number, day: number) => {
  const headers = {
    headers: {
      Cookie: `session=${process.env.SESSION_COOKIE}`,
      'User-Agent': process.env.USER_AGENT || '',
    },
  };
  const res = await fetch(
    `https://adventofcode.com/${year}/day/${day}/input`,
    headers,
  );
  const text = await res.text();
  return text.split('\n');
};

export const getNumbersFromString = (input: string): number[] =>
  (input.match(/\d+/g) || []).map(Number);

export const numberToBinary = (n: number, length: number = 8): string =>
  n.toString(2).padStart(length, '0');

export const distanceBetweenPointsGrid = (
  x1: number,
  y1: number,
  x2: number,
  y2: number,
): number => Math.abs(x1 - x2) + Math.abs(y1 - y2);

export const binaryToDecimal = (binaryString: string): number => parseInt(binaryString, 2);