/* eslint-disable n/no-unsupported-features/node-builtins */
import fs from 'fs';

const fetchInput = async (year: number, day: number): Promise<string> => {
  console.log(`fetching calendar ${year}, day ${day}`);
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
  return await res.text();
};

const isCached = (day: number): boolean =>
  fs.existsSync(`./src/input_cache/day${day}.txt`);

export const getTodayLines = async (
  day: number,
  year: number,
  comma: boolean,
): Promise<string[]> => {
  const filePath = `./src/input_cache/day${day}.txt`;
  if (isCached(day)) {
    if (!comma)
      return await fs.promises
        .readFile(filePath, 'utf-8')
        .then(x => x.trim().split('\n'));
    return await fs.promises
      .readFile(filePath, 'utf-8')
      .then(x => x.trim().split(','));
  }
  try {
    const text = await fetchInput(year, day);
    await fs.promises.mkdir('./src/input_cache', {recursive: true});
    await fs.promises.writeFile(filePath, text, 'utf-8');
    return await getTodayLines(day, year, comma);
  } catch (e) {
    throw new Error('Error writing to file: ' + e);
  }
};

export const getNumbersFromString = (input: string): number[] =>
  (input.match(/\d+/g) || []).map(Number);

export const numberToBinary = (n: number, length = 8): string =>
  n.toString(2).padStart(length, '0');

export const distanceBetweenPointsGrid = (
  x1: number,
  y1: number,
  x2: number,
  y2: number,
): number => Math.abs(x1 - x2) + Math.abs(y1 - y2);

export const binaryToDecimal = (binaryString: string): number =>
  parseInt(binaryString, 2);

export const stringToIntArray = (stringArr: string[]): number[] =>
  stringArr.map(x => parseInt(x));
