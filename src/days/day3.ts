export const part1 = (lines: string): number | string => {
    const regex = /mul\(\d{1,3},\d{1,3}\)/g
    const equations = lines.match(regex)?.map(x => x.replace("mul(", "").replace(")", "").split(',').map(x => parseInt(x)));

    return Number(equations?.reduce((acc, curr) => acc + curr[0] * curr[1], 0))

}

export const part2 = (lines: string): number | string => {
    const filteredInput = ("do()" + lines).split("don't()").map(el => el.split("do()").slice(1)).flat().join();
    return part1(filteredInput)
}