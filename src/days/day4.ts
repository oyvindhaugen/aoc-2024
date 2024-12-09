export const part1 = (lines: string): number | string => {
    const letterMatrix: string[][] = lines.trim().split('\n').map(s => s.split(''));
    const directions = [
        { dx: 0, dy: 1 },
        { dx: 1, dy: 0 },
        { dx: 1, dy: 1 },
        { dx: 1, dy: -1 },
        { dx: 0, dy: -1 },
        { dx: -1, dy: 0 },
        { dx: -1, dy: -1 },
        { dx: -1, dy: 1 },
    ];

    const rows = letterMatrix.length;
    const cols = letterMatrix[0].length;
    const target = "XMAS";
    let count = 0;

    const checkDir = (x: number, y: number, dx: number, dy: number): boolean => {
        for (let i = 0; i < target.length; i++) {
            const nx = x + dx * i;
            const ny = y + dy * i;
            if (nx < 0 || ny < 0 || nx >= rows || ny >= cols || letterMatrix[nx][ny] !== target[i]) {
                return false;
            }
        }
        return true
    }

    for (let x = 0; x < rows; x++) {
        for (let y = 0; y < cols; y++) {
            if (letterMatrix[x][y] === "X") {
                for (const { dx, dy } of directions) {
                    if (checkDir(x, y, dx, dy)) {
                        count++;
                    }
                }
            }
        }
    }

    return count;

}

export const part2 = (lines: string): number | string => {
    const letterMatrix: string[][] = lines.trim().split('\n').map(s => s.split(''));

    const rows = letterMatrix.length;
    const cols = letterMatrix[0].length;
    let count = 0;

    for (let x = 0; x < rows; x++) {
        for (let y = 0; y < cols; y++) {
            if (letterMatrix[x][y] === "A") {
                if (x - 1 >= 0 && y -1 >= 0 && x + 1 < rows && y + 1 < cols) {
                    const bL = letterMatrix[x - 1][y + 1];
                    const tR = letterMatrix[x + 1][y - 1];
                    const d1 = (bL === 'S' && tR === 'M') || (bL === 'M' && tR === 'S');

                    const bR = letterMatrix[x + 1][y + 1];
                    const tL = letterMatrix[x - 1][y - 1];
                    const d2 = (bR === 'S' && tL === 'M') || (bR === 'M' && tL === 'S');

                    if (d1 && d2) count++
                }
            }
        }
    }
    return count;
}