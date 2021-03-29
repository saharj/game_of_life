const nextLife = (matrix: number[][], r: number, c: number) => {
    let aliveCells: string[] = [];
    let cellIsAlive: boolean = false;
    let neighbors: number[][];
    let aliveNeighborsCount = 0;
    for (var i =0; i < r; i++) {
        for (var j = 0; j < c; j++) {
            cellIsAlive = matrix[i][j] === 1 ? true : false;
            neighbors = findNeighbors(i, j, r, c);
            aliveNeighborsCount = 0;
            for (let item of neighbors) {
                if (matrix[item[0]][item[1]]) {
                    aliveNeighborsCount += 1;
                }
            }

            if (cellIsAlive) {
                if (aliveNeighborsCount === 2 || aliveNeighborsCount === 3) {
                    aliveCells.push(i + "-" + j);
                }
            } else {
                if (aliveNeighborsCount === 3) {
                    aliveCells.push(i + "-" + j);
                }
            }
        }
    }
    return aliveCells;
}

const createMatrix = (r: number, c: number, liveSquares: string[]) => {
    let col: number[] = new Array(c);
    col.fill(0);
    let matrix: number[][] = new Array(r);
    let fill: number[];
    for (let i = 0; i < r; i++) {
        fill = col.slice();
        matrix[i] = fill;
    }

    let inds: string[];
    liveSquares.forEach(item => {
        inds = item.split("-");
        matrix[parseInt(inds[0])][parseInt(inds[1])] = 1;
    })

    return matrix;
}

const findNeighbors = (i: number, j: number, r: number, c: number) => {
    let neighbors = [];
    if (i === 0) {}

    if (i > 0 && i < r - 1) {
        if (j > 0 && j < c - 1) {
            neighbors.push([i, j - 1]);
            neighbors.push([i, j + 1]);
            neighbors.push([i - 1, j]);
            neighbors.push([i + 1, j]);
            neighbors.push([i - 1, j - 1]);
            neighbors.push([i - 1, j + 1]);
            neighbors.push([i + 1, j - 1]);
            neighbors.push([i + 1, j + 1]);
        }else if (j === 0) {
            neighbors.push([i, j + 1]);
            neighbors.push([i - 1, j]);
            neighbors.push([i + 1, j]);
            neighbors.push([i - 1, j + 1]);
            neighbors.push([i + 1, j + 1]);
        } else {
            neighbors.push([i, j - 1]);
            neighbors.push([i - 1, j]);
            neighbors.push([i + 1, j]);
            neighbors.push([i - 1, j - 1]);
            neighbors.push([i + 1, j - 1]);
        }
    } else if (i === 0) {
        if (j > 0 && j < c - 1) {
            neighbors.push([i, j - 1]);
            neighbors.push([i, j + 1]);
            neighbors.push([i + 1, j]);
            neighbors.push([i + 1, j - 1]);
            neighbors.push([i + 1, j + 1]);
        }else if (j === 0) {
            neighbors.push([i, j + 1]);
            neighbors.push([i + 1, j]);
            neighbors.push([i + 1, j + 1]);
        } else {
            neighbors.push([i, j - 1]);
            neighbors.push([i + 1, j]);
            neighbors.push([i + 1, j - 1]);
        }
    } else {
        if (j > 0 && j < c - 1) {
            neighbors.push([i, j - 1]);
            neighbors.push([i, j + 1]);
            neighbors.push([i - 1, j]);
            neighbors.push([i - 1, j - 1]);
            neighbors.push([i - 1, j + 1]);
        }else if (j === 0) {
            neighbors.push([i, j + 1]);
            neighbors.push([i - 1, j]);
            neighbors.push([i - 1, j + 1]);
        } else {
            neighbors.push([i, j - 1]);
            neighbors.push([i - 1, j]);
            neighbors.push([i - 1, j - 1]);
        }
    }

    return neighbors;
}

export {
    nextLife,
    createMatrix,
};
