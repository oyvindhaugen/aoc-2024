import {getTodayLines} from './utils.ts';
import dotenv from 'dotenv';

const main = async () => {
  dotenv.config();
  const lines: string[] = await getTodayLines(2023, 1);
  console.log(lines);
};

await main();
