
const findLetterXY = (matrix: string[][], letter: string): { x: number, y: number } | null => {
    for (let x in matrix) {
        let y = matrix[x].indexOf(letter);
        if (y !== -1) return { x: Number(x), y: y }
    }
    return null;
}

const turn90Degrees = (direction: string): '^' | 'v' | '<' | '>' => {
    switch (direction) {
        case '^':
            return '>';
        case '>':
            return 'v';
        case 'v':
            return '<';
        case '<':
            return '^';
        default:
            throw new Error('invalid direction');
    }
}

export const part1 = (lines: string): number | string => {
    const mapMatrix = lines.split('\n').map(s => s.split(''), '\n');

    const rows = mapMatrix[0].length;
    const cols = mapMatrix.length;

    let currentDir: '^' | 'v' | '<' | '>' = '^';
    let test = 0;
    while (true) {
        test++;
        const { x: guardX, y: guardY } = findLetterXY(mapMatrix, currentDir) || { x: -1, y: -1 };
        if (guardX === -1 || guardY === -1) break;
        switch (currentDir) {
            case '^':
                if (guardX - 1 < 0) {
                    mapMatrix[guardX][guardY] = 'X';
                    continue;
                } else if (mapMatrix[guardX - 1][guardY] === '#') {
                    currentDir = turn90Degrees(currentDir);
                    mapMatrix[guardX][guardY] = currentDir;
                    continue;
                } else {
                    [mapMatrix[guardX - 1][guardY], mapMatrix[guardX][guardY]] = [currentDir, 'X'];
                    continue;
                }
            case 'v':
                if (guardX + 1 >= cols) {
                    mapMatrix[guardX][guardY] = 'X';
                    continue;
                } else if (mapMatrix[guardX + 1][guardY] === '#') {
                    currentDir = turn90Degrees(currentDir);
                    mapMatrix[guardX][guardY] = currentDir;
                    continue;
                } else {
                    [mapMatrix[guardX + 1][guardY], mapMatrix[guardX][guardY]] = [currentDir, 'X'];
                    continue;
                }
            case '<':
                if (guardY - 1 < 0) {
                    mapMatrix[guardX][guardY] = 'X';
                    continue;
                } else if (mapMatrix[guardX][guardY - 1] === '#') {
                    currentDir = turn90Degrees(currentDir);
                    mapMatrix[guardX][guardY] = currentDir;
                    continue;
                } else {
                    [mapMatrix[guardX][guardY - 1], mapMatrix[guardX][guardY]] = [currentDir, 'X'];
                    continue;
                }
            case '>':
                if (guardY + 1 >= rows) {
                    mapMatrix[guardX][guardY] = 'X';
                    continue;
                } else if (mapMatrix[guardX][guardY + 1] === '#') {
                    currentDir = turn90Degrees(currentDir);
                    mapMatrix[guardX][guardY] = currentDir;
                    continue;
                } else {
                    [mapMatrix[guardX][guardY + 1], mapMatrix[guardX][guardY]] = [currentDir, 'X'];
                    continue;
                }

        }
    }
    return mapMatrix.reduce((acc, curr) => acc + curr.filter(x => x === 'X').length, 0);
}

const testInput = `....#.....
    .........#
    ..........
    ..#.......
    .......#..
    ..........
    .#..^.....
    ........#.
    #.........
    ......#...`;

type Direction = 'up' | 'right' | 'down' | 'left';

export const part2 = (lines: string): number | string => {
    const map = testInput.split('\n').map(s => s.split(''));

    const directions: Direction[] = ['up', 'right', 'down', 'left'];
    const moveDirections: Record<Direction, [number, number]> = {
        up: [-1, 0],
        right: [0, 1],
        down: [1, 0],
        left: [0, -1],
    };

    const simPath = (map: string[][], startX: number, startY: number, startDir: Direction): Set<string> => {
        const visited = new Set<string>();
        let [x, y, direction] = [startX, startY, startDir];

        while (x >= 0 && y >= 0 && x < map.length && y < map[0].length) {
            const pos = `${x},${y}`;
            if (visited.has(pos)) break;
            visited.add(pos);

            const [dx, dy] = moveDirections[direction];
            const [nx, ny] = [x + dx, y + dy];

            if (nx >= 0 && ny >= 0 && nx < map.length && ny < map[0].length && map[nx][ny] !== '#') {
                [x, y] = [nx, ny];
            } else {
                direction = directions[(directions.indexOf(direction) + 1) % 4];
            }
        }
        return visited;
    }

    const startPos = map.map((row, x) => [x, row.findIndex(cell => cell === '^')])
        .find(([, y]) => y !== -1);
    if (!startPos) throw new Error('Guard start pos not found.');

    const [sx, sy] = startPos;
    const initPath = simPath(map, sx, sy, 'up');

    const validPos = new Set<string>();

    for (let x = 0; x < map.length; x++) {
        for (let y = 0; y < map[0].length; y++) {
            if (map[x][y] === '#' || (x === sx && y === sy)) continue;
            map[x][y] = '#';
            const newPath = simPath(map, sx, sy, 'up');
            map[x][y] = '.';

            if (newPath.size < initPath.size) {
                validPos.add(`${x},${y}`);
            }
        }
    }

    return validPos.size;
}
