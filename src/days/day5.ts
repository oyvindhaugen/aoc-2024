export const part1 = (lines: string): number | string => {
    const ordering = lines.split('\n\n')[0].split('\n');
    const orderMap = new Map<number, number[]>();

    ordering.forEach(rule => {
        const [key, value] = rule.split('|').map(Number);
        const currVal = orderMap.get(key) || [];
        currVal.push(value);
        orderMap.set(key, currVal);
    });


    const updates = lines.split('\n\n')[1].split('\n').map(s => s.split(',').map(Number))

    const keysToCheck = [...orderMap.keys()];
    const validUpdates = updates.filter(update => {
        return keysToCheck.every(key => {
            return orderMap.get(key)?.every(val => { 
                const isNeg = update.indexOf(val) === -1 
                const greaterIndex = update.indexOf(val) > update.indexOf(key) 
                return isNeg || greaterIndex
            })
    
        })
    })

    return validUpdates.reduce((acc, curr) => acc + curr[Math.floor(curr.length / 2)], 0);
}

const testInput = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`;


export const part2 = (lines: string): number | string => {
    const ordering = lines.split('\n\n')[0].split('\n');
    const orderMap = new Map<number, number[]>();

    ordering.forEach(rule => {
        const [key, value] = rule.split('|').map(Number);
        const currVal = orderMap.get(key) || [];
        currVal.push(value);
        orderMap.set(key, currVal);
    });

    const updates = lines.split('\n\n')[1].split('\n').map(s => s.split(',').map(Number))

    const keysToCheck = [...orderMap.keys()];
    const invalidUpdates = updates.filter(update => {
        return !keysToCheck.every(key => {
            return orderMap.get(key)?.every(val => { 
                const isNeg = update.indexOf(val) === -1 
                const greaterIndex = update.indexOf(val) > update.indexOf(key) 
                return isNeg || greaterIndex
            })
        })
    })
    const sorted = invalidUpdates.map(update => topologicalSort(update, orderMap))

    return sorted.reduce((acc, curr) => acc + curr[Math.floor(curr.length / 2)], 0);
}

const topologicalSort = (nodes: number[], graph: Map<number, number[]>): number[] => {
    const inDegree = new Map<number, number>();
    const adjacentList = new Map<number, number[]>();

    nodes.forEach(node => {
        inDegree.set(node, 0);
        adjacentList.set(node, []);
    });

    nodes.forEach(node => {
        (graph.get(node) || []).forEach(neighbour => {
            if (nodes.includes(neighbour)) {
                adjacentList.get(node)?.push(neighbour);
                inDegree.set(neighbour, (inDegree.get(neighbour) || 0) + 1);
            }
        });
    });

    const queue = Array.from(nodes).filter(node => inDegree.get(node) === 0);
    const sorted: number[] = [];

    while (queue.length > 0) {
        const current = queue.shift();
        sorted.push(current!);

        (adjacentList.get(current!) || []).forEach(neighbour => {
            inDegree.set(neighbour, inDegree.get(neighbour)! - 1);
            if (inDegree.get(neighbour) === 0) {
                queue.push(neighbour);
            }
        })
    }
    
    return sorted;
}