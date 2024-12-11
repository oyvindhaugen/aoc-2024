const testInput = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`

const findLetterXY = (matrix: string[][], letter: string): { x: number, y: number } | null => {
    for (let x in matrix) {
        let y = matrix[x].indexOf(letter);
        if (y !== -1) return { x: Number(x), y: y }
    }
    return null;
}

const turn90Degrees = (direction: string): '^'|'v'|'<'|'>' => {
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

    let currentDir: '^'|'v'|'<'|'>' = '^'; 
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
export const part2 = (lines: string): number | string => {
    return 0;
}