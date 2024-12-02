import {getTodayLines} from './utils.ts';
import {part1, part2} from './days/day2.ts';
import dotenv from 'dotenv';

const main = async (year: number, day: number) => {
  dotenv.config();
  const lines: string = await getTodayLines(day, year);
  const answer1 = part1(lines);
  const answer2 = part2(lines);

  console.log('part 1: ' + answer1 + '\npart 2: ' + answer2);
};

const [year, day] = process.argv.slice(2);
if (!day || !year)
  throw new Error('Please provide two parameters: <year> <day>');
if (isNaN(parseInt(day)) || isNaN(parseInt(year)))
  throw new Error('Both Parameters must be valid numbers.');

await main(parseInt(year), parseInt(day));
