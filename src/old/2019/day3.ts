import {manhattanDistance} from '../../utils.ts';

interface Point {
  x: number;
  y: number;
}

const parseDirection = (direction: string): {dx: number; dy: number} => {
  const point: Point = {x: 0, y: 0};

  const prefix = direction.charAt(0);
  const suffix = parseInt(direction.slice(1), 10);

  switch (prefix) {
    case 'R':
      return {dx: suffix, dy: 0};
    case 'L':
      return {dx: -suffix, dy: 0};
    case 'U':
      return {dx: 0, dy: suffix};
    case 'D':
      return {dx: 0, dy: -suffix};
    default:
      throw new Error(`Invalid direction: ${direction}`);
  }
};

const getWirePoints = (wire: string[]): Point[] => {
  const points: Point[] = [];
  let current: Point = {x: 0, y: 0};

  wire.forEach(direction => {
    const {dx, dy} = parseDirection(direction);
    const steps = Math.max(Math.abs(dx), Math.abs(dy));

    for (let i = 1; i <= steps; i++) {
      current = {
        x: current.x + (dx === 0 ? 0 : dx > 0 ? 1 : -1),
        y: current.y + (dy === 0 ? 0 : dy > 0 ? 1 : -1),
      };
      points.push(current);
    }
  });

  return points;
};

const findIntersections = (
  wire1Points: Point[],
  wire2Points: Point[],
): Point[] => {
  const set = new Set<string>();
  const intersections: Point[] = [];

  wire1Points.forEach(point => {
    set.add(`${point.x},${point.y}`);
  });

  wire2Points.forEach(point => {
    if (set.has(`${point.x},${point.y}`) && !(point.x === 0 && point.y === 0)) {
      intersections.push(point);
    }
  });

  return intersections;
};

export const part1 = (input: string): number => {
  const [wire1, wire2] = input.split('\n').map(line => line.split(','));

  const wire1Points = getWirePoints(wire1);
  const wire2Points = getWirePoints(wire2);
  const intersections = findIntersections(wire1Points, wire2Points);

  const distances = intersections.map(manhattanDistance);
  return Math.min(...distances);
};

export const part2 = (lines: string): number => 0;