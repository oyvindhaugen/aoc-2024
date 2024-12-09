export const part1 = (lines: string): number | string => {
    const word = 'xmas';
    const letterMatrix: string[][] = lines.trim().split('\n').map(s => s.split('').map(k => k.toLowerCase()));
    const rows: number = letterMatrix.length; 
    const cols: number = letterMatrix[0].length;
    let instances: number = 0;

    const dfs = (row: number, col: number, idx: number): number => {
        if (idx === word.length) return 1;
        if (row < 0 || col < 0 || row >= rows || col >= cols) return 0;
        if (letterMatrix[row][col] !== word[idx]) return 0;
        const directions: number[][] = [
            [0, 1], [1, 0], [0, -1], [-1, 0],
            [-1, -1], [-1, 1], [1, -1], [1, 1] 
          ];

        let paths = 0;
        for (let [dx, dy] of directions) {
            paths += dfs(row + dx, col + dy, idx + 1);
        }
        return paths;
    }

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (letterMatrix[i][j] === word[0]) {
                instances += dfs(i, j , 0);
            }
        }
    }
    return instances;
}


export const part2 = (lines: string): number | string => {
    return 0;
}