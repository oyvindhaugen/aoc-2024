import {stringToIntArray} from '../../utils.ts';

const intcode = (intArray: number[]): number[] => {
  for (let i = 0; i < intArray.length; i += 4) {
    const opcode = intArray[i];
    const index1 = intArray[i + 1];
    const index2 = intArray[i + 2];
    const storeIndex = intArray[i + 3];

    if (opcode === 99) {
      break;
    }

    switch (opcode) {
      case 1:
        intArray[storeIndex] = intArray[index1] + intArray[index2];
        break;
      case 2:
        intArray[storeIndex] = intArray[index1] * intArray[index2];
        break;
      default:
        throw new Error('cummin');
    }
  }
  return intArray;
};

export const part1 = (lines: string[]): number => {
  const memory = stringToIntArray(lines);
  memory[1] = 12;
  memory[2] = 2;
  return intcode(memory)[0];
};

export const part2 = (lines: string[]): number => {
  const goal = 19690720;
  const intArray = stringToIntArray(lines);
  for (let i = 0; i <= 99; i++) {
    for (let j = 0; j <= 99; j++) {
      const memory = [...intArray];
      memory[1] = i;
      memory[2] = j;

      const resultMemory = intcode(memory);
      if (resultMemory[0] === goal) return 100 * i + j;
    }
  }
  return 0;
};
