const IMAGE_SIZE = 45;

// the order of the directions:
// 7 0 1
// 6   2
// 5 4 3
const dir = [[-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1]];

function cellId (row, col) {
    return row * IMAGE_SIZE + col;
}

function isInside (row, col) {
    return 0 <= row && row < IMAGE_SIZE && 0 <= col && col < IMAGE_SIZE;
}

/**
 * Thinning using Zhang-Suen algorithm
 * Input: flatten binary image array with white pixel = 1, black pixel = 0
 */
export function thinning (imgArray) {
    let turn = 0;
    const arr = [...imgArray].map(x => 1 - x);

    while (true) {
        let changed = false;
        let toWhite = [];

        for (let i = 0; i < IMAGE_SIZE; i++) {
            for (let j = 0; j < IMAGE_SIZE; j++) {
                if (arr[cellId(i, j)] === 0) continue;

                let transitions = 0;
                let countBlacks = 0;
                const p = new Array(8).fill(0);
                for (let t = 0; t < 8; t++) {
                    if (isInside(i + dir[t][0], j + dir[t][1])) {
                        p[t] = arr[cellId(i + dir[t][0], j + dir[t][1])];
                    }
                }
                for (let t = 0; t < 8; t++) {
                    if (isInside(i + dir[t][0], j + dir[t][1])) {
                        countBlacks += p[t];
                        if (p[t] === 0 && p[(t + 1) % 8] === 1) {
                            transitions++;
                        }
                    }
                }
                if (2 <= countBlacks && countBlacks <= 6 && transitions === 1) {
                    if (turn === 0 && p[0] * p[2] * p[4] === 0 && p[2] * p[4] * p[6] === 0) {
                        toWhite.push(cellId(i, j));
                    }
                    if (turn === 1 && p[0] * p[2] * p[6] === 0 && p[0] * p[4] * p[6] === 0) {
                        toWhite.push(cellId(i, j));
                    }
                }
            }
        }

        changed |= toWhite.length > 0;
        toWhite.forEach(id => arr[id] = 0);
        turn = 1 - turn;
        if (!changed) break;
    }

    return arr.map(x => 1 - x);
}
